import { log } from '@charmverse/core/log';
import { SQS_WEBHOOK_SYNAPS_QUEUE_NAME } from '@root/lib/kyc/config';

import { processMessages } from '../../webhookSqs';

import { processWebhookMessage } from './webhook/processWebhookMessage';

const queueUrl = SQS_WEBHOOK_SYNAPS_QUEUE_NAME || '';

export async function task() {
  log.debug('Starting to process synaps webhook messages job', { queueUrl });
  await processMessages({ processorFn: processWebhookMessage, queueUrl });
}
