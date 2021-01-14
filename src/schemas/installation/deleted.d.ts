/* tslint:disable */
import { User } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface InstallationDeletedEvent {
  action: 'deleted';
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
    repository_selection: 'all' | 'selected';
    access_tokens_url: string;
    repositories_url: string;
    html_url: string;
    app_id: number;
    app_slug?: string;
    target_id: number;
    target_type: 'User' | 'Organization';
    permissions: {
      administration?: string;
      checks?: 'read' | 'write';
      contents?: 'read' | 'write';
      deployments?: 'read' | 'write';
      issues?: 'read' | 'write';
      pages?: 'read' | 'write';
      pull_requests?: 'read' | 'write';
      repository_hooks?: 'read' | 'write';
      repository_projects?: 'read' | 'write';
      statuses?: 'read' | 'write';
      metadata?: 'read' | 'write';
      vulnerability_alerts?: 'read' | 'write';
    };
    events: string[];
    created_at: number;
    updated_at: number;
    single_file_name: string | null;
    has_multiple_single_files?: boolean;
    single_file_paths?: string[];
    suspended_by?: string | null;
    suspended_at?: string | null;
  };
  repositories?: {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
  }[];
  requester?: null;
  sender: User;
}
