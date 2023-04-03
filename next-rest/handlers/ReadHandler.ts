import {Codec} from '@21gram-consulting/ts-codec';
import {NextApiRequest, NextApiResponse} from 'next';

export type ReadHandler<Resource, Query> = (
  codec: Codec<Resource>,
  query: Query,
  request: NextApiRequest,
  response: NextApiResponse
) => Promise<unknown>;
