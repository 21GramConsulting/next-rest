import {Codec} from '@21gram-consulting/ts-codec';
import {NextApiRequest, NextApiResponse} from 'next';

export type ReadHandler<Resource, Selection> = (
  codec: Codec<Resource>,
  selection: Selection,
  request: NextApiRequest,
  response: NextApiResponse
) => Promise<unknown>;
