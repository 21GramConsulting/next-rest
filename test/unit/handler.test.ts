import combine from '!combine';
import permute from '!permute';
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

  const combinations = combine([
    readable,
    readSetable,
    creatable,
    updatable,
    deletable,
  ]);

  it.each(combinations)(
    'Return with a status 400 when the request method is not defined',
    async (description: any) => {
      handler(description)(
        {method: undefined} as any,
        {
          status: jest.fn().mockReturnThis(),
          end: jest.fn(),
        } as any
      );
      expect(readHandler).not.toHaveBeenCalled();
      expect(readSetHandler).not.toHaveBeenCalled();
      expect(createHandler).not.toHaveBeenCalled();
      expect(updateHandler).not.toHaveBeenCalled();
      expect(deleteHandler).not.toHaveBeenCalled();
    }
  );

  it.each(
    permute(combinations, [
      'text/plain',
      'text/json',
      'application/xml',
      'application/x-www-form-urlencoded',
    ])
  )(
    'Return with a status 400 when the content type is not application/json',
    async (description: any, contentType: string) => {
      handler(description)(
        {method: 'GET', headers: {'content-type': contentType}} as any,
        {
          status: jest.fn().mockReturnThis(),
          end: jest.fn(),
        } as any
      );
      expect(readHandler).not.toHaveBeenCalled();
      expect(readSetHandler).not.toHaveBeenCalled();
      expect(createHandler).not.toHaveBeenCalled();
      expect(updateHandler).not.toHaveBeenCalled();
      expect(deleteHandler).not.toHaveBeenCalled();
    }
  );
});
