import {NextApiRequest, NextApiResponse} from 'next';
import {CancellablePromise} from 'real-cancellable-promise';

export type DeleteHandler<Query> = (
  query: Query,
  request: NextApiRequest,
  response: NextApiResponse
) => CancellablePromise<unknown>;
