import {Codec} from '@21gram-consulting/ts-codec';
import {NextApiRequest, NextApiResponse} from 'next';
import {CancellablePromise} from 'real-cancellable-promise';

export type UpdateHandler<Resource, ID> = (
  record: Resource,
  codec: Codec<Resource>,
  id: ID,
  request: NextApiRequest,
  response: NextApiResponse
) => CancellablePromise<unknown>;
