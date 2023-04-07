/* tslint:disable */
import { Committer } from '.';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Commit {
  id: string;
  tree_id: string;
  /**
   * Whether this commit is distinct from any that have been pushed before.
   */
  distinct: boolean;
  /**
   * The commit message.
   */
  message: string;
  /**
   * The ISO 8601 timestamp of the commit.
   */
  timestamp: string;
  /**
   * URL that points to the commit API resource.
   */
  url: string;
  author: Committer;
  committer: Committer;
  /**
   * An array of files added in the commit. For extremely large commits where GitHub is unable to calculate this list in a timely manner, this may be empty even if files were added.
   */
  added: string[];
  /**
   * An array of files modified by the commit. For extremely large commits where GitHub is unable to calculate this list in a timely manner, this may be empty even if files were modified.
   */
  modified: string[];
  /**
   * An array of files removed in the commit. For extremely large commits where GitHub is unable to calculate this list in a timely manner, this may be empty even if files were removed.
   */
  removed: string[];
}
