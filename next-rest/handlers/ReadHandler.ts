import { Codec } from '#codec/Codec';
import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

export type ReadHandler<Record, Selection> = (
  codec: Codec<Record>,
  selection: Selection,
  request: NextApiRequest,
  response: NextApiResponse,
) => Promise<unknown>;
