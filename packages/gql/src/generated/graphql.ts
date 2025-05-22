/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AccountStatus: { input: any; output: any; }
  BlockchainNetwork: { input: any; output: any; }
  EventAvailability: { input: any; output: any; }
  EventStatus: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  ProjectState: { input: string; output: string; }
  Storage: { input: any; output: any; }
  _text: { input: any; output: any; }
  action_type_enum: { input: any; output: any; }
  art_coin_bonding_trade_type_enum: { input: any; output: any; }
  art_coin_flag_enum: { input: any; output: any; }
  article_flag_enum: { input: any; output: any; }
  bigint: { input: any; output: any; }
  bpchar: { input: any; output: any; }
  codex_type_enum: { input: any; output: any; }
  codex_update_request_status_enum: { input: any; output: any; }
  collection_offer_status_enum: { input: any; output: any; }
  float8: { input: any; output: any; }
  generative_token_flag_enum: { input: any; output: any; }
  generative_token_version: { input: any; output: any; }
  gentk_assign_state_enum: { input: any; output: any; }
  indexing_target_type_enum: { input: any; output: any; }
  json: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  listing_status_enum: { input: any; output: any; }
  numeric: { input: string; output: string; }
  offer_status_enum: { input: any; output: any; }
  smallint: { input: any; output: any; }
  timestamp: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  transaction_type_enum: { input: any; output: any; }
  user_flag_enum: { input: any; output: any; }
  user_type_enum: { input: any; output: any; }
  uuid: { input: string; output: string; }
};

/** columns and relationships of "Account" */
export type Account = {
  __typename?: 'Account';
  /** An array relationship */
  authoredProjects: Array<Project>;
  /** An array relationship */
  collaboratedProjects: Array<ProjectCollaborator>;
  /** An array relationship */
  curatedProjects: Array<Project>;
  id: Scalars['uuid']['output'];
  isArtist: Scalars['Boolean']['output'];
  isModerated: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  /** An object relationship */
  mainWallet: Wallet;
  mainWalletAddress: Scalars['String']['output'];
  /** An object relationship */
  profile?: Maybe<Profile>;
  /** An array relationship */
  roles: Array<AccountsRoles>;
  status: Scalars['AccountStatus']['output'];
  /** An object relationship */
  tokenAllocation?: Maybe<AccountTokenAllocation>;
  username: Scalars['String']['output'];
  /** An array relationship */
  wallets: Array<Wallet>;
};


/** columns and relationships of "Account" */
export type AccountAuthoredProjectsArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


/** columns and relationships of "Account" */
export type AccountCollaboratedProjectsArgs = {
  distinct_on?: InputMaybe<Array<ProjectCollaborator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ProjectCollaborator_Order_By>>;
  where?: InputMaybe<ProjectCollaborator_Bool_Exp>;
};


/** columns and relationships of "Account" */
export type AccountCuratedProjectsArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


/** columns and relationships of "Account" */
export type AccountRolesArgs = {
  distinct_on?: InputMaybe<Array<AccountsRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AccountsRoles_Order_By>>;
  where?: InputMaybe<AccountsRoles_Bool_Exp>;
};


/** columns and relationships of "Account" */
export type AccountWalletsArgs = {
  distinct_on?: InputMaybe<Array<Wallet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallet_Order_By>>;
  where?: InputMaybe<Wallet_Bool_Exp>;
};

/** columns and relationships of "AccountRole" */
export type AccountRole = {
  __typename?: 'AccountRole';
  comment?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "AccountRole". All fields are combined with a logical 'AND'. */
export type AccountRole_Bool_Exp = {
  _and?: InputMaybe<Array<AccountRole_Bool_Exp>>;
  _not?: InputMaybe<AccountRole_Bool_Exp>;
  _or?: InputMaybe<Array<AccountRole_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

export enum AccountRole_Enum {
  /** curator vested by the fxhash team, with access to special curator-dedicated features. */
  VerifiedCurator = 'VERIFIED_CURATOR'
}

/** Boolean expression to compare columns of type "AccountRole_enum". All fields are combined with logical 'AND'. */
export type AccountRole_Enum_Comparison_Exp = {
  _eq?: InputMaybe<AccountRole_Enum>;
  _in?: InputMaybe<Array<AccountRole_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<AccountRole_Enum>;
  _nin?: InputMaybe<Array<AccountRole_Enum>>;
};

/** Ordering options when selecting data from "AccountRole". */
export type AccountRole_Order_By = {
  comment?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "AccountRole" */
export enum AccountRole_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** Streaming cursor of the table "AccountRole" */
export type AccountRole_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AccountRole_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AccountRole_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "AccountStatus". All fields are combined with logical 'AND'. */
export type AccountStatus_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['AccountStatus']['input']>;
  _gt?: InputMaybe<Scalars['AccountStatus']['input']>;
  _gte?: InputMaybe<Scalars['AccountStatus']['input']>;
  _in?: InputMaybe<Array<Scalars['AccountStatus']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['AccountStatus']['input']>;
  _lte?: InputMaybe<Scalars['AccountStatus']['input']>;
  _neq?: InputMaybe<Scalars['AccountStatus']['input']>;
  _nin?: InputMaybe<Array<Scalars['AccountStatus']['input']>>;
};

/** columns and relationships of "AccountTokenAllocation" */
export type AccountTokenAllocation = {
  __typename?: 'AccountTokenAllocation';
  /** An object relationship */
  account?: Maybe<Account>;
  accountId?: Maybe<Scalars['uuid']['output']>;
  earnedTotalUsd?: Maybe<Scalars['numeric']['output']>;
  monthsActive?: Maybe<Scalars['Int']['output']>;
  nbArtistsCollected?: Maybe<Scalars['bigint']['output']>;
  nbIterationsMinted?: Maybe<Scalars['bigint']['output']>;
  spentTotalUsd?: Maybe<Scalars['numeric']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['numeric']['output']>;
};

/** columns and relationships of "AccountTokenAllocationNonZero" */
export type AccountTokenAllocationNonZero = {
  __typename?: 'AccountTokenAllocationNonZero';
  /** An object relationship */
  account?: Maybe<Account>;
  accountId?: Maybe<Scalars['uuid']['output']>;
  earnedTotalUsd?: Maybe<Scalars['numeric']['output']>;
  monthsActive?: Maybe<Scalars['Int']['output']>;
  nbArtistsCollected?: Maybe<Scalars['bigint']['output']>;
  nbIterationsMinted?: Maybe<Scalars['bigint']['output']>;
  spentTotalUsd?: Maybe<Scalars['numeric']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['numeric']['output']>;
};

/** aggregated selection of "AccountTokenAllocationNonZero" */
export type AccountTokenAllocationNonZero_Aggregate = {
  __typename?: 'AccountTokenAllocationNonZero_aggregate';
  aggregate?: Maybe<AccountTokenAllocationNonZero_Aggregate_Fields>;
  nodes: Array<AccountTokenAllocationNonZero>;
};

/** aggregate fields of "AccountTokenAllocationNonZero" */
export type AccountTokenAllocationNonZero_Aggregate_Fields = {
  __typename?: 'AccountTokenAllocationNonZero_aggregate_fields';
  avg?: Maybe<AccountTokenAllocationNonZero_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<AccountTokenAllocationNonZero_Max_Fields>;
  min?: Maybe<AccountTokenAllocationNonZero_Min_Fields>;
  stddev?: Maybe<AccountTokenAllocationNonZero_Stddev_Fields>;
  stddev_pop?: Maybe<AccountTokenAllocationNonZero_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<AccountTokenAllocationNonZero_Stddev_Samp_Fields>;
  sum?: Maybe<AccountTokenAllocationNonZero_Sum_Fields>;
  var_pop?: Maybe<AccountTokenAllocationNonZero_Var_Pop_Fields>;
  var_samp?: Maybe<AccountTokenAllocationNonZero_Var_Samp_Fields>;
  variance?: Maybe<AccountTokenAllocationNonZero_Variance_Fields>;
};


/** aggregate fields of "AccountTokenAllocationNonZero" */
export type AccountTokenAllocationNonZero_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AccountTokenAllocationNonZero_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type AccountTokenAllocationNonZero_Avg_Fields = {
  __typename?: 'AccountTokenAllocationNonZero_avg_fields';
  earnedTotalUsd?: Maybe<Scalars['Float']['output']>;
  monthsActive?: Maybe<Scalars['Float']['output']>;
  nbArtistsCollected?: Maybe<Scalars['Float']['output']>;
  nbIterationsMinted?: Maybe<Scalars['Float']['output']>;
  spentTotalUsd?: Maybe<Scalars['Float']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "AccountTokenAllocationNonZero". All fields are combined with a logical 'AND'. */
export type AccountTokenAllocationNonZero_Bool_Exp = {
  _and?: InputMaybe<Array<AccountTokenAllocationNonZero_Bool_Exp>>;
  _not?: InputMaybe<AccountTokenAllocationNonZero_Bool_Exp>;
  _or?: InputMaybe<Array<AccountTokenAllocationNonZero_Bool_Exp>>;
  account?: InputMaybe<Account_Bool_Exp>;
  accountId?: InputMaybe<Uuid_Comparison_Exp>;
  earnedTotalUsd?: InputMaybe<Numeric_Comparison_Exp>;
  monthsActive?: InputMaybe<Int_Comparison_Exp>;
  nbArtistsCollected?: InputMaybe<Bigint_Comparison_Exp>;
  nbIterationsMinted?: InputMaybe<Bigint_Comparison_Exp>;
  spentTotalUsd?: InputMaybe<Numeric_Comparison_Exp>;
  tokenAllocation_sort?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type AccountTokenAllocationNonZero_Max_Fields = {
  __typename?: 'AccountTokenAllocationNonZero_max_fields';
  accountId?: Maybe<Scalars['uuid']['output']>;
  earnedTotalUsd?: Maybe<Scalars['numeric']['output']>;
  monthsActive?: Maybe<Scalars['Int']['output']>;
  nbArtistsCollected?: Maybe<Scalars['bigint']['output']>;
  nbIterationsMinted?: Maybe<Scalars['bigint']['output']>;
  spentTotalUsd?: Maybe<Scalars['numeric']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type AccountTokenAllocationNonZero_Min_Fields = {
  __typename?: 'AccountTokenAllocationNonZero_min_fields';
  accountId?: Maybe<Scalars['uuid']['output']>;
  earnedTotalUsd?: Maybe<Scalars['numeric']['output']>;
  monthsActive?: Maybe<Scalars['Int']['output']>;
  nbArtistsCollected?: Maybe<Scalars['bigint']['output']>;
  nbIterationsMinted?: Maybe<Scalars['bigint']['output']>;
  spentTotalUsd?: Maybe<Scalars['numeric']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "AccountTokenAllocationNonZero". */
export type AccountTokenAllocationNonZero_Order_By = {
  account?: InputMaybe<Account_Order_By>;
  accountId?: InputMaybe<Order_By>;
  earnedTotalUsd?: InputMaybe<Order_By>;
  monthsActive?: InputMaybe<Order_By>;
  nbArtistsCollected?: InputMaybe<Order_By>;
  nbIterationsMinted?: InputMaybe<Order_By>;
  spentTotalUsd?: InputMaybe<Order_By>;
  tokenAllocation_sort?: InputMaybe<Order_By>;
};

/** select columns of table "AccountTokenAllocationNonZero" */
export enum AccountTokenAllocationNonZero_Select_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  EarnedTotalUsd = 'earnedTotalUsd',
  /** column name */
  MonthsActive = 'monthsActive',
  /** column name */
  NbArtistsCollected = 'nbArtistsCollected',
  /** column name */
  NbIterationsMinted = 'nbIterationsMinted',
  /** column name */
  SpentTotalUsd = 'spentTotalUsd',
  /** column name */
  TokenAllocationSort = 'tokenAllocation_sort'
}

/** aggregate stddev on columns */
export type AccountTokenAllocationNonZero_Stddev_Fields = {
  __typename?: 'AccountTokenAllocationNonZero_stddev_fields';
  earnedTotalUsd?: Maybe<Scalars['Float']['output']>;
  monthsActive?: Maybe<Scalars['Float']['output']>;
  nbArtistsCollected?: Maybe<Scalars['Float']['output']>;
  nbIterationsMinted?: Maybe<Scalars['Float']['output']>;
  spentTotalUsd?: Maybe<Scalars['Float']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type AccountTokenAllocationNonZero_Stddev_Pop_Fields = {
  __typename?: 'AccountTokenAllocationNonZero_stddev_pop_fields';
  earnedTotalUsd?: Maybe<Scalars['Float']['output']>;
  monthsActive?: Maybe<Scalars['Float']['output']>;
  nbArtistsCollected?: Maybe<Scalars['Float']['output']>;
  nbIterationsMinted?: Maybe<Scalars['Float']['output']>;
  spentTotalUsd?: Maybe<Scalars['Float']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type AccountTokenAllocationNonZero_Stddev_Samp_Fields = {
  __typename?: 'AccountTokenAllocationNonZero_stddev_samp_fields';
  earnedTotalUsd?: Maybe<Scalars['Float']['output']>;
  monthsActive?: Maybe<Scalars['Float']['output']>;
  nbArtistsCollected?: Maybe<Scalars['Float']['output']>;
  nbIterationsMinted?: Maybe<Scalars['Float']['output']>;
  spentTotalUsd?: Maybe<Scalars['Float']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "AccountTokenAllocationNonZero" */
export type AccountTokenAllocationNonZero_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AccountTokenAllocationNonZero_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AccountTokenAllocationNonZero_Stream_Cursor_Value_Input = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  earnedTotalUsd?: InputMaybe<Scalars['numeric']['input']>;
  monthsActive?: InputMaybe<Scalars['Int']['input']>;
  nbArtistsCollected?: InputMaybe<Scalars['bigint']['input']>;
  nbIterationsMinted?: InputMaybe<Scalars['bigint']['input']>;
  spentTotalUsd?: InputMaybe<Scalars['numeric']['input']>;
  tokenAllocation_sort?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type AccountTokenAllocationNonZero_Sum_Fields = {
  __typename?: 'AccountTokenAllocationNonZero_sum_fields';
  earnedTotalUsd?: Maybe<Scalars['numeric']['output']>;
  monthsActive?: Maybe<Scalars['Int']['output']>;
  nbArtistsCollected?: Maybe<Scalars['bigint']['output']>;
  nbIterationsMinted?: Maybe<Scalars['bigint']['output']>;
  spentTotalUsd?: Maybe<Scalars['numeric']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type AccountTokenAllocationNonZero_Var_Pop_Fields = {
  __typename?: 'AccountTokenAllocationNonZero_var_pop_fields';
  earnedTotalUsd?: Maybe<Scalars['Float']['output']>;
  monthsActive?: Maybe<Scalars['Float']['output']>;
  nbArtistsCollected?: Maybe<Scalars['Float']['output']>;
  nbIterationsMinted?: Maybe<Scalars['Float']['output']>;
  spentTotalUsd?: Maybe<Scalars['Float']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type AccountTokenAllocationNonZero_Var_Samp_Fields = {
  __typename?: 'AccountTokenAllocationNonZero_var_samp_fields';
  earnedTotalUsd?: Maybe<Scalars['Float']['output']>;
  monthsActive?: Maybe<Scalars['Float']['output']>;
  nbArtistsCollected?: Maybe<Scalars['Float']['output']>;
  nbIterationsMinted?: Maybe<Scalars['Float']['output']>;
  spentTotalUsd?: Maybe<Scalars['Float']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type AccountTokenAllocationNonZero_Variance_Fields = {
  __typename?: 'AccountTokenAllocationNonZero_variance_fields';
  earnedTotalUsd?: Maybe<Scalars['Float']['output']>;
  monthsActive?: Maybe<Scalars['Float']['output']>;
  nbArtistsCollected?: Maybe<Scalars['Float']['output']>;
  nbIterationsMinted?: Maybe<Scalars['Float']['output']>;
  spentTotalUsd?: Maybe<Scalars['Float']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['Float']['output']>;
};

/** aggregated selection of "AccountTokenAllocation" */
export type AccountTokenAllocation_Aggregate = {
  __typename?: 'AccountTokenAllocation_aggregate';
  aggregate?: Maybe<AccountTokenAllocation_Aggregate_Fields>;
  nodes: Array<AccountTokenAllocation>;
};

/** aggregate fields of "AccountTokenAllocation" */
export type AccountTokenAllocation_Aggregate_Fields = {
  __typename?: 'AccountTokenAllocation_aggregate_fields';
  avg?: Maybe<AccountTokenAllocation_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<AccountTokenAllocation_Max_Fields>;
  min?: Maybe<AccountTokenAllocation_Min_Fields>;
  stddev?: Maybe<AccountTokenAllocation_Stddev_Fields>;
  stddev_pop?: Maybe<AccountTokenAllocation_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<AccountTokenAllocation_Stddev_Samp_Fields>;
  sum?: Maybe<AccountTokenAllocation_Sum_Fields>;
  var_pop?: Maybe<AccountTokenAllocation_Var_Pop_Fields>;
  var_samp?: Maybe<AccountTokenAllocation_Var_Samp_Fields>;
  variance?: Maybe<AccountTokenAllocation_Variance_Fields>;
};


/** aggregate fields of "AccountTokenAllocation" */
export type AccountTokenAllocation_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AccountTokenAllocation_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type AccountTokenAllocation_Avg_Fields = {
  __typename?: 'AccountTokenAllocation_avg_fields';
  earnedTotalUsd?: Maybe<Scalars['Float']['output']>;
  monthsActive?: Maybe<Scalars['Float']['output']>;
  nbArtistsCollected?: Maybe<Scalars['Float']['output']>;
  nbIterationsMinted?: Maybe<Scalars['Float']['output']>;
  spentTotalUsd?: Maybe<Scalars['Float']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "AccountTokenAllocation". All fields are combined with a logical 'AND'. */
export type AccountTokenAllocation_Bool_Exp = {
  _and?: InputMaybe<Array<AccountTokenAllocation_Bool_Exp>>;
  _not?: InputMaybe<AccountTokenAllocation_Bool_Exp>;
  _or?: InputMaybe<Array<AccountTokenAllocation_Bool_Exp>>;
  account?: InputMaybe<Account_Bool_Exp>;
  accountId?: InputMaybe<Uuid_Comparison_Exp>;
  earnedTotalUsd?: InputMaybe<Numeric_Comparison_Exp>;
  monthsActive?: InputMaybe<Int_Comparison_Exp>;
  nbArtistsCollected?: InputMaybe<Bigint_Comparison_Exp>;
  nbIterationsMinted?: InputMaybe<Bigint_Comparison_Exp>;
  spentTotalUsd?: InputMaybe<Numeric_Comparison_Exp>;
  tokenAllocation_sort?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type AccountTokenAllocation_Max_Fields = {
  __typename?: 'AccountTokenAllocation_max_fields';
  accountId?: Maybe<Scalars['uuid']['output']>;
  earnedTotalUsd?: Maybe<Scalars['numeric']['output']>;
  monthsActive?: Maybe<Scalars['Int']['output']>;
  nbArtistsCollected?: Maybe<Scalars['bigint']['output']>;
  nbIterationsMinted?: Maybe<Scalars['bigint']['output']>;
  spentTotalUsd?: Maybe<Scalars['numeric']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type AccountTokenAllocation_Min_Fields = {
  __typename?: 'AccountTokenAllocation_min_fields';
  accountId?: Maybe<Scalars['uuid']['output']>;
  earnedTotalUsd?: Maybe<Scalars['numeric']['output']>;
  monthsActive?: Maybe<Scalars['Int']['output']>;
  nbArtistsCollected?: Maybe<Scalars['bigint']['output']>;
  nbIterationsMinted?: Maybe<Scalars['bigint']['output']>;
  spentTotalUsd?: Maybe<Scalars['numeric']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "AccountTokenAllocation". */
export type AccountTokenAllocation_Order_By = {
  account?: InputMaybe<Account_Order_By>;
  accountId?: InputMaybe<Order_By>;
  earnedTotalUsd?: InputMaybe<Order_By>;
  monthsActive?: InputMaybe<Order_By>;
  nbArtistsCollected?: InputMaybe<Order_By>;
  nbIterationsMinted?: InputMaybe<Order_By>;
  spentTotalUsd?: InputMaybe<Order_By>;
  tokenAllocation_sort?: InputMaybe<Order_By>;
};

/** select columns of table "AccountTokenAllocation" */
export enum AccountTokenAllocation_Select_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  EarnedTotalUsd = 'earnedTotalUsd',
  /** column name */
  MonthsActive = 'monthsActive',
  /** column name */
  NbArtistsCollected = 'nbArtistsCollected',
  /** column name */
  NbIterationsMinted = 'nbIterationsMinted',
  /** column name */
  SpentTotalUsd = 'spentTotalUsd',
  /** column name */
  TokenAllocationSort = 'tokenAllocation_sort'
}

/** aggregate stddev on columns */
export type AccountTokenAllocation_Stddev_Fields = {
  __typename?: 'AccountTokenAllocation_stddev_fields';
  earnedTotalUsd?: Maybe<Scalars['Float']['output']>;
  monthsActive?: Maybe<Scalars['Float']['output']>;
  nbArtistsCollected?: Maybe<Scalars['Float']['output']>;
  nbIterationsMinted?: Maybe<Scalars['Float']['output']>;
  spentTotalUsd?: Maybe<Scalars['Float']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type AccountTokenAllocation_Stddev_Pop_Fields = {
  __typename?: 'AccountTokenAllocation_stddev_pop_fields';
  earnedTotalUsd?: Maybe<Scalars['Float']['output']>;
  monthsActive?: Maybe<Scalars['Float']['output']>;
  nbArtistsCollected?: Maybe<Scalars['Float']['output']>;
  nbIterationsMinted?: Maybe<Scalars['Float']['output']>;
  spentTotalUsd?: Maybe<Scalars['Float']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type AccountTokenAllocation_Stddev_Samp_Fields = {
  __typename?: 'AccountTokenAllocation_stddev_samp_fields';
  earnedTotalUsd?: Maybe<Scalars['Float']['output']>;
  monthsActive?: Maybe<Scalars['Float']['output']>;
  nbArtistsCollected?: Maybe<Scalars['Float']['output']>;
  nbIterationsMinted?: Maybe<Scalars['Float']['output']>;
  spentTotalUsd?: Maybe<Scalars['Float']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "AccountTokenAllocation" */
export type AccountTokenAllocation_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AccountTokenAllocation_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AccountTokenAllocation_Stream_Cursor_Value_Input = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  earnedTotalUsd?: InputMaybe<Scalars['numeric']['input']>;
  monthsActive?: InputMaybe<Scalars['Int']['input']>;
  nbArtistsCollected?: InputMaybe<Scalars['bigint']['input']>;
  nbIterationsMinted?: InputMaybe<Scalars['bigint']['input']>;
  spentTotalUsd?: InputMaybe<Scalars['numeric']['input']>;
  tokenAllocation_sort?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type AccountTokenAllocation_Sum_Fields = {
  __typename?: 'AccountTokenAllocation_sum_fields';
  earnedTotalUsd?: Maybe<Scalars['numeric']['output']>;
  monthsActive?: Maybe<Scalars['Int']['output']>;
  nbArtistsCollected?: Maybe<Scalars['bigint']['output']>;
  nbIterationsMinted?: Maybe<Scalars['bigint']['output']>;
  spentTotalUsd?: Maybe<Scalars['numeric']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type AccountTokenAllocation_Var_Pop_Fields = {
  __typename?: 'AccountTokenAllocation_var_pop_fields';
  earnedTotalUsd?: Maybe<Scalars['Float']['output']>;
  monthsActive?: Maybe<Scalars['Float']['output']>;
  nbArtistsCollected?: Maybe<Scalars['Float']['output']>;
  nbIterationsMinted?: Maybe<Scalars['Float']['output']>;
  spentTotalUsd?: Maybe<Scalars['Float']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type AccountTokenAllocation_Var_Samp_Fields = {
  __typename?: 'AccountTokenAllocation_var_samp_fields';
  earnedTotalUsd?: Maybe<Scalars['Float']['output']>;
  monthsActive?: Maybe<Scalars['Float']['output']>;
  nbArtistsCollected?: Maybe<Scalars['Float']['output']>;
  nbIterationsMinted?: Maybe<Scalars['Float']['output']>;
  spentTotalUsd?: Maybe<Scalars['Float']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type AccountTokenAllocation_Variance_Fields = {
  __typename?: 'AccountTokenAllocation_variance_fields';
  earnedTotalUsd?: Maybe<Scalars['Float']['output']>;
  monthsActive?: Maybe<Scalars['Float']['output']>;
  nbArtistsCollected?: Maybe<Scalars['Float']['output']>;
  nbIterationsMinted?: Maybe<Scalars['Float']['output']>;
  spentTotalUsd?: Maybe<Scalars['Float']['output']>;
  tokenAllocation_sort?: Maybe<Scalars['Float']['output']>;
};

/** aggregated selection of "Account" */
export type Account_Aggregate = {
  __typename?: 'Account_aggregate';
  aggregate?: Maybe<Account_Aggregate_Fields>;
  nodes: Array<Account>;
};

/** aggregate fields of "Account" */
export type Account_Aggregate_Fields = {
  __typename?: 'Account_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Max_Fields>;
  min?: Maybe<Account_Min_Fields>;
};


/** aggregate fields of "Account" */
export type Account_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "Account". All fields are combined with a logical 'AND'. */
export type Account_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Bool_Exp>>;
  _not?: InputMaybe<Account_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Bool_Exp>>;
  authoredProjects?: InputMaybe<Project_Bool_Exp>;
  collaboratedProjects?: InputMaybe<ProjectCollaborator_Bool_Exp>;
  curatedProjects?: InputMaybe<Project_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isArtist?: InputMaybe<Boolean_Comparison_Exp>;
  isModerated?: InputMaybe<Boolean_Comparison_Exp>;
  isVerified?: InputMaybe<Boolean_Comparison_Exp>;
  mainWallet?: InputMaybe<Wallet_Bool_Exp>;
  mainWalletAddress?: InputMaybe<String_Comparison_Exp>;
  profile?: InputMaybe<Profile_Bool_Exp>;
  roles?: InputMaybe<AccountsRoles_Bool_Exp>;
  status?: InputMaybe<AccountStatus_Comparison_Exp>;
  tokenAllocation?: InputMaybe<AccountTokenAllocation_Bool_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
  wallets?: InputMaybe<Wallet_Bool_Exp>;
};

/** aggregate max on columns */
export type Account_Max_Fields = {
  __typename?: 'Account_max_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  mainWalletAddress?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['AccountStatus']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Account_Min_Fields = {
  __typename?: 'Account_min_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  mainWalletAddress?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['AccountStatus']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "Account" */
export type Account_Mutation_Response = {
  __typename?: 'Account_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Account>;
};

/** Ordering options when selecting data from "Account". */
export type Account_Order_By = {
  authoredProjects_aggregate?: InputMaybe<Project_Aggregate_Order_By>;
  collaboratedProjects_aggregate?: InputMaybe<ProjectCollaborator_Aggregate_Order_By>;
  curatedProjects_aggregate?: InputMaybe<Project_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  isArtist?: InputMaybe<Order_By>;
  isModerated?: InputMaybe<Order_By>;
  isVerified?: InputMaybe<Order_By>;
  mainWallet?: InputMaybe<Wallet_Order_By>;
  mainWalletAddress?: InputMaybe<Order_By>;
  profile?: InputMaybe<Profile_Order_By>;
  roles_aggregate?: InputMaybe<AccountsRoles_Aggregate_Order_By>;
  status?: InputMaybe<Order_By>;
  tokenAllocation?: InputMaybe<AccountTokenAllocation_Order_By>;
  username?: InputMaybe<Order_By>;
  wallets_aggregate?: InputMaybe<Wallet_Aggregate_Order_By>;
};

/** primary key columns input for table: Account */
export type Account_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "Account" */
export enum Account_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsArtist = 'isArtist',
  /** column name */
  IsModerated = 'isModerated',
  /** column name */
  IsVerified = 'isVerified',
  /** column name */
  MainWalletAddress = 'mainWalletAddress',
  /** column name */
  Status = 'status',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "Account" */
export type Account_Set_Input = {
  username?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "Account" */
export type Account_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  isArtist?: InputMaybe<Scalars['Boolean']['input']>;
  isModerated?: InputMaybe<Scalars['Boolean']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  mainWalletAddress?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['AccountStatus']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Account_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Account_Set_Input>;
  /** filter the rows which have to be updated */
  where: Account_Bool_Exp;
};

/** columns and relationships of "AccountsRoles" */
export type AccountsRoles = {
  __typename?: 'AccountsRoles';
  /** An object relationship */
  account: Account;
  accountId: Scalars['uuid']['output'];
  /** An object relationship */
  role: AccountRole;
  roleValue: AccountRole_Enum;
};

/** order by aggregate values of table "AccountsRoles" */
export type AccountsRoles_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AccountsRoles_Max_Order_By>;
  min?: InputMaybe<AccountsRoles_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "AccountsRoles". All fields are combined with a logical 'AND'. */
export type AccountsRoles_Bool_Exp = {
  _and?: InputMaybe<Array<AccountsRoles_Bool_Exp>>;
  _not?: InputMaybe<AccountsRoles_Bool_Exp>;
  _or?: InputMaybe<Array<AccountsRoles_Bool_Exp>>;
  account?: InputMaybe<Account_Bool_Exp>;
  accountId?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<AccountRole_Bool_Exp>;
  roleValue?: InputMaybe<AccountRole_Enum_Comparison_Exp>;
};

/** order by max() on columns of table "AccountsRoles" */
export type AccountsRoles_Max_Order_By = {
  accountId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "AccountsRoles" */
export type AccountsRoles_Min_Order_By = {
  accountId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "AccountsRoles". */
export type AccountsRoles_Order_By = {
  account?: InputMaybe<Account_Order_By>;
  accountId?: InputMaybe<Order_By>;
  role?: InputMaybe<AccountRole_Order_By>;
  roleValue?: InputMaybe<Order_By>;
};

/** select columns of table "AccountsRoles" */
export enum AccountsRoles_Select_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  RoleValue = 'roleValue'
}

/** Streaming cursor of the table "AccountsRoles" */
export type AccountsRoles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AccountsRoles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AccountsRoles_Stream_Cursor_Value_Input = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  roleValue?: InputMaybe<AccountRole_Enum>;
};

export type AirdropTezClaimInput = {
  publicKey: Scalars['String']['input'];
  signature: Scalars['String']['input'];
};

export type AirdropTezClaimResult = {
  __typename?: 'AirdropTezClaimResult';
  signature: Scalars['String']['output'];
};

export type AuthenticationInput = {
  id: Scalars['String']['input'];
  publicKey?: InputMaybe<Scalars['String']['input']>;
  signature: Scalars['String']['input'];
};

export type AuthenticationResult = {
  __typename?: 'AuthenticationResult';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type AuthenticationWeb3AuthInput = {
  compressedPublicKey: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

/** Boolean expression to compare columns of type "BlockchainNetwork". All fields are combined with logical 'AND'. */
export type BlockchainNetwork_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['BlockchainNetwork']['input']>;
  _gt?: InputMaybe<Scalars['BlockchainNetwork']['input']>;
  _gte?: InputMaybe<Scalars['BlockchainNetwork']['input']>;
  _in?: InputMaybe<Array<Scalars['BlockchainNetwork']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['BlockchainNetwork']['input']>;
  _lte?: InputMaybe<Scalars['BlockchainNetwork']['input']>;
  _neq?: InputMaybe<Scalars['BlockchainNetwork']['input']>;
  _nin?: InputMaybe<Array<Scalars['BlockchainNetwork']['input']>>;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

export type ChallengeInput = {
  address: Scalars['String']['input'];
  chain: Scalars['String']['input'];
};

export type ChallengeResult = {
  __typename?: 'ChallengeResult';
  id: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

/** columns and relationships of "ClaimProof" */
export type ClaimProof = {
  __typename?: 'ClaimProof';
  address: Scalars['String']['output'];
  allocation: Scalars['String']['output'];
  leaf: Scalars['String']['output'];
  proof?: Maybe<Array<Scalars['String']['output']>>;
};

/** Boolean expression to filter rows from the table "ClaimProof". All fields are combined with a logical 'AND'. */
export type ClaimProof_Bool_Exp = {
  _and?: InputMaybe<Array<ClaimProof_Bool_Exp>>;
  _not?: InputMaybe<ClaimProof_Bool_Exp>;
  _or?: InputMaybe<Array<ClaimProof_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  allocation?: InputMaybe<String_Comparison_Exp>;
  leaf?: InputMaybe<String_Comparison_Exp>;
  proof?: InputMaybe<String_Array_Comparison_Exp>;
};

/** Ordering options when selecting data from "ClaimProof". */
export type ClaimProof_Order_By = {
  address?: InputMaybe<Order_By>;
  allocation?: InputMaybe<Order_By>;
  leaf?: InputMaybe<Order_By>;
  proof?: InputMaybe<Order_By>;
};

/** select columns of table "ClaimProof" */
export enum ClaimProof_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Allocation = 'allocation',
  /** column name */
  Leaf = 'leaf',
  /** column name */
  Proof = 'proof'
}

/** Streaming cursor of the table "ClaimProof" */
export type ClaimProof_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ClaimProof_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ClaimProof_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  allocation?: InputMaybe<Scalars['String']['input']>;
  leaf?: InputMaybe<Scalars['String']['input']>;
  proof?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** columns and relationships of "Consumable" */
export type Consumable = {
  __typename?: 'Consumable';
  active: Scalars['Boolean']['output'];
  address: Scalars['String']['output'];
  amount: Scalars['bigint']['output'];
  createdAt: Scalars['timestamp']['output'];
  description: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['timestamp']['output']>;
  fa2: Scalars['String']['output'];
  maxConsumptions: Scalars['Int']['output'];
  /** An array relationship */
  medias: Array<MediasOnConsumables>;
  name: Scalars['String']['output'];
  options: Scalars['jsonb']['output'];
  projectId: Scalars['String']['output'];
  publicDefinition: Scalars['jsonb']['output'];
  splits: Scalars['jsonb']['output'];
  successInfos: Scalars['String']['output'];
};


/** columns and relationships of "Consumable" */
export type ConsumableMediasArgs = {
  distinct_on?: InputMaybe<Array<MediasOnConsumables_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MediasOnConsumables_Order_By>>;
  where?: InputMaybe<MediasOnConsumables_Bool_Exp>;
};


/** columns and relationships of "Consumable" */
export type ConsumableOptionsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "Consumable" */
export type ConsumablePublicDefinitionArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "Consumable" */
export type ConsumableSplitsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "Consumable". All fields are combined with a logical 'AND'. */
export type Consumable_Bool_Exp = {
  _and?: InputMaybe<Array<Consumable_Bool_Exp>>;
  _not?: InputMaybe<Consumable_Bool_Exp>;
  _or?: InputMaybe<Array<Consumable_Bool_Exp>>;
  active?: InputMaybe<Boolean_Comparison_Exp>;
  address?: InputMaybe<String_Comparison_Exp>;
  amount?: InputMaybe<Bigint_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamp_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  expiresAt?: InputMaybe<Timestamp_Comparison_Exp>;
  fa2?: InputMaybe<String_Comparison_Exp>;
  maxConsumptions?: InputMaybe<Int_Comparison_Exp>;
  medias?: InputMaybe<MediasOnConsumables_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  options?: InputMaybe<Jsonb_Comparison_Exp>;
  projectId?: InputMaybe<String_Comparison_Exp>;
  publicDefinition?: InputMaybe<Jsonb_Comparison_Exp>;
  splits?: InputMaybe<Jsonb_Comparison_Exp>;
  successInfos?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Consumable". */
export type Consumable_Order_By = {
  active?: InputMaybe<Order_By>;
  address?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  expiresAt?: InputMaybe<Order_By>;
  fa2?: InputMaybe<Order_By>;
  maxConsumptions?: InputMaybe<Order_By>;
  medias_aggregate?: InputMaybe<MediasOnConsumables_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  options?: InputMaybe<Order_By>;
  projectId?: InputMaybe<Order_By>;
  publicDefinition?: InputMaybe<Order_By>;
  splits?: InputMaybe<Order_By>;
  successInfos?: InputMaybe<Order_By>;
};

/** select columns of table "Consumable" */
export enum Consumable_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  Address = 'address',
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  ExpiresAt = 'expiresAt',
  /** column name */
  Fa2 = 'fa2',
  /** column name */
  MaxConsumptions = 'maxConsumptions',
  /** column name */
  Name = 'name',
  /** column name */
  Options = 'options',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  PublicDefinition = 'publicDefinition',
  /** column name */
  Splits = 'splits',
  /** column name */
  SuccessInfos = 'successInfos'
}

/** Streaming cursor of the table "Consumable" */
export type Consumable_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Consumable_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Consumable_Stream_Cursor_Value_Input = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['bigint']['input']>;
  createdAt?: InputMaybe<Scalars['timestamp']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expiresAt?: InputMaybe<Scalars['timestamp']['input']>;
  fa2?: InputMaybe<Scalars['String']['input']>;
  maxConsumptions?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<Scalars['jsonb']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  publicDefinition?: InputMaybe<Scalars['jsonb']['input']>;
  splits?: InputMaybe<Scalars['jsonb']['input']>;
  successInfos?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteAccountOutput = {
  __typename?: 'DeleteAccountOutput';
  id: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export enum EWalletOperatorState {
  Available = 'AVAILABLE',
  Empty = 'EMPTY',
  Initializing = 'INITIALIZING',
  Preparing = 'PREPARING',
  WaitingConfirmation = 'WAITING_CONFIRMATION'
}

export type EstimateEvmTransactionError = {
  __typename?: 'EstimateEvmTransactionError';
  message: Scalars['String']['output'];
  revertReason?: Maybe<Scalars['String']['output']>;
};

export type EstimateEvmTransactionInput = {
  chainId: Scalars['String']['input'];
  transactions: Array<EvmTransactionInput>;
};

export type EstimateEvmTransactionOutput = {
  __typename?: 'EstimateEvmTransactionOutput';
  changes: Array<EvmTransactionChanges>;
  error?: Maybe<EstimateEvmTransactionError>;
  gasUsed?: Maybe<Scalars['String']['output']>;
};

/** columns and relationships of "Event" */
export type Event = {
  __typename?: 'Event';
  /** An object relationship */
  Featured?: Maybe<Featured>;
  availabilities?: Maybe<Array<Scalars['EventAvailability']['output']>>;
  createdAt: Scalars['timestamp']['output'];
  description: Scalars['String']['output'];
  endsAt: Scalars['timestamp']['output'];
  freeLiveMinting: Scalars['Boolean']['output'];
  /** An object relationship */
  headerMedia?: Maybe<Media>;
  headerMediaId?: Maybe<Scalars['uuid']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  labelIds?: Maybe<Array<Scalars['Int']['output']>>;
  location?: Maybe<Scalars['String']['output']>;
  mintPageUrl: Scalars['String']['output'];
  /** An array relationship */
  mintPassGroups: Array<MintPassGroup>;
  name: Scalars['String']['output'];
  /** An object relationship */
  onboarding?: Maybe<EventOnboarding>;
  /** An object relationship */
  partnerMedia?: Maybe<Media>;
  partnerMediaId?: Maybe<Scalars['uuid']['output']>;
  projectIds?: Maybe<Array<Scalars['String']['output']>>;
  startsAt: Scalars['timestamp']['output'];
  status: Scalars['EventStatus']['output'];
  /** An object relationship */
  thumbnailMedia?: Maybe<Media>;
  thumbnailMediaId?: Maybe<Scalars['uuid']['output']>;
  updatedAt: Scalars['timestamp']['output'];
};


/** columns and relationships of "Event" */
export type EventMintPassGroupsArgs = {
  distinct_on?: InputMaybe<Array<MintPassGroup_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MintPassGroup_Order_By>>;
  where?: InputMaybe<MintPassGroup_Bool_Exp>;
};

/** Boolean expression to compare columns of type "EventAvailability". All fields are combined with logical 'AND'. */
export type EventAvailability_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['EventAvailability']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['EventAvailability']['input']>>;
  _eq?: InputMaybe<Array<Scalars['EventAvailability']['input']>>;
  _gt?: InputMaybe<Array<Scalars['EventAvailability']['input']>>;
  _gte?: InputMaybe<Array<Scalars['EventAvailability']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['EventAvailability']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['EventAvailability']['input']>>;
  _lte?: InputMaybe<Array<Scalars['EventAvailability']['input']>>;
  _neq?: InputMaybe<Array<Scalars['EventAvailability']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['EventAvailability']['input']>>>;
};

/** columns and relationships of "EventOnboarding" */
export type EventOnboarding = {
  __typename?: 'EventOnboarding';
  /** An array relationship */
  components: Array<EventOnboardingOnComponents>;
  description?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  eventId: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};


/** columns and relationships of "EventOnboarding" */
export type EventOnboardingComponentsArgs = {
  distinct_on?: InputMaybe<Array<EventOnboardingOnComponents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EventOnboardingOnComponents_Order_By>>;
  where?: InputMaybe<EventOnboardingOnComponents_Bool_Exp>;
};

/** columns and relationships of "EventOnboardingOnComponents" */
export type EventOnboardingOnComponents = {
  __typename?: 'EventOnboardingOnComponents';
  /** An object relationship */
  component: OnboardingComponent;
  componentId: Scalars['Int']['output'];
  eventOnboardingId: Scalars['Int']['output'];
  index: Scalars['Int']['output'];
};

/** order by aggregate values of table "EventOnboardingOnComponents" */
export type EventOnboardingOnComponents_Aggregate_Order_By = {
  avg?: InputMaybe<EventOnboardingOnComponents_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<EventOnboardingOnComponents_Max_Order_By>;
  min?: InputMaybe<EventOnboardingOnComponents_Min_Order_By>;
  stddev?: InputMaybe<EventOnboardingOnComponents_Stddev_Order_By>;
  stddev_pop?: InputMaybe<EventOnboardingOnComponents_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<EventOnboardingOnComponents_Stddev_Samp_Order_By>;
  sum?: InputMaybe<EventOnboardingOnComponents_Sum_Order_By>;
  var_pop?: InputMaybe<EventOnboardingOnComponents_Var_Pop_Order_By>;
  var_samp?: InputMaybe<EventOnboardingOnComponents_Var_Samp_Order_By>;
  variance?: InputMaybe<EventOnboardingOnComponents_Variance_Order_By>;
};

/** order by avg() on columns of table "EventOnboardingOnComponents" */
export type EventOnboardingOnComponents_Avg_Order_By = {
  componentId?: InputMaybe<Order_By>;
  eventOnboardingId?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "EventOnboardingOnComponents". All fields are combined with a logical 'AND'. */
export type EventOnboardingOnComponents_Bool_Exp = {
  _and?: InputMaybe<Array<EventOnboardingOnComponents_Bool_Exp>>;
  _not?: InputMaybe<EventOnboardingOnComponents_Bool_Exp>;
  _or?: InputMaybe<Array<EventOnboardingOnComponents_Bool_Exp>>;
  component?: InputMaybe<OnboardingComponent_Bool_Exp>;
  componentId?: InputMaybe<Int_Comparison_Exp>;
  eventOnboardingId?: InputMaybe<Int_Comparison_Exp>;
  index?: InputMaybe<Int_Comparison_Exp>;
};

/** order by max() on columns of table "EventOnboardingOnComponents" */
export type EventOnboardingOnComponents_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  eventOnboardingId?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "EventOnboardingOnComponents" */
export type EventOnboardingOnComponents_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  eventOnboardingId?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "EventOnboardingOnComponents". */
export type EventOnboardingOnComponents_Order_By = {
  component?: InputMaybe<OnboardingComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  eventOnboardingId?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** select columns of table "EventOnboardingOnComponents" */
export enum EventOnboardingOnComponents_Select_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  EventOnboardingId = 'eventOnboardingId',
  /** column name */
  Index = 'index'
}

/** order by stddev() on columns of table "EventOnboardingOnComponents" */
export type EventOnboardingOnComponents_Stddev_Order_By = {
  componentId?: InputMaybe<Order_By>;
  eventOnboardingId?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "EventOnboardingOnComponents" */
export type EventOnboardingOnComponents_Stddev_Pop_Order_By = {
  componentId?: InputMaybe<Order_By>;
  eventOnboardingId?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "EventOnboardingOnComponents" */
export type EventOnboardingOnComponents_Stddev_Samp_Order_By = {
  componentId?: InputMaybe<Order_By>;
  eventOnboardingId?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "EventOnboardingOnComponents" */
export type EventOnboardingOnComponents_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: EventOnboardingOnComponents_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type EventOnboardingOnComponents_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['Int']['input']>;
  eventOnboardingId?: InputMaybe<Scalars['Int']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
};

/** order by sum() on columns of table "EventOnboardingOnComponents" */
export type EventOnboardingOnComponents_Sum_Order_By = {
  componentId?: InputMaybe<Order_By>;
  eventOnboardingId?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "EventOnboardingOnComponents" */
export type EventOnboardingOnComponents_Var_Pop_Order_By = {
  componentId?: InputMaybe<Order_By>;
  eventOnboardingId?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "EventOnboardingOnComponents" */
export type EventOnboardingOnComponents_Var_Samp_Order_By = {
  componentId?: InputMaybe<Order_By>;
  eventOnboardingId?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "EventOnboardingOnComponents" */
export type EventOnboardingOnComponents_Variance_Order_By = {
  componentId?: InputMaybe<Order_By>;
  eventOnboardingId?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "EventOnboarding". All fields are combined with a logical 'AND'. */
export type EventOnboarding_Bool_Exp = {
  _and?: InputMaybe<Array<EventOnboarding_Bool_Exp>>;
  _not?: InputMaybe<EventOnboarding_Bool_Exp>;
  _or?: InputMaybe<Array<EventOnboarding_Bool_Exp>>;
  components?: InputMaybe<EventOnboardingOnComponents_Bool_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  enabled?: InputMaybe<Boolean_Comparison_Exp>;
  eventId?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "EventOnboarding". */
export type EventOnboarding_Order_By = {
  components_aggregate?: InputMaybe<EventOnboardingOnComponents_Aggregate_Order_By>;
  description?: InputMaybe<Order_By>;
  enabled?: InputMaybe<Order_By>;
  eventId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "EventOnboarding" */
export enum EventOnboarding_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Enabled = 'enabled',
  /** column name */
  EventId = 'eventId',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "EventOnboarding" */
export type EventOnboarding_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: EventOnboarding_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type EventOnboarding_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  eventId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** Boolean expression to compare columns of type "EventStatus". All fields are combined with logical 'AND'. */
export type EventStatus_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['EventStatus']['input']>;
  _gt?: InputMaybe<Scalars['EventStatus']['input']>;
  _gte?: InputMaybe<Scalars['EventStatus']['input']>;
  _in?: InputMaybe<Array<Scalars['EventStatus']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['EventStatus']['input']>;
  _lte?: InputMaybe<Scalars['EventStatus']['input']>;
  _neq?: InputMaybe<Scalars['EventStatus']['input']>;
  _nin?: InputMaybe<Array<Scalars['EventStatus']['input']>>;
};

/** aggregated selection of "Event" */
export type Event_Aggregate = {
  __typename?: 'Event_aggregate';
  aggregate?: Maybe<Event_Aggregate_Fields>;
  nodes: Array<Event>;
};

/** aggregate fields of "Event" */
export type Event_Aggregate_Fields = {
  __typename?: 'Event_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Event_Max_Fields>;
  min?: Maybe<Event_Min_Fields>;
};


/** aggregate fields of "Event" */
export type Event_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Event_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "Event". All fields are combined with a logical 'AND'. */
export type Event_Bool_Exp = {
  Featured?: InputMaybe<Featured_Bool_Exp>;
  _and?: InputMaybe<Array<Event_Bool_Exp>>;
  _not?: InputMaybe<Event_Bool_Exp>;
  _or?: InputMaybe<Array<Event_Bool_Exp>>;
  availabilities?: InputMaybe<EventAvailability_Array_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamp_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  endsAt?: InputMaybe<Timestamp_Comparison_Exp>;
  freeLiveMinting?: InputMaybe<Boolean_Comparison_Exp>;
  headerMedia?: InputMaybe<Media_Bool_Exp>;
  headerMediaId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  imageUrl?: InputMaybe<String_Comparison_Exp>;
  labelIds?: InputMaybe<Int_Array_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  mintPageUrl?: InputMaybe<String_Comparison_Exp>;
  mintPassGroups?: InputMaybe<MintPassGroup_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  onboarding?: InputMaybe<EventOnboarding_Bool_Exp>;
  partnerMedia?: InputMaybe<Media_Bool_Exp>;
  partnerMediaId?: InputMaybe<Uuid_Comparison_Exp>;
  projectIds?: InputMaybe<String_Array_Comparison_Exp>;
  startsAt?: InputMaybe<Timestamp_Comparison_Exp>;
  status?: InputMaybe<EventStatus_Comparison_Exp>;
  thumbnailMedia?: InputMaybe<Media_Bool_Exp>;
  thumbnailMediaId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** aggregate max on columns */
export type Event_Max_Fields = {
  __typename?: 'Event_max_fields';
  availabilities?: Maybe<Array<Scalars['EventAvailability']['output']>>;
  createdAt?: Maybe<Scalars['timestamp']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endsAt?: Maybe<Scalars['timestamp']['output']>;
  headerMediaId?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  labelIds?: Maybe<Array<Scalars['Int']['output']>>;
  location?: Maybe<Scalars['String']['output']>;
  mintPageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  partnerMediaId?: Maybe<Scalars['uuid']['output']>;
  projectIds?: Maybe<Array<Scalars['String']['output']>>;
  startsAt?: Maybe<Scalars['timestamp']['output']>;
  status?: Maybe<Scalars['EventStatus']['output']>;
  thumbnailMediaId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Event_Min_Fields = {
  __typename?: 'Event_min_fields';
  availabilities?: Maybe<Array<Scalars['EventAvailability']['output']>>;
  createdAt?: Maybe<Scalars['timestamp']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endsAt?: Maybe<Scalars['timestamp']['output']>;
  headerMediaId?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  labelIds?: Maybe<Array<Scalars['Int']['output']>>;
  location?: Maybe<Scalars['String']['output']>;
  mintPageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  partnerMediaId?: Maybe<Scalars['uuid']['output']>;
  projectIds?: Maybe<Array<Scalars['String']['output']>>;
  startsAt?: Maybe<Scalars['timestamp']['output']>;
  status?: Maybe<Scalars['EventStatus']['output']>;
  thumbnailMediaId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamp']['output']>;
};

/** Ordering options when selecting data from "Event". */
export type Event_Order_By = {
  Featured?: InputMaybe<Featured_Order_By>;
  availabilities?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  endsAt?: InputMaybe<Order_By>;
  freeLiveMinting?: InputMaybe<Order_By>;
  headerMedia?: InputMaybe<Media_Order_By>;
  headerMediaId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  imageUrl?: InputMaybe<Order_By>;
  labelIds?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  mintPageUrl?: InputMaybe<Order_By>;
  mintPassGroups_aggregate?: InputMaybe<MintPassGroup_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  onboarding?: InputMaybe<EventOnboarding_Order_By>;
  partnerMedia?: InputMaybe<Media_Order_By>;
  partnerMediaId?: InputMaybe<Order_By>;
  projectIds?: InputMaybe<Order_By>;
  startsAt?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  thumbnailMedia?: InputMaybe<Media_Order_By>;
  thumbnailMediaId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** select columns of table "Event" */
export enum Event_Select_Column {
  /** column name */
  Availabilities = 'availabilities',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  EndsAt = 'endsAt',
  /** column name */
  FreeLiveMinting = 'freeLiveMinting',
  /** column name */
  HeaderMediaId = 'headerMediaId',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'imageUrl',
  /** column name */
  LabelIds = 'labelIds',
  /** column name */
  Location = 'location',
  /** column name */
  MintPageUrl = 'mintPageUrl',
  /** column name */
  Name = 'name',
  /** column name */
  PartnerMediaId = 'partnerMediaId',
  /** column name */
  ProjectIds = 'projectIds',
  /** column name */
  StartsAt = 'startsAt',
  /** column name */
  Status = 'status',
  /** column name */
  ThumbnailMediaId = 'thumbnailMediaId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** Streaming cursor of the table "Event" */
export type Event_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Event_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Event_Stream_Cursor_Value_Input = {
  availabilities?: InputMaybe<Array<Scalars['EventAvailability']['input']>>;
  createdAt?: InputMaybe<Scalars['timestamp']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endsAt?: InputMaybe<Scalars['timestamp']['input']>;
  freeLiveMinting?: InputMaybe<Scalars['Boolean']['input']>;
  headerMediaId?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  labelIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  location?: InputMaybe<Scalars['String']['input']>;
  mintPageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  partnerMediaId?: InputMaybe<Scalars['uuid']['input']>;
  projectIds?: InputMaybe<Array<Scalars['String']['input']>>;
  startsAt?: InputMaybe<Scalars['timestamp']['input']>;
  status?: InputMaybe<Scalars['EventStatus']['input']>;
  thumbnailMediaId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamp']['input']>;
};

export type EvmTransactionChanges = {
  __typename?: 'EvmTransactionChanges';
  amount?: Maybe<Scalars['String']['output']>;
  assetType?: Maybe<Scalars['String']['output']>;
  changeType: Scalars['String']['output'];
  contractAddress: Scalars['String']['output'];
  decimals?: Maybe<Scalars['Int']['output']>;
  from: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  rawAmount: Scalars['String']['output'];
  symbol?: Maybe<Scalars['String']['output']>;
  to: Scalars['String']['output'];
  tokenId?: Maybe<Scalars['String']['output']>;
};

export type EvmTransactionInput = {
  data?: InputMaybe<Scalars['String']['input']>;
  from: Scalars['String']['input'];
  gas?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['String']['input']>;
  maxFeePerGas?: InputMaybe<Scalars['String']['input']>;
  maxPriorityFeePerGas?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "Featured" */
export type Featured = {
  __typename?: 'Featured';
  /** An object relationship */
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "Featured". All fields are combined with a logical 'AND'. */
export type Featured_Bool_Exp = {
  _and?: InputMaybe<Array<Featured_Bool_Exp>>;
  _not?: InputMaybe<Featured_Bool_Exp>;
  _or?: InputMaybe<Array<Featured_Bool_Exp>>;
  event?: InputMaybe<Event_Bool_Exp>;
  eventId?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "Featured". */
export type Featured_Order_By = {
  event?: InputMaybe<Event_Order_By>;
  eventId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "Featured" */
export enum Featured_Select_Column {
  /** column name */
  EventId = 'eventId',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "Featured" */
export type Featured_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Featured_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Featured_Stream_Cursor_Value_Input = {
  eventId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['Int']['input']>>;
  _eq?: InputMaybe<Array<Scalars['Int']['input']>>;
  _gt?: InputMaybe<Array<Scalars['Int']['input']>>;
  _gte?: InputMaybe<Array<Scalars['Int']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['Int']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['Int']['input']>>;
  _lte?: InputMaybe<Array<Scalars['Int']['input']>>;
  _neq?: InputMaybe<Array<Scalars['Int']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['Int']['input']>>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** columns and relationships of "Library" */
export type Library = {
  __typename?: 'Library';
  authors?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['timestamp']['output'];
  description?: Maybe<Scalars['String']['output']>;
  docUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  license?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  versions: Array<LibraryVersion>;
};


/** columns and relationships of "Library" */
export type LibraryVersionsArgs = {
  distinct_on?: InputMaybe<Array<LibraryVersion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<LibraryVersion_Order_By>>;
  where?: InputMaybe<LibraryVersion_Bool_Exp>;
};

/** columns and relationships of "LibraryVersion" */
export type LibraryVersion = {
  __typename?: 'LibraryVersion';
  content: Scalars['String']['output'];
  filename: Scalars['String']['output'];
  id: Scalars['String']['output'];
  libraryId: Scalars['String']['output'];
  onchfsPointer: Scalars['String']['output'];
};

/** order by aggregate values of table "LibraryVersion" */
export type LibraryVersion_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<LibraryVersion_Max_Order_By>;
  min?: InputMaybe<LibraryVersion_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "LibraryVersion". All fields are combined with a logical 'AND'. */
export type LibraryVersion_Bool_Exp = {
  _and?: InputMaybe<Array<LibraryVersion_Bool_Exp>>;
  _not?: InputMaybe<LibraryVersion_Bool_Exp>;
  _or?: InputMaybe<Array<LibraryVersion_Bool_Exp>>;
  content?: InputMaybe<String_Comparison_Exp>;
  filename?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  libraryId?: InputMaybe<String_Comparison_Exp>;
  onchfsPointer?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "LibraryVersion" */
export type LibraryVersion_Max_Order_By = {
  content?: InputMaybe<Order_By>;
  filename?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  libraryId?: InputMaybe<Order_By>;
  onchfsPointer?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "LibraryVersion" */
export type LibraryVersion_Min_Order_By = {
  content?: InputMaybe<Order_By>;
  filename?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  libraryId?: InputMaybe<Order_By>;
  onchfsPointer?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "LibraryVersion". */
export type LibraryVersion_Order_By = {
  content?: InputMaybe<Order_By>;
  filename?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  libraryId?: InputMaybe<Order_By>;
  onchfsPointer?: InputMaybe<Order_By>;
};

/** select columns of table "LibraryVersion" */
export enum LibraryVersion_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  Filename = 'filename',
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'libraryId',
  /** column name */
  OnchfsPointer = 'onchfsPointer'
}

/** Streaming cursor of the table "LibraryVersion" */
export type LibraryVersion_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: LibraryVersion_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type LibraryVersion_Stream_Cursor_Value_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  libraryId?: InputMaybe<Scalars['String']['input']>;
  onchfsPointer?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "Library". All fields are combined with a logical 'AND'. */
export type Library_Bool_Exp = {
  _and?: InputMaybe<Array<Library_Bool_Exp>>;
  _not?: InputMaybe<Library_Bool_Exp>;
  _or?: InputMaybe<Array<Library_Bool_Exp>>;
  authors?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamp_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  docUrl?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  license?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  versions?: InputMaybe<LibraryVersion_Bool_Exp>;
};

/** Ordering options when selecting data from "Library". */
export type Library_Order_By = {
  authors?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  docUrl?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  license?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  versions_aggregate?: InputMaybe<LibraryVersion_Aggregate_Order_By>;
};

/** select columns of table "Library" */
export enum Library_Select_Column {
  /** column name */
  Authors = 'authors',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  DocUrl = 'docUrl',
  /** column name */
  Id = 'id',
  /** column name */
  License = 'license',
  /** column name */
  Name = 'name'
}

/** Streaming cursor of the table "Library" */
export type Library_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Library_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Library_Stream_Cursor_Value_Input = {
  authors?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamp']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  docUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  license?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type LinkWalletInput = {
  id: Scalars['String']['input'];
  publicKey?: InputMaybe<Scalars['String']['input']>;
  signature: Scalars['String']['input'];
};

export type LogoutInput = {
  refreshToken?: InputMaybe<Scalars['String']['input']>;
};

export type LogoutResult = {
  __typename?: 'LogoutResult';
  success: Scalars['Boolean']['output'];
};

export type MailTemplate = {
  __typename?: 'MailTemplate';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

/** columns and relationships of "Media" */
export type Media = {
  __typename?: 'Media';
  createdAt: Scalars['timestamptz']['output'];
  etag?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An array relationship */
  project: Array<ProjectMedia>;
  size: Scalars['Int']['output'];
  updatedAt: Scalars['timestamptz']['output'];
  /** An object relationship */
  uploader?: Maybe<Account>;
  uploaderId?: Maybe<Scalars['uuid']['output']>;
  url: Scalars['String']['output'];
};


/** columns and relationships of "Media" */
export type MediaProjectArgs = {
  distinct_on?: InputMaybe<Array<ProjectMedia_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ProjectMedia_Order_By>>;
  where?: InputMaybe<ProjectMedia_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "Media". All fields are combined with a logical 'AND'. */
export type Media_Bool_Exp = {
  _and?: InputMaybe<Array<Media_Bool_Exp>>;
  _not?: InputMaybe<Media_Bool_Exp>;
  _or?: InputMaybe<Array<Media_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  etag?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  project?: InputMaybe<ProjectMedia_Bool_Exp>;
  size?: InputMaybe<Int_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  uploader?: InputMaybe<Account_Bool_Exp>;
  uploaderId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** Ordering options when selecting data from "Media". */
export type Media_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  etag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  project_aggregate?: InputMaybe<ProjectMedia_Aggregate_Order_By>;
  size?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  uploader?: InputMaybe<Account_Order_By>;
  uploaderId?: InputMaybe<Order_By>;
};

/** select columns of table "Media" */
export enum Media_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Etag = 'etag',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Size = 'size',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UploaderId = 'uploaderId'
}

/** Streaming cursor of the table "Media" */
export type Media_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Media_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Media_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  etag?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  uploaderId?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "MediasOnConsumables" */
export type MediasOnConsumables = {
  __typename?: 'MediasOnConsumables';
  consumableAddress: Scalars['String']['output'];
  index: Scalars['Int']['output'];
  /** An object relationship */
  media: Media;
  mediaId: Scalars['uuid']['output'];
};

/** order by aggregate values of table "MediasOnConsumables" */
export type MediasOnConsumables_Aggregate_Order_By = {
  avg?: InputMaybe<MediasOnConsumables_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<MediasOnConsumables_Max_Order_By>;
  min?: InputMaybe<MediasOnConsumables_Min_Order_By>;
  stddev?: InputMaybe<MediasOnConsumables_Stddev_Order_By>;
  stddev_pop?: InputMaybe<MediasOnConsumables_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<MediasOnConsumables_Stddev_Samp_Order_By>;
  sum?: InputMaybe<MediasOnConsumables_Sum_Order_By>;
  var_pop?: InputMaybe<MediasOnConsumables_Var_Pop_Order_By>;
  var_samp?: InputMaybe<MediasOnConsumables_Var_Samp_Order_By>;
  variance?: InputMaybe<MediasOnConsumables_Variance_Order_By>;
};

/** order by avg() on columns of table "MediasOnConsumables" */
export type MediasOnConsumables_Avg_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "MediasOnConsumables". All fields are combined with a logical 'AND'. */
export type MediasOnConsumables_Bool_Exp = {
  _and?: InputMaybe<Array<MediasOnConsumables_Bool_Exp>>;
  _not?: InputMaybe<MediasOnConsumables_Bool_Exp>;
  _or?: InputMaybe<Array<MediasOnConsumables_Bool_Exp>>;
  consumableAddress?: InputMaybe<String_Comparison_Exp>;
  index?: InputMaybe<Int_Comparison_Exp>;
  media?: InputMaybe<Media_Bool_Exp>;
  mediaId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** order by max() on columns of table "MediasOnConsumables" */
export type MediasOnConsumables_Max_Order_By = {
  consumableAddress?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  mediaId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "MediasOnConsumables" */
export type MediasOnConsumables_Min_Order_By = {
  consumableAddress?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  mediaId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "MediasOnConsumables". */
export type MediasOnConsumables_Order_By = {
  consumableAddress?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  media?: InputMaybe<Media_Order_By>;
  mediaId?: InputMaybe<Order_By>;
};

/** select columns of table "MediasOnConsumables" */
export enum MediasOnConsumables_Select_Column {
  /** column name */
  ConsumableAddress = 'consumableAddress',
  /** column name */
  Index = 'index',
  /** column name */
  MediaId = 'mediaId'
}

/** order by stddev() on columns of table "MediasOnConsumables" */
export type MediasOnConsumables_Stddev_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "MediasOnConsumables" */
export type MediasOnConsumables_Stddev_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "MediasOnConsumables" */
export type MediasOnConsumables_Stddev_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "MediasOnConsumables" */
export type MediasOnConsumables_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: MediasOnConsumables_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type MediasOnConsumables_Stream_Cursor_Value_Input = {
  consumableAddress?: InputMaybe<Scalars['String']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  mediaId?: InputMaybe<Scalars['uuid']['input']>;
};

/** order by sum() on columns of table "MediasOnConsumables" */
export type MediasOnConsumables_Sum_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "MediasOnConsumables" */
export type MediasOnConsumables_Var_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "MediasOnConsumables" */
export type MediasOnConsumables_Var_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "MediasOnConsumables" */
export type MediasOnConsumables_Variance_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** columns and relationships of "MintPassGroup" */
export type MintPassGroup = {
  __typename?: 'MintPassGroup';
  address: Scalars['String']['output'];
  /** An object relationship */
  event: Event;
  eventId: Scalars['String']['output'];
  label: Scalars['String']['output'];
  maxMints?: Maybe<Scalars['Int']['output']>;
  maxMintsPerProject?: Maybe<Scalars['Int']['output']>;
  supportsLiveTokenGeneration: Scalars['Boolean']['output'];
};

/** order by aggregate values of table "MintPassGroup" */
export type MintPassGroup_Aggregate_Order_By = {
  avg?: InputMaybe<MintPassGroup_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<MintPassGroup_Max_Order_By>;
  min?: InputMaybe<MintPassGroup_Min_Order_By>;
  stddev?: InputMaybe<MintPassGroup_Stddev_Order_By>;
  stddev_pop?: InputMaybe<MintPassGroup_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<MintPassGroup_Stddev_Samp_Order_By>;
  sum?: InputMaybe<MintPassGroup_Sum_Order_By>;
  var_pop?: InputMaybe<MintPassGroup_Var_Pop_Order_By>;
  var_samp?: InputMaybe<MintPassGroup_Var_Samp_Order_By>;
  variance?: InputMaybe<MintPassGroup_Variance_Order_By>;
};

/** order by avg() on columns of table "MintPassGroup" */
export type MintPassGroup_Avg_Order_By = {
  maxMints?: InputMaybe<Order_By>;
  maxMintsPerProject?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "MintPassGroup". All fields are combined with a logical 'AND'. */
export type MintPassGroup_Bool_Exp = {
  _and?: InputMaybe<Array<MintPassGroup_Bool_Exp>>;
  _not?: InputMaybe<MintPassGroup_Bool_Exp>;
  _or?: InputMaybe<Array<MintPassGroup_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  event?: InputMaybe<Event_Bool_Exp>;
  eventId?: InputMaybe<String_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
  maxMints?: InputMaybe<Int_Comparison_Exp>;
  maxMintsPerProject?: InputMaybe<Int_Comparison_Exp>;
  supportsLiveTokenGeneration?: InputMaybe<Boolean_Comparison_Exp>;
};

/** order by max() on columns of table "MintPassGroup" */
export type MintPassGroup_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  eventId?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  maxMints?: InputMaybe<Order_By>;
  maxMintsPerProject?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "MintPassGroup" */
export type MintPassGroup_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  eventId?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  maxMints?: InputMaybe<Order_By>;
  maxMintsPerProject?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "MintPassGroup". */
export type MintPassGroup_Order_By = {
  address?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  eventId?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  maxMints?: InputMaybe<Order_By>;
  maxMintsPerProject?: InputMaybe<Order_By>;
  supportsLiveTokenGeneration?: InputMaybe<Order_By>;
};

/** select columns of table "MintPassGroup" */
export enum MintPassGroup_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  EventId = 'eventId',
  /** column name */
  Label = 'label',
  /** column name */
  MaxMints = 'maxMints',
  /** column name */
  MaxMintsPerProject = 'maxMintsPerProject',
  /** column name */
  SupportsLiveTokenGeneration = 'supportsLiveTokenGeneration'
}

/** order by stddev() on columns of table "MintPassGroup" */
export type MintPassGroup_Stddev_Order_By = {
  maxMints?: InputMaybe<Order_By>;
  maxMintsPerProject?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "MintPassGroup" */
export type MintPassGroup_Stddev_Pop_Order_By = {
  maxMints?: InputMaybe<Order_By>;
  maxMintsPerProject?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "MintPassGroup" */
export type MintPassGroup_Stddev_Samp_Order_By = {
  maxMints?: InputMaybe<Order_By>;
  maxMintsPerProject?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "MintPassGroup" */
export type MintPassGroup_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: MintPassGroup_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type MintPassGroup_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  maxMints?: InputMaybe<Scalars['Int']['input']>;
  maxMintsPerProject?: InputMaybe<Scalars['Int']['input']>;
  supportsLiveTokenGeneration?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by sum() on columns of table "MintPassGroup" */
export type MintPassGroup_Sum_Order_By = {
  maxMints?: InputMaybe<Order_By>;
  maxMintsPerProject?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "MintPassGroup" */
export type MintPassGroup_Var_Pop_Order_By = {
  maxMints?: InputMaybe<Order_By>;
  maxMintsPerProject?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "MintPassGroup" */
export type MintPassGroup_Var_Samp_Order_By = {
  maxMints?: InputMaybe<Order_By>;
  maxMintsPerProject?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "MintPassGroup" */
export type MintPassGroup_Variance_Order_By = {
  maxMints?: InputMaybe<Order_By>;
  maxMintsPerProject?: InputMaybe<Order_By>;
};

/** columns and relationships of "OnboardingComponent" */
export type OnboardingComponent = {
  __typename?: 'OnboardingComponent';
  content: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "OnboardingComponent". All fields are combined with a logical 'AND'. */
export type OnboardingComponent_Bool_Exp = {
  _and?: InputMaybe<Array<OnboardingComponent_Bool_Exp>>;
  _not?: InputMaybe<OnboardingComponent_Bool_Exp>;
  _or?: InputMaybe<Array<OnboardingComponent_Bool_Exp>>;
  content?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "OnboardingComponent". */
export type OnboardingComponent_Order_By = {
  content?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "OnboardingComponent" */
export enum OnboardingComponent_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "OnboardingComponent" */
export type OnboardingComponent_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: OnboardingComponent_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type OnboardingComponent_Stream_Cursor_Value_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type PrepareRedemptionInput = {
  payload: Scalars['String']['input'];
  publicKey: Scalars['String']['input'];
  redeemableAddress: Scalars['String']['input'];
  signature: Scalars['String']['input'];
  tokenId: Scalars['Int']['input'];
};

export type PrepareRedemptionOutput = {
  __typename?: 'PrepareRedemptionOutput';
  payload: PrepareRedemptionPayload;
  signature: Scalars['String']['output'];
};

export type PrepareRedemptionPayload = {
  __typename?: 'PrepareRedemptionPayload';
  consumer: Scalars['String']['output'];
  options: Scalars['jsonb']['output'];
  salt: Scalars['String']['output'];
  token_id: Scalars['Int']['output'];
};

/** columns and relationships of "Profile" */
export type Profile = {
  __typename?: 'Profile';
  accountId: Scalars['uuid']['output'];
  description?: Maybe<Scalars['String']['output']>;
  farcaster?: Maybe<Scalars['String']['output']>;
  instagram?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

/** Boolean expression to filter rows from the table "Profile". All fields are combined with a logical 'AND'. */
export type Profile_Bool_Exp = {
  _and?: InputMaybe<Array<Profile_Bool_Exp>>;
  _not?: InputMaybe<Profile_Bool_Exp>;
  _or?: InputMaybe<Array<Profile_Bool_Exp>>;
  accountId?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  farcaster?: InputMaybe<String_Comparison_Exp>;
  instagram?: InputMaybe<String_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  picture?: InputMaybe<String_Comparison_Exp>;
  twitter?: InputMaybe<String_Comparison_Exp>;
  website?: InputMaybe<String_Comparison_Exp>;
};

/** response of any mutation on the table "Profile" */
export type Profile_Mutation_Response = {
  __typename?: 'Profile_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Profile>;
};

/** Ordering options when selecting data from "Profile". */
export type Profile_Order_By = {
  accountId?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  farcaster?: InputMaybe<Order_By>;
  instagram?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  picture?: InputMaybe<Order_By>;
  twitter?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Profile */
export type Profile_Pk_Columns_Input = {
  accountId: Scalars['uuid']['input'];
};

/** select columns of table "Profile" */
export enum Profile_Select_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  Description = 'description',
  /** column name */
  Farcaster = 'farcaster',
  /** column name */
  Instagram = 'instagram',
  /** column name */
  Location = 'location',
  /** column name */
  Picture = 'picture',
  /** column name */
  Twitter = 'twitter',
  /** column name */
  Website = 'website'
}

/** input type for updating data in table "Profile" */
export type Profile_Set_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "Profile" */
export type Profile_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Profile_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Profile_Stream_Cursor_Value_Input = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  farcaster?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type Profile_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Profile_Set_Input>;
  /** filter the rows which have to be updated */
  where: Profile_Bool_Exp;
};

/** columns and relationships of "Project" */
export type Project = {
  __typename?: 'Project';
  /** An object relationship */
  author: Account;
  authorId: Scalars['uuid']['output'];
  blockchain?: Maybe<Scalars['BlockchainNetwork']['output']>;
  /** An array relationship */
  collaborators: Array<ProjectCollaborator>;
  /** An object relationship */
  curator?: Maybe<Account>;
  curatorId?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  pricing?: Maybe<Scalars['jsonb']['output']>;
  /** An array relationship */
  projectMedias: Array<ProjectMedia>;
  releaseAt?: Maybe<Scalars['timestamptz']['output']>;
  state: Scalars['ProjectState']['output'];
  storage?: Maybe<Scalars['Storage']['output']>;
  title: Scalars['String']['output'];
  tokenId?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "Project" */
export type ProjectCollaboratorsArgs = {
  distinct_on?: InputMaybe<Array<ProjectCollaborator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ProjectCollaborator_Order_By>>;
  where?: InputMaybe<ProjectCollaborator_Bool_Exp>;
};


/** columns and relationships of "Project" */
export type ProjectPricingArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "Project" */
export type ProjectProjectMediasArgs = {
  distinct_on?: InputMaybe<Array<ProjectMedia_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ProjectMedia_Order_By>>;
  where?: InputMaybe<ProjectMedia_Bool_Exp>;
};

/** columns and relationships of "ProjectCollaborator" */
export type ProjectCollaborator = {
  __typename?: 'ProjectCollaborator';
  /** An object relationship */
  account: Account;
  collaboratorId: Scalars['uuid']['output'];
  /** An object relationship */
  project: Project;
  projectId: Scalars['uuid']['output'];
};

/** order by aggregate values of table "ProjectCollaborator" */
export type ProjectCollaborator_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ProjectCollaborator_Max_Order_By>;
  min?: InputMaybe<ProjectCollaborator_Min_Order_By>;
};

/** input type for inserting array relation for remote table "ProjectCollaborator" */
export type ProjectCollaborator_Arr_Rel_Insert_Input = {
  data: Array<ProjectCollaborator_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ProjectCollaborator_On_Conflict>;
};

/** Boolean expression to filter rows from the table "ProjectCollaborator". All fields are combined with a logical 'AND'. */
export type ProjectCollaborator_Bool_Exp = {
  _and?: InputMaybe<Array<ProjectCollaborator_Bool_Exp>>;
  _not?: InputMaybe<ProjectCollaborator_Bool_Exp>;
  _or?: InputMaybe<Array<ProjectCollaborator_Bool_Exp>>;
  account?: InputMaybe<Account_Bool_Exp>;
  collaboratorId?: InputMaybe<Uuid_Comparison_Exp>;
  project?: InputMaybe<Project_Bool_Exp>;
  projectId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "ProjectCollaborator" */
export enum ProjectCollaborator_Constraint {
  /** unique or primary key constraint on columns "projectId", "collaboratorId" */
  ProjectCollaboratorProjectIdCollaboratorIdKey = 'ProjectCollaborator_projectId_collaboratorId_key'
}

/** input type for inserting data into table "ProjectCollaborator" */
export type ProjectCollaborator_Insert_Input = {
  collaboratorId?: InputMaybe<Scalars['uuid']['input']>;
  project?: InputMaybe<Project_Obj_Rel_Insert_Input>;
  projectId?: InputMaybe<Scalars['uuid']['input']>;
};

/** order by max() on columns of table "ProjectCollaborator" */
export type ProjectCollaborator_Max_Order_By = {
  collaboratorId?: InputMaybe<Order_By>;
  projectId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "ProjectCollaborator" */
export type ProjectCollaborator_Min_Order_By = {
  collaboratorId?: InputMaybe<Order_By>;
  projectId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ProjectCollaborator" */
export type ProjectCollaborator_Mutation_Response = {
  __typename?: 'ProjectCollaborator_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ProjectCollaborator>;
};

/** on_conflict condition type for table "ProjectCollaborator" */
export type ProjectCollaborator_On_Conflict = {
  constraint: ProjectCollaborator_Constraint;
  update_columns?: Array<ProjectCollaborator_Update_Column>;
  where?: InputMaybe<ProjectCollaborator_Bool_Exp>;
};

/** Ordering options when selecting data from "ProjectCollaborator". */
export type ProjectCollaborator_Order_By = {
  account?: InputMaybe<Account_Order_By>;
  collaboratorId?: InputMaybe<Order_By>;
  project?: InputMaybe<Project_Order_By>;
  projectId?: InputMaybe<Order_By>;
};

/** select columns of table "ProjectCollaborator" */
export enum ProjectCollaborator_Select_Column {
  /** column name */
  CollaboratorId = 'collaboratorId',
  /** column name */
  ProjectId = 'projectId'
}

/** Streaming cursor of the table "ProjectCollaborator" */
export type ProjectCollaborator_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ProjectCollaborator_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ProjectCollaborator_Stream_Cursor_Value_Input = {
  collaboratorId?: InputMaybe<Scalars['uuid']['input']>;
  projectId?: InputMaybe<Scalars['uuid']['input']>;
};

/** placeholder for update columns of table "ProjectCollaborator" (current role has no relevant permissions) */
export enum ProjectCollaborator_Update_Column {
  /** placeholder (do not use) */
  Placeholder = '_PLACEHOLDER'
}

/** columns and relationships of "ProjectMedia" */
export type ProjectMedia = {
  __typename?: 'ProjectMedia';
  index: Scalars['smallint']['output'];
  /** An object relationship */
  media: Media;
  mediaId: Scalars['uuid']['output'];
  /** An object relationship */
  project: Project;
  projectId: Scalars['uuid']['output'];
};

/** order by aggregate values of table "ProjectMedia" */
export type ProjectMedia_Aggregate_Order_By = {
  avg?: InputMaybe<ProjectMedia_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ProjectMedia_Max_Order_By>;
  min?: InputMaybe<ProjectMedia_Min_Order_By>;
  stddev?: InputMaybe<ProjectMedia_Stddev_Order_By>;
  stddev_pop?: InputMaybe<ProjectMedia_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<ProjectMedia_Stddev_Samp_Order_By>;
  sum?: InputMaybe<ProjectMedia_Sum_Order_By>;
  var_pop?: InputMaybe<ProjectMedia_Var_Pop_Order_By>;
  var_samp?: InputMaybe<ProjectMedia_Var_Samp_Order_By>;
  variance?: InputMaybe<ProjectMedia_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "ProjectMedia" */
export type ProjectMedia_Arr_Rel_Insert_Input = {
  data: Array<ProjectMedia_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ProjectMedia_On_Conflict>;
};

/** order by avg() on columns of table "ProjectMedia" */
export type ProjectMedia_Avg_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "ProjectMedia". All fields are combined with a logical 'AND'. */
export type ProjectMedia_Bool_Exp = {
  _and?: InputMaybe<Array<ProjectMedia_Bool_Exp>>;
  _not?: InputMaybe<ProjectMedia_Bool_Exp>;
  _or?: InputMaybe<Array<ProjectMedia_Bool_Exp>>;
  index?: InputMaybe<Smallint_Comparison_Exp>;
  media?: InputMaybe<Media_Bool_Exp>;
  mediaId?: InputMaybe<Uuid_Comparison_Exp>;
  project?: InputMaybe<Project_Bool_Exp>;
  projectId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "ProjectMedia" */
export enum ProjectMedia_Constraint {
  /** unique or primary key constraint on columns "mediaId", "index", "projectId" */
  ProjectMediaIndexProjectIdMediaIdKey = 'ProjectMedia_index_projectId_mediaId_key'
}

/** input type for incrementing numeric columns in table "ProjectMedia" */
export type ProjectMedia_Inc_Input = {
  index?: InputMaybe<Scalars['smallint']['input']>;
};

/** input type for inserting data into table "ProjectMedia" */
export type ProjectMedia_Insert_Input = {
  index?: InputMaybe<Scalars['smallint']['input']>;
  mediaId?: InputMaybe<Scalars['uuid']['input']>;
  project?: InputMaybe<Project_Obj_Rel_Insert_Input>;
  projectId?: InputMaybe<Scalars['uuid']['input']>;
};

/** order by max() on columns of table "ProjectMedia" */
export type ProjectMedia_Max_Order_By = {
  index?: InputMaybe<Order_By>;
  mediaId?: InputMaybe<Order_By>;
  projectId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "ProjectMedia" */
export type ProjectMedia_Min_Order_By = {
  index?: InputMaybe<Order_By>;
  mediaId?: InputMaybe<Order_By>;
  projectId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ProjectMedia" */
export type ProjectMedia_Mutation_Response = {
  __typename?: 'ProjectMedia_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ProjectMedia>;
};

/** on_conflict condition type for table "ProjectMedia" */
export type ProjectMedia_On_Conflict = {
  constraint: ProjectMedia_Constraint;
  update_columns?: Array<ProjectMedia_Update_Column>;
  where?: InputMaybe<ProjectMedia_Bool_Exp>;
};

/** Ordering options when selecting data from "ProjectMedia". */
export type ProjectMedia_Order_By = {
  index?: InputMaybe<Order_By>;
  media?: InputMaybe<Media_Order_By>;
  mediaId?: InputMaybe<Order_By>;
  project?: InputMaybe<Project_Order_By>;
  projectId?: InputMaybe<Order_By>;
};

/** select columns of table "ProjectMedia" */
export enum ProjectMedia_Select_Column {
  /** column name */
  Index = 'index',
  /** column name */
  MediaId = 'mediaId',
  /** column name */
  ProjectId = 'projectId'
}

/** input type for updating data in table "ProjectMedia" */
export type ProjectMedia_Set_Input = {
  index?: InputMaybe<Scalars['smallint']['input']>;
  mediaId?: InputMaybe<Scalars['uuid']['input']>;
  projectId?: InputMaybe<Scalars['uuid']['input']>;
};

/** order by stddev() on columns of table "ProjectMedia" */
export type ProjectMedia_Stddev_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "ProjectMedia" */
export type ProjectMedia_Stddev_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "ProjectMedia" */
export type ProjectMedia_Stddev_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "ProjectMedia" */
export type ProjectMedia_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ProjectMedia_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ProjectMedia_Stream_Cursor_Value_Input = {
  index?: InputMaybe<Scalars['smallint']['input']>;
  mediaId?: InputMaybe<Scalars['uuid']['input']>;
  projectId?: InputMaybe<Scalars['uuid']['input']>;
};

/** order by sum() on columns of table "ProjectMedia" */
export type ProjectMedia_Sum_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** update columns of table "ProjectMedia" */
export enum ProjectMedia_Update_Column {
  /** column name */
  Index = 'index',
  /** column name */
  MediaId = 'mediaId',
  /** column name */
  ProjectId = 'projectId'
}

export type ProjectMedia_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<ProjectMedia_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ProjectMedia_Set_Input>;
  /** filter the rows which have to be updated */
  where: ProjectMedia_Bool_Exp;
};

/** order by var_pop() on columns of table "ProjectMedia" */
export type ProjectMedia_Var_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "ProjectMedia" */
export type ProjectMedia_Var_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "ProjectMedia" */
export type ProjectMedia_Variance_Order_By = {
  index?: InputMaybe<Order_By>;
};

export type ProjectReserves = {
  __typename?: 'ProjectReserves';
  amount: Scalars['Int']['output'];
  data: Scalars['JSON']['output'];
  id: Scalars['String']['output'];
  merkle_root?: Maybe<Scalars['String']['output']>;
  method: Scalars['Int']['output'];
};

/** Boolean expression to compare columns of type "ProjectState". All fields are combined with logical 'AND'. */
export type ProjectState_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['ProjectState']['input']>;
  _gt?: InputMaybe<Scalars['ProjectState']['input']>;
  _gte?: InputMaybe<Scalars['ProjectState']['input']>;
  _in?: InputMaybe<Array<Scalars['ProjectState']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['ProjectState']['input']>;
  _lte?: InputMaybe<Scalars['ProjectState']['input']>;
  _neq?: InputMaybe<Scalars['ProjectState']['input']>;
  _nin?: InputMaybe<Array<Scalars['ProjectState']['input']>>;
};

/** order by aggregate values of table "Project" */
export type Project_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Project_Max_Order_By>;
  min?: InputMaybe<Project_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Project_Append_Input = {
  pricing?: InputMaybe<Scalars['jsonb']['input']>;
};

/** Boolean expression to filter rows from the table "Project". All fields are combined with a logical 'AND'. */
export type Project_Bool_Exp = {
  _and?: InputMaybe<Array<Project_Bool_Exp>>;
  _not?: InputMaybe<Project_Bool_Exp>;
  _or?: InputMaybe<Array<Project_Bool_Exp>>;
  author?: InputMaybe<Account_Bool_Exp>;
  authorId?: InputMaybe<Uuid_Comparison_Exp>;
  blockchain?: InputMaybe<BlockchainNetwork_Comparison_Exp>;
  collaborators?: InputMaybe<ProjectCollaborator_Bool_Exp>;
  curator?: InputMaybe<Account_Bool_Exp>;
  curatorId?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  pricing?: InputMaybe<Jsonb_Comparison_Exp>;
  projectMedias?: InputMaybe<ProjectMedia_Bool_Exp>;
  releaseAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  state?: InputMaybe<ProjectState_Comparison_Exp>;
  storage?: InputMaybe<Storage_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  tokenId?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "Project" */
export enum Project_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProjectPkey = 'Project_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Project_Delete_At_Path_Input = {
  pricing?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Project_Delete_Elem_Input = {
  pricing?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Project_Delete_Key_Input = {
  pricing?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "Project" */
export type Project_Insert_Input = {
  blockchain?: InputMaybe<Scalars['BlockchainNetwork']['input']>;
  collaborators?: InputMaybe<ProjectCollaborator_Arr_Rel_Insert_Input>;
  curatorId?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  pricing?: InputMaybe<Scalars['jsonb']['input']>;
  projectMedias?: InputMaybe<ProjectMedia_Arr_Rel_Insert_Input>;
  releaseAt?: InputMaybe<Scalars['timestamptz']['input']>;
  storage?: InputMaybe<Scalars['Storage']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** order by max() on columns of table "Project" */
export type Project_Max_Order_By = {
  authorId?: InputMaybe<Order_By>;
  blockchain?: InputMaybe<Order_By>;
  curatorId?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  releaseAt?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  storage?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "Project" */
export type Project_Min_Order_By = {
  authorId?: InputMaybe<Order_By>;
  blockchain?: InputMaybe<Order_By>;
  curatorId?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  releaseAt?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  storage?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Project" */
export type Project_Mutation_Response = {
  __typename?: 'Project_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Project>;
};

/** input type for inserting object relation for remote table "Project" */
export type Project_Obj_Rel_Insert_Input = {
  data: Project_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Project_On_Conflict>;
};

/** on_conflict condition type for table "Project" */
export type Project_On_Conflict = {
  constraint: Project_Constraint;
  update_columns?: Array<Project_Update_Column>;
  where?: InputMaybe<Project_Bool_Exp>;
};

/** Ordering options when selecting data from "Project". */
export type Project_Order_By = {
  author?: InputMaybe<Account_Order_By>;
  authorId?: InputMaybe<Order_By>;
  blockchain?: InputMaybe<Order_By>;
  collaborators_aggregate?: InputMaybe<ProjectCollaborator_Aggregate_Order_By>;
  curator?: InputMaybe<Account_Order_By>;
  curatorId?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pricing?: InputMaybe<Order_By>;
  projectMedias_aggregate?: InputMaybe<ProjectMedia_Aggregate_Order_By>;
  releaseAt?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  storage?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Project */
export type Project_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Project_Prepend_Input = {
  pricing?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "Project" */
export enum Project_Select_Column {
  /** column name */
  AuthorId = 'authorId',
  /** column name */
  Blockchain = 'blockchain',
  /** column name */
  CuratorId = 'curatorId',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Pricing = 'pricing',
  /** column name */
  ReleaseAt = 'releaseAt',
  /** column name */
  State = 'state',
  /** column name */
  Storage = 'storage',
  /** column name */
  Title = 'title',
  /** column name */
  TokenId = 'tokenId'
}

/** input type for updating data in table "Project" */
export type Project_Set_Input = {
  blockchain?: InputMaybe<Scalars['BlockchainNetwork']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  pricing?: InputMaybe<Scalars['jsonb']['input']>;
  releaseAt?: InputMaybe<Scalars['timestamptz']['input']>;
  storage?: InputMaybe<Scalars['Storage']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "Project" */
export type Project_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Project_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Project_Stream_Cursor_Value_Input = {
  authorId?: InputMaybe<Scalars['uuid']['input']>;
  blockchain?: InputMaybe<Scalars['BlockchainNetwork']['input']>;
  curatorId?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  pricing?: InputMaybe<Scalars['jsonb']['input']>;
  releaseAt?: InputMaybe<Scalars['timestamptz']['input']>;
  state?: InputMaybe<Scalars['ProjectState']['input']>;
  storage?: InputMaybe<Scalars['Storage']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  tokenId?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "Project" */
export enum Project_Update_Column {
  /** column name */
  Blockchain = 'blockchain',
  /** column name */
  Description = 'description',
  /** column name */
  Pricing = 'pricing',
  /** column name */
  ReleaseAt = 'releaseAt',
  /** column name */
  Storage = 'storage',
  /** column name */
  Title = 'title'
}

export type Project_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Project_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Project_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Project_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Project_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Project_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Project_Set_Input>;
  /** filter the rows which have to be updated */
  where: Project_Bool_Exp;
};

export type RefreshInput = {
  refreshToken: Scalars['String']['input'];
};

export type RequestMintInput = {
  createTicket?: InputMaybe<Scalars['Boolean']['input']>;
  eventId: Scalars['String']['input'];
  inputBytes?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['Int']['input'];
  recipient: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type RequestMintResult = {
  __typename?: 'RequestMintResult';
  hash: Scalars['String']['output'];
};

export type RequestTransferWalletInput = {
  address: Scalars['String']['input'];
};

export type RequestTransferWalletOutput = {
  __typename?: 'RequestTransferWalletOutput';
  id: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

/** columns and relationships of "Retrospective" */
export type Retrospective = {
  __typename?: 'Retrospective';
  bestCollectors?: Maybe<Scalars['String']['output']>;
  bestProjectCreated?: Maybe<Scalars['String']['output']>;
  biggestSaleAsArtist?: Maybe<Scalars['String']['output']>;
  earnedPrimary: Scalars['String']['output'];
  earnedRoyalties: Scalars['String']['output'];
  earnedSecondary: Scalars['String']['output'];
  earnedTotalNb: Scalars['Int']['output'];
  earnedTotalUsd: Scalars['numeric']['output'];
  monthsActive: Scalars['Int']['output'];
  mostArtistsCollected: Scalars['String']['output'];
  mostProjectCollected?: Maybe<Scalars['String']['output']>;
  nbArtistsCollected: Scalars['Int']['output'];
  nbCollectors: Scalars['Int']['output'];
  nbIterationsMinted: Scalars['Int']['output'];
  nbProjectsCreated: Scalars['Int']['output'];
  spentPrimary: Scalars['String']['output'];
  spentSecondary: Scalars['String']['output'];
  spentTotalNb: Scalars['Int']['output'];
  spentTotalUsd: Scalars['numeric']['output'];
  tokenAllocation: Scalars['numeric']['output'];
  tokenAllocationString?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  wallet?: Maybe<Wallet>;
  walletAddress: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "Retrospective". All fields are combined with a logical 'AND'. */
export type Retrospective_Bool_Exp = {
  _and?: InputMaybe<Array<Retrospective_Bool_Exp>>;
  _not?: InputMaybe<Retrospective_Bool_Exp>;
  _or?: InputMaybe<Array<Retrospective_Bool_Exp>>;
  bestCollectors?: InputMaybe<String_Comparison_Exp>;
  bestProjectCreated?: InputMaybe<String_Comparison_Exp>;
  biggestSaleAsArtist?: InputMaybe<String_Comparison_Exp>;
  earnedPrimary?: InputMaybe<String_Comparison_Exp>;
  earnedRoyalties?: InputMaybe<String_Comparison_Exp>;
  earnedSecondary?: InputMaybe<String_Comparison_Exp>;
  earnedTotalNb?: InputMaybe<Int_Comparison_Exp>;
  earnedTotalUsd?: InputMaybe<Numeric_Comparison_Exp>;
  monthsActive?: InputMaybe<Int_Comparison_Exp>;
  mostArtistsCollected?: InputMaybe<String_Comparison_Exp>;
  mostProjectCollected?: InputMaybe<String_Comparison_Exp>;
  nbArtistsCollected?: InputMaybe<Int_Comparison_Exp>;
  nbCollectors?: InputMaybe<Int_Comparison_Exp>;
  nbIterationsMinted?: InputMaybe<Int_Comparison_Exp>;
  nbProjectsCreated?: InputMaybe<Int_Comparison_Exp>;
  spentPrimary?: InputMaybe<String_Comparison_Exp>;
  spentSecondary?: InputMaybe<String_Comparison_Exp>;
  spentTotalNb?: InputMaybe<Int_Comparison_Exp>;
  spentTotalUsd?: InputMaybe<Numeric_Comparison_Exp>;
  tokenAllocation?: InputMaybe<Numeric_Comparison_Exp>;
  tokenAllocationString?: InputMaybe<String_Comparison_Exp>;
  wallet?: InputMaybe<Wallet_Bool_Exp>;
  walletAddress?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Retrospective". */
export type Retrospective_Order_By = {
  bestCollectors?: InputMaybe<Order_By>;
  bestProjectCreated?: InputMaybe<Order_By>;
  biggestSaleAsArtist?: InputMaybe<Order_By>;
  earnedPrimary?: InputMaybe<Order_By>;
  earnedRoyalties?: InputMaybe<Order_By>;
  earnedSecondary?: InputMaybe<Order_By>;
  earnedTotalNb?: InputMaybe<Order_By>;
  earnedTotalUsd?: InputMaybe<Order_By>;
  monthsActive?: InputMaybe<Order_By>;
  mostArtistsCollected?: InputMaybe<Order_By>;
  mostProjectCollected?: InputMaybe<Order_By>;
  nbArtistsCollected?: InputMaybe<Order_By>;
  nbCollectors?: InputMaybe<Order_By>;
  nbIterationsMinted?: InputMaybe<Order_By>;
  nbProjectsCreated?: InputMaybe<Order_By>;
  spentPrimary?: InputMaybe<Order_By>;
  spentSecondary?: InputMaybe<Order_By>;
  spentTotalNb?: InputMaybe<Order_By>;
  spentTotalUsd?: InputMaybe<Order_By>;
  tokenAllocation?: InputMaybe<Order_By>;
  tokenAllocationString?: InputMaybe<Order_By>;
  wallet?: InputMaybe<Wallet_Order_By>;
  walletAddress?: InputMaybe<Order_By>;
};

/** select columns of table "Retrospective" */
export enum Retrospective_Select_Column {
  /** column name */
  BestCollectors = 'bestCollectors',
  /** column name */
  BestProjectCreated = 'bestProjectCreated',
  /** column name */
  BiggestSaleAsArtist = 'biggestSaleAsArtist',
  /** column name */
  EarnedPrimary = 'earnedPrimary',
  /** column name */
  EarnedRoyalties = 'earnedRoyalties',
  /** column name */
  EarnedSecondary = 'earnedSecondary',
  /** column name */
  EarnedTotalNb = 'earnedTotalNb',
  /** column name */
  EarnedTotalUsd = 'earnedTotalUsd',
  /** column name */
  MonthsActive = 'monthsActive',
  /** column name */
  MostArtistsCollected = 'mostArtistsCollected',
  /** column name */
  MostProjectCollected = 'mostProjectCollected',
  /** column name */
  NbArtistsCollected = 'nbArtistsCollected',
  /** column name */
  NbCollectors = 'nbCollectors',
  /** column name */
  NbIterationsMinted = 'nbIterationsMinted',
  /** column name */
  NbProjectsCreated = 'nbProjectsCreated',
  /** column name */
  SpentPrimary = 'spentPrimary',
  /** column name */
  SpentSecondary = 'spentSecondary',
  /** column name */
  SpentTotalNb = 'spentTotalNb',
  /** column name */
  SpentTotalUsd = 'spentTotalUsd',
  /** column name */
  TokenAllocation = 'tokenAllocation',
  /** column name */
  TokenAllocationString = 'tokenAllocationString',
  /** column name */
  WalletAddress = 'walletAddress'
}

/** Streaming cursor of the table "Retrospective" */
export type Retrospective_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Retrospective_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Retrospective_Stream_Cursor_Value_Input = {
  bestCollectors?: InputMaybe<Scalars['String']['input']>;
  bestProjectCreated?: InputMaybe<Scalars['String']['input']>;
  biggestSaleAsArtist?: InputMaybe<Scalars['String']['input']>;
  earnedPrimary?: InputMaybe<Scalars['String']['input']>;
  earnedRoyalties?: InputMaybe<Scalars['String']['input']>;
  earnedSecondary?: InputMaybe<Scalars['String']['input']>;
  earnedTotalNb?: InputMaybe<Scalars['Int']['input']>;
  earnedTotalUsd?: InputMaybe<Scalars['numeric']['input']>;
  monthsActive?: InputMaybe<Scalars['Int']['input']>;
  mostArtistsCollected?: InputMaybe<Scalars['String']['input']>;
  mostProjectCollected?: InputMaybe<Scalars['String']['input']>;
  nbArtistsCollected?: InputMaybe<Scalars['Int']['input']>;
  nbCollectors?: InputMaybe<Scalars['Int']['input']>;
  nbIterationsMinted?: InputMaybe<Scalars['Int']['input']>;
  nbProjectsCreated?: InputMaybe<Scalars['Int']['input']>;
  spentPrimary?: InputMaybe<Scalars['String']['input']>;
  spentSecondary?: InputMaybe<Scalars['String']['input']>;
  spentTotalNb?: InputMaybe<Scalars['Int']['input']>;
  spentTotalUsd?: InputMaybe<Scalars['numeric']['input']>;
  tokenAllocation?: InputMaybe<Scalars['numeric']['input']>;
  tokenAllocationString?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

export type SearchAccountsOutput = {
  __typename?: 'SearchAccountsOutput';
  accounts: SearchEntityResult;
};

export type SearchEntity = {
  __typename?: 'SearchEntity';
  account?: Maybe<SearchEntityAccount>;
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  media?: Maybe<Scalars['String']['output']>;
  placeholder?: Maybe<Scalars['String']['output']>;
  score: Scalars['Int']['output'];
  slug?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type SearchEntityAccount = {
  __typename?: 'SearchEntityAccount';
  media?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type SearchEntityResult = {
  __typename?: 'SearchEntityResult';
  hits: Array<SearchEntity>;
  nbHits: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

export type SearchInput = {
  hitsPerPage?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type SearchOutput = {
  __typename?: 'SearchOutput';
  accounts: SearchEntityResult;
  articles: SearchEntityResult;
  projects: SearchEntityResult;
};

export type SetFarcasterHandleInput = {
  id: Scalars['String']['input'];
  message: Scalars['String']['input'];
  signature: Scalars['String']['input'];
};

export type SetFarcasterHandleResult = {
  __typename?: 'SetFarcasterHandleResult';
  handle: Scalars['String']['output'];
};

export type SetWhitelistOutput = {
  __typename?: 'SetWhitelistOutput';
  merkleRoot?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** Boolean expression to compare columns of type "Storage". All fields are combined with logical 'AND'. */
export type Storage_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Storage']['input']>;
  _gt?: InputMaybe<Scalars['Storage']['input']>;
  _gte?: InputMaybe<Scalars['Storage']['input']>;
  _in?: InputMaybe<Array<Scalars['Storage']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Storage']['input']>;
  _lte?: InputMaybe<Scalars['Storage']['input']>;
  _neq?: InputMaybe<Scalars['Storage']['input']>;
  _nin?: InputMaybe<Array<Scalars['Storage']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['String']['input']>>;
  _eq?: InputMaybe<Array<Scalars['String']['input']>>;
  _gt?: InputMaybe<Array<Scalars['String']['input']>>;
  _gte?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['String']['input']>>;
  _lte?: InputMaybe<Array<Scalars['String']['input']>>;
  _neq?: InputMaybe<Array<Scalars['String']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

export type TransferWalletInput = {
  id: Scalars['String']['input'];
  signature: Scalars['String']['input'];
};

export type UnlinkWalletInput = {
  address: Scalars['String']['input'];
};

export type UpdateAccountInput = {
  profile?: InputMaybe<UpdateProfileInput>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAccountOutput = {
  __typename?: 'UpdateAccountOutput';
  id: Scalars['String']['output'];
  profile?: Maybe<UpdateProfileOutput>;
  username: Scalars['String']['output'];
};

export type UpdateProfileInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileOutput = {
  __typename?: 'UpdateProfileOutput';
  description?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

/** columns and relationships of "UserAccount" */
export type UserAccount = {
  __typename?: 'UserAccount';
  /** An object relationship */
  account?: Maybe<Account>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** Boolean expression to filter rows from the table "UserAccount". All fields are combined with a logical 'AND'. */
export type UserAccount_Bool_Exp = {
  _and?: InputMaybe<Array<UserAccount_Bool_Exp>>;
  _not?: InputMaybe<UserAccount_Bool_Exp>;
  _or?: InputMaybe<Array<UserAccount_Bool_Exp>>;
  account?: InputMaybe<Account_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** Ordering options when selecting data from "UserAccount". */
export type UserAccount_Order_By = {
  account?: InputMaybe<Account_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "UserAccount" */
export enum UserAccount_Select_Column {
  /** column name */
  UserId = 'user_id'
}

/** Streaming cursor of the table "UserAccount" */
export type UserAccount_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: UserAccount_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type UserAccount_Stream_Cursor_Value_Input = {
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "Wallet" */
export type Wallet = {
  __typename?: 'Wallet';
  /** An object relationship */
  account: Account;
  accountId: Scalars['uuid']['output'];
  address: Scalars['String']['output'];
  network: Scalars['BlockchainNetwork']['output'];
  /** An object relationship */
  retrospective?: Maybe<Retrospective>;
  walletUser: Array<User>;
};


/** columns and relationships of "Wallet" */
export type WalletWalletUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};

export type WalletRpc = {
  __typename?: 'WalletRpc';
  active: Scalars['Boolean']['output'];
  available: Scalars['Boolean']['output'];
  url: Scalars['String']['output'];
};

/** order by aggregate values of table "Wallet" */
export type Wallet_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Wallet_Max_Order_By>;
  min?: InputMaybe<Wallet_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "Wallet". All fields are combined with a logical 'AND'. */
export type Wallet_Bool_Exp = {
  _and?: InputMaybe<Array<Wallet_Bool_Exp>>;
  _not?: InputMaybe<Wallet_Bool_Exp>;
  _or?: InputMaybe<Array<Wallet_Bool_Exp>>;
  account?: InputMaybe<Account_Bool_Exp>;
  accountId?: InputMaybe<Uuid_Comparison_Exp>;
  address?: InputMaybe<String_Comparison_Exp>;
  network?: InputMaybe<BlockchainNetwork_Comparison_Exp>;
  retrospective?: InputMaybe<Retrospective_Bool_Exp>;
};

/** order by max() on columns of table "Wallet" */
export type Wallet_Max_Order_By = {
  accountId?: InputMaybe<Order_By>;
  address?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "Wallet" */
export type Wallet_Min_Order_By = {
  accountId?: InputMaybe<Order_By>;
  address?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "Wallet". */
export type Wallet_Order_By = {
  account?: InputMaybe<Account_Order_By>;
  accountId?: InputMaybe<Order_By>;
  address?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
  retrospective?: InputMaybe<Retrospective_Order_By>;
};

/** select columns of table "Wallet" */
export enum Wallet_Select_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  Address = 'address',
  /** column name */
  Network = 'network'
}

/** Streaming cursor of the table "Wallet" */
export type Wallet_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Wallet_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Wallet_Stream_Cursor_Value_Input = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  network?: InputMaybe<Scalars['BlockchainNetwork']['input']>;
};

export type Web3AuthEmailAuthOtpInput = {
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};

export type Web3AuthEmailAuthOtpOutput = {
  __typename?: 'Web3AuthEmailAuthOTPOutput';
  idToken: Scalars['String']['output'];
};

export type Web3AuthEmailRequestOtpOutput = {
  __typename?: 'Web3AuthEmailRequestOTPOutput';
  attemptsLeft: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  expires: Scalars['String']['output'];
};

export type Web3AuthOAuthInput = {
  provider: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Web3AuthOAuthOutput = {
  __typename?: 'Web3AuthOAuthOutput';
  idToken: Scalars['String']['output'];
};

/** columns and relationships of "Whitelist" */
export type Whitelist = {
  __typename?: 'Whitelist';
  /** An array relationship */
  entries: Array<WhitelistEntries>;
  merkleRoot: Scalars['String']['output'];
};


/** columns and relationships of "Whitelist" */
export type WhitelistEntriesArgs = {
  distinct_on?: InputMaybe<Array<WhitelistEntries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<WhitelistEntries_Order_By>>;
  where?: InputMaybe<WhitelistEntries_Bool_Exp>;
};

/** columns and relationships of "WhitelistEntries" */
export type WhitelistEntries = {
  __typename?: 'WhitelistEntries';
  merkleRoot: Scalars['String']['output'];
  walletAddress: Scalars['String']['output'];
  /** An object relationship */
  whitelist: Whitelist;
  whitelistIndex: Scalars['Int']['output'];
};

/** order by aggregate values of table "WhitelistEntries" */
export type WhitelistEntries_Aggregate_Order_By = {
  avg?: InputMaybe<WhitelistEntries_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<WhitelistEntries_Max_Order_By>;
  min?: InputMaybe<WhitelistEntries_Min_Order_By>;
  stddev?: InputMaybe<WhitelistEntries_Stddev_Order_By>;
  stddev_pop?: InputMaybe<WhitelistEntries_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<WhitelistEntries_Stddev_Samp_Order_By>;
  sum?: InputMaybe<WhitelistEntries_Sum_Order_By>;
  var_pop?: InputMaybe<WhitelistEntries_Var_Pop_Order_By>;
  var_samp?: InputMaybe<WhitelistEntries_Var_Samp_Order_By>;
  variance?: InputMaybe<WhitelistEntries_Variance_Order_By>;
};

/** order by avg() on columns of table "WhitelistEntries" */
export type WhitelistEntries_Avg_Order_By = {
  whitelistIndex?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "WhitelistEntries". All fields are combined with a logical 'AND'. */
export type WhitelistEntries_Bool_Exp = {
  _and?: InputMaybe<Array<WhitelistEntries_Bool_Exp>>;
  _not?: InputMaybe<WhitelistEntries_Bool_Exp>;
  _or?: InputMaybe<Array<WhitelistEntries_Bool_Exp>>;
  merkleRoot?: InputMaybe<String_Comparison_Exp>;
  walletAddress?: InputMaybe<String_Comparison_Exp>;
  whitelist?: InputMaybe<Whitelist_Bool_Exp>;
  whitelistIndex?: InputMaybe<Int_Comparison_Exp>;
};

/** order by max() on columns of table "WhitelistEntries" */
export type WhitelistEntries_Max_Order_By = {
  merkleRoot?: InputMaybe<Order_By>;
  walletAddress?: InputMaybe<Order_By>;
  whitelistIndex?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "WhitelistEntries" */
export type WhitelistEntries_Min_Order_By = {
  merkleRoot?: InputMaybe<Order_By>;
  walletAddress?: InputMaybe<Order_By>;
  whitelistIndex?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "WhitelistEntries". */
export type WhitelistEntries_Order_By = {
  merkleRoot?: InputMaybe<Order_By>;
  walletAddress?: InputMaybe<Order_By>;
  whitelist?: InputMaybe<Whitelist_Order_By>;
  whitelistIndex?: InputMaybe<Order_By>;
};

/** select columns of table "WhitelistEntries" */
export enum WhitelistEntries_Select_Column {
  /** column name */
  MerkleRoot = 'merkleRoot',
  /** column name */
  WalletAddress = 'walletAddress',
  /** column name */
  WhitelistIndex = 'whitelistIndex'
}

/** order by stddev() on columns of table "WhitelistEntries" */
export type WhitelistEntries_Stddev_Order_By = {
  whitelistIndex?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "WhitelistEntries" */
export type WhitelistEntries_Stddev_Pop_Order_By = {
  whitelistIndex?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "WhitelistEntries" */
export type WhitelistEntries_Stddev_Samp_Order_By = {
  whitelistIndex?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "WhitelistEntries" */
export type WhitelistEntries_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: WhitelistEntries_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type WhitelistEntries_Stream_Cursor_Value_Input = {
  merkleRoot?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
  whitelistIndex?: InputMaybe<Scalars['Int']['input']>;
};

/** order by sum() on columns of table "WhitelistEntries" */
export type WhitelistEntries_Sum_Order_By = {
  whitelistIndex?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "WhitelistEntries" */
export type WhitelistEntries_Var_Pop_Order_By = {
  whitelistIndex?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "WhitelistEntries" */
export type WhitelistEntries_Var_Samp_Order_By = {
  whitelistIndex?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "WhitelistEntries" */
export type WhitelistEntries_Variance_Order_By = {
  whitelistIndex?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Whitelist". All fields are combined with a logical 'AND'. */
export type Whitelist_Bool_Exp = {
  _and?: InputMaybe<Array<Whitelist_Bool_Exp>>;
  _not?: InputMaybe<Whitelist_Bool_Exp>;
  _or?: InputMaybe<Array<Whitelist_Bool_Exp>>;
  entries?: InputMaybe<WhitelistEntries_Bool_Exp>;
  merkleRoot?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Whitelist". */
export type Whitelist_Order_By = {
  entries_aggregate?: InputMaybe<WhitelistEntries_Aggregate_Order_By>;
  merkleRoot?: InputMaybe<Order_By>;
};

/** select columns of table "Whitelist" */
export enum Whitelist_Select_Column {
  /** column name */
  MerkleRoot = 'merkleRoot'
}

/** Streaming cursor of the table "Whitelist" */
export type Whitelist_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Whitelist_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Whitelist_Stream_Cursor_Value_Input = {
  merkleRoot?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "action" */
export type Action = {
  __typename?: 'action';
  /** An object relationship */
  article?: Maybe<Article>;
  article_id?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "token_or_objkt_chain_for_action" */
  chain?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  generative_token?: Maybe<Generative_Token>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  issuer?: Maybe<User>;
  issuer_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  issuer_wallet_account?: Maybe<Wallet_Account>;
  metadata?: Maybe<Scalars['jsonb']['output']>;
  numeric_value?: Maybe<Scalars['numeric']['output']>;
  /** An object relationship */
  objkt?: Maybe<Objkt>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  op_hash: Scalars['String']['output'];
  /** An object relationship */
  redeemable?: Maybe<Redeemable>;
  redeemable_address?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  target?: Maybe<User>;
  target_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  target_wallet_account?: Maybe<Wallet_Account>;
  ticket_id?: Maybe<Scalars['String']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
  type: Scalars['action_type_enum']['output'];
  /** An object relationship */
  user?: Maybe<User>;
};


/** columns and relationships of "action" */
export type ActionMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "action" */
export type Action_Aggregate = {
  __typename?: 'action_aggregate';
  aggregate?: Maybe<Action_Aggregate_Fields>;
  nodes: Array<Action>;
};

export type Action_Aggregate_Bool_Exp = {
  count?: InputMaybe<Action_Aggregate_Bool_Exp_Count>;
};

export type Action_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Action_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Action_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "action" */
export type Action_Aggregate_Fields = {
  __typename?: 'action_aggregate_fields';
  avg?: Maybe<Action_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Action_Max_Fields>;
  min?: Maybe<Action_Min_Fields>;
  stddev?: Maybe<Action_Stddev_Fields>;
  stddev_pop?: Maybe<Action_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Action_Stddev_Samp_Fields>;
  sum?: Maybe<Action_Sum_Fields>;
  var_pop?: Maybe<Action_Var_Pop_Fields>;
  var_samp?: Maybe<Action_Var_Samp_Fields>;
  variance?: Maybe<Action_Variance_Fields>;
};


/** aggregate fields of "action" */
export type Action_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Action_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "action" */
export type Action_Aggregate_Order_By = {
  avg?: InputMaybe<Action_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Action_Max_Order_By>;
  min?: InputMaybe<Action_Min_Order_By>;
  stddev?: InputMaybe<Action_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Action_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Action_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Action_Sum_Order_By>;
  var_pop?: InputMaybe<Action_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Action_Var_Samp_Order_By>;
  variance?: InputMaybe<Action_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Action_Avg_Fields = {
  __typename?: 'action_avg_fields';
  article_id?: Maybe<Scalars['Float']['output']>;
  numeric_value?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "action" */
export type Action_Avg_Order_By = {
  article_id?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "action". All fields are combined with a logical 'AND'. */
export type Action_Bool_Exp = {
  _and?: InputMaybe<Array<Action_Bool_Exp>>;
  _not?: InputMaybe<Action_Bool_Exp>;
  _or?: InputMaybe<Array<Action_Bool_Exp>>;
  article?: InputMaybe<Article_Bool_Exp>;
  article_id?: InputMaybe<Int_Comparison_Exp>;
  chain?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  issuer?: InputMaybe<User_Bool_Exp>;
  issuer_id?: InputMaybe<String_Comparison_Exp>;
  issuer_wallet_account?: InputMaybe<Wallet_Account_Bool_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  numeric_value?: InputMaybe<Numeric_Comparison_Exp>;
  objkt?: InputMaybe<Objkt_Bool_Exp>;
  objkt_id?: InputMaybe<String_Comparison_Exp>;
  op_hash?: InputMaybe<String_Comparison_Exp>;
  redeemable?: InputMaybe<Redeemable_Bool_Exp>;
  redeemable_address?: InputMaybe<String_Comparison_Exp>;
  target?: InputMaybe<User_Bool_Exp>;
  target_id?: InputMaybe<String_Comparison_Exp>;
  target_wallet_account?: InputMaybe<Wallet_Account_Bool_Exp>;
  ticket_id?: InputMaybe<String_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<Action_Type_Enum_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
};

/** aggregate max on columns */
export type Action_Max_Fields = {
  __typename?: 'action_max_fields';
  article_id?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "token_or_objkt_chain_for_action" */
  chain?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  issuer_id?: Maybe<Scalars['String']['output']>;
  numeric_value?: Maybe<Scalars['numeric']['output']>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  op_hash?: Maybe<Scalars['String']['output']>;
  redeemable_address?: Maybe<Scalars['String']['output']>;
  target_id?: Maybe<Scalars['String']['output']>;
  ticket_id?: Maybe<Scalars['String']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['action_type_enum']['output']>;
};

/** order by max() on columns of table "action" */
export type Action_Max_Order_By = {
  article_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  issuer_id?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  op_hash?: InputMaybe<Order_By>;
  redeemable_address?: InputMaybe<Order_By>;
  target_id?: InputMaybe<Order_By>;
  ticket_id?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Action_Min_Fields = {
  __typename?: 'action_min_fields';
  article_id?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "token_or_objkt_chain_for_action" */
  chain?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  issuer_id?: Maybe<Scalars['String']['output']>;
  numeric_value?: Maybe<Scalars['numeric']['output']>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  op_hash?: Maybe<Scalars['String']['output']>;
  redeemable_address?: Maybe<Scalars['String']['output']>;
  target_id?: Maybe<Scalars['String']['output']>;
  ticket_id?: Maybe<Scalars['String']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['action_type_enum']['output']>;
};

/** order by min() on columns of table "action" */
export type Action_Min_Order_By = {
  article_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  issuer_id?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  op_hash?: InputMaybe<Order_By>;
  redeemable_address?: InputMaybe<Order_By>;
  target_id?: InputMaybe<Order_By>;
  ticket_id?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "action". */
export type Action_Order_By = {
  article?: InputMaybe<Article_Order_By>;
  article_id?: InputMaybe<Order_By>;
  chain?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  id?: InputMaybe<Order_By>;
  issuer?: InputMaybe<User_Order_By>;
  issuer_id?: InputMaybe<Order_By>;
  issuer_wallet_account?: InputMaybe<Wallet_Account_Order_By>;
  metadata?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
  objkt?: InputMaybe<Objkt_Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  op_hash?: InputMaybe<Order_By>;
  redeemable?: InputMaybe<Redeemable_Order_By>;
  redeemable_address?: InputMaybe<Order_By>;
  target?: InputMaybe<User_Order_By>;
  target_id?: InputMaybe<Order_By>;
  target_wallet_account?: InputMaybe<Wallet_Account_Order_By>;
  ticket_id?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
};

/** select columns of table "action" */
export enum Action_Select_Column {
  /** column name */
  ArticleId = 'article_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IssuerId = 'issuer_id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  NumericValue = 'numeric_value',
  /** column name */
  ObjktId = 'objkt_id',
  /** column name */
  OpHash = 'op_hash',
  /** column name */
  RedeemableAddress = 'redeemable_address',
  /** column name */
  TargetId = 'target_id',
  /** column name */
  TicketId = 'ticket_id',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  Type = 'type'
}

/** aggregate stddev on columns */
export type Action_Stddev_Fields = {
  __typename?: 'action_stddev_fields';
  article_id?: Maybe<Scalars['Float']['output']>;
  numeric_value?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "action" */
export type Action_Stddev_Order_By = {
  article_id?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Action_Stddev_Pop_Fields = {
  __typename?: 'action_stddev_pop_fields';
  article_id?: Maybe<Scalars['Float']['output']>;
  numeric_value?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "action" */
export type Action_Stddev_Pop_Order_By = {
  article_id?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Action_Stddev_Samp_Fields = {
  __typename?: 'action_stddev_samp_fields';
  article_id?: Maybe<Scalars['Float']['output']>;
  numeric_value?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "action" */
export type Action_Stddev_Samp_Order_By = {
  article_id?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "action" */
export type Action_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Action_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Action_Stream_Cursor_Value_Input = {
  article_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  issuer_id?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  numeric_value?: InputMaybe<Scalars['numeric']['input']>;
  objkt_id?: InputMaybe<Scalars['String']['input']>;
  op_hash?: InputMaybe<Scalars['String']['input']>;
  redeemable_address?: InputMaybe<Scalars['String']['input']>;
  target_id?: InputMaybe<Scalars['String']['input']>;
  ticket_id?: InputMaybe<Scalars['String']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['action_type_enum']['input']>;
};

/** aggregate sum on columns */
export type Action_Sum_Fields = {
  __typename?: 'action_sum_fields';
  article_id?: Maybe<Scalars['Int']['output']>;
  numeric_value?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "action" */
export type Action_Sum_Order_By = {
  article_id?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "action_type_enum". All fields are combined with logical 'AND'. */
export type Action_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['action_type_enum']['input']>;
  _gt?: InputMaybe<Scalars['action_type_enum']['input']>;
  _gte?: InputMaybe<Scalars['action_type_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['action_type_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['action_type_enum']['input']>;
  _lte?: InputMaybe<Scalars['action_type_enum']['input']>;
  _neq?: InputMaybe<Scalars['action_type_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['action_type_enum']['input']>>;
};

/** aggregate var_pop on columns */
export type Action_Var_Pop_Fields = {
  __typename?: 'action_var_pop_fields';
  article_id?: Maybe<Scalars['Float']['output']>;
  numeric_value?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "action" */
export type Action_Var_Pop_Order_By = {
  article_id?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Action_Var_Samp_Fields = {
  __typename?: 'action_var_samp_fields';
  article_id?: Maybe<Scalars['Float']['output']>;
  numeric_value?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "action" */
export type Action_Var_Samp_Order_By = {
  article_id?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Action_Variance_Fields = {
  __typename?: 'action_variance_fields';
  article_id?: Maybe<Scalars['Float']['output']>;
  numeric_value?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "action" */
export type Action_Variance_Order_By = {
  article_id?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
};

/** columns and relationships of "active_listing" */
export type Active_Listing = {
  __typename?: 'active_listing';
  accepted_at?: Maybe<Scalars['timestamptz']['output']>;
  accepted_by_id?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['numeric']['output']>;
  article_id?: Maybe<Scalars['Int']['output']>;
  cancelled_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  is_inactive?: Maybe<Scalars['Boolean']['output']>;
  issuer_id?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['jsonb']['output']>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  royalties?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['listing_status_enum']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};


/** columns and relationships of "active_listing" */
export type Active_ListingMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "active_listing" */
export type Active_Listing_Aggregate = {
  __typename?: 'active_listing_aggregate';
  aggregate?: Maybe<Active_Listing_Aggregate_Fields>;
  nodes: Array<Active_Listing>;
};

/** aggregate fields of "active_listing" */
export type Active_Listing_Aggregate_Fields = {
  __typename?: 'active_listing_aggregate_fields';
  avg?: Maybe<Active_Listing_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Active_Listing_Max_Fields>;
  min?: Maybe<Active_Listing_Min_Fields>;
  stddev?: Maybe<Active_Listing_Stddev_Fields>;
  stddev_pop?: Maybe<Active_Listing_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Active_Listing_Stddev_Samp_Fields>;
  sum?: Maybe<Active_Listing_Sum_Fields>;
  var_pop?: Maybe<Active_Listing_Var_Pop_Fields>;
  var_samp?: Maybe<Active_Listing_Var_Samp_Fields>;
  variance?: Maybe<Active_Listing_Variance_Fields>;
};


/** aggregate fields of "active_listing" */
export type Active_Listing_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Active_Listing_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Active_Listing_Avg_Fields = {
  __typename?: 'active_listing_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "active_listing". All fields are combined with a logical 'AND'. */
export type Active_Listing_Bool_Exp = {
  _and?: InputMaybe<Array<Active_Listing_Bool_Exp>>;
  _not?: InputMaybe<Active_Listing_Bool_Exp>;
  _or?: InputMaybe<Array<Active_Listing_Bool_Exp>>;
  accepted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  accepted_by_id?: InputMaybe<String_Comparison_Exp>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  article_id?: InputMaybe<Int_Comparison_Exp>;
  cancelled_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  is_inactive?: InputMaybe<Boolean_Comparison_Exp>;
  issuer_id?: InputMaybe<String_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  objkt_id?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  royalties?: InputMaybe<Int_Comparison_Exp>;
  status?: InputMaybe<Listing_Status_Enum_Comparison_Exp>;
  version?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Active_Listing_Max_Fields = {
  __typename?: 'active_listing_max_fields';
  accepted_at?: Maybe<Scalars['timestamptz']['output']>;
  accepted_by_id?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['numeric']['output']>;
  article_id?: Maybe<Scalars['Int']['output']>;
  cancelled_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  issuer_id?: Maybe<Scalars['String']['output']>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  royalties?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['listing_status_enum']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Active_Listing_Min_Fields = {
  __typename?: 'active_listing_min_fields';
  accepted_at?: Maybe<Scalars['timestamptz']['output']>;
  accepted_by_id?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['numeric']['output']>;
  article_id?: Maybe<Scalars['Int']['output']>;
  cancelled_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  issuer_id?: Maybe<Scalars['String']['output']>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  royalties?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['listing_status_enum']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "active_listing". */
export type Active_Listing_Order_By = {
  accepted_at?: InputMaybe<Order_By>;
  accepted_by_id?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  cancelled_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_inactive?: InputMaybe<Order_By>;
  issuer_id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** select columns of table "active_listing" */
export enum Active_Listing_Select_Column {
  /** column name */
  AcceptedAt = 'accepted_at',
  /** column name */
  AcceptedById = 'accepted_by_id',
  /** column name */
  Amount = 'amount',
  /** column name */
  ArticleId = 'article_id',
  /** column name */
  CancelledAt = 'cancelled_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsInactive = 'is_inactive',
  /** column name */
  IssuerId = 'issuer_id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  ObjktId = 'objkt_id',
  /** column name */
  Price = 'price',
  /** column name */
  Royalties = 'royalties',
  /** column name */
  Status = 'status',
  /** column name */
  Version = 'version'
}

/** aggregate stddev on columns */
export type Active_Listing_Stddev_Fields = {
  __typename?: 'active_listing_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Active_Listing_Stddev_Pop_Fields = {
  __typename?: 'active_listing_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Active_Listing_Stddev_Samp_Fields = {
  __typename?: 'active_listing_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "active_listing" */
export type Active_Listing_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Active_Listing_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Active_Listing_Stream_Cursor_Value_Input = {
  accepted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  accepted_by_id?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['numeric']['input']>;
  article_id?: InputMaybe<Scalars['Int']['input']>;
  cancelled_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_inactive?: InputMaybe<Scalars['Boolean']['input']>;
  issuer_id?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  objkt_id?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  royalties?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['listing_status_enum']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Active_Listing_Sum_Fields = {
  __typename?: 'active_listing_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  article_id?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  royalties?: Maybe<Scalars['Int']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Active_Listing_Var_Pop_Fields = {
  __typename?: 'active_listing_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Active_Listing_Var_Samp_Fields = {
  __typename?: 'active_listing_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Active_Listing_Variance_Fields = {
  __typename?: 'active_listing_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "airdrop_claim" */
export type Airdrop_Claim = {
  __typename?: 'airdrop_claim';
  amount: Scalars['numeric']['output'];
  claimed_at: Scalars['timestamptz']['output'];
  claimed_by?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "airdrop_claim". All fields are combined with a logical 'AND'. */
export type Airdrop_Claim_Bool_Exp = {
  _and?: InputMaybe<Array<Airdrop_Claim_Bool_Exp>>;
  _not?: InputMaybe<Airdrop_Claim_Bool_Exp>;
  _or?: InputMaybe<Array<Airdrop_Claim_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  claimed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  claimed_by?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "airdrop_claim". */
export type Airdrop_Claim_Order_By = {
  amount?: InputMaybe<Order_By>;
  claimed_at?: InputMaybe<Order_By>;
  claimed_by?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "airdrop_claim" */
export enum Airdrop_Claim_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  ClaimedAt = 'claimed_at',
  /** column name */
  ClaimedBy = 'claimed_by',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "airdrop_claim" */
export type Airdrop_Claim_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Airdrop_Claim_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Airdrop_Claim_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  claimed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  claimed_by?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "any_offer" */
export type Any_Offer = {
  __typename?: 'any_offer';
  /** An object relationship */
  buyer?: Maybe<User>;
  buyer_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  collection_offer?: Maybe<Collection_Offer>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  generative_token?: Maybe<Generative_Token>;
  id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  objkt?: Maybe<Objkt>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  original_id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "any_offer" */
export type Any_Offer_Aggregate = {
  __typename?: 'any_offer_aggregate';
  aggregate?: Maybe<Any_Offer_Aggregate_Fields>;
  nodes: Array<Any_Offer>;
};

/** aggregate fields of "any_offer" */
export type Any_Offer_Aggregate_Fields = {
  __typename?: 'any_offer_aggregate_fields';
  avg?: Maybe<Any_Offer_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Any_Offer_Max_Fields>;
  min?: Maybe<Any_Offer_Min_Fields>;
  stddev?: Maybe<Any_Offer_Stddev_Fields>;
  stddev_pop?: Maybe<Any_Offer_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Any_Offer_Stddev_Samp_Fields>;
  sum?: Maybe<Any_Offer_Sum_Fields>;
  var_pop?: Maybe<Any_Offer_Var_Pop_Fields>;
  var_samp?: Maybe<Any_Offer_Var_Samp_Fields>;
  variance?: Maybe<Any_Offer_Variance_Fields>;
};


/** aggregate fields of "any_offer" */
export type Any_Offer_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Any_Offer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Any_Offer_Avg_Fields = {
  __typename?: 'any_offer_avg_fields';
  price?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "any_offer". All fields are combined with a logical 'AND'. */
export type Any_Offer_Bool_Exp = {
  _and?: InputMaybe<Array<Any_Offer_Bool_Exp>>;
  _not?: InputMaybe<Any_Offer_Bool_Exp>;
  _or?: InputMaybe<Array<Any_Offer_Bool_Exp>>;
  buyer?: InputMaybe<User_Bool_Exp>;
  buyer_id?: InputMaybe<String_Comparison_Exp>;
  collection_offer?: InputMaybe<Collection_Offer_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  objkt?: InputMaybe<Objkt_Bool_Exp>;
  objkt_id?: InputMaybe<String_Comparison_Exp>;
  original_id?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Any_Offer_Max_Fields = {
  __typename?: 'any_offer_max_fields';
  buyer_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  original_id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Any_Offer_Min_Fields = {
  __typename?: 'any_offer_min_fields';
  buyer_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  original_id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "any_offer". */
export type Any_Offer_Order_By = {
  buyer?: InputMaybe<User_Order_By>;
  buyer_id?: InputMaybe<Order_By>;
  collection_offer?: InputMaybe<Collection_Offer_Order_By>;
  created_at?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  id?: InputMaybe<Order_By>;
  objkt?: InputMaybe<Objkt_Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  original_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** select columns of table "any_offer" */
export enum Any_Offer_Select_Column {
  /** column name */
  BuyerId = 'buyer_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ObjktId = 'objkt_id',
  /** column name */
  OriginalId = 'original_id',
  /** column name */
  Price = 'price',
  /** column name */
  Status = 'status',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  Type = 'type'
}

/** aggregate stddev on columns */
export type Any_Offer_Stddev_Fields = {
  __typename?: 'any_offer_stddev_fields';
  price?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Any_Offer_Stddev_Pop_Fields = {
  __typename?: 'any_offer_stddev_pop_fields';
  price?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Any_Offer_Stddev_Samp_Fields = {
  __typename?: 'any_offer_stddev_samp_fields';
  price?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "any_offer" */
export type Any_Offer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Any_Offer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Any_Offer_Stream_Cursor_Value_Input = {
  buyer_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  objkt_id?: InputMaybe<Scalars['String']['input']>;
  original_id?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Any_Offer_Sum_Fields = {
  __typename?: 'any_offer_sum_fields';
  price?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Any_Offer_Var_Pop_Fields = {
  __typename?: 'any_offer_var_pop_fields';
  price?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Any_Offer_Var_Samp_Fields = {
  __typename?: 'any_offer_var_samp_fields';
  price?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Any_Offer_Variance_Fields = {
  __typename?: 'any_offer_variance_fields';
  price?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "art_coin" */
export type Art_Coin = {
  __typename?: 'art_coin';
  /** An array relationship */
  art_coin_holdings: Array<Art_Coin_Holding>;
  /** An aggregate relationship */
  art_coin_holdings_aggregate: Art_Coin_Holding_Aggregate;
  /** An object relationship */
  art_coin_market_stats?: Maybe<Art_Coin_Market_Stats>;
  ascension_progress: Scalars['float8']['output'];
  author_id: Scalars['String']['output'];
  capture_media_id?: Maybe<Scalars['bpchar']['output']>;
  created_at: Scalars['timestamptz']['output'];
  description: Scalars['String']['output'];
  display_uri: Scalars['String']['output'];
  flag: Scalars['art_coin_flag_enum']['output'];
  graduated_address: Scalars['String']['output'];
  graduated_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  media_image?: Maybe<Media_Image>;
  metadata_uri: Scalars['String']['output'];
  name: Scalars['String']['output'];
  opens_at: Scalars['timestamptz']['output'];
  /** An array relationship */
  projects: Array<Generative_Token>;
  /** An aggregate relationship */
  projects_aggregate: Generative_Token_Aggregate;
  slug: Scalars['String']['output'];
  supply: Scalars['numeric']['output'];
  ticker: Scalars['String']['output'];
  /** An object relationship */
  user: User;
};


/** columns and relationships of "art_coin" */
export type Art_CoinArt_Coin_HoldingsArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Holding_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Holding_Order_By>>;
  where?: InputMaybe<Art_Coin_Holding_Bool_Exp>;
};


/** columns and relationships of "art_coin" */
export type Art_CoinArt_Coin_Holdings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Holding_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Holding_Order_By>>;
  where?: InputMaybe<Art_Coin_Holding_Bool_Exp>;
};


/** columns and relationships of "art_coin" */
export type Art_CoinProjectsArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Order_By>>;
  where?: InputMaybe<Generative_Token_Bool_Exp>;
};


/** columns and relationships of "art_coin" */
export type Art_CoinProjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Order_By>>;
  where?: InputMaybe<Generative_Token_Bool_Exp>;
};

/** aggregated selection of "art_coin" */
export type Art_Coin_Aggregate = {
  __typename?: 'art_coin_aggregate';
  aggregate?: Maybe<Art_Coin_Aggregate_Fields>;
  nodes: Array<Art_Coin>;
};

/** aggregate fields of "art_coin" */
export type Art_Coin_Aggregate_Fields = {
  __typename?: 'art_coin_aggregate_fields';
  avg?: Maybe<Art_Coin_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Art_Coin_Max_Fields>;
  min?: Maybe<Art_Coin_Min_Fields>;
  stddev?: Maybe<Art_Coin_Stddev_Fields>;
  stddev_pop?: Maybe<Art_Coin_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Art_Coin_Stddev_Samp_Fields>;
  sum?: Maybe<Art_Coin_Sum_Fields>;
  var_pop?: Maybe<Art_Coin_Var_Pop_Fields>;
  var_samp?: Maybe<Art_Coin_Var_Samp_Fields>;
  variance?: Maybe<Art_Coin_Variance_Fields>;
};


/** aggregate fields of "art_coin" */
export type Art_Coin_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Art_Coin_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Art_Coin_Avg_Fields = {
  __typename?: 'art_coin_avg_fields';
  ascension_progress?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "art_coin_bonding_trade" */
export type Art_Coin_Bonding_Trade = {
  __typename?: 'art_coin_bonding_trade';
  amount_in: Scalars['numeric']['output'];
  amount_out: Scalars['numeric']['output'];
  /** An object relationship */
  art_coin: Art_Coin;
  art_coin_id: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['Int']['output'];
  op_hash: Scalars['String']['output'];
  price: Scalars['numeric']['output'];
  type: Scalars['art_coin_bonding_trade_type_enum']['output'];
  /** An object relationship */
  user: User;
  user_id: Scalars['String']['output'];
};

/** aggregated selection of "art_coin_bonding_trade" */
export type Art_Coin_Bonding_Trade_Aggregate = {
  __typename?: 'art_coin_bonding_trade_aggregate';
  aggregate?: Maybe<Art_Coin_Bonding_Trade_Aggregate_Fields>;
  nodes: Array<Art_Coin_Bonding_Trade>;
};

/** aggregate fields of "art_coin_bonding_trade" */
export type Art_Coin_Bonding_Trade_Aggregate_Fields = {
  __typename?: 'art_coin_bonding_trade_aggregate_fields';
  avg?: Maybe<Art_Coin_Bonding_Trade_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Art_Coin_Bonding_Trade_Max_Fields>;
  min?: Maybe<Art_Coin_Bonding_Trade_Min_Fields>;
  stddev?: Maybe<Art_Coin_Bonding_Trade_Stddev_Fields>;
  stddev_pop?: Maybe<Art_Coin_Bonding_Trade_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Art_Coin_Bonding_Trade_Stddev_Samp_Fields>;
  sum?: Maybe<Art_Coin_Bonding_Trade_Sum_Fields>;
  var_pop?: Maybe<Art_Coin_Bonding_Trade_Var_Pop_Fields>;
  var_samp?: Maybe<Art_Coin_Bonding_Trade_Var_Samp_Fields>;
  variance?: Maybe<Art_Coin_Bonding_Trade_Variance_Fields>;
};


/** aggregate fields of "art_coin_bonding_trade" */
export type Art_Coin_Bonding_Trade_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Art_Coin_Bonding_Trade_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Art_Coin_Bonding_Trade_Avg_Fields = {
  __typename?: 'art_coin_bonding_trade_avg_fields';
  amount_in?: Maybe<Scalars['Float']['output']>;
  amount_out?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "art_coin_bonding_trade". All fields are combined with a logical 'AND'. */
export type Art_Coin_Bonding_Trade_Bool_Exp = {
  _and?: InputMaybe<Array<Art_Coin_Bonding_Trade_Bool_Exp>>;
  _not?: InputMaybe<Art_Coin_Bonding_Trade_Bool_Exp>;
  _or?: InputMaybe<Array<Art_Coin_Bonding_Trade_Bool_Exp>>;
  amount_in?: InputMaybe<Numeric_Comparison_Exp>;
  amount_out?: InputMaybe<Numeric_Comparison_Exp>;
  art_coin?: InputMaybe<Art_Coin_Bool_Exp>;
  art_coin_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  op_hash?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  type?: InputMaybe<Art_Coin_Bonding_Trade_Type_Enum_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Art_Coin_Bonding_Trade_Max_Fields = {
  __typename?: 'art_coin_bonding_trade_max_fields';
  amount_in?: Maybe<Scalars['numeric']['output']>;
  amount_out?: Maybe<Scalars['numeric']['output']>;
  art_coin_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  op_hash?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  type?: Maybe<Scalars['art_coin_bonding_trade_type_enum']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Art_Coin_Bonding_Trade_Min_Fields = {
  __typename?: 'art_coin_bonding_trade_min_fields';
  amount_in?: Maybe<Scalars['numeric']['output']>;
  amount_out?: Maybe<Scalars['numeric']['output']>;
  art_coin_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  op_hash?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  type?: Maybe<Scalars['art_coin_bonding_trade_type_enum']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "art_coin_bonding_trade". */
export type Art_Coin_Bonding_Trade_Order_By = {
  amount_in?: InputMaybe<Order_By>;
  amount_out?: InputMaybe<Order_By>;
  art_coin?: InputMaybe<Art_Coin_Order_By>;
  art_coin_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  op_hash?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "art_coin_bonding_trade" */
export enum Art_Coin_Bonding_Trade_Select_Column {
  /** column name */
  AmountIn = 'amount_in',
  /** column name */
  AmountOut = 'amount_out',
  /** column name */
  ArtCoinId = 'art_coin_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  OpHash = 'op_hash',
  /** column name */
  Price = 'price',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'user_id'
}

/** aggregate stddev on columns */
export type Art_Coin_Bonding_Trade_Stddev_Fields = {
  __typename?: 'art_coin_bonding_trade_stddev_fields';
  amount_in?: Maybe<Scalars['Float']['output']>;
  amount_out?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Art_Coin_Bonding_Trade_Stddev_Pop_Fields = {
  __typename?: 'art_coin_bonding_trade_stddev_pop_fields';
  amount_in?: Maybe<Scalars['Float']['output']>;
  amount_out?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Art_Coin_Bonding_Trade_Stddev_Samp_Fields = {
  __typename?: 'art_coin_bonding_trade_stddev_samp_fields';
  amount_in?: Maybe<Scalars['Float']['output']>;
  amount_out?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "art_coin_bonding_trade" */
export type Art_Coin_Bonding_Trade_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Art_Coin_Bonding_Trade_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Art_Coin_Bonding_Trade_Stream_Cursor_Value_Input = {
  amount_in?: InputMaybe<Scalars['numeric']['input']>;
  amount_out?: InputMaybe<Scalars['numeric']['input']>;
  art_coin_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  op_hash?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  type?: InputMaybe<Scalars['art_coin_bonding_trade_type_enum']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Art_Coin_Bonding_Trade_Sum_Fields = {
  __typename?: 'art_coin_bonding_trade_sum_fields';
  amount_in?: Maybe<Scalars['numeric']['output']>;
  amount_out?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
};

/** Boolean expression to compare columns of type "art_coin_bonding_trade_type_enum". All fields are combined with logical 'AND'. */
export type Art_Coin_Bonding_Trade_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['art_coin_bonding_trade_type_enum']['input']>;
  _gt?: InputMaybe<Scalars['art_coin_bonding_trade_type_enum']['input']>;
  _gte?: InputMaybe<Scalars['art_coin_bonding_trade_type_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['art_coin_bonding_trade_type_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['art_coin_bonding_trade_type_enum']['input']>;
  _lte?: InputMaybe<Scalars['art_coin_bonding_trade_type_enum']['input']>;
  _neq?: InputMaybe<Scalars['art_coin_bonding_trade_type_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['art_coin_bonding_trade_type_enum']['input']>>;
};

/** aggregate var_pop on columns */
export type Art_Coin_Bonding_Trade_Var_Pop_Fields = {
  __typename?: 'art_coin_bonding_trade_var_pop_fields';
  amount_in?: Maybe<Scalars['Float']['output']>;
  amount_out?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Art_Coin_Bonding_Trade_Var_Samp_Fields = {
  __typename?: 'art_coin_bonding_trade_var_samp_fields';
  amount_in?: Maybe<Scalars['Float']['output']>;
  amount_out?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Art_Coin_Bonding_Trade_Variance_Fields = {
  __typename?: 'art_coin_bonding_trade_variance_fields';
  amount_in?: Maybe<Scalars['Float']['output']>;
  amount_out?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "art_coin". All fields are combined with a logical 'AND'. */
export type Art_Coin_Bool_Exp = {
  _and?: InputMaybe<Array<Art_Coin_Bool_Exp>>;
  _not?: InputMaybe<Art_Coin_Bool_Exp>;
  _or?: InputMaybe<Array<Art_Coin_Bool_Exp>>;
  art_coin_holdings?: InputMaybe<Art_Coin_Holding_Bool_Exp>;
  art_coin_holdings_aggregate?: InputMaybe<Art_Coin_Holding_Aggregate_Bool_Exp>;
  art_coin_market_stats?: InputMaybe<Art_Coin_Market_Stats_Bool_Exp>;
  ascension_progress?: InputMaybe<Float8_Comparison_Exp>;
  author_id?: InputMaybe<String_Comparison_Exp>;
  capture_media_id?: InputMaybe<Bpchar_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  display_uri?: InputMaybe<String_Comparison_Exp>;
  flag?: InputMaybe<Art_Coin_Flag_Enum_Comparison_Exp>;
  graduated_address?: InputMaybe<String_Comparison_Exp>;
  graduated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  media_image?: InputMaybe<Media_Image_Bool_Exp>;
  metadata_uri?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  opens_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  projects?: InputMaybe<Generative_Token_Bool_Exp>;
  projects_aggregate?: InputMaybe<Generative_Token_Aggregate_Bool_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  supply?: InputMaybe<Numeric_Comparison_Exp>;
  ticker?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
};

/** Boolean expression to compare columns of type "art_coin_flag_enum". All fields are combined with logical 'AND'. */
export type Art_Coin_Flag_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['art_coin_flag_enum']['input']>;
  _gt?: InputMaybe<Scalars['art_coin_flag_enum']['input']>;
  _gte?: InputMaybe<Scalars['art_coin_flag_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['art_coin_flag_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['art_coin_flag_enum']['input']>;
  _lte?: InputMaybe<Scalars['art_coin_flag_enum']['input']>;
  _neq?: InputMaybe<Scalars['art_coin_flag_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['art_coin_flag_enum']['input']>>;
};

/** columns and relationships of "art_coin_holding" */
export type Art_Coin_Holding = {
  __typename?: 'art_coin_holding';
  amount: Scalars['numeric']['output'];
  art_coin_id: Scalars['String']['output'];
  holder_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  /** An object relationship */
  user: User;
};

/** aggregated selection of "art_coin_holding" */
export type Art_Coin_Holding_Aggregate = {
  __typename?: 'art_coin_holding_aggregate';
  aggregate?: Maybe<Art_Coin_Holding_Aggregate_Fields>;
  nodes: Array<Art_Coin_Holding>;
};

export type Art_Coin_Holding_Aggregate_Bool_Exp = {
  count?: InputMaybe<Art_Coin_Holding_Aggregate_Bool_Exp_Count>;
};

export type Art_Coin_Holding_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Art_Coin_Holding_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Art_Coin_Holding_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "art_coin_holding" */
export type Art_Coin_Holding_Aggregate_Fields = {
  __typename?: 'art_coin_holding_aggregate_fields';
  avg?: Maybe<Art_Coin_Holding_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Art_Coin_Holding_Max_Fields>;
  min?: Maybe<Art_Coin_Holding_Min_Fields>;
  stddev?: Maybe<Art_Coin_Holding_Stddev_Fields>;
  stddev_pop?: Maybe<Art_Coin_Holding_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Art_Coin_Holding_Stddev_Samp_Fields>;
  sum?: Maybe<Art_Coin_Holding_Sum_Fields>;
  var_pop?: Maybe<Art_Coin_Holding_Var_Pop_Fields>;
  var_samp?: Maybe<Art_Coin_Holding_Var_Samp_Fields>;
  variance?: Maybe<Art_Coin_Holding_Variance_Fields>;
};


/** aggregate fields of "art_coin_holding" */
export type Art_Coin_Holding_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Art_Coin_Holding_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "art_coin_holding" */
export type Art_Coin_Holding_Aggregate_Order_By = {
  avg?: InputMaybe<Art_Coin_Holding_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Art_Coin_Holding_Max_Order_By>;
  min?: InputMaybe<Art_Coin_Holding_Min_Order_By>;
  stddev?: InputMaybe<Art_Coin_Holding_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Art_Coin_Holding_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Art_Coin_Holding_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Art_Coin_Holding_Sum_Order_By>;
  var_pop?: InputMaybe<Art_Coin_Holding_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Art_Coin_Holding_Var_Samp_Order_By>;
  variance?: InputMaybe<Art_Coin_Holding_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Art_Coin_Holding_Avg_Fields = {
  __typename?: 'art_coin_holding_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "art_coin_holding" */
export type Art_Coin_Holding_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "art_coin_holding". All fields are combined with a logical 'AND'. */
export type Art_Coin_Holding_Bool_Exp = {
  _and?: InputMaybe<Array<Art_Coin_Holding_Bool_Exp>>;
  _not?: InputMaybe<Art_Coin_Holding_Bool_Exp>;
  _or?: InputMaybe<Array<Art_Coin_Holding_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  art_coin_id?: InputMaybe<String_Comparison_Exp>;
  holder_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
};

/** aggregate max on columns */
export type Art_Coin_Holding_Max_Fields = {
  __typename?: 'art_coin_holding_max_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  art_coin_id?: Maybe<Scalars['String']['output']>;
  holder_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "art_coin_holding" */
export type Art_Coin_Holding_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  art_coin_id?: InputMaybe<Order_By>;
  holder_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Art_Coin_Holding_Min_Fields = {
  __typename?: 'art_coin_holding_min_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  art_coin_id?: Maybe<Scalars['String']['output']>;
  holder_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "art_coin_holding" */
export type Art_Coin_Holding_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  art_coin_id?: InputMaybe<Order_By>;
  holder_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "art_coin_holding". */
export type Art_Coin_Holding_Order_By = {
  amount?: InputMaybe<Order_By>;
  art_coin_id?: InputMaybe<Order_By>;
  holder_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
};

/** select columns of table "art_coin_holding" */
export enum Art_Coin_Holding_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  ArtCoinId = 'art_coin_id',
  /** column name */
  HolderId = 'holder_id',
  /** column name */
  Id = 'id'
}

/** aggregate stddev on columns */
export type Art_Coin_Holding_Stddev_Fields = {
  __typename?: 'art_coin_holding_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "art_coin_holding" */
export type Art_Coin_Holding_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Art_Coin_Holding_Stddev_Pop_Fields = {
  __typename?: 'art_coin_holding_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "art_coin_holding" */
export type Art_Coin_Holding_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Art_Coin_Holding_Stddev_Samp_Fields = {
  __typename?: 'art_coin_holding_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "art_coin_holding" */
export type Art_Coin_Holding_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "art_coin_holding" */
export type Art_Coin_Holding_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Art_Coin_Holding_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Art_Coin_Holding_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  art_coin_id?: InputMaybe<Scalars['String']['input']>;
  holder_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Art_Coin_Holding_Sum_Fields = {
  __typename?: 'art_coin_holding_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "art_coin_holding" */
export type Art_Coin_Holding_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Art_Coin_Holding_Var_Pop_Fields = {
  __typename?: 'art_coin_holding_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "art_coin_holding" */
export type Art_Coin_Holding_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Art_Coin_Holding_Var_Samp_Fields = {
  __typename?: 'art_coin_holding_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "art_coin_holding" */
export type Art_Coin_Holding_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Art_Coin_Holding_Variance_Fields = {
  __typename?: 'art_coin_holding_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "art_coin_holding" */
export type Art_Coin_Holding_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** columns and relationships of "art_coin_market_stats" */
export type Art_Coin_Market_Stats = {
  __typename?: 'art_coin_market_stats';
  art_coin_id: Scalars['String']['output'];
  from?: Maybe<Scalars['timestamptz']['output']>;
  market_cap?: Maybe<Scalars['numeric']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  to?: Maybe<Scalars['timestamptz']['output']>;
  volume24?: Maybe<Scalars['numeric']['output']>;
};

/** Boolean expression to filter rows from the table "art_coin_market_stats". All fields are combined with a logical 'AND'. */
export type Art_Coin_Market_Stats_Bool_Exp = {
  _and?: InputMaybe<Array<Art_Coin_Market_Stats_Bool_Exp>>;
  _not?: InputMaybe<Art_Coin_Market_Stats_Bool_Exp>;
  _or?: InputMaybe<Array<Art_Coin_Market_Stats_Bool_Exp>>;
  art_coin_id?: InputMaybe<String_Comparison_Exp>;
  from?: InputMaybe<Timestamptz_Comparison_Exp>;
  market_cap?: InputMaybe<Numeric_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  to?: InputMaybe<Timestamptz_Comparison_Exp>;
  volume24?: InputMaybe<Numeric_Comparison_Exp>;
};

/** columns and relationships of "art_coin_market_stats_history" */
export type Art_Coin_Market_Stats_History = {
  __typename?: 'art_coin_market_stats_history';
  art_coin_id: Scalars['String']['output'];
  from: Scalars['timestamptz']['output'];
  id: Scalars['Int']['output'];
  market_cap?: Maybe<Scalars['numeric']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  to: Scalars['timestamptz']['output'];
  volume24?: Maybe<Scalars['numeric']['output']>;
};

/** Boolean expression to filter rows from the table "art_coin_market_stats_history". All fields are combined with a logical 'AND'. */
export type Art_Coin_Market_Stats_History_Bool_Exp = {
  _and?: InputMaybe<Array<Art_Coin_Market_Stats_History_Bool_Exp>>;
  _not?: InputMaybe<Art_Coin_Market_Stats_History_Bool_Exp>;
  _or?: InputMaybe<Array<Art_Coin_Market_Stats_History_Bool_Exp>>;
  art_coin_id?: InputMaybe<String_Comparison_Exp>;
  from?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  market_cap?: InputMaybe<Numeric_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  to?: InputMaybe<Timestamptz_Comparison_Exp>;
  volume24?: InputMaybe<Numeric_Comparison_Exp>;
};

/** columns and relationships of "art_coin_market_stats_history_hourly" */
export type Art_Coin_Market_Stats_History_Hourly = {
  __typename?: 'art_coin_market_stats_history_hourly';
  art_coin_id?: Maybe<Scalars['String']['output']>;
  market_cap?: Maybe<Scalars['numeric']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  volume24?: Maybe<Scalars['numeric']['output']>;
};

/** Boolean expression to filter rows from the table "art_coin_market_stats_history_hourly". All fields are combined with a logical 'AND'. */
export type Art_Coin_Market_Stats_History_Hourly_Bool_Exp = {
  _and?: InputMaybe<Array<Art_Coin_Market_Stats_History_Hourly_Bool_Exp>>;
  _not?: InputMaybe<Art_Coin_Market_Stats_History_Hourly_Bool_Exp>;
  _or?: InputMaybe<Array<Art_Coin_Market_Stats_History_Hourly_Bool_Exp>>;
  art_coin_id?: InputMaybe<String_Comparison_Exp>;
  market_cap?: InputMaybe<Numeric_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  volume24?: InputMaybe<Numeric_Comparison_Exp>;
};

/** Ordering options when selecting data from "art_coin_market_stats_history_hourly". */
export type Art_Coin_Market_Stats_History_Hourly_Order_By = {
  art_coin_id?: InputMaybe<Order_By>;
  market_cap?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  volume24?: InputMaybe<Order_By>;
};

/** select columns of table "art_coin_market_stats_history_hourly" */
export enum Art_Coin_Market_Stats_History_Hourly_Select_Column {
  /** column name */
  ArtCoinId = 'art_coin_id',
  /** column name */
  MarketCap = 'market_cap',
  /** column name */
  Price = 'price',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  Volume24 = 'volume24'
}

/** Streaming cursor of the table "art_coin_market_stats_history_hourly" */
export type Art_Coin_Market_Stats_History_Hourly_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Art_Coin_Market_Stats_History_Hourly_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Art_Coin_Market_Stats_History_Hourly_Stream_Cursor_Value_Input = {
  art_coin_id?: InputMaybe<Scalars['String']['input']>;
  market_cap?: InputMaybe<Scalars['numeric']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  volume24?: InputMaybe<Scalars['numeric']['input']>;
};

/** Ordering options when selecting data from "art_coin_market_stats_history". */
export type Art_Coin_Market_Stats_History_Order_By = {
  art_coin_id?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  market_cap?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  volume24?: InputMaybe<Order_By>;
};

/** select columns of table "art_coin_market_stats_history" */
export enum Art_Coin_Market_Stats_History_Select_Column {
  /** column name */
  ArtCoinId = 'art_coin_id',
  /** column name */
  From = 'from',
  /** column name */
  Id = 'id',
  /** column name */
  MarketCap = 'market_cap',
  /** column name */
  Price = 'price',
  /** column name */
  To = 'to',
  /** column name */
  Volume24 = 'volume24'
}

/** Streaming cursor of the table "art_coin_market_stats_history" */
export type Art_Coin_Market_Stats_History_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Art_Coin_Market_Stats_History_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Art_Coin_Market_Stats_History_Stream_Cursor_Value_Input = {
  art_coin_id?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  market_cap?: InputMaybe<Scalars['numeric']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  to?: InputMaybe<Scalars['timestamptz']['input']>;
  volume24?: InputMaybe<Scalars['numeric']['input']>;
};

/** Ordering options when selecting data from "art_coin_market_stats". */
export type Art_Coin_Market_Stats_Order_By = {
  art_coin_id?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  market_cap?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  volume24?: InputMaybe<Order_By>;
};

/** select columns of table "art_coin_market_stats" */
export enum Art_Coin_Market_Stats_Select_Column {
  /** column name */
  ArtCoinId = 'art_coin_id',
  /** column name */
  From = 'from',
  /** column name */
  MarketCap = 'market_cap',
  /** column name */
  Price = 'price',
  /** column name */
  To = 'to',
  /** column name */
  Volume24 = 'volume24'
}

/** Streaming cursor of the table "art_coin_market_stats" */
export type Art_Coin_Market_Stats_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Art_Coin_Market_Stats_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Art_Coin_Market_Stats_Stream_Cursor_Value_Input = {
  art_coin_id?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['timestamptz']['input']>;
  market_cap?: InputMaybe<Scalars['numeric']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  to?: InputMaybe<Scalars['timestamptz']['input']>;
  volume24?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate max on columns */
export type Art_Coin_Max_Fields = {
  __typename?: 'art_coin_max_fields';
  ascension_progress?: Maybe<Scalars['float8']['output']>;
  author_id?: Maybe<Scalars['String']['output']>;
  capture_media_id?: Maybe<Scalars['bpchar']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  display_uri?: Maybe<Scalars['String']['output']>;
  flag?: Maybe<Scalars['art_coin_flag_enum']['output']>;
  graduated_address?: Maybe<Scalars['String']['output']>;
  graduated_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  opens_at?: Maybe<Scalars['timestamptz']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
  ticker?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Art_Coin_Min_Fields = {
  __typename?: 'art_coin_min_fields';
  ascension_progress?: Maybe<Scalars['float8']['output']>;
  author_id?: Maybe<Scalars['String']['output']>;
  capture_media_id?: Maybe<Scalars['bpchar']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  display_uri?: Maybe<Scalars['String']['output']>;
  flag?: Maybe<Scalars['art_coin_flag_enum']['output']>;
  graduated_address?: Maybe<Scalars['String']['output']>;
  graduated_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  opens_at?: Maybe<Scalars['timestamptz']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
  ticker?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "art_coin". */
export type Art_Coin_Order_By = {
  art_coin_holdings_aggregate?: InputMaybe<Art_Coin_Holding_Aggregate_Order_By>;
  art_coin_market_stats?: InputMaybe<Art_Coin_Market_Stats_Order_By>;
  ascension_progress?: InputMaybe<Order_By>;
  author_id?: InputMaybe<Order_By>;
  capture_media_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  display_uri?: InputMaybe<Order_By>;
  flag?: InputMaybe<Order_By>;
  graduated_address?: InputMaybe<Order_By>;
  graduated_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  media_image?: InputMaybe<Media_Image_Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  opens_at?: InputMaybe<Order_By>;
  projects_aggregate?: InputMaybe<Generative_Token_Aggregate_Order_By>;
  slug?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
  ticker?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
};

/** select columns of table "art_coin" */
export enum Art_Coin_Select_Column {
  /** column name */
  AscensionProgress = 'ascension_progress',
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  CaptureMediaId = 'capture_media_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  DisplayUri = 'display_uri',
  /** column name */
  Flag = 'flag',
  /** column name */
  GraduatedAddress = 'graduated_address',
  /** column name */
  GraduatedAt = 'graduated_at',
  /** column name */
  Id = 'id',
  /** column name */
  MetadataUri = 'metadata_uri',
  /** column name */
  Name = 'name',
  /** column name */
  OpensAt = 'opens_at',
  /** column name */
  Slug = 'slug',
  /** column name */
  Supply = 'supply',
  /** column name */
  Ticker = 'ticker'
}

/** aggregate stddev on columns */
export type Art_Coin_Stddev_Fields = {
  __typename?: 'art_coin_stddev_fields';
  ascension_progress?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Art_Coin_Stddev_Pop_Fields = {
  __typename?: 'art_coin_stddev_pop_fields';
  ascension_progress?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Art_Coin_Stddev_Samp_Fields = {
  __typename?: 'art_coin_stddev_samp_fields';
  ascension_progress?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "art_coin" */
export type Art_Coin_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Art_Coin_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Art_Coin_Stream_Cursor_Value_Input = {
  ascension_progress?: InputMaybe<Scalars['float8']['input']>;
  author_id?: InputMaybe<Scalars['String']['input']>;
  capture_media_id?: InputMaybe<Scalars['bpchar']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  display_uri?: InputMaybe<Scalars['String']['input']>;
  flag?: InputMaybe<Scalars['art_coin_flag_enum']['input']>;
  graduated_address?: InputMaybe<Scalars['String']['input']>;
  graduated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  metadata_uri?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  opens_at?: InputMaybe<Scalars['timestamptz']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  supply?: InputMaybe<Scalars['numeric']['input']>;
  ticker?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Art_Coin_Sum_Fields = {
  __typename?: 'art_coin_sum_fields';
  ascension_progress?: Maybe<Scalars['float8']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
};

/** columns and relationships of "art_coin_transfer" */
export type Art_Coin_Transfer = {
  __typename?: 'art_coin_transfer';
  amount: Scalars['numeric']['output'];
  art_coin_id: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['Int']['output'];
  op_hash: Scalars['String']['output'];
  sender_id: Scalars['String']['output'];
  target_id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "art_coin_transfer". All fields are combined with a logical 'AND'. */
export type Art_Coin_Transfer_Bool_Exp = {
  _and?: InputMaybe<Array<Art_Coin_Transfer_Bool_Exp>>;
  _not?: InputMaybe<Art_Coin_Transfer_Bool_Exp>;
  _or?: InputMaybe<Array<Art_Coin_Transfer_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  art_coin_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  op_hash?: InputMaybe<String_Comparison_Exp>;
  sender_id?: InputMaybe<String_Comparison_Exp>;
  target_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "art_coin_transfer". */
export type Art_Coin_Transfer_Order_By = {
  amount?: InputMaybe<Order_By>;
  art_coin_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  op_hash?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
  target_id?: InputMaybe<Order_By>;
};

/** select columns of table "art_coin_transfer" */
export enum Art_Coin_Transfer_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  ArtCoinId = 'art_coin_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  OpHash = 'op_hash',
  /** column name */
  SenderId = 'sender_id',
  /** column name */
  TargetId = 'target_id'
}

/** Streaming cursor of the table "art_coin_transfer" */
export type Art_Coin_Transfer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Art_Coin_Transfer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Art_Coin_Transfer_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  art_coin_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  op_hash?: InputMaybe<Scalars['String']['input']>;
  sender_id?: InputMaybe<Scalars['String']['input']>;
  target_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate var_pop on columns */
export type Art_Coin_Var_Pop_Fields = {
  __typename?: 'art_coin_var_pop_fields';
  ascension_progress?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Art_Coin_Var_Samp_Fields = {
  __typename?: 'art_coin_var_samp_fields';
  ascension_progress?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Art_Coin_Variance_Fields = {
  __typename?: 'art_coin_variance_fields';
  ascension_progress?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "article" */
export type Article = {
  __typename?: 'article';
  /** An array relationship */
  actions: Array<Action>;
  /** An aggregate relationship */
  actions_aggregate: Action_Aggregate;
  /** An array relationship */
  article_generative_tokens: Array<Article_Generative_Token>;
  /** An array relationship */
  article_ledgers: Array<Article_Ledger>;
  /** An aggregate relationship */
  article_ledgers_aggregate: Article_Ledger_Aggregate;
  /** An array relationship */
  article_revisions: Array<Article_Revision>;
  artifact_uri: Scalars['String']['output'];
  author_id: Scalars['String']['output'];
  body: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  description: Scalars['String']['output'];
  display_uri: Scalars['String']['output'];
  editions: Scalars['Int']['output'];
  flag: Scalars['article_flag_enum']['output'];
  id: Scalars['Int']['output'];
  language: Scalars['String']['output'];
  /** An array relationship */
  listings: Array<Listing>;
  /** An aggregate relationship */
  listings_aggregate: Listing_Aggregate;
  /** An object relationship */
  media_image?: Maybe<Media_Image>;
  metadata: Scalars['json']['output'];
  metadata_locked: Scalars['Boolean']['output'];
  metadata_uri: Scalars['String']['output'];
  mint_op_hash: Scalars['String']['output'];
  /** An object relationship */
  moderation_reason?: Maybe<Moderation_Reason>;
  moderation_reason_id?: Maybe<Scalars['String']['output']>;
  platforms?: Maybe<Array<Scalars['String']['output']>>;
  royalties: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  /** An array relationship */
  splits: Array<Split>;
  tags: Array<Scalars['String']['output']>;
  thumbnail_caption?: Maybe<Scalars['String']['output']>;
  thumbnail_media_id?: Maybe<Scalars['bpchar']['output']>;
  thumbnail_uri: Scalars['String']['output'];
  title: Scalars['String']['output'];
  /** An array relationship */
  transactions: Array<Transaction>;
  /** An object relationship */
  user: User;
  /** An object relationship */
  wallet_account?: Maybe<Wallet_Account>;
};


/** columns and relationships of "article" */
export type ArticleActionsArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


/** columns and relationships of "article" */
export type ArticleActions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


/** columns and relationships of "article" */
export type ArticleArticle_Generative_TokensArgs = {
  distinct_on?: InputMaybe<Array<Article_Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Generative_Token_Order_By>>;
  where?: InputMaybe<Article_Generative_Token_Bool_Exp>;
};


/** columns and relationships of "article" */
export type ArticleArticle_LedgersArgs = {
  distinct_on?: InputMaybe<Array<Article_Ledger_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Ledger_Order_By>>;
  where?: InputMaybe<Article_Ledger_Bool_Exp>;
};


/** columns and relationships of "article" */
export type ArticleArticle_Ledgers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Article_Ledger_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Ledger_Order_By>>;
  where?: InputMaybe<Article_Ledger_Bool_Exp>;
};


/** columns and relationships of "article" */
export type ArticleArticle_RevisionsArgs = {
  distinct_on?: InputMaybe<Array<Article_Revision_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Revision_Order_By>>;
  where?: InputMaybe<Article_Revision_Bool_Exp>;
};


/** columns and relationships of "article" */
export type ArticleListingsArgs = {
  distinct_on?: InputMaybe<Array<Listing_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Listing_Order_By>>;
  where?: InputMaybe<Listing_Bool_Exp>;
};


/** columns and relationships of "article" */
export type ArticleListings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Listing_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Listing_Order_By>>;
  where?: InputMaybe<Listing_Bool_Exp>;
};


/** columns and relationships of "article" */
export type ArticleMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "article" */
export type ArticleSplitsArgs = {
  distinct_on?: InputMaybe<Array<Split_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Split_Order_By>>;
  where?: InputMaybe<Split_Bool_Exp>;
};


/** columns and relationships of "article" */
export type ArticleTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transaction_Order_By>>;
  where?: InputMaybe<Transaction_Bool_Exp>;
};

/** aggregated selection of "article" */
export type Article_Aggregate = {
  __typename?: 'article_aggregate';
  aggregate?: Maybe<Article_Aggregate_Fields>;
  nodes: Array<Article>;
};

export type Article_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Article_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Article_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Article_Aggregate_Bool_Exp_Count>;
};

export type Article_Aggregate_Bool_Exp_Bool_And = {
  arguments: Article_Select_Column_Article_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Article_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Article_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Article_Select_Column_Article_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Article_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Article_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Article_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Article_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "article" */
export type Article_Aggregate_Fields = {
  __typename?: 'article_aggregate_fields';
  avg?: Maybe<Article_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Article_Max_Fields>;
  min?: Maybe<Article_Min_Fields>;
  stddev?: Maybe<Article_Stddev_Fields>;
  stddev_pop?: Maybe<Article_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Article_Stddev_Samp_Fields>;
  sum?: Maybe<Article_Sum_Fields>;
  var_pop?: Maybe<Article_Var_Pop_Fields>;
  var_samp?: Maybe<Article_Var_Samp_Fields>;
  variance?: Maybe<Article_Variance_Fields>;
};


/** aggregate fields of "article" */
export type Article_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Article_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "article" */
export type Article_Aggregate_Order_By = {
  avg?: InputMaybe<Article_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Article_Max_Order_By>;
  min?: InputMaybe<Article_Min_Order_By>;
  stddev?: InputMaybe<Article_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Article_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Article_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Article_Sum_Order_By>;
  var_pop?: InputMaybe<Article_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Article_Var_Samp_Order_By>;
  variance?: InputMaybe<Article_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Article_Avg_Fields = {
  __typename?: 'article_avg_fields';
  editions?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "article" */
export type Article_Avg_Order_By = {
  editions?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "article". All fields are combined with a logical 'AND'. */
export type Article_Bool_Exp = {
  _and?: InputMaybe<Array<Article_Bool_Exp>>;
  _not?: InputMaybe<Article_Bool_Exp>;
  _or?: InputMaybe<Array<Article_Bool_Exp>>;
  actions?: InputMaybe<Action_Bool_Exp>;
  actions_aggregate?: InputMaybe<Action_Aggregate_Bool_Exp>;
  article_generative_tokens?: InputMaybe<Article_Generative_Token_Bool_Exp>;
  article_ledgers?: InputMaybe<Article_Ledger_Bool_Exp>;
  article_ledgers_aggregate?: InputMaybe<Article_Ledger_Aggregate_Bool_Exp>;
  article_revisions?: InputMaybe<Article_Revision_Bool_Exp>;
  artifact_uri?: InputMaybe<String_Comparison_Exp>;
  author_id?: InputMaybe<String_Comparison_Exp>;
  body?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  display_uri?: InputMaybe<String_Comparison_Exp>;
  editions?: InputMaybe<Int_Comparison_Exp>;
  flag?: InputMaybe<Article_Flag_Enum_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  language?: InputMaybe<String_Comparison_Exp>;
  listings?: InputMaybe<Listing_Bool_Exp>;
  listings_aggregate?: InputMaybe<Listing_Aggregate_Bool_Exp>;
  media_image?: InputMaybe<Media_Image_Bool_Exp>;
  metadata?: InputMaybe<Json_Comparison_Exp>;
  metadata_locked?: InputMaybe<Boolean_Comparison_Exp>;
  metadata_uri?: InputMaybe<String_Comparison_Exp>;
  mint_op_hash?: InputMaybe<String_Comparison_Exp>;
  moderation_reason?: InputMaybe<Moderation_Reason_Bool_Exp>;
  moderation_reason_id?: InputMaybe<String_Comparison_Exp>;
  platforms?: InputMaybe<String_Array_Comparison_Exp>;
  royalties?: InputMaybe<Int_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  splits?: InputMaybe<Split_Bool_Exp>;
  tags?: InputMaybe<String_Array_Comparison_Exp>;
  thumbnail_caption?: InputMaybe<String_Comparison_Exp>;
  thumbnail_media_id?: InputMaybe<Bpchar_Comparison_Exp>;
  thumbnail_uri?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  transactions?: InputMaybe<Transaction_Bool_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  wallet_account?: InputMaybe<Wallet_Account_Bool_Exp>;
};

/** Boolean expression to compare columns of type "article_flag_enum". All fields are combined with logical 'AND'. */
export type Article_Flag_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['article_flag_enum']['input']>;
  _gt?: InputMaybe<Scalars['article_flag_enum']['input']>;
  _gte?: InputMaybe<Scalars['article_flag_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['article_flag_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['article_flag_enum']['input']>;
  _lte?: InputMaybe<Scalars['article_flag_enum']['input']>;
  _neq?: InputMaybe<Scalars['article_flag_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['article_flag_enum']['input']>>;
};

/** columns and relationships of "article_generative_token" */
export type Article_Generative_Token = {
  __typename?: 'article_generative_token';
  article_id: Scalars['Int']['output'];
  generative_token_id: Scalars['String']['output'];
  line: Scalars['Int']['output'];
};

/** order by aggregate values of table "article_generative_token" */
export type Article_Generative_Token_Aggregate_Order_By = {
  avg?: InputMaybe<Article_Generative_Token_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Article_Generative_Token_Max_Order_By>;
  min?: InputMaybe<Article_Generative_Token_Min_Order_By>;
  stddev?: InputMaybe<Article_Generative_Token_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Article_Generative_Token_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Article_Generative_Token_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Article_Generative_Token_Sum_Order_By>;
  var_pop?: InputMaybe<Article_Generative_Token_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Article_Generative_Token_Var_Samp_Order_By>;
  variance?: InputMaybe<Article_Generative_Token_Variance_Order_By>;
};

/** order by avg() on columns of table "article_generative_token" */
export type Article_Generative_Token_Avg_Order_By = {
  article_id?: InputMaybe<Order_By>;
  line?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "article_generative_token". All fields are combined with a logical 'AND'. */
export type Article_Generative_Token_Bool_Exp = {
  _and?: InputMaybe<Array<Article_Generative_Token_Bool_Exp>>;
  _not?: InputMaybe<Article_Generative_Token_Bool_Exp>;
  _or?: InputMaybe<Array<Article_Generative_Token_Bool_Exp>>;
  article_id?: InputMaybe<Int_Comparison_Exp>;
  generative_token_id?: InputMaybe<String_Comparison_Exp>;
  line?: InputMaybe<Int_Comparison_Exp>;
};

/** order by max() on columns of table "article_generative_token" */
export type Article_Generative_Token_Max_Order_By = {
  article_id?: InputMaybe<Order_By>;
  generative_token_id?: InputMaybe<Order_By>;
  line?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "article_generative_token" */
export type Article_Generative_Token_Min_Order_By = {
  article_id?: InputMaybe<Order_By>;
  generative_token_id?: InputMaybe<Order_By>;
  line?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "article_generative_token". */
export type Article_Generative_Token_Order_By = {
  article_id?: InputMaybe<Order_By>;
  generative_token_id?: InputMaybe<Order_By>;
  line?: InputMaybe<Order_By>;
};

/** select columns of table "article_generative_token" */
export enum Article_Generative_Token_Select_Column {
  /** column name */
  ArticleId = 'article_id',
  /** column name */
  GenerativeTokenId = 'generative_token_id',
  /** column name */
  Line = 'line'
}

/** order by stddev() on columns of table "article_generative_token" */
export type Article_Generative_Token_Stddev_Order_By = {
  article_id?: InputMaybe<Order_By>;
  line?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "article_generative_token" */
export type Article_Generative_Token_Stddev_Pop_Order_By = {
  article_id?: InputMaybe<Order_By>;
  line?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "article_generative_token" */
export type Article_Generative_Token_Stddev_Samp_Order_By = {
  article_id?: InputMaybe<Order_By>;
  line?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "article_generative_token" */
export type Article_Generative_Token_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Article_Generative_Token_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Article_Generative_Token_Stream_Cursor_Value_Input = {
  article_id?: InputMaybe<Scalars['Int']['input']>;
  generative_token_id?: InputMaybe<Scalars['String']['input']>;
  line?: InputMaybe<Scalars['Int']['input']>;
};

/** order by sum() on columns of table "article_generative_token" */
export type Article_Generative_Token_Sum_Order_By = {
  article_id?: InputMaybe<Order_By>;
  line?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "article_generative_token" */
export type Article_Generative_Token_Var_Pop_Order_By = {
  article_id?: InputMaybe<Order_By>;
  line?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "article_generative_token" */
export type Article_Generative_Token_Var_Samp_Order_By = {
  article_id?: InputMaybe<Order_By>;
  line?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "article_generative_token" */
export type Article_Generative_Token_Variance_Order_By = {
  article_id?: InputMaybe<Order_By>;
  line?: InputMaybe<Order_By>;
};

/** columns and relationships of "article_ledger" */
export type Article_Ledger = {
  __typename?: 'article_ledger';
  amount: Scalars['bigint']['output'];
  /** An object relationship */
  article: Article;
  article_id: Scalars['Int']['output'];
  owner_id: Scalars['String']['output'];
  /** An object relationship */
  user: User;
  /** An object relationship */
  wallet_account?: Maybe<Wallet_Account>;
};

/** aggregated selection of "article_ledger" */
export type Article_Ledger_Aggregate = {
  __typename?: 'article_ledger_aggregate';
  aggregate?: Maybe<Article_Ledger_Aggregate_Fields>;
  nodes: Array<Article_Ledger>;
};

export type Article_Ledger_Aggregate_Bool_Exp = {
  count?: InputMaybe<Article_Ledger_Aggregate_Bool_Exp_Count>;
};

export type Article_Ledger_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Article_Ledger_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Article_Ledger_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "article_ledger" */
export type Article_Ledger_Aggregate_Fields = {
  __typename?: 'article_ledger_aggregate_fields';
  avg?: Maybe<Article_Ledger_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Article_Ledger_Max_Fields>;
  min?: Maybe<Article_Ledger_Min_Fields>;
  stddev?: Maybe<Article_Ledger_Stddev_Fields>;
  stddev_pop?: Maybe<Article_Ledger_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Article_Ledger_Stddev_Samp_Fields>;
  sum?: Maybe<Article_Ledger_Sum_Fields>;
  var_pop?: Maybe<Article_Ledger_Var_Pop_Fields>;
  var_samp?: Maybe<Article_Ledger_Var_Samp_Fields>;
  variance?: Maybe<Article_Ledger_Variance_Fields>;
};


/** aggregate fields of "article_ledger" */
export type Article_Ledger_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Article_Ledger_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "article_ledger" */
export type Article_Ledger_Aggregate_Order_By = {
  avg?: InputMaybe<Article_Ledger_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Article_Ledger_Max_Order_By>;
  min?: InputMaybe<Article_Ledger_Min_Order_By>;
  stddev?: InputMaybe<Article_Ledger_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Article_Ledger_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Article_Ledger_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Article_Ledger_Sum_Order_By>;
  var_pop?: InputMaybe<Article_Ledger_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Article_Ledger_Var_Samp_Order_By>;
  variance?: InputMaybe<Article_Ledger_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Article_Ledger_Avg_Fields = {
  __typename?: 'article_ledger_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "article_ledger" */
export type Article_Ledger_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "article_ledger". All fields are combined with a logical 'AND'. */
export type Article_Ledger_Bool_Exp = {
  _and?: InputMaybe<Array<Article_Ledger_Bool_Exp>>;
  _not?: InputMaybe<Article_Ledger_Bool_Exp>;
  _or?: InputMaybe<Array<Article_Ledger_Bool_Exp>>;
  amount?: InputMaybe<Bigint_Comparison_Exp>;
  article?: InputMaybe<Article_Bool_Exp>;
  article_id?: InputMaybe<Int_Comparison_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  wallet_account?: InputMaybe<Wallet_Account_Bool_Exp>;
};

/** aggregate max on columns */
export type Article_Ledger_Max_Fields = {
  __typename?: 'article_ledger_max_fields';
  amount?: Maybe<Scalars['bigint']['output']>;
  article_id?: Maybe<Scalars['Int']['output']>;
  owner_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "article_ledger" */
export type Article_Ledger_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Article_Ledger_Min_Fields = {
  __typename?: 'article_ledger_min_fields';
  amount?: Maybe<Scalars['bigint']['output']>;
  article_id?: Maybe<Scalars['Int']['output']>;
  owner_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "article_ledger" */
export type Article_Ledger_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "article_ledger". */
export type Article_Ledger_Order_By = {
  amount?: InputMaybe<Order_By>;
  article?: InputMaybe<Article_Order_By>;
  article_id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  wallet_account?: InputMaybe<Wallet_Account_Order_By>;
};

/** select columns of table "article_ledger" */
export enum Article_Ledger_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  ArticleId = 'article_id',
  /** column name */
  OwnerId = 'owner_id'
}

/** aggregate stddev on columns */
export type Article_Ledger_Stddev_Fields = {
  __typename?: 'article_ledger_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "article_ledger" */
export type Article_Ledger_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Article_Ledger_Stddev_Pop_Fields = {
  __typename?: 'article_ledger_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "article_ledger" */
export type Article_Ledger_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Article_Ledger_Stddev_Samp_Fields = {
  __typename?: 'article_ledger_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "article_ledger" */
export type Article_Ledger_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "article_ledger" */
export type Article_Ledger_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Article_Ledger_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Article_Ledger_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['bigint']['input']>;
  article_id?: InputMaybe<Scalars['Int']['input']>;
  owner_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Article_Ledger_Sum_Fields = {
  __typename?: 'article_ledger_sum_fields';
  amount?: Maybe<Scalars['bigint']['output']>;
  article_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "article_ledger" */
export type Article_Ledger_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Article_Ledger_Var_Pop_Fields = {
  __typename?: 'article_ledger_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "article_ledger" */
export type Article_Ledger_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Article_Ledger_Var_Samp_Fields = {
  __typename?: 'article_ledger_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "article_ledger" */
export type Article_Ledger_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Article_Ledger_Variance_Fields = {
  __typename?: 'article_ledger_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "article_ledger" */
export type Article_Ledger_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
};

/** aggregate max on columns */
export type Article_Max_Fields = {
  __typename?: 'article_max_fields';
  artifact_uri?: Maybe<Scalars['String']['output']>;
  author_id?: Maybe<Scalars['String']['output']>;
  body?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  display_uri?: Maybe<Scalars['String']['output']>;
  editions?: Maybe<Scalars['Int']['output']>;
  flag?: Maybe<Scalars['article_flag_enum']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  mint_op_hash?: Maybe<Scalars['String']['output']>;
  moderation_reason_id?: Maybe<Scalars['String']['output']>;
  platforms?: Maybe<Array<Scalars['String']['output']>>;
  royalties?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  thumbnail_caption?: Maybe<Scalars['String']['output']>;
  thumbnail_media_id?: Maybe<Scalars['bpchar']['output']>;
  thumbnail_uri?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "article" */
export type Article_Max_Order_By = {
  artifact_uri?: InputMaybe<Order_By>;
  author_id?: InputMaybe<Order_By>;
  body?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  display_uri?: InputMaybe<Order_By>;
  editions?: InputMaybe<Order_By>;
  flag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  language?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  mint_op_hash?: InputMaybe<Order_By>;
  moderation_reason_id?: InputMaybe<Order_By>;
  platforms?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  tags?: InputMaybe<Order_By>;
  thumbnail_caption?: InputMaybe<Order_By>;
  thumbnail_media_id?: InputMaybe<Order_By>;
  thumbnail_uri?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Article_Min_Fields = {
  __typename?: 'article_min_fields';
  artifact_uri?: Maybe<Scalars['String']['output']>;
  author_id?: Maybe<Scalars['String']['output']>;
  body?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  display_uri?: Maybe<Scalars['String']['output']>;
  editions?: Maybe<Scalars['Int']['output']>;
  flag?: Maybe<Scalars['article_flag_enum']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  mint_op_hash?: Maybe<Scalars['String']['output']>;
  moderation_reason_id?: Maybe<Scalars['String']['output']>;
  platforms?: Maybe<Array<Scalars['String']['output']>>;
  royalties?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  thumbnail_caption?: Maybe<Scalars['String']['output']>;
  thumbnail_media_id?: Maybe<Scalars['bpchar']['output']>;
  thumbnail_uri?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "article" */
export type Article_Min_Order_By = {
  artifact_uri?: InputMaybe<Order_By>;
  author_id?: InputMaybe<Order_By>;
  body?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  display_uri?: InputMaybe<Order_By>;
  editions?: InputMaybe<Order_By>;
  flag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  language?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  mint_op_hash?: InputMaybe<Order_By>;
  moderation_reason_id?: InputMaybe<Order_By>;
  platforms?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  tags?: InputMaybe<Order_By>;
  thumbnail_caption?: InputMaybe<Order_By>;
  thumbnail_media_id?: InputMaybe<Order_By>;
  thumbnail_uri?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "article". */
export type Article_Order_By = {
  actions_aggregate?: InputMaybe<Action_Aggregate_Order_By>;
  article_generative_tokens_aggregate?: InputMaybe<Article_Generative_Token_Aggregate_Order_By>;
  article_ledgers_aggregate?: InputMaybe<Article_Ledger_Aggregate_Order_By>;
  article_revisions_aggregate?: InputMaybe<Article_Revision_Aggregate_Order_By>;
  artifact_uri?: InputMaybe<Order_By>;
  author_id?: InputMaybe<Order_By>;
  body?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  display_uri?: InputMaybe<Order_By>;
  editions?: InputMaybe<Order_By>;
  flag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  language?: InputMaybe<Order_By>;
  listings_aggregate?: InputMaybe<Listing_Aggregate_Order_By>;
  media_image?: InputMaybe<Media_Image_Order_By>;
  metadata?: InputMaybe<Order_By>;
  metadata_locked?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  mint_op_hash?: InputMaybe<Order_By>;
  moderation_reason?: InputMaybe<Moderation_Reason_Order_By>;
  moderation_reason_id?: InputMaybe<Order_By>;
  platforms?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  splits_aggregate?: InputMaybe<Split_Aggregate_Order_By>;
  tags?: InputMaybe<Order_By>;
  thumbnail_caption?: InputMaybe<Order_By>;
  thumbnail_media_id?: InputMaybe<Order_By>;
  thumbnail_uri?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  transactions_aggregate?: InputMaybe<Transaction_Aggregate_Order_By>;
  user?: InputMaybe<User_Order_By>;
  wallet_account?: InputMaybe<Wallet_Account_Order_By>;
};

/** columns and relationships of "article_revision" */
export type Article_Revision = {
  __typename?: 'article_revision';
  /** An object relationship */
  article: Article;
  article_id: Scalars['Int']['output'];
  created_at: Scalars['timestamptz']['output'];
  iteration: Scalars['smallint']['output'];
  metadata_uri: Scalars['String']['output'];
  op_hash: Scalars['String']['output'];
};

/** order by aggregate values of table "article_revision" */
export type Article_Revision_Aggregate_Order_By = {
  avg?: InputMaybe<Article_Revision_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Article_Revision_Max_Order_By>;
  min?: InputMaybe<Article_Revision_Min_Order_By>;
  stddev?: InputMaybe<Article_Revision_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Article_Revision_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Article_Revision_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Article_Revision_Sum_Order_By>;
  var_pop?: InputMaybe<Article_Revision_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Article_Revision_Var_Samp_Order_By>;
  variance?: InputMaybe<Article_Revision_Variance_Order_By>;
};

/** order by avg() on columns of table "article_revision" */
export type Article_Revision_Avg_Order_By = {
  article_id?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "article_revision". All fields are combined with a logical 'AND'. */
export type Article_Revision_Bool_Exp = {
  _and?: InputMaybe<Array<Article_Revision_Bool_Exp>>;
  _not?: InputMaybe<Article_Revision_Bool_Exp>;
  _or?: InputMaybe<Array<Article_Revision_Bool_Exp>>;
  article?: InputMaybe<Article_Bool_Exp>;
  article_id?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  iteration?: InputMaybe<Smallint_Comparison_Exp>;
  metadata_uri?: InputMaybe<String_Comparison_Exp>;
  op_hash?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "article_revision" */
export type Article_Revision_Max_Order_By = {
  article_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  op_hash?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "article_revision" */
export type Article_Revision_Min_Order_By = {
  article_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  op_hash?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "article_revision". */
export type Article_Revision_Order_By = {
  article?: InputMaybe<Article_Order_By>;
  article_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  op_hash?: InputMaybe<Order_By>;
};

/** select columns of table "article_revision" */
export enum Article_Revision_Select_Column {
  /** column name */
  ArticleId = 'article_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Iteration = 'iteration',
  /** column name */
  MetadataUri = 'metadata_uri',
  /** column name */
  OpHash = 'op_hash'
}

/** order by stddev() on columns of table "article_revision" */
export type Article_Revision_Stddev_Order_By = {
  article_id?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "article_revision" */
export type Article_Revision_Stddev_Pop_Order_By = {
  article_id?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "article_revision" */
export type Article_Revision_Stddev_Samp_Order_By = {
  article_id?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "article_revision" */
export type Article_Revision_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Article_Revision_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Article_Revision_Stream_Cursor_Value_Input = {
  article_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  iteration?: InputMaybe<Scalars['smallint']['input']>;
  metadata_uri?: InputMaybe<Scalars['String']['input']>;
  op_hash?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "article_revision" */
export type Article_Revision_Sum_Order_By = {
  article_id?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "article_revision" */
export type Article_Revision_Var_Pop_Order_By = {
  article_id?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "article_revision" */
export type Article_Revision_Var_Samp_Order_By = {
  article_id?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "article_revision" */
export type Article_Revision_Variance_Order_By = {
  article_id?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
};

/** select columns of table "article" */
export enum Article_Select_Column {
  /** column name */
  ArtifactUri = 'artifact_uri',
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  Body = 'body',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  DisplayUri = 'display_uri',
  /** column name */
  Editions = 'editions',
  /** column name */
  Flag = 'flag',
  /** column name */
  Id = 'id',
  /** column name */
  Language = 'language',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MetadataLocked = 'metadata_locked',
  /** column name */
  MetadataUri = 'metadata_uri',
  /** column name */
  MintOpHash = 'mint_op_hash',
  /** column name */
  ModerationReasonId = 'moderation_reason_id',
  /** column name */
  Platforms = 'platforms',
  /** column name */
  Royalties = 'royalties',
  /** column name */
  Slug = 'slug',
  /** column name */
  Tags = 'tags',
  /** column name */
  ThumbnailCaption = 'thumbnail_caption',
  /** column name */
  ThumbnailMediaId = 'thumbnail_media_id',
  /** column name */
  ThumbnailUri = 'thumbnail_uri',
  /** column name */
  Title = 'title'
}

/** select "article_aggregate_bool_exp_bool_and_arguments_columns" columns of table "article" */
export enum Article_Select_Column_Article_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  MetadataLocked = 'metadata_locked'
}

/** select "article_aggregate_bool_exp_bool_or_arguments_columns" columns of table "article" */
export enum Article_Select_Column_Article_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  MetadataLocked = 'metadata_locked'
}

/** aggregate stddev on columns */
export type Article_Stddev_Fields = {
  __typename?: 'article_stddev_fields';
  editions?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "article" */
export type Article_Stddev_Order_By = {
  editions?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Article_Stddev_Pop_Fields = {
  __typename?: 'article_stddev_pop_fields';
  editions?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "article" */
export type Article_Stddev_Pop_Order_By = {
  editions?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Article_Stddev_Samp_Fields = {
  __typename?: 'article_stddev_samp_fields';
  editions?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "article" */
export type Article_Stddev_Samp_Order_By = {
  editions?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "article" */
export type Article_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Article_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Article_Stream_Cursor_Value_Input = {
  artifact_uri?: InputMaybe<Scalars['String']['input']>;
  author_id?: InputMaybe<Scalars['String']['input']>;
  body?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  display_uri?: InputMaybe<Scalars['String']['input']>;
  editions?: InputMaybe<Scalars['Int']['input']>;
  flag?: InputMaybe<Scalars['article_flag_enum']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['json']['input']>;
  metadata_locked?: InputMaybe<Scalars['Boolean']['input']>;
  metadata_uri?: InputMaybe<Scalars['String']['input']>;
  mint_op_hash?: InputMaybe<Scalars['String']['input']>;
  moderation_reason_id?: InputMaybe<Scalars['String']['input']>;
  platforms?: InputMaybe<Array<Scalars['String']['input']>>;
  royalties?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnail_caption?: InputMaybe<Scalars['String']['input']>;
  thumbnail_media_id?: InputMaybe<Scalars['bpchar']['input']>;
  thumbnail_uri?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Article_Sum_Fields = {
  __typename?: 'article_sum_fields';
  editions?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  royalties?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "article" */
export type Article_Sum_Order_By = {
  editions?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Article_Var_Pop_Fields = {
  __typename?: 'article_var_pop_fields';
  editions?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "article" */
export type Article_Var_Pop_Order_By = {
  editions?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Article_Var_Samp_Fields = {
  __typename?: 'article_var_samp_fields';
  editions?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "article" */
export type Article_Var_Samp_Order_By = {
  editions?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Article_Variance_Fields = {
  __typename?: 'article_variance_fields';
  editions?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "article" */
export type Article_Variance_Order_By = {
  editions?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
};

/** columns and relationships of "auction" */
export type Auction = {
  __typename?: 'auction';
  /** An object relationship */
  auction_bid_table?: Maybe<Auction_Bid_Table>;
  /** An array relationship */
  auction_bids: Array<Auction_Bid>;
  bid_table_id?: Maybe<Scalars['Int']['output']>;
  bid_time_increment: Scalars['Int']['output'];
  cancelled_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at: Scalars['timestamptz']['output'];
  ends_at?: Maybe<Scalars['timestamptz']['output']>;
  fulfilled_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['Int']['output'];
  min_duration: Scalars['Int']['output'];
  /** An object relationship */
  objkt?: Maybe<Objkt>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  reserve_price: Scalars['bigint']['output'];
  seller_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  user?: Maybe<User>;
  version: Scalars['Int']['output'];
};


/** columns and relationships of "auction" */
export type AuctionAuction_BidsArgs = {
  distinct_on?: InputMaybe<Array<Auction_Bid_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Auction_Bid_Order_By>>;
  where?: InputMaybe<Auction_Bid_Bool_Exp>;
};

/** order by aggregate values of table "auction" */
export type Auction_Aggregate_Order_By = {
  avg?: InputMaybe<Auction_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Auction_Max_Order_By>;
  min?: InputMaybe<Auction_Min_Order_By>;
  stddev?: InputMaybe<Auction_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Auction_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Auction_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Auction_Sum_Order_By>;
  var_pop?: InputMaybe<Auction_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Auction_Var_Samp_Order_By>;
  variance?: InputMaybe<Auction_Variance_Order_By>;
};

/** order by avg() on columns of table "auction" */
export type Auction_Avg_Order_By = {
  bid_table_id?: InputMaybe<Order_By>;
  bid_time_increment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  min_duration?: InputMaybe<Order_By>;
  reserve_price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** columns and relationships of "auction_bid" */
export type Auction_Bid = {
  __typename?: 'auction_bid';
  /** An object relationship */
  auction?: Maybe<Auction>;
  auction_id?: Maybe<Scalars['Int']['output']>;
  auction_version?: Maybe<Scalars['Int']['output']>;
  bidder_id?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  price: Scalars['numeric']['output'];
  /** An object relationship */
  user?: Maybe<User>;
};

/** order by aggregate values of table "auction_bid" */
export type Auction_Bid_Aggregate_Order_By = {
  avg?: InputMaybe<Auction_Bid_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Auction_Bid_Max_Order_By>;
  min?: InputMaybe<Auction_Bid_Min_Order_By>;
  stddev?: InputMaybe<Auction_Bid_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Auction_Bid_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Auction_Bid_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Auction_Bid_Sum_Order_By>;
  var_pop?: InputMaybe<Auction_Bid_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Auction_Bid_Var_Samp_Order_By>;
  variance?: InputMaybe<Auction_Bid_Variance_Order_By>;
};

/** order by avg() on columns of table "auction_bid" */
export type Auction_Bid_Avg_Order_By = {
  auction_id?: InputMaybe<Order_By>;
  auction_version?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "auction_bid". All fields are combined with a logical 'AND'. */
export type Auction_Bid_Bool_Exp = {
  _and?: InputMaybe<Array<Auction_Bid_Bool_Exp>>;
  _not?: InputMaybe<Auction_Bid_Bool_Exp>;
  _or?: InputMaybe<Array<Auction_Bid_Bool_Exp>>;
  auction?: InputMaybe<Auction_Bool_Exp>;
  auction_id?: InputMaybe<Int_Comparison_Exp>;
  auction_version?: InputMaybe<Int_Comparison_Exp>;
  bidder_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
};

/** order by max() on columns of table "auction_bid" */
export type Auction_Bid_Max_Order_By = {
  auction_id?: InputMaybe<Order_By>;
  auction_version?: InputMaybe<Order_By>;
  bidder_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "auction_bid" */
export type Auction_Bid_Min_Order_By = {
  auction_id?: InputMaybe<Order_By>;
  auction_version?: InputMaybe<Order_By>;
  bidder_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "auction_bid". */
export type Auction_Bid_Order_By = {
  auction?: InputMaybe<Auction_Order_By>;
  auction_id?: InputMaybe<Order_By>;
  auction_version?: InputMaybe<Order_By>;
  bidder_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
};

/** select columns of table "auction_bid" */
export enum Auction_Bid_Select_Column {
  /** column name */
  AuctionId = 'auction_id',
  /** column name */
  AuctionVersion = 'auction_version',
  /** column name */
  BidderId = 'bidder_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Price = 'price'
}

/** order by stddev() on columns of table "auction_bid" */
export type Auction_Bid_Stddev_Order_By = {
  auction_id?: InputMaybe<Order_By>;
  auction_version?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "auction_bid" */
export type Auction_Bid_Stddev_Pop_Order_By = {
  auction_id?: InputMaybe<Order_By>;
  auction_version?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "auction_bid" */
export type Auction_Bid_Stddev_Samp_Order_By = {
  auction_id?: InputMaybe<Order_By>;
  auction_version?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "auction_bid" */
export type Auction_Bid_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Auction_Bid_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Auction_Bid_Stream_Cursor_Value_Input = {
  auction_id?: InputMaybe<Scalars['Int']['input']>;
  auction_version?: InputMaybe<Scalars['Int']['input']>;
  bidder_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "auction_bid" */
export type Auction_Bid_Sum_Order_By = {
  auction_id?: InputMaybe<Order_By>;
  auction_version?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** columns and relationships of "auction_bid_table" */
export type Auction_Bid_Table = {
  __typename?: 'auction_bid_table';
  /** An array relationship */
  auctions: Array<Auction>;
  id: Scalars['Int']['output'];
  table: Scalars['jsonb']['output'];
};


/** columns and relationships of "auction_bid_table" */
export type Auction_Bid_TableAuctionsArgs = {
  distinct_on?: InputMaybe<Array<Auction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Auction_Order_By>>;
  where?: InputMaybe<Auction_Bool_Exp>;
};


/** columns and relationships of "auction_bid_table" */
export type Auction_Bid_TableTableArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "auction_bid_table". All fields are combined with a logical 'AND'. */
export type Auction_Bid_Table_Bool_Exp = {
  _and?: InputMaybe<Array<Auction_Bid_Table_Bool_Exp>>;
  _not?: InputMaybe<Auction_Bid_Table_Bool_Exp>;
  _or?: InputMaybe<Array<Auction_Bid_Table_Bool_Exp>>;
  auctions?: InputMaybe<Auction_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  table?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** Ordering options when selecting data from "auction_bid_table". */
export type Auction_Bid_Table_Order_By = {
  auctions_aggregate?: InputMaybe<Auction_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  table?: InputMaybe<Order_By>;
};

/** select columns of table "auction_bid_table" */
export enum Auction_Bid_Table_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Table = 'table'
}

/** Streaming cursor of the table "auction_bid_table" */
export type Auction_Bid_Table_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Auction_Bid_Table_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Auction_Bid_Table_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  table?: InputMaybe<Scalars['jsonb']['input']>;
};

/** order by var_pop() on columns of table "auction_bid" */
export type Auction_Bid_Var_Pop_Order_By = {
  auction_id?: InputMaybe<Order_By>;
  auction_version?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "auction_bid" */
export type Auction_Bid_Var_Samp_Order_By = {
  auction_id?: InputMaybe<Order_By>;
  auction_version?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "auction_bid" */
export type Auction_Bid_Variance_Order_By = {
  auction_id?: InputMaybe<Order_By>;
  auction_version?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "auction". All fields are combined with a logical 'AND'. */
export type Auction_Bool_Exp = {
  _and?: InputMaybe<Array<Auction_Bool_Exp>>;
  _not?: InputMaybe<Auction_Bool_Exp>;
  _or?: InputMaybe<Array<Auction_Bool_Exp>>;
  auction_bid_table?: InputMaybe<Auction_Bid_Table_Bool_Exp>;
  auction_bids?: InputMaybe<Auction_Bid_Bool_Exp>;
  bid_table_id?: InputMaybe<Int_Comparison_Exp>;
  bid_time_increment?: InputMaybe<Int_Comparison_Exp>;
  cancelled_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  ends_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  fulfilled_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  min_duration?: InputMaybe<Int_Comparison_Exp>;
  objkt?: InputMaybe<Objkt_Bool_Exp>;
  objkt_id?: InputMaybe<String_Comparison_Exp>;
  reserve_price?: InputMaybe<Bigint_Comparison_Exp>;
  seller_id?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  version?: InputMaybe<Int_Comparison_Exp>;
};

/** order by max() on columns of table "auction" */
export type Auction_Max_Order_By = {
  bid_table_id?: InputMaybe<Order_By>;
  bid_time_increment?: InputMaybe<Order_By>;
  cancelled_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  ends_at?: InputMaybe<Order_By>;
  fulfilled_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  min_duration?: InputMaybe<Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  reserve_price?: InputMaybe<Order_By>;
  seller_id?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "auction" */
export type Auction_Min_Order_By = {
  bid_table_id?: InputMaybe<Order_By>;
  bid_time_increment?: InputMaybe<Order_By>;
  cancelled_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  ends_at?: InputMaybe<Order_By>;
  fulfilled_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  min_duration?: InputMaybe<Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  reserve_price?: InputMaybe<Order_By>;
  seller_id?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "auction". */
export type Auction_Order_By = {
  auction_bid_table?: InputMaybe<Auction_Bid_Table_Order_By>;
  auction_bids_aggregate?: InputMaybe<Auction_Bid_Aggregate_Order_By>;
  bid_table_id?: InputMaybe<Order_By>;
  bid_time_increment?: InputMaybe<Order_By>;
  cancelled_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  ends_at?: InputMaybe<Order_By>;
  fulfilled_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  min_duration?: InputMaybe<Order_By>;
  objkt?: InputMaybe<Objkt_Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  reserve_price?: InputMaybe<Order_By>;
  seller_id?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  version?: InputMaybe<Order_By>;
};

/** select columns of table "auction" */
export enum Auction_Select_Column {
  /** column name */
  BidTableId = 'bid_table_id',
  /** column name */
  BidTimeIncrement = 'bid_time_increment',
  /** column name */
  CancelledAt = 'cancelled_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EndsAt = 'ends_at',
  /** column name */
  FulfilledAt = 'fulfilled_at',
  /** column name */
  Id = 'id',
  /** column name */
  MinDuration = 'min_duration',
  /** column name */
  ObjktId = 'objkt_id',
  /** column name */
  ReservePrice = 'reserve_price',
  /** column name */
  SellerId = 'seller_id',
  /** column name */
  Version = 'version'
}

/** order by stddev() on columns of table "auction" */
export type Auction_Stddev_Order_By = {
  bid_table_id?: InputMaybe<Order_By>;
  bid_time_increment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  min_duration?: InputMaybe<Order_By>;
  reserve_price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "auction" */
export type Auction_Stddev_Pop_Order_By = {
  bid_table_id?: InputMaybe<Order_By>;
  bid_time_increment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  min_duration?: InputMaybe<Order_By>;
  reserve_price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "auction" */
export type Auction_Stddev_Samp_Order_By = {
  bid_table_id?: InputMaybe<Order_By>;
  bid_time_increment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  min_duration?: InputMaybe<Order_By>;
  reserve_price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "auction" */
export type Auction_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Auction_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Auction_Stream_Cursor_Value_Input = {
  bid_table_id?: InputMaybe<Scalars['Int']['input']>;
  bid_time_increment?: InputMaybe<Scalars['Int']['input']>;
  cancelled_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  ends_at?: InputMaybe<Scalars['timestamptz']['input']>;
  fulfilled_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  min_duration?: InputMaybe<Scalars['Int']['input']>;
  objkt_id?: InputMaybe<Scalars['String']['input']>;
  reserve_price?: InputMaybe<Scalars['bigint']['input']>;
  seller_id?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** order by sum() on columns of table "auction" */
export type Auction_Sum_Order_By = {
  bid_table_id?: InputMaybe<Order_By>;
  bid_time_increment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  min_duration?: InputMaybe<Order_By>;
  reserve_price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "auction" */
export type Auction_Var_Pop_Order_By = {
  bid_table_id?: InputMaybe<Order_By>;
  bid_time_increment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  min_duration?: InputMaybe<Order_By>;
  reserve_price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "auction" */
export type Auction_Var_Samp_Order_By = {
  bid_table_id?: InputMaybe<Order_By>;
  bid_time_increment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  min_duration?: InputMaybe<Order_By>;
  reserve_price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "auction" */
export type Auction_Variance_Order_By = {
  bid_table_id?: InputMaybe<Order_By>;
  bid_time_increment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  min_duration?: InputMaybe<Order_By>;
  reserve_price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** columns and relationships of "squid_processor_base.hot_block" */
export type Base_Indexer = {
  __typename?: 'base_indexer';
  hash: Scalars['String']['output'];
  height: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "squid_processor_base.hot_block". All fields are combined with a logical 'AND'. */
export type Base_Indexer_Bool_Exp = {
  _and?: InputMaybe<Array<Base_Indexer_Bool_Exp>>;
  _not?: InputMaybe<Base_Indexer_Bool_Exp>;
  _or?: InputMaybe<Array<Base_Indexer_Bool_Exp>>;
  hash?: InputMaybe<String_Comparison_Exp>;
  height?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "squid_processor_base.hot_block". */
export type Base_Indexer_Order_By = {
  hash?: InputMaybe<Order_By>;
  height?: InputMaybe<Order_By>;
};

/** select columns of table "squid_processor_base.hot_block" */
export enum Base_Indexer_Select_Column {
  /** column name */
  Hash = 'hash',
  /** column name */
  Height = 'height'
}

/** Streaming cursor of the table "base_indexer" */
export type Base_Indexer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Base_Indexer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Base_Indexer_Stream_Cursor_Value_Input = {
  hash?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** Boolean expression to compare columns of type "bpchar". All fields are combined with logical 'AND'. */
export type Bpchar_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bpchar']['input']>;
  _gt?: InputMaybe<Scalars['bpchar']['input']>;
  _gte?: InputMaybe<Scalars['bpchar']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['bpchar']['input']>;
  _in?: InputMaybe<Array<Scalars['bpchar']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['bpchar']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['bpchar']['input']>;
  _lt?: InputMaybe<Scalars['bpchar']['input']>;
  _lte?: InputMaybe<Scalars['bpchar']['input']>;
  _neq?: InputMaybe<Scalars['bpchar']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['bpchar']['input']>;
  _nin?: InputMaybe<Array<Scalars['bpchar']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['bpchar']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['bpchar']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['bpchar']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['bpchar']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['bpchar']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['bpchar']['input']>;
};

/** columns and relationships of "codex" */
export type Codex = {
  __typename?: 'codex';
  author_id: Scalars['String']['output'];
  /** An array relationship */
  generative_tokens: Array<Generative_Token>;
  /** An aggregate relationship */
  generative_tokens_aggregate: Generative_Token_Aggregate;
  id: Scalars['String']['output'];
  locked: Scalars['Boolean']['output'];
  token_version: Scalars['generative_token_version']['output'];
  type: Scalars['codex_type_enum']['output'];
  /** An object relationship */
  user: User;
  value?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "codex" */
export type CodexGenerative_TokensArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Order_By>>;
  where?: InputMaybe<Generative_Token_Bool_Exp>;
};


/** columns and relationships of "codex" */
export type CodexGenerative_Tokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Order_By>>;
  where?: InputMaybe<Generative_Token_Bool_Exp>;
};

/** order by aggregate values of table "codex" */
export type Codex_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Codex_Max_Order_By>;
  min?: InputMaybe<Codex_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "codex". All fields are combined with a logical 'AND'. */
export type Codex_Bool_Exp = {
  _and?: InputMaybe<Array<Codex_Bool_Exp>>;
  _not?: InputMaybe<Codex_Bool_Exp>;
  _or?: InputMaybe<Array<Codex_Bool_Exp>>;
  author_id?: InputMaybe<String_Comparison_Exp>;
  generative_tokens?: InputMaybe<Generative_Token_Bool_Exp>;
  generative_tokens_aggregate?: InputMaybe<Generative_Token_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  locked?: InputMaybe<Boolean_Comparison_Exp>;
  token_version?: InputMaybe<Generative_Token_Version_Comparison_Exp>;
  type?: InputMaybe<Codex_Type_Enum_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "codex" */
export type Codex_Max_Order_By = {
  author_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  token_version?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "codex" */
export type Codex_Min_Order_By = {
  author_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  token_version?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "codex". */
export type Codex_Order_By = {
  author_id?: InputMaybe<Order_By>;
  generative_tokens_aggregate?: InputMaybe<Generative_Token_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  locked?: InputMaybe<Order_By>;
  token_version?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "codex" */
export enum Codex_Select_Column {
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  Id = 'id',
  /** column name */
  Locked = 'locked',
  /** column name */
  TokenVersion = 'token_version',
  /** column name */
  Type = 'type',
  /** column name */
  Value = 'value'
}

/** Streaming cursor of the table "codex" */
export type Codex_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Codex_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Codex_Stream_Cursor_Value_Input = {
  author_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  locked?: InputMaybe<Scalars['Boolean']['input']>;
  token_version?: InputMaybe<Scalars['generative_token_version']['input']>;
  type?: InputMaybe<Scalars['codex_type_enum']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "codex_type_enum". All fields are combined with logical 'AND'. */
export type Codex_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['codex_type_enum']['input']>;
  _gt?: InputMaybe<Scalars['codex_type_enum']['input']>;
  _gte?: InputMaybe<Scalars['codex_type_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['codex_type_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['codex_type_enum']['input']>;
  _lte?: InputMaybe<Scalars['codex_type_enum']['input']>;
  _neq?: InputMaybe<Scalars['codex_type_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['codex_type_enum']['input']>>;
};

/** columns and relationships of "codex_update_request" */
export type Codex_Update_Request = {
  __typename?: 'codex_update_request';
  codex_id: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  generative_token: Generative_Token;
  status: Scalars['codex_update_request_status_enum']['output'];
  token_id: Scalars['String']['output'];
  token_version: Scalars['generative_token_version']['output'];
};

/** order by aggregate values of table "codex_update_request" */
export type Codex_Update_Request_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Codex_Update_Request_Max_Order_By>;
  min?: InputMaybe<Codex_Update_Request_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "codex_update_request". All fields are combined with a logical 'AND'. */
export type Codex_Update_Request_Bool_Exp = {
  _and?: InputMaybe<Array<Codex_Update_Request_Bool_Exp>>;
  _not?: InputMaybe<Codex_Update_Request_Bool_Exp>;
  _or?: InputMaybe<Array<Codex_Update_Request_Bool_Exp>>;
  codex_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  status?: InputMaybe<Codex_Update_Request_Status_Enum_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
  token_version?: InputMaybe<Generative_Token_Version_Comparison_Exp>;
};

/** order by max() on columns of table "codex_update_request" */
export type Codex_Update_Request_Max_Order_By = {
  codex_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  token_version?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "codex_update_request" */
export type Codex_Update_Request_Min_Order_By = {
  codex_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  token_version?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "codex_update_request". */
export type Codex_Update_Request_Order_By = {
  codex_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  status?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  token_version?: InputMaybe<Order_By>;
};

/** select columns of table "codex_update_request" */
export enum Codex_Update_Request_Select_Column {
  /** column name */
  CodexId = 'codex_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Status = 'status',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  TokenVersion = 'token_version'
}

/** Boolean expression to compare columns of type "codex_update_request_status_enum". All fields are combined with logical 'AND'. */
export type Codex_Update_Request_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['codex_update_request_status_enum']['input']>;
  _gt?: InputMaybe<Scalars['codex_update_request_status_enum']['input']>;
  _gte?: InputMaybe<Scalars['codex_update_request_status_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['codex_update_request_status_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['codex_update_request_status_enum']['input']>;
  _lte?: InputMaybe<Scalars['codex_update_request_status_enum']['input']>;
  _neq?: InputMaybe<Scalars['codex_update_request_status_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['codex_update_request_status_enum']['input']>>;
};

/** Streaming cursor of the table "codex_update_request" */
export type Codex_Update_Request_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Codex_Update_Request_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Codex_Update_Request_Stream_Cursor_Value_Input = {
  codex_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['codex_update_request_status_enum']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
  token_version?: InputMaybe<Scalars['generative_token_version']['input']>;
};

/** columns and relationships of "collaboration" */
export type Collaboration = {
  __typename?: 'collaboration';
  collaboration_contract_id: Scalars['String']['output'];
  /** An object relationship */
  collaborator: User;
  collaborator_id: Scalars['String']['output'];
  /** An object relationship */
  contract: User;
  /** An object relationship */
  user: User;
  /** An object relationship */
  userByCollaboratorId: User;
  /** An object relationship */
  wallet_account?: Maybe<Wallet_Account>;
};

/** order by aggregate values of table "collaboration" */
export type Collaboration_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Collaboration_Max_Order_By>;
  min?: InputMaybe<Collaboration_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "collaboration". All fields are combined with a logical 'AND'. */
export type Collaboration_Bool_Exp = {
  _and?: InputMaybe<Array<Collaboration_Bool_Exp>>;
  _not?: InputMaybe<Collaboration_Bool_Exp>;
  _or?: InputMaybe<Array<Collaboration_Bool_Exp>>;
  collaboration_contract_id?: InputMaybe<String_Comparison_Exp>;
  collaborator?: InputMaybe<User_Bool_Exp>;
  collaborator_id?: InputMaybe<String_Comparison_Exp>;
  contract?: InputMaybe<User_Bool_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userByCollaboratorId?: InputMaybe<User_Bool_Exp>;
  wallet_account?: InputMaybe<Wallet_Account_Bool_Exp>;
};

/** order by max() on columns of table "collaboration" */
export type Collaboration_Max_Order_By = {
  collaboration_contract_id?: InputMaybe<Order_By>;
  collaborator_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "collaboration" */
export type Collaboration_Min_Order_By = {
  collaboration_contract_id?: InputMaybe<Order_By>;
  collaborator_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "collaboration". */
export type Collaboration_Order_By = {
  collaboration_contract_id?: InputMaybe<Order_By>;
  collaborator?: InputMaybe<User_Order_By>;
  collaborator_id?: InputMaybe<Order_By>;
  contract?: InputMaybe<User_Order_By>;
  user?: InputMaybe<User_Order_By>;
  userByCollaboratorId?: InputMaybe<User_Order_By>;
  wallet_account?: InputMaybe<Wallet_Account_Order_By>;
};

/** select columns of table "collaboration" */
export enum Collaboration_Select_Column {
  /** column name */
  CollaborationContractId = 'collaboration_contract_id',
  /** column name */
  CollaboratorId = 'collaborator_id'
}

/** Streaming cursor of the table "collaboration" */
export type Collaboration_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Collaboration_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Collaboration_Stream_Cursor_Value_Input = {
  collaboration_contract_id?: InputMaybe<Scalars['String']['input']>;
  collaborator_id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "collection_offer" */
export type Collection_Offer = {
  __typename?: 'collection_offer';
  amount: Scalars['numeric']['output'];
  buyer_id: Scalars['String']['output'];
  cancelled_at?: Maybe<Scalars['timestamptz']['output']>;
  completed_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  generative_token: Generative_Token;
  id: Scalars['String']['output'];
  initial_amount: Scalars['numeric']['output'];
  is_inactive?: Maybe<Scalars['Boolean']['output']>;
  metadata?: Maybe<Scalars['jsonb']['output']>;
  price: Scalars['numeric']['output'];
  status: Scalars['collection_offer_status_enum']['output'];
  token_id: Scalars['String']['output'];
  /** An object relationship */
  user: User;
  version: Scalars['Int']['output'];
};


/** columns and relationships of "collection_offer" */
export type Collection_OfferMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** order by aggregate values of table "collection_offer" */
export type Collection_Offer_Aggregate_Order_By = {
  avg?: InputMaybe<Collection_Offer_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Collection_Offer_Max_Order_By>;
  min?: InputMaybe<Collection_Offer_Min_Order_By>;
  stddev?: InputMaybe<Collection_Offer_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Collection_Offer_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Collection_Offer_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Collection_Offer_Sum_Order_By>;
  var_pop?: InputMaybe<Collection_Offer_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Collection_Offer_Var_Samp_Order_By>;
  variance?: InputMaybe<Collection_Offer_Variance_Order_By>;
};

/** order by avg() on columns of table "collection_offer" */
export type Collection_Offer_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  initial_amount?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "collection_offer". All fields are combined with a logical 'AND'. */
export type Collection_Offer_Bool_Exp = {
  _and?: InputMaybe<Array<Collection_Offer_Bool_Exp>>;
  _not?: InputMaybe<Collection_Offer_Bool_Exp>;
  _or?: InputMaybe<Array<Collection_Offer_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  buyer_id?: InputMaybe<String_Comparison_Exp>;
  cancelled_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  completed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  initial_amount?: InputMaybe<Numeric_Comparison_Exp>;
  is_inactive?: InputMaybe<Boolean_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  status?: InputMaybe<Collection_Offer_Status_Enum_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  version?: InputMaybe<Int_Comparison_Exp>;
};

/** order by max() on columns of table "collection_offer" */
export type Collection_Offer_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  buyer_id?: InputMaybe<Order_By>;
  cancelled_at?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  initial_amount?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "collection_offer" */
export type Collection_Offer_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  buyer_id?: InputMaybe<Order_By>;
  cancelled_at?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  initial_amount?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "collection_offer". */
export type Collection_Offer_Order_By = {
  amount?: InputMaybe<Order_By>;
  buyer_id?: InputMaybe<Order_By>;
  cancelled_at?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  id?: InputMaybe<Order_By>;
  initial_amount?: InputMaybe<Order_By>;
  is_inactive?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  version?: InputMaybe<Order_By>;
};

/** select columns of table "collection_offer" */
export enum Collection_Offer_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  BuyerId = 'buyer_id',
  /** column name */
  CancelledAt = 'cancelled_at',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InitialAmount = 'initial_amount',
  /** column name */
  IsInactive = 'is_inactive',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Price = 'price',
  /** column name */
  Status = 'status',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  Version = 'version'
}

/** Boolean expression to compare columns of type "collection_offer_status_enum". All fields are combined with logical 'AND'. */
export type Collection_Offer_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['collection_offer_status_enum']['input']>;
  _gt?: InputMaybe<Scalars['collection_offer_status_enum']['input']>;
  _gte?: InputMaybe<Scalars['collection_offer_status_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['collection_offer_status_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['collection_offer_status_enum']['input']>;
  _lte?: InputMaybe<Scalars['collection_offer_status_enum']['input']>;
  _neq?: InputMaybe<Scalars['collection_offer_status_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['collection_offer_status_enum']['input']>>;
};

/** order by stddev() on columns of table "collection_offer" */
export type Collection_Offer_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  initial_amount?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "collection_offer" */
export type Collection_Offer_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  initial_amount?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "collection_offer" */
export type Collection_Offer_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  initial_amount?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "collection_offer" */
export type Collection_Offer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Collection_Offer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Collection_Offer_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  buyer_id?: InputMaybe<Scalars['String']['input']>;
  cancelled_at?: InputMaybe<Scalars['timestamptz']['input']>;
  completed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  initial_amount?: InputMaybe<Scalars['numeric']['input']>;
  is_inactive?: InputMaybe<Scalars['Boolean']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Scalars['collection_offer_status_enum']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** order by sum() on columns of table "collection_offer" */
export type Collection_Offer_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  initial_amount?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "collection_offer" */
export type Collection_Offer_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  initial_amount?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "collection_offer" */
export type Collection_Offer_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  initial_amount?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "collection_offer" */
export type Collection_Offer_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  initial_amount?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "eth_frame_data" */
export type Eth_Frame_Data = {
  __typename?: 'eth_frame_data';
  frame_minter_data?: Maybe<Scalars['jsonb']['output']>;
  id: Scalars['String']['output'];
};


/** columns and relationships of "eth_frame_data" */
export type Eth_Frame_DataFrame_Minter_DataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "eth_frame_data". All fields are combined with a logical 'AND'. */
export type Eth_Frame_Data_Bool_Exp = {
  _and?: InputMaybe<Array<Eth_Frame_Data_Bool_Exp>>;
  _not?: InputMaybe<Eth_Frame_Data_Bool_Exp>;
  _or?: InputMaybe<Array<Eth_Frame_Data_Bool_Exp>>;
  frame_minter_data?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "eth_frame_data". */
export type Eth_Frame_Data_Order_By = {
  frame_minter_data?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "eth_frame_data" */
export enum Eth_Frame_Data_Select_Column {
  /** column name */
  FrameMinterData = 'frame_minter_data',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "eth_frame_data" */
export type Eth_Frame_Data_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Eth_Frame_Data_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Eth_Frame_Data_Stream_Cursor_Value_Input = {
  frame_minter_data?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "squid_processor.hot_block" */
export type Eth_Indexer = {
  __typename?: 'eth_indexer';
  hash: Scalars['String']['output'];
  height: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "squid_processor.hot_block". All fields are combined with a logical 'AND'. */
export type Eth_Indexer_Bool_Exp = {
  _and?: InputMaybe<Array<Eth_Indexer_Bool_Exp>>;
  _not?: InputMaybe<Eth_Indexer_Bool_Exp>;
  _or?: InputMaybe<Array<Eth_Indexer_Bool_Exp>>;
  hash?: InputMaybe<String_Comparison_Exp>;
  height?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "squid_processor.hot_block". */
export type Eth_Indexer_Order_By = {
  hash?: InputMaybe<Order_By>;
  height?: InputMaybe<Order_By>;
};

/** select columns of table "squid_processor.hot_block" */
export enum Eth_Indexer_Select_Column {
  /** column name */
  Hash = 'hash',
  /** column name */
  Height = 'height'
}

/** Streaming cursor of the table "eth_indexer" */
export type Eth_Indexer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Eth_Indexer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Eth_Indexer_Stream_Cursor_Value_Input = {
  hash?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
};

/** columns and relationships of "eth_minter_proceeds" */
export type Eth_Minter_Proceeds = {
  __typename?: 'eth_minter_proceeds';
  amount: Scalars['numeric']['output'];
  chain: Scalars['String']['output'];
  count: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  minter_address: Scalars['String']['output'];
  primary_receiver: Scalars['String']['output'];
  reserve_id?: Maybe<Scalars['numeric']['output']>;
  token_address: Scalars['String']['output'];
  user_address: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "eth_minter_proceeds". All fields are combined with a logical 'AND'. */
export type Eth_Minter_Proceeds_Bool_Exp = {
  _and?: InputMaybe<Array<Eth_Minter_Proceeds_Bool_Exp>>;
  _not?: InputMaybe<Eth_Minter_Proceeds_Bool_Exp>;
  _or?: InputMaybe<Array<Eth_Minter_Proceeds_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  chain?: InputMaybe<String_Comparison_Exp>;
  count?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  minter_address?: InputMaybe<String_Comparison_Exp>;
  primary_receiver?: InputMaybe<String_Comparison_Exp>;
  reserve_id?: InputMaybe<Numeric_Comparison_Exp>;
  token_address?: InputMaybe<String_Comparison_Exp>;
  user_address?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "eth_minter_proceeds". */
export type Eth_Minter_Proceeds_Order_By = {
  amount?: InputMaybe<Order_By>;
  chain?: InputMaybe<Order_By>;
  count?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  minter_address?: InputMaybe<Order_By>;
  primary_receiver?: InputMaybe<Order_By>;
  reserve_id?: InputMaybe<Order_By>;
  token_address?: InputMaybe<Order_By>;
  user_address?: InputMaybe<Order_By>;
};

/** select columns of table "eth_minter_proceeds" */
export enum Eth_Minter_Proceeds_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Chain = 'chain',
  /** column name */
  Count = 'count',
  /** column name */
  Id = 'id',
  /** column name */
  MinterAddress = 'minter_address',
  /** column name */
  PrimaryReceiver = 'primary_receiver',
  /** column name */
  ReserveId = 'reserve_id',
  /** column name */
  TokenAddress = 'token_address',
  /** column name */
  UserAddress = 'user_address'
}

/** Streaming cursor of the table "eth_minter_proceeds" */
export type Eth_Minter_Proceeds_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Eth_Minter_Proceeds_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Eth_Minter_Proceeds_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  minter_address?: InputMaybe<Scalars['String']['input']>;
  primary_receiver?: InputMaybe<Scalars['String']['input']>;
  reserve_id?: InputMaybe<Scalars['numeric']['input']>;
  token_address?: InputMaybe<Scalars['String']['input']>;
  user_address?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "eth_primary_splits" */
export type Eth_Primary_Splits = {
  __typename?: 'eth_primary_splits';
  allocations: Array<Scalars['Int']['output']>;
  chain: Scalars['String']['output'];
  id: Scalars['String']['output'];
  receiver: Scalars['String']['output'];
  receivers: Array<Scalars['String']['output']>;
};

/** Boolean expression to filter rows from the table "eth_primary_splits". All fields are combined with a logical 'AND'. */
export type Eth_Primary_Splits_Bool_Exp = {
  _and?: InputMaybe<Array<Eth_Primary_Splits_Bool_Exp>>;
  _not?: InputMaybe<Eth_Primary_Splits_Bool_Exp>;
  _or?: InputMaybe<Array<Eth_Primary_Splits_Bool_Exp>>;
  allocations?: InputMaybe<Int_Array_Comparison_Exp>;
  chain?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  receiver?: InputMaybe<String_Comparison_Exp>;
  receivers?: InputMaybe<String_Array_Comparison_Exp>;
};

/** Ordering options when selecting data from "eth_primary_splits". */
export type Eth_Primary_Splits_Order_By = {
  allocations?: InputMaybe<Order_By>;
  chain?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  receiver?: InputMaybe<Order_By>;
  receivers?: InputMaybe<Order_By>;
};

/** select columns of table "eth_primary_splits" */
export enum Eth_Primary_Splits_Select_Column {
  /** column name */
  Allocations = 'allocations',
  /** column name */
  Chain = 'chain',
  /** column name */
  Id = 'id',
  /** column name */
  Receiver = 'receiver',
  /** column name */
  Receivers = 'receivers'
}

/** Streaming cursor of the table "eth_primary_splits" */
export type Eth_Primary_Splits_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Eth_Primary_Splits_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Eth_Primary_Splits_Stream_Cursor_Value_Input = {
  allocations?: InputMaybe<Array<Scalars['Int']['input']>>;
  chain?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  receiver?: InputMaybe<Scalars['String']['input']>;
  receivers?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** columns and relationships of "eth_secondary_splits" */
export type Eth_Secondary_Splits = {
  __typename?: 'eth_secondary_splits';
  allocations: Array<Scalars['Int']['output']>;
  basis_points: Scalars['Int']['output'];
  chain: Scalars['String']['output'];
  id: Scalars['String']['output'];
  receiver: Scalars['String']['output'];
  receivers: Array<Scalars['String']['output']>;
};

/** Boolean expression to filter rows from the table "eth_secondary_splits". All fields are combined with a logical 'AND'. */
export type Eth_Secondary_Splits_Bool_Exp = {
  _and?: InputMaybe<Array<Eth_Secondary_Splits_Bool_Exp>>;
  _not?: InputMaybe<Eth_Secondary_Splits_Bool_Exp>;
  _or?: InputMaybe<Array<Eth_Secondary_Splits_Bool_Exp>>;
  allocations?: InputMaybe<Int_Array_Comparison_Exp>;
  basis_points?: InputMaybe<Int_Comparison_Exp>;
  chain?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  receiver?: InputMaybe<String_Comparison_Exp>;
  receivers?: InputMaybe<String_Array_Comparison_Exp>;
};

/** Ordering options when selecting data from "eth_secondary_splits". */
export type Eth_Secondary_Splits_Order_By = {
  allocations?: InputMaybe<Order_By>;
  basis_points?: InputMaybe<Order_By>;
  chain?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  receiver?: InputMaybe<Order_By>;
  receivers?: InputMaybe<Order_By>;
};

/** select columns of table "eth_secondary_splits" */
export enum Eth_Secondary_Splits_Select_Column {
  /** column name */
  Allocations = 'allocations',
  /** column name */
  BasisPoints = 'basis_points',
  /** column name */
  Chain = 'chain',
  /** column name */
  Id = 'id',
  /** column name */
  Receiver = 'receiver',
  /** column name */
  Receivers = 'receivers'
}

/** Streaming cursor of the table "eth_secondary_splits" */
export type Eth_Secondary_Splits_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Eth_Secondary_Splits_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Eth_Secondary_Splits_Stream_Cursor_Value_Input = {
  allocations?: InputMaybe<Array<Scalars['Int']['input']>>;
  basis_points?: InputMaybe<Scalars['Int']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  receiver?: InputMaybe<Scalars['String']['input']>;
  receivers?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** columns and relationships of "eth_user_proceeds" */
export type Eth_User_Proceeds = {
  __typename?: 'eth_user_proceeds';
  chain: Scalars['String']['output'];
  id: Scalars['String']['output'];
  total_proceeds: Scalars['numeric']['output'];
};

/** Boolean expression to filter rows from the table "eth_user_proceeds". All fields are combined with a logical 'AND'. */
export type Eth_User_Proceeds_Bool_Exp = {
  _and?: InputMaybe<Array<Eth_User_Proceeds_Bool_Exp>>;
  _not?: InputMaybe<Eth_User_Proceeds_Bool_Exp>;
  _or?: InputMaybe<Array<Eth_User_Proceeds_Bool_Exp>>;
  chain?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  total_proceeds?: InputMaybe<Numeric_Comparison_Exp>;
};

/** Ordering options when selecting data from "eth_user_proceeds". */
export type Eth_User_Proceeds_Order_By = {
  chain?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  total_proceeds?: InputMaybe<Order_By>;
};

/** select columns of table "eth_user_proceeds" */
export enum Eth_User_Proceeds_Select_Column {
  /** column name */
  Chain = 'chain',
  /** column name */
  Id = 'id',
  /** column name */
  TotalProceeds = 'total_proceeds'
}

/** Streaming cursor of the table "eth_user_proceeds" */
export type Eth_User_Proceeds_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Eth_User_Proceeds_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Eth_User_Proceeds_Stream_Cursor_Value_Input = {
  chain?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  total_proceeds?: InputMaybe<Scalars['numeric']['input']>;
};

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['float8']['input']>;
  _gt?: InputMaybe<Scalars['float8']['input']>;
  _gte?: InputMaybe<Scalars['float8']['input']>;
  _in?: InputMaybe<Array<Scalars['float8']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['float8']['input']>;
  _lte?: InputMaybe<Scalars['float8']['input']>;
  _neq?: InputMaybe<Scalars['float8']['input']>;
  _nin?: InputMaybe<Array<Scalars['float8']['input']>>;
};

/** columns and relationships of "foreign_wallet_account" */
export type Foreign_Wallet_Account = {
  __typename?: 'foreign_wallet_account';
  account?: Maybe<Account>;
  accountId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  user?: Maybe<User>;
  username?: Maybe<Scalars['String']['output']>;
  wallet?: Maybe<Wallet>;
  walletAddress?: Maybe<Scalars['String']['output']>;
};

/** Boolean expression to filter rows from the table "foreign_wallet_account". All fields are combined with a logical 'AND'. */
export type Foreign_Wallet_Account_Bool_Exp = {
  _and?: InputMaybe<Array<Foreign_Wallet_Account_Bool_Exp>>;
  _not?: InputMaybe<Foreign_Wallet_Account_Bool_Exp>;
  _or?: InputMaybe<Array<Foreign_Wallet_Account_Bool_Exp>>;
  accountId?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
  walletAddress?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "foreign_wallet_account". */
export type Foreign_Wallet_Account_Order_By = {
  accountId?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  username?: InputMaybe<Order_By>;
  walletAddress?: InputMaybe<Order_By>;
};

/** select columns of table "foreign_wallet_account" */
export enum Foreign_Wallet_Account_Select_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  Username = 'username',
  /** column name */
  WalletAddress = 'walletAddress'
}

/** Streaming cursor of the table "foreign_wallet_account" */
export type Foreign_Wallet_Account_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Foreign_Wallet_Account_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Foreign_Wallet_Account_Stream_Cursor_Value_Input = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "generative_token" */
export type Generative_Token = {
  __typename?: 'generative_token';
  /** An array relationship */
  _reserves: Array<Reserve>;
  /** An array relationship */
  actions: Array<Action>;
  /** An aggregate relationship */
  actions_aggregate: Action_Aggregate;
  /** An object relationship */
  art_coin?: Maybe<Art_Coin>;
  art_coin_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  author?: Maybe<User>;
  author_id?: Maybe<Scalars['String']['output']>;
  balance: Scalars['numeric']['output'];
  capture_media_id?: Maybe<Scalars['bpchar']['output']>;
  /** A computed field, executes function "token_chain_for_token" */
  chain?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  codex?: Maybe<Codex>;
  codex_id?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  codex_update_requests: Array<Codex_Update_Request>;
  /** An array relationship */
  collection_offers: Array<Collection_Offer>;
  /** An array relationship */
  collectors: Array<Generative_Token_Collected>;
  /** An aggregate relationship */
  collectors_aggregate: Generative_Token_Collected_Aggregate;
  created_at: Scalars['timestamptz']['output'];
  display_still_uri?: Maybe<Scalars['String']['output']>;
  display_uri?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  /** A computed field, executes function "get_features_for_generative_token" */
  features?: Maybe<Scalars['jsonb']['output']>;
  flag: Scalars['generative_token_flag_enum']['output'];
  /** An object relationship */
  frame_settings?: Maybe<Eth_Frame_Data>;
  /** An array relationship */
  generative_token_articles: Array<Article_Generative_Token>;
  generative_uri?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  input_bytes_size: Scalars['Int']['output'];
  is_frame: Scalars['Boolean']['output'];
  iterations_count: Scalars['numeric']['output'];
  labels: Array<Scalars['Int']['output']>;
  lock_end: Scalars['timestamptz']['output'];
  lock_price_for_reserves: Scalars['Boolean']['output'];
  locked_seconds: Scalars['Int']['output'];
  /** An object relationship */
  market_stat?: Maybe<Market_Stats>;
  /** An array relationship */
  market_stats_histories: Array<Market_Stats_History>;
  /** An object relationship */
  media_image?: Maybe<Media_Image>;
  metadata?: Maybe<Scalars['json']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  mint_opens_at: Scalars['timestamptz']['output'];
  /** An array relationship */
  mint_ticket_settings: Array<Mint_Ticket_Settings>;
  /** An array relationship */
  mint_tickets: Array<Mint_Ticket>;
  /** An aggregate relationship */
  mint_tickets_aggregate: Mint_Ticket_Aggregate;
  /** An object relationship */
  moderation_reason?: Maybe<Moderation_Reason>;
  moderation_reason_id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  objkts: Array<Objkt>;
  /** An aggregate relationship */
  objkts_aggregate: Objkt_Aggregate;
  open_editions: Scalars['Boolean']['output'];
  open_editions_ends_at?: Maybe<Scalars['timestamptz']['output']>;
  original_supply: Scalars['numeric']['output'];
  params_definition?: Maybe<Scalars['json']['output']>;
  preview_input_bytes?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  pricing_dutch_auctions: Array<Pricing_Dutch_Auction>;
  /** An array relationship */
  pricing_fixeds: Array<Pricing_Fixed>;
  /** A computed field, executes function "get_random_objkts" */
  random_objkts?: Maybe<Array<Objkt>>;
  /** An array relationship */
  redeemables: Array<Redeemable>;
  /** A computed field, executes function "get_redeemable_percentage" */
  redeemed_percentage?: Maybe<Scalars['float8']['output']>;
  /** An array relationship */
  reports: Array<Report>;
  reserves: Array<ProjectReserves>;
  royalties: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  /** An array relationship */
  splits_primary: Array<Split>;
  /** An array relationship */
  splits_secondary: Array<Split>;
  supply: Scalars['numeric']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  thumbnail_uri?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  transactions: Array<Transaction>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user?: Maybe<User>;
  version: Scalars['generative_token_version']['output'];
  /** An object relationship */
  wallet_account?: Maybe<Wallet_Account>;
};


/** columns and relationships of "generative_token" */
export type Generative_Token_ReservesArgs = {
  distinct_on?: InputMaybe<Array<Reserve_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reserve_Order_By>>;
  where?: InputMaybe<Reserve_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenActionsArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenActions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenCodex_Update_RequestsArgs = {
  distinct_on?: InputMaybe<Array<Codex_Update_Request_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Codex_Update_Request_Order_By>>;
  where?: InputMaybe<Codex_Update_Request_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenCollection_OffersArgs = {
  distinct_on?: InputMaybe<Array<Collection_Offer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collection_Offer_Order_By>>;
  where?: InputMaybe<Collection_Offer_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenCollectorsArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Collected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Collected_Order_By>>;
  where?: InputMaybe<Generative_Token_Collected_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenCollectors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Collected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Collected_Order_By>>;
  where?: InputMaybe<Generative_Token_Collected_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenFeaturesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenGenerative_Token_ArticlesArgs = {
  distinct_on?: InputMaybe<Array<Article_Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Generative_Token_Order_By>>;
  where?: InputMaybe<Article_Generative_Token_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenMarket_Stats_HistoriesArgs = {
  distinct_on?: InputMaybe<Array<Market_Stats_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Stats_History_Order_By>>;
  where?: InputMaybe<Market_Stats_History_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenMint_Ticket_SettingsArgs = {
  distinct_on?: InputMaybe<Array<Mint_Ticket_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mint_Ticket_Settings_Order_By>>;
  where?: InputMaybe<Mint_Ticket_Settings_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenMint_TicketsArgs = {
  distinct_on?: InputMaybe<Array<Mint_Ticket_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mint_Ticket_Order_By>>;
  where?: InputMaybe<Mint_Ticket_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenMint_Tickets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mint_Ticket_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mint_Ticket_Order_By>>;
  where?: InputMaybe<Mint_Ticket_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenObjktsArgs = {
  distinct_on?: InputMaybe<Array<Objkt_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Objkt_Order_By>>;
  where?: InputMaybe<Objkt_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenObjkts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Objkt_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Objkt_Order_By>>;
  where?: InputMaybe<Objkt_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenParams_DefinitionArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenPricing_Dutch_AuctionsArgs = {
  distinct_on?: InputMaybe<Array<Pricing_Dutch_Auction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Pricing_Dutch_Auction_Order_By>>;
  where?: InputMaybe<Pricing_Dutch_Auction_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenPricing_FixedsArgs = {
  distinct_on?: InputMaybe<Array<Pricing_Fixed_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Pricing_Fixed_Order_By>>;
  where?: InputMaybe<Pricing_Fixed_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenRandom_ObjktsArgs = {
  args?: InputMaybe<Random_Objkts_Generative_Token_Args>;
  distinct_on?: InputMaybe<Array<Objkt_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Objkt_Order_By>>;
  where?: InputMaybe<Objkt_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenRedeemablesArgs = {
  distinct_on?: InputMaybe<Array<Redeemable_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redeemable_Order_By>>;
  where?: InputMaybe<Redeemable_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenReportsArgs = {
  distinct_on?: InputMaybe<Array<Report_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Report_Order_By>>;
  where?: InputMaybe<Report_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenSplits_PrimaryArgs = {
  distinct_on?: InputMaybe<Array<Split_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Split_Order_By>>;
  where?: InputMaybe<Split_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenSplits_SecondaryArgs = {
  distinct_on?: InputMaybe<Array<Split_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Split_Order_By>>;
  where?: InputMaybe<Split_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transaction_Order_By>>;
  where?: InputMaybe<Transaction_Bool_Exp>;
};

/** aggregated selection of "generative_token" */
export type Generative_Token_Aggregate = {
  __typename?: 'generative_token_aggregate';
  aggregate?: Maybe<Generative_Token_Aggregate_Fields>;
  nodes: Array<Generative_Token>;
};

export type Generative_Token_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Generative_Token_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Generative_Token_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Generative_Token_Aggregate_Bool_Exp_Count>;
};

export type Generative_Token_Aggregate_Bool_Exp_Bool_And = {
  arguments: Generative_Token_Select_Column_Generative_Token_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Generative_Token_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Generative_Token_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Generative_Token_Select_Column_Generative_Token_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Generative_Token_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Generative_Token_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Generative_Token_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Generative_Token_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "generative_token" */
export type Generative_Token_Aggregate_Fields = {
  __typename?: 'generative_token_aggregate_fields';
  avg?: Maybe<Generative_Token_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Generative_Token_Max_Fields>;
  min?: Maybe<Generative_Token_Min_Fields>;
  stddev?: Maybe<Generative_Token_Stddev_Fields>;
  stddev_pop?: Maybe<Generative_Token_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Generative_Token_Stddev_Samp_Fields>;
  sum?: Maybe<Generative_Token_Sum_Fields>;
  var_pop?: Maybe<Generative_Token_Var_Pop_Fields>;
  var_samp?: Maybe<Generative_Token_Var_Samp_Fields>;
  variance?: Maybe<Generative_Token_Variance_Fields>;
};


/** aggregate fields of "generative_token" */
export type Generative_Token_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Generative_Token_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "generative_token" */
export type Generative_Token_Aggregate_Order_By = {
  avg?: InputMaybe<Generative_Token_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Generative_Token_Max_Order_By>;
  min?: InputMaybe<Generative_Token_Min_Order_By>;
  stddev?: InputMaybe<Generative_Token_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Generative_Token_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Generative_Token_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Generative_Token_Sum_Order_By>;
  var_pop?: InputMaybe<Generative_Token_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Generative_Token_Var_Samp_Order_By>;
  variance?: InputMaybe<Generative_Token_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Generative_Token_Avg_Fields = {
  __typename?: 'generative_token_avg_fields';
  balance?: Maybe<Scalars['Float']['output']>;
  input_bytes_size?: Maybe<Scalars['Float']['output']>;
  iterations_count?: Maybe<Scalars['Float']['output']>;
  locked_seconds?: Maybe<Scalars['Float']['output']>;
  original_supply?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "get_redeemable_percentage" */
  redeemed_percentage?: Maybe<Scalars['float8']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "generative_token" */
export type Generative_Token_Avg_Order_By = {
  balance?: InputMaybe<Order_By>;
  input_bytes_size?: InputMaybe<Order_By>;
  iterations_count?: InputMaybe<Order_By>;
  locked_seconds?: InputMaybe<Order_By>;
  original_supply?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "generative_token". All fields are combined with a logical 'AND'. */
export type Generative_Token_Bool_Exp = {
  _and?: InputMaybe<Array<Generative_Token_Bool_Exp>>;
  _not?: InputMaybe<Generative_Token_Bool_Exp>;
  _or?: InputMaybe<Array<Generative_Token_Bool_Exp>>;
  _reserves?: InputMaybe<Reserve_Bool_Exp>;
  actions?: InputMaybe<Action_Bool_Exp>;
  actions_aggregate?: InputMaybe<Action_Aggregate_Bool_Exp>;
  art_coin?: InputMaybe<Art_Coin_Bool_Exp>;
  art_coin_id?: InputMaybe<String_Comparison_Exp>;
  author?: InputMaybe<User_Bool_Exp>;
  author_id?: InputMaybe<String_Comparison_Exp>;
  balance?: InputMaybe<Numeric_Comparison_Exp>;
  capture_media_id?: InputMaybe<Bpchar_Comparison_Exp>;
  chain?: InputMaybe<String_Comparison_Exp>;
  codex?: InputMaybe<Codex_Bool_Exp>;
  codex_id?: InputMaybe<String_Comparison_Exp>;
  codex_update_requests?: InputMaybe<Codex_Update_Request_Bool_Exp>;
  collection_offers?: InputMaybe<Collection_Offer_Bool_Exp>;
  collectors?: InputMaybe<Generative_Token_Collected_Bool_Exp>;
  collectors_aggregate?: InputMaybe<Generative_Token_Collected_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  display_still_uri?: InputMaybe<String_Comparison_Exp>;
  display_uri?: InputMaybe<String_Comparison_Exp>;
  enabled?: InputMaybe<Boolean_Comparison_Exp>;
  features?: InputMaybe<Jsonb_Comparison_Exp>;
  flag?: InputMaybe<Generative_Token_Flag_Enum_Comparison_Exp>;
  frame_settings?: InputMaybe<Eth_Frame_Data_Bool_Exp>;
  generative_token_articles?: InputMaybe<Article_Generative_Token_Bool_Exp>;
  generative_uri?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  input_bytes_size?: InputMaybe<Int_Comparison_Exp>;
  is_frame?: InputMaybe<Boolean_Comparison_Exp>;
  iterations_count?: InputMaybe<Numeric_Comparison_Exp>;
  labels?: InputMaybe<Int_Array_Comparison_Exp>;
  lock_end?: InputMaybe<Timestamptz_Comparison_Exp>;
  lock_price_for_reserves?: InputMaybe<Boolean_Comparison_Exp>;
  locked_seconds?: InputMaybe<Int_Comparison_Exp>;
  market_stat?: InputMaybe<Market_Stats_Bool_Exp>;
  market_stats_histories?: InputMaybe<Market_Stats_History_Bool_Exp>;
  media_image?: InputMaybe<Media_Image_Bool_Exp>;
  metadata?: InputMaybe<Json_Comparison_Exp>;
  metadata_uri?: InputMaybe<String_Comparison_Exp>;
  mint_opens_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  mint_ticket_settings?: InputMaybe<Mint_Ticket_Settings_Bool_Exp>;
  mint_tickets?: InputMaybe<Mint_Ticket_Bool_Exp>;
  mint_tickets_aggregate?: InputMaybe<Mint_Ticket_Aggregate_Bool_Exp>;
  moderation_reason?: InputMaybe<Moderation_Reason_Bool_Exp>;
  moderation_reason_id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  objkts?: InputMaybe<Objkt_Bool_Exp>;
  objkts_aggregate?: InputMaybe<Objkt_Aggregate_Bool_Exp>;
  open_editions?: InputMaybe<Boolean_Comparison_Exp>;
  open_editions_ends_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  original_supply?: InputMaybe<Numeric_Comparison_Exp>;
  params_definition?: InputMaybe<Json_Comparison_Exp>;
  preview_input_bytes?: InputMaybe<String_Comparison_Exp>;
  pricing_dutch_auctions?: InputMaybe<Pricing_Dutch_Auction_Bool_Exp>;
  pricing_fixeds?: InputMaybe<Pricing_Fixed_Bool_Exp>;
  redeemables?: InputMaybe<Redeemable_Bool_Exp>;
  redeemed_percentage?: InputMaybe<Float8_Comparison_Exp>;
  reports?: InputMaybe<Report_Bool_Exp>;
  royalties?: InputMaybe<Int_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  splits_primary?: InputMaybe<Split_Bool_Exp>;
  splits_secondary?: InputMaybe<Split_Bool_Exp>;
  supply?: InputMaybe<Numeric_Comparison_Exp>;
  tags?: InputMaybe<String_Array_Comparison_Exp>;
  thumbnail_uri?: InputMaybe<String_Comparison_Exp>;
  transactions?: InputMaybe<Transaction_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  version?: InputMaybe<Generative_Token_Version_Comparison_Exp>;
  wallet_account?: InputMaybe<Wallet_Account_Bool_Exp>;
};

/** columns and relationships of "generative_token_collected" */
export type Generative_Token_Collected = {
  __typename?: 'generative_token_collected';
  generative_token_id?: Maybe<Scalars['String']['output']>;
  total_collected?: Maybe<Scalars['bigint']['output']>;
  /** An object relationship */
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "generative_token_collected" */
export type Generative_Token_Collected_Aggregate = {
  __typename?: 'generative_token_collected_aggregate';
  aggregate?: Maybe<Generative_Token_Collected_Aggregate_Fields>;
  nodes: Array<Generative_Token_Collected>;
};

export type Generative_Token_Collected_Aggregate_Bool_Exp = {
  count?: InputMaybe<Generative_Token_Collected_Aggregate_Bool_Exp_Count>;
};

export type Generative_Token_Collected_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Generative_Token_Collected_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Generative_Token_Collected_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "generative_token_collected" */
export type Generative_Token_Collected_Aggregate_Fields = {
  __typename?: 'generative_token_collected_aggregate_fields';
  avg?: Maybe<Generative_Token_Collected_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Generative_Token_Collected_Max_Fields>;
  min?: Maybe<Generative_Token_Collected_Min_Fields>;
  stddev?: Maybe<Generative_Token_Collected_Stddev_Fields>;
  stddev_pop?: Maybe<Generative_Token_Collected_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Generative_Token_Collected_Stddev_Samp_Fields>;
  sum?: Maybe<Generative_Token_Collected_Sum_Fields>;
  var_pop?: Maybe<Generative_Token_Collected_Var_Pop_Fields>;
  var_samp?: Maybe<Generative_Token_Collected_Var_Samp_Fields>;
  variance?: Maybe<Generative_Token_Collected_Variance_Fields>;
};


/** aggregate fields of "generative_token_collected" */
export type Generative_Token_Collected_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Generative_Token_Collected_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "generative_token_collected" */
export type Generative_Token_Collected_Aggregate_Order_By = {
  avg?: InputMaybe<Generative_Token_Collected_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Generative_Token_Collected_Max_Order_By>;
  min?: InputMaybe<Generative_Token_Collected_Min_Order_By>;
  stddev?: InputMaybe<Generative_Token_Collected_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Generative_Token_Collected_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Generative_Token_Collected_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Generative_Token_Collected_Sum_Order_By>;
  var_pop?: InputMaybe<Generative_Token_Collected_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Generative_Token_Collected_Var_Samp_Order_By>;
  variance?: InputMaybe<Generative_Token_Collected_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Generative_Token_Collected_Avg_Fields = {
  __typename?: 'generative_token_collected_avg_fields';
  total_collected?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "generative_token_collected" */
export type Generative_Token_Collected_Avg_Order_By = {
  total_collected?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "generative_token_collected". All fields are combined with a logical 'AND'. */
export type Generative_Token_Collected_Bool_Exp = {
  _and?: InputMaybe<Array<Generative_Token_Collected_Bool_Exp>>;
  _not?: InputMaybe<Generative_Token_Collected_Bool_Exp>;
  _or?: InputMaybe<Array<Generative_Token_Collected_Bool_Exp>>;
  generative_token_id?: InputMaybe<String_Comparison_Exp>;
  total_collected?: InputMaybe<Bigint_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Generative_Token_Collected_Max_Fields = {
  __typename?: 'generative_token_collected_max_fields';
  generative_token_id?: Maybe<Scalars['String']['output']>;
  total_collected?: Maybe<Scalars['bigint']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "generative_token_collected" */
export type Generative_Token_Collected_Max_Order_By = {
  generative_token_id?: InputMaybe<Order_By>;
  total_collected?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Generative_Token_Collected_Min_Fields = {
  __typename?: 'generative_token_collected_min_fields';
  generative_token_id?: Maybe<Scalars['String']['output']>;
  total_collected?: Maybe<Scalars['bigint']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "generative_token_collected" */
export type Generative_Token_Collected_Min_Order_By = {
  generative_token_id?: InputMaybe<Order_By>;
  total_collected?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "generative_token_collected". */
export type Generative_Token_Collected_Order_By = {
  generative_token_id?: InputMaybe<Order_By>;
  total_collected?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "generative_token_collected" */
export enum Generative_Token_Collected_Select_Column {
  /** column name */
  GenerativeTokenId = 'generative_token_id',
  /** column name */
  TotalCollected = 'total_collected',
  /** column name */
  UserId = 'user_id'
}

/** aggregate stddev on columns */
export type Generative_Token_Collected_Stddev_Fields = {
  __typename?: 'generative_token_collected_stddev_fields';
  total_collected?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "generative_token_collected" */
export type Generative_Token_Collected_Stddev_Order_By = {
  total_collected?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Generative_Token_Collected_Stddev_Pop_Fields = {
  __typename?: 'generative_token_collected_stddev_pop_fields';
  total_collected?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "generative_token_collected" */
export type Generative_Token_Collected_Stddev_Pop_Order_By = {
  total_collected?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Generative_Token_Collected_Stddev_Samp_Fields = {
  __typename?: 'generative_token_collected_stddev_samp_fields';
  total_collected?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "generative_token_collected" */
export type Generative_Token_Collected_Stddev_Samp_Order_By = {
  total_collected?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "generative_token_collected" */
export type Generative_Token_Collected_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Generative_Token_Collected_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Generative_Token_Collected_Stream_Cursor_Value_Input = {
  generative_token_id?: InputMaybe<Scalars['String']['input']>;
  total_collected?: InputMaybe<Scalars['bigint']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Generative_Token_Collected_Sum_Fields = {
  __typename?: 'generative_token_collected_sum_fields';
  total_collected?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "generative_token_collected" */
export type Generative_Token_Collected_Sum_Order_By = {
  total_collected?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Generative_Token_Collected_Var_Pop_Fields = {
  __typename?: 'generative_token_collected_var_pop_fields';
  total_collected?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "generative_token_collected" */
export type Generative_Token_Collected_Var_Pop_Order_By = {
  total_collected?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Generative_Token_Collected_Var_Samp_Fields = {
  __typename?: 'generative_token_collected_var_samp_fields';
  total_collected?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "generative_token_collected" */
export type Generative_Token_Collected_Var_Samp_Order_By = {
  total_collected?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Generative_Token_Collected_Variance_Fields = {
  __typename?: 'generative_token_collected_variance_fields';
  total_collected?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "generative_token_collected" */
export type Generative_Token_Collected_Variance_Order_By = {
  total_collected?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "generative_token_flag_enum". All fields are combined with logical 'AND'. */
export type Generative_Token_Flag_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['generative_token_flag_enum']['input']>;
  _gt?: InputMaybe<Scalars['generative_token_flag_enum']['input']>;
  _gte?: InputMaybe<Scalars['generative_token_flag_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['generative_token_flag_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['generative_token_flag_enum']['input']>;
  _lte?: InputMaybe<Scalars['generative_token_flag_enum']['input']>;
  _neq?: InputMaybe<Scalars['generative_token_flag_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['generative_token_flag_enum']['input']>>;
};

/** aggregate max on columns */
export type Generative_Token_Max_Fields = {
  __typename?: 'generative_token_max_fields';
  art_coin_id?: Maybe<Scalars['String']['output']>;
  author_id?: Maybe<Scalars['String']['output']>;
  balance?: Maybe<Scalars['numeric']['output']>;
  capture_media_id?: Maybe<Scalars['bpchar']['output']>;
  /** A computed field, executes function "token_chain_for_token" */
  chain?: Maybe<Scalars['String']['output']>;
  codex_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  display_still_uri?: Maybe<Scalars['String']['output']>;
  display_uri?: Maybe<Scalars['String']['output']>;
  flag?: Maybe<Scalars['generative_token_flag_enum']['output']>;
  generative_uri?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  input_bytes_size?: Maybe<Scalars['Int']['output']>;
  iterations_count?: Maybe<Scalars['numeric']['output']>;
  labels?: Maybe<Array<Scalars['Int']['output']>>;
  lock_end?: Maybe<Scalars['timestamptz']['output']>;
  locked_seconds?: Maybe<Scalars['Int']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  mint_opens_at?: Maybe<Scalars['timestamptz']['output']>;
  moderation_reason_id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  open_editions_ends_at?: Maybe<Scalars['timestamptz']['output']>;
  original_supply?: Maybe<Scalars['numeric']['output']>;
  preview_input_bytes?: Maybe<Scalars['String']['output']>;
  /** A computed field, executes function "get_redeemable_percentage" */
  redeemed_percentage?: Maybe<Scalars['float8']['output']>;
  royalties?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  thumbnail_uri?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  version?: Maybe<Scalars['generative_token_version']['output']>;
};

/** order by max() on columns of table "generative_token" */
export type Generative_Token_Max_Order_By = {
  art_coin_id?: InputMaybe<Order_By>;
  author_id?: InputMaybe<Order_By>;
  balance?: InputMaybe<Order_By>;
  capture_media_id?: InputMaybe<Order_By>;
  codex_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  display_still_uri?: InputMaybe<Order_By>;
  display_uri?: InputMaybe<Order_By>;
  flag?: InputMaybe<Order_By>;
  generative_uri?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  input_bytes_size?: InputMaybe<Order_By>;
  iterations_count?: InputMaybe<Order_By>;
  labels?: InputMaybe<Order_By>;
  lock_end?: InputMaybe<Order_By>;
  locked_seconds?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  mint_opens_at?: InputMaybe<Order_By>;
  moderation_reason_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  open_editions_ends_at?: InputMaybe<Order_By>;
  original_supply?: InputMaybe<Order_By>;
  preview_input_bytes?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
  tags?: InputMaybe<Order_By>;
  thumbnail_uri?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Generative_Token_Min_Fields = {
  __typename?: 'generative_token_min_fields';
  art_coin_id?: Maybe<Scalars['String']['output']>;
  author_id?: Maybe<Scalars['String']['output']>;
  balance?: Maybe<Scalars['numeric']['output']>;
  capture_media_id?: Maybe<Scalars['bpchar']['output']>;
  /** A computed field, executes function "token_chain_for_token" */
  chain?: Maybe<Scalars['String']['output']>;
  codex_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  display_still_uri?: Maybe<Scalars['String']['output']>;
  display_uri?: Maybe<Scalars['String']['output']>;
  flag?: Maybe<Scalars['generative_token_flag_enum']['output']>;
  generative_uri?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  input_bytes_size?: Maybe<Scalars['Int']['output']>;
  iterations_count?: Maybe<Scalars['numeric']['output']>;
  labels?: Maybe<Array<Scalars['Int']['output']>>;
  lock_end?: Maybe<Scalars['timestamptz']['output']>;
  locked_seconds?: Maybe<Scalars['Int']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  mint_opens_at?: Maybe<Scalars['timestamptz']['output']>;
  moderation_reason_id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  open_editions_ends_at?: Maybe<Scalars['timestamptz']['output']>;
  original_supply?: Maybe<Scalars['numeric']['output']>;
  preview_input_bytes?: Maybe<Scalars['String']['output']>;
  /** A computed field, executes function "get_redeemable_percentage" */
  redeemed_percentage?: Maybe<Scalars['float8']['output']>;
  royalties?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  thumbnail_uri?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  version?: Maybe<Scalars['generative_token_version']['output']>;
};

/** order by min() on columns of table "generative_token" */
export type Generative_Token_Min_Order_By = {
  art_coin_id?: InputMaybe<Order_By>;
  author_id?: InputMaybe<Order_By>;
  balance?: InputMaybe<Order_By>;
  capture_media_id?: InputMaybe<Order_By>;
  codex_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  display_still_uri?: InputMaybe<Order_By>;
  display_uri?: InputMaybe<Order_By>;
  flag?: InputMaybe<Order_By>;
  generative_uri?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  input_bytes_size?: InputMaybe<Order_By>;
  iterations_count?: InputMaybe<Order_By>;
  labels?: InputMaybe<Order_By>;
  lock_end?: InputMaybe<Order_By>;
  locked_seconds?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  mint_opens_at?: InputMaybe<Order_By>;
  moderation_reason_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  open_editions_ends_at?: InputMaybe<Order_By>;
  original_supply?: InputMaybe<Order_By>;
  preview_input_bytes?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
  tags?: InputMaybe<Order_By>;
  thumbnail_uri?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "generative_token". */
export type Generative_Token_Order_By = {
  _reserves_aggregate?: InputMaybe<Reserve_Aggregate_Order_By>;
  actions_aggregate?: InputMaybe<Action_Aggregate_Order_By>;
  art_coin?: InputMaybe<Art_Coin_Order_By>;
  art_coin_id?: InputMaybe<Order_By>;
  author?: InputMaybe<User_Order_By>;
  author_id?: InputMaybe<Order_By>;
  balance?: InputMaybe<Order_By>;
  capture_media_id?: InputMaybe<Order_By>;
  chain?: InputMaybe<Order_By>;
  codex?: InputMaybe<Codex_Order_By>;
  codex_id?: InputMaybe<Order_By>;
  codex_update_requests_aggregate?: InputMaybe<Codex_Update_Request_Aggregate_Order_By>;
  collection_offers_aggregate?: InputMaybe<Collection_Offer_Aggregate_Order_By>;
  collectors_aggregate?: InputMaybe<Generative_Token_Collected_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  display_still_uri?: InputMaybe<Order_By>;
  display_uri?: InputMaybe<Order_By>;
  enabled?: InputMaybe<Order_By>;
  features?: InputMaybe<Order_By>;
  flag?: InputMaybe<Order_By>;
  frame_settings?: InputMaybe<Eth_Frame_Data_Order_By>;
  generative_token_articles_aggregate?: InputMaybe<Article_Generative_Token_Aggregate_Order_By>;
  generative_uri?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  input_bytes_size?: InputMaybe<Order_By>;
  is_frame?: InputMaybe<Order_By>;
  iterations_count?: InputMaybe<Order_By>;
  labels?: InputMaybe<Order_By>;
  lock_end?: InputMaybe<Order_By>;
  lock_price_for_reserves?: InputMaybe<Order_By>;
  locked_seconds?: InputMaybe<Order_By>;
  market_stat?: InputMaybe<Market_Stats_Order_By>;
  market_stats_histories_aggregate?: InputMaybe<Market_Stats_History_Aggregate_Order_By>;
  media_image?: InputMaybe<Media_Image_Order_By>;
  metadata?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  mint_opens_at?: InputMaybe<Order_By>;
  mint_ticket_settings_aggregate?: InputMaybe<Mint_Ticket_Settings_Aggregate_Order_By>;
  mint_tickets_aggregate?: InputMaybe<Mint_Ticket_Aggregate_Order_By>;
  moderation_reason?: InputMaybe<Moderation_Reason_Order_By>;
  moderation_reason_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  objkts_aggregate?: InputMaybe<Objkt_Aggregate_Order_By>;
  open_editions?: InputMaybe<Order_By>;
  open_editions_ends_at?: InputMaybe<Order_By>;
  original_supply?: InputMaybe<Order_By>;
  params_definition?: InputMaybe<Order_By>;
  preview_input_bytes?: InputMaybe<Order_By>;
  pricing_dutch_auctions_aggregate?: InputMaybe<Pricing_Dutch_Auction_Aggregate_Order_By>;
  pricing_fixeds_aggregate?: InputMaybe<Pricing_Fixed_Aggregate_Order_By>;
  redeemables_aggregate?: InputMaybe<Redeemable_Aggregate_Order_By>;
  redeemed_percentage?: InputMaybe<Order_By>;
  reports_aggregate?: InputMaybe<Report_Aggregate_Order_By>;
  royalties?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  splits_primary_aggregate?: InputMaybe<Split_Aggregate_Order_By>;
  splits_secondary_aggregate?: InputMaybe<Split_Aggregate_Order_By>;
  supply?: InputMaybe<Order_By>;
  tags?: InputMaybe<Order_By>;
  thumbnail_uri?: InputMaybe<Order_By>;
  transactions_aggregate?: InputMaybe<Transaction_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  version?: InputMaybe<Order_By>;
  wallet_account?: InputMaybe<Wallet_Account_Order_By>;
};

/** select columns of table "generative_token" */
export enum Generative_Token_Select_Column {
  /** column name */
  ArtCoinId = 'art_coin_id',
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  Balance = 'balance',
  /** column name */
  CaptureMediaId = 'capture_media_id',
  /** column name */
  CodexId = 'codex_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DisplayStillUri = 'display_still_uri',
  /** column name */
  DisplayUri = 'display_uri',
  /** column name */
  Enabled = 'enabled',
  /** column name */
  Flag = 'flag',
  /** column name */
  GenerativeUri = 'generative_uri',
  /** column name */
  Id = 'id',
  /** column name */
  InputBytesSize = 'input_bytes_size',
  /** column name */
  IsFrame = 'is_frame',
  /** column name */
  IterationsCount = 'iterations_count',
  /** column name */
  Labels = 'labels',
  /** column name */
  LockEnd = 'lock_end',
  /** column name */
  LockPriceForReserves = 'lock_price_for_reserves',
  /** column name */
  LockedSeconds = 'locked_seconds',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MetadataUri = 'metadata_uri',
  /** column name */
  MintOpensAt = 'mint_opens_at',
  /** column name */
  ModerationReasonId = 'moderation_reason_id',
  /** column name */
  Name = 'name',
  /** column name */
  OpenEditions = 'open_editions',
  /** column name */
  OpenEditionsEndsAt = 'open_editions_ends_at',
  /** column name */
  OriginalSupply = 'original_supply',
  /** column name */
  ParamsDefinition = 'params_definition',
  /** column name */
  PreviewInputBytes = 'preview_input_bytes',
  /** column name */
  Royalties = 'royalties',
  /** column name */
  Slug = 'slug',
  /** column name */
  Supply = 'supply',
  /** column name */
  Tags = 'tags',
  /** column name */
  ThumbnailUri = 'thumbnail_uri',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Version = 'version'
}

/** select "generative_token_aggregate_bool_exp_bool_and_arguments_columns" columns of table "generative_token" */
export enum Generative_Token_Select_Column_Generative_Token_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Enabled = 'enabled',
  /** column name */
  IsFrame = 'is_frame',
  /** column name */
  LockPriceForReserves = 'lock_price_for_reserves',
  /** column name */
  OpenEditions = 'open_editions'
}

/** select "generative_token_aggregate_bool_exp_bool_or_arguments_columns" columns of table "generative_token" */
export enum Generative_Token_Select_Column_Generative_Token_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Enabled = 'enabled',
  /** column name */
  IsFrame = 'is_frame',
  /** column name */
  LockPriceForReserves = 'lock_price_for_reserves',
  /** column name */
  OpenEditions = 'open_editions'
}

/** aggregate stddev on columns */
export type Generative_Token_Stddev_Fields = {
  __typename?: 'generative_token_stddev_fields';
  balance?: Maybe<Scalars['Float']['output']>;
  input_bytes_size?: Maybe<Scalars['Float']['output']>;
  iterations_count?: Maybe<Scalars['Float']['output']>;
  locked_seconds?: Maybe<Scalars['Float']['output']>;
  original_supply?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "get_redeemable_percentage" */
  redeemed_percentage?: Maybe<Scalars['float8']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "generative_token" */
export type Generative_Token_Stddev_Order_By = {
  balance?: InputMaybe<Order_By>;
  input_bytes_size?: InputMaybe<Order_By>;
  iterations_count?: InputMaybe<Order_By>;
  locked_seconds?: InputMaybe<Order_By>;
  original_supply?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Generative_Token_Stddev_Pop_Fields = {
  __typename?: 'generative_token_stddev_pop_fields';
  balance?: Maybe<Scalars['Float']['output']>;
  input_bytes_size?: Maybe<Scalars['Float']['output']>;
  iterations_count?: Maybe<Scalars['Float']['output']>;
  locked_seconds?: Maybe<Scalars['Float']['output']>;
  original_supply?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "get_redeemable_percentage" */
  redeemed_percentage?: Maybe<Scalars['float8']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "generative_token" */
export type Generative_Token_Stddev_Pop_Order_By = {
  balance?: InputMaybe<Order_By>;
  input_bytes_size?: InputMaybe<Order_By>;
  iterations_count?: InputMaybe<Order_By>;
  locked_seconds?: InputMaybe<Order_By>;
  original_supply?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Generative_Token_Stddev_Samp_Fields = {
  __typename?: 'generative_token_stddev_samp_fields';
  balance?: Maybe<Scalars['Float']['output']>;
  input_bytes_size?: Maybe<Scalars['Float']['output']>;
  iterations_count?: Maybe<Scalars['Float']['output']>;
  locked_seconds?: Maybe<Scalars['Float']['output']>;
  original_supply?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "get_redeemable_percentage" */
  redeemed_percentage?: Maybe<Scalars['float8']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "generative_token" */
export type Generative_Token_Stddev_Samp_Order_By = {
  balance?: InputMaybe<Order_By>;
  input_bytes_size?: InputMaybe<Order_By>;
  iterations_count?: InputMaybe<Order_By>;
  locked_seconds?: InputMaybe<Order_By>;
  original_supply?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "generative_token" */
export type Generative_Token_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Generative_Token_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Generative_Token_Stream_Cursor_Value_Input = {
  art_coin_id?: InputMaybe<Scalars['String']['input']>;
  author_id?: InputMaybe<Scalars['String']['input']>;
  balance?: InputMaybe<Scalars['numeric']['input']>;
  capture_media_id?: InputMaybe<Scalars['bpchar']['input']>;
  codex_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  display_still_uri?: InputMaybe<Scalars['String']['input']>;
  display_uri?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  flag?: InputMaybe<Scalars['generative_token_flag_enum']['input']>;
  generative_uri?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  input_bytes_size?: InputMaybe<Scalars['Int']['input']>;
  is_frame?: InputMaybe<Scalars['Boolean']['input']>;
  iterations_count?: InputMaybe<Scalars['numeric']['input']>;
  labels?: InputMaybe<Array<Scalars['Int']['input']>>;
  lock_end?: InputMaybe<Scalars['timestamptz']['input']>;
  lock_price_for_reserves?: InputMaybe<Scalars['Boolean']['input']>;
  locked_seconds?: InputMaybe<Scalars['Int']['input']>;
  metadata?: InputMaybe<Scalars['json']['input']>;
  metadata_uri?: InputMaybe<Scalars['String']['input']>;
  mint_opens_at?: InputMaybe<Scalars['timestamptz']['input']>;
  moderation_reason_id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  open_editions?: InputMaybe<Scalars['Boolean']['input']>;
  open_editions_ends_at?: InputMaybe<Scalars['timestamptz']['input']>;
  original_supply?: InputMaybe<Scalars['numeric']['input']>;
  params_definition?: InputMaybe<Scalars['json']['input']>;
  preview_input_bytes?: InputMaybe<Scalars['String']['input']>;
  royalties?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  supply?: InputMaybe<Scalars['numeric']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnail_uri?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  version?: InputMaybe<Scalars['generative_token_version']['input']>;
};

/** aggregate sum on columns */
export type Generative_Token_Sum_Fields = {
  __typename?: 'generative_token_sum_fields';
  balance?: Maybe<Scalars['numeric']['output']>;
  input_bytes_size?: Maybe<Scalars['Int']['output']>;
  iterations_count?: Maybe<Scalars['numeric']['output']>;
  locked_seconds?: Maybe<Scalars['Int']['output']>;
  original_supply?: Maybe<Scalars['numeric']['output']>;
  /** A computed field, executes function "get_redeemable_percentage" */
  redeemed_percentage?: Maybe<Scalars['float8']['output']>;
  royalties?: Maybe<Scalars['Int']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "generative_token" */
export type Generative_Token_Sum_Order_By = {
  balance?: InputMaybe<Order_By>;
  input_bytes_size?: InputMaybe<Order_By>;
  iterations_count?: InputMaybe<Order_By>;
  locked_seconds?: InputMaybe<Order_By>;
  original_supply?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Generative_Token_Var_Pop_Fields = {
  __typename?: 'generative_token_var_pop_fields';
  balance?: Maybe<Scalars['Float']['output']>;
  input_bytes_size?: Maybe<Scalars['Float']['output']>;
  iterations_count?: Maybe<Scalars['Float']['output']>;
  locked_seconds?: Maybe<Scalars['Float']['output']>;
  original_supply?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "get_redeemable_percentage" */
  redeemed_percentage?: Maybe<Scalars['float8']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "generative_token" */
export type Generative_Token_Var_Pop_Order_By = {
  balance?: InputMaybe<Order_By>;
  input_bytes_size?: InputMaybe<Order_By>;
  iterations_count?: InputMaybe<Order_By>;
  locked_seconds?: InputMaybe<Order_By>;
  original_supply?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Generative_Token_Var_Samp_Fields = {
  __typename?: 'generative_token_var_samp_fields';
  balance?: Maybe<Scalars['Float']['output']>;
  input_bytes_size?: Maybe<Scalars['Float']['output']>;
  iterations_count?: Maybe<Scalars['Float']['output']>;
  locked_seconds?: Maybe<Scalars['Float']['output']>;
  original_supply?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "get_redeemable_percentage" */
  redeemed_percentage?: Maybe<Scalars['float8']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "generative_token" */
export type Generative_Token_Var_Samp_Order_By = {
  balance?: InputMaybe<Order_By>;
  input_bytes_size?: InputMaybe<Order_By>;
  iterations_count?: InputMaybe<Order_By>;
  locked_seconds?: InputMaybe<Order_By>;
  original_supply?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Generative_Token_Variance_Fields = {
  __typename?: 'generative_token_variance_fields';
  balance?: Maybe<Scalars['Float']['output']>;
  input_bytes_size?: Maybe<Scalars['Float']['output']>;
  iterations_count?: Maybe<Scalars['Float']['output']>;
  locked_seconds?: Maybe<Scalars['Float']['output']>;
  original_supply?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "get_redeemable_percentage" */
  redeemed_percentage?: Maybe<Scalars['float8']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "generative_token" */
export type Generative_Token_Variance_Order_By = {
  balance?: InputMaybe<Order_By>;
  input_bytes_size?: InputMaybe<Order_By>;
  iterations_count?: InputMaybe<Order_By>;
  locked_seconds?: InputMaybe<Order_By>;
  original_supply?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "generative_token_version". All fields are combined with logical 'AND'. */
export type Generative_Token_Version_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['generative_token_version']['input']>;
  _gt?: InputMaybe<Scalars['generative_token_version']['input']>;
  _gte?: InputMaybe<Scalars['generative_token_version']['input']>;
  _in?: InputMaybe<Array<Scalars['generative_token_version']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['generative_token_version']['input']>;
  _lte?: InputMaybe<Scalars['generative_token_version']['input']>;
  _neq?: InputMaybe<Scalars['generative_token_version']['input']>;
  _nin?: InputMaybe<Array<Scalars['generative_token_version']['input']>>;
};

/** columns and relationships of "gentk_assign" */
export type Gentk_Assign = {
  __typename?: 'gentk_assign';
  assigned_at?: Maybe<Scalars['timestamptz']['output']>;
  attempts: Scalars['Int']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['String']['output'];
  /** An object relationship */
  objkt?: Maybe<Objkt>;
  retries: Scalars['Int']['output'];
  state: Scalars['gentk_assign_state_enum']['output'];
};

/** Boolean expression to filter rows from the table "gentk_assign". All fields are combined with a logical 'AND'. */
export type Gentk_Assign_Bool_Exp = {
  _and?: InputMaybe<Array<Gentk_Assign_Bool_Exp>>;
  _not?: InputMaybe<Gentk_Assign_Bool_Exp>;
  _or?: InputMaybe<Array<Gentk_Assign_Bool_Exp>>;
  assigned_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  attempts?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  objkt?: InputMaybe<Objkt_Bool_Exp>;
  retries?: InputMaybe<Int_Comparison_Exp>;
  state?: InputMaybe<Gentk_Assign_State_Enum_Comparison_Exp>;
};

/** Ordering options when selecting data from "gentk_assign". */
export type Gentk_Assign_Order_By = {
  assigned_at?: InputMaybe<Order_By>;
  attempts?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  objkt?: InputMaybe<Objkt_Order_By>;
  retries?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
};

/** select columns of table "gentk_assign" */
export enum Gentk_Assign_Select_Column {
  /** column name */
  AssignedAt = 'assigned_at',
  /** column name */
  Attempts = 'attempts',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Retries = 'retries',
  /** column name */
  State = 'state'
}

/** Boolean expression to compare columns of type "gentk_assign_state_enum". All fields are combined with logical 'AND'. */
export type Gentk_Assign_State_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['gentk_assign_state_enum']['input']>;
  _gt?: InputMaybe<Scalars['gentk_assign_state_enum']['input']>;
  _gte?: InputMaybe<Scalars['gentk_assign_state_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['gentk_assign_state_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['gentk_assign_state_enum']['input']>;
  _lte?: InputMaybe<Scalars['gentk_assign_state_enum']['input']>;
  _neq?: InputMaybe<Scalars['gentk_assign_state_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['gentk_assign_state_enum']['input']>>;
};

/** Streaming cursor of the table "gentk_assign" */
export type Gentk_Assign_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Gentk_Assign_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Gentk_Assign_Stream_Cursor_Value_Input = {
  assigned_at?: InputMaybe<Scalars['timestamptz']['input']>;
  attempts?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  retries?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<Scalars['gentk_assign_state_enum']['input']>;
};

/** columns and relationships of "indexed_operation" */
export type Indexed_Operation = {
  __typename?: 'indexed_operation';
  hashed: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "indexed_operation". All fields are combined with a logical 'AND'. */
export type Indexed_Operation_Bool_Exp = {
  _and?: InputMaybe<Array<Indexed_Operation_Bool_Exp>>;
  _not?: InputMaybe<Indexed_Operation_Bool_Exp>;
  _or?: InputMaybe<Array<Indexed_Operation_Bool_Exp>>;
  hashed?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "indexed_operation". */
export type Indexed_Operation_Order_By = {
  hashed?: InputMaybe<Order_By>;
};

/** select columns of table "indexed_operation" */
export enum Indexed_Operation_Select_Column {
  /** column name */
  Hashed = 'hashed'
}

/** Streaming cursor of the table "indexed_operation" */
export type Indexed_Operation_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Indexed_Operation_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Indexed_Operation_Stream_Cursor_Value_Input = {
  hashed?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "indexing_cursor" */
export type Indexing_Cursor = {
  __typename?: 'indexing_cursor';
  group_id: Scalars['String']['output'];
  id: Scalars['bigint']['output'];
  /** An object relationship */
  indexing_target?: Maybe<Indexing_Target>;
  last_indexed_at: Scalars['timestamptz']['output'];
  level: Scalars['bigint']['output'];
  originated_at: Scalars['timestamptz']['output'];
};

/** Boolean expression to filter rows from the table "indexing_cursor". All fields are combined with a logical 'AND'. */
export type Indexing_Cursor_Bool_Exp = {
  _and?: InputMaybe<Array<Indexing_Cursor_Bool_Exp>>;
  _not?: InputMaybe<Indexing_Cursor_Bool_Exp>;
  _or?: InputMaybe<Array<Indexing_Cursor_Bool_Exp>>;
  group_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  indexing_target?: InputMaybe<Indexing_Target_Bool_Exp>;
  last_indexed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  level?: InputMaybe<Bigint_Comparison_Exp>;
  originated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "indexing_cursor". */
export type Indexing_Cursor_Order_By = {
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  indexing_target?: InputMaybe<Indexing_Target_Order_By>;
  last_indexed_at?: InputMaybe<Order_By>;
  level?: InputMaybe<Order_By>;
  originated_at?: InputMaybe<Order_By>;
};

/** select columns of table "indexing_cursor" */
export enum Indexing_Cursor_Select_Column {
  /** column name */
  GroupId = 'group_id',
  /** column name */
  Id = 'id',
  /** column name */
  LastIndexedAt = 'last_indexed_at',
  /** column name */
  Level = 'level',
  /** column name */
  OriginatedAt = 'originated_at'
}

/** Streaming cursor of the table "indexing_cursor" */
export type Indexing_Cursor_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Indexing_Cursor_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Indexing_Cursor_Stream_Cursor_Value_Input = {
  group_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  last_indexed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  level?: InputMaybe<Scalars['bigint']['input']>;
  originated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** columns and relationships of "indexing_target" */
export type Indexing_Target = {
  __typename?: 'indexing_target';
  address: Scalars['String']['output'];
  cursor_group_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  indexing_cursor?: Maybe<Indexing_Cursor>;
  type: Scalars['indexing_target_type_enum']['output'];
};

/** Boolean expression to filter rows from the table "indexing_target". All fields are combined with a logical 'AND'. */
export type Indexing_Target_Bool_Exp = {
  _and?: InputMaybe<Array<Indexing_Target_Bool_Exp>>;
  _not?: InputMaybe<Indexing_Target_Bool_Exp>;
  _or?: InputMaybe<Array<Indexing_Target_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  cursor_group_id?: InputMaybe<String_Comparison_Exp>;
  indexing_cursor?: InputMaybe<Indexing_Cursor_Bool_Exp>;
  type?: InputMaybe<Indexing_Target_Type_Enum_Comparison_Exp>;
};

/** Ordering options when selecting data from "indexing_target". */
export type Indexing_Target_Order_By = {
  address?: InputMaybe<Order_By>;
  cursor_group_id?: InputMaybe<Order_By>;
  indexing_cursor?: InputMaybe<Indexing_Cursor_Order_By>;
  type?: InputMaybe<Order_By>;
};

/** select columns of table "indexing_target" */
export enum Indexing_Target_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  CursorGroupId = 'cursor_group_id',
  /** column name */
  Type = 'type'
}

/** Streaming cursor of the table "indexing_target" */
export type Indexing_Target_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Indexing_Target_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Indexing_Target_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  cursor_group_id?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['indexing_target_type_enum']['input']>;
};

/** Boolean expression to compare columns of type "indexing_target_type_enum". All fields are combined with logical 'AND'. */
export type Indexing_Target_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['indexing_target_type_enum']['input']>;
  _gt?: InputMaybe<Scalars['indexing_target_type_enum']['input']>;
  _gte?: InputMaybe<Scalars['indexing_target_type_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['indexing_target_type_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['indexing_target_type_enum']['input']>;
  _lte?: InputMaybe<Scalars['indexing_target_type_enum']['input']>;
  _neq?: InputMaybe<Scalars['indexing_target_type_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['indexing_target_type_enum']['input']>>;
};

/** columns and relationships of "ipfs_cid" */
export type Ipfs_Cid = {
  __typename?: 'ipfs_cid';
  cid: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "ipfs_cid". All fields are combined with a logical 'AND'. */
export type Ipfs_Cid_Bool_Exp = {
  _and?: InputMaybe<Array<Ipfs_Cid_Bool_Exp>>;
  _not?: InputMaybe<Ipfs_Cid_Bool_Exp>;
  _or?: InputMaybe<Array<Ipfs_Cid_Bool_Exp>>;
  cid?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "ipfs_cid". */
export type Ipfs_Cid_Order_By = {
  cid?: InputMaybe<Order_By>;
};

/** select columns of table "ipfs_cid" */
export enum Ipfs_Cid_Select_Column {
  /** column name */
  Cid = 'cid'
}

/** Streaming cursor of the table "ipfs_cid" */
export type Ipfs_Cid_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Ipfs_Cid_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Ipfs_Cid_Stream_Cursor_Value_Input = {
  cid?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']['input']>;
  _gt?: InputMaybe<Scalars['json']['input']>;
  _gte?: InputMaybe<Scalars['json']['input']>;
  _in?: InputMaybe<Array<Scalars['json']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['json']['input']>;
  _lte?: InputMaybe<Scalars['json']['input']>;
  _neq?: InputMaybe<Scalars['json']['input']>;
  _nin?: InputMaybe<Array<Scalars['json']['input']>>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** columns and relationships of "listing" */
export type Listing = {
  __typename?: 'listing';
  accepted_at?: Maybe<Scalars['timestamptz']['output']>;
  accepted_by_id?: Maybe<Scalars['String']['output']>;
  amount: Scalars['numeric']['output'];
  /** An object relationship */
  article?: Maybe<Article>;
  article_id?: Maybe<Scalars['Int']['output']>;
  cancelled_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['String']['output'];
  is_inactive?: Maybe<Scalars['Boolean']['output']>;
  issuer_id?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['jsonb']['output']>;
  /** An object relationship */
  objkt?: Maybe<Objkt>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  price: Scalars['numeric']['output'];
  royalties: Scalars['Int']['output'];
  status: Scalars['listing_status_enum']['output'];
  /** An object relationship */
  user?: Maybe<User>;
  /** An object relationship */
  userByAcceptedById?: Maybe<User>;
  version: Scalars['Int']['output'];
};


/** columns and relationships of "listing" */
export type ListingMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "listing" */
export type Listing_Aggregate = {
  __typename?: 'listing_aggregate';
  aggregate?: Maybe<Listing_Aggregate_Fields>;
  nodes: Array<Listing>;
};

export type Listing_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Listing_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Listing_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Listing_Aggregate_Bool_Exp_Count>;
};

export type Listing_Aggregate_Bool_Exp_Bool_And = {
  arguments: Listing_Select_Column_Listing_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Listing_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Listing_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Listing_Select_Column_Listing_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Listing_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Listing_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Listing_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Listing_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "listing" */
export type Listing_Aggregate_Fields = {
  __typename?: 'listing_aggregate_fields';
  avg?: Maybe<Listing_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Listing_Max_Fields>;
  min?: Maybe<Listing_Min_Fields>;
  stddev?: Maybe<Listing_Stddev_Fields>;
  stddev_pop?: Maybe<Listing_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Listing_Stddev_Samp_Fields>;
  sum?: Maybe<Listing_Sum_Fields>;
  var_pop?: Maybe<Listing_Var_Pop_Fields>;
  var_samp?: Maybe<Listing_Var_Samp_Fields>;
  variance?: Maybe<Listing_Variance_Fields>;
};


/** aggregate fields of "listing" */
export type Listing_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Listing_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "listing" */
export type Listing_Aggregate_Order_By = {
  avg?: InputMaybe<Listing_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Listing_Max_Order_By>;
  min?: InputMaybe<Listing_Min_Order_By>;
  stddev?: InputMaybe<Listing_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Listing_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Listing_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Listing_Sum_Order_By>;
  var_pop?: InputMaybe<Listing_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Listing_Var_Samp_Order_By>;
  variance?: InputMaybe<Listing_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Listing_Avg_Fields = {
  __typename?: 'listing_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "listing" */
export type Listing_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "listing". All fields are combined with a logical 'AND'. */
export type Listing_Bool_Exp = {
  _and?: InputMaybe<Array<Listing_Bool_Exp>>;
  _not?: InputMaybe<Listing_Bool_Exp>;
  _or?: InputMaybe<Array<Listing_Bool_Exp>>;
  accepted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  accepted_by_id?: InputMaybe<String_Comparison_Exp>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  article?: InputMaybe<Article_Bool_Exp>;
  article_id?: InputMaybe<Int_Comparison_Exp>;
  cancelled_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  is_inactive?: InputMaybe<Boolean_Comparison_Exp>;
  issuer_id?: InputMaybe<String_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  objkt?: InputMaybe<Objkt_Bool_Exp>;
  objkt_id?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  royalties?: InputMaybe<Int_Comparison_Exp>;
  status?: InputMaybe<Listing_Status_Enum_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userByAcceptedById?: InputMaybe<User_Bool_Exp>;
  version?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Listing_Max_Fields = {
  __typename?: 'listing_max_fields';
  accepted_at?: Maybe<Scalars['timestamptz']['output']>;
  accepted_by_id?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['numeric']['output']>;
  article_id?: Maybe<Scalars['Int']['output']>;
  cancelled_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  issuer_id?: Maybe<Scalars['String']['output']>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  royalties?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['listing_status_enum']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "listing" */
export type Listing_Max_Order_By = {
  accepted_at?: InputMaybe<Order_By>;
  accepted_by_id?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  cancelled_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  issuer_id?: InputMaybe<Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Listing_Min_Fields = {
  __typename?: 'listing_min_fields';
  accepted_at?: Maybe<Scalars['timestamptz']['output']>;
  accepted_by_id?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['numeric']['output']>;
  article_id?: Maybe<Scalars['Int']['output']>;
  cancelled_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  issuer_id?: Maybe<Scalars['String']['output']>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  royalties?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['listing_status_enum']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "listing" */
export type Listing_Min_Order_By = {
  accepted_at?: InputMaybe<Order_By>;
  accepted_by_id?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  cancelled_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  issuer_id?: InputMaybe<Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "listing". */
export type Listing_Order_By = {
  accepted_at?: InputMaybe<Order_By>;
  accepted_by_id?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  article?: InputMaybe<Article_Order_By>;
  article_id?: InputMaybe<Order_By>;
  cancelled_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_inactive?: InputMaybe<Order_By>;
  issuer_id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  objkt?: InputMaybe<Objkt_Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userByAcceptedById?: InputMaybe<User_Order_By>;
  version?: InputMaybe<Order_By>;
};

/** select columns of table "listing" */
export enum Listing_Select_Column {
  /** column name */
  AcceptedAt = 'accepted_at',
  /** column name */
  AcceptedById = 'accepted_by_id',
  /** column name */
  Amount = 'amount',
  /** column name */
  ArticleId = 'article_id',
  /** column name */
  CancelledAt = 'cancelled_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsInactive = 'is_inactive',
  /** column name */
  IssuerId = 'issuer_id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  ObjktId = 'objkt_id',
  /** column name */
  Price = 'price',
  /** column name */
  Royalties = 'royalties',
  /** column name */
  Status = 'status',
  /** column name */
  Version = 'version'
}

/** select "listing_aggregate_bool_exp_bool_and_arguments_columns" columns of table "listing" */
export enum Listing_Select_Column_Listing_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsInactive = 'is_inactive'
}

/** select "listing_aggregate_bool_exp_bool_or_arguments_columns" columns of table "listing" */
export enum Listing_Select_Column_Listing_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsInactive = 'is_inactive'
}

/** Boolean expression to compare columns of type "listing_status_enum". All fields are combined with logical 'AND'. */
export type Listing_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['listing_status_enum']['input']>;
  _gt?: InputMaybe<Scalars['listing_status_enum']['input']>;
  _gte?: InputMaybe<Scalars['listing_status_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['listing_status_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['listing_status_enum']['input']>;
  _lte?: InputMaybe<Scalars['listing_status_enum']['input']>;
  _neq?: InputMaybe<Scalars['listing_status_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['listing_status_enum']['input']>>;
};

/** aggregate stddev on columns */
export type Listing_Stddev_Fields = {
  __typename?: 'listing_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "listing" */
export type Listing_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Listing_Stddev_Pop_Fields = {
  __typename?: 'listing_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "listing" */
export type Listing_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Listing_Stddev_Samp_Fields = {
  __typename?: 'listing_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "listing" */
export type Listing_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "listing" */
export type Listing_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Listing_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Listing_Stream_Cursor_Value_Input = {
  accepted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  accepted_by_id?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['numeric']['input']>;
  article_id?: InputMaybe<Scalars['Int']['input']>;
  cancelled_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_inactive?: InputMaybe<Scalars['Boolean']['input']>;
  issuer_id?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  objkt_id?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  royalties?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['listing_status_enum']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Listing_Sum_Fields = {
  __typename?: 'listing_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  article_id?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  royalties?: Maybe<Scalars['Int']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "listing" */
export type Listing_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Listing_Var_Pop_Fields = {
  __typename?: 'listing_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "listing" */
export type Listing_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Listing_Var_Samp_Fields = {
  __typename?: 'listing_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "listing" */
export type Listing_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Listing_Variance_Fields = {
  __typename?: 'listing_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  article_id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "listing" */
export type Listing_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** columns and relationships of "market_stats" */
export type Market_Stats = {
  __typename?: 'market_stats';
  floor?: Maybe<Scalars['numeric']['output']>;
  floor_change7d?: Maybe<Scalars['numeric']['output']>;
  floor_change24?: Maybe<Scalars['numeric']['output']>;
  floor_change30d?: Maybe<Scalars['numeric']['output']>;
  floor_fiat?: Maybe<Scalars['numeric']['output']>;
  from?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  generative_token: Generative_Token;
  highest_sold?: Maybe<Scalars['numeric']['output']>;
  highest_sold_fiat?: Maybe<Scalars['numeric']['output']>;
  listed?: Maybe<Scalars['Int']['output']>;
  lowest_sold?: Maybe<Scalars['numeric']['output']>;
  lowest_sold_fiat?: Maybe<Scalars['numeric']['output']>;
  median?: Maybe<Scalars['numeric']['output']>;
  prim_volume?: Maybe<Scalars['numeric']['output']>;
  prim_volume_fiat?: Maybe<Scalars['numeric']['output']>;
  prim_volume_nb?: Maybe<Scalars['Int']['output']>;
  sec_volume?: Maybe<Scalars['numeric']['output']>;
  sec_volume7d?: Maybe<Scalars['numeric']['output']>;
  sec_volume24?: Maybe<Scalars['numeric']['output']>;
  sec_volume30d?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat7d?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat24?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat30d?: Maybe<Scalars['numeric']['output']>;
  sec_volume_nb?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb7d?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb24?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb30d?: Maybe<Scalars['Int']['output']>;
  to?: Maybe<Scalars['timestamptz']['output']>;
  token_id: Scalars['String']['output'];
  total_volume?: Maybe<Scalars['numeric']['output']>;
  total_volume7d?: Maybe<Scalars['numeric']['output']>;
  total_volume24?: Maybe<Scalars['numeric']['output']>;
  total_volume30d?: Maybe<Scalars['numeric']['output']>;
  total_volume_change7d?: Maybe<Scalars['numeric']['output']>;
  total_volume_change24?: Maybe<Scalars['numeric']['output']>;
  total_volume_change30d?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat7d?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat24?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat30d?: Maybe<Scalars['numeric']['output']>;
  total_volume_nb?: Maybe<Scalars['Int']['output']>;
  total_volume_nb7d?: Maybe<Scalars['Int']['output']>;
  total_volume_nb24?: Maybe<Scalars['Int']['output']>;
  total_volume_nb30d?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "market_stats" */
export type Market_Stats_Aggregate = {
  __typename?: 'market_stats_aggregate';
  aggregate?: Maybe<Market_Stats_Aggregate_Fields>;
  nodes: Array<Market_Stats>;
};

/** aggregate fields of "market_stats" */
export type Market_Stats_Aggregate_Fields = {
  __typename?: 'market_stats_aggregate_fields';
  avg?: Maybe<Market_Stats_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Market_Stats_Max_Fields>;
  min?: Maybe<Market_Stats_Min_Fields>;
  stddev?: Maybe<Market_Stats_Stddev_Fields>;
  stddev_pop?: Maybe<Market_Stats_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Market_Stats_Stddev_Samp_Fields>;
  sum?: Maybe<Market_Stats_Sum_Fields>;
  var_pop?: Maybe<Market_Stats_Var_Pop_Fields>;
  var_samp?: Maybe<Market_Stats_Var_Samp_Fields>;
  variance?: Maybe<Market_Stats_Variance_Fields>;
};


/** aggregate fields of "market_stats" */
export type Market_Stats_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Market_Stats_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Market_Stats_Avg_Fields = {
  __typename?: 'market_stats_avg_fields';
  floor?: Maybe<Scalars['Float']['output']>;
  floor_change7d?: Maybe<Scalars['Float']['output']>;
  floor_change24?: Maybe<Scalars['Float']['output']>;
  floor_change30d?: Maybe<Scalars['Float']['output']>;
  floor_fiat?: Maybe<Scalars['Float']['output']>;
  highest_sold?: Maybe<Scalars['Float']['output']>;
  highest_sold_fiat?: Maybe<Scalars['Float']['output']>;
  listed?: Maybe<Scalars['Float']['output']>;
  lowest_sold?: Maybe<Scalars['Float']['output']>;
  lowest_sold_fiat?: Maybe<Scalars['Float']['output']>;
  median?: Maybe<Scalars['Float']['output']>;
  prim_volume?: Maybe<Scalars['Float']['output']>;
  prim_volume_fiat?: Maybe<Scalars['Float']['output']>;
  prim_volume_nb?: Maybe<Scalars['Float']['output']>;
  sec_volume?: Maybe<Scalars['Float']['output']>;
  sec_volume7d?: Maybe<Scalars['Float']['output']>;
  sec_volume24?: Maybe<Scalars['Float']['output']>;
  sec_volume30d?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat7d?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat24?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat30d?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb7d?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb24?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb30d?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_volume7d?: Maybe<Scalars['Float']['output']>;
  total_volume24?: Maybe<Scalars['Float']['output']>;
  total_volume30d?: Maybe<Scalars['Float']['output']>;
  total_volume_change7d?: Maybe<Scalars['Float']['output']>;
  total_volume_change24?: Maybe<Scalars['Float']['output']>;
  total_volume_change30d?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat7d?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat24?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat30d?: Maybe<Scalars['Float']['output']>;
  total_volume_nb?: Maybe<Scalars['Float']['output']>;
  total_volume_nb7d?: Maybe<Scalars['Float']['output']>;
  total_volume_nb24?: Maybe<Scalars['Float']['output']>;
  total_volume_nb30d?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "market_stats". All fields are combined with a logical 'AND'. */
export type Market_Stats_Bool_Exp = {
  _and?: InputMaybe<Array<Market_Stats_Bool_Exp>>;
  _not?: InputMaybe<Market_Stats_Bool_Exp>;
  _or?: InputMaybe<Array<Market_Stats_Bool_Exp>>;
  floor?: InputMaybe<Numeric_Comparison_Exp>;
  floor_change7d?: InputMaybe<Numeric_Comparison_Exp>;
  floor_change24?: InputMaybe<Numeric_Comparison_Exp>;
  floor_change30d?: InputMaybe<Numeric_Comparison_Exp>;
  floor_fiat?: InputMaybe<Numeric_Comparison_Exp>;
  from?: InputMaybe<Timestamptz_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  highest_sold?: InputMaybe<Numeric_Comparison_Exp>;
  highest_sold_fiat?: InputMaybe<Numeric_Comparison_Exp>;
  listed?: InputMaybe<Int_Comparison_Exp>;
  lowest_sold?: InputMaybe<Numeric_Comparison_Exp>;
  lowest_sold_fiat?: InputMaybe<Numeric_Comparison_Exp>;
  median?: InputMaybe<Numeric_Comparison_Exp>;
  prim_volume?: InputMaybe<Numeric_Comparison_Exp>;
  prim_volume_fiat?: InputMaybe<Numeric_Comparison_Exp>;
  prim_volume_nb?: InputMaybe<Int_Comparison_Exp>;
  sec_volume?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume7d?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume24?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume30d?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume_fiat?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume_fiat7d?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume_fiat24?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume_fiat30d?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume_nb?: InputMaybe<Int_Comparison_Exp>;
  sec_volume_nb7d?: InputMaybe<Int_Comparison_Exp>;
  sec_volume_nb24?: InputMaybe<Int_Comparison_Exp>;
  sec_volume_nb30d?: InputMaybe<Int_Comparison_Exp>;
  to?: InputMaybe<Timestamptz_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
  total_volume?: InputMaybe<Numeric_Comparison_Exp>;
  total_volume7d?: InputMaybe<Numeric_Comparison_Exp>;
  total_volume24?: InputMaybe<Numeric_Comparison_Exp>;
  total_volume30d?: InputMaybe<Numeric_Comparison_Exp>;
  total_volume_change7d?: InputMaybe<Numeric_Comparison_Exp>;
  total_volume_change24?: InputMaybe<Numeric_Comparison_Exp>;
  total_volume_change30d?: InputMaybe<Numeric_Comparison_Exp>;
  total_volume_fiat?: InputMaybe<Numeric_Comparison_Exp>;
  total_volume_fiat7d?: InputMaybe<Numeric_Comparison_Exp>;
  total_volume_fiat24?: InputMaybe<Numeric_Comparison_Exp>;
  total_volume_fiat30d?: InputMaybe<Numeric_Comparison_Exp>;
  total_volume_nb?: InputMaybe<Int_Comparison_Exp>;
  total_volume_nb7d?: InputMaybe<Int_Comparison_Exp>;
  total_volume_nb24?: InputMaybe<Int_Comparison_Exp>;
  total_volume_nb30d?: InputMaybe<Int_Comparison_Exp>;
};

/** columns and relationships of "market_stats_history" */
export type Market_Stats_History = {
  __typename?: 'market_stats_history';
  floor?: Maybe<Scalars['numeric']['output']>;
  from: Scalars['timestamptz']['output'];
  /** An object relationship */
  generative_token: Generative_Token;
  highest_sold?: Maybe<Scalars['numeric']['output']>;
  id: Scalars['Int']['output'];
  listed?: Maybe<Scalars['Int']['output']>;
  lowest_sold?: Maybe<Scalars['numeric']['output']>;
  median?: Maybe<Scalars['numeric']['output']>;
  prim_volume?: Maybe<Scalars['numeric']['output']>;
  prim_volume_fiat?: Maybe<Scalars['numeric']['output']>;
  prim_volume_nb?: Maybe<Scalars['Int']['output']>;
  sec_volume?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat?: Maybe<Scalars['numeric']['output']>;
  sec_volume_nb?: Maybe<Scalars['Int']['output']>;
  to: Scalars['timestamptz']['output'];
  token_id: Scalars['String']['output'];
  total_volume?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat?: Maybe<Scalars['numeric']['output']>;
  total_volume_nb?: Maybe<Scalars['Int']['output']>;
};

/** order by aggregate values of table "market_stats_history" */
export type Market_Stats_History_Aggregate_Order_By = {
  avg?: InputMaybe<Market_Stats_History_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Market_Stats_History_Max_Order_By>;
  min?: InputMaybe<Market_Stats_History_Min_Order_By>;
  stddev?: InputMaybe<Market_Stats_History_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Market_Stats_History_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Market_Stats_History_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Market_Stats_History_Sum_Order_By>;
  var_pop?: InputMaybe<Market_Stats_History_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Market_Stats_History_Var_Samp_Order_By>;
  variance?: InputMaybe<Market_Stats_History_Variance_Order_By>;
};

/** order by avg() on columns of table "market_stats_history" */
export type Market_Stats_History_Avg_Order_By = {
  floor?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  prim_volume?: InputMaybe<Order_By>;
  prim_volume_fiat?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  sec_volume?: InputMaybe<Order_By>;
  sec_volume_fiat?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_volume_fiat?: InputMaybe<Order_By>;
  total_volume_nb?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "market_stats_history". All fields are combined with a logical 'AND'. */
export type Market_Stats_History_Bool_Exp = {
  _and?: InputMaybe<Array<Market_Stats_History_Bool_Exp>>;
  _not?: InputMaybe<Market_Stats_History_Bool_Exp>;
  _or?: InputMaybe<Array<Market_Stats_History_Bool_Exp>>;
  floor?: InputMaybe<Numeric_Comparison_Exp>;
  from?: InputMaybe<Timestamptz_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  highest_sold?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  listed?: InputMaybe<Int_Comparison_Exp>;
  lowest_sold?: InputMaybe<Numeric_Comparison_Exp>;
  median?: InputMaybe<Numeric_Comparison_Exp>;
  prim_volume?: InputMaybe<Numeric_Comparison_Exp>;
  prim_volume_fiat?: InputMaybe<Numeric_Comparison_Exp>;
  prim_volume_nb?: InputMaybe<Int_Comparison_Exp>;
  sec_volume?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume_fiat?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume_nb?: InputMaybe<Int_Comparison_Exp>;
  to?: InputMaybe<Timestamptz_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
  total_volume?: InputMaybe<Numeric_Comparison_Exp>;
  total_volume_fiat?: InputMaybe<Numeric_Comparison_Exp>;
  total_volume_nb?: InputMaybe<Int_Comparison_Exp>;
};

/** columns and relationships of "market_stats_history_daily" */
export type Market_Stats_History_Daily = {
  __typename?: 'market_stats_history_daily';
  floor?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
  total_volume?: Maybe<Scalars['numeric']['output']>;
};

/** Boolean expression to filter rows from the table "market_stats_history_daily". All fields are combined with a logical 'AND'. */
export type Market_Stats_History_Daily_Bool_Exp = {
  _and?: InputMaybe<Array<Market_Stats_History_Daily_Bool_Exp>>;
  _not?: InputMaybe<Market_Stats_History_Daily_Bool_Exp>;
  _or?: InputMaybe<Array<Market_Stats_History_Daily_Bool_Exp>>;
  floor?: InputMaybe<Numeric_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
  total_volume?: InputMaybe<Numeric_Comparison_Exp>;
};

/** Ordering options when selecting data from "market_stats_history_daily". */
export type Market_Stats_History_Daily_Order_By = {
  floor?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
};

/** select columns of table "market_stats_history_daily" */
export enum Market_Stats_History_Daily_Select_Column {
  /** column name */
  Floor = 'floor',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  TotalVolume = 'total_volume'
}

/** Streaming cursor of the table "market_stats_history_daily" */
export type Market_Stats_History_Daily_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Market_Stats_History_Daily_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Market_Stats_History_Daily_Stream_Cursor_Value_Input = {
  floor?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
  total_volume?: InputMaybe<Scalars['numeric']['input']>;
};

/** columns and relationships of "market_stats_history_hourly" */
export type Market_Stats_History_Hourly = {
  __typename?: 'market_stats_history_hourly';
  floor?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
  total_volume?: Maybe<Scalars['numeric']['output']>;
};

/** Boolean expression to filter rows from the table "market_stats_history_hourly". All fields are combined with a logical 'AND'. */
export type Market_Stats_History_Hourly_Bool_Exp = {
  _and?: InputMaybe<Array<Market_Stats_History_Hourly_Bool_Exp>>;
  _not?: InputMaybe<Market_Stats_History_Hourly_Bool_Exp>;
  _or?: InputMaybe<Array<Market_Stats_History_Hourly_Bool_Exp>>;
  floor?: InputMaybe<Numeric_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
  total_volume?: InputMaybe<Numeric_Comparison_Exp>;
};

/** Ordering options when selecting data from "market_stats_history_hourly". */
export type Market_Stats_History_Hourly_Order_By = {
  floor?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
};

/** select columns of table "market_stats_history_hourly" */
export enum Market_Stats_History_Hourly_Select_Column {
  /** column name */
  Floor = 'floor',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  TotalVolume = 'total_volume'
}

/** Streaming cursor of the table "market_stats_history_hourly" */
export type Market_Stats_History_Hourly_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Market_Stats_History_Hourly_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Market_Stats_History_Hourly_Stream_Cursor_Value_Input = {
  floor?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
  total_volume?: InputMaybe<Scalars['numeric']['input']>;
};

/** order by max() on columns of table "market_stats_history" */
export type Market_Stats_History_Max_Order_By = {
  floor?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  prim_volume?: InputMaybe<Order_By>;
  prim_volume_fiat?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  sec_volume?: InputMaybe<Order_By>;
  sec_volume_fiat?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_volume_fiat?: InputMaybe<Order_By>;
  total_volume_nb?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "market_stats_history" */
export type Market_Stats_History_Min_Order_By = {
  floor?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  prim_volume?: InputMaybe<Order_By>;
  prim_volume_fiat?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  sec_volume?: InputMaybe<Order_By>;
  sec_volume_fiat?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_volume_fiat?: InputMaybe<Order_By>;
  total_volume_nb?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "market_stats_history". */
export type Market_Stats_History_Order_By = {
  floor?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  prim_volume?: InputMaybe<Order_By>;
  prim_volume_fiat?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  sec_volume?: InputMaybe<Order_By>;
  sec_volume_fiat?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_volume_fiat?: InputMaybe<Order_By>;
  total_volume_nb?: InputMaybe<Order_By>;
};

/** select columns of table "market_stats_history" */
export enum Market_Stats_History_Select_Column {
  /** column name */
  Floor = 'floor',
  /** column name */
  From = 'from',
  /** column name */
  HighestSold = 'highest_sold',
  /** column name */
  Id = 'id',
  /** column name */
  Listed = 'listed',
  /** column name */
  LowestSold = 'lowest_sold',
  /** column name */
  Median = 'median',
  /** column name */
  PrimVolume = 'prim_volume',
  /** column name */
  PrimVolumeFiat = 'prim_volume_fiat',
  /** column name */
  PrimVolumeNb = 'prim_volume_nb',
  /** column name */
  SecVolume = 'sec_volume',
  /** column name */
  SecVolumeFiat = 'sec_volume_fiat',
  /** column name */
  SecVolumeNb = 'sec_volume_nb',
  /** column name */
  To = 'to',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  TotalVolume = 'total_volume',
  /** column name */
  TotalVolumeFiat = 'total_volume_fiat',
  /** column name */
  TotalVolumeNb = 'total_volume_nb'
}

/** order by stddev() on columns of table "market_stats_history" */
export type Market_Stats_History_Stddev_Order_By = {
  floor?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  prim_volume?: InputMaybe<Order_By>;
  prim_volume_fiat?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  sec_volume?: InputMaybe<Order_By>;
  sec_volume_fiat?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_volume_fiat?: InputMaybe<Order_By>;
  total_volume_nb?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "market_stats_history" */
export type Market_Stats_History_Stddev_Pop_Order_By = {
  floor?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  prim_volume?: InputMaybe<Order_By>;
  prim_volume_fiat?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  sec_volume?: InputMaybe<Order_By>;
  sec_volume_fiat?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_volume_fiat?: InputMaybe<Order_By>;
  total_volume_nb?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "market_stats_history" */
export type Market_Stats_History_Stddev_Samp_Order_By = {
  floor?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  prim_volume?: InputMaybe<Order_By>;
  prim_volume_fiat?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  sec_volume?: InputMaybe<Order_By>;
  sec_volume_fiat?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_volume_fiat?: InputMaybe<Order_By>;
  total_volume_nb?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "market_stats_history" */
export type Market_Stats_History_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Market_Stats_History_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Market_Stats_History_Stream_Cursor_Value_Input = {
  floor?: InputMaybe<Scalars['numeric']['input']>;
  from?: InputMaybe<Scalars['timestamptz']['input']>;
  highest_sold?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  listed?: InputMaybe<Scalars['Int']['input']>;
  lowest_sold?: InputMaybe<Scalars['numeric']['input']>;
  median?: InputMaybe<Scalars['numeric']['input']>;
  prim_volume?: InputMaybe<Scalars['numeric']['input']>;
  prim_volume_fiat?: InputMaybe<Scalars['numeric']['input']>;
  prim_volume_nb?: InputMaybe<Scalars['Int']['input']>;
  sec_volume?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume_fiat?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume_nb?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['timestamptz']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
  total_volume?: InputMaybe<Scalars['numeric']['input']>;
  total_volume_fiat?: InputMaybe<Scalars['numeric']['input']>;
  total_volume_nb?: InputMaybe<Scalars['Int']['input']>;
};

/** order by sum() on columns of table "market_stats_history" */
export type Market_Stats_History_Sum_Order_By = {
  floor?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  prim_volume?: InputMaybe<Order_By>;
  prim_volume_fiat?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  sec_volume?: InputMaybe<Order_By>;
  sec_volume_fiat?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_volume_fiat?: InputMaybe<Order_By>;
  total_volume_nb?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "market_stats_history" */
export type Market_Stats_History_Var_Pop_Order_By = {
  floor?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  prim_volume?: InputMaybe<Order_By>;
  prim_volume_fiat?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  sec_volume?: InputMaybe<Order_By>;
  sec_volume_fiat?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_volume_fiat?: InputMaybe<Order_By>;
  total_volume_nb?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "market_stats_history" */
export type Market_Stats_History_Var_Samp_Order_By = {
  floor?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  prim_volume?: InputMaybe<Order_By>;
  prim_volume_fiat?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  sec_volume?: InputMaybe<Order_By>;
  sec_volume_fiat?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_volume_fiat?: InputMaybe<Order_By>;
  total_volume_nb?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "market_stats_history" */
export type Market_Stats_History_Variance_Order_By = {
  floor?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  prim_volume?: InputMaybe<Order_By>;
  prim_volume_fiat?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  sec_volume?: InputMaybe<Order_By>;
  sec_volume_fiat?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_volume_fiat?: InputMaybe<Order_By>;
  total_volume_nb?: InputMaybe<Order_By>;
};

/** aggregate max on columns */
export type Market_Stats_Max_Fields = {
  __typename?: 'market_stats_max_fields';
  floor?: Maybe<Scalars['numeric']['output']>;
  floor_change7d?: Maybe<Scalars['numeric']['output']>;
  floor_change24?: Maybe<Scalars['numeric']['output']>;
  floor_change30d?: Maybe<Scalars['numeric']['output']>;
  floor_fiat?: Maybe<Scalars['numeric']['output']>;
  from?: Maybe<Scalars['timestamptz']['output']>;
  highest_sold?: Maybe<Scalars['numeric']['output']>;
  highest_sold_fiat?: Maybe<Scalars['numeric']['output']>;
  listed?: Maybe<Scalars['Int']['output']>;
  lowest_sold?: Maybe<Scalars['numeric']['output']>;
  lowest_sold_fiat?: Maybe<Scalars['numeric']['output']>;
  median?: Maybe<Scalars['numeric']['output']>;
  prim_volume?: Maybe<Scalars['numeric']['output']>;
  prim_volume_fiat?: Maybe<Scalars['numeric']['output']>;
  prim_volume_nb?: Maybe<Scalars['Int']['output']>;
  sec_volume?: Maybe<Scalars['numeric']['output']>;
  sec_volume7d?: Maybe<Scalars['numeric']['output']>;
  sec_volume24?: Maybe<Scalars['numeric']['output']>;
  sec_volume30d?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat7d?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat24?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat30d?: Maybe<Scalars['numeric']['output']>;
  sec_volume_nb?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb7d?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb24?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb30d?: Maybe<Scalars['Int']['output']>;
  to?: Maybe<Scalars['timestamptz']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
  total_volume?: Maybe<Scalars['numeric']['output']>;
  total_volume7d?: Maybe<Scalars['numeric']['output']>;
  total_volume24?: Maybe<Scalars['numeric']['output']>;
  total_volume30d?: Maybe<Scalars['numeric']['output']>;
  total_volume_change7d?: Maybe<Scalars['numeric']['output']>;
  total_volume_change24?: Maybe<Scalars['numeric']['output']>;
  total_volume_change30d?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat7d?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat24?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat30d?: Maybe<Scalars['numeric']['output']>;
  total_volume_nb?: Maybe<Scalars['Int']['output']>;
  total_volume_nb7d?: Maybe<Scalars['Int']['output']>;
  total_volume_nb24?: Maybe<Scalars['Int']['output']>;
  total_volume_nb30d?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Market_Stats_Min_Fields = {
  __typename?: 'market_stats_min_fields';
  floor?: Maybe<Scalars['numeric']['output']>;
  floor_change7d?: Maybe<Scalars['numeric']['output']>;
  floor_change24?: Maybe<Scalars['numeric']['output']>;
  floor_change30d?: Maybe<Scalars['numeric']['output']>;
  floor_fiat?: Maybe<Scalars['numeric']['output']>;
  from?: Maybe<Scalars['timestamptz']['output']>;
  highest_sold?: Maybe<Scalars['numeric']['output']>;
  highest_sold_fiat?: Maybe<Scalars['numeric']['output']>;
  listed?: Maybe<Scalars['Int']['output']>;
  lowest_sold?: Maybe<Scalars['numeric']['output']>;
  lowest_sold_fiat?: Maybe<Scalars['numeric']['output']>;
  median?: Maybe<Scalars['numeric']['output']>;
  prim_volume?: Maybe<Scalars['numeric']['output']>;
  prim_volume_fiat?: Maybe<Scalars['numeric']['output']>;
  prim_volume_nb?: Maybe<Scalars['Int']['output']>;
  sec_volume?: Maybe<Scalars['numeric']['output']>;
  sec_volume7d?: Maybe<Scalars['numeric']['output']>;
  sec_volume24?: Maybe<Scalars['numeric']['output']>;
  sec_volume30d?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat7d?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat24?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat30d?: Maybe<Scalars['numeric']['output']>;
  sec_volume_nb?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb7d?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb24?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb30d?: Maybe<Scalars['Int']['output']>;
  to?: Maybe<Scalars['timestamptz']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
  total_volume?: Maybe<Scalars['numeric']['output']>;
  total_volume7d?: Maybe<Scalars['numeric']['output']>;
  total_volume24?: Maybe<Scalars['numeric']['output']>;
  total_volume30d?: Maybe<Scalars['numeric']['output']>;
  total_volume_change7d?: Maybe<Scalars['numeric']['output']>;
  total_volume_change24?: Maybe<Scalars['numeric']['output']>;
  total_volume_change30d?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat7d?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat24?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat30d?: Maybe<Scalars['numeric']['output']>;
  total_volume_nb?: Maybe<Scalars['Int']['output']>;
  total_volume_nb7d?: Maybe<Scalars['Int']['output']>;
  total_volume_nb24?: Maybe<Scalars['Int']['output']>;
  total_volume_nb30d?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "market_stats". */
export type Market_Stats_Order_By = {
  floor?: InputMaybe<Order_By>;
  floor_change7d?: InputMaybe<Order_By>;
  floor_change24?: InputMaybe<Order_By>;
  floor_change30d?: InputMaybe<Order_By>;
  floor_fiat?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  highest_sold_fiat?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  lowest_sold_fiat?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  prim_volume?: InputMaybe<Order_By>;
  prim_volume_fiat?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  sec_volume?: InputMaybe<Order_By>;
  sec_volume7d?: InputMaybe<Order_By>;
  sec_volume24?: InputMaybe<Order_By>;
  sec_volume30d?: InputMaybe<Order_By>;
  sec_volume_fiat?: InputMaybe<Order_By>;
  sec_volume_fiat7d?: InputMaybe<Order_By>;
  sec_volume_fiat24?: InputMaybe<Order_By>;
  sec_volume_fiat30d?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  sec_volume_nb7d?: InputMaybe<Order_By>;
  sec_volume_nb24?: InputMaybe<Order_By>;
  sec_volume_nb30d?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_volume7d?: InputMaybe<Order_By>;
  total_volume24?: InputMaybe<Order_By>;
  total_volume30d?: InputMaybe<Order_By>;
  total_volume_change7d?: InputMaybe<Order_By>;
  total_volume_change24?: InputMaybe<Order_By>;
  total_volume_change30d?: InputMaybe<Order_By>;
  total_volume_fiat?: InputMaybe<Order_By>;
  total_volume_fiat7d?: InputMaybe<Order_By>;
  total_volume_fiat24?: InputMaybe<Order_By>;
  total_volume_fiat30d?: InputMaybe<Order_By>;
  total_volume_nb?: InputMaybe<Order_By>;
  total_volume_nb7d?: InputMaybe<Order_By>;
  total_volume_nb24?: InputMaybe<Order_By>;
  total_volume_nb30d?: InputMaybe<Order_By>;
};

/** select columns of table "market_stats" */
export enum Market_Stats_Select_Column {
  /** column name */
  Floor = 'floor',
  /** column name */
  FloorChange7d = 'floor_change7d',
  /** column name */
  FloorChange24 = 'floor_change24',
  /** column name */
  FloorChange30d = 'floor_change30d',
  /** column name */
  FloorFiat = 'floor_fiat',
  /** column name */
  From = 'from',
  /** column name */
  HighestSold = 'highest_sold',
  /** column name */
  HighestSoldFiat = 'highest_sold_fiat',
  /** column name */
  Listed = 'listed',
  /** column name */
  LowestSold = 'lowest_sold',
  /** column name */
  LowestSoldFiat = 'lowest_sold_fiat',
  /** column name */
  Median = 'median',
  /** column name */
  PrimVolume = 'prim_volume',
  /** column name */
  PrimVolumeFiat = 'prim_volume_fiat',
  /** column name */
  PrimVolumeNb = 'prim_volume_nb',
  /** column name */
  SecVolume = 'sec_volume',
  /** column name */
  SecVolume7d = 'sec_volume7d',
  /** column name */
  SecVolume24 = 'sec_volume24',
  /** column name */
  SecVolume30d = 'sec_volume30d',
  /** column name */
  SecVolumeFiat = 'sec_volume_fiat',
  /** column name */
  SecVolumeFiat7d = 'sec_volume_fiat7d',
  /** column name */
  SecVolumeFiat24 = 'sec_volume_fiat24',
  /** column name */
  SecVolumeFiat30d = 'sec_volume_fiat30d',
  /** column name */
  SecVolumeNb = 'sec_volume_nb',
  /** column name */
  SecVolumeNb7d = 'sec_volume_nb7d',
  /** column name */
  SecVolumeNb24 = 'sec_volume_nb24',
  /** column name */
  SecVolumeNb30d = 'sec_volume_nb30d',
  /** column name */
  To = 'to',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  TotalVolume = 'total_volume',
  /** column name */
  TotalVolume7d = 'total_volume7d',
  /** column name */
  TotalVolume24 = 'total_volume24',
  /** column name */
  TotalVolume30d = 'total_volume30d',
  /** column name */
  TotalVolumeChange7d = 'total_volume_change7d',
  /** column name */
  TotalVolumeChange24 = 'total_volume_change24',
  /** column name */
  TotalVolumeChange30d = 'total_volume_change30d',
  /** column name */
  TotalVolumeFiat = 'total_volume_fiat',
  /** column name */
  TotalVolumeFiat7d = 'total_volume_fiat7d',
  /** column name */
  TotalVolumeFiat24 = 'total_volume_fiat24',
  /** column name */
  TotalVolumeFiat30d = 'total_volume_fiat30d',
  /** column name */
  TotalVolumeNb = 'total_volume_nb',
  /** column name */
  TotalVolumeNb7d = 'total_volume_nb7d',
  /** column name */
  TotalVolumeNb24 = 'total_volume_nb24',
  /** column name */
  TotalVolumeNb30d = 'total_volume_nb30d'
}

/** aggregate stddev on columns */
export type Market_Stats_Stddev_Fields = {
  __typename?: 'market_stats_stddev_fields';
  floor?: Maybe<Scalars['Float']['output']>;
  floor_change7d?: Maybe<Scalars['Float']['output']>;
  floor_change24?: Maybe<Scalars['Float']['output']>;
  floor_change30d?: Maybe<Scalars['Float']['output']>;
  floor_fiat?: Maybe<Scalars['Float']['output']>;
  highest_sold?: Maybe<Scalars['Float']['output']>;
  highest_sold_fiat?: Maybe<Scalars['Float']['output']>;
  listed?: Maybe<Scalars['Float']['output']>;
  lowest_sold?: Maybe<Scalars['Float']['output']>;
  lowest_sold_fiat?: Maybe<Scalars['Float']['output']>;
  median?: Maybe<Scalars['Float']['output']>;
  prim_volume?: Maybe<Scalars['Float']['output']>;
  prim_volume_fiat?: Maybe<Scalars['Float']['output']>;
  prim_volume_nb?: Maybe<Scalars['Float']['output']>;
  sec_volume?: Maybe<Scalars['Float']['output']>;
  sec_volume7d?: Maybe<Scalars['Float']['output']>;
  sec_volume24?: Maybe<Scalars['Float']['output']>;
  sec_volume30d?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat7d?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat24?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat30d?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb7d?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb24?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb30d?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_volume7d?: Maybe<Scalars['Float']['output']>;
  total_volume24?: Maybe<Scalars['Float']['output']>;
  total_volume30d?: Maybe<Scalars['Float']['output']>;
  total_volume_change7d?: Maybe<Scalars['Float']['output']>;
  total_volume_change24?: Maybe<Scalars['Float']['output']>;
  total_volume_change30d?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat7d?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat24?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat30d?: Maybe<Scalars['Float']['output']>;
  total_volume_nb?: Maybe<Scalars['Float']['output']>;
  total_volume_nb7d?: Maybe<Scalars['Float']['output']>;
  total_volume_nb24?: Maybe<Scalars['Float']['output']>;
  total_volume_nb30d?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Market_Stats_Stddev_Pop_Fields = {
  __typename?: 'market_stats_stddev_pop_fields';
  floor?: Maybe<Scalars['Float']['output']>;
  floor_change7d?: Maybe<Scalars['Float']['output']>;
  floor_change24?: Maybe<Scalars['Float']['output']>;
  floor_change30d?: Maybe<Scalars['Float']['output']>;
  floor_fiat?: Maybe<Scalars['Float']['output']>;
  highest_sold?: Maybe<Scalars['Float']['output']>;
  highest_sold_fiat?: Maybe<Scalars['Float']['output']>;
  listed?: Maybe<Scalars['Float']['output']>;
  lowest_sold?: Maybe<Scalars['Float']['output']>;
  lowest_sold_fiat?: Maybe<Scalars['Float']['output']>;
  median?: Maybe<Scalars['Float']['output']>;
  prim_volume?: Maybe<Scalars['Float']['output']>;
  prim_volume_fiat?: Maybe<Scalars['Float']['output']>;
  prim_volume_nb?: Maybe<Scalars['Float']['output']>;
  sec_volume?: Maybe<Scalars['Float']['output']>;
  sec_volume7d?: Maybe<Scalars['Float']['output']>;
  sec_volume24?: Maybe<Scalars['Float']['output']>;
  sec_volume30d?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat7d?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat24?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat30d?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb7d?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb24?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb30d?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_volume7d?: Maybe<Scalars['Float']['output']>;
  total_volume24?: Maybe<Scalars['Float']['output']>;
  total_volume30d?: Maybe<Scalars['Float']['output']>;
  total_volume_change7d?: Maybe<Scalars['Float']['output']>;
  total_volume_change24?: Maybe<Scalars['Float']['output']>;
  total_volume_change30d?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat7d?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat24?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat30d?: Maybe<Scalars['Float']['output']>;
  total_volume_nb?: Maybe<Scalars['Float']['output']>;
  total_volume_nb7d?: Maybe<Scalars['Float']['output']>;
  total_volume_nb24?: Maybe<Scalars['Float']['output']>;
  total_volume_nb30d?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Market_Stats_Stddev_Samp_Fields = {
  __typename?: 'market_stats_stddev_samp_fields';
  floor?: Maybe<Scalars['Float']['output']>;
  floor_change7d?: Maybe<Scalars['Float']['output']>;
  floor_change24?: Maybe<Scalars['Float']['output']>;
  floor_change30d?: Maybe<Scalars['Float']['output']>;
  floor_fiat?: Maybe<Scalars['Float']['output']>;
  highest_sold?: Maybe<Scalars['Float']['output']>;
  highest_sold_fiat?: Maybe<Scalars['Float']['output']>;
  listed?: Maybe<Scalars['Float']['output']>;
  lowest_sold?: Maybe<Scalars['Float']['output']>;
  lowest_sold_fiat?: Maybe<Scalars['Float']['output']>;
  median?: Maybe<Scalars['Float']['output']>;
  prim_volume?: Maybe<Scalars['Float']['output']>;
  prim_volume_fiat?: Maybe<Scalars['Float']['output']>;
  prim_volume_nb?: Maybe<Scalars['Float']['output']>;
  sec_volume?: Maybe<Scalars['Float']['output']>;
  sec_volume7d?: Maybe<Scalars['Float']['output']>;
  sec_volume24?: Maybe<Scalars['Float']['output']>;
  sec_volume30d?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat7d?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat24?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat30d?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb7d?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb24?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb30d?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_volume7d?: Maybe<Scalars['Float']['output']>;
  total_volume24?: Maybe<Scalars['Float']['output']>;
  total_volume30d?: Maybe<Scalars['Float']['output']>;
  total_volume_change7d?: Maybe<Scalars['Float']['output']>;
  total_volume_change24?: Maybe<Scalars['Float']['output']>;
  total_volume_change30d?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat7d?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat24?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat30d?: Maybe<Scalars['Float']['output']>;
  total_volume_nb?: Maybe<Scalars['Float']['output']>;
  total_volume_nb7d?: Maybe<Scalars['Float']['output']>;
  total_volume_nb24?: Maybe<Scalars['Float']['output']>;
  total_volume_nb30d?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "market_stats" */
export type Market_Stats_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Market_Stats_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Market_Stats_Stream_Cursor_Value_Input = {
  floor?: InputMaybe<Scalars['numeric']['input']>;
  floor_change7d?: InputMaybe<Scalars['numeric']['input']>;
  floor_change24?: InputMaybe<Scalars['numeric']['input']>;
  floor_change30d?: InputMaybe<Scalars['numeric']['input']>;
  floor_fiat?: InputMaybe<Scalars['numeric']['input']>;
  from?: InputMaybe<Scalars['timestamptz']['input']>;
  highest_sold?: InputMaybe<Scalars['numeric']['input']>;
  highest_sold_fiat?: InputMaybe<Scalars['numeric']['input']>;
  listed?: InputMaybe<Scalars['Int']['input']>;
  lowest_sold?: InputMaybe<Scalars['numeric']['input']>;
  lowest_sold_fiat?: InputMaybe<Scalars['numeric']['input']>;
  median?: InputMaybe<Scalars['numeric']['input']>;
  prim_volume?: InputMaybe<Scalars['numeric']['input']>;
  prim_volume_fiat?: InputMaybe<Scalars['numeric']['input']>;
  prim_volume_nb?: InputMaybe<Scalars['Int']['input']>;
  sec_volume?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume7d?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume24?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume30d?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume_fiat?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume_fiat7d?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume_fiat24?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume_fiat30d?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume_nb?: InputMaybe<Scalars['Int']['input']>;
  sec_volume_nb7d?: InputMaybe<Scalars['Int']['input']>;
  sec_volume_nb24?: InputMaybe<Scalars['Int']['input']>;
  sec_volume_nb30d?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['timestamptz']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
  total_volume?: InputMaybe<Scalars['numeric']['input']>;
  total_volume7d?: InputMaybe<Scalars['numeric']['input']>;
  total_volume24?: InputMaybe<Scalars['numeric']['input']>;
  total_volume30d?: InputMaybe<Scalars['numeric']['input']>;
  total_volume_change7d?: InputMaybe<Scalars['numeric']['input']>;
  total_volume_change24?: InputMaybe<Scalars['numeric']['input']>;
  total_volume_change30d?: InputMaybe<Scalars['numeric']['input']>;
  total_volume_fiat?: InputMaybe<Scalars['numeric']['input']>;
  total_volume_fiat7d?: InputMaybe<Scalars['numeric']['input']>;
  total_volume_fiat24?: InputMaybe<Scalars['numeric']['input']>;
  total_volume_fiat30d?: InputMaybe<Scalars['numeric']['input']>;
  total_volume_nb?: InputMaybe<Scalars['Int']['input']>;
  total_volume_nb7d?: InputMaybe<Scalars['Int']['input']>;
  total_volume_nb24?: InputMaybe<Scalars['Int']['input']>;
  total_volume_nb30d?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Market_Stats_Sum_Fields = {
  __typename?: 'market_stats_sum_fields';
  floor?: Maybe<Scalars['numeric']['output']>;
  floor_change7d?: Maybe<Scalars['numeric']['output']>;
  floor_change24?: Maybe<Scalars['numeric']['output']>;
  floor_change30d?: Maybe<Scalars['numeric']['output']>;
  floor_fiat?: Maybe<Scalars['numeric']['output']>;
  highest_sold?: Maybe<Scalars['numeric']['output']>;
  highest_sold_fiat?: Maybe<Scalars['numeric']['output']>;
  listed?: Maybe<Scalars['Int']['output']>;
  lowest_sold?: Maybe<Scalars['numeric']['output']>;
  lowest_sold_fiat?: Maybe<Scalars['numeric']['output']>;
  median?: Maybe<Scalars['numeric']['output']>;
  prim_volume?: Maybe<Scalars['numeric']['output']>;
  prim_volume_fiat?: Maybe<Scalars['numeric']['output']>;
  prim_volume_nb?: Maybe<Scalars['Int']['output']>;
  sec_volume?: Maybe<Scalars['numeric']['output']>;
  sec_volume7d?: Maybe<Scalars['numeric']['output']>;
  sec_volume24?: Maybe<Scalars['numeric']['output']>;
  sec_volume30d?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat7d?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat24?: Maybe<Scalars['numeric']['output']>;
  sec_volume_fiat30d?: Maybe<Scalars['numeric']['output']>;
  sec_volume_nb?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb7d?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb24?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb30d?: Maybe<Scalars['Int']['output']>;
  total_volume?: Maybe<Scalars['numeric']['output']>;
  total_volume7d?: Maybe<Scalars['numeric']['output']>;
  total_volume24?: Maybe<Scalars['numeric']['output']>;
  total_volume30d?: Maybe<Scalars['numeric']['output']>;
  total_volume_change7d?: Maybe<Scalars['numeric']['output']>;
  total_volume_change24?: Maybe<Scalars['numeric']['output']>;
  total_volume_change30d?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat7d?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat24?: Maybe<Scalars['numeric']['output']>;
  total_volume_fiat30d?: Maybe<Scalars['numeric']['output']>;
  total_volume_nb?: Maybe<Scalars['Int']['output']>;
  total_volume_nb7d?: Maybe<Scalars['Int']['output']>;
  total_volume_nb24?: Maybe<Scalars['Int']['output']>;
  total_volume_nb30d?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Market_Stats_Var_Pop_Fields = {
  __typename?: 'market_stats_var_pop_fields';
  floor?: Maybe<Scalars['Float']['output']>;
  floor_change7d?: Maybe<Scalars['Float']['output']>;
  floor_change24?: Maybe<Scalars['Float']['output']>;
  floor_change30d?: Maybe<Scalars['Float']['output']>;
  floor_fiat?: Maybe<Scalars['Float']['output']>;
  highest_sold?: Maybe<Scalars['Float']['output']>;
  highest_sold_fiat?: Maybe<Scalars['Float']['output']>;
  listed?: Maybe<Scalars['Float']['output']>;
  lowest_sold?: Maybe<Scalars['Float']['output']>;
  lowest_sold_fiat?: Maybe<Scalars['Float']['output']>;
  median?: Maybe<Scalars['Float']['output']>;
  prim_volume?: Maybe<Scalars['Float']['output']>;
  prim_volume_fiat?: Maybe<Scalars['Float']['output']>;
  prim_volume_nb?: Maybe<Scalars['Float']['output']>;
  sec_volume?: Maybe<Scalars['Float']['output']>;
  sec_volume7d?: Maybe<Scalars['Float']['output']>;
  sec_volume24?: Maybe<Scalars['Float']['output']>;
  sec_volume30d?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat7d?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat24?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat30d?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb7d?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb24?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb30d?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_volume7d?: Maybe<Scalars['Float']['output']>;
  total_volume24?: Maybe<Scalars['Float']['output']>;
  total_volume30d?: Maybe<Scalars['Float']['output']>;
  total_volume_change7d?: Maybe<Scalars['Float']['output']>;
  total_volume_change24?: Maybe<Scalars['Float']['output']>;
  total_volume_change30d?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat7d?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat24?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat30d?: Maybe<Scalars['Float']['output']>;
  total_volume_nb?: Maybe<Scalars['Float']['output']>;
  total_volume_nb7d?: Maybe<Scalars['Float']['output']>;
  total_volume_nb24?: Maybe<Scalars['Float']['output']>;
  total_volume_nb30d?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Market_Stats_Var_Samp_Fields = {
  __typename?: 'market_stats_var_samp_fields';
  floor?: Maybe<Scalars['Float']['output']>;
  floor_change7d?: Maybe<Scalars['Float']['output']>;
  floor_change24?: Maybe<Scalars['Float']['output']>;
  floor_change30d?: Maybe<Scalars['Float']['output']>;
  floor_fiat?: Maybe<Scalars['Float']['output']>;
  highest_sold?: Maybe<Scalars['Float']['output']>;
  highest_sold_fiat?: Maybe<Scalars['Float']['output']>;
  listed?: Maybe<Scalars['Float']['output']>;
  lowest_sold?: Maybe<Scalars['Float']['output']>;
  lowest_sold_fiat?: Maybe<Scalars['Float']['output']>;
  median?: Maybe<Scalars['Float']['output']>;
  prim_volume?: Maybe<Scalars['Float']['output']>;
  prim_volume_fiat?: Maybe<Scalars['Float']['output']>;
  prim_volume_nb?: Maybe<Scalars['Float']['output']>;
  sec_volume?: Maybe<Scalars['Float']['output']>;
  sec_volume7d?: Maybe<Scalars['Float']['output']>;
  sec_volume24?: Maybe<Scalars['Float']['output']>;
  sec_volume30d?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat7d?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat24?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat30d?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb7d?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb24?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb30d?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_volume7d?: Maybe<Scalars['Float']['output']>;
  total_volume24?: Maybe<Scalars['Float']['output']>;
  total_volume30d?: Maybe<Scalars['Float']['output']>;
  total_volume_change7d?: Maybe<Scalars['Float']['output']>;
  total_volume_change24?: Maybe<Scalars['Float']['output']>;
  total_volume_change30d?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat7d?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat24?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat30d?: Maybe<Scalars['Float']['output']>;
  total_volume_nb?: Maybe<Scalars['Float']['output']>;
  total_volume_nb7d?: Maybe<Scalars['Float']['output']>;
  total_volume_nb24?: Maybe<Scalars['Float']['output']>;
  total_volume_nb30d?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Market_Stats_Variance_Fields = {
  __typename?: 'market_stats_variance_fields';
  floor?: Maybe<Scalars['Float']['output']>;
  floor_change7d?: Maybe<Scalars['Float']['output']>;
  floor_change24?: Maybe<Scalars['Float']['output']>;
  floor_change30d?: Maybe<Scalars['Float']['output']>;
  floor_fiat?: Maybe<Scalars['Float']['output']>;
  highest_sold?: Maybe<Scalars['Float']['output']>;
  highest_sold_fiat?: Maybe<Scalars['Float']['output']>;
  listed?: Maybe<Scalars['Float']['output']>;
  lowest_sold?: Maybe<Scalars['Float']['output']>;
  lowest_sold_fiat?: Maybe<Scalars['Float']['output']>;
  median?: Maybe<Scalars['Float']['output']>;
  prim_volume?: Maybe<Scalars['Float']['output']>;
  prim_volume_fiat?: Maybe<Scalars['Float']['output']>;
  prim_volume_nb?: Maybe<Scalars['Float']['output']>;
  sec_volume?: Maybe<Scalars['Float']['output']>;
  sec_volume7d?: Maybe<Scalars['Float']['output']>;
  sec_volume24?: Maybe<Scalars['Float']['output']>;
  sec_volume30d?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat7d?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat24?: Maybe<Scalars['Float']['output']>;
  sec_volume_fiat30d?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb7d?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb24?: Maybe<Scalars['Float']['output']>;
  sec_volume_nb30d?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_volume7d?: Maybe<Scalars['Float']['output']>;
  total_volume24?: Maybe<Scalars['Float']['output']>;
  total_volume30d?: Maybe<Scalars['Float']['output']>;
  total_volume_change7d?: Maybe<Scalars['Float']['output']>;
  total_volume_change24?: Maybe<Scalars['Float']['output']>;
  total_volume_change30d?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat7d?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat24?: Maybe<Scalars['Float']['output']>;
  total_volume_fiat30d?: Maybe<Scalars['Float']['output']>;
  total_volume_nb?: Maybe<Scalars['Float']['output']>;
  total_volume_nb7d?: Maybe<Scalars['Float']['output']>;
  total_volume_nb24?: Maybe<Scalars['Float']['output']>;
  total_volume_nb30d?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "media_image" */
export type Media_Image = {
  __typename?: 'media_image';
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['bpchar']['output'];
  metadata?: Maybe<Scalars['json']['output']>;
  mime_type?: Maybe<Scalars['String']['output']>;
  placeholder?: Maybe<Scalars['String']['output']>;
  process_counters: Scalars['smallint']['output'];
  processed: Scalars['Boolean']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};


/** columns and relationships of "media_image" */
export type Media_ImageMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "media_image". All fields are combined with a logical 'AND'. */
export type Media_Image_Bool_Exp = {
  _and?: InputMaybe<Array<Media_Image_Bool_Exp>>;
  _not?: InputMaybe<Media_Image_Bool_Exp>;
  _or?: InputMaybe<Array<Media_Image_Bool_Exp>>;
  height?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Bpchar_Comparison_Exp>;
  metadata?: InputMaybe<Json_Comparison_Exp>;
  mime_type?: InputMaybe<String_Comparison_Exp>;
  placeholder?: InputMaybe<String_Comparison_Exp>;
  process_counters?: InputMaybe<Smallint_Comparison_Exp>;
  processed?: InputMaybe<Boolean_Comparison_Exp>;
  width?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "media_image". */
export type Media_Image_Order_By = {
  height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  mime_type?: InputMaybe<Order_By>;
  placeholder?: InputMaybe<Order_By>;
  process_counters?: InputMaybe<Order_By>;
  processed?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** select columns of table "media_image" */
export enum Media_Image_Select_Column {
  /** column name */
  Height = 'height',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MimeType = 'mime_type',
  /** column name */
  Placeholder = 'placeholder',
  /** column name */
  ProcessCounters = 'process_counters',
  /** column name */
  Processed = 'processed',
  /** column name */
  Width = 'width'
}

/** Streaming cursor of the table "media_image" */
export type Media_Image_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Media_Image_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Media_Image_Stream_Cursor_Value_Input = {
  height?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['bpchar']['input']>;
  metadata?: InputMaybe<Scalars['json']['input']>;
  mime_type?: InputMaybe<Scalars['String']['input']>;
  placeholder?: InputMaybe<Scalars['String']['input']>;
  process_counters?: InputMaybe<Scalars['smallint']['input']>;
  processed?: InputMaybe<Scalars['Boolean']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

/** columns and relationships of "metric" */
export type Metric = {
  __typename?: 'metric';
  ended_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  started_at: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "metric". All fields are combined with a logical 'AND'. */
export type Metric_Bool_Exp = {
  _and?: InputMaybe<Array<Metric_Bool_Exp>>;
  _not?: InputMaybe<Metric_Bool_Exp>;
  _or?: InputMaybe<Array<Metric_Bool_Exp>>;
  ended_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  started_at?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "metric". */
export type Metric_Order_By = {
  ended_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  started_at?: InputMaybe<Order_By>;
};

/** select columns of table "metric" */
export enum Metric_Select_Column {
  /** column name */
  EndedAt = 'ended_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  StartedAt = 'started_at'
}

/** Streaming cursor of the table "metric" */
export type Metric_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Metric_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Metric_Stream_Cursor_Value_Input = {
  ended_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  started_at?: InputMaybe<Scalars['Int']['input']>;
};

/** columns and relationships of "mint_ticket" */
export type Mint_Ticket = {
  __typename?: 'mint_ticket';
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  generative_token: Generative_Token;
  id: Scalars['String']['output'];
  owner_id: Scalars['String']['output'];
  price: Scalars['numeric']['output'];
  taxation_locked: Scalars['numeric']['output'];
  taxation_paid_until: Scalars['timestamptz']['output'];
  taxation_start: Scalars['timestamptz']['output'];
  token_id: Scalars['String']['output'];
  /** An object relationship */
  user: User;
};

/** aggregated selection of "mint_ticket" */
export type Mint_Ticket_Aggregate = {
  __typename?: 'mint_ticket_aggregate';
  aggregate?: Maybe<Mint_Ticket_Aggregate_Fields>;
  nodes: Array<Mint_Ticket>;
};

export type Mint_Ticket_Aggregate_Bool_Exp = {
  count?: InputMaybe<Mint_Ticket_Aggregate_Bool_Exp_Count>;
};

export type Mint_Ticket_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Mint_Ticket_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Mint_Ticket_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "mint_ticket" */
export type Mint_Ticket_Aggregate_Fields = {
  __typename?: 'mint_ticket_aggregate_fields';
  avg?: Maybe<Mint_Ticket_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Mint_Ticket_Max_Fields>;
  min?: Maybe<Mint_Ticket_Min_Fields>;
  stddev?: Maybe<Mint_Ticket_Stddev_Fields>;
  stddev_pop?: Maybe<Mint_Ticket_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Mint_Ticket_Stddev_Samp_Fields>;
  sum?: Maybe<Mint_Ticket_Sum_Fields>;
  var_pop?: Maybe<Mint_Ticket_Var_Pop_Fields>;
  var_samp?: Maybe<Mint_Ticket_Var_Samp_Fields>;
  variance?: Maybe<Mint_Ticket_Variance_Fields>;
};


/** aggregate fields of "mint_ticket" */
export type Mint_Ticket_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Mint_Ticket_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "mint_ticket" */
export type Mint_Ticket_Aggregate_Order_By = {
  avg?: InputMaybe<Mint_Ticket_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Mint_Ticket_Max_Order_By>;
  min?: InputMaybe<Mint_Ticket_Min_Order_By>;
  stddev?: InputMaybe<Mint_Ticket_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Mint_Ticket_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Mint_Ticket_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Mint_Ticket_Sum_Order_By>;
  var_pop?: InputMaybe<Mint_Ticket_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Mint_Ticket_Var_Samp_Order_By>;
  variance?: InputMaybe<Mint_Ticket_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Mint_Ticket_Avg_Fields = {
  __typename?: 'mint_ticket_avg_fields';
  price?: Maybe<Scalars['Float']['output']>;
  taxation_locked?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "mint_ticket" */
export type Mint_Ticket_Avg_Order_By = {
  price?: InputMaybe<Order_By>;
  taxation_locked?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "mint_ticket". All fields are combined with a logical 'AND'. */
export type Mint_Ticket_Bool_Exp = {
  _and?: InputMaybe<Array<Mint_Ticket_Bool_Exp>>;
  _not?: InputMaybe<Mint_Ticket_Bool_Exp>;
  _or?: InputMaybe<Array<Mint_Ticket_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  taxation_locked?: InputMaybe<Numeric_Comparison_Exp>;
  taxation_paid_until?: InputMaybe<Timestamptz_Comparison_Exp>;
  taxation_start?: InputMaybe<Timestamptz_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
};

/** aggregate max on columns */
export type Mint_Ticket_Max_Fields = {
  __typename?: 'mint_ticket_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  owner_id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  taxation_locked?: Maybe<Scalars['numeric']['output']>;
  taxation_paid_until?: Maybe<Scalars['timestamptz']['output']>;
  taxation_start?: Maybe<Scalars['timestamptz']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "mint_ticket" */
export type Mint_Ticket_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  taxation_locked?: InputMaybe<Order_By>;
  taxation_paid_until?: InputMaybe<Order_By>;
  taxation_start?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Mint_Ticket_Min_Fields = {
  __typename?: 'mint_ticket_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  owner_id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  taxation_locked?: Maybe<Scalars['numeric']['output']>;
  taxation_paid_until?: Maybe<Scalars['timestamptz']['output']>;
  taxation_start?: Maybe<Scalars['timestamptz']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "mint_ticket" */
export type Mint_Ticket_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  taxation_locked?: InputMaybe<Order_By>;
  taxation_paid_until?: InputMaybe<Order_By>;
  taxation_start?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "mint_ticket". */
export type Mint_Ticket_Order_By = {
  created_at?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  taxation_locked?: InputMaybe<Order_By>;
  taxation_paid_until?: InputMaybe<Order_By>;
  taxation_start?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
};

/** select columns of table "mint_ticket" */
export enum Mint_Ticket_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Price = 'price',
  /** column name */
  TaxationLocked = 'taxation_locked',
  /** column name */
  TaxationPaidUntil = 'taxation_paid_until',
  /** column name */
  TaxationStart = 'taxation_start',
  /** column name */
  TokenId = 'token_id'
}

/** columns and relationships of "mint_ticket_settings" */
export type Mint_Ticket_Settings = {
  __typename?: 'mint_ticket_settings';
  capture_media_id?: Maybe<Scalars['bpchar']['output']>;
  /** An object relationship */
  generative_token: Generative_Token;
  gracing_period: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  /** An object relationship */
  media_image?: Maybe<Media_Image>;
  metadata: Scalars['json']['output'];
  metadata_uri?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "mint_ticket_settings" */
export type Mint_Ticket_SettingsMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** order by aggregate values of table "mint_ticket_settings" */
export type Mint_Ticket_Settings_Aggregate_Order_By = {
  avg?: InputMaybe<Mint_Ticket_Settings_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Mint_Ticket_Settings_Max_Order_By>;
  min?: InputMaybe<Mint_Ticket_Settings_Min_Order_By>;
  stddev?: InputMaybe<Mint_Ticket_Settings_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Mint_Ticket_Settings_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Mint_Ticket_Settings_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Mint_Ticket_Settings_Sum_Order_By>;
  var_pop?: InputMaybe<Mint_Ticket_Settings_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Mint_Ticket_Settings_Var_Samp_Order_By>;
  variance?: InputMaybe<Mint_Ticket_Settings_Variance_Order_By>;
};

/** order by avg() on columns of table "mint_ticket_settings" */
export type Mint_Ticket_Settings_Avg_Order_By = {
  gracing_period?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "mint_ticket_settings". All fields are combined with a logical 'AND'. */
export type Mint_Ticket_Settings_Bool_Exp = {
  _and?: InputMaybe<Array<Mint_Ticket_Settings_Bool_Exp>>;
  _not?: InputMaybe<Mint_Ticket_Settings_Bool_Exp>;
  _or?: InputMaybe<Array<Mint_Ticket_Settings_Bool_Exp>>;
  capture_media_id?: InputMaybe<Bpchar_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  gracing_period?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  media_image?: InputMaybe<Media_Image_Bool_Exp>;
  metadata?: InputMaybe<Json_Comparison_Exp>;
  metadata_uri?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "mint_ticket_settings" */
export type Mint_Ticket_Settings_Max_Order_By = {
  capture_media_id?: InputMaybe<Order_By>;
  gracing_period?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "mint_ticket_settings" */
export type Mint_Ticket_Settings_Min_Order_By = {
  capture_media_id?: InputMaybe<Order_By>;
  gracing_period?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "mint_ticket_settings". */
export type Mint_Ticket_Settings_Order_By = {
  capture_media_id?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  gracing_period?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  media_image?: InputMaybe<Media_Image_Order_By>;
  metadata?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
};

/** select columns of table "mint_ticket_settings" */
export enum Mint_Ticket_Settings_Select_Column {
  /** column name */
  CaptureMediaId = 'capture_media_id',
  /** column name */
  GracingPeriod = 'gracing_period',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MetadataUri = 'metadata_uri'
}

/** order by stddev() on columns of table "mint_ticket_settings" */
export type Mint_Ticket_Settings_Stddev_Order_By = {
  gracing_period?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "mint_ticket_settings" */
export type Mint_Ticket_Settings_Stddev_Pop_Order_By = {
  gracing_period?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "mint_ticket_settings" */
export type Mint_Ticket_Settings_Stddev_Samp_Order_By = {
  gracing_period?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "mint_ticket_settings" */
export type Mint_Ticket_Settings_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Mint_Ticket_Settings_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Mint_Ticket_Settings_Stream_Cursor_Value_Input = {
  capture_media_id?: InputMaybe<Scalars['bpchar']['input']>;
  gracing_period?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['json']['input']>;
  metadata_uri?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "mint_ticket_settings" */
export type Mint_Ticket_Settings_Sum_Order_By = {
  gracing_period?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "mint_ticket_settings" */
export type Mint_Ticket_Settings_Var_Pop_Order_By = {
  gracing_period?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "mint_ticket_settings" */
export type Mint_Ticket_Settings_Var_Samp_Order_By = {
  gracing_period?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "mint_ticket_settings" */
export type Mint_Ticket_Settings_Variance_Order_By = {
  gracing_period?: InputMaybe<Order_By>;
};

/** aggregate stddev on columns */
export type Mint_Ticket_Stddev_Fields = {
  __typename?: 'mint_ticket_stddev_fields';
  price?: Maybe<Scalars['Float']['output']>;
  taxation_locked?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "mint_ticket" */
export type Mint_Ticket_Stddev_Order_By = {
  price?: InputMaybe<Order_By>;
  taxation_locked?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Mint_Ticket_Stddev_Pop_Fields = {
  __typename?: 'mint_ticket_stddev_pop_fields';
  price?: Maybe<Scalars['Float']['output']>;
  taxation_locked?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "mint_ticket" */
export type Mint_Ticket_Stddev_Pop_Order_By = {
  price?: InputMaybe<Order_By>;
  taxation_locked?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Mint_Ticket_Stddev_Samp_Fields = {
  __typename?: 'mint_ticket_stddev_samp_fields';
  price?: Maybe<Scalars['Float']['output']>;
  taxation_locked?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "mint_ticket" */
export type Mint_Ticket_Stddev_Samp_Order_By = {
  price?: InputMaybe<Order_By>;
  taxation_locked?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "mint_ticket" */
export type Mint_Ticket_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Mint_Ticket_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Mint_Ticket_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  owner_id?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  taxation_locked?: InputMaybe<Scalars['numeric']['input']>;
  taxation_paid_until?: InputMaybe<Scalars['timestamptz']['input']>;
  taxation_start?: InputMaybe<Scalars['timestamptz']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Mint_Ticket_Sum_Fields = {
  __typename?: 'mint_ticket_sum_fields';
  price?: Maybe<Scalars['numeric']['output']>;
  taxation_locked?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "mint_ticket" */
export type Mint_Ticket_Sum_Order_By = {
  price?: InputMaybe<Order_By>;
  taxation_locked?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Mint_Ticket_Var_Pop_Fields = {
  __typename?: 'mint_ticket_var_pop_fields';
  price?: Maybe<Scalars['Float']['output']>;
  taxation_locked?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "mint_ticket" */
export type Mint_Ticket_Var_Pop_Order_By = {
  price?: InputMaybe<Order_By>;
  taxation_locked?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Mint_Ticket_Var_Samp_Fields = {
  __typename?: 'mint_ticket_var_samp_fields';
  price?: Maybe<Scalars['Float']['output']>;
  taxation_locked?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "mint_ticket" */
export type Mint_Ticket_Var_Samp_Order_By = {
  price?: InputMaybe<Order_By>;
  taxation_locked?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Mint_Ticket_Variance_Fields = {
  __typename?: 'mint_ticket_variance_fields';
  price?: Maybe<Scalars['Float']['output']>;
  taxation_locked?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "mint_ticket" */
export type Mint_Ticket_Variance_Order_By = {
  price?: InputMaybe<Order_By>;
  taxation_locked?: InputMaybe<Order_By>;
};

/** columns and relationships of "moderation_reason" */
export type Moderation_Reason = {
  __typename?: 'moderation_reason';
  /** An array relationship */
  articles: Array<Article>;
  /** An aggregate relationship */
  articles_aggregate: Article_Aggregate;
  /** An array relationship */
  generative_tokens: Array<Generative_Token>;
  /** An aggregate relationship */
  generative_tokens_aggregate: Generative_Token_Aggregate;
  id: Scalars['String']['output'];
  reason: Scalars['String']['output'];
  /** An array relationship */
  reports: Array<Report>;
  /** An array relationship */
  users: Array<User>;
};


/** columns and relationships of "moderation_reason" */
export type Moderation_ReasonArticlesArgs = {
  distinct_on?: InputMaybe<Array<Article_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Order_By>>;
  where?: InputMaybe<Article_Bool_Exp>;
};


/** columns and relationships of "moderation_reason" */
export type Moderation_ReasonArticles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Article_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Order_By>>;
  where?: InputMaybe<Article_Bool_Exp>;
};


/** columns and relationships of "moderation_reason" */
export type Moderation_ReasonGenerative_TokensArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Order_By>>;
  where?: InputMaybe<Generative_Token_Bool_Exp>;
};


/** columns and relationships of "moderation_reason" */
export type Moderation_ReasonGenerative_Tokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Order_By>>;
  where?: InputMaybe<Generative_Token_Bool_Exp>;
};


/** columns and relationships of "moderation_reason" */
export type Moderation_ReasonReportsArgs = {
  distinct_on?: InputMaybe<Array<Report_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Report_Order_By>>;
  where?: InputMaybe<Report_Bool_Exp>;
};


/** columns and relationships of "moderation_reason" */
export type Moderation_ReasonUsersArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "moderation_reason". All fields are combined with a logical 'AND'. */
export type Moderation_Reason_Bool_Exp = {
  _and?: InputMaybe<Array<Moderation_Reason_Bool_Exp>>;
  _not?: InputMaybe<Moderation_Reason_Bool_Exp>;
  _or?: InputMaybe<Array<Moderation_Reason_Bool_Exp>>;
  articles?: InputMaybe<Article_Bool_Exp>;
  articles_aggregate?: InputMaybe<Article_Aggregate_Bool_Exp>;
  generative_tokens?: InputMaybe<Generative_Token_Bool_Exp>;
  generative_tokens_aggregate?: InputMaybe<Generative_Token_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  reason?: InputMaybe<String_Comparison_Exp>;
  reports?: InputMaybe<Report_Bool_Exp>;
  users?: InputMaybe<User_Bool_Exp>;
};

/** Ordering options when selecting data from "moderation_reason". */
export type Moderation_Reason_Order_By = {
  articles_aggregate?: InputMaybe<Article_Aggregate_Order_By>;
  generative_tokens_aggregate?: InputMaybe<Generative_Token_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  reason?: InputMaybe<Order_By>;
  reports_aggregate?: InputMaybe<Report_Aggregate_Order_By>;
  users_aggregate?: InputMaybe<User_Aggregate_Order_By>;
};

/** select columns of table "moderation_reason" */
export enum Moderation_Reason_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Reason = 'reason'
}

/** Streaming cursor of the table "moderation_reason" */
export type Moderation_Reason_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Moderation_Reason_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Moderation_Reason_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  airdrop_tez_claim?: Maybe<AirdropTezClaimResult>;
  authenticate?: Maybe<AuthenticationResult>;
  /** Authenticate using a Web3Auth idToken */
  authenticate_web3auth?: Maybe<AuthenticationResult>;
  delete_account?: Maybe<DeleteAccountOutput>;
  generate_challenge?: Maybe<ChallengeResult>;
  link_wallet_to_account: Scalars['Boolean']['output'];
  /** Logout the current logged in user. For cookie sessions, no need to pass any input. */
  logout?: Maybe<LogoutResult>;
  offchain?: Maybe<Offchain_Mutation_Frontend>;
  prepare_redemption: PrepareRedemptionOutput;
  refresh?: Maybe<AuthenticationResult>;
  request_mint?: Maybe<Array<RequestMintResult>>;
  request_transfer_wallet: RequestTransferWalletOutput;
  /** given a sign in message from the farcaster account's wallet, sets the farcaster handle in the user profile */
  set_farcaster_handle?: Maybe<SetFarcasterHandleResult>;
  /** updates the smart contract tied to a consumable */
  set_whitelist?: Maybe<SetWhitelistOutput>;
  transfer_wallet: Scalars['Boolean']['output'];
  unlink_wallet_from_account: Scalars['Boolean']['output'];
  update_account?: Maybe<UpdateAccountOutput>;
  /** Use an OTP with an email to issue a JWT for web3auth custom provider validation */
  web3auth_email_auth_otp?: Maybe<Web3AuthEmailAuthOtpOutput>;
  /** Request an OTP verification for email verification */
  web3auth_email_request_otp?: Maybe<Web3AuthEmailRequestOtpOutput>;
  /** Use a provider oauth id token to issue a JWT for web3auth custom provider validation */
  web3auth_oauth?: Maybe<Web3AuthOAuthOutput>;
};


/** mutation root */
export type Mutation_RootAirdrop_Tez_ClaimArgs = {
  input?: InputMaybe<AirdropTezClaimInput>;
};


/** mutation root */
export type Mutation_RootAuthenticateArgs = {
  input: AuthenticationInput;
};


/** mutation root */
export type Mutation_RootAuthenticate_Web3authArgs = {
  input: AuthenticationWeb3AuthInput;
};


/** mutation root */
export type Mutation_RootGenerate_ChallengeArgs = {
  input: ChallengeInput;
};


/** mutation root */
export type Mutation_RootLink_Wallet_To_AccountArgs = {
  input?: InputMaybe<LinkWalletInput>;
};


/** mutation root */
export type Mutation_RootLogoutArgs = {
  input?: InputMaybe<LogoutInput>;
};


/** mutation root */
export type Mutation_RootPrepare_RedemptionArgs = {
  input: PrepareRedemptionInput;
};


/** mutation root */
export type Mutation_RootRefreshArgs = {
  input: RefreshInput;
};


/** mutation root */
export type Mutation_RootRequest_MintArgs = {
  input: RequestMintInput;
};


/** mutation root */
export type Mutation_RootRequest_Transfer_WalletArgs = {
  input: RequestTransferWalletInput;
};


/** mutation root */
export type Mutation_RootSet_Farcaster_HandleArgs = {
  input: SetFarcasterHandleInput;
};


/** mutation root */
export type Mutation_RootSet_WhitelistArgs = {
  whitelist: Scalars['jsonb']['input'];
};


/** mutation root */
export type Mutation_RootTransfer_WalletArgs = {
  input: TransferWalletInput;
};


/** mutation root */
export type Mutation_RootUnlink_Wallet_From_AccountArgs = {
  input?: InputMaybe<UnlinkWalletInput>;
};


/** mutation root */
export type Mutation_RootUpdate_AccountArgs = {
  input: UpdateAccountInput;
};


/** mutation root */
export type Mutation_RootWeb3auth_Email_Auth_OtpArgs = {
  input: Web3AuthEmailAuthOtpInput;
};


/** mutation root */
export type Mutation_RootWeb3auth_Email_Request_OtpArgs = {
  input: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootWeb3auth_OauthArgs = {
  input: Web3AuthOAuthInput;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _eq?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _gt?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _gte?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['numeric']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _lte?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _neq?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['numeric']['input']>>>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** columns and relationships of "objkt" */
export type Objkt = {
  __typename?: 'objkt';
  /** An array relationship */
  actions: Array<Action>;
  /** An aggregate relationship */
  actions_aggregate: Action_Aggregate;
  /** An object relationship */
  active_listings?: Maybe<Active_Listing>;
  assigned?: Maybe<Scalars['Boolean']['output']>;
  assigned_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An array relationship */
  auctions: Array<Auction>;
  capture_media_id?: Maybe<Scalars['bpchar']['output']>;
  /** An array relationship */
  children: Array<Objkt>;
  /** An aggregate relationship */
  children_aggregate: Objkt_Aggregate;
  children_count: Scalars['Int']['output'];
  created_at: Scalars['timestamptz']['output'];
  depth: Scalars['Int']['output'];
  display_still_uri?: Maybe<Scalars['bpchar']['output']>;
  display_uri?: Maybe<Scalars['bpchar']['output']>;
  duplicate?: Maybe<Scalars['Boolean']['output']>;
  features?: Maybe<Scalars['jsonb']['output']>;
  generation_hash?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  generative_token: Generative_Token;
  /** An object relationship */
  gentk_assign?: Maybe<Gentk_Assign>;
  id: Scalars['String']['output'];
  input_bytes?: Maybe<Scalars['String']['output']>;
  issuer_id: Scalars['String']['output'];
  iteration: Scalars['Int']['output'];
  /** An array relationship */
  listings: Array<Listing>;
  /** An aggregate relationship */
  listings_aggregate: Listing_Aggregate;
  /** An object relationship */
  media_image?: Maybe<Media_Image>;
  metadata?: Maybe<Scalars['json']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  /** A computed field, executes function "objkt_minted_price" */
  minted_price?: Maybe<Scalars['numeric']['output']>;
  /** An object relationship */
  minter?: Maybe<User>;
  minter_id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  offers: Array<Offer>;
  /** An aggregate relationship */
  offers_aggregate: Offer_Aggregate;
  /** An object relationship */
  owner?: Maybe<User>;
  owner_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  parent?: Maybe<Objkt>;
  parent_hashes?: Maybe<Scalars['jsonb']['output']>;
  parent_id?: Maybe<Scalars['String']['output']>;
  rarity?: Maybe<Scalars['float8']['output']>;
  /** An array relationship */
  redemptions: Array<Redemption>;
  royalties: Scalars['Int']['output'];
  /** An array relationship */
  secondary_splits: Array<Split>;
  slug?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  splits: Array<Split>;
  state: Scalars['String']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  thumbnail_uri?: Maybe<Scalars['bpchar']['output']>;
  /** An array relationship */
  transactions: Array<Transaction>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  version: Scalars['Int']['output'];
  /** An object relationship */
  wallet_account?: Maybe<Wallet_Account>;
};


/** columns and relationships of "objkt" */
export type ObjktActionsArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


/** columns and relationships of "objkt" */
export type ObjktActions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


/** columns and relationships of "objkt" */
export type ObjktAuctionsArgs = {
  distinct_on?: InputMaybe<Array<Auction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Auction_Order_By>>;
  where?: InputMaybe<Auction_Bool_Exp>;
};


/** columns and relationships of "objkt" */
export type ObjktChildrenArgs = {
  distinct_on?: InputMaybe<Array<Objkt_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Objkt_Order_By>>;
  where?: InputMaybe<Objkt_Bool_Exp>;
};


/** columns and relationships of "objkt" */
export type ObjktChildren_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Objkt_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Objkt_Order_By>>;
  where?: InputMaybe<Objkt_Bool_Exp>;
};


/** columns and relationships of "objkt" */
export type ObjktFeaturesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "objkt" */
export type ObjktListingsArgs = {
  distinct_on?: InputMaybe<Array<Listing_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Listing_Order_By>>;
  where?: InputMaybe<Listing_Bool_Exp>;
};


/** columns and relationships of "objkt" */
export type ObjktListings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Listing_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Listing_Order_By>>;
  where?: InputMaybe<Listing_Bool_Exp>;
};


/** columns and relationships of "objkt" */
export type ObjktMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "objkt" */
export type ObjktOffersArgs = {
  distinct_on?: InputMaybe<Array<Offer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Offer_Order_By>>;
  where?: InputMaybe<Offer_Bool_Exp>;
};


/** columns and relationships of "objkt" */
export type ObjktOffers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Offer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Offer_Order_By>>;
  where?: InputMaybe<Offer_Bool_Exp>;
};


/** columns and relationships of "objkt" */
export type ObjktParent_HashesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "objkt" */
export type ObjktRedemptionsArgs = {
  distinct_on?: InputMaybe<Array<Redemption_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redemption_Order_By>>;
  where?: InputMaybe<Redemption_Bool_Exp>;
};


/** columns and relationships of "objkt" */
export type ObjktSecondary_SplitsArgs = {
  distinct_on?: InputMaybe<Array<Split_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Split_Order_By>>;
  where?: InputMaybe<Split_Bool_Exp>;
};


/** columns and relationships of "objkt" */
export type ObjktSplitsArgs = {
  distinct_on?: InputMaybe<Array<Split_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Split_Order_By>>;
  where?: InputMaybe<Split_Bool_Exp>;
};


/** columns and relationships of "objkt" */
export type ObjktTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transaction_Order_By>>;
  where?: InputMaybe<Transaction_Bool_Exp>;
};

/** aggregated selection of "objkt" */
export type Objkt_Aggregate = {
  __typename?: 'objkt_aggregate';
  aggregate?: Maybe<Objkt_Aggregate_Fields>;
  nodes: Array<Objkt>;
};

export type Objkt_Aggregate_Bool_Exp = {
  avg?: InputMaybe<Objkt_Aggregate_Bool_Exp_Avg>;
  bool_and?: InputMaybe<Objkt_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Objkt_Aggregate_Bool_Exp_Bool_Or>;
  corr?: InputMaybe<Objkt_Aggregate_Bool_Exp_Corr>;
  count?: InputMaybe<Objkt_Aggregate_Bool_Exp_Count>;
  covar_samp?: InputMaybe<Objkt_Aggregate_Bool_Exp_Covar_Samp>;
  max?: InputMaybe<Objkt_Aggregate_Bool_Exp_Max>;
  min?: InputMaybe<Objkt_Aggregate_Bool_Exp_Min>;
  stddev_samp?: InputMaybe<Objkt_Aggregate_Bool_Exp_Stddev_Samp>;
  sum?: InputMaybe<Objkt_Aggregate_Bool_Exp_Sum>;
  var_samp?: InputMaybe<Objkt_Aggregate_Bool_Exp_Var_Samp>;
};

export type Objkt_Aggregate_Bool_Exp_Avg = {
  arguments: Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Avg_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Objkt_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Objkt_Aggregate_Bool_Exp_Bool_And = {
  arguments: Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Objkt_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Objkt_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Objkt_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Objkt_Aggregate_Bool_Exp_Corr = {
  arguments: Objkt_Aggregate_Bool_Exp_Corr_Arguments;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Objkt_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Objkt_Aggregate_Bool_Exp_Corr_Arguments = {
  X: Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Corr_Arguments_Columns;
  Y: Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Corr_Arguments_Columns;
};

export type Objkt_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Objkt_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Objkt_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

export type Objkt_Aggregate_Bool_Exp_Covar_Samp = {
  arguments: Objkt_Aggregate_Bool_Exp_Covar_Samp_Arguments;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Objkt_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Objkt_Aggregate_Bool_Exp_Covar_Samp_Arguments = {
  X: Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
  Y: Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
};

export type Objkt_Aggregate_Bool_Exp_Max = {
  arguments: Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Max_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Objkt_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Objkt_Aggregate_Bool_Exp_Min = {
  arguments: Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Min_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Objkt_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Objkt_Aggregate_Bool_Exp_Stddev_Samp = {
  arguments: Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Objkt_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Objkt_Aggregate_Bool_Exp_Sum = {
  arguments: Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Sum_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Objkt_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Objkt_Aggregate_Bool_Exp_Var_Samp = {
  arguments: Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Objkt_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

/** aggregate fields of "objkt" */
export type Objkt_Aggregate_Fields = {
  __typename?: 'objkt_aggregate_fields';
  avg?: Maybe<Objkt_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Objkt_Max_Fields>;
  min?: Maybe<Objkt_Min_Fields>;
  stddev?: Maybe<Objkt_Stddev_Fields>;
  stddev_pop?: Maybe<Objkt_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Objkt_Stddev_Samp_Fields>;
  sum?: Maybe<Objkt_Sum_Fields>;
  var_pop?: Maybe<Objkt_Var_Pop_Fields>;
  var_samp?: Maybe<Objkt_Var_Samp_Fields>;
  variance?: Maybe<Objkt_Variance_Fields>;
};


/** aggregate fields of "objkt" */
export type Objkt_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Objkt_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "objkt" */
export type Objkt_Aggregate_Order_By = {
  avg?: InputMaybe<Objkt_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Objkt_Max_Order_By>;
  min?: InputMaybe<Objkt_Min_Order_By>;
  stddev?: InputMaybe<Objkt_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Objkt_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Objkt_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Objkt_Sum_Order_By>;
  var_pop?: InputMaybe<Objkt_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Objkt_Var_Samp_Order_By>;
  variance?: InputMaybe<Objkt_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Objkt_Avg_Fields = {
  __typename?: 'objkt_avg_fields';
  children_count?: Maybe<Scalars['Float']['output']>;
  depth?: Maybe<Scalars['Float']['output']>;
  iteration?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "objkt_minted_price" */
  minted_price?: Maybe<Scalars['numeric']['output']>;
  rarity?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "objkt" */
export type Objkt_Avg_Order_By = {
  children_count?: InputMaybe<Order_By>;
  depth?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "objkt". All fields are combined with a logical 'AND'. */
export type Objkt_Bool_Exp = {
  _and?: InputMaybe<Array<Objkt_Bool_Exp>>;
  _not?: InputMaybe<Objkt_Bool_Exp>;
  _or?: InputMaybe<Array<Objkt_Bool_Exp>>;
  actions?: InputMaybe<Action_Bool_Exp>;
  actions_aggregate?: InputMaybe<Action_Aggregate_Bool_Exp>;
  active_listings?: InputMaybe<Active_Listing_Bool_Exp>;
  assigned?: InputMaybe<Boolean_Comparison_Exp>;
  assigned_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  auctions?: InputMaybe<Auction_Bool_Exp>;
  capture_media_id?: InputMaybe<Bpchar_Comparison_Exp>;
  children?: InputMaybe<Objkt_Bool_Exp>;
  children_aggregate?: InputMaybe<Objkt_Aggregate_Bool_Exp>;
  children_count?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  depth?: InputMaybe<Int_Comparison_Exp>;
  display_still_uri?: InputMaybe<Bpchar_Comparison_Exp>;
  display_uri?: InputMaybe<Bpchar_Comparison_Exp>;
  duplicate?: InputMaybe<Boolean_Comparison_Exp>;
  features?: InputMaybe<Jsonb_Comparison_Exp>;
  generation_hash?: InputMaybe<String_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  gentk_assign?: InputMaybe<Gentk_Assign_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  input_bytes?: InputMaybe<String_Comparison_Exp>;
  issuer_id?: InputMaybe<String_Comparison_Exp>;
  iteration?: InputMaybe<Int_Comparison_Exp>;
  listings?: InputMaybe<Listing_Bool_Exp>;
  listings_aggregate?: InputMaybe<Listing_Aggregate_Bool_Exp>;
  media_image?: InputMaybe<Media_Image_Bool_Exp>;
  metadata?: InputMaybe<Json_Comparison_Exp>;
  metadata_uri?: InputMaybe<String_Comparison_Exp>;
  minted_price?: InputMaybe<Numeric_Comparison_Exp>;
  minter?: InputMaybe<User_Bool_Exp>;
  minter_id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  offers?: InputMaybe<Offer_Bool_Exp>;
  offers_aggregate?: InputMaybe<Offer_Aggregate_Bool_Exp>;
  owner?: InputMaybe<User_Bool_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  parent?: InputMaybe<Objkt_Bool_Exp>;
  parent_hashes?: InputMaybe<Jsonb_Comparison_Exp>;
  parent_id?: InputMaybe<String_Comparison_Exp>;
  rarity?: InputMaybe<Float8_Comparison_Exp>;
  redemptions?: InputMaybe<Redemption_Bool_Exp>;
  royalties?: InputMaybe<Int_Comparison_Exp>;
  secondary_splits?: InputMaybe<Split_Bool_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  splits?: InputMaybe<Split_Bool_Exp>;
  state?: InputMaybe<String_Comparison_Exp>;
  tags?: InputMaybe<String_Array_Comparison_Exp>;
  thumbnail_uri?: InputMaybe<Bpchar_Comparison_Exp>;
  transactions?: InputMaybe<Transaction_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  version?: InputMaybe<Int_Comparison_Exp>;
  wallet_account?: InputMaybe<Wallet_Account_Bool_Exp>;
};

/** aggregate max on columns */
export type Objkt_Max_Fields = {
  __typename?: 'objkt_max_fields';
  assigned_at?: Maybe<Scalars['timestamptz']['output']>;
  capture_media_id?: Maybe<Scalars['bpchar']['output']>;
  children_count?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  depth?: Maybe<Scalars['Int']['output']>;
  display_still_uri?: Maybe<Scalars['bpchar']['output']>;
  display_uri?: Maybe<Scalars['bpchar']['output']>;
  generation_hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  input_bytes?: Maybe<Scalars['String']['output']>;
  issuer_id?: Maybe<Scalars['String']['output']>;
  iteration?: Maybe<Scalars['Int']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  /** A computed field, executes function "objkt_minted_price" */
  minted_price?: Maybe<Scalars['numeric']['output']>;
  minter_id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner_id?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['String']['output']>;
  rarity?: Maybe<Scalars['float8']['output']>;
  royalties?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  thumbnail_uri?: Maybe<Scalars['bpchar']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "objkt" */
export type Objkt_Max_Order_By = {
  assigned_at?: InputMaybe<Order_By>;
  capture_media_id?: InputMaybe<Order_By>;
  children_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  depth?: InputMaybe<Order_By>;
  display_still_uri?: InputMaybe<Order_By>;
  display_uri?: InputMaybe<Order_By>;
  generation_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  input_bytes?: InputMaybe<Order_By>;
  issuer_id?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  minter_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tags?: InputMaybe<Order_By>;
  thumbnail_uri?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Objkt_Min_Fields = {
  __typename?: 'objkt_min_fields';
  assigned_at?: Maybe<Scalars['timestamptz']['output']>;
  capture_media_id?: Maybe<Scalars['bpchar']['output']>;
  children_count?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  depth?: Maybe<Scalars['Int']['output']>;
  display_still_uri?: Maybe<Scalars['bpchar']['output']>;
  display_uri?: Maybe<Scalars['bpchar']['output']>;
  generation_hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  input_bytes?: Maybe<Scalars['String']['output']>;
  issuer_id?: Maybe<Scalars['String']['output']>;
  iteration?: Maybe<Scalars['Int']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  /** A computed field, executes function "objkt_minted_price" */
  minted_price?: Maybe<Scalars['numeric']['output']>;
  minter_id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner_id?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['String']['output']>;
  rarity?: Maybe<Scalars['float8']['output']>;
  royalties?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  thumbnail_uri?: Maybe<Scalars['bpchar']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "objkt" */
export type Objkt_Min_Order_By = {
  assigned_at?: InputMaybe<Order_By>;
  capture_media_id?: InputMaybe<Order_By>;
  children_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  depth?: InputMaybe<Order_By>;
  display_still_uri?: InputMaybe<Order_By>;
  display_uri?: InputMaybe<Order_By>;
  generation_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  input_bytes?: InputMaybe<Order_By>;
  issuer_id?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  minter_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tags?: InputMaybe<Order_By>;
  thumbnail_uri?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "objkt". */
export type Objkt_Order_By = {
  actions_aggregate?: InputMaybe<Action_Aggregate_Order_By>;
  active_listings?: InputMaybe<Active_Listing_Order_By>;
  assigned?: InputMaybe<Order_By>;
  assigned_at?: InputMaybe<Order_By>;
  auctions_aggregate?: InputMaybe<Auction_Aggregate_Order_By>;
  capture_media_id?: InputMaybe<Order_By>;
  children_aggregate?: InputMaybe<Objkt_Aggregate_Order_By>;
  children_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  depth?: InputMaybe<Order_By>;
  display_still_uri?: InputMaybe<Order_By>;
  display_uri?: InputMaybe<Order_By>;
  duplicate?: InputMaybe<Order_By>;
  features?: InputMaybe<Order_By>;
  generation_hash?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  gentk_assign?: InputMaybe<Gentk_Assign_Order_By>;
  id?: InputMaybe<Order_By>;
  input_bytes?: InputMaybe<Order_By>;
  issuer_id?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
  listings_aggregate?: InputMaybe<Listing_Aggregate_Order_By>;
  media_image?: InputMaybe<Media_Image_Order_By>;
  metadata?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  minted_price?: InputMaybe<Order_By>;
  minter?: InputMaybe<User_Order_By>;
  minter_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  offers_aggregate?: InputMaybe<Offer_Aggregate_Order_By>;
  owner?: InputMaybe<User_Order_By>;
  owner_id?: InputMaybe<Order_By>;
  parent?: InputMaybe<Objkt_Order_By>;
  parent_hashes?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  redemptions_aggregate?: InputMaybe<Redemption_Aggregate_Order_By>;
  royalties?: InputMaybe<Order_By>;
  secondary_splits_aggregate?: InputMaybe<Split_Aggregate_Order_By>;
  slug?: InputMaybe<Order_By>;
  splits_aggregate?: InputMaybe<Split_Aggregate_Order_By>;
  state?: InputMaybe<Order_By>;
  tags?: InputMaybe<Order_By>;
  thumbnail_uri?: InputMaybe<Order_By>;
  transactions_aggregate?: InputMaybe<Transaction_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
  wallet_account?: InputMaybe<Wallet_Account_Order_By>;
};

/** select columns of table "objkt" */
export enum Objkt_Select_Column {
  /** column name */
  Assigned = 'assigned',
  /** column name */
  AssignedAt = 'assigned_at',
  /** column name */
  CaptureMediaId = 'capture_media_id',
  /** column name */
  ChildrenCount = 'children_count',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Depth = 'depth',
  /** column name */
  DisplayStillUri = 'display_still_uri',
  /** column name */
  DisplayUri = 'display_uri',
  /** column name */
  Duplicate = 'duplicate',
  /** column name */
  Features = 'features',
  /** column name */
  GenerationHash = 'generation_hash',
  /** column name */
  Id = 'id',
  /** column name */
  InputBytes = 'input_bytes',
  /** column name */
  IssuerId = 'issuer_id',
  /** column name */
  Iteration = 'iteration',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MetadataUri = 'metadata_uri',
  /** column name */
  MinterId = 'minter_id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  ParentHashes = 'parent_hashes',
  /** column name */
  ParentId = 'parent_id',
  /** column name */
  Rarity = 'rarity',
  /** column name */
  Royalties = 'royalties',
  /** column name */
  Slug = 'slug',
  /** column name */
  State = 'state',
  /** column name */
  Tags = 'tags',
  /** column name */
  ThumbnailUri = 'thumbnail_uri',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Version = 'version'
}

/** select "objkt_aggregate_bool_exp_avg_arguments_columns" columns of table "objkt" */
export enum Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Avg_Arguments_Columns {
  /** column name */
  Rarity = 'rarity'
}

/** select "objkt_aggregate_bool_exp_bool_and_arguments_columns" columns of table "objkt" */
export enum Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Assigned = 'assigned',
  /** column name */
  Duplicate = 'duplicate'
}

/** select "objkt_aggregate_bool_exp_bool_or_arguments_columns" columns of table "objkt" */
export enum Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Assigned = 'assigned',
  /** column name */
  Duplicate = 'duplicate'
}

/** select "objkt_aggregate_bool_exp_corr_arguments_columns" columns of table "objkt" */
export enum Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Corr_Arguments_Columns {
  /** column name */
  Rarity = 'rarity'
}

/** select "objkt_aggregate_bool_exp_covar_samp_arguments_columns" columns of table "objkt" */
export enum Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns {
  /** column name */
  Rarity = 'rarity'
}

/** select "objkt_aggregate_bool_exp_max_arguments_columns" columns of table "objkt" */
export enum Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Max_Arguments_Columns {
  /** column name */
  Rarity = 'rarity'
}

/** select "objkt_aggregate_bool_exp_min_arguments_columns" columns of table "objkt" */
export enum Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Min_Arguments_Columns {
  /** column name */
  Rarity = 'rarity'
}

/** select "objkt_aggregate_bool_exp_stddev_samp_arguments_columns" columns of table "objkt" */
export enum Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns {
  /** column name */
  Rarity = 'rarity'
}

/** select "objkt_aggregate_bool_exp_sum_arguments_columns" columns of table "objkt" */
export enum Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Sum_Arguments_Columns {
  /** column name */
  Rarity = 'rarity'
}

/** select "objkt_aggregate_bool_exp_var_samp_arguments_columns" columns of table "objkt" */
export enum Objkt_Select_Column_Objkt_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns {
  /** column name */
  Rarity = 'rarity'
}

/** aggregate stddev on columns */
export type Objkt_Stddev_Fields = {
  __typename?: 'objkt_stddev_fields';
  children_count?: Maybe<Scalars['Float']['output']>;
  depth?: Maybe<Scalars['Float']['output']>;
  iteration?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "objkt_minted_price" */
  minted_price?: Maybe<Scalars['numeric']['output']>;
  rarity?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "objkt" */
export type Objkt_Stddev_Order_By = {
  children_count?: InputMaybe<Order_By>;
  depth?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Objkt_Stddev_Pop_Fields = {
  __typename?: 'objkt_stddev_pop_fields';
  children_count?: Maybe<Scalars['Float']['output']>;
  depth?: Maybe<Scalars['Float']['output']>;
  iteration?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "objkt_minted_price" */
  minted_price?: Maybe<Scalars['numeric']['output']>;
  rarity?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "objkt" */
export type Objkt_Stddev_Pop_Order_By = {
  children_count?: InputMaybe<Order_By>;
  depth?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Objkt_Stddev_Samp_Fields = {
  __typename?: 'objkt_stddev_samp_fields';
  children_count?: Maybe<Scalars['Float']['output']>;
  depth?: Maybe<Scalars['Float']['output']>;
  iteration?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "objkt_minted_price" */
  minted_price?: Maybe<Scalars['numeric']['output']>;
  rarity?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "objkt" */
export type Objkt_Stddev_Samp_Order_By = {
  children_count?: InputMaybe<Order_By>;
  depth?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "objkt" */
export type Objkt_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Objkt_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Objkt_Stream_Cursor_Value_Input = {
  assigned?: InputMaybe<Scalars['Boolean']['input']>;
  assigned_at?: InputMaybe<Scalars['timestamptz']['input']>;
  capture_media_id?: InputMaybe<Scalars['bpchar']['input']>;
  children_count?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  depth?: InputMaybe<Scalars['Int']['input']>;
  display_still_uri?: InputMaybe<Scalars['bpchar']['input']>;
  display_uri?: InputMaybe<Scalars['bpchar']['input']>;
  duplicate?: InputMaybe<Scalars['Boolean']['input']>;
  features?: InputMaybe<Scalars['jsonb']['input']>;
  generation_hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  input_bytes?: InputMaybe<Scalars['String']['input']>;
  issuer_id?: InputMaybe<Scalars['String']['input']>;
  iteration?: InputMaybe<Scalars['Int']['input']>;
  metadata?: InputMaybe<Scalars['json']['input']>;
  metadata_uri?: InputMaybe<Scalars['String']['input']>;
  minter_id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner_id?: InputMaybe<Scalars['String']['input']>;
  parent_hashes?: InputMaybe<Scalars['jsonb']['input']>;
  parent_id?: InputMaybe<Scalars['String']['input']>;
  rarity?: InputMaybe<Scalars['float8']['input']>;
  royalties?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnail_uri?: InputMaybe<Scalars['bpchar']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Objkt_Sum_Fields = {
  __typename?: 'objkt_sum_fields';
  children_count?: Maybe<Scalars['Int']['output']>;
  depth?: Maybe<Scalars['Int']['output']>;
  iteration?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "objkt_minted_price" */
  minted_price?: Maybe<Scalars['numeric']['output']>;
  rarity?: Maybe<Scalars['float8']['output']>;
  royalties?: Maybe<Scalars['Int']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "objkt" */
export type Objkt_Sum_Order_By = {
  children_count?: InputMaybe<Order_By>;
  depth?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Objkt_Var_Pop_Fields = {
  __typename?: 'objkt_var_pop_fields';
  children_count?: Maybe<Scalars['Float']['output']>;
  depth?: Maybe<Scalars['Float']['output']>;
  iteration?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "objkt_minted_price" */
  minted_price?: Maybe<Scalars['numeric']['output']>;
  rarity?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "objkt" */
export type Objkt_Var_Pop_Order_By = {
  children_count?: InputMaybe<Order_By>;
  depth?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Objkt_Var_Samp_Fields = {
  __typename?: 'objkt_var_samp_fields';
  children_count?: Maybe<Scalars['Float']['output']>;
  depth?: Maybe<Scalars['Float']['output']>;
  iteration?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "objkt_minted_price" */
  minted_price?: Maybe<Scalars['numeric']['output']>;
  rarity?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "objkt" */
export type Objkt_Var_Samp_Order_By = {
  children_count?: InputMaybe<Order_By>;
  depth?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Objkt_Variance_Fields = {
  __typename?: 'objkt_variance_fields';
  children_count?: Maybe<Scalars['Float']['output']>;
  depth?: Maybe<Scalars['Float']['output']>;
  iteration?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "objkt_minted_price" */
  minted_price?: Maybe<Scalars['numeric']['output']>;
  rarity?: Maybe<Scalars['Float']['output']>;
  royalties?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "objkt" */
export type Objkt_Variance_Order_By = {
  children_count?: InputMaybe<Order_By>;
  depth?: InputMaybe<Order_By>;
  iteration?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

export type Offchain_Mutation_Frontend = {
  __typename?: 'offchain_mutation_frontend';
  /** delete data from the table: "ProjectCollaborator" */
  delete_ProjectCollaborator?: Maybe<ProjectCollaborator_Mutation_Response>;
  /** delete data from the table: "ProjectMedia" */
  delete_ProjectMedia?: Maybe<ProjectMedia_Mutation_Response>;
  /** insert data into the table: "Project" */
  insert_Project?: Maybe<Project_Mutation_Response>;
  /** insert data into the table: "ProjectCollaborator" */
  insert_ProjectCollaborator?: Maybe<ProjectCollaborator_Mutation_Response>;
  /** insert a single row into the table: "ProjectCollaborator" */
  insert_ProjectCollaborator_one?: Maybe<ProjectCollaborator>;
  /** insert data into the table: "ProjectMedia" */
  insert_ProjectMedia?: Maybe<ProjectMedia_Mutation_Response>;
  /** insert a single row into the table: "ProjectMedia" */
  insert_ProjectMedia_one?: Maybe<ProjectMedia>;
  /** insert a single row into the table: "Project" */
  insert_Project_one?: Maybe<Project>;
  /** update data of the table: "Account" */
  update_Account?: Maybe<Account_Mutation_Response>;
  /** update single row of the table: "Account" */
  update_Account_by_pk?: Maybe<Account>;
  /** update multiples rows of table: "Account" */
  update_Account_many?: Maybe<Array<Maybe<Account_Mutation_Response>>>;
  /** update data of the table: "Profile" */
  update_Profile?: Maybe<Profile_Mutation_Response>;
  /** update single row of the table: "Profile" */
  update_Profile_by_pk?: Maybe<Profile>;
  /** update multiples rows of table: "Profile" */
  update_Profile_many?: Maybe<Array<Maybe<Profile_Mutation_Response>>>;
  /** update data of the table: "Project" */
  update_Project?: Maybe<Project_Mutation_Response>;
  /** update data of the table: "ProjectMedia" */
  update_ProjectMedia?: Maybe<ProjectMedia_Mutation_Response>;
  /** update multiples rows of table: "ProjectMedia" */
  update_ProjectMedia_many?: Maybe<Array<Maybe<ProjectMedia_Mutation_Response>>>;
  /** update single row of the table: "Project" */
  update_Project_by_pk?: Maybe<Project>;
  /** update multiples rows of table: "Project" */
  update_Project_many?: Maybe<Array<Maybe<Project_Mutation_Response>>>;
};


export type Offchain_Mutation_FrontendDelete_ProjectCollaboratorArgs = {
  where: ProjectCollaborator_Bool_Exp;
};


export type Offchain_Mutation_FrontendDelete_ProjectMediaArgs = {
  where: ProjectMedia_Bool_Exp;
};


export type Offchain_Mutation_FrontendInsert_ProjectArgs = {
  objects: Array<Project_Insert_Input>;
  on_conflict?: InputMaybe<Project_On_Conflict>;
};


export type Offchain_Mutation_FrontendInsert_ProjectCollaboratorArgs = {
  objects: Array<ProjectCollaborator_Insert_Input>;
  on_conflict?: InputMaybe<ProjectCollaborator_On_Conflict>;
};


export type Offchain_Mutation_FrontendInsert_ProjectCollaborator_OneArgs = {
  object: ProjectCollaborator_Insert_Input;
  on_conflict?: InputMaybe<ProjectCollaborator_On_Conflict>;
};


export type Offchain_Mutation_FrontendInsert_ProjectMediaArgs = {
  objects: Array<ProjectMedia_Insert_Input>;
  on_conflict?: InputMaybe<ProjectMedia_On_Conflict>;
};


export type Offchain_Mutation_FrontendInsert_ProjectMedia_OneArgs = {
  object: ProjectMedia_Insert_Input;
  on_conflict?: InputMaybe<ProjectMedia_On_Conflict>;
};


export type Offchain_Mutation_FrontendInsert_Project_OneArgs = {
  object: Project_Insert_Input;
  on_conflict?: InputMaybe<Project_On_Conflict>;
};


export type Offchain_Mutation_FrontendUpdate_AccountArgs = {
  _set?: InputMaybe<Account_Set_Input>;
  where: Account_Bool_Exp;
};


export type Offchain_Mutation_FrontendUpdate_Account_By_PkArgs = {
  _set?: InputMaybe<Account_Set_Input>;
  pk_columns: Account_Pk_Columns_Input;
};


export type Offchain_Mutation_FrontendUpdate_Account_ManyArgs = {
  updates: Array<Account_Updates>;
};


export type Offchain_Mutation_FrontendUpdate_ProfileArgs = {
  _set?: InputMaybe<Profile_Set_Input>;
  where: Profile_Bool_Exp;
};


export type Offchain_Mutation_FrontendUpdate_Profile_By_PkArgs = {
  _set?: InputMaybe<Profile_Set_Input>;
  pk_columns: Profile_Pk_Columns_Input;
};


export type Offchain_Mutation_FrontendUpdate_Profile_ManyArgs = {
  updates: Array<Profile_Updates>;
};


export type Offchain_Mutation_FrontendUpdate_ProjectArgs = {
  _append?: InputMaybe<Project_Append_Input>;
  _delete_at_path?: InputMaybe<Project_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Project_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Project_Delete_Key_Input>;
  _prepend?: InputMaybe<Project_Prepend_Input>;
  _set?: InputMaybe<Project_Set_Input>;
  where: Project_Bool_Exp;
};


export type Offchain_Mutation_FrontendUpdate_ProjectMediaArgs = {
  _inc?: InputMaybe<ProjectMedia_Inc_Input>;
  _set?: InputMaybe<ProjectMedia_Set_Input>;
  where: ProjectMedia_Bool_Exp;
};


export type Offchain_Mutation_FrontendUpdate_ProjectMedia_ManyArgs = {
  updates: Array<ProjectMedia_Updates>;
};


export type Offchain_Mutation_FrontendUpdate_Project_By_PkArgs = {
  _append?: InputMaybe<Project_Append_Input>;
  _delete_at_path?: InputMaybe<Project_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Project_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Project_Delete_Key_Input>;
  _prepend?: InputMaybe<Project_Prepend_Input>;
  _set?: InputMaybe<Project_Set_Input>;
  pk_columns: Project_Pk_Columns_Input;
};


export type Offchain_Mutation_FrontendUpdate_Project_ManyArgs = {
  updates: Array<Project_Updates>;
};

export type Offchain_Query = {
  __typename?: 'offchain_query';
  /** fetch data from the table: "Account" */
  Account: Array<Account>;
  /** fetch data from the table: "AccountRole" */
  AccountRole: Array<AccountRole>;
  /** fetch data from the table: "AccountRole" using primary key columns */
  AccountRole_by_pk?: Maybe<AccountRole>;
  /** fetch data from the table: "AccountTokenAllocation" */
  AccountTokenAllocation: Array<AccountTokenAllocation>;
  /** fetch data from the table: "AccountTokenAllocationNonZero" */
  AccountTokenAllocationNonZero: Array<AccountTokenAllocationNonZero>;
  /** fetch aggregated fields from the table: "AccountTokenAllocationNonZero" */
  AccountTokenAllocationNonZero_aggregate: AccountTokenAllocationNonZero_Aggregate;
  /** fetch aggregated fields from the table: "AccountTokenAllocation" */
  AccountTokenAllocation_aggregate: AccountTokenAllocation_Aggregate;
  /** fetch aggregated fields from the table: "Account" */
  Account_aggregate: Account_Aggregate;
  /** fetch data from the table: "Account" using primary key columns */
  Account_by_pk?: Maybe<Account>;
  /** fetch data from the table: "AccountsRoles" */
  AccountsRoles: Array<AccountsRoles>;
  /** fetch data from the table: "AccountsRoles" using primary key columns */
  AccountsRoles_by_pk?: Maybe<AccountsRoles>;
  /** fetch data from the table: "ClaimProof" */
  ClaimProof: Array<ClaimProof>;
  /** fetch data from the table: "ClaimProof" using primary key columns */
  ClaimProof_by_pk?: Maybe<ClaimProof>;
  /** fetch data from the table: "Consumable" */
  Consumable: Array<Consumable>;
  /** fetch data from the table: "Consumable" using primary key columns */
  Consumable_by_pk?: Maybe<Consumable>;
  /** fetch data from the table: "Event" */
  Event: Array<Event>;
  /** fetch data from the table: "EventOnboarding" */
  EventOnboarding: Array<EventOnboarding>;
  /** fetch data from the table: "EventOnboardingOnComponents" */
  EventOnboardingOnComponents: Array<EventOnboardingOnComponents>;
  /** fetch data from the table: "EventOnboardingOnComponents" using primary key columns */
  EventOnboardingOnComponents_by_pk?: Maybe<EventOnboardingOnComponents>;
  /** fetch data from the table: "EventOnboarding" using primary key columns */
  EventOnboarding_by_pk?: Maybe<EventOnboarding>;
  /** fetch aggregated fields from the table: "Event" */
  Event_aggregate: Event_Aggregate;
  /** fetch data from the table: "Event" using primary key columns */
  Event_by_pk?: Maybe<Event>;
  /** fetch data from the table: "Featured" */
  Featured: Array<Featured>;
  /** fetch data from the table: "Featured" using primary key columns */
  Featured_by_pk?: Maybe<Featured>;
  /** fetch data from the table: "Library" */
  Library: Array<Library>;
  /** fetch data from the table: "LibraryVersion" */
  LibraryVersion: Array<LibraryVersion>;
  /** fetch data from the table: "Library" using primary key columns */
  Library_by_pk?: Maybe<Library>;
  /** fetch data from the table: "Media" */
  Media: Array<Media>;
  /** fetch data from the table: "Media" using primary key columns */
  Media_by_pk?: Maybe<Media>;
  /** fetch data from the table: "MediasOnConsumables" */
  MediasOnConsumables: Array<MediasOnConsumables>;
  /** fetch data from the table: "MediasOnConsumables" using primary key columns */
  MediasOnConsumables_by_pk?: Maybe<MediasOnConsumables>;
  /** fetch data from the table: "MintPassGroup" */
  MintPassGroup: Array<MintPassGroup>;
  /** fetch data from the table: "MintPassGroup" using primary key columns */
  MintPassGroup_by_pk?: Maybe<MintPassGroup>;
  /** fetch data from the table: "OnboardingComponent" */
  OnboardingComponent: Array<OnboardingComponent>;
  /** fetch data from the table: "OnboardingComponent" using primary key columns */
  OnboardingComponent_by_pk?: Maybe<OnboardingComponent>;
  /** fetch data from the table: "Profile" */
  Profile: Array<Profile>;
  /** fetch data from the table: "Profile" using primary key columns */
  Profile_by_pk?: Maybe<Profile>;
  /** fetch data from the table: "Project" */
  Project: Array<Project>;
  /** fetch data from the table: "ProjectCollaborator" */
  ProjectCollaborator: Array<ProjectCollaborator>;
  /** fetch data from the table: "ProjectMedia" */
  ProjectMedia: Array<ProjectMedia>;
  /** fetch data from the table: "Project" using primary key columns */
  Project_by_pk?: Maybe<Project>;
  /** fetch data from the table: "Retrospective" */
  Retrospective: Array<Retrospective>;
  /** fetch data from the table: "Retrospective" using primary key columns */
  Retrospective_by_pk?: Maybe<Retrospective>;
  /** fetch data from the table: "UserAccount" */
  UserAccount: Array<UserAccount>;
  /** fetch data from the table: "Wallet" */
  Wallet: Array<Wallet>;
  /** fetch data from the table: "Wallet" using primary key columns */
  Wallet_by_pk?: Maybe<Wallet>;
  /** fetch data from the table: "Whitelist" */
  Whitelist: Array<Whitelist>;
  /** fetch data from the table: "WhitelistEntries" */
  WhitelistEntries: Array<WhitelistEntries>;
  /** fetch data from the table: "WhitelistEntries" using primary key columns */
  WhitelistEntries_by_pk?: Maybe<WhitelistEntries>;
  /** fetch data from the table: "Whitelist" using primary key columns */
  Whitelist_by_pk?: Maybe<Whitelist>;
};


export type Offchain_QueryAccountArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Offchain_QueryAccountRoleArgs = {
  distinct_on?: InputMaybe<Array<AccountRole_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AccountRole_Order_By>>;
  where?: InputMaybe<AccountRole_Bool_Exp>;
};


export type Offchain_QueryAccountRole_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Offchain_QueryAccountTokenAllocationArgs = {
  distinct_on?: InputMaybe<Array<AccountTokenAllocation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AccountTokenAllocation_Order_By>>;
  where?: InputMaybe<AccountTokenAllocation_Bool_Exp>;
};


export type Offchain_QueryAccountTokenAllocationNonZeroArgs = {
  distinct_on?: InputMaybe<Array<AccountTokenAllocationNonZero_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AccountTokenAllocationNonZero_Order_By>>;
  where?: InputMaybe<AccountTokenAllocationNonZero_Bool_Exp>;
};


export type Offchain_QueryAccountTokenAllocationNonZero_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AccountTokenAllocationNonZero_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AccountTokenAllocationNonZero_Order_By>>;
  where?: InputMaybe<AccountTokenAllocationNonZero_Bool_Exp>;
};


export type Offchain_QueryAccountTokenAllocation_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AccountTokenAllocation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AccountTokenAllocation_Order_By>>;
  where?: InputMaybe<AccountTokenAllocation_Bool_Exp>;
};


export type Offchain_QueryAccount_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Offchain_QueryAccount_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Offchain_QueryAccountsRolesArgs = {
  distinct_on?: InputMaybe<Array<AccountsRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AccountsRoles_Order_By>>;
  where?: InputMaybe<AccountsRoles_Bool_Exp>;
};


export type Offchain_QueryAccountsRoles_By_PkArgs = {
  accountId: Scalars['uuid']['input'];
  roleValue: AccountRole_Enum;
};


export type Offchain_QueryClaimProofArgs = {
  distinct_on?: InputMaybe<Array<ClaimProof_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ClaimProof_Order_By>>;
  where?: InputMaybe<ClaimProof_Bool_Exp>;
};


export type Offchain_QueryClaimProof_By_PkArgs = {
  address: Scalars['String']['input'];
};


export type Offchain_QueryConsumableArgs = {
  distinct_on?: InputMaybe<Array<Consumable_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consumable_Order_By>>;
  where?: InputMaybe<Consumable_Bool_Exp>;
};


export type Offchain_QueryConsumable_By_PkArgs = {
  address: Scalars['String']['input'];
};


export type Offchain_QueryEventArgs = {
  distinct_on?: InputMaybe<Array<Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Order_By>>;
  where?: InputMaybe<Event_Bool_Exp>;
};


export type Offchain_QueryEventOnboardingArgs = {
  distinct_on?: InputMaybe<Array<EventOnboarding_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EventOnboarding_Order_By>>;
  where?: InputMaybe<EventOnboarding_Bool_Exp>;
};


export type Offchain_QueryEventOnboardingOnComponentsArgs = {
  distinct_on?: InputMaybe<Array<EventOnboardingOnComponents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EventOnboardingOnComponents_Order_By>>;
  where?: InputMaybe<EventOnboardingOnComponents_Bool_Exp>;
};


export type Offchain_QueryEventOnboardingOnComponents_By_PkArgs = {
  componentId: Scalars['Int']['input'];
  eventOnboardingId: Scalars['Int']['input'];
};


export type Offchain_QueryEventOnboarding_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Offchain_QueryEvent_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Order_By>>;
  where?: InputMaybe<Event_Bool_Exp>;
};


export type Offchain_QueryEvent_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Offchain_QueryFeaturedArgs = {
  distinct_on?: InputMaybe<Array<Featured_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Featured_Order_By>>;
  where?: InputMaybe<Featured_Bool_Exp>;
};


export type Offchain_QueryFeatured_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Offchain_QueryLibraryArgs = {
  distinct_on?: InputMaybe<Array<Library_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Library_Order_By>>;
  where?: InputMaybe<Library_Bool_Exp>;
};


export type Offchain_QueryLibraryVersionArgs = {
  distinct_on?: InputMaybe<Array<LibraryVersion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<LibraryVersion_Order_By>>;
  where?: InputMaybe<LibraryVersion_Bool_Exp>;
};


export type Offchain_QueryLibrary_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Offchain_QueryMediaArgs = {
  distinct_on?: InputMaybe<Array<Media_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Media_Order_By>>;
  where?: InputMaybe<Media_Bool_Exp>;
};


export type Offchain_QueryMedia_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Offchain_QueryMediasOnConsumablesArgs = {
  distinct_on?: InputMaybe<Array<MediasOnConsumables_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MediasOnConsumables_Order_By>>;
  where?: InputMaybe<MediasOnConsumables_Bool_Exp>;
};


export type Offchain_QueryMediasOnConsumables_By_PkArgs = {
  consumableAddress: Scalars['String']['input'];
  mediaId: Scalars['uuid']['input'];
};


export type Offchain_QueryMintPassGroupArgs = {
  distinct_on?: InputMaybe<Array<MintPassGroup_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MintPassGroup_Order_By>>;
  where?: InputMaybe<MintPassGroup_Bool_Exp>;
};


export type Offchain_QueryMintPassGroup_By_PkArgs = {
  address: Scalars['String']['input'];
};


export type Offchain_QueryOnboardingComponentArgs = {
  distinct_on?: InputMaybe<Array<OnboardingComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<OnboardingComponent_Order_By>>;
  where?: InputMaybe<OnboardingComponent_Bool_Exp>;
};


export type Offchain_QueryOnboardingComponent_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Offchain_QueryProfileArgs = {
  distinct_on?: InputMaybe<Array<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};


export type Offchain_QueryProfile_By_PkArgs = {
  accountId: Scalars['uuid']['input'];
};


export type Offchain_QueryProjectArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


export type Offchain_QueryProjectCollaboratorArgs = {
  distinct_on?: InputMaybe<Array<ProjectCollaborator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ProjectCollaborator_Order_By>>;
  where?: InputMaybe<ProjectCollaborator_Bool_Exp>;
};


export type Offchain_QueryProjectMediaArgs = {
  distinct_on?: InputMaybe<Array<ProjectMedia_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ProjectMedia_Order_By>>;
  where?: InputMaybe<ProjectMedia_Bool_Exp>;
};


export type Offchain_QueryProject_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Offchain_QueryRetrospectiveArgs = {
  distinct_on?: InputMaybe<Array<Retrospective_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Retrospective_Order_By>>;
  where?: InputMaybe<Retrospective_Bool_Exp>;
};


export type Offchain_QueryRetrospective_By_PkArgs = {
  walletAddress: Scalars['String']['input'];
};


export type Offchain_QueryUserAccountArgs = {
  distinct_on?: InputMaybe<Array<UserAccount_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserAccount_Order_By>>;
  where?: InputMaybe<UserAccount_Bool_Exp>;
};


export type Offchain_QueryWalletArgs = {
  distinct_on?: InputMaybe<Array<Wallet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallet_Order_By>>;
  where?: InputMaybe<Wallet_Bool_Exp>;
};


export type Offchain_QueryWallet_By_PkArgs = {
  address: Scalars['String']['input'];
};


export type Offchain_QueryWhitelistArgs = {
  distinct_on?: InputMaybe<Array<Whitelist_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Whitelist_Order_By>>;
  where?: InputMaybe<Whitelist_Bool_Exp>;
};


export type Offchain_QueryWhitelistEntriesArgs = {
  distinct_on?: InputMaybe<Array<WhitelistEntries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<WhitelistEntries_Order_By>>;
  where?: InputMaybe<WhitelistEntries_Bool_Exp>;
};


export type Offchain_QueryWhitelistEntries_By_PkArgs = {
  merkleRoot: Scalars['String']['input'];
  whitelistIndex: Scalars['Int']['input'];
};


export type Offchain_QueryWhitelist_By_PkArgs = {
  merkleRoot: Scalars['String']['input'];
};

export type Offchain_Subscription = {
  __typename?: 'offchain_subscription';
  /** fetch data from the table: "Account" */
  Account: Array<Account>;
  /** fetch data from the table: "AccountRole" */
  AccountRole: Array<AccountRole>;
  /** fetch data from the table: "AccountRole" using primary key columns */
  AccountRole_by_pk?: Maybe<AccountRole>;
  /** fetch data from the table in a streaming manner: "AccountRole" */
  AccountRole_stream: Array<AccountRole>;
  /** fetch data from the table: "AccountTokenAllocation" */
  AccountTokenAllocation: Array<AccountTokenAllocation>;
  /** fetch data from the table: "AccountTokenAllocationNonZero" */
  AccountTokenAllocationNonZero: Array<AccountTokenAllocationNonZero>;
  /** fetch aggregated fields from the table: "AccountTokenAllocationNonZero" */
  AccountTokenAllocationNonZero_aggregate: AccountTokenAllocationNonZero_Aggregate;
  /** fetch data from the table in a streaming manner: "AccountTokenAllocationNonZero" */
  AccountTokenAllocationNonZero_stream: Array<AccountTokenAllocationNonZero>;
  /** fetch aggregated fields from the table: "AccountTokenAllocation" */
  AccountTokenAllocation_aggregate: AccountTokenAllocation_Aggregate;
  /** fetch data from the table in a streaming manner: "AccountTokenAllocation" */
  AccountTokenAllocation_stream: Array<AccountTokenAllocation>;
  /** fetch aggregated fields from the table: "Account" */
  Account_aggregate: Account_Aggregate;
  /** fetch data from the table: "Account" using primary key columns */
  Account_by_pk?: Maybe<Account>;
  /** fetch data from the table in a streaming manner: "Account" */
  Account_stream: Array<Account>;
  /** fetch data from the table: "AccountsRoles" */
  AccountsRoles: Array<AccountsRoles>;
  /** fetch data from the table: "AccountsRoles" using primary key columns */
  AccountsRoles_by_pk?: Maybe<AccountsRoles>;
  /** fetch data from the table in a streaming manner: "AccountsRoles" */
  AccountsRoles_stream: Array<AccountsRoles>;
  /** fetch data from the table: "ClaimProof" */
  ClaimProof: Array<ClaimProof>;
  /** fetch data from the table: "ClaimProof" using primary key columns */
  ClaimProof_by_pk?: Maybe<ClaimProof>;
  /** fetch data from the table in a streaming manner: "ClaimProof" */
  ClaimProof_stream: Array<ClaimProof>;
  /** fetch data from the table: "Consumable" */
  Consumable: Array<Consumable>;
  /** fetch data from the table: "Consumable" using primary key columns */
  Consumable_by_pk?: Maybe<Consumable>;
  /** fetch data from the table in a streaming manner: "Consumable" */
  Consumable_stream: Array<Consumable>;
  /** fetch data from the table: "Event" */
  Event: Array<Event>;
  /** fetch data from the table: "EventOnboarding" */
  EventOnboarding: Array<EventOnboarding>;
  /** fetch data from the table: "EventOnboardingOnComponents" */
  EventOnboardingOnComponents: Array<EventOnboardingOnComponents>;
  /** fetch data from the table: "EventOnboardingOnComponents" using primary key columns */
  EventOnboardingOnComponents_by_pk?: Maybe<EventOnboardingOnComponents>;
  /** fetch data from the table in a streaming manner: "EventOnboardingOnComponents" */
  EventOnboardingOnComponents_stream: Array<EventOnboardingOnComponents>;
  /** fetch data from the table: "EventOnboarding" using primary key columns */
  EventOnboarding_by_pk?: Maybe<EventOnboarding>;
  /** fetch data from the table in a streaming manner: "EventOnboarding" */
  EventOnboarding_stream: Array<EventOnboarding>;
  /** fetch aggregated fields from the table: "Event" */
  Event_aggregate: Event_Aggregate;
  /** fetch data from the table: "Event" using primary key columns */
  Event_by_pk?: Maybe<Event>;
  /** fetch data from the table in a streaming manner: "Event" */
  Event_stream: Array<Event>;
  /** fetch data from the table: "Featured" */
  Featured: Array<Featured>;
  /** fetch data from the table: "Featured" using primary key columns */
  Featured_by_pk?: Maybe<Featured>;
  /** fetch data from the table in a streaming manner: "Featured" */
  Featured_stream: Array<Featured>;
  /** fetch data from the table: "Library" */
  Library: Array<Library>;
  /** fetch data from the table: "LibraryVersion" */
  LibraryVersion: Array<LibraryVersion>;
  /** fetch data from the table in a streaming manner: "LibraryVersion" */
  LibraryVersion_stream: Array<LibraryVersion>;
  /** fetch data from the table: "Library" using primary key columns */
  Library_by_pk?: Maybe<Library>;
  /** fetch data from the table in a streaming manner: "Library" */
  Library_stream: Array<Library>;
  /** fetch data from the table: "Media" */
  Media: Array<Media>;
  /** fetch data from the table: "Media" using primary key columns */
  Media_by_pk?: Maybe<Media>;
  /** fetch data from the table in a streaming manner: "Media" */
  Media_stream: Array<Media>;
  /** fetch data from the table: "MediasOnConsumables" */
  MediasOnConsumables: Array<MediasOnConsumables>;
  /** fetch data from the table: "MediasOnConsumables" using primary key columns */
  MediasOnConsumables_by_pk?: Maybe<MediasOnConsumables>;
  /** fetch data from the table in a streaming manner: "MediasOnConsumables" */
  MediasOnConsumables_stream: Array<MediasOnConsumables>;
  /** fetch data from the table: "MintPassGroup" */
  MintPassGroup: Array<MintPassGroup>;
  /** fetch data from the table: "MintPassGroup" using primary key columns */
  MintPassGroup_by_pk?: Maybe<MintPassGroup>;
  /** fetch data from the table in a streaming manner: "MintPassGroup" */
  MintPassGroup_stream: Array<MintPassGroup>;
  /** fetch data from the table: "OnboardingComponent" */
  OnboardingComponent: Array<OnboardingComponent>;
  /** fetch data from the table: "OnboardingComponent" using primary key columns */
  OnboardingComponent_by_pk?: Maybe<OnboardingComponent>;
  /** fetch data from the table in a streaming manner: "OnboardingComponent" */
  OnboardingComponent_stream: Array<OnboardingComponent>;
  /** fetch data from the table: "Profile" */
  Profile: Array<Profile>;
  /** fetch data from the table: "Profile" using primary key columns */
  Profile_by_pk?: Maybe<Profile>;
  /** fetch data from the table in a streaming manner: "Profile" */
  Profile_stream: Array<Profile>;
  /** fetch data from the table: "Project" */
  Project: Array<Project>;
  /** fetch data from the table: "ProjectCollaborator" */
  ProjectCollaborator: Array<ProjectCollaborator>;
  /** fetch data from the table in a streaming manner: "ProjectCollaborator" */
  ProjectCollaborator_stream: Array<ProjectCollaborator>;
  /** fetch data from the table: "ProjectMedia" */
  ProjectMedia: Array<ProjectMedia>;
  /** fetch data from the table in a streaming manner: "ProjectMedia" */
  ProjectMedia_stream: Array<ProjectMedia>;
  /** fetch data from the table: "Project" using primary key columns */
  Project_by_pk?: Maybe<Project>;
  /** fetch data from the table in a streaming manner: "Project" */
  Project_stream: Array<Project>;
  /** fetch data from the table: "Retrospective" */
  Retrospective: Array<Retrospective>;
  /** fetch data from the table: "Retrospective" using primary key columns */
  Retrospective_by_pk?: Maybe<Retrospective>;
  /** fetch data from the table in a streaming manner: "Retrospective" */
  Retrospective_stream: Array<Retrospective>;
  /** fetch data from the table: "UserAccount" */
  UserAccount: Array<UserAccount>;
  /** fetch data from the table in a streaming manner: "UserAccount" */
  UserAccount_stream: Array<UserAccount>;
  /** fetch data from the table: "Wallet" */
  Wallet: Array<Wallet>;
  /** fetch data from the table: "Wallet" using primary key columns */
  Wallet_by_pk?: Maybe<Wallet>;
  /** fetch data from the table in a streaming manner: "Wallet" */
  Wallet_stream: Array<Wallet>;
  /** fetch data from the table: "Whitelist" */
  Whitelist: Array<Whitelist>;
  /** fetch data from the table: "WhitelistEntries" */
  WhitelistEntries: Array<WhitelistEntries>;
  /** fetch data from the table: "WhitelistEntries" using primary key columns */
  WhitelistEntries_by_pk?: Maybe<WhitelistEntries>;
  /** fetch data from the table in a streaming manner: "WhitelistEntries" */
  WhitelistEntries_stream: Array<WhitelistEntries>;
  /** fetch data from the table: "Whitelist" using primary key columns */
  Whitelist_by_pk?: Maybe<Whitelist>;
  /** fetch data from the table in a streaming manner: "Whitelist" */
  Whitelist_stream: Array<Whitelist>;
};


export type Offchain_SubscriptionAccountArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Offchain_SubscriptionAccountRoleArgs = {
  distinct_on?: InputMaybe<Array<AccountRole_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AccountRole_Order_By>>;
  where?: InputMaybe<AccountRole_Bool_Exp>;
};


export type Offchain_SubscriptionAccountRole_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Offchain_SubscriptionAccountRole_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AccountRole_Stream_Cursor_Input>>;
  where?: InputMaybe<AccountRole_Bool_Exp>;
};


export type Offchain_SubscriptionAccountTokenAllocationArgs = {
  distinct_on?: InputMaybe<Array<AccountTokenAllocation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AccountTokenAllocation_Order_By>>;
  where?: InputMaybe<AccountTokenAllocation_Bool_Exp>;
};


export type Offchain_SubscriptionAccountTokenAllocationNonZeroArgs = {
  distinct_on?: InputMaybe<Array<AccountTokenAllocationNonZero_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AccountTokenAllocationNonZero_Order_By>>;
  where?: InputMaybe<AccountTokenAllocationNonZero_Bool_Exp>;
};


export type Offchain_SubscriptionAccountTokenAllocationNonZero_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AccountTokenAllocationNonZero_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AccountTokenAllocationNonZero_Order_By>>;
  where?: InputMaybe<AccountTokenAllocationNonZero_Bool_Exp>;
};


export type Offchain_SubscriptionAccountTokenAllocationNonZero_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AccountTokenAllocationNonZero_Stream_Cursor_Input>>;
  where?: InputMaybe<AccountTokenAllocationNonZero_Bool_Exp>;
};


export type Offchain_SubscriptionAccountTokenAllocation_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AccountTokenAllocation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AccountTokenAllocation_Order_By>>;
  where?: InputMaybe<AccountTokenAllocation_Bool_Exp>;
};


export type Offchain_SubscriptionAccountTokenAllocation_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AccountTokenAllocation_Stream_Cursor_Input>>;
  where?: InputMaybe<AccountTokenAllocation_Bool_Exp>;
};


export type Offchain_SubscriptionAccount_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Offchain_SubscriptionAccount_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Offchain_SubscriptionAccount_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Offchain_SubscriptionAccountsRolesArgs = {
  distinct_on?: InputMaybe<Array<AccountsRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AccountsRoles_Order_By>>;
  where?: InputMaybe<AccountsRoles_Bool_Exp>;
};


export type Offchain_SubscriptionAccountsRoles_By_PkArgs = {
  accountId: Scalars['uuid']['input'];
  roleValue: AccountRole_Enum;
};


export type Offchain_SubscriptionAccountsRoles_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AccountsRoles_Stream_Cursor_Input>>;
  where?: InputMaybe<AccountsRoles_Bool_Exp>;
};


export type Offchain_SubscriptionClaimProofArgs = {
  distinct_on?: InputMaybe<Array<ClaimProof_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ClaimProof_Order_By>>;
  where?: InputMaybe<ClaimProof_Bool_Exp>;
};


export type Offchain_SubscriptionClaimProof_By_PkArgs = {
  address: Scalars['String']['input'];
};


export type Offchain_SubscriptionClaimProof_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ClaimProof_Stream_Cursor_Input>>;
  where?: InputMaybe<ClaimProof_Bool_Exp>;
};


export type Offchain_SubscriptionConsumableArgs = {
  distinct_on?: InputMaybe<Array<Consumable_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consumable_Order_By>>;
  where?: InputMaybe<Consumable_Bool_Exp>;
};


export type Offchain_SubscriptionConsumable_By_PkArgs = {
  address: Scalars['String']['input'];
};


export type Offchain_SubscriptionConsumable_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Consumable_Stream_Cursor_Input>>;
  where?: InputMaybe<Consumable_Bool_Exp>;
};


export type Offchain_SubscriptionEventArgs = {
  distinct_on?: InputMaybe<Array<Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Order_By>>;
  where?: InputMaybe<Event_Bool_Exp>;
};


export type Offchain_SubscriptionEventOnboardingArgs = {
  distinct_on?: InputMaybe<Array<EventOnboarding_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EventOnboarding_Order_By>>;
  where?: InputMaybe<EventOnboarding_Bool_Exp>;
};


export type Offchain_SubscriptionEventOnboardingOnComponentsArgs = {
  distinct_on?: InputMaybe<Array<EventOnboardingOnComponents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EventOnboardingOnComponents_Order_By>>;
  where?: InputMaybe<EventOnboardingOnComponents_Bool_Exp>;
};


export type Offchain_SubscriptionEventOnboardingOnComponents_By_PkArgs = {
  componentId: Scalars['Int']['input'];
  eventOnboardingId: Scalars['Int']['input'];
};


export type Offchain_SubscriptionEventOnboardingOnComponents_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<EventOnboardingOnComponents_Stream_Cursor_Input>>;
  where?: InputMaybe<EventOnboardingOnComponents_Bool_Exp>;
};


export type Offchain_SubscriptionEventOnboarding_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Offchain_SubscriptionEventOnboarding_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<EventOnboarding_Stream_Cursor_Input>>;
  where?: InputMaybe<EventOnboarding_Bool_Exp>;
};


export type Offchain_SubscriptionEvent_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Order_By>>;
  where?: InputMaybe<Event_Bool_Exp>;
};


export type Offchain_SubscriptionEvent_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Offchain_SubscriptionEvent_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Event_Stream_Cursor_Input>>;
  where?: InputMaybe<Event_Bool_Exp>;
};


export type Offchain_SubscriptionFeaturedArgs = {
  distinct_on?: InputMaybe<Array<Featured_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Featured_Order_By>>;
  where?: InputMaybe<Featured_Bool_Exp>;
};


export type Offchain_SubscriptionFeatured_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Offchain_SubscriptionFeatured_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Featured_Stream_Cursor_Input>>;
  where?: InputMaybe<Featured_Bool_Exp>;
};


export type Offchain_SubscriptionLibraryArgs = {
  distinct_on?: InputMaybe<Array<Library_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Library_Order_By>>;
  where?: InputMaybe<Library_Bool_Exp>;
};


export type Offchain_SubscriptionLibraryVersionArgs = {
  distinct_on?: InputMaybe<Array<LibraryVersion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<LibraryVersion_Order_By>>;
  where?: InputMaybe<LibraryVersion_Bool_Exp>;
};


export type Offchain_SubscriptionLibraryVersion_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<LibraryVersion_Stream_Cursor_Input>>;
  where?: InputMaybe<LibraryVersion_Bool_Exp>;
};


export type Offchain_SubscriptionLibrary_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Offchain_SubscriptionLibrary_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Library_Stream_Cursor_Input>>;
  where?: InputMaybe<Library_Bool_Exp>;
};


export type Offchain_SubscriptionMediaArgs = {
  distinct_on?: InputMaybe<Array<Media_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Media_Order_By>>;
  where?: InputMaybe<Media_Bool_Exp>;
};


export type Offchain_SubscriptionMedia_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Offchain_SubscriptionMedia_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Media_Stream_Cursor_Input>>;
  where?: InputMaybe<Media_Bool_Exp>;
};


export type Offchain_SubscriptionMediasOnConsumablesArgs = {
  distinct_on?: InputMaybe<Array<MediasOnConsumables_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MediasOnConsumables_Order_By>>;
  where?: InputMaybe<MediasOnConsumables_Bool_Exp>;
};


export type Offchain_SubscriptionMediasOnConsumables_By_PkArgs = {
  consumableAddress: Scalars['String']['input'];
  mediaId: Scalars['uuid']['input'];
};


export type Offchain_SubscriptionMediasOnConsumables_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<MediasOnConsumables_Stream_Cursor_Input>>;
  where?: InputMaybe<MediasOnConsumables_Bool_Exp>;
};


export type Offchain_SubscriptionMintPassGroupArgs = {
  distinct_on?: InputMaybe<Array<MintPassGroup_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MintPassGroup_Order_By>>;
  where?: InputMaybe<MintPassGroup_Bool_Exp>;
};


export type Offchain_SubscriptionMintPassGroup_By_PkArgs = {
  address: Scalars['String']['input'];
};


export type Offchain_SubscriptionMintPassGroup_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<MintPassGroup_Stream_Cursor_Input>>;
  where?: InputMaybe<MintPassGroup_Bool_Exp>;
};


export type Offchain_SubscriptionOnboardingComponentArgs = {
  distinct_on?: InputMaybe<Array<OnboardingComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<OnboardingComponent_Order_By>>;
  where?: InputMaybe<OnboardingComponent_Bool_Exp>;
};


export type Offchain_SubscriptionOnboardingComponent_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Offchain_SubscriptionOnboardingComponent_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<OnboardingComponent_Stream_Cursor_Input>>;
  where?: InputMaybe<OnboardingComponent_Bool_Exp>;
};


export type Offchain_SubscriptionProfileArgs = {
  distinct_on?: InputMaybe<Array<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};


export type Offchain_SubscriptionProfile_By_PkArgs = {
  accountId: Scalars['uuid']['input'];
};


export type Offchain_SubscriptionProfile_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Profile_Stream_Cursor_Input>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};


export type Offchain_SubscriptionProjectArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


export type Offchain_SubscriptionProjectCollaboratorArgs = {
  distinct_on?: InputMaybe<Array<ProjectCollaborator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ProjectCollaborator_Order_By>>;
  where?: InputMaybe<ProjectCollaborator_Bool_Exp>;
};


export type Offchain_SubscriptionProjectCollaborator_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ProjectCollaborator_Stream_Cursor_Input>>;
  where?: InputMaybe<ProjectCollaborator_Bool_Exp>;
};


export type Offchain_SubscriptionProjectMediaArgs = {
  distinct_on?: InputMaybe<Array<ProjectMedia_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ProjectMedia_Order_By>>;
  where?: InputMaybe<ProjectMedia_Bool_Exp>;
};


export type Offchain_SubscriptionProjectMedia_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ProjectMedia_Stream_Cursor_Input>>;
  where?: InputMaybe<ProjectMedia_Bool_Exp>;
};


export type Offchain_SubscriptionProject_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Offchain_SubscriptionProject_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Project_Stream_Cursor_Input>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


export type Offchain_SubscriptionRetrospectiveArgs = {
  distinct_on?: InputMaybe<Array<Retrospective_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Retrospective_Order_By>>;
  where?: InputMaybe<Retrospective_Bool_Exp>;
};


export type Offchain_SubscriptionRetrospective_By_PkArgs = {
  walletAddress: Scalars['String']['input'];
};


export type Offchain_SubscriptionRetrospective_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Retrospective_Stream_Cursor_Input>>;
  where?: InputMaybe<Retrospective_Bool_Exp>;
};


export type Offchain_SubscriptionUserAccountArgs = {
  distinct_on?: InputMaybe<Array<UserAccount_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserAccount_Order_By>>;
  where?: InputMaybe<UserAccount_Bool_Exp>;
};


export type Offchain_SubscriptionUserAccount_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<UserAccount_Stream_Cursor_Input>>;
  where?: InputMaybe<UserAccount_Bool_Exp>;
};


export type Offchain_SubscriptionWalletArgs = {
  distinct_on?: InputMaybe<Array<Wallet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallet_Order_By>>;
  where?: InputMaybe<Wallet_Bool_Exp>;
};


export type Offchain_SubscriptionWallet_By_PkArgs = {
  address: Scalars['String']['input'];
};


export type Offchain_SubscriptionWallet_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Wallet_Stream_Cursor_Input>>;
  where?: InputMaybe<Wallet_Bool_Exp>;
};


export type Offchain_SubscriptionWhitelistArgs = {
  distinct_on?: InputMaybe<Array<Whitelist_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Whitelist_Order_By>>;
  where?: InputMaybe<Whitelist_Bool_Exp>;
};


export type Offchain_SubscriptionWhitelistEntriesArgs = {
  distinct_on?: InputMaybe<Array<WhitelistEntries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<WhitelistEntries_Order_By>>;
  where?: InputMaybe<WhitelistEntries_Bool_Exp>;
};


export type Offchain_SubscriptionWhitelistEntries_By_PkArgs = {
  merkleRoot: Scalars['String']['input'];
  whitelistIndex: Scalars['Int']['input'];
};


export type Offchain_SubscriptionWhitelistEntries_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<WhitelistEntries_Stream_Cursor_Input>>;
  where?: InputMaybe<WhitelistEntries_Bool_Exp>;
};


export type Offchain_SubscriptionWhitelist_By_PkArgs = {
  merkleRoot: Scalars['String']['input'];
};


export type Offchain_SubscriptionWhitelist_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Whitelist_Stream_Cursor_Input>>;
  where?: InputMaybe<Whitelist_Bool_Exp>;
};

/** columns and relationships of "offer" */
export type Offer = {
  __typename?: 'offer';
  accepted_at?: Maybe<Scalars['timestamptz']['output']>;
  buyer_id?: Maybe<Scalars['String']['output']>;
  cancelled_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['String']['output'];
  is_inactive?: Maybe<Scalars['Boolean']['output']>;
  metadata?: Maybe<Scalars['jsonb']['output']>;
  /** An object relationship */
  objkt?: Maybe<Objkt>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  price: Scalars['numeric']['output'];
  status: Scalars['offer_status_enum']['output'];
  /** An object relationship */
  user?: Maybe<User>;
  version: Scalars['Int']['output'];
};


/** columns and relationships of "offer" */
export type OfferMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "offer" */
export type Offer_Aggregate = {
  __typename?: 'offer_aggregate';
  aggregate?: Maybe<Offer_Aggregate_Fields>;
  nodes: Array<Offer>;
};

export type Offer_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Offer_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Offer_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Offer_Aggregate_Bool_Exp_Count>;
};

export type Offer_Aggregate_Bool_Exp_Bool_And = {
  arguments: Offer_Select_Column_Offer_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Offer_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Offer_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Offer_Select_Column_Offer_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Offer_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Offer_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Offer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Offer_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "offer" */
export type Offer_Aggregate_Fields = {
  __typename?: 'offer_aggregate_fields';
  avg?: Maybe<Offer_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Offer_Max_Fields>;
  min?: Maybe<Offer_Min_Fields>;
  stddev?: Maybe<Offer_Stddev_Fields>;
  stddev_pop?: Maybe<Offer_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Offer_Stddev_Samp_Fields>;
  sum?: Maybe<Offer_Sum_Fields>;
  var_pop?: Maybe<Offer_Var_Pop_Fields>;
  var_samp?: Maybe<Offer_Var_Samp_Fields>;
  variance?: Maybe<Offer_Variance_Fields>;
};


/** aggregate fields of "offer" */
export type Offer_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Offer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "offer" */
export type Offer_Aggregate_Order_By = {
  avg?: InputMaybe<Offer_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Offer_Max_Order_By>;
  min?: InputMaybe<Offer_Min_Order_By>;
  stddev?: InputMaybe<Offer_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Offer_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Offer_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Offer_Sum_Order_By>;
  var_pop?: InputMaybe<Offer_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Offer_Var_Samp_Order_By>;
  variance?: InputMaybe<Offer_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Offer_Avg_Fields = {
  __typename?: 'offer_avg_fields';
  price?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "offer" */
export type Offer_Avg_Order_By = {
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "offer". All fields are combined with a logical 'AND'. */
export type Offer_Bool_Exp = {
  _and?: InputMaybe<Array<Offer_Bool_Exp>>;
  _not?: InputMaybe<Offer_Bool_Exp>;
  _or?: InputMaybe<Array<Offer_Bool_Exp>>;
  accepted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  buyer_id?: InputMaybe<String_Comparison_Exp>;
  cancelled_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  is_inactive?: InputMaybe<Boolean_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  objkt?: InputMaybe<Objkt_Bool_Exp>;
  objkt_id?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  status?: InputMaybe<Offer_Status_Enum_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  version?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Offer_Max_Fields = {
  __typename?: 'offer_max_fields';
  accepted_at?: Maybe<Scalars['timestamptz']['output']>;
  buyer_id?: Maybe<Scalars['String']['output']>;
  cancelled_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['offer_status_enum']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "offer" */
export type Offer_Max_Order_By = {
  accepted_at?: InputMaybe<Order_By>;
  buyer_id?: InputMaybe<Order_By>;
  cancelled_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Offer_Min_Fields = {
  __typename?: 'offer_min_fields';
  accepted_at?: Maybe<Scalars['timestamptz']['output']>;
  buyer_id?: Maybe<Scalars['String']['output']>;
  cancelled_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['offer_status_enum']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "offer" */
export type Offer_Min_Order_By = {
  accepted_at?: InputMaybe<Order_By>;
  buyer_id?: InputMaybe<Order_By>;
  cancelled_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "offer". */
export type Offer_Order_By = {
  accepted_at?: InputMaybe<Order_By>;
  buyer_id?: InputMaybe<Order_By>;
  cancelled_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_inactive?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  objkt?: InputMaybe<Objkt_Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  version?: InputMaybe<Order_By>;
};

/** select columns of table "offer" */
export enum Offer_Select_Column {
  /** column name */
  AcceptedAt = 'accepted_at',
  /** column name */
  BuyerId = 'buyer_id',
  /** column name */
  CancelledAt = 'cancelled_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsInactive = 'is_inactive',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  ObjktId = 'objkt_id',
  /** column name */
  Price = 'price',
  /** column name */
  Status = 'status',
  /** column name */
  Version = 'version'
}

/** select "offer_aggregate_bool_exp_bool_and_arguments_columns" columns of table "offer" */
export enum Offer_Select_Column_Offer_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsInactive = 'is_inactive'
}

/** select "offer_aggregate_bool_exp_bool_or_arguments_columns" columns of table "offer" */
export enum Offer_Select_Column_Offer_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsInactive = 'is_inactive'
}

/** Boolean expression to compare columns of type "offer_status_enum". All fields are combined with logical 'AND'. */
export type Offer_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['offer_status_enum']['input']>;
  _gt?: InputMaybe<Scalars['offer_status_enum']['input']>;
  _gte?: InputMaybe<Scalars['offer_status_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['offer_status_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['offer_status_enum']['input']>;
  _lte?: InputMaybe<Scalars['offer_status_enum']['input']>;
  _neq?: InputMaybe<Scalars['offer_status_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['offer_status_enum']['input']>>;
};

/** aggregate stddev on columns */
export type Offer_Stddev_Fields = {
  __typename?: 'offer_stddev_fields';
  price?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "offer" */
export type Offer_Stddev_Order_By = {
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Offer_Stddev_Pop_Fields = {
  __typename?: 'offer_stddev_pop_fields';
  price?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "offer" */
export type Offer_Stddev_Pop_Order_By = {
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Offer_Stddev_Samp_Fields = {
  __typename?: 'offer_stddev_samp_fields';
  price?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "offer" */
export type Offer_Stddev_Samp_Order_By = {
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "offer" */
export type Offer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Offer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Offer_Stream_Cursor_Value_Input = {
  accepted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  buyer_id?: InputMaybe<Scalars['String']['input']>;
  cancelled_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_inactive?: InputMaybe<Scalars['Boolean']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  objkt_id?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Scalars['offer_status_enum']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Offer_Sum_Fields = {
  __typename?: 'offer_sum_fields';
  price?: Maybe<Scalars['numeric']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "offer" */
export type Offer_Sum_Order_By = {
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Offer_Var_Pop_Fields = {
  __typename?: 'offer_var_pop_fields';
  price?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "offer" */
export type Offer_Var_Pop_Order_By = {
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Offer_Var_Samp_Fields = {
  __typename?: 'offer_var_samp_fields';
  price?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "offer" */
export type Offer_Var_Samp_Order_By = {
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Offer_Variance_Fields = {
  __typename?: 'offer_variance_fields';
  price?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "offer" */
export type Offer_Variance_Order_By = {
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

export type Onchain_Query = {
  __typename?: 'onchain_query';
  /** fetch data from the table: "action" */
  action: Array<Action>;
  /** fetch aggregated fields from the table: "action" */
  action_aggregate: Action_Aggregate;
  /** fetch data from the table: "action" using primary key columns */
  action_by_pk?: Maybe<Action>;
  /** fetch data from the table: "active_listing" */
  active_listing: Array<Active_Listing>;
  /** fetch aggregated fields from the table: "active_listing" */
  active_listing_aggregate: Active_Listing_Aggregate;
  /** fetch data from the table: "airdrop_claim" */
  airdrop_claim: Array<Airdrop_Claim>;
  /** fetch data from the table: "airdrop_claim" using primary key columns */
  airdrop_claim_by_pk?: Maybe<Airdrop_Claim>;
  /** fetch data from the table: "any_offer" */
  any_offer: Array<Any_Offer>;
  /** fetch aggregated fields from the table: "any_offer" */
  any_offer_aggregate: Any_Offer_Aggregate;
  /** fetch data from the table: "art_coin" */
  art_coin: Array<Art_Coin>;
  /** fetch aggregated fields from the table: "art_coin" */
  art_coin_aggregate: Art_Coin_Aggregate;
  /** fetch data from the table: "art_coin_bonding_trade" */
  art_coin_bonding_trade: Array<Art_Coin_Bonding_Trade>;
  /** fetch aggregated fields from the table: "art_coin_bonding_trade" */
  art_coin_bonding_trade_aggregate: Art_Coin_Bonding_Trade_Aggregate;
  /** fetch data from the table: "art_coin_bonding_trade" using primary key columns */
  art_coin_bonding_trade_by_pk?: Maybe<Art_Coin_Bonding_Trade>;
  /** fetch data from the table: "art_coin" using primary key columns */
  art_coin_by_pk?: Maybe<Art_Coin>;
  /** fetch data from the table: "art_coin_holding" */
  art_coin_holding: Array<Art_Coin_Holding>;
  /** fetch aggregated fields from the table: "art_coin_holding" */
  art_coin_holding_aggregate: Art_Coin_Holding_Aggregate;
  /** fetch data from the table: "art_coin_holding" using primary key columns */
  art_coin_holding_by_pk?: Maybe<Art_Coin_Holding>;
  /** fetch data from the table: "art_coin_market_stats" */
  art_coin_market_stats: Array<Art_Coin_Market_Stats>;
  /** fetch data from the table: "art_coin_market_stats" using primary key columns */
  art_coin_market_stats_by_pk?: Maybe<Art_Coin_Market_Stats>;
  /** fetch data from the table: "art_coin_market_stats_history" */
  art_coin_market_stats_history: Array<Art_Coin_Market_Stats_History>;
  /** fetch data from the table: "art_coin_market_stats_history" using primary key columns */
  art_coin_market_stats_history_by_pk?: Maybe<Art_Coin_Market_Stats_History>;
  /** fetch data from the table: "art_coin_market_stats_history_hourly" */
  art_coin_market_stats_history_hourly: Array<Art_Coin_Market_Stats_History_Hourly>;
  /** fetch data from the table: "art_coin_transfer" */
  art_coin_transfer: Array<Art_Coin_Transfer>;
  /** fetch data from the table: "art_coin_transfer" using primary key columns */
  art_coin_transfer_by_pk?: Maybe<Art_Coin_Transfer>;
  /** fetch data from the table: "article" */
  article: Array<Article>;
  /** fetch aggregated fields from the table: "article" */
  article_aggregate: Article_Aggregate;
  /** fetch data from the table: "article" using primary key columns */
  article_by_pk?: Maybe<Article>;
  /** fetch data from the table: "article_generative_token" */
  article_generative_token: Array<Article_Generative_Token>;
  /** fetch data from the table: "article_generative_token" using primary key columns */
  article_generative_token_by_pk?: Maybe<Article_Generative_Token>;
  /** fetch data from the table: "article_ledger" */
  article_ledger: Array<Article_Ledger>;
  /** fetch aggregated fields from the table: "article_ledger" */
  article_ledger_aggregate: Article_Ledger_Aggregate;
  /** fetch data from the table: "article_ledger" using primary key columns */
  article_ledger_by_pk?: Maybe<Article_Ledger>;
  /** fetch data from the table: "article_revision" */
  article_revision: Array<Article_Revision>;
  /** fetch data from the table: "article_revision" using primary key columns */
  article_revision_by_pk?: Maybe<Article_Revision>;
  /** fetch data from the table: "auction" */
  auction: Array<Auction>;
  /** fetch data from the table: "auction_bid" */
  auction_bid: Array<Auction_Bid>;
  /** fetch data from the table: "auction_bid" using primary key columns */
  auction_bid_by_pk?: Maybe<Auction_Bid>;
  /** fetch data from the table: "auction_bid_table" */
  auction_bid_table: Array<Auction_Bid_Table>;
  /** fetch data from the table: "auction_bid_table" using primary key columns */
  auction_bid_table_by_pk?: Maybe<Auction_Bid_Table>;
  /** fetch data from the table: "auction" using primary key columns */
  auction_by_pk?: Maybe<Auction>;
  /** fetch data from the table: "squid_processor_base.hot_block" */
  base_indexer: Array<Base_Indexer>;
  /** fetch data from the table: "squid_processor_base.hot_block" using primary key columns */
  base_indexer_by_pk?: Maybe<Base_Indexer>;
  /** fetch data from the table: "codex" */
  codex: Array<Codex>;
  /** fetch data from the table: "codex" using primary key columns */
  codex_by_pk?: Maybe<Codex>;
  /** fetch data from the table: "codex_update_request" */
  codex_update_request: Array<Codex_Update_Request>;
  /** fetch data from the table: "codex_update_request" using primary key columns */
  codex_update_request_by_pk?: Maybe<Codex_Update_Request>;
  /** fetch data from the table: "collaboration" */
  collaboration: Array<Collaboration>;
  /** fetch data from the table: "collection_offer" */
  collection_offer: Array<Collection_Offer>;
  /** fetch data from the table: "collection_offer" using primary key columns */
  collection_offer_by_pk?: Maybe<Collection_Offer>;
  /** fetch data from the table: "eth_frame_data" */
  eth_frame_data: Array<Eth_Frame_Data>;
  /** fetch data from the table: "eth_frame_data" using primary key columns */
  eth_frame_data_by_pk?: Maybe<Eth_Frame_Data>;
  /** fetch data from the table: "squid_processor.hot_block" */
  eth_indexer: Array<Eth_Indexer>;
  /** fetch data from the table: "squid_processor.hot_block" using primary key columns */
  eth_indexer_by_pk?: Maybe<Eth_Indexer>;
  /** fetch data from the table: "eth_minter_proceeds" */
  eth_minter_proceeds: Array<Eth_Minter_Proceeds>;
  /** fetch data from the table: "eth_minter_proceeds" using primary key columns */
  eth_minter_proceeds_by_pk?: Maybe<Eth_Minter_Proceeds>;
  /** fetch data from the table: "eth_primary_splits" */
  eth_primary_splits: Array<Eth_Primary_Splits>;
  /** fetch data from the table: "eth_primary_splits" using primary key columns */
  eth_primary_splits_by_pk?: Maybe<Eth_Primary_Splits>;
  /** fetch data from the table: "eth_secondary_splits" */
  eth_secondary_splits: Array<Eth_Secondary_Splits>;
  /** fetch data from the table: "eth_secondary_splits" using primary key columns */
  eth_secondary_splits_by_pk?: Maybe<Eth_Secondary_Splits>;
  /** fetch data from the table: "eth_user_proceeds" */
  eth_user_proceeds: Array<Eth_User_Proceeds>;
  /** fetch data from the table: "eth_user_proceeds" using primary key columns */
  eth_user_proceeds_by_pk?: Maybe<Eth_User_Proceeds>;
  /** fetch data from the table: "foreign_wallet_account" */
  foreign_wallet_account: Array<Foreign_Wallet_Account>;
  /** fetch data from the table: "generative_token" */
  generative_token: Array<Generative_Token>;
  /** fetch aggregated fields from the table: "generative_token" */
  generative_token_aggregate: Generative_Token_Aggregate;
  /** fetch data from the table: "generative_token" using primary key columns */
  generative_token_by_pk?: Maybe<Generative_Token>;
  /** fetch data from the table: "generative_token_collected" */
  generative_token_collected: Array<Generative_Token_Collected>;
  /** fetch aggregated fields from the table: "generative_token_collected" */
  generative_token_collected_aggregate: Generative_Token_Collected_Aggregate;
  /** fetch data from the table: "gentk_assign" */
  gentk_assign: Array<Gentk_Assign>;
  /** fetch data from the table: "gentk_assign" using primary key columns */
  gentk_assign_by_pk?: Maybe<Gentk_Assign>;
  /** fetch data from the table: "indexed_operation" */
  indexed_operation: Array<Indexed_Operation>;
  /** fetch data from the table: "indexed_operation" using primary key columns */
  indexed_operation_by_pk?: Maybe<Indexed_Operation>;
  /** fetch data from the table: "indexing_cursor" */
  indexing_cursor: Array<Indexing_Cursor>;
  /** fetch data from the table: "indexing_cursor" using primary key columns */
  indexing_cursor_by_pk?: Maybe<Indexing_Cursor>;
  /** fetch data from the table: "indexing_target" */
  indexing_target: Array<Indexing_Target>;
  /** fetch data from the table: "indexing_target" using primary key columns */
  indexing_target_by_pk?: Maybe<Indexing_Target>;
  /** fetch data from the table: "ipfs_cid" */
  ipfs_cid: Array<Ipfs_Cid>;
  /** fetch data from the table: "ipfs_cid" using primary key columns */
  ipfs_cid_by_pk?: Maybe<Ipfs_Cid>;
  /** fetch data from the table: "listing" */
  listing: Array<Listing>;
  /** fetch aggregated fields from the table: "listing" */
  listing_aggregate: Listing_Aggregate;
  /** fetch data from the table: "listing" using primary key columns */
  listing_by_pk?: Maybe<Listing>;
  /** fetch data from the table: "market_stats" */
  market_stats: Array<Market_Stats>;
  /** fetch aggregated fields from the table: "market_stats" */
  market_stats_aggregate: Market_Stats_Aggregate;
  /** fetch data from the table: "market_stats" using primary key columns */
  market_stats_by_pk?: Maybe<Market_Stats>;
  /** fetch data from the table: "market_stats_history" */
  market_stats_history: Array<Market_Stats_History>;
  /** fetch data from the table: "market_stats_history" using primary key columns */
  market_stats_history_by_pk?: Maybe<Market_Stats_History>;
  /** fetch data from the table: "market_stats_history_daily" */
  market_stats_history_daily: Array<Market_Stats_History_Daily>;
  /** fetch data from the table: "market_stats_history_hourly" */
  market_stats_history_hourly: Array<Market_Stats_History_Hourly>;
  /** fetch data from the table: "media_image" */
  media_image: Array<Media_Image>;
  /** fetch data from the table: "media_image" using primary key columns */
  media_image_by_pk?: Maybe<Media_Image>;
  /** fetch data from the table: "metric" */
  metric: Array<Metric>;
  /** fetch data from the table: "metric" using primary key columns */
  metric_by_pk?: Maybe<Metric>;
  /** fetch data from the table: "mint_ticket" */
  mint_ticket: Array<Mint_Ticket>;
  /** fetch aggregated fields from the table: "mint_ticket" */
  mint_ticket_aggregate: Mint_Ticket_Aggregate;
  /** fetch data from the table: "mint_ticket" using primary key columns */
  mint_ticket_by_pk?: Maybe<Mint_Ticket>;
  /** An array relationship */
  mint_ticket_settings: Array<Mint_Ticket_Settings>;
  /** fetch data from the table: "mint_ticket_settings" using primary key columns */
  mint_ticket_settings_by_pk?: Maybe<Mint_Ticket_Settings>;
  /** fetch data from the table: "moderation_reason" */
  moderation_reason: Array<Moderation_Reason>;
  /** fetch data from the table: "moderation_reason" using primary key columns */
  moderation_reason_by_pk?: Maybe<Moderation_Reason>;
  /** fetch data from the table: "objkt" */
  objkt: Array<Objkt>;
  /** fetch aggregated fields from the table: "objkt" */
  objkt_aggregate: Objkt_Aggregate;
  /** fetch data from the table: "objkt" using primary key columns */
  objkt_by_pk?: Maybe<Objkt>;
  /** fetch data from the table: "offer" */
  offer: Array<Offer>;
  /** fetch aggregated fields from the table: "offer" */
  offer_aggregate: Offer_Aggregate;
  /** fetch data from the table: "offer" using primary key columns */
  offer_by_pk?: Maybe<Offer>;
  /** fetch data from the table: "pricing_dutch_auction" */
  pricing_dutch_auction: Array<Pricing_Dutch_Auction>;
  /** fetch data from the table: "pricing_dutch_auction" using primary key columns */
  pricing_dutch_auction_by_pk?: Maybe<Pricing_Dutch_Auction>;
  /** fetch data from the table: "pricing_fixed" */
  pricing_fixed: Array<Pricing_Fixed>;
  /** fetch data from the table: "pricing_fixed" using primary key columns */
  pricing_fixed_by_pk?: Maybe<Pricing_Fixed>;
  /** fetch data from the table: "redeemable" */
  redeemable: Array<Redeemable>;
  /** fetch data from the table: "redeemable" using primary key columns */
  redeemable_by_pk?: Maybe<Redeemable>;
  /** fetch data from the table: "redemption" */
  redemption: Array<Redemption>;
  /** fetch data from the table: "redemption" using primary key columns */
  redemption_by_pk?: Maybe<Redemption>;
  /** fetch data from the table: "report" */
  report: Array<Report>;
  /** fetch data from the table: "report" using primary key columns */
  report_by_pk?: Maybe<Report>;
  /** fetch data from the table: "reserve" */
  reserve: Array<Reserve>;
  /** fetch data from the table: "reserve" using primary key columns */
  reserve_by_pk?: Maybe<Reserve>;
  /** fetch data from the table: "split" */
  split: Array<Split>;
  /** fetch data from the table: "split" using primary key columns */
  split_by_pk?: Maybe<Split>;
  /** fetch data from the table: "transaction" */
  transaction: Array<Transaction>;
  /** fetch data from the table: "transaction" using primary key columns */
  transaction_by_pk?: Maybe<Transaction>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "user_stats" */
  user_stats: Array<User_Stats>;
  /** fetch data from the table: "user_stats" using primary key columns */
  user_stats_by_pk?: Maybe<User_Stats>;
  /** fetch data from the table: "wallet_account" */
  wallet_account: Array<Wallet_Account>;
  /** fetch data from the table: "wallet_account" using primary key columns */
  wallet_account_by_pk?: Maybe<Wallet_Account>;
};


export type Onchain_QueryActionArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


export type Onchain_QueryAction_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


export type Onchain_QueryAction_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Onchain_QueryActive_ListingArgs = {
  distinct_on?: InputMaybe<Array<Active_Listing_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Active_Listing_Order_By>>;
  where?: InputMaybe<Active_Listing_Bool_Exp>;
};


export type Onchain_QueryActive_Listing_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Active_Listing_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Active_Listing_Order_By>>;
  where?: InputMaybe<Active_Listing_Bool_Exp>;
};


export type Onchain_QueryAirdrop_ClaimArgs = {
  distinct_on?: InputMaybe<Array<Airdrop_Claim_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Airdrop_Claim_Order_By>>;
  where?: InputMaybe<Airdrop_Claim_Bool_Exp>;
};


export type Onchain_QueryAirdrop_Claim_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryAny_OfferArgs = {
  distinct_on?: InputMaybe<Array<Any_Offer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Any_Offer_Order_By>>;
  where?: InputMaybe<Any_Offer_Bool_Exp>;
};


export type Onchain_QueryAny_Offer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Any_Offer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Any_Offer_Order_By>>;
  where?: InputMaybe<Any_Offer_Bool_Exp>;
};


export type Onchain_QueryArt_CoinArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Order_By>>;
  where?: InputMaybe<Art_Coin_Bool_Exp>;
};


export type Onchain_QueryArt_Coin_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Order_By>>;
  where?: InputMaybe<Art_Coin_Bool_Exp>;
};


export type Onchain_QueryArt_Coin_Bonding_TradeArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Bonding_Trade_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Bonding_Trade_Order_By>>;
  where?: InputMaybe<Art_Coin_Bonding_Trade_Bool_Exp>;
};


export type Onchain_QueryArt_Coin_Bonding_Trade_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Bonding_Trade_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Bonding_Trade_Order_By>>;
  where?: InputMaybe<Art_Coin_Bonding_Trade_Bool_Exp>;
};


export type Onchain_QueryArt_Coin_Bonding_Trade_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_QueryArt_Coin_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryArt_Coin_HoldingArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Holding_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Holding_Order_By>>;
  where?: InputMaybe<Art_Coin_Holding_Bool_Exp>;
};


export type Onchain_QueryArt_Coin_Holding_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Holding_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Holding_Order_By>>;
  where?: InputMaybe<Art_Coin_Holding_Bool_Exp>;
};


export type Onchain_QueryArt_Coin_Holding_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryArt_Coin_Market_StatsArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Market_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Market_Stats_Order_By>>;
  where?: InputMaybe<Art_Coin_Market_Stats_Bool_Exp>;
};


export type Onchain_QueryArt_Coin_Market_Stats_By_PkArgs = {
  art_coin_id: Scalars['String']['input'];
};


export type Onchain_QueryArt_Coin_Market_Stats_HistoryArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Market_Stats_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Market_Stats_History_Order_By>>;
  where?: InputMaybe<Art_Coin_Market_Stats_History_Bool_Exp>;
};


export type Onchain_QueryArt_Coin_Market_Stats_History_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_QueryArt_Coin_Market_Stats_History_HourlyArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Market_Stats_History_Hourly_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Market_Stats_History_Hourly_Order_By>>;
  where?: InputMaybe<Art_Coin_Market_Stats_History_Hourly_Bool_Exp>;
};


export type Onchain_QueryArt_Coin_TransferArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Transfer_Order_By>>;
  where?: InputMaybe<Art_Coin_Transfer_Bool_Exp>;
};


export type Onchain_QueryArt_Coin_Transfer_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_QueryArticleArgs = {
  distinct_on?: InputMaybe<Array<Article_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Order_By>>;
  where?: InputMaybe<Article_Bool_Exp>;
};


export type Onchain_QueryArticle_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Article_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Order_By>>;
  where?: InputMaybe<Article_Bool_Exp>;
};


export type Onchain_QueryArticle_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_QueryArticle_Generative_TokenArgs = {
  distinct_on?: InputMaybe<Array<Article_Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Generative_Token_Order_By>>;
  where?: InputMaybe<Article_Generative_Token_Bool_Exp>;
};


export type Onchain_QueryArticle_Generative_Token_By_PkArgs = {
  article_id: Scalars['Int']['input'];
  generative_token_id: Scalars['String']['input'];
};


export type Onchain_QueryArticle_LedgerArgs = {
  distinct_on?: InputMaybe<Array<Article_Ledger_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Ledger_Order_By>>;
  where?: InputMaybe<Article_Ledger_Bool_Exp>;
};


export type Onchain_QueryArticle_Ledger_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Article_Ledger_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Ledger_Order_By>>;
  where?: InputMaybe<Article_Ledger_Bool_Exp>;
};


export type Onchain_QueryArticle_Ledger_By_PkArgs = {
  article_id: Scalars['Int']['input'];
  owner_id: Scalars['String']['input'];
};


export type Onchain_QueryArticle_RevisionArgs = {
  distinct_on?: InputMaybe<Array<Article_Revision_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Revision_Order_By>>;
  where?: InputMaybe<Article_Revision_Bool_Exp>;
};


export type Onchain_QueryArticle_Revision_By_PkArgs = {
  article_id: Scalars['Int']['input'];
  iteration: Scalars['smallint']['input'];
};


export type Onchain_QueryAuctionArgs = {
  distinct_on?: InputMaybe<Array<Auction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Auction_Order_By>>;
  where?: InputMaybe<Auction_Bool_Exp>;
};


export type Onchain_QueryAuction_BidArgs = {
  distinct_on?: InputMaybe<Array<Auction_Bid_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Auction_Bid_Order_By>>;
  where?: InputMaybe<Auction_Bid_Bool_Exp>;
};


export type Onchain_QueryAuction_Bid_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Onchain_QueryAuction_Bid_TableArgs = {
  distinct_on?: InputMaybe<Array<Auction_Bid_Table_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Auction_Bid_Table_Order_By>>;
  where?: InputMaybe<Auction_Bid_Table_Bool_Exp>;
};


export type Onchain_QueryAuction_Bid_Table_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_QueryAuction_By_PkArgs = {
  id: Scalars['Int']['input'];
  version: Scalars['Int']['input'];
};


export type Onchain_QueryBase_IndexerArgs = {
  distinct_on?: InputMaybe<Array<Base_Indexer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Base_Indexer_Order_By>>;
  where?: InputMaybe<Base_Indexer_Bool_Exp>;
};


export type Onchain_QueryBase_Indexer_By_PkArgs = {
  height: Scalars['Int']['input'];
};


export type Onchain_QueryCodexArgs = {
  distinct_on?: InputMaybe<Array<Codex_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Codex_Order_By>>;
  where?: InputMaybe<Codex_Bool_Exp>;
};


export type Onchain_QueryCodex_By_PkArgs = {
  id: Scalars['String']['input'];
  token_version: Scalars['generative_token_version']['input'];
};


export type Onchain_QueryCodex_Update_RequestArgs = {
  distinct_on?: InputMaybe<Array<Codex_Update_Request_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Codex_Update_Request_Order_By>>;
  where?: InputMaybe<Codex_Update_Request_Bool_Exp>;
};


export type Onchain_QueryCodex_Update_Request_By_PkArgs = {
  codex_id: Scalars['String']['input'];
  token_id: Scalars['String']['input'];
  token_version: Scalars['generative_token_version']['input'];
};


export type Onchain_QueryCollaborationArgs = {
  distinct_on?: InputMaybe<Array<Collaboration_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collaboration_Order_By>>;
  where?: InputMaybe<Collaboration_Bool_Exp>;
};


export type Onchain_QueryCollection_OfferArgs = {
  distinct_on?: InputMaybe<Array<Collection_Offer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collection_Offer_Order_By>>;
  where?: InputMaybe<Collection_Offer_Bool_Exp>;
};


export type Onchain_QueryCollection_Offer_By_PkArgs = {
  id: Scalars['String']['input'];
  version: Scalars['Int']['input'];
};


export type Onchain_QueryEth_Frame_DataArgs = {
  distinct_on?: InputMaybe<Array<Eth_Frame_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_Frame_Data_Order_By>>;
  where?: InputMaybe<Eth_Frame_Data_Bool_Exp>;
};


export type Onchain_QueryEth_Frame_Data_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryEth_IndexerArgs = {
  distinct_on?: InputMaybe<Array<Eth_Indexer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_Indexer_Order_By>>;
  where?: InputMaybe<Eth_Indexer_Bool_Exp>;
};


export type Onchain_QueryEth_Indexer_By_PkArgs = {
  height: Scalars['Int']['input'];
};


export type Onchain_QueryEth_Minter_ProceedsArgs = {
  distinct_on?: InputMaybe<Array<Eth_Minter_Proceeds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_Minter_Proceeds_Order_By>>;
  where?: InputMaybe<Eth_Minter_Proceeds_Bool_Exp>;
};


export type Onchain_QueryEth_Minter_Proceeds_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryEth_Primary_SplitsArgs = {
  distinct_on?: InputMaybe<Array<Eth_Primary_Splits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_Primary_Splits_Order_By>>;
  where?: InputMaybe<Eth_Primary_Splits_Bool_Exp>;
};


export type Onchain_QueryEth_Primary_Splits_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryEth_Secondary_SplitsArgs = {
  distinct_on?: InputMaybe<Array<Eth_Secondary_Splits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_Secondary_Splits_Order_By>>;
  where?: InputMaybe<Eth_Secondary_Splits_Bool_Exp>;
};


export type Onchain_QueryEth_Secondary_Splits_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryEth_User_ProceedsArgs = {
  distinct_on?: InputMaybe<Array<Eth_User_Proceeds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_User_Proceeds_Order_By>>;
  where?: InputMaybe<Eth_User_Proceeds_Bool_Exp>;
};


export type Onchain_QueryEth_User_Proceeds_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryForeign_Wallet_AccountArgs = {
  distinct_on?: InputMaybe<Array<Foreign_Wallet_Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Foreign_Wallet_Account_Order_By>>;
  where?: InputMaybe<Foreign_Wallet_Account_Bool_Exp>;
};


export type Onchain_QueryGenerative_TokenArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Order_By>>;
  where?: InputMaybe<Generative_Token_Bool_Exp>;
};


export type Onchain_QueryGenerative_Token_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Order_By>>;
  where?: InputMaybe<Generative_Token_Bool_Exp>;
};


export type Onchain_QueryGenerative_Token_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryGenerative_Token_CollectedArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Collected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Collected_Order_By>>;
  where?: InputMaybe<Generative_Token_Collected_Bool_Exp>;
};


export type Onchain_QueryGenerative_Token_Collected_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Collected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Collected_Order_By>>;
  where?: InputMaybe<Generative_Token_Collected_Bool_Exp>;
};


export type Onchain_QueryGentk_AssignArgs = {
  distinct_on?: InputMaybe<Array<Gentk_Assign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Gentk_Assign_Order_By>>;
  where?: InputMaybe<Gentk_Assign_Bool_Exp>;
};


export type Onchain_QueryGentk_Assign_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryIndexed_OperationArgs = {
  distinct_on?: InputMaybe<Array<Indexed_Operation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Indexed_Operation_Order_By>>;
  where?: InputMaybe<Indexed_Operation_Bool_Exp>;
};


export type Onchain_QueryIndexed_Operation_By_PkArgs = {
  hashed: Scalars['String']['input'];
};


export type Onchain_QueryIndexing_CursorArgs = {
  distinct_on?: InputMaybe<Array<Indexing_Cursor_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Indexing_Cursor_Order_By>>;
  where?: InputMaybe<Indexing_Cursor_Bool_Exp>;
};


export type Onchain_QueryIndexing_Cursor_By_PkArgs = {
  group_id: Scalars['String']['input'];
};


export type Onchain_QueryIndexing_TargetArgs = {
  distinct_on?: InputMaybe<Array<Indexing_Target_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Indexing_Target_Order_By>>;
  where?: InputMaybe<Indexing_Target_Bool_Exp>;
};


export type Onchain_QueryIndexing_Target_By_PkArgs = {
  address: Scalars['String']['input'];
};


export type Onchain_QueryIpfs_CidArgs = {
  distinct_on?: InputMaybe<Array<Ipfs_Cid_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ipfs_Cid_Order_By>>;
  where?: InputMaybe<Ipfs_Cid_Bool_Exp>;
};


export type Onchain_QueryIpfs_Cid_By_PkArgs = {
  cid: Scalars['String']['input'];
};


export type Onchain_QueryListingArgs = {
  distinct_on?: InputMaybe<Array<Listing_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Listing_Order_By>>;
  where?: InputMaybe<Listing_Bool_Exp>;
};


export type Onchain_QueryListing_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Listing_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Listing_Order_By>>;
  where?: InputMaybe<Listing_Bool_Exp>;
};


export type Onchain_QueryListing_By_PkArgs = {
  id: Scalars['String']['input'];
  version: Scalars['Int']['input'];
};


export type Onchain_QueryMarket_StatsArgs = {
  distinct_on?: InputMaybe<Array<Market_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Stats_Order_By>>;
  where?: InputMaybe<Market_Stats_Bool_Exp>;
};


export type Onchain_QueryMarket_Stats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Market_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Stats_Order_By>>;
  where?: InputMaybe<Market_Stats_Bool_Exp>;
};


export type Onchain_QueryMarket_Stats_By_PkArgs = {
  token_id: Scalars['String']['input'];
};


export type Onchain_QueryMarket_Stats_HistoryArgs = {
  distinct_on?: InputMaybe<Array<Market_Stats_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Stats_History_Order_By>>;
  where?: InputMaybe<Market_Stats_History_Bool_Exp>;
};


export type Onchain_QueryMarket_Stats_History_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_QueryMarket_Stats_History_DailyArgs = {
  distinct_on?: InputMaybe<Array<Market_Stats_History_Daily_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Stats_History_Daily_Order_By>>;
  where?: InputMaybe<Market_Stats_History_Daily_Bool_Exp>;
};


export type Onchain_QueryMarket_Stats_History_HourlyArgs = {
  distinct_on?: InputMaybe<Array<Market_Stats_History_Hourly_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Stats_History_Hourly_Order_By>>;
  where?: InputMaybe<Market_Stats_History_Hourly_Bool_Exp>;
};


export type Onchain_QueryMedia_ImageArgs = {
  distinct_on?: InputMaybe<Array<Media_Image_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Media_Image_Order_By>>;
  where?: InputMaybe<Media_Image_Bool_Exp>;
};


export type Onchain_QueryMedia_Image_By_PkArgs = {
  id: Scalars['bpchar']['input'];
};


export type Onchain_QueryMetricArgs = {
  distinct_on?: InputMaybe<Array<Metric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Metric_Order_By>>;
  where?: InputMaybe<Metric_Bool_Exp>;
};


export type Onchain_QueryMetric_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryMint_TicketArgs = {
  distinct_on?: InputMaybe<Array<Mint_Ticket_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mint_Ticket_Order_By>>;
  where?: InputMaybe<Mint_Ticket_Bool_Exp>;
};


export type Onchain_QueryMint_Ticket_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mint_Ticket_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mint_Ticket_Order_By>>;
  where?: InputMaybe<Mint_Ticket_Bool_Exp>;
};


export type Onchain_QueryMint_Ticket_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryMint_Ticket_SettingsArgs = {
  distinct_on?: InputMaybe<Array<Mint_Ticket_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mint_Ticket_Settings_Order_By>>;
  where?: InputMaybe<Mint_Ticket_Settings_Bool_Exp>;
};


export type Onchain_QueryMint_Ticket_Settings_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryModeration_ReasonArgs = {
  distinct_on?: InputMaybe<Array<Moderation_Reason_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Moderation_Reason_Order_By>>;
  where?: InputMaybe<Moderation_Reason_Bool_Exp>;
};


export type Onchain_QueryModeration_Reason_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryObjktArgs = {
  distinct_on?: InputMaybe<Array<Objkt_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Objkt_Order_By>>;
  where?: InputMaybe<Objkt_Bool_Exp>;
};


export type Onchain_QueryObjkt_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Objkt_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Objkt_Order_By>>;
  where?: InputMaybe<Objkt_Bool_Exp>;
};


export type Onchain_QueryObjkt_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryOfferArgs = {
  distinct_on?: InputMaybe<Array<Offer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Offer_Order_By>>;
  where?: InputMaybe<Offer_Bool_Exp>;
};


export type Onchain_QueryOffer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Offer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Offer_Order_By>>;
  where?: InputMaybe<Offer_Bool_Exp>;
};


export type Onchain_QueryOffer_By_PkArgs = {
  id: Scalars['String']['input'];
  version: Scalars['Int']['input'];
};


export type Onchain_QueryPricing_Dutch_AuctionArgs = {
  distinct_on?: InputMaybe<Array<Pricing_Dutch_Auction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Pricing_Dutch_Auction_Order_By>>;
  where?: InputMaybe<Pricing_Dutch_Auction_Bool_Exp>;
};


export type Onchain_QueryPricing_Dutch_Auction_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryPricing_FixedArgs = {
  distinct_on?: InputMaybe<Array<Pricing_Fixed_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Pricing_Fixed_Order_By>>;
  where?: InputMaybe<Pricing_Fixed_Bool_Exp>;
};


export type Onchain_QueryPricing_Fixed_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryRedeemableArgs = {
  distinct_on?: InputMaybe<Array<Redeemable_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redeemable_Order_By>>;
  where?: InputMaybe<Redeemable_Bool_Exp>;
};


export type Onchain_QueryRedeemable_By_PkArgs = {
  address: Scalars['String']['input'];
};


export type Onchain_QueryRedemptionArgs = {
  distinct_on?: InputMaybe<Array<Redemption_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redemption_Order_By>>;
  where?: InputMaybe<Redemption_Bool_Exp>;
};


export type Onchain_QueryRedemption_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_QueryReportArgs = {
  distinct_on?: InputMaybe<Array<Report_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Report_Order_By>>;
  where?: InputMaybe<Report_Bool_Exp>;
};


export type Onchain_QueryReport_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Onchain_QueryReserveArgs = {
  distinct_on?: InputMaybe<Array<Reserve_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reserve_Order_By>>;
  where?: InputMaybe<Reserve_Bool_Exp>;
};


export type Onchain_QueryReserve_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_QuerySplitArgs = {
  distinct_on?: InputMaybe<Array<Split_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Split_Order_By>>;
  where?: InputMaybe<Split_Bool_Exp>;
};


export type Onchain_QuerySplit_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_QueryTransactionArgs = {
  distinct_on?: InputMaybe<Array<Transaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transaction_Order_By>>;
  where?: InputMaybe<Transaction_Bool_Exp>;
};


export type Onchain_QueryTransaction_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_QueryUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Onchain_QueryUser_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_QueryUser_StatsArgs = {
  distinct_on?: InputMaybe<Array<User_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Stats_Order_By>>;
  where?: InputMaybe<User_Stats_Bool_Exp>;
};


export type Onchain_QueryUser_Stats_By_PkArgs = {
  user_id: Scalars['String']['input'];
};


export type Onchain_QueryWallet_AccountArgs = {
  distinct_on?: InputMaybe<Array<Wallet_Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallet_Account_Order_By>>;
  where?: InputMaybe<Wallet_Account_Bool_Exp>;
};


export type Onchain_QueryWallet_Account_By_PkArgs = {
  address: Scalars['String']['input'];
};

export type Onchain_Subscription = {
  __typename?: 'onchain_subscription';
  /** fetch data from the table: "action" */
  action: Array<Action>;
  /** fetch aggregated fields from the table: "action" */
  action_aggregate: Action_Aggregate;
  /** fetch data from the table: "action" using primary key columns */
  action_by_pk?: Maybe<Action>;
  /** fetch data from the table in a streaming manner: "action" */
  action_stream: Array<Action>;
  /** fetch data from the table: "active_listing" */
  active_listing: Array<Active_Listing>;
  /** fetch aggregated fields from the table: "active_listing" */
  active_listing_aggregate: Active_Listing_Aggregate;
  /** fetch data from the table in a streaming manner: "active_listing" */
  active_listing_stream: Array<Active_Listing>;
  /** fetch data from the table: "airdrop_claim" */
  airdrop_claim: Array<Airdrop_Claim>;
  /** fetch data from the table: "airdrop_claim" using primary key columns */
  airdrop_claim_by_pk?: Maybe<Airdrop_Claim>;
  /** fetch data from the table in a streaming manner: "airdrop_claim" */
  airdrop_claim_stream: Array<Airdrop_Claim>;
  /** fetch data from the table: "any_offer" */
  any_offer: Array<Any_Offer>;
  /** fetch aggregated fields from the table: "any_offer" */
  any_offer_aggregate: Any_Offer_Aggregate;
  /** fetch data from the table in a streaming manner: "any_offer" */
  any_offer_stream: Array<Any_Offer>;
  /** fetch data from the table: "art_coin" */
  art_coin: Array<Art_Coin>;
  /** fetch aggregated fields from the table: "art_coin" */
  art_coin_aggregate: Art_Coin_Aggregate;
  /** fetch data from the table: "art_coin_bonding_trade" */
  art_coin_bonding_trade: Array<Art_Coin_Bonding_Trade>;
  /** fetch aggregated fields from the table: "art_coin_bonding_trade" */
  art_coin_bonding_trade_aggregate: Art_Coin_Bonding_Trade_Aggregate;
  /** fetch data from the table: "art_coin_bonding_trade" using primary key columns */
  art_coin_bonding_trade_by_pk?: Maybe<Art_Coin_Bonding_Trade>;
  /** fetch data from the table in a streaming manner: "art_coin_bonding_trade" */
  art_coin_bonding_trade_stream: Array<Art_Coin_Bonding_Trade>;
  /** fetch data from the table: "art_coin" using primary key columns */
  art_coin_by_pk?: Maybe<Art_Coin>;
  /** fetch data from the table: "art_coin_holding" */
  art_coin_holding: Array<Art_Coin_Holding>;
  /** fetch aggregated fields from the table: "art_coin_holding" */
  art_coin_holding_aggregate: Art_Coin_Holding_Aggregate;
  /** fetch data from the table: "art_coin_holding" using primary key columns */
  art_coin_holding_by_pk?: Maybe<Art_Coin_Holding>;
  /** fetch data from the table in a streaming manner: "art_coin_holding" */
  art_coin_holding_stream: Array<Art_Coin_Holding>;
  /** fetch data from the table: "art_coin_market_stats" */
  art_coin_market_stats: Array<Art_Coin_Market_Stats>;
  /** fetch data from the table: "art_coin_market_stats" using primary key columns */
  art_coin_market_stats_by_pk?: Maybe<Art_Coin_Market_Stats>;
  /** fetch data from the table: "art_coin_market_stats_history" */
  art_coin_market_stats_history: Array<Art_Coin_Market_Stats_History>;
  /** fetch data from the table: "art_coin_market_stats_history" using primary key columns */
  art_coin_market_stats_history_by_pk?: Maybe<Art_Coin_Market_Stats_History>;
  /** fetch data from the table: "art_coin_market_stats_history_hourly" */
  art_coin_market_stats_history_hourly: Array<Art_Coin_Market_Stats_History_Hourly>;
  /** fetch data from the table in a streaming manner: "art_coin_market_stats_history_hourly" */
  art_coin_market_stats_history_hourly_stream: Array<Art_Coin_Market_Stats_History_Hourly>;
  /** fetch data from the table in a streaming manner: "art_coin_market_stats_history" */
  art_coin_market_stats_history_stream: Array<Art_Coin_Market_Stats_History>;
  /** fetch data from the table in a streaming manner: "art_coin_market_stats" */
  art_coin_market_stats_stream: Array<Art_Coin_Market_Stats>;
  /** fetch data from the table in a streaming manner: "art_coin" */
  art_coin_stream: Array<Art_Coin>;
  /** fetch data from the table: "art_coin_transfer" */
  art_coin_transfer: Array<Art_Coin_Transfer>;
  /** fetch data from the table: "art_coin_transfer" using primary key columns */
  art_coin_transfer_by_pk?: Maybe<Art_Coin_Transfer>;
  /** fetch data from the table in a streaming manner: "art_coin_transfer" */
  art_coin_transfer_stream: Array<Art_Coin_Transfer>;
  /** fetch data from the table: "article" */
  article: Array<Article>;
  /** fetch aggregated fields from the table: "article" */
  article_aggregate: Article_Aggregate;
  /** fetch data from the table: "article" using primary key columns */
  article_by_pk?: Maybe<Article>;
  /** fetch data from the table: "article_generative_token" */
  article_generative_token: Array<Article_Generative_Token>;
  /** fetch data from the table: "article_generative_token" using primary key columns */
  article_generative_token_by_pk?: Maybe<Article_Generative_Token>;
  /** fetch data from the table in a streaming manner: "article_generative_token" */
  article_generative_token_stream: Array<Article_Generative_Token>;
  /** fetch data from the table: "article_ledger" */
  article_ledger: Array<Article_Ledger>;
  /** fetch aggregated fields from the table: "article_ledger" */
  article_ledger_aggregate: Article_Ledger_Aggregate;
  /** fetch data from the table: "article_ledger" using primary key columns */
  article_ledger_by_pk?: Maybe<Article_Ledger>;
  /** fetch data from the table in a streaming manner: "article_ledger" */
  article_ledger_stream: Array<Article_Ledger>;
  /** fetch data from the table: "article_revision" */
  article_revision: Array<Article_Revision>;
  /** fetch data from the table: "article_revision" using primary key columns */
  article_revision_by_pk?: Maybe<Article_Revision>;
  /** fetch data from the table in a streaming manner: "article_revision" */
  article_revision_stream: Array<Article_Revision>;
  /** fetch data from the table in a streaming manner: "article" */
  article_stream: Array<Article>;
  /** fetch data from the table: "auction" */
  auction: Array<Auction>;
  /** fetch data from the table: "auction_bid" */
  auction_bid: Array<Auction_Bid>;
  /** fetch data from the table: "auction_bid" using primary key columns */
  auction_bid_by_pk?: Maybe<Auction_Bid>;
  /** fetch data from the table in a streaming manner: "auction_bid" */
  auction_bid_stream: Array<Auction_Bid>;
  /** fetch data from the table: "auction_bid_table" */
  auction_bid_table: Array<Auction_Bid_Table>;
  /** fetch data from the table: "auction_bid_table" using primary key columns */
  auction_bid_table_by_pk?: Maybe<Auction_Bid_Table>;
  /** fetch data from the table in a streaming manner: "auction_bid_table" */
  auction_bid_table_stream: Array<Auction_Bid_Table>;
  /** fetch data from the table: "auction" using primary key columns */
  auction_by_pk?: Maybe<Auction>;
  /** fetch data from the table in a streaming manner: "auction" */
  auction_stream: Array<Auction>;
  /** fetch data from the table: "squid_processor_base.hot_block" */
  base_indexer: Array<Base_Indexer>;
  /** fetch data from the table: "squid_processor_base.hot_block" using primary key columns */
  base_indexer_by_pk?: Maybe<Base_Indexer>;
  /** fetch data from the table in a streaming manner: "squid_processor_base.hot_block" */
  base_indexer_stream: Array<Base_Indexer>;
  /** fetch data from the table: "codex" */
  codex: Array<Codex>;
  /** fetch data from the table: "codex" using primary key columns */
  codex_by_pk?: Maybe<Codex>;
  /** fetch data from the table in a streaming manner: "codex" */
  codex_stream: Array<Codex>;
  /** fetch data from the table: "codex_update_request" */
  codex_update_request: Array<Codex_Update_Request>;
  /** fetch data from the table: "codex_update_request" using primary key columns */
  codex_update_request_by_pk?: Maybe<Codex_Update_Request>;
  /** fetch data from the table in a streaming manner: "codex_update_request" */
  codex_update_request_stream: Array<Codex_Update_Request>;
  /** fetch data from the table: "collaboration" */
  collaboration: Array<Collaboration>;
  /** fetch data from the table in a streaming manner: "collaboration" */
  collaboration_stream: Array<Collaboration>;
  /** fetch data from the table: "collection_offer" */
  collection_offer: Array<Collection_Offer>;
  /** fetch data from the table: "collection_offer" using primary key columns */
  collection_offer_by_pk?: Maybe<Collection_Offer>;
  /** fetch data from the table in a streaming manner: "collection_offer" */
  collection_offer_stream: Array<Collection_Offer>;
  /** fetch data from the table: "eth_frame_data" */
  eth_frame_data: Array<Eth_Frame_Data>;
  /** fetch data from the table: "eth_frame_data" using primary key columns */
  eth_frame_data_by_pk?: Maybe<Eth_Frame_Data>;
  /** fetch data from the table in a streaming manner: "eth_frame_data" */
  eth_frame_data_stream: Array<Eth_Frame_Data>;
  /** fetch data from the table: "squid_processor.hot_block" */
  eth_indexer: Array<Eth_Indexer>;
  /** fetch data from the table: "squid_processor.hot_block" using primary key columns */
  eth_indexer_by_pk?: Maybe<Eth_Indexer>;
  /** fetch data from the table in a streaming manner: "squid_processor.hot_block" */
  eth_indexer_stream: Array<Eth_Indexer>;
  /** fetch data from the table: "eth_minter_proceeds" */
  eth_minter_proceeds: Array<Eth_Minter_Proceeds>;
  /** fetch data from the table: "eth_minter_proceeds" using primary key columns */
  eth_minter_proceeds_by_pk?: Maybe<Eth_Minter_Proceeds>;
  /** fetch data from the table in a streaming manner: "eth_minter_proceeds" */
  eth_minter_proceeds_stream: Array<Eth_Minter_Proceeds>;
  /** fetch data from the table: "eth_primary_splits" */
  eth_primary_splits: Array<Eth_Primary_Splits>;
  /** fetch data from the table: "eth_primary_splits" using primary key columns */
  eth_primary_splits_by_pk?: Maybe<Eth_Primary_Splits>;
  /** fetch data from the table in a streaming manner: "eth_primary_splits" */
  eth_primary_splits_stream: Array<Eth_Primary_Splits>;
  /** fetch data from the table: "eth_secondary_splits" */
  eth_secondary_splits: Array<Eth_Secondary_Splits>;
  /** fetch data from the table: "eth_secondary_splits" using primary key columns */
  eth_secondary_splits_by_pk?: Maybe<Eth_Secondary_Splits>;
  /** fetch data from the table in a streaming manner: "eth_secondary_splits" */
  eth_secondary_splits_stream: Array<Eth_Secondary_Splits>;
  /** fetch data from the table: "eth_user_proceeds" */
  eth_user_proceeds: Array<Eth_User_Proceeds>;
  /** fetch data from the table: "eth_user_proceeds" using primary key columns */
  eth_user_proceeds_by_pk?: Maybe<Eth_User_Proceeds>;
  /** fetch data from the table in a streaming manner: "eth_user_proceeds" */
  eth_user_proceeds_stream: Array<Eth_User_Proceeds>;
  /** fetch data from the table: "foreign_wallet_account" */
  foreign_wallet_account: Array<Foreign_Wallet_Account>;
  /** fetch data from the table in a streaming manner: "foreign_wallet_account" */
  foreign_wallet_account_stream: Array<Foreign_Wallet_Account>;
  /** fetch data from the table: "generative_token" */
  generative_token: Array<Generative_Token>;
  /** fetch aggregated fields from the table: "generative_token" */
  generative_token_aggregate: Generative_Token_Aggregate;
  /** fetch data from the table: "generative_token" using primary key columns */
  generative_token_by_pk?: Maybe<Generative_Token>;
  /** fetch data from the table: "generative_token_collected" */
  generative_token_collected: Array<Generative_Token_Collected>;
  /** fetch aggregated fields from the table: "generative_token_collected" */
  generative_token_collected_aggregate: Generative_Token_Collected_Aggregate;
  /** fetch data from the table in a streaming manner: "generative_token_collected" */
  generative_token_collected_stream: Array<Generative_Token_Collected>;
  /** fetch data from the table in a streaming manner: "generative_token" */
  generative_token_stream: Array<Generative_Token>;
  /** fetch data from the table: "gentk_assign" */
  gentk_assign: Array<Gentk_Assign>;
  /** fetch data from the table: "gentk_assign" using primary key columns */
  gentk_assign_by_pk?: Maybe<Gentk_Assign>;
  /** fetch data from the table in a streaming manner: "gentk_assign" */
  gentk_assign_stream: Array<Gentk_Assign>;
  /** fetch data from the table: "indexed_operation" */
  indexed_operation: Array<Indexed_Operation>;
  /** fetch data from the table: "indexed_operation" using primary key columns */
  indexed_operation_by_pk?: Maybe<Indexed_Operation>;
  /** fetch data from the table in a streaming manner: "indexed_operation" */
  indexed_operation_stream: Array<Indexed_Operation>;
  /** fetch data from the table: "indexing_cursor" */
  indexing_cursor: Array<Indexing_Cursor>;
  /** fetch data from the table: "indexing_cursor" using primary key columns */
  indexing_cursor_by_pk?: Maybe<Indexing_Cursor>;
  /** fetch data from the table in a streaming manner: "indexing_cursor" */
  indexing_cursor_stream: Array<Indexing_Cursor>;
  /** fetch data from the table: "indexing_target" */
  indexing_target: Array<Indexing_Target>;
  /** fetch data from the table: "indexing_target" using primary key columns */
  indexing_target_by_pk?: Maybe<Indexing_Target>;
  /** fetch data from the table in a streaming manner: "indexing_target" */
  indexing_target_stream: Array<Indexing_Target>;
  /** fetch data from the table: "ipfs_cid" */
  ipfs_cid: Array<Ipfs_Cid>;
  /** fetch data from the table: "ipfs_cid" using primary key columns */
  ipfs_cid_by_pk?: Maybe<Ipfs_Cid>;
  /** fetch data from the table in a streaming manner: "ipfs_cid" */
  ipfs_cid_stream: Array<Ipfs_Cid>;
  /** fetch data from the table: "listing" */
  listing: Array<Listing>;
  /** fetch aggregated fields from the table: "listing" */
  listing_aggregate: Listing_Aggregate;
  /** fetch data from the table: "listing" using primary key columns */
  listing_by_pk?: Maybe<Listing>;
  /** fetch data from the table in a streaming manner: "listing" */
  listing_stream: Array<Listing>;
  /** fetch data from the table: "market_stats" */
  market_stats: Array<Market_Stats>;
  /** fetch aggregated fields from the table: "market_stats" */
  market_stats_aggregate: Market_Stats_Aggregate;
  /** fetch data from the table: "market_stats" using primary key columns */
  market_stats_by_pk?: Maybe<Market_Stats>;
  /** fetch data from the table: "market_stats_history" */
  market_stats_history: Array<Market_Stats_History>;
  /** fetch data from the table: "market_stats_history" using primary key columns */
  market_stats_history_by_pk?: Maybe<Market_Stats_History>;
  /** fetch data from the table: "market_stats_history_daily" */
  market_stats_history_daily: Array<Market_Stats_History_Daily>;
  /** fetch data from the table in a streaming manner: "market_stats_history_daily" */
  market_stats_history_daily_stream: Array<Market_Stats_History_Daily>;
  /** fetch data from the table: "market_stats_history_hourly" */
  market_stats_history_hourly: Array<Market_Stats_History_Hourly>;
  /** fetch data from the table in a streaming manner: "market_stats_history_hourly" */
  market_stats_history_hourly_stream: Array<Market_Stats_History_Hourly>;
  /** fetch data from the table in a streaming manner: "market_stats_history" */
  market_stats_history_stream: Array<Market_Stats_History>;
  /** fetch data from the table in a streaming manner: "market_stats" */
  market_stats_stream: Array<Market_Stats>;
  /** fetch data from the table: "media_image" */
  media_image: Array<Media_Image>;
  /** fetch data from the table: "media_image" using primary key columns */
  media_image_by_pk?: Maybe<Media_Image>;
  /** fetch data from the table in a streaming manner: "media_image" */
  media_image_stream: Array<Media_Image>;
  /** fetch data from the table: "metric" */
  metric: Array<Metric>;
  /** fetch data from the table: "metric" using primary key columns */
  metric_by_pk?: Maybe<Metric>;
  /** fetch data from the table in a streaming manner: "metric" */
  metric_stream: Array<Metric>;
  /** fetch data from the table: "mint_ticket" */
  mint_ticket: Array<Mint_Ticket>;
  /** fetch aggregated fields from the table: "mint_ticket" */
  mint_ticket_aggregate: Mint_Ticket_Aggregate;
  /** fetch data from the table: "mint_ticket" using primary key columns */
  mint_ticket_by_pk?: Maybe<Mint_Ticket>;
  /** An array relationship */
  mint_ticket_settings: Array<Mint_Ticket_Settings>;
  /** fetch data from the table: "mint_ticket_settings" using primary key columns */
  mint_ticket_settings_by_pk?: Maybe<Mint_Ticket_Settings>;
  /** fetch data from the table in a streaming manner: "mint_ticket_settings" */
  mint_ticket_settings_stream: Array<Mint_Ticket_Settings>;
  /** fetch data from the table in a streaming manner: "mint_ticket" */
  mint_ticket_stream: Array<Mint_Ticket>;
  /** fetch data from the table: "moderation_reason" */
  moderation_reason: Array<Moderation_Reason>;
  /** fetch data from the table: "moderation_reason" using primary key columns */
  moderation_reason_by_pk?: Maybe<Moderation_Reason>;
  /** fetch data from the table in a streaming manner: "moderation_reason" */
  moderation_reason_stream: Array<Moderation_Reason>;
  /** fetch data from the table: "objkt" */
  objkt: Array<Objkt>;
  /** fetch aggregated fields from the table: "objkt" */
  objkt_aggregate: Objkt_Aggregate;
  /** fetch data from the table: "objkt" using primary key columns */
  objkt_by_pk?: Maybe<Objkt>;
  /** fetch data from the table in a streaming manner: "objkt" */
  objkt_stream: Array<Objkt>;
  /** fetch data from the table: "offer" */
  offer: Array<Offer>;
  /** fetch aggregated fields from the table: "offer" */
  offer_aggregate: Offer_Aggregate;
  /** fetch data from the table: "offer" using primary key columns */
  offer_by_pk?: Maybe<Offer>;
  /** fetch data from the table in a streaming manner: "offer" */
  offer_stream: Array<Offer>;
  /** fetch data from the table: "pricing_dutch_auction" */
  pricing_dutch_auction: Array<Pricing_Dutch_Auction>;
  /** fetch data from the table: "pricing_dutch_auction" using primary key columns */
  pricing_dutch_auction_by_pk?: Maybe<Pricing_Dutch_Auction>;
  /** fetch data from the table in a streaming manner: "pricing_dutch_auction" */
  pricing_dutch_auction_stream: Array<Pricing_Dutch_Auction>;
  /** fetch data from the table: "pricing_fixed" */
  pricing_fixed: Array<Pricing_Fixed>;
  /** fetch data from the table: "pricing_fixed" using primary key columns */
  pricing_fixed_by_pk?: Maybe<Pricing_Fixed>;
  /** fetch data from the table in a streaming manner: "pricing_fixed" */
  pricing_fixed_stream: Array<Pricing_Fixed>;
  /** fetch data from the table: "redeemable" */
  redeemable: Array<Redeemable>;
  /** fetch data from the table: "redeemable" using primary key columns */
  redeemable_by_pk?: Maybe<Redeemable>;
  /** fetch data from the table in a streaming manner: "redeemable" */
  redeemable_stream: Array<Redeemable>;
  /** fetch data from the table: "redemption" */
  redemption: Array<Redemption>;
  /** fetch data from the table: "redemption" using primary key columns */
  redemption_by_pk?: Maybe<Redemption>;
  /** fetch data from the table in a streaming manner: "redemption" */
  redemption_stream: Array<Redemption>;
  /** fetch data from the table: "report" */
  report: Array<Report>;
  /** fetch data from the table: "report" using primary key columns */
  report_by_pk?: Maybe<Report>;
  /** fetch data from the table in a streaming manner: "report" */
  report_stream: Array<Report>;
  /** fetch data from the table: "reserve" */
  reserve: Array<Reserve>;
  /** fetch data from the table: "reserve" using primary key columns */
  reserve_by_pk?: Maybe<Reserve>;
  /** fetch data from the table in a streaming manner: "reserve" */
  reserve_stream: Array<Reserve>;
  /** fetch data from the table: "split" */
  split: Array<Split>;
  /** fetch data from the table: "split" using primary key columns */
  split_by_pk?: Maybe<Split>;
  /** fetch data from the table in a streaming manner: "split" */
  split_stream: Array<Split>;
  /** fetch data from the table: "transaction" */
  transaction: Array<Transaction>;
  /** fetch data from the table: "transaction" using primary key columns */
  transaction_by_pk?: Maybe<Transaction>;
  /** fetch data from the table in a streaming manner: "transaction" */
  transaction_stream: Array<Transaction>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "user_stats" */
  user_stats: Array<User_Stats>;
  /** fetch data from the table: "user_stats" using primary key columns */
  user_stats_by_pk?: Maybe<User_Stats>;
  /** fetch data from the table in a streaming manner: "user_stats" */
  user_stats_stream: Array<User_Stats>;
  /** fetch data from the table in a streaming manner: "user" */
  user_stream: Array<User>;
  /** fetch data from the table: "wallet_account" */
  wallet_account: Array<Wallet_Account>;
  /** fetch data from the table: "wallet_account" using primary key columns */
  wallet_account_by_pk?: Maybe<Wallet_Account>;
  /** fetch data from the table in a streaming manner: "wallet_account" */
  wallet_account_stream: Array<Wallet_Account>;
};


export type Onchain_SubscriptionActionArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


export type Onchain_SubscriptionAction_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


export type Onchain_SubscriptionAction_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Onchain_SubscriptionAction_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Action_Stream_Cursor_Input>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


export type Onchain_SubscriptionActive_ListingArgs = {
  distinct_on?: InputMaybe<Array<Active_Listing_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Active_Listing_Order_By>>;
  where?: InputMaybe<Active_Listing_Bool_Exp>;
};


export type Onchain_SubscriptionActive_Listing_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Active_Listing_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Active_Listing_Order_By>>;
  where?: InputMaybe<Active_Listing_Bool_Exp>;
};


export type Onchain_SubscriptionActive_Listing_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Active_Listing_Stream_Cursor_Input>>;
  where?: InputMaybe<Active_Listing_Bool_Exp>;
};


export type Onchain_SubscriptionAirdrop_ClaimArgs = {
  distinct_on?: InputMaybe<Array<Airdrop_Claim_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Airdrop_Claim_Order_By>>;
  where?: InputMaybe<Airdrop_Claim_Bool_Exp>;
};


export type Onchain_SubscriptionAirdrop_Claim_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionAirdrop_Claim_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Airdrop_Claim_Stream_Cursor_Input>>;
  where?: InputMaybe<Airdrop_Claim_Bool_Exp>;
};


export type Onchain_SubscriptionAny_OfferArgs = {
  distinct_on?: InputMaybe<Array<Any_Offer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Any_Offer_Order_By>>;
  where?: InputMaybe<Any_Offer_Bool_Exp>;
};


export type Onchain_SubscriptionAny_Offer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Any_Offer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Any_Offer_Order_By>>;
  where?: InputMaybe<Any_Offer_Bool_Exp>;
};


export type Onchain_SubscriptionAny_Offer_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Any_Offer_Stream_Cursor_Input>>;
  where?: InputMaybe<Any_Offer_Bool_Exp>;
};


export type Onchain_SubscriptionArt_CoinArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Order_By>>;
  where?: InputMaybe<Art_Coin_Bool_Exp>;
};


export type Onchain_SubscriptionArt_Coin_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Order_By>>;
  where?: InputMaybe<Art_Coin_Bool_Exp>;
};


export type Onchain_SubscriptionArt_Coin_Bonding_TradeArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Bonding_Trade_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Bonding_Trade_Order_By>>;
  where?: InputMaybe<Art_Coin_Bonding_Trade_Bool_Exp>;
};


export type Onchain_SubscriptionArt_Coin_Bonding_Trade_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Bonding_Trade_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Bonding_Trade_Order_By>>;
  where?: InputMaybe<Art_Coin_Bonding_Trade_Bool_Exp>;
};


export type Onchain_SubscriptionArt_Coin_Bonding_Trade_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_SubscriptionArt_Coin_Bonding_Trade_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Art_Coin_Bonding_Trade_Stream_Cursor_Input>>;
  where?: InputMaybe<Art_Coin_Bonding_Trade_Bool_Exp>;
};


export type Onchain_SubscriptionArt_Coin_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionArt_Coin_HoldingArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Holding_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Holding_Order_By>>;
  where?: InputMaybe<Art_Coin_Holding_Bool_Exp>;
};


export type Onchain_SubscriptionArt_Coin_Holding_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Holding_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Holding_Order_By>>;
  where?: InputMaybe<Art_Coin_Holding_Bool_Exp>;
};


export type Onchain_SubscriptionArt_Coin_Holding_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionArt_Coin_Holding_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Art_Coin_Holding_Stream_Cursor_Input>>;
  where?: InputMaybe<Art_Coin_Holding_Bool_Exp>;
};


export type Onchain_SubscriptionArt_Coin_Market_StatsArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Market_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Market_Stats_Order_By>>;
  where?: InputMaybe<Art_Coin_Market_Stats_Bool_Exp>;
};


export type Onchain_SubscriptionArt_Coin_Market_Stats_By_PkArgs = {
  art_coin_id: Scalars['String']['input'];
};


export type Onchain_SubscriptionArt_Coin_Market_Stats_HistoryArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Market_Stats_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Market_Stats_History_Order_By>>;
  where?: InputMaybe<Art_Coin_Market_Stats_History_Bool_Exp>;
};


export type Onchain_SubscriptionArt_Coin_Market_Stats_History_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_SubscriptionArt_Coin_Market_Stats_History_HourlyArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Market_Stats_History_Hourly_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Market_Stats_History_Hourly_Order_By>>;
  where?: InputMaybe<Art_Coin_Market_Stats_History_Hourly_Bool_Exp>;
};


export type Onchain_SubscriptionArt_Coin_Market_Stats_History_Hourly_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Art_Coin_Market_Stats_History_Hourly_Stream_Cursor_Input>>;
  where?: InputMaybe<Art_Coin_Market_Stats_History_Hourly_Bool_Exp>;
};


export type Onchain_SubscriptionArt_Coin_Market_Stats_History_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Art_Coin_Market_Stats_History_Stream_Cursor_Input>>;
  where?: InputMaybe<Art_Coin_Market_Stats_History_Bool_Exp>;
};


export type Onchain_SubscriptionArt_Coin_Market_Stats_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Art_Coin_Market_Stats_Stream_Cursor_Input>>;
  where?: InputMaybe<Art_Coin_Market_Stats_Bool_Exp>;
};


export type Onchain_SubscriptionArt_Coin_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Art_Coin_Stream_Cursor_Input>>;
  where?: InputMaybe<Art_Coin_Bool_Exp>;
};


export type Onchain_SubscriptionArt_Coin_TransferArgs = {
  distinct_on?: InputMaybe<Array<Art_Coin_Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Art_Coin_Transfer_Order_By>>;
  where?: InputMaybe<Art_Coin_Transfer_Bool_Exp>;
};


export type Onchain_SubscriptionArt_Coin_Transfer_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_SubscriptionArt_Coin_Transfer_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Art_Coin_Transfer_Stream_Cursor_Input>>;
  where?: InputMaybe<Art_Coin_Transfer_Bool_Exp>;
};


export type Onchain_SubscriptionArticleArgs = {
  distinct_on?: InputMaybe<Array<Article_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Order_By>>;
  where?: InputMaybe<Article_Bool_Exp>;
};


export type Onchain_SubscriptionArticle_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Article_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Order_By>>;
  where?: InputMaybe<Article_Bool_Exp>;
};


export type Onchain_SubscriptionArticle_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_SubscriptionArticle_Generative_TokenArgs = {
  distinct_on?: InputMaybe<Array<Article_Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Generative_Token_Order_By>>;
  where?: InputMaybe<Article_Generative_Token_Bool_Exp>;
};


export type Onchain_SubscriptionArticle_Generative_Token_By_PkArgs = {
  article_id: Scalars['Int']['input'];
  generative_token_id: Scalars['String']['input'];
};


export type Onchain_SubscriptionArticle_Generative_Token_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Article_Generative_Token_Stream_Cursor_Input>>;
  where?: InputMaybe<Article_Generative_Token_Bool_Exp>;
};


export type Onchain_SubscriptionArticle_LedgerArgs = {
  distinct_on?: InputMaybe<Array<Article_Ledger_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Ledger_Order_By>>;
  where?: InputMaybe<Article_Ledger_Bool_Exp>;
};


export type Onchain_SubscriptionArticle_Ledger_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Article_Ledger_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Ledger_Order_By>>;
  where?: InputMaybe<Article_Ledger_Bool_Exp>;
};


export type Onchain_SubscriptionArticle_Ledger_By_PkArgs = {
  article_id: Scalars['Int']['input'];
  owner_id: Scalars['String']['input'];
};


export type Onchain_SubscriptionArticle_Ledger_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Article_Ledger_Stream_Cursor_Input>>;
  where?: InputMaybe<Article_Ledger_Bool_Exp>;
};


export type Onchain_SubscriptionArticle_RevisionArgs = {
  distinct_on?: InputMaybe<Array<Article_Revision_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Revision_Order_By>>;
  where?: InputMaybe<Article_Revision_Bool_Exp>;
};


export type Onchain_SubscriptionArticle_Revision_By_PkArgs = {
  article_id: Scalars['Int']['input'];
  iteration: Scalars['smallint']['input'];
};


export type Onchain_SubscriptionArticle_Revision_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Article_Revision_Stream_Cursor_Input>>;
  where?: InputMaybe<Article_Revision_Bool_Exp>;
};


export type Onchain_SubscriptionArticle_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Article_Stream_Cursor_Input>>;
  where?: InputMaybe<Article_Bool_Exp>;
};


export type Onchain_SubscriptionAuctionArgs = {
  distinct_on?: InputMaybe<Array<Auction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Auction_Order_By>>;
  where?: InputMaybe<Auction_Bool_Exp>;
};


export type Onchain_SubscriptionAuction_BidArgs = {
  distinct_on?: InputMaybe<Array<Auction_Bid_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Auction_Bid_Order_By>>;
  where?: InputMaybe<Auction_Bid_Bool_Exp>;
};


export type Onchain_SubscriptionAuction_Bid_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Onchain_SubscriptionAuction_Bid_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Auction_Bid_Stream_Cursor_Input>>;
  where?: InputMaybe<Auction_Bid_Bool_Exp>;
};


export type Onchain_SubscriptionAuction_Bid_TableArgs = {
  distinct_on?: InputMaybe<Array<Auction_Bid_Table_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Auction_Bid_Table_Order_By>>;
  where?: InputMaybe<Auction_Bid_Table_Bool_Exp>;
};


export type Onchain_SubscriptionAuction_Bid_Table_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_SubscriptionAuction_Bid_Table_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Auction_Bid_Table_Stream_Cursor_Input>>;
  where?: InputMaybe<Auction_Bid_Table_Bool_Exp>;
};


export type Onchain_SubscriptionAuction_By_PkArgs = {
  id: Scalars['Int']['input'];
  version: Scalars['Int']['input'];
};


export type Onchain_SubscriptionAuction_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Auction_Stream_Cursor_Input>>;
  where?: InputMaybe<Auction_Bool_Exp>;
};


export type Onchain_SubscriptionBase_IndexerArgs = {
  distinct_on?: InputMaybe<Array<Base_Indexer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Base_Indexer_Order_By>>;
  where?: InputMaybe<Base_Indexer_Bool_Exp>;
};


export type Onchain_SubscriptionBase_Indexer_By_PkArgs = {
  height: Scalars['Int']['input'];
};


export type Onchain_SubscriptionBase_Indexer_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Base_Indexer_Stream_Cursor_Input>>;
  where?: InputMaybe<Base_Indexer_Bool_Exp>;
};


export type Onchain_SubscriptionCodexArgs = {
  distinct_on?: InputMaybe<Array<Codex_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Codex_Order_By>>;
  where?: InputMaybe<Codex_Bool_Exp>;
};


export type Onchain_SubscriptionCodex_By_PkArgs = {
  id: Scalars['String']['input'];
  token_version: Scalars['generative_token_version']['input'];
};


export type Onchain_SubscriptionCodex_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Codex_Stream_Cursor_Input>>;
  where?: InputMaybe<Codex_Bool_Exp>;
};


export type Onchain_SubscriptionCodex_Update_RequestArgs = {
  distinct_on?: InputMaybe<Array<Codex_Update_Request_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Codex_Update_Request_Order_By>>;
  where?: InputMaybe<Codex_Update_Request_Bool_Exp>;
};


export type Onchain_SubscriptionCodex_Update_Request_By_PkArgs = {
  codex_id: Scalars['String']['input'];
  token_id: Scalars['String']['input'];
  token_version: Scalars['generative_token_version']['input'];
};


export type Onchain_SubscriptionCodex_Update_Request_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Codex_Update_Request_Stream_Cursor_Input>>;
  where?: InputMaybe<Codex_Update_Request_Bool_Exp>;
};


export type Onchain_SubscriptionCollaborationArgs = {
  distinct_on?: InputMaybe<Array<Collaboration_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collaboration_Order_By>>;
  where?: InputMaybe<Collaboration_Bool_Exp>;
};


export type Onchain_SubscriptionCollaboration_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Collaboration_Stream_Cursor_Input>>;
  where?: InputMaybe<Collaboration_Bool_Exp>;
};


export type Onchain_SubscriptionCollection_OfferArgs = {
  distinct_on?: InputMaybe<Array<Collection_Offer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collection_Offer_Order_By>>;
  where?: InputMaybe<Collection_Offer_Bool_Exp>;
};


export type Onchain_SubscriptionCollection_Offer_By_PkArgs = {
  id: Scalars['String']['input'];
  version: Scalars['Int']['input'];
};


export type Onchain_SubscriptionCollection_Offer_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Collection_Offer_Stream_Cursor_Input>>;
  where?: InputMaybe<Collection_Offer_Bool_Exp>;
};


export type Onchain_SubscriptionEth_Frame_DataArgs = {
  distinct_on?: InputMaybe<Array<Eth_Frame_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_Frame_Data_Order_By>>;
  where?: InputMaybe<Eth_Frame_Data_Bool_Exp>;
};


export type Onchain_SubscriptionEth_Frame_Data_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionEth_Frame_Data_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Eth_Frame_Data_Stream_Cursor_Input>>;
  where?: InputMaybe<Eth_Frame_Data_Bool_Exp>;
};


export type Onchain_SubscriptionEth_IndexerArgs = {
  distinct_on?: InputMaybe<Array<Eth_Indexer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_Indexer_Order_By>>;
  where?: InputMaybe<Eth_Indexer_Bool_Exp>;
};


export type Onchain_SubscriptionEth_Indexer_By_PkArgs = {
  height: Scalars['Int']['input'];
};


export type Onchain_SubscriptionEth_Indexer_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Eth_Indexer_Stream_Cursor_Input>>;
  where?: InputMaybe<Eth_Indexer_Bool_Exp>;
};


export type Onchain_SubscriptionEth_Minter_ProceedsArgs = {
  distinct_on?: InputMaybe<Array<Eth_Minter_Proceeds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_Minter_Proceeds_Order_By>>;
  where?: InputMaybe<Eth_Minter_Proceeds_Bool_Exp>;
};


export type Onchain_SubscriptionEth_Minter_Proceeds_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionEth_Minter_Proceeds_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Eth_Minter_Proceeds_Stream_Cursor_Input>>;
  where?: InputMaybe<Eth_Minter_Proceeds_Bool_Exp>;
};


export type Onchain_SubscriptionEth_Primary_SplitsArgs = {
  distinct_on?: InputMaybe<Array<Eth_Primary_Splits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_Primary_Splits_Order_By>>;
  where?: InputMaybe<Eth_Primary_Splits_Bool_Exp>;
};


export type Onchain_SubscriptionEth_Primary_Splits_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionEth_Primary_Splits_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Eth_Primary_Splits_Stream_Cursor_Input>>;
  where?: InputMaybe<Eth_Primary_Splits_Bool_Exp>;
};


export type Onchain_SubscriptionEth_Secondary_SplitsArgs = {
  distinct_on?: InputMaybe<Array<Eth_Secondary_Splits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_Secondary_Splits_Order_By>>;
  where?: InputMaybe<Eth_Secondary_Splits_Bool_Exp>;
};


export type Onchain_SubscriptionEth_Secondary_Splits_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionEth_Secondary_Splits_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Eth_Secondary_Splits_Stream_Cursor_Input>>;
  where?: InputMaybe<Eth_Secondary_Splits_Bool_Exp>;
};


export type Onchain_SubscriptionEth_User_ProceedsArgs = {
  distinct_on?: InputMaybe<Array<Eth_User_Proceeds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_User_Proceeds_Order_By>>;
  where?: InputMaybe<Eth_User_Proceeds_Bool_Exp>;
};


export type Onchain_SubscriptionEth_User_Proceeds_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionEth_User_Proceeds_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Eth_User_Proceeds_Stream_Cursor_Input>>;
  where?: InputMaybe<Eth_User_Proceeds_Bool_Exp>;
};


export type Onchain_SubscriptionForeign_Wallet_AccountArgs = {
  distinct_on?: InputMaybe<Array<Foreign_Wallet_Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Foreign_Wallet_Account_Order_By>>;
  where?: InputMaybe<Foreign_Wallet_Account_Bool_Exp>;
};


export type Onchain_SubscriptionForeign_Wallet_Account_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Foreign_Wallet_Account_Stream_Cursor_Input>>;
  where?: InputMaybe<Foreign_Wallet_Account_Bool_Exp>;
};


export type Onchain_SubscriptionGenerative_TokenArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Order_By>>;
  where?: InputMaybe<Generative_Token_Bool_Exp>;
};


export type Onchain_SubscriptionGenerative_Token_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Order_By>>;
  where?: InputMaybe<Generative_Token_Bool_Exp>;
};


export type Onchain_SubscriptionGenerative_Token_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionGenerative_Token_CollectedArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Collected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Collected_Order_By>>;
  where?: InputMaybe<Generative_Token_Collected_Bool_Exp>;
};


export type Onchain_SubscriptionGenerative_Token_Collected_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Collected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Collected_Order_By>>;
  where?: InputMaybe<Generative_Token_Collected_Bool_Exp>;
};


export type Onchain_SubscriptionGenerative_Token_Collected_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Generative_Token_Collected_Stream_Cursor_Input>>;
  where?: InputMaybe<Generative_Token_Collected_Bool_Exp>;
};


export type Onchain_SubscriptionGenerative_Token_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Generative_Token_Stream_Cursor_Input>>;
  where?: InputMaybe<Generative_Token_Bool_Exp>;
};


export type Onchain_SubscriptionGentk_AssignArgs = {
  distinct_on?: InputMaybe<Array<Gentk_Assign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Gentk_Assign_Order_By>>;
  where?: InputMaybe<Gentk_Assign_Bool_Exp>;
};


export type Onchain_SubscriptionGentk_Assign_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionGentk_Assign_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Gentk_Assign_Stream_Cursor_Input>>;
  where?: InputMaybe<Gentk_Assign_Bool_Exp>;
};


export type Onchain_SubscriptionIndexed_OperationArgs = {
  distinct_on?: InputMaybe<Array<Indexed_Operation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Indexed_Operation_Order_By>>;
  where?: InputMaybe<Indexed_Operation_Bool_Exp>;
};


export type Onchain_SubscriptionIndexed_Operation_By_PkArgs = {
  hashed: Scalars['String']['input'];
};


export type Onchain_SubscriptionIndexed_Operation_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Indexed_Operation_Stream_Cursor_Input>>;
  where?: InputMaybe<Indexed_Operation_Bool_Exp>;
};


export type Onchain_SubscriptionIndexing_CursorArgs = {
  distinct_on?: InputMaybe<Array<Indexing_Cursor_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Indexing_Cursor_Order_By>>;
  where?: InputMaybe<Indexing_Cursor_Bool_Exp>;
};


export type Onchain_SubscriptionIndexing_Cursor_By_PkArgs = {
  group_id: Scalars['String']['input'];
};


export type Onchain_SubscriptionIndexing_Cursor_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Indexing_Cursor_Stream_Cursor_Input>>;
  where?: InputMaybe<Indexing_Cursor_Bool_Exp>;
};


export type Onchain_SubscriptionIndexing_TargetArgs = {
  distinct_on?: InputMaybe<Array<Indexing_Target_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Indexing_Target_Order_By>>;
  where?: InputMaybe<Indexing_Target_Bool_Exp>;
};


export type Onchain_SubscriptionIndexing_Target_By_PkArgs = {
  address: Scalars['String']['input'];
};


export type Onchain_SubscriptionIndexing_Target_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Indexing_Target_Stream_Cursor_Input>>;
  where?: InputMaybe<Indexing_Target_Bool_Exp>;
};


export type Onchain_SubscriptionIpfs_CidArgs = {
  distinct_on?: InputMaybe<Array<Ipfs_Cid_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ipfs_Cid_Order_By>>;
  where?: InputMaybe<Ipfs_Cid_Bool_Exp>;
};


export type Onchain_SubscriptionIpfs_Cid_By_PkArgs = {
  cid: Scalars['String']['input'];
};


export type Onchain_SubscriptionIpfs_Cid_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Ipfs_Cid_Stream_Cursor_Input>>;
  where?: InputMaybe<Ipfs_Cid_Bool_Exp>;
};


export type Onchain_SubscriptionListingArgs = {
  distinct_on?: InputMaybe<Array<Listing_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Listing_Order_By>>;
  where?: InputMaybe<Listing_Bool_Exp>;
};


export type Onchain_SubscriptionListing_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Listing_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Listing_Order_By>>;
  where?: InputMaybe<Listing_Bool_Exp>;
};


export type Onchain_SubscriptionListing_By_PkArgs = {
  id: Scalars['String']['input'];
  version: Scalars['Int']['input'];
};


export type Onchain_SubscriptionListing_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Listing_Stream_Cursor_Input>>;
  where?: InputMaybe<Listing_Bool_Exp>;
};


export type Onchain_SubscriptionMarket_StatsArgs = {
  distinct_on?: InputMaybe<Array<Market_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Stats_Order_By>>;
  where?: InputMaybe<Market_Stats_Bool_Exp>;
};


export type Onchain_SubscriptionMarket_Stats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Market_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Stats_Order_By>>;
  where?: InputMaybe<Market_Stats_Bool_Exp>;
};


export type Onchain_SubscriptionMarket_Stats_By_PkArgs = {
  token_id: Scalars['String']['input'];
};


export type Onchain_SubscriptionMarket_Stats_HistoryArgs = {
  distinct_on?: InputMaybe<Array<Market_Stats_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Stats_History_Order_By>>;
  where?: InputMaybe<Market_Stats_History_Bool_Exp>;
};


export type Onchain_SubscriptionMarket_Stats_History_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_SubscriptionMarket_Stats_History_DailyArgs = {
  distinct_on?: InputMaybe<Array<Market_Stats_History_Daily_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Stats_History_Daily_Order_By>>;
  where?: InputMaybe<Market_Stats_History_Daily_Bool_Exp>;
};


export type Onchain_SubscriptionMarket_Stats_History_Daily_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Market_Stats_History_Daily_Stream_Cursor_Input>>;
  where?: InputMaybe<Market_Stats_History_Daily_Bool_Exp>;
};


export type Onchain_SubscriptionMarket_Stats_History_HourlyArgs = {
  distinct_on?: InputMaybe<Array<Market_Stats_History_Hourly_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Stats_History_Hourly_Order_By>>;
  where?: InputMaybe<Market_Stats_History_Hourly_Bool_Exp>;
};


export type Onchain_SubscriptionMarket_Stats_History_Hourly_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Market_Stats_History_Hourly_Stream_Cursor_Input>>;
  where?: InputMaybe<Market_Stats_History_Hourly_Bool_Exp>;
};


export type Onchain_SubscriptionMarket_Stats_History_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Market_Stats_History_Stream_Cursor_Input>>;
  where?: InputMaybe<Market_Stats_History_Bool_Exp>;
};


export type Onchain_SubscriptionMarket_Stats_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Market_Stats_Stream_Cursor_Input>>;
  where?: InputMaybe<Market_Stats_Bool_Exp>;
};


export type Onchain_SubscriptionMedia_ImageArgs = {
  distinct_on?: InputMaybe<Array<Media_Image_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Media_Image_Order_By>>;
  where?: InputMaybe<Media_Image_Bool_Exp>;
};


export type Onchain_SubscriptionMedia_Image_By_PkArgs = {
  id: Scalars['bpchar']['input'];
};


export type Onchain_SubscriptionMedia_Image_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Media_Image_Stream_Cursor_Input>>;
  where?: InputMaybe<Media_Image_Bool_Exp>;
};


export type Onchain_SubscriptionMetricArgs = {
  distinct_on?: InputMaybe<Array<Metric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Metric_Order_By>>;
  where?: InputMaybe<Metric_Bool_Exp>;
};


export type Onchain_SubscriptionMetric_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionMetric_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Metric_Stream_Cursor_Input>>;
  where?: InputMaybe<Metric_Bool_Exp>;
};


export type Onchain_SubscriptionMint_TicketArgs = {
  distinct_on?: InputMaybe<Array<Mint_Ticket_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mint_Ticket_Order_By>>;
  where?: InputMaybe<Mint_Ticket_Bool_Exp>;
};


export type Onchain_SubscriptionMint_Ticket_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mint_Ticket_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mint_Ticket_Order_By>>;
  where?: InputMaybe<Mint_Ticket_Bool_Exp>;
};


export type Onchain_SubscriptionMint_Ticket_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionMint_Ticket_SettingsArgs = {
  distinct_on?: InputMaybe<Array<Mint_Ticket_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mint_Ticket_Settings_Order_By>>;
  where?: InputMaybe<Mint_Ticket_Settings_Bool_Exp>;
};


export type Onchain_SubscriptionMint_Ticket_Settings_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionMint_Ticket_Settings_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Mint_Ticket_Settings_Stream_Cursor_Input>>;
  where?: InputMaybe<Mint_Ticket_Settings_Bool_Exp>;
};


export type Onchain_SubscriptionMint_Ticket_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Mint_Ticket_Stream_Cursor_Input>>;
  where?: InputMaybe<Mint_Ticket_Bool_Exp>;
};


export type Onchain_SubscriptionModeration_ReasonArgs = {
  distinct_on?: InputMaybe<Array<Moderation_Reason_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Moderation_Reason_Order_By>>;
  where?: InputMaybe<Moderation_Reason_Bool_Exp>;
};


export type Onchain_SubscriptionModeration_Reason_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionModeration_Reason_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Moderation_Reason_Stream_Cursor_Input>>;
  where?: InputMaybe<Moderation_Reason_Bool_Exp>;
};


export type Onchain_SubscriptionObjktArgs = {
  distinct_on?: InputMaybe<Array<Objkt_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Objkt_Order_By>>;
  where?: InputMaybe<Objkt_Bool_Exp>;
};


export type Onchain_SubscriptionObjkt_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Objkt_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Objkt_Order_By>>;
  where?: InputMaybe<Objkt_Bool_Exp>;
};


export type Onchain_SubscriptionObjkt_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionObjkt_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Objkt_Stream_Cursor_Input>>;
  where?: InputMaybe<Objkt_Bool_Exp>;
};


export type Onchain_SubscriptionOfferArgs = {
  distinct_on?: InputMaybe<Array<Offer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Offer_Order_By>>;
  where?: InputMaybe<Offer_Bool_Exp>;
};


export type Onchain_SubscriptionOffer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Offer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Offer_Order_By>>;
  where?: InputMaybe<Offer_Bool_Exp>;
};


export type Onchain_SubscriptionOffer_By_PkArgs = {
  id: Scalars['String']['input'];
  version: Scalars['Int']['input'];
};


export type Onchain_SubscriptionOffer_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Offer_Stream_Cursor_Input>>;
  where?: InputMaybe<Offer_Bool_Exp>;
};


export type Onchain_SubscriptionPricing_Dutch_AuctionArgs = {
  distinct_on?: InputMaybe<Array<Pricing_Dutch_Auction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Pricing_Dutch_Auction_Order_By>>;
  where?: InputMaybe<Pricing_Dutch_Auction_Bool_Exp>;
};


export type Onchain_SubscriptionPricing_Dutch_Auction_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionPricing_Dutch_Auction_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Pricing_Dutch_Auction_Stream_Cursor_Input>>;
  where?: InputMaybe<Pricing_Dutch_Auction_Bool_Exp>;
};


export type Onchain_SubscriptionPricing_FixedArgs = {
  distinct_on?: InputMaybe<Array<Pricing_Fixed_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Pricing_Fixed_Order_By>>;
  where?: InputMaybe<Pricing_Fixed_Bool_Exp>;
};


export type Onchain_SubscriptionPricing_Fixed_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionPricing_Fixed_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Pricing_Fixed_Stream_Cursor_Input>>;
  where?: InputMaybe<Pricing_Fixed_Bool_Exp>;
};


export type Onchain_SubscriptionRedeemableArgs = {
  distinct_on?: InputMaybe<Array<Redeemable_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redeemable_Order_By>>;
  where?: InputMaybe<Redeemable_Bool_Exp>;
};


export type Onchain_SubscriptionRedeemable_By_PkArgs = {
  address: Scalars['String']['input'];
};


export type Onchain_SubscriptionRedeemable_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Redeemable_Stream_Cursor_Input>>;
  where?: InputMaybe<Redeemable_Bool_Exp>;
};


export type Onchain_SubscriptionRedemptionArgs = {
  distinct_on?: InputMaybe<Array<Redemption_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redemption_Order_By>>;
  where?: InputMaybe<Redemption_Bool_Exp>;
};


export type Onchain_SubscriptionRedemption_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_SubscriptionRedemption_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Redemption_Stream_Cursor_Input>>;
  where?: InputMaybe<Redemption_Bool_Exp>;
};


export type Onchain_SubscriptionReportArgs = {
  distinct_on?: InputMaybe<Array<Report_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Report_Order_By>>;
  where?: InputMaybe<Report_Bool_Exp>;
};


export type Onchain_SubscriptionReport_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Onchain_SubscriptionReport_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Report_Stream_Cursor_Input>>;
  where?: InputMaybe<Report_Bool_Exp>;
};


export type Onchain_SubscriptionReserveArgs = {
  distinct_on?: InputMaybe<Array<Reserve_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reserve_Order_By>>;
  where?: InputMaybe<Reserve_Bool_Exp>;
};


export type Onchain_SubscriptionReserve_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_SubscriptionReserve_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Reserve_Stream_Cursor_Input>>;
  where?: InputMaybe<Reserve_Bool_Exp>;
};


export type Onchain_SubscriptionSplitArgs = {
  distinct_on?: InputMaybe<Array<Split_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Split_Order_By>>;
  where?: InputMaybe<Split_Bool_Exp>;
};


export type Onchain_SubscriptionSplit_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_SubscriptionSplit_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Split_Stream_Cursor_Input>>;
  where?: InputMaybe<Split_Bool_Exp>;
};


export type Onchain_SubscriptionTransactionArgs = {
  distinct_on?: InputMaybe<Array<Transaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transaction_Order_By>>;
  where?: InputMaybe<Transaction_Bool_Exp>;
};


export type Onchain_SubscriptionTransaction_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Onchain_SubscriptionTransaction_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Transaction_Stream_Cursor_Input>>;
  where?: InputMaybe<Transaction_Bool_Exp>;
};


export type Onchain_SubscriptionUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Onchain_SubscriptionUser_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Onchain_SubscriptionUser_StatsArgs = {
  distinct_on?: InputMaybe<Array<User_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Stats_Order_By>>;
  where?: InputMaybe<User_Stats_Bool_Exp>;
};


export type Onchain_SubscriptionUser_Stats_By_PkArgs = {
  user_id: Scalars['String']['input'];
};


export type Onchain_SubscriptionUser_Stats_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Stats_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Stats_Bool_Exp>;
};


export type Onchain_SubscriptionUser_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Onchain_SubscriptionWallet_AccountArgs = {
  distinct_on?: InputMaybe<Array<Wallet_Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallet_Account_Order_By>>;
  where?: InputMaybe<Wallet_Account_Bool_Exp>;
};


export type Onchain_SubscriptionWallet_Account_By_PkArgs = {
  address: Scalars['String']['input'];
};


export type Onchain_SubscriptionWallet_Account_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Wallet_Account_Stream_Cursor_Input>>;
  where?: InputMaybe<Wallet_Account_Bool_Exp>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "pricing_dutch_auction" */
export type Pricing_Dutch_Auction = {
  __typename?: 'pricing_dutch_auction';
  decrement_duration: Scalars['bigint']['output'];
  final_price?: Maybe<Scalars['numeric']['output']>;
  /** An object relationship */
  generative_token?: Maybe<Generative_Token>;
  id: Scalars['String']['output'];
  levels: Array<Scalars['numeric']['output']>;
  opens_at?: Maybe<Scalars['timestamptz']['output']>;
  refundable: Scalars['Boolean']['output'];
  resting_price: Scalars['String']['output'];
  token_id?: Maybe<Scalars['String']['output']>;
};

/** order by aggregate values of table "pricing_dutch_auction" */
export type Pricing_Dutch_Auction_Aggregate_Order_By = {
  avg?: InputMaybe<Pricing_Dutch_Auction_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Pricing_Dutch_Auction_Max_Order_By>;
  min?: InputMaybe<Pricing_Dutch_Auction_Min_Order_By>;
  stddev?: InputMaybe<Pricing_Dutch_Auction_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Pricing_Dutch_Auction_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Pricing_Dutch_Auction_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Pricing_Dutch_Auction_Sum_Order_By>;
  var_pop?: InputMaybe<Pricing_Dutch_Auction_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Pricing_Dutch_Auction_Var_Samp_Order_By>;
  variance?: InputMaybe<Pricing_Dutch_Auction_Variance_Order_By>;
};

/** order by avg() on columns of table "pricing_dutch_auction" */
export type Pricing_Dutch_Auction_Avg_Order_By = {
  decrement_duration?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "pricing_dutch_auction". All fields are combined with a logical 'AND'. */
export type Pricing_Dutch_Auction_Bool_Exp = {
  _and?: InputMaybe<Array<Pricing_Dutch_Auction_Bool_Exp>>;
  _not?: InputMaybe<Pricing_Dutch_Auction_Bool_Exp>;
  _or?: InputMaybe<Array<Pricing_Dutch_Auction_Bool_Exp>>;
  decrement_duration?: InputMaybe<Bigint_Comparison_Exp>;
  final_price?: InputMaybe<Numeric_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  levels?: InputMaybe<Numeric_Array_Comparison_Exp>;
  opens_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  refundable?: InputMaybe<Boolean_Comparison_Exp>;
  resting_price?: InputMaybe<String_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "pricing_dutch_auction" */
export type Pricing_Dutch_Auction_Max_Order_By = {
  decrement_duration?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  levels?: InputMaybe<Order_By>;
  opens_at?: InputMaybe<Order_By>;
  resting_price?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "pricing_dutch_auction" */
export type Pricing_Dutch_Auction_Min_Order_By = {
  decrement_duration?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  levels?: InputMaybe<Order_By>;
  opens_at?: InputMaybe<Order_By>;
  resting_price?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "pricing_dutch_auction". */
export type Pricing_Dutch_Auction_Order_By = {
  decrement_duration?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  id?: InputMaybe<Order_By>;
  levels?: InputMaybe<Order_By>;
  opens_at?: InputMaybe<Order_By>;
  refundable?: InputMaybe<Order_By>;
  resting_price?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** select columns of table "pricing_dutch_auction" */
export enum Pricing_Dutch_Auction_Select_Column {
  /** column name */
  DecrementDuration = 'decrement_duration',
  /** column name */
  FinalPrice = 'final_price',
  /** column name */
  Id = 'id',
  /** column name */
  Levels = 'levels',
  /** column name */
  OpensAt = 'opens_at',
  /** column name */
  Refundable = 'refundable',
  /** column name */
  RestingPrice = 'resting_price',
  /** column name */
  TokenId = 'token_id'
}

/** order by stddev() on columns of table "pricing_dutch_auction" */
export type Pricing_Dutch_Auction_Stddev_Order_By = {
  decrement_duration?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "pricing_dutch_auction" */
export type Pricing_Dutch_Auction_Stddev_Pop_Order_By = {
  decrement_duration?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "pricing_dutch_auction" */
export type Pricing_Dutch_Auction_Stddev_Samp_Order_By = {
  decrement_duration?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "pricing_dutch_auction" */
export type Pricing_Dutch_Auction_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Pricing_Dutch_Auction_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Pricing_Dutch_Auction_Stream_Cursor_Value_Input = {
  decrement_duration?: InputMaybe<Scalars['bigint']['input']>;
  final_price?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  levels?: InputMaybe<Array<Scalars['numeric']['input']>>;
  opens_at?: InputMaybe<Scalars['timestamptz']['input']>;
  refundable?: InputMaybe<Scalars['Boolean']['input']>;
  resting_price?: InputMaybe<Scalars['String']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "pricing_dutch_auction" */
export type Pricing_Dutch_Auction_Sum_Order_By = {
  decrement_duration?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "pricing_dutch_auction" */
export type Pricing_Dutch_Auction_Var_Pop_Order_By = {
  decrement_duration?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "pricing_dutch_auction" */
export type Pricing_Dutch_Auction_Var_Samp_Order_By = {
  decrement_duration?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "pricing_dutch_auction" */
export type Pricing_Dutch_Auction_Variance_Order_By = {
  decrement_duration?: InputMaybe<Order_By>;
  final_price?: InputMaybe<Order_By>;
};

/** columns and relationships of "pricing_fixed" */
export type Pricing_Fixed = {
  __typename?: 'pricing_fixed';
  fee_currency?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  generative_token?: Maybe<Generative_Token>;
  id: Scalars['String']['output'];
  mint_fee?: Maybe<Scalars['numeric']['output']>;
  opens_at?: Maybe<Scalars['timestamptz']['output']>;
  price: Scalars['numeric']['output'];
  token_id?: Maybe<Scalars['String']['output']>;
};

/** order by aggregate values of table "pricing_fixed" */
export type Pricing_Fixed_Aggregate_Order_By = {
  avg?: InputMaybe<Pricing_Fixed_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Pricing_Fixed_Max_Order_By>;
  min?: InputMaybe<Pricing_Fixed_Min_Order_By>;
  stddev?: InputMaybe<Pricing_Fixed_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Pricing_Fixed_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Pricing_Fixed_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Pricing_Fixed_Sum_Order_By>;
  var_pop?: InputMaybe<Pricing_Fixed_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Pricing_Fixed_Var_Samp_Order_By>;
  variance?: InputMaybe<Pricing_Fixed_Variance_Order_By>;
};

/** order by avg() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Avg_Order_By = {
  mint_fee?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "pricing_fixed". All fields are combined with a logical 'AND'. */
export type Pricing_Fixed_Bool_Exp = {
  _and?: InputMaybe<Array<Pricing_Fixed_Bool_Exp>>;
  _not?: InputMaybe<Pricing_Fixed_Bool_Exp>;
  _or?: InputMaybe<Array<Pricing_Fixed_Bool_Exp>>;
  fee_currency?: InputMaybe<String_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  mint_fee?: InputMaybe<Numeric_Comparison_Exp>;
  opens_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Max_Order_By = {
  fee_currency?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mint_fee?: InputMaybe<Order_By>;
  opens_at?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Min_Order_By = {
  fee_currency?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mint_fee?: InputMaybe<Order_By>;
  opens_at?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "pricing_fixed". */
export type Pricing_Fixed_Order_By = {
  fee_currency?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  id?: InputMaybe<Order_By>;
  mint_fee?: InputMaybe<Order_By>;
  opens_at?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** select columns of table "pricing_fixed" */
export enum Pricing_Fixed_Select_Column {
  /** column name */
  FeeCurrency = 'fee_currency',
  /** column name */
  Id = 'id',
  /** column name */
  MintFee = 'mint_fee',
  /** column name */
  OpensAt = 'opens_at',
  /** column name */
  Price = 'price',
  /** column name */
  TokenId = 'token_id'
}

/** order by stddev() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Stddev_Order_By = {
  mint_fee?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Stddev_Pop_Order_By = {
  mint_fee?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Stddev_Samp_Order_By = {
  mint_fee?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "pricing_fixed" */
export type Pricing_Fixed_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Pricing_Fixed_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Pricing_Fixed_Stream_Cursor_Value_Input = {
  fee_currency?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  mint_fee?: InputMaybe<Scalars['numeric']['input']>;
  opens_at?: InputMaybe<Scalars['timestamptz']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Sum_Order_By = {
  mint_fee?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Var_Pop_Order_By = {
  mint_fee?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Var_Samp_Order_By = {
  mint_fee?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Variance_Order_By = {
  mint_fee?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** Simulates an EVM transaction and returns the simulation results. */
  estimate_evm_transaction?: Maybe<EstimateEvmTransactionOutput>;
  mailTemplates: Array<MailTemplate>;
  managedWalletState: EWalletOperatorState;
  mediaFullUrl: Scalars['String']['output'];
  offchain?: Maybe<Offchain_Query>;
  onchain?: Maybe<Onchain_Query>;
  projectReserves: Array<ProjectReserves>;
  search: SearchOutput;
  searchAccounts: SearchAccountsOutput;
  walletRpcs?: Maybe<Array<WalletRpc>>;
};


export type Query_RootEstimate_Evm_TransactionArgs = {
  input: EstimateEvmTransactionInput;
};


export type Query_RootManagedWalletStateArgs = {
  publicKey: Scalars['String']['input'];
};


export type Query_RootMediaFullUrlArgs = {
  s3key: Scalars['String']['input'];
};


export type Query_RootProjectReservesArgs = {
  projectId: Scalars['String']['input'];
};


export type Query_RootSearchArgs = {
  input: SearchInput;
};


export type Query_RootSearchAccountsArgs = {
  input: SearchInput;
};

export type Random_Objkts_Generative_Token_Args = {
  excluded_ids?: InputMaybe<Scalars['_text']['input']>;
  limit_param?: InputMaybe<Scalars['Int']['input']>;
};

/** columns and relationships of "redeemable" */
export type Redeemable = {
  __typename?: 'redeemable';
  /** An array relationship */
  actions: Array<Action>;
  /** An aggregate relationship */
  actions_aggregate: Action_Aggregate;
  address: Scalars['String']['output'];
  base_amount: Scalars['numeric']['output'];
  created_at: Scalars['timestamptz']['output'];
  details?: Maybe<Consumable>;
  fa2: Scalars['String']['output'];
  /** An object relationship */
  generative_token: Generative_Token;
  max_consumptions_per_token: Scalars['Int']['output'];
  /** An array relationship */
  redemptions: Array<Redemption>;
  /** An array relationship */
  splits: Array<Split>;
  token_id: Scalars['String']['output'];
};


/** columns and relationships of "redeemable" */
export type RedeemableActionsArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


/** columns and relationships of "redeemable" */
export type RedeemableActions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


/** columns and relationships of "redeemable" */
export type RedeemableRedemptionsArgs = {
  distinct_on?: InputMaybe<Array<Redemption_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redemption_Order_By>>;
  where?: InputMaybe<Redemption_Bool_Exp>;
};


/** columns and relationships of "redeemable" */
export type RedeemableSplitsArgs = {
  distinct_on?: InputMaybe<Array<Split_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Split_Order_By>>;
  where?: InputMaybe<Split_Bool_Exp>;
};

/** order by aggregate values of table "redeemable" */
export type Redeemable_Aggregate_Order_By = {
  avg?: InputMaybe<Redeemable_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Redeemable_Max_Order_By>;
  min?: InputMaybe<Redeemable_Min_Order_By>;
  stddev?: InputMaybe<Redeemable_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Redeemable_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Redeemable_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Redeemable_Sum_Order_By>;
  var_pop?: InputMaybe<Redeemable_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Redeemable_Var_Samp_Order_By>;
  variance?: InputMaybe<Redeemable_Variance_Order_By>;
};

/** order by avg() on columns of table "redeemable" */
export type Redeemable_Avg_Order_By = {
  base_amount?: InputMaybe<Order_By>;
  max_consumptions_per_token?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "redeemable". All fields are combined with a logical 'AND'. */
export type Redeemable_Bool_Exp = {
  _and?: InputMaybe<Array<Redeemable_Bool_Exp>>;
  _not?: InputMaybe<Redeemable_Bool_Exp>;
  _or?: InputMaybe<Array<Redeemable_Bool_Exp>>;
  actions?: InputMaybe<Action_Bool_Exp>;
  actions_aggregate?: InputMaybe<Action_Aggregate_Bool_Exp>;
  address?: InputMaybe<String_Comparison_Exp>;
  base_amount?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  fa2?: InputMaybe<String_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  max_consumptions_per_token?: InputMaybe<Int_Comparison_Exp>;
  redemptions?: InputMaybe<Redemption_Bool_Exp>;
  splits?: InputMaybe<Split_Bool_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "redeemable" */
export type Redeemable_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  base_amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  fa2?: InputMaybe<Order_By>;
  max_consumptions_per_token?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "redeemable" */
export type Redeemable_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  base_amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  fa2?: InputMaybe<Order_By>;
  max_consumptions_per_token?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "redeemable". */
export type Redeemable_Order_By = {
  actions_aggregate?: InputMaybe<Action_Aggregate_Order_By>;
  address?: InputMaybe<Order_By>;
  base_amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  fa2?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  max_consumptions_per_token?: InputMaybe<Order_By>;
  redemptions_aggregate?: InputMaybe<Redemption_Aggregate_Order_By>;
  splits_aggregate?: InputMaybe<Split_Aggregate_Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** select columns of table "redeemable" */
export enum Redeemable_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  BaseAmount = 'base_amount',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Fa2 = 'fa2',
  /** column name */
  MaxConsumptionsPerToken = 'max_consumptions_per_token',
  /** column name */
  TokenId = 'token_id'
}

/** order by stddev() on columns of table "redeemable" */
export type Redeemable_Stddev_Order_By = {
  base_amount?: InputMaybe<Order_By>;
  max_consumptions_per_token?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "redeemable" */
export type Redeemable_Stddev_Pop_Order_By = {
  base_amount?: InputMaybe<Order_By>;
  max_consumptions_per_token?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "redeemable" */
export type Redeemable_Stddev_Samp_Order_By = {
  base_amount?: InputMaybe<Order_By>;
  max_consumptions_per_token?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "redeemable" */
export type Redeemable_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Redeemable_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Redeemable_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  base_amount?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  fa2?: InputMaybe<Scalars['String']['input']>;
  max_consumptions_per_token?: InputMaybe<Scalars['Int']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "redeemable" */
export type Redeemable_Sum_Order_By = {
  base_amount?: InputMaybe<Order_By>;
  max_consumptions_per_token?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "redeemable" */
export type Redeemable_Var_Pop_Order_By = {
  base_amount?: InputMaybe<Order_By>;
  max_consumptions_per_token?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "redeemable" */
export type Redeemable_Var_Samp_Order_By = {
  base_amount?: InputMaybe<Order_By>;
  max_consumptions_per_token?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "redeemable" */
export type Redeemable_Variance_Order_By = {
  base_amount?: InputMaybe<Order_By>;
  max_consumptions_per_token?: InputMaybe<Order_By>;
};

/** columns and relationships of "redemption" */
export type Redemption = {
  __typename?: 'redemption';
  amount: Scalars['numeric']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['Int']['output'];
  /** An object relationship */
  objkt?: Maybe<Objkt>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  redeemable?: Maybe<Redeemable>;
  redeemable_address?: Maybe<Scalars['String']['output']>;
  redeemer_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  user?: Maybe<User>;
};

/** order by aggregate values of table "redemption" */
export type Redemption_Aggregate_Order_By = {
  avg?: InputMaybe<Redemption_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Redemption_Max_Order_By>;
  min?: InputMaybe<Redemption_Min_Order_By>;
  stddev?: InputMaybe<Redemption_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Redemption_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Redemption_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Redemption_Sum_Order_By>;
  var_pop?: InputMaybe<Redemption_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Redemption_Var_Samp_Order_By>;
  variance?: InputMaybe<Redemption_Variance_Order_By>;
};

/** order by avg() on columns of table "redemption" */
export type Redemption_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "redemption". All fields are combined with a logical 'AND'. */
export type Redemption_Bool_Exp = {
  _and?: InputMaybe<Array<Redemption_Bool_Exp>>;
  _not?: InputMaybe<Redemption_Bool_Exp>;
  _or?: InputMaybe<Array<Redemption_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  objkt?: InputMaybe<Objkt_Bool_Exp>;
  objkt_id?: InputMaybe<String_Comparison_Exp>;
  redeemable?: InputMaybe<Redeemable_Bool_Exp>;
  redeemable_address?: InputMaybe<String_Comparison_Exp>;
  redeemer_id?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
};

/** order by max() on columns of table "redemption" */
export type Redemption_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  redeemable_address?: InputMaybe<Order_By>;
  redeemer_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "redemption" */
export type Redemption_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  redeemable_address?: InputMaybe<Order_By>;
  redeemer_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "redemption". */
export type Redemption_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  objkt?: InputMaybe<Objkt_Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  redeemable?: InputMaybe<Redeemable_Order_By>;
  redeemable_address?: InputMaybe<Order_By>;
  redeemer_id?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
};

/** select columns of table "redemption" */
export enum Redemption_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ObjktId = 'objkt_id',
  /** column name */
  RedeemableAddress = 'redeemable_address',
  /** column name */
  RedeemerId = 'redeemer_id'
}

/** order by stddev() on columns of table "redemption" */
export type Redemption_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "redemption" */
export type Redemption_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "redemption" */
export type Redemption_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "redemption" */
export type Redemption_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Redemption_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Redemption_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  objkt_id?: InputMaybe<Scalars['String']['input']>;
  redeemable_address?: InputMaybe<Scalars['String']['input']>;
  redeemer_id?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "redemption" */
export type Redemption_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "redemption" */
export type Redemption_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "redemption" */
export type Redemption_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "redemption" */
export type Redemption_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** columns and relationships of "report" */
export type Report = {
  __typename?: 'report';
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  generative_token?: Maybe<Generative_Token>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  moderation_reason?: Maybe<Moderation_Reason>;
  reason_id?: Maybe<Scalars['String']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by aggregate values of table "report" */
export type Report_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Report_Max_Order_By>;
  min?: InputMaybe<Report_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "report". All fields are combined with a logical 'AND'. */
export type Report_Bool_Exp = {
  _and?: InputMaybe<Array<Report_Bool_Exp>>;
  _not?: InputMaybe<Report_Bool_Exp>;
  _or?: InputMaybe<Array<Report_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  moderation_reason?: InputMaybe<Moderation_Reason_Bool_Exp>;
  reason_id?: InputMaybe<String_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "report" */
export type Report_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  reason_id?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "report" */
export type Report_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  reason_id?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "report". */
export type Report_Order_By = {
  created_at?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  id?: InputMaybe<Order_By>;
  moderation_reason?: InputMaybe<Moderation_Reason_Order_By>;
  reason_id?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "report" */
export enum Report_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ReasonId = 'reason_id',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  UserId = 'user_id'
}

/** Streaming cursor of the table "report" */
export type Report_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Report_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Report_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  reason_id?: InputMaybe<Scalars['String']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "reserve" */
export type Reserve = {
  __typename?: 'reserve';
  amount: Scalars['numeric']['output'];
  data?: Maybe<Scalars['jsonb']['output']>;
  /** An object relationship */
  generative_token?: Maybe<Generative_Token>;
  id: Scalars['Int']['output'];
  method: Scalars['Int']['output'];
  token_id?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "reserve" */
export type ReserveDataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** order by aggregate values of table "reserve" */
export type Reserve_Aggregate_Order_By = {
  avg?: InputMaybe<Reserve_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Reserve_Max_Order_By>;
  min?: InputMaybe<Reserve_Min_Order_By>;
  stddev?: InputMaybe<Reserve_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Reserve_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Reserve_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Reserve_Sum_Order_By>;
  var_pop?: InputMaybe<Reserve_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Reserve_Var_Samp_Order_By>;
  variance?: InputMaybe<Reserve_Variance_Order_By>;
};

/** order by avg() on columns of table "reserve" */
export type Reserve_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "reserve". All fields are combined with a logical 'AND'. */
export type Reserve_Bool_Exp = {
  _and?: InputMaybe<Array<Reserve_Bool_Exp>>;
  _not?: InputMaybe<Reserve_Bool_Exp>;
  _or?: InputMaybe<Array<Reserve_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  data?: InputMaybe<Jsonb_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  method?: InputMaybe<Int_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "reserve" */
export type Reserve_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "reserve" */
export type Reserve_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "reserve". */
export type Reserve_Order_By = {
  amount?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** select columns of table "reserve" */
export enum Reserve_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Data = 'data',
  /** column name */
  Id = 'id',
  /** column name */
  Method = 'method',
  /** column name */
  TokenId = 'token_id'
}

/** order by stddev() on columns of table "reserve" */
export type Reserve_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "reserve" */
export type Reserve_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "reserve" */
export type Reserve_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "reserve" */
export type Reserve_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Reserve_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Reserve_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  data?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  method?: InputMaybe<Scalars['Int']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "reserve" */
export type Reserve_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "reserve" */
export type Reserve_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "reserve" */
export type Reserve_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "reserve" */
export type Reserve_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
export type Smallint_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['smallint']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['smallint']['input']>>;
  _eq?: InputMaybe<Array<Scalars['smallint']['input']>>;
  _gt?: InputMaybe<Array<Scalars['smallint']['input']>>;
  _gte?: InputMaybe<Array<Scalars['smallint']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['smallint']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['smallint']['input']>>;
  _lte?: InputMaybe<Array<Scalars['smallint']['input']>>;
  _neq?: InputMaybe<Array<Scalars['smallint']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['smallint']['input']>>>;
};

/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
export type Smallint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['smallint']['input']>;
  _gt?: InputMaybe<Scalars['smallint']['input']>;
  _gte?: InputMaybe<Scalars['smallint']['input']>;
  _in?: InputMaybe<Array<Scalars['smallint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['smallint']['input']>;
  _lte?: InputMaybe<Scalars['smallint']['input']>;
  _neq?: InputMaybe<Scalars['smallint']['input']>;
  _nin?: InputMaybe<Array<Scalars['smallint']['input']>>;
};

/** columns and relationships of "split" */
export type Split = {
  __typename?: 'split';
  /** An object relationship */
  article?: Maybe<Article>;
  article_id?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  generativeTokenByGenerativeTokenPrimaryId?: Maybe<Generative_Token>;
  /** An object relationship */
  generative_token?: Maybe<Generative_Token>;
  generative_token_primary_id?: Maybe<Scalars['String']['output']>;
  generative_token_secondary_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  /** An object relationship */
  objkt?: Maybe<Objkt>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  pct: Scalars['Int']['output'];
  /** An object relationship */
  redeemable?: Maybe<Redeemable>;
  redeemable_address?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  user: User;
  user_id: Scalars['String']['output'];
};

/** order by aggregate values of table "split" */
export type Split_Aggregate_Order_By = {
  avg?: InputMaybe<Split_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Split_Max_Order_By>;
  min?: InputMaybe<Split_Min_Order_By>;
  stddev?: InputMaybe<Split_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Split_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Split_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Split_Sum_Order_By>;
  var_pop?: InputMaybe<Split_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Split_Var_Samp_Order_By>;
  variance?: InputMaybe<Split_Variance_Order_By>;
};

/** order by avg() on columns of table "split" */
export type Split_Avg_Order_By = {
  article_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pct?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "split". All fields are combined with a logical 'AND'. */
export type Split_Bool_Exp = {
  _and?: InputMaybe<Array<Split_Bool_Exp>>;
  _not?: InputMaybe<Split_Bool_Exp>;
  _or?: InputMaybe<Array<Split_Bool_Exp>>;
  article?: InputMaybe<Article_Bool_Exp>;
  article_id?: InputMaybe<Int_Comparison_Exp>;
  generativeTokenByGenerativeTokenPrimaryId?: InputMaybe<Generative_Token_Bool_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  generative_token_primary_id?: InputMaybe<String_Comparison_Exp>;
  generative_token_secondary_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  objkt?: InputMaybe<Objkt_Bool_Exp>;
  objkt_id?: InputMaybe<String_Comparison_Exp>;
  pct?: InputMaybe<Int_Comparison_Exp>;
  redeemable?: InputMaybe<Redeemable_Bool_Exp>;
  redeemable_address?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "split" */
export type Split_Max_Order_By = {
  article_id?: InputMaybe<Order_By>;
  generative_token_primary_id?: InputMaybe<Order_By>;
  generative_token_secondary_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  pct?: InputMaybe<Order_By>;
  redeemable_address?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "split" */
export type Split_Min_Order_By = {
  article_id?: InputMaybe<Order_By>;
  generative_token_primary_id?: InputMaybe<Order_By>;
  generative_token_secondary_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  pct?: InputMaybe<Order_By>;
  redeemable_address?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "split". */
export type Split_Order_By = {
  article?: InputMaybe<Article_Order_By>;
  article_id?: InputMaybe<Order_By>;
  generativeTokenByGenerativeTokenPrimaryId?: InputMaybe<Generative_Token_Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  generative_token_primary_id?: InputMaybe<Order_By>;
  generative_token_secondary_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  objkt?: InputMaybe<Objkt_Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  pct?: InputMaybe<Order_By>;
  redeemable?: InputMaybe<Redeemable_Order_By>;
  redeemable_address?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "split" */
export enum Split_Select_Column {
  /** column name */
  ArticleId = 'article_id',
  /** column name */
  GenerativeTokenPrimaryId = 'generative_token_primary_id',
  /** column name */
  GenerativeTokenSecondaryId = 'generative_token_secondary_id',
  /** column name */
  Id = 'id',
  /** column name */
  ObjktId = 'objkt_id',
  /** column name */
  Pct = 'pct',
  /** column name */
  RedeemableAddress = 'redeemable_address',
  /** column name */
  UserId = 'user_id'
}

/** order by stddev() on columns of table "split" */
export type Split_Stddev_Order_By = {
  article_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pct?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "split" */
export type Split_Stddev_Pop_Order_By = {
  article_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pct?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "split" */
export type Split_Stddev_Samp_Order_By = {
  article_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pct?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "split" */
export type Split_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Split_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Split_Stream_Cursor_Value_Input = {
  article_id?: InputMaybe<Scalars['Int']['input']>;
  generative_token_primary_id?: InputMaybe<Scalars['String']['input']>;
  generative_token_secondary_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  objkt_id?: InputMaybe<Scalars['String']['input']>;
  pct?: InputMaybe<Scalars['Int']['input']>;
  redeemable_address?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "split" */
export type Split_Sum_Order_By = {
  article_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pct?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "split" */
export type Split_Var_Pop_Order_By = {
  article_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pct?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "split" */
export type Split_Var_Samp_Order_By = {
  article_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pct?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "split" */
export type Split_Variance_Order_By = {
  article_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pct?: InputMaybe<Order_By>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  offchain?: Maybe<Offchain_Subscription>;
  onchain?: Maybe<Onchain_Subscription>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "transaction" */
export type Transaction = {
  __typename?: 'transaction';
  /** An object relationship */
  article?: Maybe<Article>;
  article_id?: Maybe<Scalars['Int']['output']>;
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  generative_token?: Maybe<Generative_Token>;
  id: Scalars['Int']['output'];
  /** An object relationship */
  objkt?: Maybe<Objkt>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  op_hash: Scalars['String']['output'];
  price: Scalars['numeric']['output'];
  ticket_id?: Maybe<Scalars['String']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
  type: Scalars['transaction_type_enum']['output'];
};

/** order by aggregate values of table "transaction" */
export type Transaction_Aggregate_Order_By = {
  avg?: InputMaybe<Transaction_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Transaction_Max_Order_By>;
  min?: InputMaybe<Transaction_Min_Order_By>;
  stddev?: InputMaybe<Transaction_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Transaction_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Transaction_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Transaction_Sum_Order_By>;
  var_pop?: InputMaybe<Transaction_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Transaction_Var_Samp_Order_By>;
  variance?: InputMaybe<Transaction_Variance_Order_By>;
};

/** order by avg() on columns of table "transaction" */
export type Transaction_Avg_Order_By = {
  article_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "transaction". All fields are combined with a logical 'AND'. */
export type Transaction_Bool_Exp = {
  _and?: InputMaybe<Array<Transaction_Bool_Exp>>;
  _not?: InputMaybe<Transaction_Bool_Exp>;
  _or?: InputMaybe<Array<Transaction_Bool_Exp>>;
  article?: InputMaybe<Article_Bool_Exp>;
  article_id?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  objkt?: InputMaybe<Objkt_Bool_Exp>;
  objkt_id?: InputMaybe<String_Comparison_Exp>;
  op_hash?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  ticket_id?: InputMaybe<String_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<Transaction_Type_Enum_Comparison_Exp>;
};

/** order by max() on columns of table "transaction" */
export type Transaction_Max_Order_By = {
  article_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  op_hash?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  ticket_id?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "transaction" */
export type Transaction_Min_Order_By = {
  article_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  op_hash?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  ticket_id?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "transaction". */
export type Transaction_Order_By = {
  article?: InputMaybe<Article_Order_By>;
  article_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  id?: InputMaybe<Order_By>;
  objkt?: InputMaybe<Objkt_Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  op_hash?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  ticket_id?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** select columns of table "transaction" */
export enum Transaction_Select_Column {
  /** column name */
  ArticleId = 'article_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ObjktId = 'objkt_id',
  /** column name */
  OpHash = 'op_hash',
  /** column name */
  Price = 'price',
  /** column name */
  TicketId = 'ticket_id',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  Type = 'type'
}

/** order by stddev() on columns of table "transaction" */
export type Transaction_Stddev_Order_By = {
  article_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "transaction" */
export type Transaction_Stddev_Pop_Order_By = {
  article_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "transaction" */
export type Transaction_Stddev_Samp_Order_By = {
  article_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "transaction" */
export type Transaction_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Transaction_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Transaction_Stream_Cursor_Value_Input = {
  article_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  objkt_id?: InputMaybe<Scalars['String']['input']>;
  op_hash?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  ticket_id?: InputMaybe<Scalars['String']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['transaction_type_enum']['input']>;
};

/** order by sum() on columns of table "transaction" */
export type Transaction_Sum_Order_By = {
  article_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "transaction_type_enum". All fields are combined with logical 'AND'. */
export type Transaction_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['transaction_type_enum']['input']>;
  _gt?: InputMaybe<Scalars['transaction_type_enum']['input']>;
  _gte?: InputMaybe<Scalars['transaction_type_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['transaction_type_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['transaction_type_enum']['input']>;
  _lte?: InputMaybe<Scalars['transaction_type_enum']['input']>;
  _neq?: InputMaybe<Scalars['transaction_type_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['transaction_type_enum']['input']>>;
};

/** order by var_pop() on columns of table "transaction" */
export type Transaction_Var_Pop_Order_By = {
  article_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "transaction" */
export type Transaction_Var_Samp_Order_By = {
  article_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "transaction" */
export type Transaction_Variance_Order_By = {
  article_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  /** An array relationship */
  actions: Array<Action>;
  /** An array relationship */
  actionsByIssuerId: Array<Action>;
  /** An aggregate relationship */
  actionsByIssuerId_aggregate: Action_Aggregate;
  /** An aggregate relationship */
  actions_aggregate: Action_Aggregate;
  /** An object relationship */
  airdrop_claim?: Maybe<Airdrop_Claim>;
  /** An array relationship */
  article_ledgers: Array<Article_Ledger>;
  /** An aggregate relationship */
  article_ledgers_aggregate: Article_Ledger_Aggregate;
  /** An array relationship */
  articles: Array<Article>;
  /** An aggregate relationship */
  articles_aggregate: Article_Aggregate;
  /** An array relationship */
  auction_bids: Array<Auction_Bid>;
  /** An array relationship */
  auctions: Array<Auction>;
  authorizations: Array<Scalars['smallint']['output']>;
  avatar_media_id?: Maybe<Scalars['bpchar']['output']>;
  avatar_uri?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  codexes: Array<Codex>;
  /** An array relationship */
  collaborations: Array<Collaboration>;
  /** An array relationship */
  collaborationsByCollaboratorId: Array<Collaboration>;
  /** An array relationship */
  collection_offers: Array<Collection_Offer>;
  created_at: Scalars['timestamptz']['output'];
  description?: Maybe<Scalars['String']['output']>;
  flag: Scalars['user_flag_enum']['output'];
  /** An array relationship */
  generative_tokens: Array<Generative_Token>;
  /** An aggregate relationship */
  generative_tokens_aggregate: Generative_Token_Aggregate;
  id: Scalars['String']['output'];
  /** An array relationship */
  listings: Array<Listing>;
  /** An array relationship */
  listingsByAcceptedById: Array<Listing>;
  /** An aggregate relationship */
  listingsByAcceptedById_aggregate: Listing_Aggregate;
  /** An aggregate relationship */
  listings_aggregate: Listing_Aggregate;
  /** An object relationship */
  media_image?: Maybe<Media_Image>;
  metadata?: Maybe<Scalars['jsonb']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  mint_tickets: Array<Mint_Ticket>;
  /** An aggregate relationship */
  mint_tickets_aggregate: Mint_Ticket_Aggregate;
  /** An object relationship */
  moderation_reason?: Maybe<Moderation_Reason>;
  moderation_reason_id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  objkts: Array<Objkt>;
  /** An array relationship */
  objktsByOwnerId: Array<Objkt>;
  /** An aggregate relationship */
  objktsByOwnerId_aggregate: Objkt_Aggregate;
  /** An aggregate relationship */
  objkts_aggregate: Objkt_Aggregate;
  /** An array relationship */
  offers: Array<Offer>;
  /** An aggregate relationship */
  offers_aggregate: Offer_Aggregate;
  /** An array relationship */
  redemptions: Array<Redemption>;
  /** An array relationship */
  reports: Array<Report>;
  /** An array relationship */
  splits: Array<Split>;
  type: Scalars['user_type_enum']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user_stat?: Maybe<User_Stats>;
  wallet?: Maybe<Wallet>;
  /** An object relationship */
  wallet_account?: Maybe<Wallet_Account>;
};


/** columns and relationships of "user" */
export type UserActionsArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserActionsByIssuerIdArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserActionsByIssuerId_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserActions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserArticle_LedgersArgs = {
  distinct_on?: InputMaybe<Array<Article_Ledger_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Ledger_Order_By>>;
  where?: InputMaybe<Article_Ledger_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserArticle_Ledgers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Article_Ledger_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Ledger_Order_By>>;
  where?: InputMaybe<Article_Ledger_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserArticlesArgs = {
  distinct_on?: InputMaybe<Array<Article_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Order_By>>;
  where?: InputMaybe<Article_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserArticles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Article_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Order_By>>;
  where?: InputMaybe<Article_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserAuction_BidsArgs = {
  distinct_on?: InputMaybe<Array<Auction_Bid_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Auction_Bid_Order_By>>;
  where?: InputMaybe<Auction_Bid_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserAuctionsArgs = {
  distinct_on?: InputMaybe<Array<Auction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Auction_Order_By>>;
  where?: InputMaybe<Auction_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserCodexesArgs = {
  distinct_on?: InputMaybe<Array<Codex_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Codex_Order_By>>;
  where?: InputMaybe<Codex_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserCollaborationsArgs = {
  distinct_on?: InputMaybe<Array<Collaboration_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collaboration_Order_By>>;
  where?: InputMaybe<Collaboration_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserCollaborationsByCollaboratorIdArgs = {
  distinct_on?: InputMaybe<Array<Collaboration_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collaboration_Order_By>>;
  where?: InputMaybe<Collaboration_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserCollection_OffersArgs = {
  distinct_on?: InputMaybe<Array<Collection_Offer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collection_Offer_Order_By>>;
  where?: InputMaybe<Collection_Offer_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserGenerative_TokensArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Order_By>>;
  where?: InputMaybe<Generative_Token_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserGenerative_Tokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Order_By>>;
  where?: InputMaybe<Generative_Token_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserListingsArgs = {
  distinct_on?: InputMaybe<Array<Listing_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Listing_Order_By>>;
  where?: InputMaybe<Listing_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserListingsByAcceptedByIdArgs = {
  distinct_on?: InputMaybe<Array<Listing_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Listing_Order_By>>;
  where?: InputMaybe<Listing_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserListingsByAcceptedById_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Listing_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Listing_Order_By>>;
  where?: InputMaybe<Listing_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserListings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Listing_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Listing_Order_By>>;
  where?: InputMaybe<Listing_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "user" */
export type UserMint_TicketsArgs = {
  distinct_on?: InputMaybe<Array<Mint_Ticket_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mint_Ticket_Order_By>>;
  where?: InputMaybe<Mint_Ticket_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserMint_Tickets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mint_Ticket_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mint_Ticket_Order_By>>;
  where?: InputMaybe<Mint_Ticket_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserObjktsArgs = {
  distinct_on?: InputMaybe<Array<Objkt_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Objkt_Order_By>>;
  where?: InputMaybe<Objkt_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserObjktsByOwnerIdArgs = {
  distinct_on?: InputMaybe<Array<Objkt_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Objkt_Order_By>>;
  where?: InputMaybe<Objkt_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserObjktsByOwnerId_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Objkt_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Objkt_Order_By>>;
  where?: InputMaybe<Objkt_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserObjkts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Objkt_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Objkt_Order_By>>;
  where?: InputMaybe<Objkt_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserOffersArgs = {
  distinct_on?: InputMaybe<Array<Offer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Offer_Order_By>>;
  where?: InputMaybe<Offer_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserOffers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Offer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Offer_Order_By>>;
  where?: InputMaybe<Offer_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserRedemptionsArgs = {
  distinct_on?: InputMaybe<Array<Redemption_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redemption_Order_By>>;
  where?: InputMaybe<Redemption_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserReportsArgs = {
  distinct_on?: InputMaybe<Array<Report_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Report_Order_By>>;
  where?: InputMaybe<Report_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserSplitsArgs = {
  distinct_on?: InputMaybe<Array<Split_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Split_Order_By>>;
  where?: InputMaybe<Split_Bool_Exp>;
};

/** order by aggregate values of table "user" */
export type User_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Max_Order_By>;
  min?: InputMaybe<User_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: InputMaybe<Array<User_Bool_Exp>>;
  _not?: InputMaybe<User_Bool_Exp>;
  _or?: InputMaybe<Array<User_Bool_Exp>>;
  actions?: InputMaybe<Action_Bool_Exp>;
  actionsByIssuerId?: InputMaybe<Action_Bool_Exp>;
  actionsByIssuerId_aggregate?: InputMaybe<Action_Aggregate_Bool_Exp>;
  actions_aggregate?: InputMaybe<Action_Aggregate_Bool_Exp>;
  airdrop_claim?: InputMaybe<Airdrop_Claim_Bool_Exp>;
  article_ledgers?: InputMaybe<Article_Ledger_Bool_Exp>;
  article_ledgers_aggregate?: InputMaybe<Article_Ledger_Aggregate_Bool_Exp>;
  articles?: InputMaybe<Article_Bool_Exp>;
  articles_aggregate?: InputMaybe<Article_Aggregate_Bool_Exp>;
  auction_bids?: InputMaybe<Auction_Bid_Bool_Exp>;
  auctions?: InputMaybe<Auction_Bool_Exp>;
  authorizations?: InputMaybe<Smallint_Array_Comparison_Exp>;
  avatar_media_id?: InputMaybe<Bpchar_Comparison_Exp>;
  avatar_uri?: InputMaybe<String_Comparison_Exp>;
  codexes?: InputMaybe<Codex_Bool_Exp>;
  collaborations?: InputMaybe<Collaboration_Bool_Exp>;
  collaborationsByCollaboratorId?: InputMaybe<Collaboration_Bool_Exp>;
  collection_offers?: InputMaybe<Collection_Offer_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  flag?: InputMaybe<User_Flag_Enum_Comparison_Exp>;
  generative_tokens?: InputMaybe<Generative_Token_Bool_Exp>;
  generative_tokens_aggregate?: InputMaybe<Generative_Token_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  listings?: InputMaybe<Listing_Bool_Exp>;
  listingsByAcceptedById?: InputMaybe<Listing_Bool_Exp>;
  listingsByAcceptedById_aggregate?: InputMaybe<Listing_Aggregate_Bool_Exp>;
  listings_aggregate?: InputMaybe<Listing_Aggregate_Bool_Exp>;
  media_image?: InputMaybe<Media_Image_Bool_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  metadata_uri?: InputMaybe<String_Comparison_Exp>;
  mint_tickets?: InputMaybe<Mint_Ticket_Bool_Exp>;
  mint_tickets_aggregate?: InputMaybe<Mint_Ticket_Aggregate_Bool_Exp>;
  moderation_reason?: InputMaybe<Moderation_Reason_Bool_Exp>;
  moderation_reason_id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  objkts?: InputMaybe<Objkt_Bool_Exp>;
  objktsByOwnerId?: InputMaybe<Objkt_Bool_Exp>;
  objktsByOwnerId_aggregate?: InputMaybe<Objkt_Aggregate_Bool_Exp>;
  objkts_aggregate?: InputMaybe<Objkt_Aggregate_Bool_Exp>;
  offers?: InputMaybe<Offer_Bool_Exp>;
  offers_aggregate?: InputMaybe<Offer_Aggregate_Bool_Exp>;
  redemptions?: InputMaybe<Redemption_Bool_Exp>;
  reports?: InputMaybe<Report_Bool_Exp>;
  splits?: InputMaybe<Split_Bool_Exp>;
  type?: InputMaybe<User_Type_Enum_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_stat?: InputMaybe<User_Stats_Bool_Exp>;
  wallet_account?: InputMaybe<Wallet_Account_Bool_Exp>;
};

/** Boolean expression to compare columns of type "user_flag_enum". All fields are combined with logical 'AND'. */
export type User_Flag_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['user_flag_enum']['input']>;
  _gt?: InputMaybe<Scalars['user_flag_enum']['input']>;
  _gte?: InputMaybe<Scalars['user_flag_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['user_flag_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['user_flag_enum']['input']>;
  _lte?: InputMaybe<Scalars['user_flag_enum']['input']>;
  _neq?: InputMaybe<Scalars['user_flag_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['user_flag_enum']['input']>>;
};

/** order by max() on columns of table "user" */
export type User_Max_Order_By = {
  authorizations?: InputMaybe<Order_By>;
  avatar_media_id?: InputMaybe<Order_By>;
  avatar_uri?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  flag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  moderation_reason_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "user" */
export type User_Min_Order_By = {
  authorizations?: InputMaybe<Order_By>;
  avatar_media_id?: InputMaybe<Order_By>;
  avatar_uri?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  flag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  moderation_reason_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "user". */
export type User_Order_By = {
  actionsByIssuerId_aggregate?: InputMaybe<Action_Aggregate_Order_By>;
  actions_aggregate?: InputMaybe<Action_Aggregate_Order_By>;
  airdrop_claim?: InputMaybe<Airdrop_Claim_Order_By>;
  article_ledgers_aggregate?: InputMaybe<Article_Ledger_Aggregate_Order_By>;
  articles_aggregate?: InputMaybe<Article_Aggregate_Order_By>;
  auction_bids_aggregate?: InputMaybe<Auction_Bid_Aggregate_Order_By>;
  auctions_aggregate?: InputMaybe<Auction_Aggregate_Order_By>;
  authorizations?: InputMaybe<Order_By>;
  avatar_media_id?: InputMaybe<Order_By>;
  avatar_uri?: InputMaybe<Order_By>;
  codexes_aggregate?: InputMaybe<Codex_Aggregate_Order_By>;
  collaborationsByCollaboratorId_aggregate?: InputMaybe<Collaboration_Aggregate_Order_By>;
  collaborations_aggregate?: InputMaybe<Collaboration_Aggregate_Order_By>;
  collection_offers_aggregate?: InputMaybe<Collection_Offer_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  flag?: InputMaybe<Order_By>;
  generative_tokens_aggregate?: InputMaybe<Generative_Token_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  listingsByAcceptedById_aggregate?: InputMaybe<Listing_Aggregate_Order_By>;
  listings_aggregate?: InputMaybe<Listing_Aggregate_Order_By>;
  media_image?: InputMaybe<Media_Image_Order_By>;
  metadata?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  mint_tickets_aggregate?: InputMaybe<Mint_Ticket_Aggregate_Order_By>;
  moderation_reason?: InputMaybe<Moderation_Reason_Order_By>;
  moderation_reason_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  objktsByOwnerId_aggregate?: InputMaybe<Objkt_Aggregate_Order_By>;
  objkts_aggregate?: InputMaybe<Objkt_Aggregate_Order_By>;
  offers_aggregate?: InputMaybe<Offer_Aggregate_Order_By>;
  redemptions_aggregate?: InputMaybe<Redemption_Aggregate_Order_By>;
  reports_aggregate?: InputMaybe<Report_Aggregate_Order_By>;
  splits_aggregate?: InputMaybe<Split_Aggregate_Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_stat?: InputMaybe<User_Stats_Order_By>;
  wallet_account?: InputMaybe<Wallet_Account_Order_By>;
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  Authorizations = 'authorizations',
  /** column name */
  AvatarMediaId = 'avatar_media_id',
  /** column name */
  AvatarUri = 'avatar_uri',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Flag = 'flag',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MetadataUri = 'metadata_uri',
  /** column name */
  ModerationReasonId = 'moderation_reason_id',
  /** column name */
  Name = 'name',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "user_stats" */
export type User_Stats = {
  __typename?: 'user_stats';
  from?: Maybe<Scalars['timestamptz']['output']>;
  prim_volume_nb?: Maybe<Scalars['Int']['output']>;
  prim_volume_nb7d?: Maybe<Scalars['Int']['output']>;
  prim_volume_nb24?: Maybe<Scalars['Int']['output']>;
  prim_volume_nb30d?: Maybe<Scalars['Int']['output']>;
  prim_volume_tz?: Maybe<Scalars['numeric']['output']>;
  prim_volume_tz7d?: Maybe<Scalars['numeric']['output']>;
  prim_volume_tz24?: Maybe<Scalars['numeric']['output']>;
  prim_volume_tz30d?: Maybe<Scalars['numeric']['output']>;
  sec_volume_nb?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb7d?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb24?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb30d?: Maybe<Scalars['Int']['output']>;
  sec_volume_tz?: Maybe<Scalars['numeric']['output']>;
  sec_volume_tz7d?: Maybe<Scalars['numeric']['output']>;
  sec_volume_tz24?: Maybe<Scalars['numeric']['output']>;
  sec_volume_tz30d?: Maybe<Scalars['numeric']['output']>;
  to?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user: User;
  user_id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "user_stats". All fields are combined with a logical 'AND'. */
export type User_Stats_Bool_Exp = {
  _and?: InputMaybe<Array<User_Stats_Bool_Exp>>;
  _not?: InputMaybe<User_Stats_Bool_Exp>;
  _or?: InputMaybe<Array<User_Stats_Bool_Exp>>;
  from?: InputMaybe<Timestamptz_Comparison_Exp>;
  prim_volume_nb?: InputMaybe<Int_Comparison_Exp>;
  prim_volume_nb7d?: InputMaybe<Int_Comparison_Exp>;
  prim_volume_nb24?: InputMaybe<Int_Comparison_Exp>;
  prim_volume_nb30d?: InputMaybe<Int_Comparison_Exp>;
  prim_volume_tz?: InputMaybe<Numeric_Comparison_Exp>;
  prim_volume_tz7d?: InputMaybe<Numeric_Comparison_Exp>;
  prim_volume_tz24?: InputMaybe<Numeric_Comparison_Exp>;
  prim_volume_tz30d?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume_nb?: InputMaybe<Int_Comparison_Exp>;
  sec_volume_nb7d?: InputMaybe<Int_Comparison_Exp>;
  sec_volume_nb24?: InputMaybe<Int_Comparison_Exp>;
  sec_volume_nb30d?: InputMaybe<Int_Comparison_Exp>;
  sec_volume_tz?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume_tz7d?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume_tz24?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume_tz30d?: InputMaybe<Numeric_Comparison_Exp>;
  to?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "user_stats". */
export type User_Stats_Order_By = {
  from?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  prim_volume_nb7d?: InputMaybe<Order_By>;
  prim_volume_nb24?: InputMaybe<Order_By>;
  prim_volume_nb30d?: InputMaybe<Order_By>;
  prim_volume_tz?: InputMaybe<Order_By>;
  prim_volume_tz7d?: InputMaybe<Order_By>;
  prim_volume_tz24?: InputMaybe<Order_By>;
  prim_volume_tz30d?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  sec_volume_nb7d?: InputMaybe<Order_By>;
  sec_volume_nb24?: InputMaybe<Order_By>;
  sec_volume_nb30d?: InputMaybe<Order_By>;
  sec_volume_tz?: InputMaybe<Order_By>;
  sec_volume_tz7d?: InputMaybe<Order_By>;
  sec_volume_tz24?: InputMaybe<Order_By>;
  sec_volume_tz30d?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "user_stats" */
export enum User_Stats_Select_Column {
  /** column name */
  From = 'from',
  /** column name */
  PrimVolumeNb = 'prim_volume_nb',
  /** column name */
  PrimVolumeNb7d = 'prim_volume_nb7d',
  /** column name */
  PrimVolumeNb24 = 'prim_volume_nb24',
  /** column name */
  PrimVolumeNb30d = 'prim_volume_nb30d',
  /** column name */
  PrimVolumeTz = 'prim_volume_tz',
  /** column name */
  PrimVolumeTz7d = 'prim_volume_tz7d',
  /** column name */
  PrimVolumeTz24 = 'prim_volume_tz24',
  /** column name */
  PrimVolumeTz30d = 'prim_volume_tz30d',
  /** column name */
  SecVolumeNb = 'sec_volume_nb',
  /** column name */
  SecVolumeNb7d = 'sec_volume_nb7d',
  /** column name */
  SecVolumeNb24 = 'sec_volume_nb24',
  /** column name */
  SecVolumeNb30d = 'sec_volume_nb30d',
  /** column name */
  SecVolumeTz = 'sec_volume_tz',
  /** column name */
  SecVolumeTz7d = 'sec_volume_tz7d',
  /** column name */
  SecVolumeTz24 = 'sec_volume_tz24',
  /** column name */
  SecVolumeTz30d = 'sec_volume_tz30d',
  /** column name */
  To = 'to',
  /** column name */
  UserId = 'user_id'
}

/** Streaming cursor of the table "user_stats" */
export type User_Stats_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Stats_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Stats_Stream_Cursor_Value_Input = {
  from?: InputMaybe<Scalars['timestamptz']['input']>;
  prim_volume_nb?: InputMaybe<Scalars['Int']['input']>;
  prim_volume_nb7d?: InputMaybe<Scalars['Int']['input']>;
  prim_volume_nb24?: InputMaybe<Scalars['Int']['input']>;
  prim_volume_nb30d?: InputMaybe<Scalars['Int']['input']>;
  prim_volume_tz?: InputMaybe<Scalars['numeric']['input']>;
  prim_volume_tz7d?: InputMaybe<Scalars['numeric']['input']>;
  prim_volume_tz24?: InputMaybe<Scalars['numeric']['input']>;
  prim_volume_tz30d?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume_nb?: InputMaybe<Scalars['Int']['input']>;
  sec_volume_nb7d?: InputMaybe<Scalars['Int']['input']>;
  sec_volume_nb24?: InputMaybe<Scalars['Int']['input']>;
  sec_volume_nb30d?: InputMaybe<Scalars['Int']['input']>;
  sec_volume_tz?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume_tz7d?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume_tz24?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume_tz30d?: InputMaybe<Scalars['numeric']['input']>;
  to?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "user" */
export type User_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Stream_Cursor_Value_Input = {
  authorizations?: InputMaybe<Array<Scalars['smallint']['input']>>;
  avatar_media_id?: InputMaybe<Scalars['bpchar']['input']>;
  avatar_uri?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  flag?: InputMaybe<Scalars['user_flag_enum']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  metadata_uri?: InputMaybe<Scalars['String']['input']>;
  moderation_reason_id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['user_type_enum']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Boolean expression to compare columns of type "user_type_enum". All fields are combined with logical 'AND'. */
export type User_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['user_type_enum']['input']>;
  _gt?: InputMaybe<Scalars['user_type_enum']['input']>;
  _gte?: InputMaybe<Scalars['user_type_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['user_type_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['user_type_enum']['input']>;
  _lte?: InputMaybe<Scalars['user_type_enum']['input']>;
  _neq?: InputMaybe<Scalars['user_type_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['user_type_enum']['input']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

/** columns and relationships of "wallet_account" */
export type Wallet_Account = {
  __typename?: 'wallet_account';
  account?: Maybe<Account>;
  account_id: Scalars['String']['output'];
  address: Scalars['String']['output'];
  /** An object relationship */
  user?: Maybe<User>;
  username: Scalars['String']['output'];
  wallet?: Maybe<Wallet>;
};

/** Boolean expression to filter rows from the table "wallet_account". All fields are combined with a logical 'AND'. */
export type Wallet_Account_Bool_Exp = {
  _and?: InputMaybe<Array<Wallet_Account_Bool_Exp>>;
  _not?: InputMaybe<Wallet_Account_Bool_Exp>;
  _or?: InputMaybe<Array<Wallet_Account_Bool_Exp>>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  address?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "wallet_account". */
export type Wallet_Account_Order_By = {
  account_id?: InputMaybe<Order_By>;
  address?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  username?: InputMaybe<Order_By>;
};

/** select columns of table "wallet_account" */
export enum Wallet_Account_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  Address = 'address',
  /** column name */
  Username = 'username'
}

/** Streaming cursor of the table "wallet_account" */
export type Wallet_Account_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Wallet_Account_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Wallet_Account_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CreateWhitelistMutationVariables = Exact<{
  whitelist: Scalars['jsonb']['input'];
}>;


export type CreateWhitelistMutation = { __typename?: 'mutation_root', set_whitelist?: { __typename?: 'SetWhitelistOutput', merkleRoot?: string | null, message?: string | null, success: boolean } | null };

export type GenerateChallengeMutationVariables = Exact<{
  input: ChallengeInput;
}>;


export type GenerateChallengeMutation = { __typename?: 'mutation_root', generate_challenge?: { __typename?: 'ChallengeResult', id: string, text: string } | null };

export type AuthenticateMutationVariables = Exact<{
  input: AuthenticationInput;
}>;


export type AuthenticateMutation = { __typename?: 'mutation_root', authenticate?: { __typename?: 'AuthenticationResult', accessToken: string, refreshToken: string } | null };

export type AuthenticateWeb3AuthMutationVariables = Exact<{
  input: AuthenticationWeb3AuthInput;
}>;


export type AuthenticateWeb3AuthMutation = { __typename?: 'mutation_root', authenticate_web3auth?: { __typename?: 'AuthenticationResult', accessToken: string, refreshToken: string } | null };

export type Web3AuthOAuthMutationVariables = Exact<{
  input: Web3AuthOAuthInput;
}>;


export type Web3AuthOAuthMutation = { __typename?: 'mutation_root', web3auth_oauth?: { __typename?: 'Web3AuthOAuthOutput', idToken: string } | null };

export type Web3AuthEmailRequestOtpMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type Web3AuthEmailRequestOtpMutation = { __typename?: 'mutation_root', web3auth_email_request_otp?: { __typename?: 'Web3AuthEmailRequestOTPOutput', email: string, expires: string, attemptsLeft: number } | null };

export type MyMutationMutationVariables = Exact<{
  input: Web3AuthEmailAuthOtpInput;
}>;


export type MyMutationMutation = { __typename?: 'mutation_root', web3auth_email_auth_otp?: { __typename?: 'Web3AuthEmailAuthOTPOutput', idToken: string } | null };

export type RefreshMutationVariables = Exact<{
  input: RefreshInput;
}>;


export type RefreshMutation = { __typename?: 'mutation_root', refresh?: { __typename?: 'AuthenticationResult', accessToken: string, refreshToken: string } | null };

export type LogoutMutationVariables = Exact<{
  input: LogoutInput;
}>;


export type LogoutMutation = { __typename?: 'mutation_root', logout?: { __typename?: 'LogoutResult', success: boolean } | null };

export type Account_BaseDetailsFragment = { __typename?: 'Account', id: string, username: string, profile?: { __typename?: 'Profile', picture?: string | null, description?: string | null, website?: string | null, location?: string | null } | null, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> };

export type Account_WalletsFragment = { __typename?: 'Account', wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }>, mainWallet: { __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> } };

export type GetAccountsQueryVariables = Exact<{
  where?: InputMaybe<Account_Bool_Exp>;
}>;


export type GetAccountsQuery = { __typename?: 'query_root', offchain?: { __typename?: 'offchain_query', Account: Array<{ __typename?: 'Account', id: string, username: string, profile?: { __typename?: 'Profile', picture?: string | null, description?: string | null, website?: string | null, location?: string | null } | null, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> }> } | null };

export type GetAccountWalletsQueryVariables = Exact<{
  where?: InputMaybe<Account_Bool_Exp>;
}>;


export type GetAccountWalletsQuery = { __typename?: 'query_root', offchain?: { __typename?: 'offchain_query', Account: Array<{ __typename?: 'Account', id: string, username: string, profile?: { __typename?: 'Profile', picture?: string | null, description?: string | null, website?: string | null, location?: string | null } | null, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }>, mainWallet: { __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> } }> } | null };

export type GetMyAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyAccountQuery = { __typename?: 'query_root', offchain?: { __typename?: 'offchain_query', UserAccount: Array<{ __typename?: 'UserAccount', account?: { __typename?: 'Account', id: string, username: string, profile?: { __typename?: 'Profile', picture?: string | null, description?: string | null, website?: string | null, location?: string | null } | null, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }>, mainWallet: { __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> } } | null }> } | null };

export type UpdateAccountMutationVariables = Exact<{
  input: UpdateAccountInput;
}>;


export type UpdateAccountMutation = { __typename?: 'mutation_root', update_account?: { __typename?: 'UpdateAccountOutput', id: string, username: string, profile?: { __typename?: 'UpdateProfileOutput', picture?: string | null, description?: string | null, website?: string | null, location?: string | null } | null } | null };

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAccountMutation = { __typename?: 'mutation_root', delete_account?: { __typename?: 'DeleteAccountOutput', id: string, username: string } | null };

export type RequestTransferWalletMutationVariables = Exact<{
  input: RequestTransferWalletInput;
}>;


export type RequestTransferWalletMutation = { __typename?: 'mutation_root', request_transfer_wallet: { __typename?: 'RequestTransferWalletOutput', id: string, text: string } };

export type TransferWalletMutationVariables = Exact<{
  input: TransferWalletInput;
}>;


export type TransferWalletMutation = { __typename?: 'mutation_root', transfer_wallet: boolean };

export type SetFarcasterHandleMutationVariables = Exact<{
  input: SetFarcasterHandleInput;
}>;


export type SetFarcasterHandleMutation = { __typename?: 'mutation_root', set_farcaster_handle?: { __typename?: 'SetFarcasterHandleResult', handle: string } | null };

export type AirdropTezClaimMutationVariables = Exact<{
  input: AirdropTezClaimInput;
}>;


export type AirdropTezClaimMutation = { __typename?: 'mutation_root', airdrop_tez_claim?: { __typename?: 'AirdropTezClaimResult', signature: string } | null };

export type Get_LibrariesQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_LibrariesQuery = { __typename?: 'query_root', offchain?: { __typename?: 'offchain_query', Library: Array<{ __typename?: 'Library', id: string, name?: string | null, license?: string | null, authors?: string | null, createdAt: any, description?: string | null, docUrl?: string | null, versions: Array<{ __typename?: 'LibraryVersion', filename: string, id: string, onchfsPointer: string, content: string }> }> } | null };

export type Project_BaseDetailsFragment = { __typename?: 'Project', id: string, title: string, description?: string | null, tokenId?: string | null, releaseAt?: any | null, blockchain?: any | null, storage?: any | null, pricing?: any | null, curator?: { __typename?: 'Account', id: string, status: any, username: string, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> } | null, author: { __typename?: 'Account', id: string, username: string, profile?: { __typename?: 'Profile', picture?: string | null, description?: string | null, website?: string | null, location?: string | null } | null, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> }, collaborators: Array<{ __typename?: 'ProjectCollaborator', account: { __typename?: 'Account', id: string, username: string, profile?: { __typename?: 'Profile', picture?: string | null, description?: string | null, website?: string | null, location?: string | null } | null, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> } }>, projectMedias: Array<{ __typename?: 'ProjectMedia', index: any, media: { __typename?: 'Media', id: string, url: string } }> };

export type Project_UserSecretsFragment = { __typename?: 'Project', state: string };

export type GetAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProjectsQuery = { __typename?: 'query_root', offchain?: { __typename?: 'offchain_query', Project: Array<{ __typename?: 'Project', id: string, title: string, description?: string | null, tokenId?: string | null, releaseAt?: any | null, blockchain?: any | null, storage?: any | null, pricing?: any | null, curator?: { __typename?: 'Account', id: string, status: any, username: string, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> } | null, author: { __typename?: 'Account', id: string, username: string, profile?: { __typename?: 'Profile', picture?: string | null, description?: string | null, website?: string | null, location?: string | null } | null, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> }, collaborators: Array<{ __typename?: 'ProjectCollaborator', account: { __typename?: 'Account', id: string, username: string, profile?: { __typename?: 'Profile', picture?: string | null, description?: string | null, website?: string | null, location?: string | null } | null, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> } }>, projectMedias: Array<{ __typename?: 'ProjectMedia', index: any, media: { __typename?: 'Media', id: string, url: string } }> }> } | null };

export type GetAllProjectsAfterDateQueryVariables = Exact<{
  afterDate: Scalars['timestamptz']['input'];
}>;


export type GetAllProjectsAfterDateQuery = { __typename?: 'query_root', offchain?: { __typename?: 'offchain_query', Project: Array<{ __typename?: 'Project', id: string, title: string, description?: string | null, tokenId?: string | null, releaseAt?: any | null, blockchain?: any | null, storage?: any | null, pricing?: any | null, curator?: { __typename?: 'Account', id: string, status: any, username: string, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> } | null, author: { __typename?: 'Account', id: string, username: string, profile?: { __typename?: 'Profile', picture?: string | null, description?: string | null, website?: string | null, location?: string | null } | null, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> }, collaborators: Array<{ __typename?: 'ProjectCollaborator', account: { __typename?: 'Account', id: string, username: string, profile?: { __typename?: 'Profile', picture?: string | null, description?: string | null, website?: string | null, location?: string | null } | null, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> } }>, projectMedias: Array<{ __typename?: 'ProjectMedia', index: any, media: { __typename?: 'Media', id: string, url: string } }> }> } | null };

export type GetUserSubmissionsQueryVariables = Exact<{
  authorId: Scalars['uuid']['input'];
}>;


export type GetUserSubmissionsQuery = { __typename?: 'query_root', offchain?: { __typename?: 'offchain_query', Project: Array<{ __typename?: 'Project', id: string, title: string, description?: string | null, tokenId?: string | null, releaseAt?: any | null, blockchain?: any | null, storage?: any | null, pricing?: any | null, state: string, curator?: { __typename?: 'Account', id: string, status: any, username: string, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> } | null, author: { __typename?: 'Account', id: string, username: string, profile?: { __typename?: 'Profile', picture?: string | null, description?: string | null, website?: string | null, location?: string | null } | null, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> }, collaborators: Array<{ __typename?: 'ProjectCollaborator', account: { __typename?: 'Account', id: string, username: string, profile?: { __typename?: 'Profile', picture?: string | null, description?: string | null, website?: string | null, location?: string | null } | null, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> } }>, projectMedias: Array<{ __typename?: 'ProjectMedia', index: any, media: { __typename?: 'Media', id: string, url: string } }> }> } | null };

export type CreateProjectMutationVariables = Exact<{
  object: Project_Insert_Input;
}>;


export type CreateProjectMutation = { __typename?: 'mutation_root', offchain?: { __typename?: 'offchain_mutation_frontend', insert_Project_one?: { __typename?: 'Project', id: string, description?: string | null, title: string, state: string, releaseAt?: any | null, projectMedias: Array<{ __typename?: 'ProjectMedia', index: any, media: { __typename?: 'Media', id: string, name: string } }>, author: { __typename?: 'Account', id: string } } | null } | null };

export type Update_ProjectMutationVariables = Exact<{
  projectId: Scalars['uuid']['input'];
  projectData?: InputMaybe<Project_Set_Input>;
  projectMedias: Array<ProjectMedia_Insert_Input> | ProjectMedia_Insert_Input;
  projectCollaborators: Array<ProjectCollaborator_Insert_Input> | ProjectCollaborator_Insert_Input;
}>;


export type Update_ProjectMutation = { __typename?: 'mutation_root', offchain?: { __typename?: 'offchain_mutation_frontend', delete_ProjectMedia?: { __typename?: 'ProjectMedia_mutation_response', affected_rows: number } | null, delete_ProjectCollaborator?: { __typename?: 'ProjectCollaborator_mutation_response', affected_rows: number } | null, update_Project?: { __typename?: 'Project_mutation_response', affected_rows: number } | null, insert_ProjectMedia?: { __typename?: 'ProjectMedia_mutation_response', affected_rows: number } | null, insert_ProjectCollaborator?: { __typename?: 'ProjectCollaborator_mutation_response', affected_rows: number } | null } | null };

export type PrepareRedemptionMutationVariables = Exact<{
  input: PrepareRedemptionInput;
}>;


export type PrepareRedemptionMutation = { __typename?: 'mutation_root', prepare_redemption: { __typename?: 'PrepareRedemptionOutput', signature: string, payload: { __typename?: 'PrepareRedemptionPayload', consumer: string, token_id: number, options: any, salt: string } } };

export type User_BaseDetailsFragment = { __typename?: 'user', id: string, name?: string | null };

export type Wallet_BaseDetailsFragment = { __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> };

export type LinkWalletToAccountMutationVariables = Exact<{
  input: LinkWalletInput;
}>;


export type LinkWalletToAccountMutation = { __typename?: 'mutation_root', link_wallet_to_account: boolean };

export type UnlinkWalletFromAccountMutationVariables = Exact<{
  input?: InputMaybe<UnlinkWalletInput>;
}>;


export type UnlinkWalletFromAccountMutation = { __typename?: 'mutation_root', unlink_wallet_from_account: boolean };

export type WhitelistEntriesFragment = { __typename?: 'Whitelist', entries: Array<{ __typename?: 'WhitelistEntries', walletAddress: string, whitelistIndex: number }> };

export type GetWhitelistsQueryVariables = Exact<{
  where?: InputMaybe<Whitelist_Bool_Exp>;
}>;


export type GetWhitelistsQuery = { __typename?: 'query_root', offchain?: { __typename?: 'offchain_query', Whitelist: Array<{ __typename?: 'Whitelist', merkleRoot: string, entries: Array<{ __typename?: 'WhitelistEntries', walletAddress: string, whitelistIndex: number }> }> } | null };

export type GetWhitelistQueryVariables = Exact<{
  merkleRoot?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetWhitelistQuery = { __typename?: 'query_root', offchain?: { __typename?: 'offchain_query', Whitelist_by_pk?: { __typename?: 'Whitelist', merkleRoot: string, entries: Array<{ __typename?: 'WhitelistEntries', walletAddress: string, whitelistIndex: number }> } | null } | null };

export type Article_BaseDetailsFragment = { __typename?: 'article', id: number, created_at: any, slug: string, title: string, description: string, thumbnail_uri: string, thumbnail_caption?: string | null, display_uri: string, user: { __typename?: 'user', id: string, name?: string | null }, media_image?: { __typename?: 'media_image', id: any, width?: number | null, height?: number | null, placeholder?: string | null } | null };

export type Article_FullDetailsFragment = { __typename?: 'article', body: string, tags: Array<string>, language: string, editions: number, royalties: number, metadata_uri: string, metadata: any, flag: any, id: number, created_at: any, slug: string, title: string, description: string, thumbnail_uri: string, thumbnail_caption?: string | null, display_uri: string, moderation_reason?: { __typename?: 'moderation_reason', id: string, reason: string } | null, splits: Array<{ __typename?: 'split', pct: number, user: { __typename?: 'user', id: string, name?: string | null } }>, article_revisions: Array<{ __typename?: 'article_revision', iteration: any, metadata_uri: string, created_at: any, op_hash: string }>, user: { __typename?: 'user', id: string, name?: string | null }, media_image?: { __typename?: 'media_image', id: any, width?: number | null, height?: number | null, placeholder?: string | null } | null };

export type GetFullArticleByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetFullArticleByIdQuery = { __typename?: 'query_root', onchain?: { __typename?: 'onchain_query', article_by_pk?: { __typename?: 'article', body: string, tags: Array<string>, language: string, editions: number, royalties: number, metadata_uri: string, metadata: any, flag: any, id: number, created_at: any, slug: string, title: string, description: string, thumbnail_uri: string, thumbnail_caption?: string | null, display_uri: string, moderation_reason?: { __typename?: 'moderation_reason', id: string, reason: string } | null, splits: Array<{ __typename?: 'split', pct: number, user: { __typename?: 'user', id: string, name?: string | null } }>, article_revisions: Array<{ __typename?: 'article_revision', iteration: any, metadata_uri: string, created_at: any, op_hash: string }>, user: { __typename?: 'user', id: string, name?: string | null }, media_image?: { __typename?: 'media_image', id: any, width?: number | null, height?: number | null, placeholder?: string | null } | null } | null } | null };

export type GetFullArticleBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetFullArticleBySlugQuery = { __typename?: 'query_root', onchain?: { __typename?: 'onchain_query', article: Array<{ __typename?: 'article', body: string, tags: Array<string>, language: string, editions: number, royalties: number, metadata_uri: string, metadata: any, flag: any, id: number, created_at: any, slug: string, title: string, description: string, thumbnail_uri: string, thumbnail_caption?: string | null, display_uri: string, moderation_reason?: { __typename?: 'moderation_reason', id: string, reason: string } | null, splits: Array<{ __typename?: 'split', pct: number, user: { __typename?: 'user', id: string, name?: string | null } }>, article_revisions: Array<{ __typename?: 'article_revision', iteration: any, metadata_uri: string, created_at: any, op_hash: string }>, user: { __typename?: 'user', id: string, name?: string | null }, media_image?: { __typename?: 'media_image', id: any, width?: number | null, height?: number | null, placeholder?: string | null } | null }> } | null };

export type GetEthPrimarySplitsQueryVariables = Exact<{
  where?: InputMaybe<Eth_Primary_Splits_Bool_Exp>;
}>;


export type GetEthPrimarySplitsQuery = { __typename?: 'query_root', onchain?: { __typename: 'onchain_query', eth_primary_splits: Array<{ __typename?: 'eth_primary_splits', id: string, receiver: string, receivers: Array<string>, allocations: Array<number>, chain: string }> } | null };

export type GetEthSecondarySplitsQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetEthSecondarySplitsQuery = { __typename?: 'query_root', onchain?: { __typename?: 'onchain_query', eth_secondary_splits_by_pk?: { __typename?: 'eth_secondary_splits', allocations: Array<number>, basis_points: number, chain: string, id: string, receiver: string, receivers: Array<string> } | null } | null };

export type GetFrameDataQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetFrameDataQuery = { __typename?: 'query_root', onchain?: { __typename?: 'onchain_query', eth_frame_data_by_pk?: { __typename?: 'eth_frame_data', id: string, frame_minter_data?: any | null } | null } | null };

export type GenerativeToken_PricingFragment = { __typename?: 'generative_token', pricing_fixeds: Array<{ __typename?: 'pricing_fixed', price: string, opens_at?: any | null }>, pricing_dutch_auctions: Array<{ __typename?: 'pricing_dutch_auction', levels: Array<string>, resting_price: string, final_price?: string | null, decrement_duration: any, opens_at?: any | null }> };

export type Qu_GenerativeTokenByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type Qu_GenerativeTokenByIdQuery = { __typename?: 'query_root', onchain?: { __typename?: 'onchain_query', generative_token_by_pk?: { __typename?: 'generative_token', id: string, thumbnail_uri?: string | null, actions: Array<{ __typename?: 'action', id: string, chain?: string | null, created_at: any, metadata?: any | null, numeric_value?: string | null, op_hash: string, type: any, generative_token?: { __typename?: 'generative_token', id: string } | null, objkt?: { __typename?: 'objkt', id: string, iteration: number } | null, issuer?: { __typename?: 'user', id: string, wallet?: { __typename?: 'Wallet', account: { __typename?: 'Account', id: string, username: string, profile?: { __typename?: 'Profile', picture?: string | null } | null } } | null } | null, target?: { __typename?: 'user', id: string, wallet?: { __typename?: 'Wallet', account: { __typename?: 'Account', id: string, username: string, profile?: { __typename?: 'Profile', picture?: string | null } | null } } | null } | null }> } | null } | null };

export type Qu_GetObjectsOfTokenAndWalletsQueryVariables = Exact<{
  _eq?: InputMaybe<Scalars['String']['input']>;
  _iregex?: InputMaybe<Scalars['String']['input']>;
}>;


export type Qu_GetObjectsOfTokenAndWalletsQuery = { __typename?: 'query_root', onchain?: { __typename?: 'onchain_query', objkt: Array<{ __typename?: 'objkt', id: string, minter_id?: string | null, slug?: string | null, capture_media_id?: any | null }> } | null };

export type GetEthMinterProceedsQueryVariables = Exact<{
  where?: InputMaybe<Eth_Minter_Proceeds_Bool_Exp>;
}>;


export type GetEthMinterProceedsQuery = { __typename?: 'query_root', onchain?: { __typename?: 'onchain_query', eth_minter_proceeds: Array<{ __typename?: 'eth_minter_proceeds', id: string, minter_address: string, primary_receiver: string, reserve_id?: string | null, token_address: string, user_address: string, amount: string, chain: string }> } | null };

export type GetReservesQueryVariables = Exact<{
  where?: InputMaybe<Reserve_Bool_Exp>;
}>;


export type GetReservesQuery = { __typename?: 'query_root', onchain?: { __typename?: 'onchain_query', reserve: Array<{ __typename?: 'reserve', data?: any | null, id: number, method: number, token_id?: string | null, amount: string }> } | null };

export type GetActionSalesBotQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetActionSalesBotQuery = { __typename?: 'query_root', onchain?: { __typename?: 'onchain_query', action_by_pk?: { __typename?: 'action', id: string, chain?: string | null, type: any, numeric_value?: string | null, created_at: any, issuer_id?: string | null, target_id?: string | null, issuer?: { __typename?: 'user', wallet?: { __typename?: 'Wallet', account: { __typename?: 'Account', username: string } } | null } | null, user?: { __typename?: 'user', wallet?: { __typename?: 'Wallet', account: { __typename?: 'Account', username: string } } | null } | null, objkt?: { __typename?: 'objkt', id: string, slug?: string | null, name?: string | null, metadata?: any | null, thumbnail_uri?: any | null } | null, generative_token?: { __typename?: 'generative_token', id: string, thumbnail_uri?: string | null, author_id?: string | null, author?: { __typename?: 'user', wallet?: { __typename?: 'Wallet', account: { __typename?: 'Account', username: string } } | null } | null } | null } | null } | null };

export type GetTokenPricingsAndReservesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetTokenPricingsAndReservesQuery = { __typename?: 'query_root', onchain?: { __typename?: 'onchain_query', generative_token_by_pk?: { __typename?: 'generative_token', is_frame: boolean, pricing_fixeds: Array<{ __typename?: 'pricing_fixed', id: string, opens_at?: any | null, price: string }>, pricing_dutch_auctions: Array<{ __typename?: 'pricing_dutch_auction', id: string, opens_at?: any | null, levels: Array<string>, decrement_duration: any }> } | null, reserve: Array<{ __typename?: 'reserve', id: number, method: number, amount: string, data?: any | null }> } | null };

export type GetEthUserProceedsQueryVariables = Exact<{
  where?: InputMaybe<Eth_User_Proceeds_Bool_Exp>;
}>;


export type GetEthUserProceedsQuery = { __typename?: 'query_root', onchain?: { __typename?: 'onchain_query', eth_user_proceeds: Array<{ __typename?: 'eth_user_proceeds', id: string, total_proceeds: string }> } | null };

export type EstimateEvmTransactionQueryVariables = Exact<{
  input: EstimateEvmTransactionInput;
}>;


export type EstimateEvmTransactionQuery = { __typename?: 'query_root', estimate_evm_transaction?: { __typename?: 'EstimateEvmTransactionOutput', gasUsed?: string | null, error?: { __typename?: 'EstimateEvmTransactionError', message: string, revertReason?: string | null } | null, changes: Array<{ __typename?: 'EvmTransactionChanges', amount?: string | null, assetType?: string | null, changeType: string, contractAddress: string, decimals?: number | null, from: string, name?: string | null, rawAmount: string, symbol?: string | null, to: string, tokenId?: string | null }> } | null };

export const Wallet_BaseDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}}]} as unknown as DocumentNode<Wallet_BaseDetailsFragment, unknown>;
export const Account_WalletsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_Wallets"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainWallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}}]} as unknown as DocumentNode<Account_WalletsFragment, unknown>;
export const Account_BaseDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}}]} as unknown as DocumentNode<Account_BaseDetailsFragment, unknown>;
export const Project_BaseDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Project_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"releaseAt"}},{"kind":"Field","name":{"kind":"Name","value":"blockchain"}},{"kind":"Field","name":{"kind":"Name","value":"storage"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"}},{"kind":"Field","name":{"kind":"Name","value":"curator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"projectMedias"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}}]} as unknown as DocumentNode<Project_BaseDetailsFragment, unknown>;
export const Project_UserSecretsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Project_UserSecrets"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]} as unknown as DocumentNode<Project_UserSecretsFragment, unknown>;
export const WhitelistEntriesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WhitelistEntries"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Whitelist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"whitelistIndex"}}]}}]}}]} as unknown as DocumentNode<WhitelistEntriesFragment, unknown>;
export const User_BaseDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"user"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<User_BaseDetailsFragment, unknown>;
export const Article_BaseDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Article_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_uri"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_caption"}},{"kind":"Field","name":{"kind":"Name","value":"media_image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"placeholder"}}]}},{"kind":"Field","name":{"kind":"Name","value":"display_uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"user"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<Article_BaseDetailsFragment, unknown>;
export const Article_FullDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Article_FullDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Article_BaseDetails"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"editions"}},{"kind":"Field","name":{"kind":"Name","value":"royalties"}},{"kind":"Field","name":{"kind":"Name","value":"metadata_uri"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"flag"}},{"kind":"Field","name":{"kind":"Name","value":"moderation_reason"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}},{"kind":"Field","name":{"kind":"Name","value":"splits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pct"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"article_revisions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iteration"}},{"kind":"Field","name":{"kind":"Name","value":"metadata_uri"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"op_hash"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"user"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Article_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_uri"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_caption"}},{"kind":"Field","name":{"kind":"Name","value":"media_image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"placeholder"}}]}},{"kind":"Field","name":{"kind":"Name","value":"display_uri"}}]}}]} as unknown as DocumentNode<Article_FullDetailsFragment, unknown>;
export const GenerativeToken_PricingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GenerativeToken_Pricing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"generative_token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pricing_fixeds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"opens_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricing_dutch_auctions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"levels"}},{"kind":"Field","name":{"kind":"Name","value":"resting_price"}},{"kind":"Field","name":{"kind":"Name","value":"final_price"}},{"kind":"Field","name":{"kind":"Name","value":"decrement_duration"}},{"kind":"Field","name":{"kind":"Name","value":"opens_at"}}]}}]}}]} as unknown as DocumentNode<GenerativeToken_PricingFragment, unknown>;
export const CreateWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWhitelist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"whitelist"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"jsonb"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"set_whitelist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"whitelist"},"value":{"kind":"Variable","name":{"kind":"Name","value":"whitelist"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"merkleRoot"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<CreateWhitelistMutation, CreateWhitelistMutationVariables>;
export const GenerateChallengeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateChallenge"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChallengeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generate_challenge"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<GenerateChallengeMutation, GenerateChallengeMutationVariables>;
export const AuthenticateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Authenticate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthenticationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<AuthenticateMutation, AuthenticateMutationVariables>;
export const AuthenticateWeb3AuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthenticateWeb3Auth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthenticationWeb3AuthInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticate_web3auth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<AuthenticateWeb3AuthMutation, AuthenticateWeb3AuthMutationVariables>;
export const Web3AuthOAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Web3AuthOAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Web3AuthOAuthInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"web3auth_oauth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"idToken"}}]}}]}}]} as unknown as DocumentNode<Web3AuthOAuthMutation, Web3AuthOAuthMutationVariables>;
export const Web3AuthEmailRequestOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Web3AuthEmailRequestOTP"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"web3auth_email_request_otp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"attemptsLeft"}}]}}]}}]} as unknown as DocumentNode<Web3AuthEmailRequestOtpMutation, Web3AuthEmailRequestOtpMutationVariables>;
export const MyMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MyMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Web3AuthEmailAuthOTPInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"web3auth_email_auth_otp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"idToken"}}]}}]}}]} as unknown as DocumentNode<MyMutationMutation, MyMutationMutationVariables>;
export const RefreshDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Refresh"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshMutation, RefreshMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LogoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const GetAccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Account_bool_exp"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}}]} as unknown as DocumentNode<GetAccountsQuery, GetAccountsQueryVariables>;
export const GetAccountWalletsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountWallets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Account_bool_exp"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_Wallets"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_Wallets"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainWallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}}]} as unknown as DocumentNode<GetAccountWalletsQuery, GetAccountWalletsQueryVariables>;
export const GetMyAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_Wallets"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_Wallets"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainWallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}}]} as unknown as DocumentNode<GetMyAccountQuery, GetMyAccountQueryVariables>;
export const UpdateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAccountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const DeleteAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const RequestTransferWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestTransferWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestTransferWalletInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"request_transfer_wallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<RequestTransferWalletMutation, RequestTransferWalletMutationVariables>;
export const TransferWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TransferWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TransferWalletInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transfer_wallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<TransferWalletMutation, TransferWalletMutationVariables>;
export const SetFarcasterHandleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetFarcasterHandle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetFarcasterHandleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"set_farcaster_handle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]}}]} as unknown as DocumentNode<SetFarcasterHandleMutation, SetFarcasterHandleMutationVariables>;
export const AirdropTezClaimDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AirdropTezClaim"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AirdropTezClaimInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"airdrop_tez_claim"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signature"}}]}}]}}]} as unknown as DocumentNode<AirdropTezClaimMutation, AirdropTezClaimMutationVariables>;
export const Get_LibrariesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Get_Libraries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Library"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"license"}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"onchfsPointer"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authors"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"docUrl"}}]}}]}}]}}]} as unknown as DocumentNode<Get_LibrariesQuery, Get_LibrariesQueryVariables>;
export const GetAllProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Project_BaseDetails"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Project_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"releaseAt"}},{"kind":"Field","name":{"kind":"Name","value":"blockchain"}},{"kind":"Field","name":{"kind":"Name","value":"storage"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"}},{"kind":"Field","name":{"kind":"Name","value":"curator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"projectMedias"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllProjectsQuery, GetAllProjectsQueryVariables>;
export const GetAllProjectsAfterDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllProjectsAfterDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"afterDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"timestamptz"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"releaseAt"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"afterDate"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Project_BaseDetails"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Project_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"releaseAt"}},{"kind":"Field","name":{"kind":"Name","value":"blockchain"}},{"kind":"Field","name":{"kind":"Name","value":"storage"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"}},{"kind":"Field","name":{"kind":"Name","value":"curator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"projectMedias"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllProjectsAfterDateQuery, GetAllProjectsAfterDateQueryVariables>;
export const GetUserSubmissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserSubmissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"authorId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Project_BaseDetails"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Project_UserSecrets"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Project_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"releaseAt"}},{"kind":"Field","name":{"kind":"Name","value":"blockchain"}},{"kind":"Field","name":{"kind":"Name","value":"storage"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"}},{"kind":"Field","name":{"kind":"Name","value":"curator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"projectMedias"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Project_UserSecrets"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]} as unknown as DocumentNode<GetUserSubmissionsQuery, GetUserSubmissionsQueryVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"object"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Project_insert_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_Project_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"Variable","name":{"kind":"Name","value":"object"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectMedias"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"releaseAt"}}]}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const Update_ProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Update_Project"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectData"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Project_set_input"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectMedias"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectMedia_insert_input"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectCollaborators"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectCollaborator_insert_input"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_ProjectMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}},{"kind":"Field","name":{"kind":"Name","value":"delete_ProjectCollaborator"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}},{"kind":"Field","name":{"kind":"Name","value":"update_Project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}},{"kind":"Field","name":{"kind":"Name","value":"insert_ProjectMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectMedias"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}},{"kind":"Field","name":{"kind":"Name","value":"insert_ProjectCollaborator"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectCollaborators"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}}]}}]}}]} as unknown as DocumentNode<Update_ProjectMutation, Update_ProjectMutationVariables>;
export const PrepareRedemptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PrepareRedemption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrepareRedemptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"prepare_redemption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"consumer"}},{"kind":"Field","name":{"kind":"Name","value":"token_id"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"salt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"signature"}}]}}]}}]} as unknown as DocumentNode<PrepareRedemptionMutation, PrepareRedemptionMutationVariables>;
export const LinkWalletToAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LinkWalletToAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LinkWalletInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link_wallet_to_account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<LinkWalletToAccountMutation, LinkWalletToAccountMutationVariables>;
export const UnlinkWalletFromAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnlinkWalletFromAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnlinkWalletInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlink_wallet_from_account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UnlinkWalletFromAccountMutation, UnlinkWalletFromAccountMutationVariables>;
export const GetWhitelistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWhitelists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Whitelist_bool_exp"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Whitelist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"merkleRoot"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WhitelistEntries"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WhitelistEntries"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Whitelist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"whitelistIndex"}}]}}]}}]} as unknown as DocumentNode<GetWhitelistsQuery, GetWhitelistsQueryVariables>;
export const GetWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWhitelist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"merkleRoot"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Whitelist_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"merkleRoot"},"value":{"kind":"Variable","name":{"kind":"Name","value":"merkleRoot"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"merkleRoot"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WhitelistEntries"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WhitelistEntries"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Whitelist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"whitelistIndex"}}]}}]}}]} as unknown as DocumentNode<GetWhitelistQuery, GetWhitelistQueryVariables>;
export const GetFullArticleByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFullArticleById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"article_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Article_FullDetails"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"user"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Article_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_uri"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_caption"}},{"kind":"Field","name":{"kind":"Name","value":"media_image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"placeholder"}}]}},{"kind":"Field","name":{"kind":"Name","value":"display_uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Article_FullDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Article_BaseDetails"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"editions"}},{"kind":"Field","name":{"kind":"Name","value":"royalties"}},{"kind":"Field","name":{"kind":"Name","value":"metadata_uri"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"flag"}},{"kind":"Field","name":{"kind":"Name","value":"moderation_reason"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}},{"kind":"Field","name":{"kind":"Name","value":"splits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pct"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"article_revisions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iteration"}},{"kind":"Field","name":{"kind":"Name","value":"metadata_uri"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"op_hash"}}]}}]}}]} as unknown as DocumentNode<GetFullArticleByIdQuery, GetFullArticleByIdQueryVariables>;
export const GetFullArticleBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFullArticleBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"article"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Article_FullDetails"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"user"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Article_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_uri"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_caption"}},{"kind":"Field","name":{"kind":"Name","value":"media_image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"placeholder"}}]}},{"kind":"Field","name":{"kind":"Name","value":"display_uri"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Article_FullDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Article_BaseDetails"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"editions"}},{"kind":"Field","name":{"kind":"Name","value":"royalties"}},{"kind":"Field","name":{"kind":"Name","value":"metadata_uri"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"flag"}},{"kind":"Field","name":{"kind":"Name","value":"moderation_reason"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}},{"kind":"Field","name":{"kind":"Name","value":"splits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pct"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"article_revisions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iteration"}},{"kind":"Field","name":{"kind":"Name","value":"metadata_uri"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"op_hash"}}]}}]}}]} as unknown as DocumentNode<GetFullArticleBySlugQuery, GetFullArticleBySlugQueryVariables>;
export const GetEthPrimarySplitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEthPrimarySplits"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"eth_primary_splits_bool_exp"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"eth_primary_splits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"receiver"}},{"kind":"Field","name":{"kind":"Name","value":"receivers"}},{"kind":"Field","name":{"kind":"Name","value":"allocations"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}}]}}]}}]} as unknown as DocumentNode<GetEthPrimarySplitsQuery, GetEthPrimarySplitsQueryVariables>;
export const GetEthSecondarySplitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEthSecondarySplits"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eth_secondary_splits_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allocations"}},{"kind":"Field","name":{"kind":"Name","value":"basis_points"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"receiver"}},{"kind":"Field","name":{"kind":"Name","value":"receivers"}}]}}]}}]}}]} as unknown as DocumentNode<GetEthSecondarySplitsQuery, GetEthSecondarySplitsQueryVariables>;
export const GetFrameDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFrameData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eth_frame_data_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frame_minter_data"}}]}}]}}]}}]} as unknown as DocumentNode<GetFrameDataQuery, GetFrameDataQueryVariables>;
export const Qu_GenerativeTokenByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Qu_GenerativeTokenById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generative_token_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"generative_token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"objkt"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"iteration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"issuer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"numeric_value"}},{"kind":"Field","name":{"kind":"Name","value":"op_hash"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_uri"}}]}}]}}]}}]} as unknown as DocumentNode<Qu_GenerativeTokenByIdQuery, Qu_GenerativeTokenByIdQueryVariables>;
export const Qu_GetObjectsOfTokenAndWalletsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Qu_GetObjectsOfTokenAndWallets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_eq"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_iregex"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"objkt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"generative_token"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_eq"}}}]}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"minter_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_iregex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_iregex"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minter_id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"capture_media_id"}}]}}]}}]}}]} as unknown as DocumentNode<Qu_GetObjectsOfTokenAndWalletsQuery, Qu_GetObjectsOfTokenAndWalletsQueryVariables>;
export const GetEthMinterProceedsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEthMinterProceeds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"eth_minter_proceeds_bool_exp"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eth_minter_proceeds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minter_address"}},{"kind":"Field","name":{"kind":"Name","value":"primary_receiver"}},{"kind":"Field","name":{"kind":"Name","value":"reserve_id"}},{"kind":"Field","name":{"kind":"Name","value":"token_address"}},{"kind":"Field","name":{"kind":"Name","value":"user_address"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}}]}}]}}]} as unknown as DocumentNode<GetEthMinterProceedsQuery, GetEthMinterProceedsQueryVariables>;
export const GetReservesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReserves"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"reserve_bool_exp"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reserve"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"token_id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]} as unknown as DocumentNode<GetReservesQuery, GetReservesQueryVariables>;
export const GetActionSalesBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetActionSalesBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"numeric_value"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"issuer_id"}},{"kind":"Field","name":{"kind":"Name","value":"issuer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"target_id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"objkt"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"generative_token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_uri"}},{"kind":"Field","name":{"kind":"Name","value":"author_id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetActionSalesBotQuery, GetActionSalesBotQueryVariables>;
export const GetTokenPricingsAndReservesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTokenPricingsAndReserves"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generative_token_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"is_frame"}},{"kind":"Field","name":{"kind":"Name","value":"pricing_fixeds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"opens_at"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricing_dutch_auctions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"opens_at"}},{"kind":"Field","name":{"kind":"Name","value":"levels"}},{"kind":"Field","name":{"kind":"Name","value":"decrement_duration"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"reserve"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"token_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<GetTokenPricingsAndReservesQuery, GetTokenPricingsAndReservesQueryVariables>;
export const GetEthUserProceedsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEthUserProceeds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"eth_user_proceeds_bool_exp"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eth_user_proceeds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_proceeds"}}]}}]}}]}}]} as unknown as DocumentNode<GetEthUserProceedsQuery, GetEthUserProceedsQueryVariables>;
export const EstimateEvmTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EstimateEvmTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EstimateEvmTransactionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"estimate_evm_transaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"revertReason"}}]}},{"kind":"Field","name":{"kind":"Name","value":"changes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"assetType"}},{"kind":"Field","name":{"kind":"Name","value":"changeType"}},{"kind":"Field","name":{"kind":"Name","value":"contractAddress"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rawAmount"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gasUsed"}}]}}]}}]} as unknown as DocumentNode<EstimateEvmTransactionQuery, EstimateEvmTransactionQueryVariables>;