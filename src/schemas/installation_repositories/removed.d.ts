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
    account: User;
    repository_selection: 'all' | 'selected';
    access_tokens_url: string;
    repositories_url: string;
    html_url: string;
    app_id: number;
    target_id: number;
    target_type: string;
    permissions: {
      administration?: 'read' | 'write';
      statuses?: 'read' | 'write';
      repository_projects?: 'read' | 'write';
      repository_hooks?: 'read' | 'write';
      pull_requests?: 'read' | 'write';
      pages?: 'read' | 'write';
      issues?: 'read' | 'write';
      deployments?: 'read' | 'write';
      contents?: 'read' | 'write';
      checks?: 'read' | 'write';
      metadata?: 'read' | 'write';
      vulnerability_alerts?: 'read' | 'write';
    };
    events: string[];
    created_at: number;
    updated_at: number;
    single_file_name: string | null;
  };
  repository_selection: string;
  repositories_added: [];
  repositories_removed: {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
  }[];
  sender: User;
}
