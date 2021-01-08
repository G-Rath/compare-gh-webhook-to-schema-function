/* tslint:disable */
import { Installation, Organization, User } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface MembershipRemovedEvent {
  action: 'removed';
  scope: string;
  member: {
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
  sender: User;
  team: {
    name: string;
    id: number;
    node_id: string;
    slug: string;
    description: string;
    privacy: string;
    url: string;
    html_url: string;
    members_url: string;
    repositories_url: string;
    permission: string;
  };
  organization: Organization;
  installation?: Installation;
}
