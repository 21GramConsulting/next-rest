import { Codec } from '#codec/Codec';
import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

export type UpdateHandler<Record, Selection> = (
  record: Record,
  codec: Codec<Record>,
  selection: Selection,
  request: NextApiRequest,
  response: NextApiResponse,
) => Promise<unknown>;
