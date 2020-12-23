/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface WorkflowRunEvent {
  action: string;
  organization: {
    avatar_url: string;
    description: string;
    events_url: string;
    hooks_url: string;
    id: number;
    issues_url: string;
    login: string;
    members_url: string;
    node_id: string;
    public_members_url: string;
    repos_url: string;
    url: string;
  };
  repository: {
    archive_url: string;
    archived: boolean;
    assignees_url: string;
    blobs_url: string;
    branches_url: string;
    clone_url: string;
    collaborators_url: string;
    comments_url: string;
    commits_url: string;
    compare_url: string;
    contents_url: string;
    contributors_url: string;
    created_at: string;
    default_branch: string;
    deployments_url: string;
    description: string;
    disabled: boolean;
    downloads_url: string;
    events_url: string;
    fork: boolean;
    forks: number;
    forks_count: number;
    forks_url: string;
    full_name: string;
    git_commits_url: string;
    git_refs_url: string;
    git_tags_url: string;
    git_url: string;
    has_downloads: boolean;
    has_issues: boolean;
    has_pages: boolean;
    has_projects: boolean;
    has_wiki: boolean;
    homepage: null;
    hooks_url: string;
    html_url: string;
    id: number;
    issue_comment_url: string;
    issue_events_url: string;
    issues_url: string;
    keys_url: string;
    labels_url: string;
    language: string;
    languages_url: string;
    license: {
      key: string;
      name: string;
      node_id: string;
      spdx_id: string;
      url: string;
    };
    merges_url: string;
    milestones_url: string;
    mirror_url: null;
    name: string;
    node_id: string;
    notifications_url: string;
    open_issues: number;
    open_issues_count: number;
    owner: {
      avatar_url: string;
      events_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      gravatar_id: string;
      html_url: string;
      id: number;
      login: string;
      node_id: string;
      organizations_url: string;
      received_events_url: string;
      repos_url: string;
      site_admin: boolean;
      starred_url: string;
      subscriptions_url: string;
      type: string;
      url: string;
    };
    private: boolean;
    pulls_url: string;
    pushed_at: string;
    releases_url: string;
    size: number;
    ssh_url: string;
    stargazers_count: number;
    stargazers_url: string;
    statuses_url: string;
    subscribers_url: string;
    subscription_url: string;
    svn_url: string;
    tags_url: string;
    teams_url: string;
    trees_url: string;
    updated_at: string;
    url: string;
    watchers: number;
    watchers_count: number;
  };
  sender: {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
  };
  workflow: {
    badge_url: string;
    created_at: string;
    html_url: string;
    id: number;
    name: string;
    node_id: string;
    path: string;
    state: string;
    updated_at: string;
    url: string;
  };
  workflow_run: {
    artifacts_url: string;
    cancel_url: string;
    check_suite_url: string;
    conclusion: string | null;
    created_at: string;
    event: string;
    head_branch: string;
    head_commit: {
      author: {
        email: string;
        name: string;
      };
      committer: {
        email: string;
        name: string;
      };
      id: string;
      message: string;
      timestamp: string;
      tree_id: string;
    };
    head_repository: {
      archive_url: string;
      assignees_url: string;
      blobs_url: string;
      branches_url: string;
      collaborators_url: string;
      comments_url: string;
      commits_url: string;
      compare_url: string;
      contents_url: string;
      contributors_url: string;
      deployments_url: string;
      description: string;
      downloads_url: string;
      events_url: string;
      fork: boolean;
      forks_url: string;
      full_name: string;
      git_commits_url: string;
      git_refs_url: string;
      git_tags_url: string;
      hooks_url: string;
      html_url: string;
      id: number;
      issue_comment_url: string;
      issue_events_url: string;
      issues_url: string;
      keys_url: string;
      labels_url: string;
      languages_url: string;
      merges_url: string;
      milestones_url: string;
      name: string;
      node_id: string;
      notifications_url: string;
      owner: {
        avatar_url: string;
        events_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        gravatar_id: string;
        html_url: string;
        id: number;
        login: string;
        node_id: string;
        organizations_url: string;
        received_events_url: string;
        repos_url: string;
        site_admin: boolean;
        starred_url: string;
        subscriptions_url: string;
        type: string;
        url: string;
      };
      private: boolean;
      pulls_url: string;
      releases_url: string;
      stargazers_url: string;
      statuses_url: string;
      subscribers_url: string;
      subscription_url: string;
      tags_url: string;
      teams_url: string;
      trees_url: string;
      url: string;
    };
    head_sha: string;
    html_url: string;
    id: number;
    jobs_url: string;
    logs_url: string;
    node_id: string;
    pull_requests: unknown[];
    repository: {
      archive_url: string;
      assignees_url: string;
      blobs_url: string;
      branches_url: string;
      collaborators_url: string;
      comments_url: string;
      commits_url: string;
      compare_url: string;
      contents_url: string;
      contributors_url: string;
      deployments_url: string;
      description: string;
      downloads_url: string;
      events_url: string;
      fork: boolean;
      forks_url: string;
      full_name: string;
      git_commits_url: string;
      git_refs_url: string;
      git_tags_url: string;
      hooks_url: string;
      html_url: string;
      id: number;
      issue_comment_url: string;
      issue_events_url: string;
      issues_url: string;
      keys_url: string;
      labels_url: string;
      languages_url: string;
      merges_url: string;
      milestones_url: string;
      name: string;
      node_id: string;
      notifications_url: string;
      owner: {
        avatar_url: string;
        events_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        gravatar_id: string;
        html_url: string;
        id: number;
        login: string;
        node_id: string;
        organizations_url: string;
        received_events_url: string;
        repos_url: string;
        site_admin: boolean;
        starred_url: string;
        subscriptions_url: string;
        type: string;
        url: string;
      };
      private: boolean;
      pulls_url: string;
      releases_url: string;
      stargazers_url: string;
      statuses_url: string;
      subscribers_url: string;
      subscription_url: string;
      tags_url: string;
      teams_url: string;
      trees_url: string;
      url: string;
    };
    rerun_url: string;
    run_number: number;
    status: string;
    updated_at: string;
    url: string;
    workflow_id: number;
    workflow_url: string;
  };
}
