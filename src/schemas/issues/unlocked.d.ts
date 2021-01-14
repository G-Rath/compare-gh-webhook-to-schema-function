/* tslint:disable */
import { Installation, Organization, Repository, User } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface IssuesUnlockedEvent {
  action: 'unlocked';
  issue: {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    user: User;
    labels?: {
      id: number;
      node_id: string;
      url: string;
      name: string;
      color: string;
      default: boolean;
    }[];
    state?: 'open' | 'closed';
    locked?: false;
    assignee?: null | User;
    assignees: User[];
    milestone: null | {
      url: string;
      html_url: string;
      labels_url: string;
      id: number;
      node_id: string;
      number: number;
      title: string;
      description: string;
      creator: User;
      open_issues: number;
      closed_issues: number;
      state: string;
      created_at: string;
      updated_at: string;
      due_on: string;
      closed_at: string;
    };
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at: null | string;
    author_association:
      | 'COLLABORATOR'
      | 'CONTRIBUTOR'
      | 'FIRST_TIMER'
      | 'FIRST_TIME_CONTRIBUTOR'
      | 'MANNEQUIN'
      | 'MEMBER'
      | 'NONE'
      | 'OWNER';
    active_lock_reason: null;
    performed_via_github_app?: null;
    pull_request?: {
      url?: string;
      html_url?: string;
      diff_url?: string;
      patch_url?: string;
      [k: string]: unknown;
    };
    body: string;
  };
  label?: {
    id?: number;
    node_id?: string;
    url?: string;
    name?: string;
    color?: string;
    default?: boolean;
    [k: string]: unknown;
  };
  assignee?: null | User;
  assignees?: [] | [User];
  repository: Repository;
  sender: User;
  installation?: Installation;
  organization?: Organization;
}
