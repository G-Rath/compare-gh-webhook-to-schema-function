/* tslint:disable */
import { InstallationLite, Organization, Repository, User } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface MergeGroupChecksRequestedEvent {
  action: 'checks_requested';
  /**
   * The merge group.
   */
  merge_group: {
    /**
     * The SHA of the merge group.
     */
    head_sha: string;
    /**
     * The full ref of the merge group.
     */
    head_ref: string;
    /**
     * The full ref of the branch the merge group will be merged into.
     */
    base_ref: string;
    /**
     * The SHA of the merge group's parent commit.
     */
    base_sha: string;
    /**
     * An expanded representation of the `head_sha` commit.
     */
    head_commit: {
      id: string;
      tree_id: string;
      message: string;
      timestamp: string;
      author: {
        name: string;
        email: string;
      };
      committer: {
        name: string;
        email: string;
      };
    };
  };
  repository: Repository;
  sender: User;
  installation?: InstallationLite;
  organization?: Organization;
}
