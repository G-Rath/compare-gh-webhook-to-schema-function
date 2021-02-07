import { GithubEvent, describeEvent } from '../../../src/github';
import { pingEventPayload } from '../../fixtures';

describe('describeEvent', () => {
  it('uses the event name', () => {
    const event: GithubEvent = { name: 'ping', payload: pingEventPayload };

    expect(describeEvent(event)).toBe('ping');
  });

  describe('when the event has an action', () => {
    it('combines the two', () => {
      const event: GithubEvent = {
        name: 'github_app_authorization',
        payload: {
          action: 'revoked',
          sender: {
            login: 'octocat',
            id: 1,
            node_id: '',
            avatar_url: 'https://url.com',
            gravatar_id: '',
            url: 'https://url.com',
            html_url: 'https://url.com',
            followers_url: 'https://url.com',
            following_url: 'https://url.com',
            gists_url: 'https://url.com',
            starred_url: 'https://url.com',
            subscriptions_url: 'https://url.com',
            organizations_url: 'https://url.com',
            repos_url: 'https://url.com',
            events_url: 'https://url.com',
            received_events_url: 'https://url.com',
            type: 'User',
            site_admin: false
          }
        }
      };

      expect(describeEvent(event)).toBe(`github_app_authorization$revoked`);
    });
  });
});
