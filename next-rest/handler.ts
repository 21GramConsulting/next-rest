import {
  Description,
  IdentityAware,
  isDeletable,
  isReadable,
  isReadSetable,
  isUpdatable,
} from '#description';
import {isCreatable} from '#description/Create';
import {isHttpMethod} from '#Methods';
import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {json, urlSearchParams} from '@21gram-consulting/ts-codec';
import {Identifier} from '#Identifier';

type Handler = <Resource, ID, Query>(
  description: Description<Resource, ID, Query>
) => NextApiHandler<Resource>;

export const handler: Handler = description => async (request, response) => {
  if (!request.method) return response.status(400).end();
  if (request.headers['content-type'] !== 'application/json')
    return response.status(400).end();
  if (!isHttpMethod(request.method)) return response.status(405).end();

  const isSingular = 'id' in request.query;

  if (request.method === 'GET') {
    if (isSingular) {
      if (!isReadable(description))
        return unsupportedMethod(response, 'Resource has no read api.');
      const id = getIdentifier(description, request);
      if (!id)
        return unsupportedMethod(
          response,
          'Expected a resource identifier.',
          id,
          request.query
        );
      return await description.read(description.codec, id, request, response);
    }
    if (!isReadSetable(description))
      return unsupportedMethod(response, 'Resource has no readSet api.');
    let rawQuery = '';
    if (request.url?.includes('?')) {
      rawQuery = request.url.split('?').pop() ?? '';
    }
    return description.readSet(
      json.set(description.codec),
      urlSearchParams(description.query).decode(rawQuery),
      request,
      response
    );
  }

  if (request.method === 'DELETE') {
    if (!isSingular)
      return unsupportedMethod(
        response,
        "Can't delete resource, due to the number of parameters received.",
        request.query
      );
    if (!isDeletable(description))
      return unsupportedMethod(response, 'Resource has no delete api.');
    const id = getIdentifier(description, request);
    if (!id)
      return unsupportedMethod(response, 'Expected a resource identifier.', id);
    return description.delete(description.codec, id, request, response);
  }

  if (!request.body)
    return unsupportedMethod(
      response,
      'No payload submitted for write operations.'
    );

  if (request.method === 'POST') {
    if (Object.keys(request.query).length > 0)
      return unsupportedMethod(
        response,
        "Can't create resource, due to the number of parameters received.",
        request.query
      );
    if (!isCreatable(description))
      return unsupportedMethod(response, 'Resource has no create api.');
    return description.create(
      description.codec.decode(JSON.stringify(request.body)),
      description.codec,
      request,
      response
    );
  }

  if (request.method === 'PUT') {
    if (!isSingular)
      return unsupportedMethod(
        response,
        "Can't update resource, due to the number of parameters received",
        request.query
      );
    if (!isUpdatable(description))
      return unsupportedMethod(response, 'Resource has no update api.');
    const id = getIdentifier(description, request);
    if (!id)
      return unsupportedMethod(response, 'Expected a resource identifier.', id);
    return description.update(
      description.codec.decode(JSON.stringify(request.body)),
      description.codec,
      id,
      request,
      response
    );
  }

  return unsupportedMethod(
    response,
    'Generally unsupported HTTP Request Method.',
    request.method
  );
};

const unsupportedMethod = (
  response: NextApiResponse,
  ...log: Parameters<typeof console.warn>
) => {
  console.warn(...log);
  return response.status(405).end();
};

const getIdentifier = <R, I, Q>(
  description: Description<R, I, Q> & IdentityAware,
  request: NextApiRequest
): Identifier<I> | undefined => {
  // TODO: ID validator could be injected here
  // TODO: Revisit & redesign. Either we were drunk or the Next API changed here. | P.S.: The API changed.
  let id: unknown = request.query[description.idParameterName];
  if (Array.isArray(id)) {
    if (!id[0]) return;
    id = id[0];
  }
  if (typeof id !== 'string') return;
  return id as Identifier<I>;
};
