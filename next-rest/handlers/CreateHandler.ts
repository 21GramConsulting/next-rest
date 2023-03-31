import {Codec} from '@21gram-consulting/ts-codec';
import {NextApiRequest, NextApiResponse} from 'next';

export type CreateHandler<Record> = (
  record: Record,
  codec: Codec<Record>,
  request: NextApiRequest,
  response: NextApiResponse
) => Promise<unknown>;
