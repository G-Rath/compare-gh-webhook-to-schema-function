/* tslint:disable */
import { User } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface SponsorshipEditedEvent {
  action: 'edited';
  sponsorship: {
    node_id: string;
    created_at: string;
    sponsorable: {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      site_admin: boolean;
    };
    sponsor: {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      site_admin: boolean;
    };
    privacy_level: string;
    tier: {
      node_id: string;
      created_at: string;
      description: string;
      monthly_price_in_cents: number;
      monthly_price_in_dollars: number;
      name: string;
    };
  };
  effective_date?: string;
  changes?: {
    tier: {
      from: {
        node_id: string;
        created_at: string;
        description: string;
        monthly_price_in_cents: number;
        monthly_price_in_dollars: number;
        name: string;
      };
    };
  };
  sender: User;
}
