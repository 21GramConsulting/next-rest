import {NextApiRequest, NextApiResponse} from 'next';

export type DeleteHandler<Query> = (
  query: Query,
  request: NextApiRequest,
  response: NextApiResponse
) => Promise<unknown>;
