import combine from '!combine';
import permute from '!permute';
import {httpMethods} from '#Methods';
import {Coded, IdentityAware, Queried} from '#description';
import {handler} from '#handler';
import {json} from '@21gram-consulting/ts-codec';

describe('handler', () => {
  const identityAware: IdentityAware = {idParameterName: 'test'};
  const coded: Coded<number> = {codec: json.number};
  const queried: Queried<{test: number}> = {query: {test: json.number}};
  const readHandler = jest.fn();
  const readSetHandler = jest.fn();
  const createHandler = jest.fn();
  const updateHandler = jest.fn();
  const deleteHandler = jest.fn();
  const readable = {...coded, ...identityAware, read: readHandler};
  const readSetable = {...coded, ...queried, readSet: readSetHandler};
  const creatable = {...coded, ...identityAware, create: createHandler};
  const updatable = {...coded, ...identityAware, update: updateHandler};
  const deletable = {...coded, ...identityAware, delete: deleteHandler};
  const allCombinations = combine([
    readable,
    readSetable,
    creatable,
    updatable,
    deletable,
  ]);

  let mockResponse: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
    } as any;
  });

  it.each(allCombinations)(
    'Return with a status 400 when the request method is not defined',
    async (description: any) => {
      handler(description)({method: undefined} as any, mockResponse);
      expect(readHandler).not.toHaveBeenCalled();
      expect(readSetHandler).not.toHaveBeenCalled();
      expect(createHandler).not.toHaveBeenCalled();
      expect(updateHandler).not.toHaveBeenCalled();
      expect(deleteHandler).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.end).toHaveBeenCalled();
    }
  );

  it.each(
    permute(
      allCombinations,
      [
        'text/plain',
        'text/json',
        'application/xml',
        'application/x-www-form-urlencoded',
      ],
      httpMethods as any as string[]
    )
  )(
    'Return with a status 400 when the content type is not application/json',
    async (description: any, contentType: string, method) => {
      handler(description)(
        {method, headers: {'content-type': contentType}} as any,
        mockResponse
      );
      expect(readHandler).not.toHaveBeenCalled();
      expect(readSetHandler).not.toHaveBeenCalled();
      expect(createHandler).not.toHaveBeenCalled();
      expect(updateHandler).not.toHaveBeenCalled();
      expect(deleteHandler).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.end).toHaveBeenCalled();
    }
  );

  it.each(permute(allCombinations, ['CONNECT', 'OPTIONS', 'TRACE', 'HEAD']))(
    'Return with a status 405 when the request method is not supported',
    async (description: any, method: string) => {
      handler(description)(
        {method, headers: {'content-type': 'application/json'}} as any,
        mockResponse
      );
      expect(readHandler).not.toHaveBeenCalled();
      expect(readSetHandler).not.toHaveBeenCalled();
      expect(createHandler).not.toHaveBeenCalled();
      expect(updateHandler).not.toHaveBeenCalled();
      expect(deleteHandler).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(405);
      expect(mockResponse.end).toHaveBeenCalled();
    }
  );

  describe('GET', () => {
    const request = {
      method: 'GET',
      headers: {'content-type': 'application/json'},
    } as any;

    it.each(combine([readSetable, creatable, updatable, deletable]))(
      'Should respond with a status 405 when the parameter count is one but it is not a Readable resource',
      (descriptor: any) => {
        handler(descriptor)({...request, query: {test: 1}}, mockResponse);
        expect(readHandler).not.toHaveBeenCalled();
        expect(readSetHandler).not.toHaveBeenCalled();
        expect(createHandler).not.toHaveBeenCalled();
        expect(updateHandler).not.toHaveBeenCalled();
        expect(deleteHandler).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(405);
        expect(mockResponse.end).toHaveBeenCalled();
      }
    );

    it('should respond with a status 405 if the resource identifier is multi-chunked but has no items.', () => {
      handler(readable)({...request, query: {test: []}}, mockResponse);
      expect(readHandler).not.toHaveBeenCalled();
      expect(readSetHandler).not.toHaveBeenCalled();
      expect(createHandler).not.toHaveBeenCalled();
      expect(updateHandler).not.toHaveBeenCalled();
      expect(deleteHandler).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(405);
      expect(mockResponse.end).toHaveBeenCalled();
    });

    it.each([
      [1],
      [true],
      [null],
      [undefined],
      [{}],
      [() => {}],
      [Symbol('test')],
    ])(
      'should respond with a status 405 if the resource identifier is not a string.',
      id => {
        handler(readable)({...request, query: {test: id}}, mockResponse);
        expect(readHandler).not.toHaveBeenCalled();
        expect(readSetHandler).not.toHaveBeenCalled();
        expect(createHandler).not.toHaveBeenCalled();
        expect(updateHandler).not.toHaveBeenCalled();
        expect(deleteHandler).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(405);
        expect(mockResponse.end).toHaveBeenCalled();
      }
    );

    it.each([
      [1],
      [true],
      [null],
      [undefined],
      [{}],
      [() => {}],
      [Symbol('test')],
    ])(
      'should respond with a status 405 if the resource identifier is multi-chunked and the first chunk is not a string.',
      id => {
        handler(readable)({...request, query: {test: [id]}}, mockResponse);
        expect(readHandler).not.toHaveBeenCalled();
        expect(readSetHandler).not.toHaveBeenCalled();
        expect(createHandler).not.toHaveBeenCalled();
        expect(updateHandler).not.toHaveBeenCalled();
        expect(deleteHandler).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(405);
        expect(mockResponse.end).toHaveBeenCalled();
      }
    );

    it('should return the read result.', async () => {
      const expectedResult = {};
      readHandler.mockResolvedValue(expectedResult);
      const mockRequest = {...request, query: {test: '1'}};
      const result = await handler(readable)(mockRequest, mockResponse);
      expect(readHandler).toHaveBeenCalledWith(
        coded.codec,
        '1',
        mockRequest,
        mockResponse
      );
      expect(result).toBe(expectedResult);
    });
  });
});
