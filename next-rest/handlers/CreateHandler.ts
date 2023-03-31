import { Codec } from '#codec/Codec';
import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

export type CreateHandler<Record> = (
  record: Record,
  codec: Codec<Record>,
  request: NextApiRequest,
  response: NextApiResponse,
) => Promise<unknown>;
