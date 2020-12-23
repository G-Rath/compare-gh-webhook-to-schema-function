/* tslint:disable */
import { Organization, Repository, User } from '../common';
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface PackagePublishedEvent {
  action: 'published';
  package: {
    id: number;
    name: string;
    package_type: string;
    html_url: string;
    created_at: string;
    updated_at: string;
    owner: {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      site_admin: boolean;
    };
    package_version: {
      id: number;
      version: string;
      summary: string;
      body: string;
      body_html: string;
      release: {
        url: string;
        html_url: string;
        id: number;
        tag_name: string;
        target_commitish: string;
        name: string;
        draft: boolean;
        author: {
          login: string;
          id: number;
          node_id: string;
          avatar_url: string;
          gravatar_id: string;
          url: string;
          html_url: string;
          followers_url: string;
          following_url: string;
          gists_url: string;
          starred_url: string;
          subscriptions_url: string;
          organizations_url: string;
          repos_url: string;
          events_url: string;
          received_events_url: string;
          type: string;
          site_admin: boolean;
        };
        prerelease: boolean;
        created_at: string;
        published_at: string;
      };
      manifest: string;
      html_url: string;
      tag_name: string;
      target_commitish: string;
      target_oid: string;
      draft: boolean;
      prerelease: boolean;
      created_at: string;
      updated_at: string;
      metadata: unknown[];
      package_files: {
        download_url: string;
        id: number;
        name: string;
        sha256: string;
        sha1: string;
        md5: string;
        content_type: string;
        state: string;
        size: number;
        created_at: string;
        updated_at: string;
      }[];
      author: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
      };
      installation_command: string;
    };
    registry: {
      about_url: string;
      name: string;
      type: string;
      url: string;
      vendor: string;
    };
  };
  repository: Repository;
  sender: User;
  organization?: Organization;
}
