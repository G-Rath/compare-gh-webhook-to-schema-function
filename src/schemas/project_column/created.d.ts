/* tslint:disable */
import { InstallationLite, Organization, Repository, User } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface ProjectColumnCreatedEvent {
  action: 'created';
  project_column: {
    url: string;
    project_url: string;
    cards_url: string;
    /**
     * The unique identifier of the project column
     */
    id: number;
    node_id: string;
    /**
     * Name of the project column
     */
    name: string;
    created_at: string;
    updated_at: string;
  };
  repository: Repository;
  sender: User;
  installation?: InstallationLite;
  organization?: Organization;
}
