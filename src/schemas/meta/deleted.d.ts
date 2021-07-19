/* tslint:disable */
import { Repository, User, WebhookEvents } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface MetaDeletedEvent {
  action: 'deleted';
  /**
   * The id of the modified webhook.
   */
  hook_id: number;
  /**
   * The modified webhook. This will contain different keys based on the type of webhook it is: repository, organization, business, app, or GitHub Marketplace.
   */
  hook: {
    type: string;
    id: number;
    name: string;
    active: boolean;
    events: WebhookEvents;
    config: {
      content_type: 'json' | 'form';
      insecure_ssl: string;
      url: string;
    };
    updated_at: string;
    created_at: string;
  };
  repository: Repository;
  sender: User;
}
