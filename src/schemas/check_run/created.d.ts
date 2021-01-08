/* tslint:disable */
import { Installation, Organization, Repository, User } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface CheckRunCreatedEvent {
  action: 'created';
  check_run: {
    id: number;
    node_id?: string;
    head_sha: string;
    external_id: string;
    url: string;
    html_url: string;
    details_url?: string;
    status: 'queued' | 'in_progress' | 'completed';
    conclusion:
      | null
      | (
          | 'success'
          | 'failure'
          | 'neutral'
          | 'cancelled'
          | 'timed_out'
          | 'action_required'
          | 'stale'
        );
    started_at: string;
    completed_at: null | string;
    output: {
      title?: null | string;
      summary: null | string;
      text: null | string;
      annotations_count: number;
      annotations_url: string;
    };
    name: string;
    check_suite: {
      id: number;
      node_id?: string;
      head_branch: string;
      head_sha: string;
      status: string;
      conclusion: null | string;
      url: string;
      before: string;
      after: string;
      pull_requests: {
        url: string;
        id: number;
        number: number;
        head: {
          ref: string;
          sha: string;
          repo: {
            id: number;
            url: string;
            name: string;
          };
        };
        base: {
          ref: string;
          sha: string;
          repo: {
            id: number;
            url: string;
            name: string;
          };
        };
      }[];
      app: {
        id: number;
        slug?: string;
        node_id: string;
        owner: User;
        name: string;
        description: null | string;
        external_url: string;
        html_url: string;
        created_at: string;
        updated_at: string;
        permissions?: {
          administration?: string;
          checks?: string;
          contents?: string;
          deployments?: string;
          issues?: string;
          members?: string;
          metadata?: string;
          organization_administration?: string;
          organization_hooks?: string;
          organization_plan?: string;
          organization_projects?: string;
          organization_user_blocking?: string;
          pages?: string;
          pull_requests?: string;
          repository_hooks?: string;
          repository_projects?: string;
          statuses?: string;
          team_discussions?: string;
          vulnerability_alerts?: string;
        };
        events?: unknown[];
      };
      created_at: string;
      updated_at: string;
    };
    app: {
      id: number;
      slug?: string;
      node_id: string;
      owner: User;
      name: string;
      description: null | string;
      external_url: string;
      html_url: string;
      created_at: string;
      updated_at: string;
      permissions?: {
        administration?: string;
        checks?: string;
        contents?: string;
        deployments?: string;
        issues?: string;
        members?: string;
        metadata?: string;
        organization_administration?: string;
        organization_hooks?: string;
        organization_plan?: string;
        organization_projects?: string;
        organization_user_blocking?: string;
        pages?: string;
        pull_requests?: string;
        repository_hooks?: string;
        repository_projects?: string;
        statuses?: string;
        team_discussions?: string;
        vulnerability_alerts?: string;
      };
      events?: unknown[];
    };
    pull_requests: {
      url: string;
      id: number;
      number: number;
      head: {
        ref: string;
        sha: string;
        repo: {
          id: number;
          url: string;
          name: string;
        };
      };
      base: {
        ref: string;
        sha: string;
        repo: {
          id: number;
          url: string;
          name: string;
        };
      };
    }[];
  };
  requested_action?: {
    identifier?: string;
    [k: string]: unknown;
  } | null;
  repository: Repository;
  sender: User;
  installation?: Installation;
  organization?: Organization;
}
