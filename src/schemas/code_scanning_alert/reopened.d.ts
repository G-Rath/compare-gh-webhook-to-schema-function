/* tslint:disable */
import { InstallationLite, Organization, Repository } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface CodeScanningAlertReopenedEvent {
  action: 'reopened';
  alert: {
    /**
     * The code scanning alert number.
     */
    number: number;
    /**
     * The time that the alert was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ.`
     */
    created_at: string;
    url: string;
    /**
     * The GitHub URL of the alert resource.
     */
    html_url: string;
    instances: {
      /**
       * The full Git reference, formatted as `refs/heads/<branch name>`.
       */
      ref: string;
      /**
       * Identifies the configuration under which the analysis was executed. For example, in GitHub Actions this includes the workflow filename and job name.
       */
      analysis_key: string;
      /**
       * Identifies the variable values associated with the environment in which the analysis that generated this alert instance was performed, such as the language that was analyzed.
       */
      environment: string;
      /**
       * State of a code scanning alert.
       */
      state: 'open';
    }[];
    /**
     * State of a code scanning alert.
     */
    state: 'open' | 'dismissed' | 'fixed';
    dismissed_by: null;
    /**
     * The time that the alert was dismissed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
     */
    dismissed_at: null;
    /**
     * The reason for dismissing or closing the alert. Can be one of: `false positive`, `won't fix`, and `used in tests`.
     */
    dismissed_reason: null;
    rule: {
      /**
       * A unique identifier for the rule used to detect the alert.
       */
      id: string;
      /**
       * The severity of the alert.
       */
      severity: 'none' | 'note' | 'warning' | 'error' | null;
      /**
       * A short description of the rule used to detect the alert.
       */
      description: string;
    };
    tool: {
      /**
       * The name of the tool used to generate the code scanning analysis alert.
       */
      name: string;
      /**
       * The version of the tool used to detect the alert.
       */
      version: string | null;
    };
  };
  /**
   * The full Git reference, formatted as `refs/heads/<branch name>`.
   */
  ref: string;
  commit_oid: string;
  repository: Repository;
  installation?: InstallationLite;
  organization?: Organization;
}
