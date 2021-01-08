/* tslint:disable */
import { Installation, Organization, Repository, User } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface ProjectCardDeletedEvent {
  action: 'deleted';
  project_card: {
    url: string;
    project_url: string;
    column_url: string;
    column_id: number;
    id: number;
    node_id: string;
    note: string;
    archived: boolean;
    creator: {
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
    created_at: string;
    updated_at: string;
  };
  repository: Repository;
  sender: User;
  organization?: Organization;
  installation?: Installation;
}
