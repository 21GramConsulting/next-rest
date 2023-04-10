import {Codec} from '@21gram-consulting/ts-codec';
import {NextApiRequest, NextApiResponse} from 'next';
import {CancellablePromise} from 'real-cancellable-promise';

export type CreateHandler<Resource> = (
  resource: Resource,
  codec: Codec<Resource>,
  request: NextApiRequest,
  response: NextApiResponse
) => CancellablePromise<unknown>;
