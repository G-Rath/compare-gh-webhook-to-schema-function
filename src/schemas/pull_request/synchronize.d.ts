/* tslint:disable */
import { Installation, Organization, Repository, User } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface PullRequestSynchronizeEvent {
  action: 'synchronize';
  number: number;
  pull_request: {
    url: string;
    id: number;
    node_id: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    number: number;
    state: 'open' | 'closed';
    locked: boolean;
    title: string;
    user: User;
    body: string;
    created_at: string;
    updated_at: string;
    closed_at: null | string;
    merged_at: null | string;
    merge_commit_sha: null | string;
    assignee: null | User;
    assignees: User[];
    requested_reviewers: User[];
    requested_teams: unknown[];
    labels: {
      id: number;
      node_id: string;
      url: string;
      name: string;
      color: string;
      default: boolean;
    }[];
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
      closed_at: null | string;
    };
    commits_url: string;
    review_comments_url: string;
    review_comment_url: string;
    comments_url: string;
    statuses_url: string;
    head: {
      label: string;
      ref: string;
      sha: string;
      user: User;
      repo: Repository;
    };
    base: {
      label: string;
      ref: string;
      sha: string;
      user: User;
      repo: Repository;
    };
    _links: {
      self: {
        href: string;
      };
      html: {
        href: string;
      };
      issue: {
        href: string;
      };
      comments: {
        href: string;
      };
      review_comments: {
        href: string;
      };
      review_comment: {
        href: string;
      };
      commits: {
        href: string;
      };
      statuses: {
        href: string;
      };
    };
    author_association:
      | 'COLLABORATOR'
      | 'CONTRIBUTOR'
      | 'FIRST_TIMER'
      | 'FIRST_TIME_CONTRIBUTOR'
      | 'MANNEQUIN'
      | 'MEMBER'
      | 'NONE'
      | 'OWNER';
    active_lock_reason:
      | null
      | ('resolved' | 'off-topic' | 'too heated' | 'spam');
    draft: boolean;
    merged: boolean;
    mergeable: null | boolean;
    rebaseable: null | boolean;
    mergeable_state: string;
    merged_by: null;
    comments: number;
    review_comments: number;
    maintainer_can_modify: boolean;
    commits: number;
    additions: number;
    deletions: number;
    changed_files: number;
  };
  label?: {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
  };
  assignee?: {
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
  repository: Repository;
  installation?: Installation;
  organization?: Organization;
  sender: User;
}
