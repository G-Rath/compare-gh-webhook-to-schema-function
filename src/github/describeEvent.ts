import { GithubEvent } from './types';

export const describeEvent = (event: GithubEvent): string => {
  if ('action' in event.payload) {
    return `${event.name}$${event.payload.action}`;
  }

  return event.name;
};
