import { Context, HttpRequest } from '@azure/functions';
import 'source-map-support/register';
import { EventValidator, describeEvent, getEvent } from './github';
import { Notifier } from './notifier';

enum SentimentEmoji {
  'Debug' = ':mag:',
  'Info' = ':information_source:',
  'Warning' = ':warning:',
  'Unknown' = ':interrobang:',
  'Failure' = ':exclamation:',
  'Success' = ':green_heart:',
  'None' = ':heavy_minus_sign:'
}

interface FnResult {
  summary: string;
  errors?: unknown[];
  error?: Error;
}

interface FnResponse {
  body: FnResult;
  statusCode: number;
  headers: {
    [key: string]: string;
    'X-Invocation-Id': string;
  };
}

export const handler = async (
  context: Context,
  request: HttpRequest
): Promise<FnResponse> => {
  context.log(request);

  const notifier = new Notifier();

  try {
    const githubEvent = getEvent(request);
    const errors = EventValidator.validate(githubEvent, context.log);
    const eventDescription = describeEvent(githubEvent);

    if (errors.length) {
      await notifier.send({
        text: `${SentimentEmoji.Warning} ${eventDescription} does not match its schema!`
      });

      context.log.info(errors);

      return {
        body: { summary: 'oh dear, there were errors :/', errors },
        headers: { 'X-Invocation-Id': context.invocationId },
        statusCode: 422
      };
    }

    await notifier.send({
      text: `${SentimentEmoji.Success} ${eventDescription} matches its schema!`
    });

    return {
      body: { summary: `success! ${eventDescription} matches its schema :D` },
      headers: { 'X-Invocation-Id': context.invocationId },
      statusCode: 200
    };
  } catch (err: unknown) {
    const error = err as Error;
    const message = error.stack ?? error.message;

    context.log.error(error);

    await notifier.send({ text: `\`\`\`${message}\`\`\`` });

    return {
      body: { summary: 'oh noes!', error },
      headers: { 'X-Invocation-Id': context.invocationId },
      statusCode: 500
    };
  }
};
