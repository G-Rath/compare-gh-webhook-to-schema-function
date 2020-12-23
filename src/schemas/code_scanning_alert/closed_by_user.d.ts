/* tslint:disable */
import { Installation, Organization, Repository, User } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface CodeScanningAlertClosedByUserEvent {
  action: 'closed_by_user';
  alert: {
    number: number;
    created_at: string;
    url: string;
    html_url: string;
    instances: {
      ref: string;
      analysis_key: string;
      environment: string;
      state: string;
    }[];
    state: string;
    dismissed_by: null;
    dismissed_at: null;
    dismissed_reason: null;
    rule: {
      id: string;
      severity: string;
      description: string;
    };
    tool: {
      name: string;
      version: null;
    };
  };
  ref: string;
  commit_oid: string;
  repository: Repository;
  sender?: User;
  installation?: Installation;
  organization: Organization;
}
