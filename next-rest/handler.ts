import {
  Description,
  Identified,
  isCreatable,
  isDeletable,
  isReadable,
  isReadSetable,
  isUpdateable,
} from '#description/Description';
import {isHttpMethod} from '#Methods';
import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {Query as QueryOf} from '#Query';
import {json} from '@21gram-consulting/ts-codec';
import {Identifier} from '#Identifier';

type Handler = <Resource, ID, Query extends QueryOf<Resource>>(
  description: Description<Resource, ID, Query>
) => NextApiHandler<Resource>;

export const handler: Handler = description => async (request, response) => {
  if (!request.method) return response.status(400).end();
  if (request.headers['content-type'] !== 'application/json')
    return response.status(400).end();
  if (!isHttpMethod(request.method)) return response.status(405).end();

  const parameterCount = Object.keys(request.query).length;

  if (request.method === 'GET') {
    if (parameterCount === 1) {
      if (!isReadable(description))
        return unsupportedMethod(response, 'Resource has no read api.');
      const id = getIdentifier(description, request);
      if (!id)
        return unsupportedMethod(
          response,
          'Expected a resource identifier.',
          id
        );
      return await description.read(description.codec, id, request, response);
    }
    if (!isReadSetable(description))
      return unsupportedMethod(response, 'Resource has no readSet api.');
    return description.readSet(
      json.set(description.codec),
      description.query.decode(JSON.stringify(request.query)),
      request,
      response
    );
  }

  if (request.method === 'DELETE') {
    if (parameterCount !== 1)
      return unsupportedMethod(
        response,
        "Can't delete resource, due to the number of parameters received.",
        parameterCount
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
    if (parameterCount !== 0)
      return unsupportedMethod(
        response,
        "Can't create resource, due to the number of parameters received.",
        parameterCount
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
    if (parameterCount !== 1)
      return unsupportedMethod(
        response,
        "Can't update resource, due to the number of parameters received",
        parameterCount
      );
    if (!isUpdateable(description))
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

const getIdentifier = <R, I, Q extends QueryOf<R>>(
  description: Description<R, I, Q> & Identified,
  request: NextApiRequest
): Identifier<I> | undefined => {
  // TODO: ID validator could be injected here
  const id = request.query[description.idParameterName];
  if (typeof id !== 'string') return;
  return id as Identifier<I>;
};
