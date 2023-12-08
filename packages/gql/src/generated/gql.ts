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
    "\n  fragment Account_BaseDetails on Account {\n    id\n    username\n    profile {\n      picture\n      description\n    }\n    wallets {\n      ...Wallet_BaseDetails\n    }\n  }\n": types.Account_BaseDetailsFragmentDoc,
    "\n  fragment Account_Wallets on Account {\n    wallets {\n      ...Wallet_BaseDetails\n    }\n    mainWallet {\n      ...Wallet_BaseDetails\n    }\n  }\n": types.Account_WalletsFragmentDoc,
    "\n  query GetAccounts($where: Account_bool_exp = {}) {\n    offchain {\n      Account(where: $where) {\n        ...Account_BaseDetails\n      }\n    }\n  }\n": types.GetAccountsDocument,
    "\n  query GetAccountWallets($where: Account_bool_exp = {}) {\n    offchain {\n      Account(where: $where) {\n        ...Account_BaseDetails\n        ...Account_Wallets\n      }\n    }\n  }\n": types.GetAccountWalletsDocument,
    "\n  fragment Project_BaseDetails on Project {\n    id\n    title\n    description\n    releaseAt\n    blockchain\n    storage\n    pricing\n    curator {\n      id\n      status\n      username\n      wallets {\n        ...Wallet_BaseDetails\n      }\n    }\n    author {\n      ...Account_BaseDetails\n    }\n    collaborators {\n      account {\n        ...Account_BaseDetails\n      }\n    }\n    collaborators {\n      account {\n        ...Account_BaseDetails\n      }\n    }\n    projectMedias {\n      index\n      media {\n        id\n        url\n      }\n    }\n  }\n": types.Project_BaseDetailsFragmentDoc,
    "\n  fragment Project_UserSecrets on Project {\n    state\n  }\n": types.Project_UserSecretsFragmentDoc,
    "\n  query GetAllProjects {\n    offchain {\n      Project {\n        ...Project_BaseDetails\n      }\n    }\n  }\n": types.GetAllProjectsDocument,
    "\n  query GetAllProjectsAfterDate($afterDate: timestamptz!) {\n    offchain {\n      Project(where: { releaseAt: { _gte: $afterDate } }) {\n        ...Project_BaseDetails\n      }\n    }\n  }\n": types.GetAllProjectsAfterDateDocument,
    "\n  query GetUserSubmissions($authorId: uuid!) {\n    offchain {\n      Project(where: { authorId: { _eq: $authorId } }) {\n        ...Project_BaseDetails\n        ...Project_UserSecrets\n      }\n    }\n  }\n": types.GetUserSubmissionsDocument,
    "\n  mutation CreateProject($object: Project_insert_input!) {\n    offchain {\n      insert_Project_one(object: $object) {\n        projectMedias {\n          index\n          media {\n            id\n            name\n          }\n        }\n        id\n        description\n        author {\n          id\n        }\n        title\n        state\n        releaseAt\n      }\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation Update_Project(\n    $projectId: uuid!\n    $projectData: Project_set_input\n    $projectMedias: [ProjectMedia_insert_input!]!\n    $projectCollaborators: [ProjectCollaborator_insert_input!]!\n  ) {\n    offchain {\n      delete_ProjectMedia(where: { projectId: { _eq: $projectId } }) {\n        affected_rows\n      }\n      delete_ProjectCollaborator(where: { projectId: { _eq: $projectId } }) {\n        affected_rows\n      }\n      update_Project(where: { id: { _eq: $projectId } }, _set: $projectData) {\n        affected_rows\n      }\n      insert_ProjectMedia(objects: $projectMedias) {\n        affected_rows\n      }\n      insert_ProjectCollaborator(objects: $projectCollaborators) {\n        affected_rows\n      }\n    }\n  }\n": types.Update_ProjectDocument,
    "\n  fragment Wallet_BaseDetails on Wallet {\n    address\n    network\n    accountId\n    walletUser {\n      flag\n    }\n  }\n": types.Wallet_BaseDetailsFragmentDoc,
    "\n  fragment WhitelistEntries on Whitelist {\n    entries {\n      walletAddress\n      whitelistIndex\n    }\n  }\n": types.WhitelistEntriesFragmentDoc,
    "\n  query GetWhitelists($where: Whitelist_bool_exp = {}) {\n    offchain {\n      Whitelist(where: $where) {\n        merkleRoot\n        ...WhitelistEntries\n      }\n    }\n  }\n": types.GetWhitelistsDocument,
    "\n  query GetWhitelist($merkleRoot: String = \"\") {\n    offchain {\n      Whitelist_by_pk(merkleRoot: $merkleRoot) {\n        merkleRoot\n        ...WhitelistEntries\n      }\n    }\n  }\n": types.GetWhitelistDocument,
    "\n  query GetEthPrimarySplits($where: eth_primary_splits_bool_exp = {}) {\n    onchain {\n      __typename\n      eth_primary_splits {\n        id\n        receiver\n        receivers\n        allocations\n      }\n    }\n  }\n": types.GetEthPrimarySplitsDocument,
    "\n  fragment GenerativeToken_Pricing on generative_token {\n    pricing_fixeds {\n      price\n      opens_at\n    }\n    pricing_dutch_auctions {\n      levels\n      resting_price\n      final_price\n      decrement_duration\n      opens_at\n    }\n  }\n": types.GenerativeToken_PricingFragmentDoc,
    "\n  query GetEthMinterProceeds($where: eth_minter_proceeds_bool_exp = {}) {\n    onchain {\n      eth_minter_proceeds(where: $where) {\n        id\n        minter_address\n        primary_receiver\n        reserve_id\n        token_address\n        user_address\n        amount\n      }\n    }\n  }\n": types.GetEthMinterProceedsDocument,
    "\n  query GetReserves($where: reserve_bool_exp = {}) {\n    onchain {\n      reserve(where: $where) {\n        data\n        id\n        method\n        token_id\n        amount\n      }\n    }\n  }\n": types.GetReservesDocument,
    "\n  query GetTokenPricingsAndReserves($id: String!) {\n    onchain {\n      generative_token_by_pk(id: $id) {\n        reserves {\n          id\n          method\n          amount\n          data\n        }\n        pricing_fixeds {\n          id\n          opens_at\n          price\n        }\n        pricing_dutch_auctions {\n          id\n          opens_at\n          levels\n          decrement_duration\n        }\n      }\n    }\n  }\n": types.GetTokenPricingsAndReservesDocument,
    "\n  query GetEthUserProceeds($where: eth_user_proceeds_bool_exp = {}) {\n    onchain {\n      eth_user_proceeds(where: $where) {\n        id\n        total_proceeds\n      }\n    }\n  }\n": types.GetEthUserProceedsDocument,
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
export function graphql(source: "\n  fragment Account_BaseDetails on Account {\n    id\n    username\n    profile {\n      picture\n      description\n    }\n    wallets {\n      ...Wallet_BaseDetails\n    }\n  }\n"): (typeof documents)["\n  fragment Account_BaseDetails on Account {\n    id\n    username\n    profile {\n      picture\n      description\n    }\n    wallets {\n      ...Wallet_BaseDetails\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Account_Wallets on Account {\n    wallets {\n      ...Wallet_BaseDetails\n    }\n    mainWallet {\n      ...Wallet_BaseDetails\n    }\n  }\n"): (typeof documents)["\n  fragment Account_Wallets on Account {\n    wallets {\n      ...Wallet_BaseDetails\n    }\n    mainWallet {\n      ...Wallet_BaseDetails\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAccounts($where: Account_bool_exp = {}) {\n    offchain {\n      Account(where: $where) {\n        ...Account_BaseDetails\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAccounts($where: Account_bool_exp = {}) {\n    offchain {\n      Account(where: $where) {\n        ...Account_BaseDetails\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAccountWallets($where: Account_bool_exp = {}) {\n    offchain {\n      Account(where: $where) {\n        ...Account_BaseDetails\n        ...Account_Wallets\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAccountWallets($where: Account_bool_exp = {}) {\n    offchain {\n      Account(where: $where) {\n        ...Account_BaseDetails\n        ...Account_Wallets\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Project_BaseDetails on Project {\n    id\n    title\n    description\n    releaseAt\n    blockchain\n    storage\n    pricing\n    curator {\n      id\n      status\n      username\n      wallets {\n        ...Wallet_BaseDetails\n      }\n    }\n    author {\n      ...Account_BaseDetails\n    }\n    collaborators {\n      account {\n        ...Account_BaseDetails\n      }\n    }\n    collaborators {\n      account {\n        ...Account_BaseDetails\n      }\n    }\n    projectMedias {\n      index\n      media {\n        id\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment Project_BaseDetails on Project {\n    id\n    title\n    description\n    releaseAt\n    blockchain\n    storage\n    pricing\n    curator {\n      id\n      status\n      username\n      wallets {\n        ...Wallet_BaseDetails\n      }\n    }\n    author {\n      ...Account_BaseDetails\n    }\n    collaborators {\n      account {\n        ...Account_BaseDetails\n      }\n    }\n    collaborators {\n      account {\n        ...Account_BaseDetails\n      }\n    }\n    projectMedias {\n      index\n      media {\n        id\n        url\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  query GetAllProjectsAfterDate($afterDate: timestamptz!) {\n    offchain {\n      Project(where: { releaseAt: { _gte: $afterDate } }) {\n        ...Project_BaseDetails\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllProjectsAfterDate($afterDate: timestamptz!) {\n    offchain {\n      Project(where: { releaseAt: { _gte: $afterDate } }) {\n        ...Project_BaseDetails\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation Update_Project(\n    $projectId: uuid!\n    $projectData: Project_set_input\n    $projectMedias: [ProjectMedia_insert_input!]!\n    $projectCollaborators: [ProjectCollaborator_insert_input!]!\n  ) {\n    offchain {\n      delete_ProjectMedia(where: { projectId: { _eq: $projectId } }) {\n        affected_rows\n      }\n      delete_ProjectCollaborator(where: { projectId: { _eq: $projectId } }) {\n        affected_rows\n      }\n      update_Project(where: { id: { _eq: $projectId } }, _set: $projectData) {\n        affected_rows\n      }\n      insert_ProjectMedia(objects: $projectMedias) {\n        affected_rows\n      }\n      insert_ProjectCollaborator(objects: $projectCollaborators) {\n        affected_rows\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Update_Project(\n    $projectId: uuid!\n    $projectData: Project_set_input\n    $projectMedias: [ProjectMedia_insert_input!]!\n    $projectCollaborators: [ProjectCollaborator_insert_input!]!\n  ) {\n    offchain {\n      delete_ProjectMedia(where: { projectId: { _eq: $projectId } }) {\n        affected_rows\n      }\n      delete_ProjectCollaborator(where: { projectId: { _eq: $projectId } }) {\n        affected_rows\n      }\n      update_Project(where: { id: { _eq: $projectId } }, _set: $projectData) {\n        affected_rows\n      }\n      insert_ProjectMedia(objects: $projectMedias) {\n        affected_rows\n      }\n      insert_ProjectCollaborator(objects: $projectCollaborators) {\n        affected_rows\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Wallet_BaseDetails on Wallet {\n    address\n    network\n    accountId\n    walletUser {\n      flag\n    }\n  }\n"): (typeof documents)["\n  fragment Wallet_BaseDetails on Wallet {\n    address\n    network\n    accountId\n    walletUser {\n      flag\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WhitelistEntries on Whitelist {\n    entries {\n      walletAddress\n      whitelistIndex\n    }\n  }\n"): (typeof documents)["\n  fragment WhitelistEntries on Whitelist {\n    entries {\n      walletAddress\n      whitelistIndex\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWhitelists($where: Whitelist_bool_exp = {}) {\n    offchain {\n      Whitelist(where: $where) {\n        merkleRoot\n        ...WhitelistEntries\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWhitelists($where: Whitelist_bool_exp = {}) {\n    offchain {\n      Whitelist(where: $where) {\n        merkleRoot\n        ...WhitelistEntries\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWhitelist($merkleRoot: String = \"\") {\n    offchain {\n      Whitelist_by_pk(merkleRoot: $merkleRoot) {\n        merkleRoot\n        ...WhitelistEntries\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWhitelist($merkleRoot: String = \"\") {\n    offchain {\n      Whitelist_by_pk(merkleRoot: $merkleRoot) {\n        merkleRoot\n        ...WhitelistEntries\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEthPrimarySplits($where: eth_primary_splits_bool_exp = {}) {\n    onchain {\n      __typename\n      eth_primary_splits {\n        id\n        receiver\n        receivers\n        allocations\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEthPrimarySplits($where: eth_primary_splits_bool_exp = {}) {\n    onchain {\n      __typename\n      eth_primary_splits {\n        id\n        receiver\n        receivers\n        allocations\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GenerativeToken_Pricing on generative_token {\n    pricing_fixeds {\n      price\n      opens_at\n    }\n    pricing_dutch_auctions {\n      levels\n      resting_price\n      final_price\n      decrement_duration\n      opens_at\n    }\n  }\n"): (typeof documents)["\n  fragment GenerativeToken_Pricing on generative_token {\n    pricing_fixeds {\n      price\n      opens_at\n    }\n    pricing_dutch_auctions {\n      levels\n      resting_price\n      final_price\n      decrement_duration\n      opens_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEthMinterProceeds($where: eth_minter_proceeds_bool_exp = {}) {\n    onchain {\n      eth_minter_proceeds(where: $where) {\n        id\n        minter_address\n        primary_receiver\n        reserve_id\n        token_address\n        user_address\n        amount\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEthMinterProceeds($where: eth_minter_proceeds_bool_exp = {}) {\n    onchain {\n      eth_minter_proceeds(where: $where) {\n        id\n        minter_address\n        primary_receiver\n        reserve_id\n        token_address\n        user_address\n        amount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetReserves($where: reserve_bool_exp = {}) {\n    onchain {\n      reserve(where: $where) {\n        data\n        id\n        method\n        token_id\n        amount\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetReserves($where: reserve_bool_exp = {}) {\n    onchain {\n      reserve(where: $where) {\n        data\n        id\n        method\n        token_id\n        amount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTokenPricingsAndReserves($id: String!) {\n    onchain {\n      generative_token_by_pk(id: $id) {\n        reserves {\n          id\n          method\n          amount\n          data\n        }\n        pricing_fixeds {\n          id\n          opens_at\n          price\n        }\n        pricing_dutch_auctions {\n          id\n          opens_at\n          levels\n          decrement_duration\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTokenPricingsAndReserves($id: String!) {\n    onchain {\n      generative_token_by_pk(id: $id) {\n        reserves {\n          id\n          method\n          amount\n          data\n        }\n        pricing_fixeds {\n          id\n          opens_at\n          price\n        }\n        pricing_dutch_auctions {\n          id\n          opens_at\n          levels\n          decrement_duration\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEthUserProceeds($where: eth_user_proceeds_bool_exp = {}) {\n    onchain {\n      eth_user_proceeds(where: $where) {\n        id\n        total_proceeds\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEthUserProceeds($where: eth_user_proceeds_bool_exp = {}) {\n    onchain {\n      eth_user_proceeds(where: $where) {\n        id\n        total_proceeds\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;