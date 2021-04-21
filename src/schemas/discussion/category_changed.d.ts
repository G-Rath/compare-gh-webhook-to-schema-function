/* tslint:disable */
import {
  Discussion,
  InstallationLite,
  Organization,
  Repository,
  User
} from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface DiscussionCategoryChangedEvent {
  changes: {
    category: {
      from: {
        id: number;
        repository_id: number;
        emoji: string;
        name: string;
        description: string;
        created_at: string;
        updated_at: string;
        slug: string;
        is_answerable: boolean;
      };
    };
  };
  action: 'category_changed';
  discussion: Discussion;
  repository: Repository;
  sender: User;
  installation?: InstallationLite;
  organization?: Organization;
}