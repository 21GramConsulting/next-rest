import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

export type DeleteHandler<Selection> = (
  selection: Selection,
  request: NextApiRequest,
  response: NextApiResponse,
) => Promise<unknown>;
