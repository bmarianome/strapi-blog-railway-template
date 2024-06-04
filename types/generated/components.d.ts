import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsMetadata extends Schema.Component {
  collectionName: 'components_components_metadata';
  info: {
    displayName: 'Metadata';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    authors: Attribute.Relation<
      'components.metadata',
      'oneToMany',
      'api::author.author'
    >;
    category: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.metadata': ComponentsMetadata;
    }
  }
}
