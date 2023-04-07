/* tslint:disable */
import {
  AuthorAssociation,
  Label,
  Link,
  Milestone,
  PullRequestAutoMerge,
  Repository,
  Team,
  User
} from '.';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface PullRequest {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  /**
   * Number uniquely identifying the pull request within its repository.
   */
  number: number;
  /**
   * State of this Pull Request. Either `open` or `closed`.
   */
  state: 'open' | 'closed';
  locked: boolean;
  /**
   * The title of the pull request.
   */
  title: string;
  user: User;
  body: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  merge_commit_sha: string | null;
  assignee: User | null;
  assignees: User[];
  requested_reviewers: (User | Team)[];
  requested_teams: Team[];
  labels: Label[];
  milestone: Milestone | null;
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
    repo: Repository | null;
  };
  base: {
    label: string;
    ref: string;
    sha: string;
    user: User;
    repo: Repository;
  };
  _links: {
    self: Link;
    html: Link;
    issue: Link;
    comments: Link;
    review_comments: Link;
    review_comment: Link;
    commits: Link;
    statuses: Link;
  };
  author_association: AuthorAssociation;
  auto_merge: PullRequestAutoMerge | null;
  active_lock_reason: 'resolved' | 'off-topic' | 'too heated' | 'spam' | null;
  /**
   * Indicates whether or not the pull request is a draft.
   */
  draft: boolean;
  merged: boolean | null;
  mergeable: boolean | null;
  rebaseable: boolean | null;
  mergeable_state: string;
  merged_by: User | null;
  comments: number;
  review_comments: number;
  /**
   * Indicates whether maintainers can modify the pull request.
   */
  maintainer_can_modify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
}
