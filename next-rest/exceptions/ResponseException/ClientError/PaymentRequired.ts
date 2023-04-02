import {ClientError} from '#exceptions/ResponseException/ClientError/ClientError';

/**
 * @summary Represents a 402 Payment Required.
 * @description
 * Reserved for future use. The original intention was that
 * this code might be used as part of some form of digital
 * cash or micropayment scheme, as proposed, for example, by
 *  GNU Taler, but that has not yet happened, and this
 * code is not widely used. Google Developers API uses this
 * status if a particular developer has exceeded the daily
 * limit on requests. Sipgate uses this code if an
 * account does not have sufficient funds to start a call.
 *  Shopify uses this code when the store has not paid their
 * fees and is temporarily disabled. Stripe uses this
 * code for failed payments where parameters were correct,
 * for example blocked fraudulent payments.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class PaymentRequired extends ClientError {}
