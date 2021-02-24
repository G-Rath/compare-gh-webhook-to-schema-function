/* tslint:disable */
import {
  InstallationLite,
  Organization,
  PullRequest,
  Repository,
  User
} from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface PullRequestConvertedToDraftEvent {
  action: 'converted_to_draft';
  number: number;
  pull_request: PullRequest & {
    closed_at: null;
    merged_at: null;
    merge_commit_sha: null;
    /**
     * Indicates whether or not the pull request is a draft.
     */
    draft: true;
    merged: boolean;
    merged_by: null;
  };
  repository: Repository;
  installation?: InstallationLite;
  organization?: Organization;
  sender: User;
}
