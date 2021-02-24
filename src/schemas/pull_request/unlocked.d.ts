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

export interface PullRequestUnlockedEvent {
  action: 'unlocked';
  number: number;
  pull_request: PullRequest;
  repository: Repository;
  installation?: InstallationLite;
  organization?: Organization;
  sender: User;
}
