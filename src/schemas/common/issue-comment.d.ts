/* tslint:disable */
import { App, AuthorAssociation, User } from '.';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * The [comment](https://docs.github.com/en/rest/reference/issues#comments) itself.
 */
export interface IssueComment {
  /**
   * URL for the issue comment
   */
  url: string;
  html_url: string;
  issue_url: string;
  /**
   * Unique identifier of the issue comment
   */
  id: number;
  node_id: string;
  user: User;
  created_at: string;
  updated_at: string;
  author_association: AuthorAssociation;
  /**
   * Contents of the issue comment
   */
  body: string;
  performed_via_github_app: App | null;
}