import {Codec} from '@21gram-consulting/ts-codec';
import {NextApiRequest, NextApiResponse} from 'next';

export type ReadHandler<Record, Selection> = (
  codec: Codec<Record>,
  selection: Selection,
  request: NextApiRequest,
  response: NextApiResponse
) => Promise<unknown>;
