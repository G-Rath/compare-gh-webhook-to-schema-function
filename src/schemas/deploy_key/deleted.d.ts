/* tslint:disable */
import { Installation, Organization, Repository, User } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface DeployKeyDeletedEvent {
  action: 'deleted';
  key: {
    id: number;
    key: string;
    url: string;
    title: string;
    verified: boolean;
    created_at: string;
    read_only: boolean;
  };
  repository: Repository;
  sender: User;
  installation?: Installation | null;
  organization?: Organization | null;
}
