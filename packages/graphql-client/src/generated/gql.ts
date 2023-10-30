/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment Project_BaseDetails on Project {\n    id\n    title\n    description\n    releaseAt\n    blockchain\n    storage\n    pricing\n    curator {\n      id\n      status\n      username\n    }\n    author {\n      id\n      status\n      username\n    }\n    projectMedias {\n      index\n      media {\n        id\n        url\n      }\n    }\n  }\n": types.Project_BaseDetailsFragmentDoc,
    "\n  fragment Project_UserSecrets on Project {\n    state\n  }\n": types.Project_UserSecretsFragmentDoc,
    "\n  query GetAllProjects {\n    Project {\n      ...Project_BaseDetails\n    }\n  }\n": types.GetAllProjectsDocument,
    "\n  query GetUserSubmissions($authorId: uuid!) {\n    Project(where: { authorId: { _eq: $authorId } }) {\n      ...Project_BaseDetails\n      ...Project_UserSecrets\n    }\n  }\n": types.GetUserSubmissionsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Project_BaseDetails on Project {\n    id\n    title\n    description\n    releaseAt\n    blockchain\n    storage\n    pricing\n    curator {\n      id\n      status\n      username\n    }\n    author {\n      id\n      status\n      username\n    }\n    projectMedias {\n      index\n      media {\n        id\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment Project_BaseDetails on Project {\n    id\n    title\n    description\n    releaseAt\n    blockchain\n    storage\n    pricing\n    curator {\n      id\n      status\n      username\n    }\n    author {\n      id\n      status\n      username\n    }\n    projectMedias {\n      index\n      media {\n        id\n        url\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Project_UserSecrets on Project {\n    state\n  }\n"): (typeof documents)["\n  fragment Project_UserSecrets on Project {\n    state\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllProjects {\n    Project {\n      ...Project_BaseDetails\n    }\n  }\n"): (typeof documents)["\n  query GetAllProjects {\n    Project {\n      ...Project_BaseDetails\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserSubmissions($authorId: uuid!) {\n    Project(where: { authorId: { _eq: $authorId } }) {\n      ...Project_BaseDetails\n      ...Project_UserSecrets\n    }\n  }\n"): (typeof documents)["\n  query GetUserSubmissions($authorId: uuid!) {\n    Project(where: { authorId: { _eq: $authorId } }) {\n      ...Project_BaseDetails\n      ...Project_UserSecrets\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;