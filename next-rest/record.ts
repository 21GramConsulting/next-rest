import {
  Description,
  Identified,
  isCreatable,
  isDeletable,
  isReadable,
  isReadSetable,
  isUpdateable,
} from '#rest/Description';
import { NextApiHandler } from 'next';
import { isHttpMethod } from '#rest/Methods';
import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { Query as QueryOf } from '#rest/Query';
import { set as SetCodec } from '#codec/set';
import { Identifier } from '#rest/Identifier';

type Handler = <Record, ID, Query extends QueryOf<Record>>(description: Description<Record, ID, Query>) => NextApiHandler<Record>;

export const record: Handler = description => async (request, response) => {
  if (!request.method) return response.status(400).end();
  if (request.headers['content-type'] !== 'application/json') return response.status(400).end();
  if (!isHttpMethod(request.method)) return response.status(405).end();

  const parameterCount = Object.keys(request.query).length;

  if (request.method === 'GET') {
    if (parameterCount === 1) {
      if (!isReadable(description)) return unsupportedMethod(response, `Record has no read api.`);
      const id = getIdentifier(description, request);
      if (!id) return unsupportedMethod(response, `Expected a record identifier.`, id);
      return await description.read(description.record, id, request, response);
    }
    // if (parameterCount) {
    if (!isReadSetable(description)) return unsupportedMethod(response, `Record has no readSet api.`);
    return description.readSet(
      SetCodec(description.record),
      description.query.decode(JSON.stringify(request.query)),
      request,
      response,
    );
    // }
    // return unsupportedMethod(response, `Can't read record, due to the number of parameters received.`, parameterCount);
  }

  if (request.method === 'DELETE') {
    if (parameterCount !== 1) return unsupportedMethod(response, `Can't delete record, due to the number of parameters received.`, parameterCount);
    if (!isDeletable(description)) return unsupportedMethod(response, `Record has no delete api.`);
    const id = getIdentifier(description, request);
    if (!id) return unsupportedMethod(response, `Expected a record identifier.`, id);
    return description.delete(description.record, id, request, response);
  }

  if (!request.body) return unsupportedMethod(response, `No payload submitted for write operations.`);

  if (request.method === 'POST') {
    if (parameterCount !== 0) return unsupportedMethod(response, `Can't create record, due to the number of parameters received.`, parameterCount);
    if (!isCreatable(description)) return unsupportedMethod(response, `Record has no create api.`);
    return description.create(
      description.record.decode(JSON.stringify(request.body)),
      description.record,
      request,
      response,
    );
  }

  if (request.method === 'PUT') {
    if (parameterCount !== 1) return unsupportedMethod(response, `Can't update record, due to the number of parameters received`, parameterCount);
    if (!isUpdateable(description)) return unsupportedMethod(response, `Record has no update api.`);
    const id = getIdentifier(description, request);
    if (!id) return unsupportedMethod(response, `Expected a record identifier.`, id);
    return description.update(
      description.record.decode(JSON.stringify(request.body)),
      description.record,
      id,
      request,
      response,
    );
  }

  return unsupportedMethod(response, `Generally unsupported HTTP Request Method.`, request.method);
};

const unsupportedMethod = (response: NextApiResponse, ...log: Parameters<typeof console.warn>) => {
  console.warn(...log);
  return response.status(405).end();
};

export const getIdentifier = <R, I, Q extends QueryOf<R>>(description: Description<R, I, Q> & Identified, request: NextApiRequest): Identifier<I> | undefined => {
  // TODO: ID validator could be injected here
  const id = request.query[description.idParameterName];
  if (typeof id !== 'string') return;
  return id as Identifier<I>;
};
