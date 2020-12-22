import { IncomingWebhook, IncomingWebhookSendArguments } from '@slack/webhook';

export class Notifier {
  private readonly _slackWebhook: IncomingWebhook;

  public constructor(url: string | undefined = process.env.SLACK_WEBHOOK_URL) {
    if (typeof url !== 'string') {
      throw new Error('Missing SLACK_WEBHOOK_URL from environment');
    }
    this._slackWebhook = new IncomingWebhook(url);
  }

  public async send(payload: IncomingWebhookSendArguments): Promise<void> {
    try {
      await this._slackWebhook.send(payload);
    } catch (e) {
      console.error('Error sending to slack webhook:', e);
    }
  }
}
