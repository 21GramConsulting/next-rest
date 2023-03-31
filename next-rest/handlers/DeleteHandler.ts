import {NextApiRequest, NextApiResponse} from 'next';

export type DeleteHandler<Selection> = (
  selection: Selection,
  request: NextApiRequest,
  response: NextApiResponse
) => Promise<unknown>;
