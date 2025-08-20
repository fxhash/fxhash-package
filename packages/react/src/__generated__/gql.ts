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
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment UserBadgeFragment on user {\n    __typename\n    id\n    ...UserDisplayFragment\n    collaborations {\n      __typename\n      collaborator {\n        __typename\n        id\n        flag\n        ...UserDisplayFragment\n      }\n    }\n  }\n": typeof types.UserBadgeFragmentFragmentDoc,
    "\n  fragment UserDisplayFragment on user {\n    __typename\n    id\n    flag\n    wallet {\n      address\n      account {\n        id\n        username\n        isVerified\n      }\n    }\n  }\n": typeof types.UserDisplayFragmentFragmentDoc,
    "\n  query IndexedTransactionQuery($txId: String!) {\n    onchain {\n      action(where: { op_hash: { _eq: $txId } }) {\n        id\n      }\n    }\n  }\n": typeof types.IndexedTransactionQueryDocument,
};
const documents: Documents = {
    "\n  fragment UserBadgeFragment on user {\n    __typename\n    id\n    ...UserDisplayFragment\n    collaborations {\n      __typename\n      collaborator {\n        __typename\n        id\n        flag\n        ...UserDisplayFragment\n      }\n    }\n  }\n": types.UserBadgeFragmentFragmentDoc,
    "\n  fragment UserDisplayFragment on user {\n    __typename\n    id\n    flag\n    wallet {\n      address\n      account {\n        id\n        username\n        isVerified\n      }\n    }\n  }\n": types.UserDisplayFragmentFragmentDoc,
    "\n  query IndexedTransactionQuery($txId: String!) {\n    onchain {\n      action(where: { op_hash: { _eq: $txId } }) {\n        id\n      }\n    }\n  }\n": types.IndexedTransactionQueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UserBadgeFragment on user {\n    __typename\n    id\n    ...UserDisplayFragment\n    collaborations {\n      __typename\n      collaborator {\n        __typename\n        id\n        flag\n        ...UserDisplayFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment UserBadgeFragment on user {\n    __typename\n    id\n    ...UserDisplayFragment\n    collaborations {\n      __typename\n      collaborator {\n        __typename\n        id\n        flag\n        ...UserDisplayFragment\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UserDisplayFragment on user {\n    __typename\n    id\n    flag\n    wallet {\n      address\n      account {\n        id\n        username\n        isVerified\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment UserDisplayFragment on user {\n    __typename\n    id\n    flag\n    wallet {\n      address\n      account {\n        id\n        username\n        isVerified\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query IndexedTransactionQuery($txId: String!) {\n    onchain {\n      action(where: { op_hash: { _eq: $txId } }) {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query IndexedTransactionQuery($txId: String!) {\n    onchain {\n      action(where: { op_hash: { _eq: $txId } }) {\n        id\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;