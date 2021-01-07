/* tslint:disable */
import { Installation, Organization, Repository, User } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface PullRequestOpenedEvent {
  action: 'opened';
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
    state: string;
    locked: boolean;
    title: string;
    user: {
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
    body: string;
    created_at: string;
    updated_at: string;
    closed_at: null | string;
    merged_at: null | string;
    merge_commit_sha: null | string;
    assignee: null | {
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
    assignees: {
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
    }[];
    requested_reviewers: unknown[];
    requested_teams: unknown[];
    labels: unknown[];
    milestone: null | {
      url: string;
      html_url: string;
      labels_url: string;
      id: number;
      node_id: string;
      number: number;
      title: string;
      description: string;
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
      open_issues: number;
      closed_issues: number;
      state: string;
      created_at: string;
      updated_at: string;
      due_on: string;
      closed_at: string;
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
      user: {
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
      repo: {
        id: number;
        node_id: string;
        name: string;
        full_name: string;
        private: boolean;
        owner: {
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
        html_url: string;
        description: null;
        fork: boolean;
        url: string;
        forks_url: string;
        keys_url: string;
        collaborators_url: string;
        teams_url: string;
        hooks_url: string;
        issue_events_url: string;
        events_url: string;
        assignees_url: string;
        branches_url: string;
        tags_url: string;
        blobs_url: string;
        git_tags_url: string;
        git_refs_url: string;
        trees_url: string;
        statuses_url: string;
        languages_url: string;
        stargazers_url: string;
        contributors_url: string;
        subscribers_url: string;
        subscription_url: string;
        commits_url: string;
        git_commits_url: string;
        comments_url: string;
        issue_comment_url: string;
        contents_url: string;
        compare_url: string;
        merges_url: string;
        archive_url: string;
        downloads_url: string;
        issues_url: string;
        pulls_url: string;
        milestones_url: string;
        notifications_url: string;
        labels_url: string;
        releases_url: string;
        deployments_url: string;
        created_at: string;
        updated_at: string;
        pushed_at: string;
        git_url: string;
        ssh_url: string;
        clone_url: string;
        svn_url: string;
        homepage: null;
        size: number;
        stargazers_count: number;
        watchers_count: number;
        language: null | string;
        has_issues: boolean;
        has_projects: boolean;
        has_downloads: boolean;
        has_wiki: boolean;
        has_pages: boolean;
        forks_count: number;
        mirror_url: null;
        archived: boolean;
        disabled: boolean;
        open_issues_count: number;
        license: null;
        forks: number;
        open_issues: number;
        watchers: number;
        default_branch: string;
      };
    };
    base: {
      label: string;
      ref: string;
      sha: string;
      user: {
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
      repo: {
        id: number;
        node_id: string;
        name: string;
        full_name: string;
        private: boolean;
        owner: {
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
        html_url: string;
        description: null;
        fork: boolean;
        url: string;
        forks_url: string;
        keys_url: string;
        collaborators_url: string;
        teams_url: string;
        hooks_url: string;
        issue_events_url: string;
        events_url: string;
        assignees_url: string;
        branches_url: string;
        tags_url: string;
        blobs_url: string;
        git_tags_url: string;
        git_refs_url: string;
        trees_url: string;
        statuses_url: string;
        languages_url: string;
        stargazers_url: string;
        contributors_url: string;
        subscribers_url: string;
        subscription_url: string;
        commits_url: string;
        git_commits_url: string;
        comments_url: string;
        issue_comment_url: string;
        contents_url: string;
        compare_url: string;
        merges_url: string;
        archive_url: string;
        downloads_url: string;
        issues_url: string;
        pulls_url: string;
        milestones_url: string;
        notifications_url: string;
        labels_url: string;
        releases_url: string;
        deployments_url: string;
        created_at: string;
        updated_at: string;
        pushed_at: string;
        git_url: string;
        ssh_url: string;
        clone_url: string;
        svn_url: string;
        homepage: null;
        size: number;
        stargazers_count: number;
        watchers_count: number;
        language: null | string;
        has_issues: boolean;
        has_projects: boolean;
        has_downloads: boolean;
        has_wiki: boolean;
        has_pages: boolean;
        forks_count: number;
        mirror_url: null;
        archived: boolean;
        disabled: boolean;
        open_issues_count: number;
        license: null;
        forks: number;
        open_issues: number;
        watchers: number;
        default_branch: string;
      };
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
    author_association: string;
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
  installation?: Installation | null;
  organization?: Organization | null;
  sender: User;
}
