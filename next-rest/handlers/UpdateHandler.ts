import {Codec} from '@21gram-consulting/ts-codec';
import {NextApiRequest, NextApiResponse} from 'next';

export type UpdateHandler<Resource, Query> = (
  record: Resource,
  codec: Codec<Resource>,
  query: Query,
  request: NextApiRequest,
  response: NextApiResponse
) => Promise<unknown>;
