/* tslint:disable */
import { User } from '.';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * The project item itself. To find more information about the project item, you can use `node_id` (the node ID of the project item) and `project_node_id` (the node ID of the project) to query information in the GraphQL API. For more information, see "[Using the API to manage projects](https://docs.github.com/en/issues/trying-out-the-new-projects-experience/using-the-api-to-manage-projects)."
 */
export interface ProjectsV2Item {
  id: number;
  node_id: string;
  project_node_id: string;
  content_node_id: string;
  content_type: 'DraftIssue' | 'Issue' | 'PullRequest';
  creator: User;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
}
