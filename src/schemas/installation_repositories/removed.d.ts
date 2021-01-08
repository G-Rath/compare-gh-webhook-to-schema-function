/* tslint:disable */
import { User } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface InstallationRepositoriesRemovedEvent {
  action: 'removed';
  installation: {
    id: number;
    account: {
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
    repository_selection: string;
    access_tokens_url: string;
    repositories_url: string;
    html_url: string;
    app_id: number;
    target_id: number;
    target_type: string;
    permissions: {
      administration?: string;
      statuses?: string;
      repository_projects?: string;
      repository_hooks?: string;
      pull_requests?: string;
      pages?: string;
      issues?: string;
      deployments?: string;
      contents?: string;
      checks?: string;
      metadata?: string;
      vulnerability_alerts?: string;
    };
    events: unknown[];
    created_at: number;
    updated_at: number;
    single_file_name: string | null;
  };
  repository_selection: string;
  repositories_added: {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
  }[];
  repositories_removed: unknown[];
  sender: User;
}
