/* tslint:disable */
import { Installation, Organization, Repository, Team, User } from '../common';
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
    closed_at: string | null;
    merged_at: string | null;
    merge_commit_sha: string | null;
    assignee: User | null;
    assignees: User[];
    requested_reviewers: (User | Team)[];
    requested_teams: Team[];
    labels: {
      id: number;
      node_id: string;
      url: string;
      name: string;
      color: string;
      default: boolean;
    }[];
    milestone: {
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
      closed_at: string | null;
    } | null;
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
    active_lock_reason: 'resolved' | 'off-topic' | 'too heated' | 'spam' | null;
    draft: boolean;
    merged: boolean;
    mergeable: boolean | null;
    rebaseable: boolean | null;
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
  assignee?: User;
  repository: Repository;
  installation?: Installation;
  organization?: Organization;
  sender: User;
}
