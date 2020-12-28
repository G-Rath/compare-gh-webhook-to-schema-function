/* tslint:disable */
import { Installation, Organization, Repository, User } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface RepositoryDeletedEvent {
  action: 'deleted';
  changes?: {
    [k: string]: unknown;
  };
  repository: Repository;
  sender: User;
  installation?: Installation;
  organization?: Organization;
}
