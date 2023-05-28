/* tslint:disable */
import {
  InstallationLite,
  Organization,
  Repository,
  SecretScanningAlert,
  User
} from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface SecretScanningAlertRevokedEvent {
  action: 'revoked';
  alert: SecretScanningAlert & {
    resolution: 'revoked';
    resolved_by: User;
    resolved_at: string;
  };
  repository: Repository;
  organization?: Organization;
  installation?: InstallationLite;
  sender: User;
}