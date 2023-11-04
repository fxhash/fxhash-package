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
    "\n  mutation CreateWhitelist($whitelist: jsonb!) {\n    set_whitelist(whitelist: $whitelist) {\n      merkleRoot\n      message\n      success\n    }\n  }\n": types.CreateWhitelistDocument,
    "\n  fragment Account_BaseDetails on Account {\n    id\n    username\n    profile {\n      picture\n    }\n  }\n": types.Account_BaseDetailsFragmentDoc,
    "\n  query GetAccounts($where: Account_bool_exp = {}) {\n    offchain {\n      Account(where: $where) {\n        ...Account_BaseDetails\n      }\n    }\n  }\n": types.GetAccountsDocument,
    "\n  fragment Project_BaseDetails on Project {\n    id\n    title\n    description\n    releaseAt\n    blockchain\n    storage\n    pricing\n    curator {\n      id\n      status\n      username\n    }\n    author {\n      id\n      status\n      username\n    }\n    projectMedias {\n      index\n      media {\n        id\n        url\n      }\n    }\n  }\n": types.Project_BaseDetailsFragmentDoc,
    "\n  fragment Project_UserSecrets on Project {\n    state\n  }\n": types.Project_UserSecretsFragmentDoc,
    "\n  query GetAllProjects {\n    offchain {\n      Project {\n        ...Project_BaseDetails\n      }\n    }\n  }\n": types.GetAllProjectsDocument,
    "\n  query GetUserSubmissions($authorId: uuid!) {\n    offchain {\n      Project(where: { authorId: { _eq: $authorId } }) {\n        ...Project_BaseDetails\n        ...Project_UserSecrets\n      }\n    }\n  }\n": types.GetUserSubmissionsDocument,
    "\n  mutation CreateProject($object: Project_insert_input!) {\n    offchain {\n      insert_Project_one(object: $object) {\n        projectMedias {\n          index\n          media {\n            id\n            name\n          }\n        }\n        id\n        description\n        author {\n          id\n        }\n        title\n        state\n        releaseAt\n      }\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation Update_Project(\n    $projectId: uuid!\n    $projectData: Project_set_input\n    $projectMedias: [ProjectMedia_insert_input!]!\n  ) {\n    offchain {\n      delete_ProjectMedia(where: { projectId: { _eq: $projectId } }) {\n        affected_rows\n      }\n      update_Project(where: { id: { _eq: $projectId } }, _set: $projectData) {\n        affected_rows\n      }\n      insert_ProjectMedia(objects: $projectMedias) {\n        affected_rows\n      }\n    }\n  }\n": types.Update_ProjectDocument,
    "\n  query GetWhitelists($where: Whitelist_bool_exp = {}) {\n    offchain {\n      Whitelist(where: $where) {\n        merkleRoot\n        entries {\n          walletAddress\n          whitelistIndex\n        }\n      }\n    }\n  }\n": types.GetWhitelistsDocument,
    "\n  fragment GenerativeToken_Pricing on generative_token {\n    pricing_fixeds {\n      price\n      opens_at\n    }\n    pricing_dutch_auctions {\n      levels\n      resting_price\n      final_price\n      decrement_duration\n      opens_at\n    }\n  }\n": types.GenerativeToken_PricingFragmentDoc,
    "\n  query GetReserves($where: reserve_bool_exp = {}) {\n    onchain {\n      reserve(where: $where) {\n        data\n        id\n        method\n        token_id\n        amount\n      }\n    }\n  }\n": types.GetReservesDocument,
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
export function graphql(source: "\n  mutation CreateWhitelist($whitelist: jsonb!) {\n    set_whitelist(whitelist: $whitelist) {\n      merkleRoot\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation CreateWhitelist($whitelist: jsonb!) {\n    set_whitelist(whitelist: $whitelist) {\n      merkleRoot\n      message\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Account_BaseDetails on Account {\n    id\n    username\n    profile {\n      picture\n    }\n  }\n"): (typeof documents)["\n  fragment Account_BaseDetails on Account {\n    id\n    username\n    profile {\n      picture\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAccounts($where: Account_bool_exp = {}) {\n    offchain {\n      Account(where: $where) {\n        ...Account_BaseDetails\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAccounts($where: Account_bool_exp = {}) {\n    offchain {\n      Account(where: $where) {\n        ...Account_BaseDetails\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  query GetAllProjects {\n    offchain {\n      Project {\n        ...Project_BaseDetails\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllProjects {\n    offchain {\n      Project {\n        ...Project_BaseDetails\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserSubmissions($authorId: uuid!) {\n    offchain {\n      Project(where: { authorId: { _eq: $authorId } }) {\n        ...Project_BaseDetails\n        ...Project_UserSecrets\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserSubmissions($authorId: uuid!) {\n    offchain {\n      Project(where: { authorId: { _eq: $authorId } }) {\n        ...Project_BaseDetails\n        ...Project_UserSecrets\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProject($object: Project_insert_input!) {\n    offchain {\n      insert_Project_one(object: $object) {\n        projectMedias {\n          index\n          media {\n            id\n            name\n          }\n        }\n        id\n        description\n        author {\n          id\n        }\n        title\n        state\n        releaseAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProject($object: Project_insert_input!) {\n    offchain {\n      insert_Project_one(object: $object) {\n        projectMedias {\n          index\n          media {\n            id\n            name\n          }\n        }\n        id\n        description\n        author {\n          id\n        }\n        title\n        state\n        releaseAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Update_Project(\n    $projectId: uuid!\n    $projectData: Project_set_input\n    $projectMedias: [ProjectMedia_insert_input!]!\n  ) {\n    offchain {\n      delete_ProjectMedia(where: { projectId: { _eq: $projectId } }) {\n        affected_rows\n      }\n      update_Project(where: { id: { _eq: $projectId } }, _set: $projectData) {\n        affected_rows\n      }\n      insert_ProjectMedia(objects: $projectMedias) {\n        affected_rows\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Update_Project(\n    $projectId: uuid!\n    $projectData: Project_set_input\n    $projectMedias: [ProjectMedia_insert_input!]!\n  ) {\n    offchain {\n      delete_ProjectMedia(where: { projectId: { _eq: $projectId } }) {\n        affected_rows\n      }\n      update_Project(where: { id: { _eq: $projectId } }, _set: $projectData) {\n        affected_rows\n      }\n      insert_ProjectMedia(objects: $projectMedias) {\n        affected_rows\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWhitelists($where: Whitelist_bool_exp = {}) {\n    offchain {\n      Whitelist(where: $where) {\n        merkleRoot\n        entries {\n          walletAddress\n          whitelistIndex\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWhitelists($where: Whitelist_bool_exp = {}) {\n    offchain {\n      Whitelist(where: $where) {\n        merkleRoot\n        entries {\n          walletAddress\n          whitelistIndex\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GenerativeToken_Pricing on generative_token {\n    pricing_fixeds {\n      price\n      opens_at\n    }\n    pricing_dutch_auctions {\n      levels\n      resting_price\n      final_price\n      decrement_duration\n      opens_at\n    }\n  }\n"): (typeof documents)["\n  fragment GenerativeToken_Pricing on generative_token {\n    pricing_fixeds {\n      price\n      opens_at\n    }\n    pricing_dutch_auctions {\n      levels\n      resting_price\n      final_price\n      decrement_duration\n      opens_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetReserves($where: reserve_bool_exp = {}) {\n    onchain {\n      reserve(where: $where) {\n        data\n        id\n        method\n        token_id\n        amount\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetReserves($where: reserve_bool_exp = {}) {\n    onchain {\n      reserve(where: $where) {\n        data\n        id\n        method\n        token_id\n        amount\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;