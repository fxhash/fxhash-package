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
  ProjectState: { input: string; output: string; }
  Storage: { input: any; output: any; }
  action_type_enum: { input: any; output: any; }
  article_flag_enum: { input: any; output: any; }
  bigint: { input: any; output: any; }
  bpchar: { input: any; output: any; }
  codex_type_enum: { input: any; output: any; }
  codex_update_request_status_enum: { input: any; output: any; }
  float8: { input: any; output: any; }
  generative_token_flag_enum: { input: any; output: any; }
  generative_token_version: { input: any; output: any; }
  gentk_assign_state_enum: { input: any; output: any; }
  indexing_target_type_enum: { input: any; output: any; }
  json: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  numeric: { input: any; output: any; }
  smallint: { input: any; output: any; }
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
  /** An object relationship */
  mainWallet: Wallet;
  /** An array relationship */
  profile: Array<Profile>;
  /** An array relationship */
  roles: Array<AccountsRoles>;
  status: Scalars['AccountStatus']['output'];
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
export type AccountProfileArgs = {
  distinct_on?: InputMaybe<Array<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
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

/** Boolean expression to filter rows from the table "Account". All fields are combined with a logical 'AND'. */
export type Account_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Bool_Exp>>;
  _not?: InputMaybe<Account_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Bool_Exp>>;
  authoredProjects?: InputMaybe<Project_Bool_Exp>;
  collaboratedProjects?: InputMaybe<ProjectCollaborator_Bool_Exp>;
  curatedProjects?: InputMaybe<Project_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  mainWallet?: InputMaybe<Wallet_Bool_Exp>;
  profile?: InputMaybe<Profile_Bool_Exp>;
  roles?: InputMaybe<AccountsRoles_Bool_Exp>;
  status?: InputMaybe<AccountStatus_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
  wallets?: InputMaybe<Wallet_Bool_Exp>;
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
  mainWallet?: InputMaybe<Wallet_Order_By>;
  profile_aggregate?: InputMaybe<Profile_Aggregate_Order_By>;
  roles_aggregate?: InputMaybe<AccountsRoles_Aggregate_Order_By>;
  status?: InputMaybe<Order_By>;
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

/** Boolean expression to compare columns of type "Float". All fields are combined with logical 'AND'. */
export type Float_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Float']['input']>;
  _gt?: InputMaybe<Scalars['Float']['input']>;
  _gte?: InputMaybe<Scalars['Float']['input']>;
  _in?: InputMaybe<Array<Scalars['Float']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Float']['input']>;
  _lte?: InputMaybe<Scalars['Float']['input']>;
  _neq?: InputMaybe<Scalars['Float']['input']>;
  _nin?: InputMaybe<Array<Scalars['Float']['input']>>;
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

/** columns and relationships of "Media" */
export type Media = {
  __typename?: 'Media';
  createdAt: Scalars['timestamptz']['output'];
  etag: Scalars['String']['output'];
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

/** columns and relationships of "Profile" */
export type Profile = {
  __typename?: 'Profile';
  accountId: Scalars['uuid']['output'];
  description?: Maybe<Scalars['String']['output']>;
  instagram?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

/** order by aggregate values of table "Profile" */
export type Profile_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Profile_Max_Order_By>;
  min?: InputMaybe<Profile_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "Profile". All fields are combined with a logical 'AND'. */
export type Profile_Bool_Exp = {
  _and?: InputMaybe<Array<Profile_Bool_Exp>>;
  _not?: InputMaybe<Profile_Bool_Exp>;
  _or?: InputMaybe<Array<Profile_Bool_Exp>>;
  accountId?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  instagram?: InputMaybe<String_Comparison_Exp>;
  picture?: InputMaybe<String_Comparison_Exp>;
  twitter?: InputMaybe<String_Comparison_Exp>;
  website?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "Profile" */
export type Profile_Max_Order_By = {
  accountId?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  instagram?: InputMaybe<Order_By>;
  picture?: InputMaybe<Order_By>;
  twitter?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "Profile" */
export type Profile_Min_Order_By = {
  accountId?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  instagram?: InputMaybe<Order_By>;
  picture?: InputMaybe<Order_By>;
  twitter?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
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
  instagram?: InputMaybe<Order_By>;
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
  Instagram = 'instagram',
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
  instagram?: InputMaybe<Scalars['String']['input']>;
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
  /** unique or primary key constraint on columns "index", "mediaId", "projectId" */
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

/** columns and relationships of "Wallet" */
export type Wallet = {
  __typename?: 'Wallet';
  /** An object relationship */
  account: Account;
  accountId: Scalars['uuid']['output'];
  address: Scalars['String']['output'];
  network: Scalars['BlockchainNetwork']['output'];
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
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  generative_token?: Maybe<Generative_Token>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  issuer?: Maybe<User>;
  issuer_id?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['jsonb']['output']>;
  numeric_value?: Maybe<Scalars['numeric']['output']>;
  /** An object relationship */
  objkt?: Maybe<Objkt>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  op_hash: Scalars['String']['output'];
  /** An object relationship */
  redeemable?: Maybe<Redeemable>;
  redeemable_address?: Maybe<Scalars['String']['output']>;
  target_id?: Maybe<Scalars['String']['output']>;
  ticket_id?: Maybe<Scalars['String']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
  type: Scalars['action_type_enum']['output'];
  /** An object relationship */
  user?: Maybe<User>;
  /** An object relationship */
  userByIssuerId?: Maybe<User>;
};


/** columns and relationships of "action" */
export type ActionMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
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
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  issuer?: InputMaybe<User_Bool_Exp>;
  issuer_id?: InputMaybe<String_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  numeric_value?: InputMaybe<Numeric_Comparison_Exp>;
  objkt?: InputMaybe<Objkt_Bool_Exp>;
  objkt_id?: InputMaybe<String_Comparison_Exp>;
  op_hash?: InputMaybe<String_Comparison_Exp>;
  redeemable?: InputMaybe<Redeemable_Bool_Exp>;
  redeemable_address?: InputMaybe<String_Comparison_Exp>;
  target_id?: InputMaybe<String_Comparison_Exp>;
  ticket_id?: InputMaybe<String_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<Action_Type_Enum_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userByIssuerId?: InputMaybe<User_Bool_Exp>;
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
  created_at?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  id?: InputMaybe<Order_By>;
  issuer?: InputMaybe<User_Order_By>;
  issuer_id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
  objkt?: InputMaybe<Objkt_Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  op_hash?: InputMaybe<Order_By>;
  redeemable?: InputMaybe<Redeemable_Order_By>;
  redeemable_address?: InputMaybe<Order_By>;
  target_id?: InputMaybe<Order_By>;
  ticket_id?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userByIssuerId?: InputMaybe<User_Order_By>;
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

/** order by stddev() on columns of table "action" */
export type Action_Stddev_Order_By = {
  article_id?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "action" */
export type Action_Stddev_Pop_Order_By = {
  article_id?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
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

/** order by var_pop() on columns of table "action" */
export type Action_Var_Pop_Order_By = {
  article_id?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "action" */
export type Action_Var_Samp_Order_By = {
  article_id?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "action" */
export type Action_Variance_Order_By = {
  article_id?: InputMaybe<Order_By>;
  numeric_value?: InputMaybe<Order_By>;
};

/** columns and relationships of "article" */
export type Article = {
  __typename?: 'article';
  /** An array relationship */
  actions: Array<Action>;
  /** An array relationship */
  article_ledgers: Array<Article_Ledger>;
  /** An array relationship */
  article_revisions: Array<Article_Revision>;
  artifact_uri: Scalars['String']['output'];
  author_id: Scalars['String']['output'];
  body: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  description: Scalars['String']['output'];
  display_uri: Scalars['String']['output'];
  editions: Scalars['bigint']['output'];
  flag: Scalars['article_flag_enum']['output'];
  id: Scalars['Int']['output'];
  language: Scalars['String']['output'];
  /** An array relationship */
  listings: Array<Listing>;
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
export type ArticleArticle_LedgersArgs = {
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
  article_ledgers?: InputMaybe<Article_Ledger_Bool_Exp>;
  article_revisions?: InputMaybe<Article_Revision_Bool_Exp>;
  artifact_uri?: InputMaybe<String_Comparison_Exp>;
  author_id?: InputMaybe<String_Comparison_Exp>;
  body?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  display_uri?: InputMaybe<String_Comparison_Exp>;
  editions?: InputMaybe<Bigint_Comparison_Exp>;
  flag?: InputMaybe<Article_Flag_Enum_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  language?: InputMaybe<String_Comparison_Exp>;
  listings?: InputMaybe<Listing_Bool_Exp>;
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

/** Boolean expression to filter rows from the table "article_generative_token". All fields are combined with a logical 'AND'. */
export type Article_Generative_Token_Bool_Exp = {
  _and?: InputMaybe<Array<Article_Generative_Token_Bool_Exp>>;
  _not?: InputMaybe<Article_Generative_Token_Bool_Exp>;
  _or?: InputMaybe<Array<Article_Generative_Token_Bool_Exp>>;
  article_id?: InputMaybe<Int_Comparison_Exp>;
  generative_token_id?: InputMaybe<String_Comparison_Exp>;
  line?: InputMaybe<Int_Comparison_Exp>;
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
};

/** order by max() on columns of table "article_ledger" */
export type Article_Ledger_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
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

/** order by stddev() on columns of table "article_ledger" */
export type Article_Ledger_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "article_ledger" */
export type Article_Ledger_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
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

/** order by sum() on columns of table "article_ledger" */
export type Article_Ledger_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "article_ledger" */
export type Article_Ledger_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "article_ledger" */
export type Article_Ledger_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "article_ledger" */
export type Article_Ledger_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
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

/** order by stddev() on columns of table "article" */
export type Article_Stddev_Order_By = {
  editions?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "article" */
export type Article_Stddev_Pop_Order_By = {
  editions?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
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
  editions?: InputMaybe<Scalars['bigint']['input']>;
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

/** order by sum() on columns of table "article" */
export type Article_Sum_Order_By = {
  editions?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "article" */
export type Article_Var_Pop_Order_By = {
  editions?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "article" */
export type Article_Var_Samp_Order_By = {
  editions?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
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
  collaborator_id: Scalars['String']['output'];
  /** An object relationship */
  user: User;
  /** An object relationship */
  userByCollaboratorId: User;
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
  collaborator_id?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userByCollaboratorId?: InputMaybe<User_Bool_Exp>;
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
  collaborator_id?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userByCollaboratorId?: InputMaybe<User_Order_By>;
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
  TokenId = 'token_id',
  /** column name */
  Version = 'version'
}

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

/** columns and relationships of "eth_minter_proceeds" */
export type Eth_Minter_Proceeds = {
  __typename?: 'eth_minter_proceeds';
  amount: Scalars['numeric']['output'];
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
  id?: InputMaybe<String_Comparison_Exp>;
  receiver?: InputMaybe<String_Comparison_Exp>;
  receivers?: InputMaybe<String_Array_Comparison_Exp>;
};

/** Ordering options when selecting data from "eth_primary_splits". */
export type Eth_Primary_Splits_Order_By = {
  allocations?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  receiver?: InputMaybe<Order_By>;
  receivers?: InputMaybe<Order_By>;
};

/** select columns of table "eth_primary_splits" */
export enum Eth_Primary_Splits_Select_Column {
  /** column name */
  Allocations = 'allocations',
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
  id?: InputMaybe<Scalars['String']['input']>;
  receiver?: InputMaybe<Scalars['String']['input']>;
  receivers?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** columns and relationships of "eth_secondary_splits" */
export type Eth_Secondary_Splits = {
  __typename?: 'eth_secondary_splits';
  allocations: Array<Scalars['Int']['output']>;
  basis_points: Scalars['Int']['output'];
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
  id?: InputMaybe<String_Comparison_Exp>;
  receiver?: InputMaybe<String_Comparison_Exp>;
  receivers?: InputMaybe<String_Array_Comparison_Exp>;
};

/** Ordering options when selecting data from "eth_secondary_splits". */
export type Eth_Secondary_Splits_Order_By = {
  allocations?: InputMaybe<Order_By>;
  basis_points?: InputMaybe<Order_By>;
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
  id?: InputMaybe<Scalars['String']['input']>;
  receiver?: InputMaybe<Scalars['String']['input']>;
  receivers?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** columns and relationships of "eth_user_proceeds" */
export type Eth_User_Proceeds = {
  __typename?: 'eth_user_proceeds';
  id: Scalars['String']['output'];
  total_proceeds: Scalars['numeric']['output'];
};

/** Boolean expression to filter rows from the table "eth_user_proceeds". All fields are combined with a logical 'AND'. */
export type Eth_User_Proceeds_Bool_Exp = {
  _and?: InputMaybe<Array<Eth_User_Proceeds_Bool_Exp>>;
  _not?: InputMaybe<Eth_User_Proceeds_Bool_Exp>;
  _or?: InputMaybe<Array<Eth_User_Proceeds_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
  total_proceeds?: InputMaybe<Numeric_Comparison_Exp>;
};

/** Ordering options when selecting data from "eth_user_proceeds". */
export type Eth_User_Proceeds_Order_By = {
  id?: InputMaybe<Order_By>;
  total_proceeds?: InputMaybe<Order_By>;
};

/** select columns of table "eth_user_proceeds" */
export enum Eth_User_Proceeds_Select_Column {
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

/** columns and relationships of "generative_token" */
export type Generative_Token = {
  __typename?: 'generative_token';
  /** An array relationship */
  actions: Array<Action>;
  /** An object relationship */
  author?: Maybe<User>;
  author_id?: Maybe<Scalars['String']['output']>;
  balance: Scalars['numeric']['output'];
  capture_media_id?: Maybe<Scalars['bpchar']['output']>;
  /** An object relationship */
  codex?: Maybe<Codex>;
  codex_id?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  codex_update_requests: Array<Codex_Update_Request>;
  /** An array relationship */
  collection_offers: Array<Collection_Offer>;
  created_at: Scalars['timestamptz']['output'];
  display_uri?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  flag: Scalars['generative_token_flag_enum']['output'];
  generative_uri?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  input_bytes_size: Scalars['Int']['output'];
  iterations_count?: Maybe<Scalars['numeric']['output']>;
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
  /** An object relationship */
  moderation_reason?: Maybe<Moderation_Reason>;
  moderation_reason_id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  objkts: Array<Objkt>;
  open_editions: Scalars['Boolean']['output'];
  open_editions_ends_at?: Maybe<Scalars['timestamptz']['output']>;
  original_supply: Scalars['numeric']['output'];
  params_definition?: Maybe<Scalars['json']['output']>;
  preview_input_bytes?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  pricing_dutch_auctions: Array<Pricing_Dutch_Auction>;
  /** An array relationship */
  pricing_fixeds: Array<Pricing_Fixed>;
  /** An array relationship */
  redeemables: Array<Redeemable>;
  /** An array relationship */
  reports: Array<Report>;
  /** An array relationship */
  reserves: Array<Reserve>;
  royalties: Scalars['Int']['output'];
  slug?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  splits: Array<Split>;
  /** An array relationship */
  splitsByGenerativeTokenPrimaryId: Array<Split>;
  supply: Scalars['numeric']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  thumbnail_uri?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  transactions: Array<Transaction>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user?: Maybe<User>;
  version: Scalars['generative_token_version']['output'];
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
export type Generative_TokenObjktsArgs = {
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
export type Generative_TokenReservesArgs = {
  distinct_on?: InputMaybe<Array<Reserve_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reserve_Order_By>>;
  where?: InputMaybe<Reserve_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenSplitsArgs = {
  distinct_on?: InputMaybe<Array<Split_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Split_Order_By>>;
  where?: InputMaybe<Split_Bool_Exp>;
};


/** columns and relationships of "generative_token" */
export type Generative_TokenSplitsByGenerativeTokenPrimaryIdArgs = {
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
  actions?: InputMaybe<Action_Bool_Exp>;
  author?: InputMaybe<User_Bool_Exp>;
  author_id?: InputMaybe<String_Comparison_Exp>;
  balance?: InputMaybe<Numeric_Comparison_Exp>;
  capture_media_id?: InputMaybe<Bpchar_Comparison_Exp>;
  codex?: InputMaybe<Codex_Bool_Exp>;
  codex_id?: InputMaybe<String_Comparison_Exp>;
  codex_update_requests?: InputMaybe<Codex_Update_Request_Bool_Exp>;
  collection_offers?: InputMaybe<Collection_Offer_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  display_uri?: InputMaybe<String_Comparison_Exp>;
  enabled?: InputMaybe<Boolean_Comparison_Exp>;
  flag?: InputMaybe<Generative_Token_Flag_Enum_Comparison_Exp>;
  generative_uri?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  input_bytes_size?: InputMaybe<Int_Comparison_Exp>;
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
  moderation_reason?: InputMaybe<Moderation_Reason_Bool_Exp>;
  moderation_reason_id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  objkts?: InputMaybe<Objkt_Bool_Exp>;
  open_editions?: InputMaybe<Boolean_Comparison_Exp>;
  open_editions_ends_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  original_supply?: InputMaybe<Numeric_Comparison_Exp>;
  params_definition?: InputMaybe<Json_Comparison_Exp>;
  preview_input_bytes?: InputMaybe<String_Comparison_Exp>;
  pricing_dutch_auctions?: InputMaybe<Pricing_Dutch_Auction_Bool_Exp>;
  pricing_fixeds?: InputMaybe<Pricing_Fixed_Bool_Exp>;
  redeemables?: InputMaybe<Redeemable_Bool_Exp>;
  reports?: InputMaybe<Report_Bool_Exp>;
  reserves?: InputMaybe<Reserve_Bool_Exp>;
  royalties?: InputMaybe<Int_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  splits?: InputMaybe<Split_Bool_Exp>;
  splitsByGenerativeTokenPrimaryId?: InputMaybe<Split_Bool_Exp>;
  supply?: InputMaybe<Numeric_Comparison_Exp>;
  tags?: InputMaybe<String_Array_Comparison_Exp>;
  thumbnail_uri?: InputMaybe<String_Comparison_Exp>;
  transactions?: InputMaybe<Transaction_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  version?: InputMaybe<Generative_Token_Version_Comparison_Exp>;
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

/** order by max() on columns of table "generative_token" */
export type Generative_Token_Max_Order_By = {
  author_id?: InputMaybe<Order_By>;
  balance?: InputMaybe<Order_By>;
  capture_media_id?: InputMaybe<Order_By>;
  codex_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
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

/** order by min() on columns of table "generative_token" */
export type Generative_Token_Min_Order_By = {
  author_id?: InputMaybe<Order_By>;
  balance?: InputMaybe<Order_By>;
  capture_media_id?: InputMaybe<Order_By>;
  codex_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
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
  actions_aggregate?: InputMaybe<Action_Aggregate_Order_By>;
  author?: InputMaybe<User_Order_By>;
  author_id?: InputMaybe<Order_By>;
  balance?: InputMaybe<Order_By>;
  capture_media_id?: InputMaybe<Order_By>;
  codex?: InputMaybe<Codex_Order_By>;
  codex_id?: InputMaybe<Order_By>;
  codex_update_requests_aggregate?: InputMaybe<Codex_Update_Request_Aggregate_Order_By>;
  collection_offers_aggregate?: InputMaybe<Collection_Offer_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  display_uri?: InputMaybe<Order_By>;
  enabled?: InputMaybe<Order_By>;
  flag?: InputMaybe<Order_By>;
  generative_uri?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  input_bytes_size?: InputMaybe<Order_By>;
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
  reports_aggregate?: InputMaybe<Report_Aggregate_Order_By>;
  reserves_aggregate?: InputMaybe<Reserve_Aggregate_Order_By>;
  royalties?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  splitsByGenerativeTokenPrimaryId_aggregate?: InputMaybe<Split_Aggregate_Order_By>;
  splits_aggregate?: InputMaybe<Split_Aggregate_Order_By>;
  supply?: InputMaybe<Order_By>;
  tags?: InputMaybe<Order_By>;
  thumbnail_uri?: InputMaybe<Order_By>;
  transactions_aggregate?: InputMaybe<Transaction_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  version?: InputMaybe<Order_By>;
};

/** select columns of table "generative_token" */
export enum Generative_Token_Select_Column {
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
  author_id?: InputMaybe<Scalars['String']['input']>;
  balance?: InputMaybe<Scalars['numeric']['input']>;
  capture_media_id?: InputMaybe<Scalars['bpchar']['input']>;
  codex_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  display_uri?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  flag?: InputMaybe<Scalars['generative_token_flag_enum']['input']>;
  generative_uri?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  input_bytes_size?: InputMaybe<Scalars['Int']['input']>;
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
  /** An object relationship */
  marketStatByIdVersion?: Maybe<Market_Stats>;
  /** An object relationship */
  marketStatByVersionId?: Maybe<Market_Stats>;
  /** An array relationship */
  marketStatsHistoriesByFloorlistingversionFloorlistingid: Array<Market_Stats_History>;
  /** An array relationship */
  marketStatsHistoriesByHighestsoldlistingversionHighestsoldlistingid: Array<Market_Stats_History>;
  /** An object relationship */
  market_stat?: Maybe<Market_Stats>;
  /** An array relationship */
  market_stats_histories: Array<Market_Stats_History>;
  metadata?: Maybe<Scalars['jsonb']['output']>;
  /** An object relationship */
  objkt?: Maybe<Objkt>;
  objkt_id?: Maybe<Scalars['String']['output']>;
  price: Scalars['numeric']['output'];
  royalties: Scalars['Int']['output'];
  /** An object relationship */
  user?: Maybe<User>;
  /** An object relationship */
  userByAcceptedById?: Maybe<User>;
  version: Scalars['Int']['output'];
};


/** columns and relationships of "listing" */
export type ListingMarketStatsHistoriesByFloorlistingversionFloorlistingidArgs = {
  distinct_on?: InputMaybe<Array<Market_Stats_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Stats_History_Order_By>>;
  where?: InputMaybe<Market_Stats_History_Bool_Exp>;
};


/** columns and relationships of "listing" */
export type ListingMarketStatsHistoriesByHighestsoldlistingversionHighestsoldlistingidArgs = {
  distinct_on?: InputMaybe<Array<Market_Stats_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Stats_History_Order_By>>;
  where?: InputMaybe<Market_Stats_History_Bool_Exp>;
};


/** columns and relationships of "listing" */
export type ListingMarket_Stats_HistoriesArgs = {
  distinct_on?: InputMaybe<Array<Market_Stats_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Stats_History_Order_By>>;
  where?: InputMaybe<Market_Stats_History_Bool_Exp>;
};


/** columns and relationships of "listing" */
export type ListingMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
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
  marketStatByIdVersion?: InputMaybe<Market_Stats_Bool_Exp>;
  marketStatByVersionId?: InputMaybe<Market_Stats_Bool_Exp>;
  marketStatsHistoriesByFloorlistingversionFloorlistingid?: InputMaybe<Market_Stats_History_Bool_Exp>;
  marketStatsHistoriesByHighestsoldlistingversionHighestsoldlistingid?: InputMaybe<Market_Stats_History_Bool_Exp>;
  market_stat?: InputMaybe<Market_Stats_Bool_Exp>;
  market_stats_histories?: InputMaybe<Market_Stats_History_Bool_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  objkt?: InputMaybe<Objkt_Bool_Exp>;
  objkt_id?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  royalties?: InputMaybe<Int_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userByAcceptedById?: InputMaybe<User_Bool_Exp>;
  version?: InputMaybe<Int_Comparison_Exp>;
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
  version?: InputMaybe<Order_By>;
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
  marketStatByIdVersion?: InputMaybe<Market_Stats_Order_By>;
  marketStatByVersionId?: InputMaybe<Market_Stats_Order_By>;
  marketStatsHistoriesByFloorlistingversionFloorlistingid_aggregate?: InputMaybe<Market_Stats_History_Aggregate_Order_By>;
  marketStatsHistoriesByHighestsoldlistingversionHighestsoldlistingid_aggregate?: InputMaybe<Market_Stats_History_Aggregate_Order_By>;
  market_stat?: InputMaybe<Market_Stats_Order_By>;
  market_stats_histories_aggregate?: InputMaybe<Market_Stats_History_Aggregate_Order_By>;
  metadata?: InputMaybe<Order_By>;
  objkt?: InputMaybe<Objkt_Order_By>;
  objkt_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
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
  Version = 'version'
}

/** order by stddev() on columns of table "listing" */
export type Listing_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "listing" */
export type Listing_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
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
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** order by sum() on columns of table "listing" */
export type Listing_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "listing" */
export type Listing_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "listing" */
export type Listing_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  article_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
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
  average_sale_price?: Maybe<Scalars['numeric']['output']>;
  floor_listing_id?: Maybe<Scalars['String']['output']>;
  floor_listing_version?: Maybe<Scalars['Int']['output']>;
  from?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  generative_token: Generative_Token;
  highest_collection_offer?: Maybe<Scalars['numeric']['output']>;
  highest_sold?: Maybe<Scalars['numeric']['output']>;
  highest_sold7d?: Maybe<Scalars['numeric']['output']>;
  highest_sold24?: Maybe<Scalars['numeric']['output']>;
  highest_sold30d?: Maybe<Scalars['numeric']['output']>;
  highest_sold_listing_id?: Maybe<Scalars['String']['output']>;
  highest_sold_listing_version?: Maybe<Scalars['Int']['output']>;
  listed?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  listing?: Maybe<Listing>;
  /** An object relationship */
  listingByFloorlistingversionFloorlistingid?: Maybe<Listing>;
  /** An object relationship */
  listingByLowestsoldlistingidLowestsoldlistingversion?: Maybe<Listing>;
  longest_average_held_in_seconds?: Maybe<Scalars['bigint']['output']>;
  lowest_sold?: Maybe<Scalars['numeric']['output']>;
  lowest_sold7d?: Maybe<Scalars['numeric']['output']>;
  lowest_sold24?: Maybe<Scalars['numeric']['output']>;
  lowest_sold30d?: Maybe<Scalars['numeric']['output']>;
  lowest_sold_listing_id?: Maybe<Scalars['String']['output']>;
  lowest_sold_listing_version?: Maybe<Scalars['Int']['output']>;
  median?: Maybe<Scalars['numeric']['output']>;
  percent_listed?: Maybe<Scalars['Float']['output']>;
  percent_never_listed?: Maybe<Scalars['Float']['output']>;
  prim_volume_nb?: Maybe<Scalars['Int']['output']>;
  prim_volume_tz?: Maybe<Scalars['numeric']['output']>;
  sec_volume_nb?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb7d?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb24?: Maybe<Scalars['Int']['output']>;
  sec_volume_nb30d?: Maybe<Scalars['Int']['output']>;
  sec_volume_tz?: Maybe<Scalars['numeric']['output']>;
  sec_volume_tz7d?: Maybe<Scalars['numeric']['output']>;
  sec_volume_tz24?: Maybe<Scalars['numeric']['output']>;
  sec_volume_tz30d?: Maybe<Scalars['numeric']['output']>;
  to?: Maybe<Scalars['timestamptz']['output']>;
  token_id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "market_stats". All fields are combined with a logical 'AND'. */
export type Market_Stats_Bool_Exp = {
  _and?: InputMaybe<Array<Market_Stats_Bool_Exp>>;
  _not?: InputMaybe<Market_Stats_Bool_Exp>;
  _or?: InputMaybe<Array<Market_Stats_Bool_Exp>>;
  average_sale_price?: InputMaybe<Numeric_Comparison_Exp>;
  floor_listing_id?: InputMaybe<String_Comparison_Exp>;
  floor_listing_version?: InputMaybe<Int_Comparison_Exp>;
  from?: InputMaybe<Timestamptz_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  highest_collection_offer?: InputMaybe<Numeric_Comparison_Exp>;
  highest_sold?: InputMaybe<Numeric_Comparison_Exp>;
  highest_sold7d?: InputMaybe<Numeric_Comparison_Exp>;
  highest_sold24?: InputMaybe<Numeric_Comparison_Exp>;
  highest_sold30d?: InputMaybe<Numeric_Comparison_Exp>;
  highest_sold_listing_id?: InputMaybe<String_Comparison_Exp>;
  highest_sold_listing_version?: InputMaybe<Int_Comparison_Exp>;
  listed?: InputMaybe<Int_Comparison_Exp>;
  listing?: InputMaybe<Listing_Bool_Exp>;
  listingByFloorlistingversionFloorlistingid?: InputMaybe<Listing_Bool_Exp>;
  listingByLowestsoldlistingidLowestsoldlistingversion?: InputMaybe<Listing_Bool_Exp>;
  longest_average_held_in_seconds?: InputMaybe<Bigint_Comparison_Exp>;
  lowest_sold?: InputMaybe<Numeric_Comparison_Exp>;
  lowest_sold7d?: InputMaybe<Numeric_Comparison_Exp>;
  lowest_sold24?: InputMaybe<Numeric_Comparison_Exp>;
  lowest_sold30d?: InputMaybe<Numeric_Comparison_Exp>;
  lowest_sold_listing_id?: InputMaybe<String_Comparison_Exp>;
  lowest_sold_listing_version?: InputMaybe<Int_Comparison_Exp>;
  median?: InputMaybe<Numeric_Comparison_Exp>;
  percent_listed?: InputMaybe<Float_Comparison_Exp>;
  percent_never_listed?: InputMaybe<Float_Comparison_Exp>;
  prim_volume_nb?: InputMaybe<Int_Comparison_Exp>;
  prim_volume_tz?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume_nb?: InputMaybe<Int_Comparison_Exp>;
  sec_volume_nb7d?: InputMaybe<Int_Comparison_Exp>;
  sec_volume_nb24?: InputMaybe<Int_Comparison_Exp>;
  sec_volume_nb30d?: InputMaybe<Int_Comparison_Exp>;
  sec_volume_tz?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume_tz7d?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume_tz24?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume_tz30d?: InputMaybe<Numeric_Comparison_Exp>;
  to?: InputMaybe<Timestamptz_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
};

/** columns and relationships of "market_stats_history" */
export type Market_Stats_History = {
  __typename?: 'market_stats_history';
  average_sale_price?: Maybe<Scalars['numeric']['output']>;
  floor?: Maybe<Scalars['numeric']['output']>;
  floor_listing_id?: Maybe<Scalars['String']['output']>;
  floor_listing_version?: Maybe<Scalars['Int']['output']>;
  from: Scalars['timestamptz']['output'];
  /** An object relationship */
  generative_token: Generative_Token;
  highest_collection_offer?: Maybe<Scalars['numeric']['output']>;
  highest_sold?: Maybe<Scalars['numeric']['output']>;
  highest_sold_listing_id?: Maybe<Scalars['String']['output']>;
  highest_sold_listing_version?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  listed?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  listing?: Maybe<Listing>;
  /** An object relationship */
  listingByFloorlistingversionFloorlistingid?: Maybe<Listing>;
  /** An object relationship */
  listingByHighestsoldlistingversionHighestsoldlistingid?: Maybe<Listing>;
  longest_average_held_in_seconds?: Maybe<Scalars['bigint']['output']>;
  lowest_sold?: Maybe<Scalars['numeric']['output']>;
  lowest_sold_listing_id?: Maybe<Scalars['String']['output']>;
  lowest_sold_listing_version?: Maybe<Scalars['Int']['output']>;
  median?: Maybe<Scalars['numeric']['output']>;
  percent_listed?: Maybe<Scalars['Float']['output']>;
  percent_never_listed?: Maybe<Scalars['Float']['output']>;
  prim_volume_nb?: Maybe<Scalars['Int']['output']>;
  prim_volume_tz?: Maybe<Scalars['numeric']['output']>;
  sec_volume_nb?: Maybe<Scalars['Int']['output']>;
  sec_volume_tz?: Maybe<Scalars['numeric']['output']>;
  to: Scalars['timestamptz']['output'];
  token_id: Scalars['String']['output'];
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
  average_sale_price?: InputMaybe<Order_By>;
  floor?: InputMaybe<Order_By>;
  floor_listing_version?: InputMaybe<Order_By>;
  highest_collection_offer?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  highest_sold_listing_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  longest_average_held_in_seconds?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  lowest_sold_listing_version?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  percent_listed?: InputMaybe<Order_By>;
  percent_never_listed?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  prim_volume_tz?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  sec_volume_tz?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "market_stats_history". All fields are combined with a logical 'AND'. */
export type Market_Stats_History_Bool_Exp = {
  _and?: InputMaybe<Array<Market_Stats_History_Bool_Exp>>;
  _not?: InputMaybe<Market_Stats_History_Bool_Exp>;
  _or?: InputMaybe<Array<Market_Stats_History_Bool_Exp>>;
  average_sale_price?: InputMaybe<Numeric_Comparison_Exp>;
  floor?: InputMaybe<Numeric_Comparison_Exp>;
  floor_listing_id?: InputMaybe<String_Comparison_Exp>;
  floor_listing_version?: InputMaybe<Int_Comparison_Exp>;
  from?: InputMaybe<Timestamptz_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  highest_collection_offer?: InputMaybe<Numeric_Comparison_Exp>;
  highest_sold?: InputMaybe<Numeric_Comparison_Exp>;
  highest_sold_listing_id?: InputMaybe<String_Comparison_Exp>;
  highest_sold_listing_version?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  listed?: InputMaybe<Int_Comparison_Exp>;
  listing?: InputMaybe<Listing_Bool_Exp>;
  listingByFloorlistingversionFloorlistingid?: InputMaybe<Listing_Bool_Exp>;
  listingByHighestsoldlistingversionHighestsoldlistingid?: InputMaybe<Listing_Bool_Exp>;
  longest_average_held_in_seconds?: InputMaybe<Bigint_Comparison_Exp>;
  lowest_sold?: InputMaybe<Numeric_Comparison_Exp>;
  lowest_sold_listing_id?: InputMaybe<String_Comparison_Exp>;
  lowest_sold_listing_version?: InputMaybe<Int_Comparison_Exp>;
  median?: InputMaybe<Numeric_Comparison_Exp>;
  percent_listed?: InputMaybe<Float_Comparison_Exp>;
  percent_never_listed?: InputMaybe<Float_Comparison_Exp>;
  prim_volume_nb?: InputMaybe<Int_Comparison_Exp>;
  prim_volume_tz?: InputMaybe<Numeric_Comparison_Exp>;
  sec_volume_nb?: InputMaybe<Int_Comparison_Exp>;
  sec_volume_tz?: InputMaybe<Numeric_Comparison_Exp>;
  to?: InputMaybe<Timestamptz_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "market_stats_history" */
export type Market_Stats_History_Max_Order_By = {
  average_sale_price?: InputMaybe<Order_By>;
  floor?: InputMaybe<Order_By>;
  floor_listing_id?: InputMaybe<Order_By>;
  floor_listing_version?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  highest_collection_offer?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  highest_sold_listing_id?: InputMaybe<Order_By>;
  highest_sold_listing_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  longest_average_held_in_seconds?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  lowest_sold_listing_id?: InputMaybe<Order_By>;
  lowest_sold_listing_version?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  percent_listed?: InputMaybe<Order_By>;
  percent_never_listed?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  prim_volume_tz?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  sec_volume_tz?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "market_stats_history" */
export type Market_Stats_History_Min_Order_By = {
  average_sale_price?: InputMaybe<Order_By>;
  floor?: InputMaybe<Order_By>;
  floor_listing_id?: InputMaybe<Order_By>;
  floor_listing_version?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  highest_collection_offer?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  highest_sold_listing_id?: InputMaybe<Order_By>;
  highest_sold_listing_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  longest_average_held_in_seconds?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  lowest_sold_listing_id?: InputMaybe<Order_By>;
  lowest_sold_listing_version?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  percent_listed?: InputMaybe<Order_By>;
  percent_never_listed?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  prim_volume_tz?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  sec_volume_tz?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "market_stats_history". */
export type Market_Stats_History_Order_By = {
  average_sale_price?: InputMaybe<Order_By>;
  floor?: InputMaybe<Order_By>;
  floor_listing_id?: InputMaybe<Order_By>;
  floor_listing_version?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  highest_collection_offer?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  highest_sold_listing_id?: InputMaybe<Order_By>;
  highest_sold_listing_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  listing?: InputMaybe<Listing_Order_By>;
  listingByFloorlistingversionFloorlistingid?: InputMaybe<Listing_Order_By>;
  listingByHighestsoldlistingversionHighestsoldlistingid?: InputMaybe<Listing_Order_By>;
  longest_average_held_in_seconds?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  lowest_sold_listing_id?: InputMaybe<Order_By>;
  lowest_sold_listing_version?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  percent_listed?: InputMaybe<Order_By>;
  percent_never_listed?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  prim_volume_tz?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  sec_volume_tz?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** select columns of table "market_stats_history" */
export enum Market_Stats_History_Select_Column {
  /** column name */
  AverageSalePrice = 'average_sale_price',
  /** column name */
  Floor = 'floor',
  /** column name */
  FloorListingId = 'floor_listing_id',
  /** column name */
  FloorListingVersion = 'floor_listing_version',
  /** column name */
  From = 'from',
  /** column name */
  HighestCollectionOffer = 'highest_collection_offer',
  /** column name */
  HighestSold = 'highest_sold',
  /** column name */
  HighestSoldListingId = 'highest_sold_listing_id',
  /** column name */
  HighestSoldListingVersion = 'highest_sold_listing_version',
  /** column name */
  Id = 'id',
  /** column name */
  Listed = 'listed',
  /** column name */
  LongestAverageHeldInSeconds = 'longest_average_held_in_seconds',
  /** column name */
  LowestSold = 'lowest_sold',
  /** column name */
  LowestSoldListingId = 'lowest_sold_listing_id',
  /** column name */
  LowestSoldListingVersion = 'lowest_sold_listing_version',
  /** column name */
  Median = 'median',
  /** column name */
  PercentListed = 'percent_listed',
  /** column name */
  PercentNeverListed = 'percent_never_listed',
  /** column name */
  PrimVolumeNb = 'prim_volume_nb',
  /** column name */
  PrimVolumeTz = 'prim_volume_tz',
  /** column name */
  SecVolumeNb = 'sec_volume_nb',
  /** column name */
  SecVolumeTz = 'sec_volume_tz',
  /** column name */
  To = 'to',
  /** column name */
  TokenId = 'token_id'
}

/** order by stddev() on columns of table "market_stats_history" */
export type Market_Stats_History_Stddev_Order_By = {
  average_sale_price?: InputMaybe<Order_By>;
  floor?: InputMaybe<Order_By>;
  floor_listing_version?: InputMaybe<Order_By>;
  highest_collection_offer?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  highest_sold_listing_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  longest_average_held_in_seconds?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  lowest_sold_listing_version?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  percent_listed?: InputMaybe<Order_By>;
  percent_never_listed?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  prim_volume_tz?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  sec_volume_tz?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "market_stats_history" */
export type Market_Stats_History_Stddev_Pop_Order_By = {
  average_sale_price?: InputMaybe<Order_By>;
  floor?: InputMaybe<Order_By>;
  floor_listing_version?: InputMaybe<Order_By>;
  highest_collection_offer?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  highest_sold_listing_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  longest_average_held_in_seconds?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  lowest_sold_listing_version?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  percent_listed?: InputMaybe<Order_By>;
  percent_never_listed?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  prim_volume_tz?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  sec_volume_tz?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "market_stats_history" */
export type Market_Stats_History_Stddev_Samp_Order_By = {
  average_sale_price?: InputMaybe<Order_By>;
  floor?: InputMaybe<Order_By>;
  floor_listing_version?: InputMaybe<Order_By>;
  highest_collection_offer?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  highest_sold_listing_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  longest_average_held_in_seconds?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  lowest_sold_listing_version?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  percent_listed?: InputMaybe<Order_By>;
  percent_never_listed?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  prim_volume_tz?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  sec_volume_tz?: InputMaybe<Order_By>;
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
  average_sale_price?: InputMaybe<Scalars['numeric']['input']>;
  floor?: InputMaybe<Scalars['numeric']['input']>;
  floor_listing_id?: InputMaybe<Scalars['String']['input']>;
  floor_listing_version?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['timestamptz']['input']>;
  highest_collection_offer?: InputMaybe<Scalars['numeric']['input']>;
  highest_sold?: InputMaybe<Scalars['numeric']['input']>;
  highest_sold_listing_id?: InputMaybe<Scalars['String']['input']>;
  highest_sold_listing_version?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  listed?: InputMaybe<Scalars['Int']['input']>;
  longest_average_held_in_seconds?: InputMaybe<Scalars['bigint']['input']>;
  lowest_sold?: InputMaybe<Scalars['numeric']['input']>;
  lowest_sold_listing_id?: InputMaybe<Scalars['String']['input']>;
  lowest_sold_listing_version?: InputMaybe<Scalars['Int']['input']>;
  median?: InputMaybe<Scalars['numeric']['input']>;
  percent_listed?: InputMaybe<Scalars['Float']['input']>;
  percent_never_listed?: InputMaybe<Scalars['Float']['input']>;
  prim_volume_nb?: InputMaybe<Scalars['Int']['input']>;
  prim_volume_tz?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume_nb?: InputMaybe<Scalars['Int']['input']>;
  sec_volume_tz?: InputMaybe<Scalars['numeric']['input']>;
  to?: InputMaybe<Scalars['timestamptz']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "market_stats_history" */
export type Market_Stats_History_Sum_Order_By = {
  average_sale_price?: InputMaybe<Order_By>;
  floor?: InputMaybe<Order_By>;
  floor_listing_version?: InputMaybe<Order_By>;
  highest_collection_offer?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  highest_sold_listing_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  longest_average_held_in_seconds?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  lowest_sold_listing_version?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  percent_listed?: InputMaybe<Order_By>;
  percent_never_listed?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  prim_volume_tz?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  sec_volume_tz?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "market_stats_history" */
export type Market_Stats_History_Var_Pop_Order_By = {
  average_sale_price?: InputMaybe<Order_By>;
  floor?: InputMaybe<Order_By>;
  floor_listing_version?: InputMaybe<Order_By>;
  highest_collection_offer?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  highest_sold_listing_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  longest_average_held_in_seconds?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  lowest_sold_listing_version?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  percent_listed?: InputMaybe<Order_By>;
  percent_never_listed?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  prim_volume_tz?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  sec_volume_tz?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "market_stats_history" */
export type Market_Stats_History_Var_Samp_Order_By = {
  average_sale_price?: InputMaybe<Order_By>;
  floor?: InputMaybe<Order_By>;
  floor_listing_version?: InputMaybe<Order_By>;
  highest_collection_offer?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  highest_sold_listing_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  longest_average_held_in_seconds?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  lowest_sold_listing_version?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  percent_listed?: InputMaybe<Order_By>;
  percent_never_listed?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  prim_volume_tz?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  sec_volume_tz?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "market_stats_history" */
export type Market_Stats_History_Variance_Order_By = {
  average_sale_price?: InputMaybe<Order_By>;
  floor?: InputMaybe<Order_By>;
  floor_listing_version?: InputMaybe<Order_By>;
  highest_collection_offer?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  highest_sold_listing_version?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  longest_average_held_in_seconds?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  lowest_sold_listing_version?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  percent_listed?: InputMaybe<Order_By>;
  percent_never_listed?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  prim_volume_tz?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  sec_volume_tz?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "market_stats". */
export type Market_Stats_Order_By = {
  average_sale_price?: InputMaybe<Order_By>;
  floor_listing_id?: InputMaybe<Order_By>;
  floor_listing_version?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  highest_collection_offer?: InputMaybe<Order_By>;
  highest_sold?: InputMaybe<Order_By>;
  highest_sold7d?: InputMaybe<Order_By>;
  highest_sold24?: InputMaybe<Order_By>;
  highest_sold30d?: InputMaybe<Order_By>;
  highest_sold_listing_id?: InputMaybe<Order_By>;
  highest_sold_listing_version?: InputMaybe<Order_By>;
  listed?: InputMaybe<Order_By>;
  listing?: InputMaybe<Listing_Order_By>;
  listingByFloorlistingversionFloorlistingid?: InputMaybe<Listing_Order_By>;
  listingByLowestsoldlistingidLowestsoldlistingversion?: InputMaybe<Listing_Order_By>;
  longest_average_held_in_seconds?: InputMaybe<Order_By>;
  lowest_sold?: InputMaybe<Order_By>;
  lowest_sold7d?: InputMaybe<Order_By>;
  lowest_sold24?: InputMaybe<Order_By>;
  lowest_sold30d?: InputMaybe<Order_By>;
  lowest_sold_listing_id?: InputMaybe<Order_By>;
  lowest_sold_listing_version?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  percent_listed?: InputMaybe<Order_By>;
  percent_never_listed?: InputMaybe<Order_By>;
  prim_volume_nb?: InputMaybe<Order_By>;
  prim_volume_tz?: InputMaybe<Order_By>;
  sec_volume_nb?: InputMaybe<Order_By>;
  sec_volume_nb7d?: InputMaybe<Order_By>;
  sec_volume_nb24?: InputMaybe<Order_By>;
  sec_volume_nb30d?: InputMaybe<Order_By>;
  sec_volume_tz?: InputMaybe<Order_By>;
  sec_volume_tz7d?: InputMaybe<Order_By>;
  sec_volume_tz24?: InputMaybe<Order_By>;
  sec_volume_tz30d?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** select columns of table "market_stats" */
export enum Market_Stats_Select_Column {
  /** column name */
  AverageSalePrice = 'average_sale_price',
  /** column name */
  FloorListingId = 'floor_listing_id',
  /** column name */
  FloorListingVersion = 'floor_listing_version',
  /** column name */
  From = 'from',
  /** column name */
  HighestCollectionOffer = 'highest_collection_offer',
  /** column name */
  HighestSold = 'highest_sold',
  /** column name */
  HighestSold7d = 'highest_sold7d',
  /** column name */
  HighestSold24 = 'highest_sold24',
  /** column name */
  HighestSold30d = 'highest_sold30d',
  /** column name */
  HighestSoldListingId = 'highest_sold_listing_id',
  /** column name */
  HighestSoldListingVersion = 'highest_sold_listing_version',
  /** column name */
  Listed = 'listed',
  /** column name */
  LongestAverageHeldInSeconds = 'longest_average_held_in_seconds',
  /** column name */
  LowestSold = 'lowest_sold',
  /** column name */
  LowestSold7d = 'lowest_sold7d',
  /** column name */
  LowestSold24 = 'lowest_sold24',
  /** column name */
  LowestSold30d = 'lowest_sold30d',
  /** column name */
  LowestSoldListingId = 'lowest_sold_listing_id',
  /** column name */
  LowestSoldListingVersion = 'lowest_sold_listing_version',
  /** column name */
  Median = 'median',
  /** column name */
  PercentListed = 'percent_listed',
  /** column name */
  PercentNeverListed = 'percent_never_listed',
  /** column name */
  PrimVolumeNb = 'prim_volume_nb',
  /** column name */
  PrimVolumeTz = 'prim_volume_tz',
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
  TokenId = 'token_id'
}

/** Streaming cursor of the table "market_stats" */
export type Market_Stats_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Market_Stats_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Market_Stats_Stream_Cursor_Value_Input = {
  average_sale_price?: InputMaybe<Scalars['numeric']['input']>;
  floor_listing_id?: InputMaybe<Scalars['String']['input']>;
  floor_listing_version?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['timestamptz']['input']>;
  highest_collection_offer?: InputMaybe<Scalars['numeric']['input']>;
  highest_sold?: InputMaybe<Scalars['numeric']['input']>;
  highest_sold7d?: InputMaybe<Scalars['numeric']['input']>;
  highest_sold24?: InputMaybe<Scalars['numeric']['input']>;
  highest_sold30d?: InputMaybe<Scalars['numeric']['input']>;
  highest_sold_listing_id?: InputMaybe<Scalars['String']['input']>;
  highest_sold_listing_version?: InputMaybe<Scalars['Int']['input']>;
  listed?: InputMaybe<Scalars['Int']['input']>;
  longest_average_held_in_seconds?: InputMaybe<Scalars['bigint']['input']>;
  lowest_sold?: InputMaybe<Scalars['numeric']['input']>;
  lowest_sold7d?: InputMaybe<Scalars['numeric']['input']>;
  lowest_sold24?: InputMaybe<Scalars['numeric']['input']>;
  lowest_sold30d?: InputMaybe<Scalars['numeric']['input']>;
  lowest_sold_listing_id?: InputMaybe<Scalars['String']['input']>;
  lowest_sold_listing_version?: InputMaybe<Scalars['Int']['input']>;
  median?: InputMaybe<Scalars['numeric']['input']>;
  percent_listed?: InputMaybe<Scalars['Float']['input']>;
  percent_never_listed?: InputMaybe<Scalars['Float']['input']>;
  prim_volume_nb?: InputMaybe<Scalars['Int']['input']>;
  prim_volume_tz?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume_nb?: InputMaybe<Scalars['Int']['input']>;
  sec_volume_nb7d?: InputMaybe<Scalars['Int']['input']>;
  sec_volume_nb24?: InputMaybe<Scalars['Int']['input']>;
  sec_volume_nb30d?: InputMaybe<Scalars['Int']['input']>;
  sec_volume_tz?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume_tz7d?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume_tz24?: InputMaybe<Scalars['numeric']['input']>;
  sec_volume_tz30d?: InputMaybe<Scalars['numeric']['input']>;
  to?: InputMaybe<Scalars['timestamptz']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
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

/** order by stddev() on columns of table "mint_ticket" */
export type Mint_Ticket_Stddev_Order_By = {
  price?: InputMaybe<Order_By>;
  taxation_locked?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "mint_ticket" */
export type Mint_Ticket_Stddev_Pop_Order_By = {
  price?: InputMaybe<Order_By>;
  taxation_locked?: InputMaybe<Order_By>;
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

/** order by sum() on columns of table "mint_ticket" */
export type Mint_Ticket_Sum_Order_By = {
  price?: InputMaybe<Order_By>;
  taxation_locked?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "mint_ticket" */
export type Mint_Ticket_Var_Pop_Order_By = {
  price?: InputMaybe<Order_By>;
  taxation_locked?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "mint_ticket" */
export type Mint_Ticket_Var_Samp_Order_By = {
  price?: InputMaybe<Order_By>;
  taxation_locked?: InputMaybe<Order_By>;
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
  /** An array relationship */
  generative_tokens: Array<Generative_Token>;
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
export type Moderation_ReasonGenerative_TokensArgs = {
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
  generative_tokens?: InputMaybe<Generative_Token_Bool_Exp>;
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
  offchain?: Maybe<Offchain_Mutation_Frontend>;
  set_whitelist?: Maybe<SetWhitelistOutput>;
};


/** mutation root */
export type Mutation_RootSet_WhitelistArgs = {
  whitelist: Scalars['jsonb']['input'];
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
  assigned?: Maybe<Scalars['Boolean']['output']>;
  assigned_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An array relationship */
  auctions: Array<Auction>;
  capture_media_id?: Maybe<Scalars['bpchar']['output']>;
  created_at: Scalars['timestamptz']['output'];
  display_uri?: Maybe<Scalars['bpchar']['output']>;
  duplicate?: Maybe<Scalars['Boolean']['output']>;
  features?: Maybe<Scalars['json']['output']>;
  generation_hash?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  generative_token: Generative_Token;
  /** An object relationship */
  gentk_assign?: Maybe<Gentk_Assign>;
  id: Scalars['String']['output'];
  input_bytes?: Maybe<Scalars['String']['output']>;
  issuer_id: Scalars['String']['output'];
  iteration?: Maybe<Scalars['numeric']['output']>;
  /** An array relationship */
  listings: Array<Listing>;
  /** An object relationship */
  media_image?: Maybe<Media_Image>;
  metadata?: Maybe<Scalars['json']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  minter_id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  offers: Array<Offer>;
  owner_id?: Maybe<Scalars['String']['output']>;
  rarity?: Maybe<Scalars['float8']['output']>;
  /** An array relationship */
  redemptions: Array<Redemption>;
  royalties: Scalars['Int']['output'];
  slug?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  splits: Array<Split>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  thumbnail_uri?: Maybe<Scalars['bpchar']['output']>;
  /** An array relationship */
  transactions: Array<Transaction>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user?: Maybe<User>;
  /** An object relationship */
  userByOwnerId?: Maybe<User>;
  version: Scalars['Int']['output'];
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
export type ObjktAuctionsArgs = {
  distinct_on?: InputMaybe<Array<Auction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Auction_Order_By>>;
  where?: InputMaybe<Auction_Bool_Exp>;
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
export type ObjktRedemptionsArgs = {
  distinct_on?: InputMaybe<Array<Redemption_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redemption_Order_By>>;
  where?: InputMaybe<Redemption_Bool_Exp>;
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

/** order by avg() on columns of table "objkt" */
export type Objkt_Avg_Order_By = {
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
  assigned?: InputMaybe<Boolean_Comparison_Exp>;
  assigned_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  auctions?: InputMaybe<Auction_Bool_Exp>;
  capture_media_id?: InputMaybe<Bpchar_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  display_uri?: InputMaybe<Bpchar_Comparison_Exp>;
  duplicate?: InputMaybe<Boolean_Comparison_Exp>;
  features?: InputMaybe<Json_Comparison_Exp>;
  generation_hash?: InputMaybe<String_Comparison_Exp>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  gentk_assign?: InputMaybe<Gentk_Assign_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  input_bytes?: InputMaybe<String_Comparison_Exp>;
  issuer_id?: InputMaybe<String_Comparison_Exp>;
  iteration?: InputMaybe<Numeric_Comparison_Exp>;
  listings?: InputMaybe<Listing_Bool_Exp>;
  media_image?: InputMaybe<Media_Image_Bool_Exp>;
  metadata?: InputMaybe<Json_Comparison_Exp>;
  metadata_uri?: InputMaybe<String_Comparison_Exp>;
  minter_id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  offers?: InputMaybe<Offer_Bool_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  rarity?: InputMaybe<Float8_Comparison_Exp>;
  redemptions?: InputMaybe<Redemption_Bool_Exp>;
  royalties?: InputMaybe<Int_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  splits?: InputMaybe<Split_Bool_Exp>;
  tags?: InputMaybe<String_Array_Comparison_Exp>;
  thumbnail_uri?: InputMaybe<Bpchar_Comparison_Exp>;
  transactions?: InputMaybe<Transaction_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userByOwnerId?: InputMaybe<User_Bool_Exp>;
  version?: InputMaybe<Int_Comparison_Exp>;
};

/** order by max() on columns of table "objkt" */
export type Objkt_Max_Order_By = {
  assigned_at?: InputMaybe<Order_By>;
  capture_media_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
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
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  tags?: InputMaybe<Order_By>;
  thumbnail_uri?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "objkt" */
export type Objkt_Min_Order_By = {
  assigned_at?: InputMaybe<Order_By>;
  capture_media_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
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
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  tags?: InputMaybe<Order_By>;
  thumbnail_uri?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "objkt". */
export type Objkt_Order_By = {
  actions_aggregate?: InputMaybe<Action_Aggregate_Order_By>;
  assigned?: InputMaybe<Order_By>;
  assigned_at?: InputMaybe<Order_By>;
  auctions_aggregate?: InputMaybe<Auction_Aggregate_Order_By>;
  capture_media_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
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
  minter_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  offers_aggregate?: InputMaybe<Offer_Aggregate_Order_By>;
  owner_id?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  redemptions_aggregate?: InputMaybe<Redemption_Aggregate_Order_By>;
  royalties?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  splits_aggregate?: InputMaybe<Split_Aggregate_Order_By>;
  tags?: InputMaybe<Order_By>;
  thumbnail_uri?: InputMaybe<Order_By>;
  transactions_aggregate?: InputMaybe<Transaction_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userByOwnerId?: InputMaybe<User_Order_By>;
  version?: InputMaybe<Order_By>;
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
  CreatedAt = 'created_at',
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
  Rarity = 'rarity',
  /** column name */
  Royalties = 'royalties',
  /** column name */
  Slug = 'slug',
  /** column name */
  Tags = 'tags',
  /** column name */
  ThumbnailUri = 'thumbnail_uri',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Version = 'version'
}

/** order by stddev() on columns of table "objkt" */
export type Objkt_Stddev_Order_By = {
  iteration?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "objkt" */
export type Objkt_Stddev_Pop_Order_By = {
  iteration?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "objkt" */
export type Objkt_Stddev_Samp_Order_By = {
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
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  display_uri?: InputMaybe<Scalars['bpchar']['input']>;
  duplicate?: InputMaybe<Scalars['Boolean']['input']>;
  features?: InputMaybe<Scalars['json']['input']>;
  generation_hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  input_bytes?: InputMaybe<Scalars['String']['input']>;
  issuer_id?: InputMaybe<Scalars['String']['input']>;
  iteration?: InputMaybe<Scalars['numeric']['input']>;
  metadata?: InputMaybe<Scalars['json']['input']>;
  metadata_uri?: InputMaybe<Scalars['String']['input']>;
  minter_id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner_id?: InputMaybe<Scalars['String']['input']>;
  rarity?: InputMaybe<Scalars['float8']['input']>;
  royalties?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnail_uri?: InputMaybe<Scalars['bpchar']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** order by sum() on columns of table "objkt" */
export type Objkt_Sum_Order_By = {
  iteration?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "objkt" */
export type Objkt_Var_Pop_Order_By = {
  iteration?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "objkt" */
export type Objkt_Var_Samp_Order_By = {
  iteration?: InputMaybe<Order_By>;
  rarity?: InputMaybe<Order_By>;
  royalties?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "objkt" */
export type Objkt_Variance_Order_By = {
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
  /** fetch data from the table: "Account" using primary key columns */
  Account_by_pk?: Maybe<Account>;
  /** fetch data from the table: "AccountsRoles" */
  AccountsRoles: Array<AccountsRoles>;
  /** fetch data from the table: "AccountsRoles" using primary key columns */
  AccountsRoles_by_pk?: Maybe<AccountsRoles>;
  /** fetch data from the table: "Media" */
  Media: Array<Media>;
  /** fetch data from the table: "Media" using primary key columns */
  Media_by_pk?: Maybe<Media>;
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
  /** fetch data from the table: "Media" */
  Media: Array<Media>;
  /** fetch data from the table: "Media" using primary key columns */
  Media_by_pk?: Maybe<Media>;
  /** fetch data from the table in a streaming manner: "Media" */
  Media_stream: Array<Media>;
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
  /** An object relationship */
  user?: Maybe<User>;
  version: Scalars['Int']['output'];
};


/** columns and relationships of "offer" */
export type OfferMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
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
  user?: InputMaybe<User_Bool_Exp>;
  version?: InputMaybe<Int_Comparison_Exp>;
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
  version?: InputMaybe<Order_By>;
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
  Version = 'version'
}

/** order by stddev() on columns of table "offer" */
export type Offer_Stddev_Order_By = {
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "offer" */
export type Offer_Stddev_Pop_Order_By = {
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
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
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** order by sum() on columns of table "offer" */
export type Offer_Sum_Order_By = {
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "offer" */
export type Offer_Var_Pop_Order_By = {
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "offer" */
export type Offer_Var_Samp_Order_By = {
  price?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
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
  /** fetch data from the table: "action" using primary key columns */
  action_by_pk?: Maybe<Action>;
  /** fetch data from the table: "article" */
  article: Array<Article>;
  /** fetch data from the table: "article" using primary key columns */
  article_by_pk?: Maybe<Article>;
  /** fetch data from the table: "article_generative_token" */
  article_generative_token: Array<Article_Generative_Token>;
  /** fetch data from the table: "article_generative_token" using primary key columns */
  article_generative_token_by_pk?: Maybe<Article_Generative_Token>;
  /** fetch data from the table: "article_ledger" */
  article_ledger: Array<Article_Ledger>;
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
  /** fetch data from the table: "generative_token" */
  generative_token: Array<Generative_Token>;
  /** fetch data from the table: "generative_token" using primary key columns */
  generative_token_by_pk?: Maybe<Generative_Token>;
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
  /** fetch data from the table: "listing" using primary key columns */
  listing_by_pk?: Maybe<Listing>;
  /** fetch data from the table: "market_stats" */
  market_stats: Array<Market_Stats>;
  /** fetch data from the table: "market_stats" using primary key columns */
  market_stats_by_pk?: Maybe<Market_Stats>;
  /** fetch data from the table: "market_stats_history" */
  market_stats_history: Array<Market_Stats_History>;
  /** fetch data from the table: "market_stats_history" using primary key columns */
  market_stats_history_by_pk?: Maybe<Market_Stats_History>;
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
  /** fetch data from the table: "objkt" using primary key columns */
  objkt_by_pk?: Maybe<Objkt>;
  /** fetch data from the table: "offer" */
  offer: Array<Offer>;
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
};


export type Onchain_QueryActionArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


export type Onchain_QueryAction_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Onchain_QueryArticleArgs = {
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


export type Onchain_QueryGenerative_TokenArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Order_By>>;
  where?: InputMaybe<Generative_Token_Bool_Exp>;
};


export type Onchain_QueryGenerative_Token_By_PkArgs = {
  id: Scalars['String']['input'];
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

export type Onchain_Subscription = {
  __typename?: 'onchain_subscription';
  /** fetch data from the table: "action" */
  action: Array<Action>;
  /** fetch data from the table: "action" using primary key columns */
  action_by_pk?: Maybe<Action>;
  /** fetch data from the table in a streaming manner: "action" */
  action_stream: Array<Action>;
  /** fetch data from the table: "article" */
  article: Array<Article>;
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
  /** fetch data from the table: "generative_token" */
  generative_token: Array<Generative_Token>;
  /** fetch data from the table: "generative_token" using primary key columns */
  generative_token_by_pk?: Maybe<Generative_Token>;
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
  /** fetch data from the table: "listing" using primary key columns */
  listing_by_pk?: Maybe<Listing>;
  /** fetch data from the table in a streaming manner: "listing" */
  listing_stream: Array<Listing>;
  /** fetch data from the table: "market_stats" */
  market_stats: Array<Market_Stats>;
  /** fetch data from the table: "market_stats" using primary key columns */
  market_stats_by_pk?: Maybe<Market_Stats>;
  /** fetch data from the table: "market_stats_history" */
  market_stats_history: Array<Market_Stats_History>;
  /** fetch data from the table: "market_stats_history" using primary key columns */
  market_stats_history_by_pk?: Maybe<Market_Stats_History>;
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
  /** fetch data from the table: "objkt" using primary key columns */
  objkt_by_pk?: Maybe<Objkt>;
  /** fetch data from the table in a streaming manner: "objkt" */
  objkt_stream: Array<Objkt>;
  /** fetch data from the table: "offer" */
  offer: Array<Offer>;
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
};


export type Onchain_SubscriptionActionArgs = {
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


export type Onchain_SubscriptionArticleArgs = {
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


export type Onchain_SubscriptionGenerative_TokenArgs = {
  distinct_on?: InputMaybe<Array<Generative_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Generative_Token_Order_By>>;
  where?: InputMaybe<Generative_Token_Bool_Exp>;
};


export type Onchain_SubscriptionGenerative_Token_By_PkArgs = {
  id: Scalars['String']['input'];
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
  refundable?: Maybe<Scalars['Boolean']['output']>;
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
  /** An object relationship */
  generative_token?: Maybe<Generative_Token>;
  id: Scalars['String']['output'];
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
  price?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "pricing_fixed". All fields are combined with a logical 'AND'. */
export type Pricing_Fixed_Bool_Exp = {
  _and?: InputMaybe<Array<Pricing_Fixed_Bool_Exp>>;
  _not?: InputMaybe<Pricing_Fixed_Bool_Exp>;
  _or?: InputMaybe<Array<Pricing_Fixed_Bool_Exp>>;
  generative_token?: InputMaybe<Generative_Token_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  opens_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  opens_at?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  opens_at?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "pricing_fixed". */
export type Pricing_Fixed_Order_By = {
  generative_token?: InputMaybe<Generative_Token_Order_By>;
  id?: InputMaybe<Order_By>;
  opens_at?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
};

/** select columns of table "pricing_fixed" */
export enum Pricing_Fixed_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  OpensAt = 'opens_at',
  /** column name */
  Price = 'price',
  /** column name */
  TokenId = 'token_id'
}

/** order by stddev() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Stddev_Order_By = {
  price?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Stddev_Pop_Order_By = {
  price?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Stddev_Samp_Order_By = {
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
  id?: InputMaybe<Scalars['String']['input']>;
  opens_at?: InputMaybe<Scalars['timestamptz']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Sum_Order_By = {
  price?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Var_Pop_Order_By = {
  price?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Var_Samp_Order_By = {
  price?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "pricing_fixed" */
export type Pricing_Fixed_Variance_Order_By = {
  price?: InputMaybe<Order_By>;
};

export type Query_Root = {
  __typename?: 'query_root';
  mediaFullUrl: Scalars['String']['output'];
  offchain?: Maybe<Offchain_Query>;
  onchain?: Maybe<Onchain_Query>;
};


export type Query_RootMediaFullUrlArgs = {
  s3key: Scalars['String']['input'];
};

/** columns and relationships of "redeemable" */
export type Redeemable = {
  __typename?: 'redeemable';
  /** An array relationship */
  actions: Array<Action>;
  address: Scalars['String']['output'];
  base_amount: Scalars['numeric']['output'];
  created_at: Scalars['timestamptz']['output'];
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
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['String']['output']>;
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
  /** An array relationship */
  article_ledgers: Array<Article_Ledger>;
  /** An array relationship */
  articles: Array<Article>;
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
  id: Scalars['String']['output'];
  /** An array relationship */
  listings: Array<Listing>;
  /** An array relationship */
  listingsByAcceptedById: Array<Listing>;
  /** An object relationship */
  media_image?: Maybe<Media_Image>;
  metadata?: Maybe<Scalars['jsonb']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  mint_tickets: Array<Mint_Ticket>;
  /** An object relationship */
  moderation_reason?: Maybe<Moderation_Reason>;
  moderation_reason_id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  objkts: Array<Objkt>;
  /** An array relationship */
  objktsByOwnerId: Array<Objkt>;
  /** An array relationship */
  offers: Array<Offer>;
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
export type UserArticle_LedgersArgs = {
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
export type UserOffersArgs = {
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
  article_ledgers?: InputMaybe<Article_Ledger_Bool_Exp>;
  articles?: InputMaybe<Article_Bool_Exp>;
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
  id?: InputMaybe<String_Comparison_Exp>;
  listings?: InputMaybe<Listing_Bool_Exp>;
  listingsByAcceptedById?: InputMaybe<Listing_Bool_Exp>;
  media_image?: InputMaybe<Media_Image_Bool_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  metadata_uri?: InputMaybe<String_Comparison_Exp>;
  mint_tickets?: InputMaybe<Mint_Ticket_Bool_Exp>;
  moderation_reason?: InputMaybe<Moderation_Reason_Bool_Exp>;
  moderation_reason_id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  objkts?: InputMaybe<Objkt_Bool_Exp>;
  objktsByOwnerId?: InputMaybe<Objkt_Bool_Exp>;
  offers?: InputMaybe<Offer_Bool_Exp>;
  redemptions?: InputMaybe<Redemption_Bool_Exp>;
  reports?: InputMaybe<Report_Bool_Exp>;
  splits?: InputMaybe<Split_Bool_Exp>;
  type?: InputMaybe<User_Type_Enum_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_stat?: InputMaybe<User_Stats_Bool_Exp>;
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

export type CreateWhitelistMutationVariables = Exact<{
  whitelist: Scalars['jsonb']['input'];
}>;


export type CreateWhitelistMutation = { __typename?: 'mutation_root', set_whitelist?: { __typename?: 'SetWhitelistOutput', merkleRoot?: string | null, message?: string | null, success: boolean } | null };

export type Account_BaseDetailsFragment = { __typename?: 'Account', id: string, username: string, profile: Array<{ __typename?: 'Profile', picture?: string | null, description?: string | null }>, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> };

export type Account_WalletsFragment = { __typename?: 'Account', wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }>, mainWallet: { __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> } };

export type GetAccountsQueryVariables = Exact<{
  where?: InputMaybe<Account_Bool_Exp>;
}>;


export type GetAccountsQuery = { __typename?: 'query_root', offchain?: { __typename?: 'offchain_query', Account: Array<{ __typename?: 'Account', id: string, username: string, profile: Array<{ __typename?: 'Profile', picture?: string | null, description?: string | null }>, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> }> } | null };

export type GetAccountWalletsQueryVariables = Exact<{
  where?: InputMaybe<Account_Bool_Exp>;
}>;


export type GetAccountWalletsQuery = { __typename?: 'query_root', offchain?: { __typename?: 'offchain_query', Account: Array<{ __typename?: 'Account', id: string, username: string, profile: Array<{ __typename?: 'Profile', picture?: string | null, description?: string | null }>, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }>, mainWallet: { __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> } }> } | null };

export type Project_BaseDetailsFragment = { __typename?: 'Project', id: string, title: string, description?: string | null, tokenId?: string | null, releaseAt?: any | null, blockchain?: any | null, storage?: any | null, pricing?: any | null, curator?: { __typename?: 'Account', id: string, status: any, username: string, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> } | null, author: { __typename?: 'Account', id: string, username: string, profile: Array<{ __typename?: 'Profile', picture?: string | null, description?: string | null }>, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> }, collaborators: Array<{ __typename?: 'ProjectCollaborator', account: { __typename?: 'Account', id: string, username: string, profile: Array<{ __typename?: 'Profile', picture?: string | null, description?: string | null }>, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> } }>, projectMedias: Array<{ __typename?: 'ProjectMedia', index: any, media: { __typename?: 'Media', id: string, url: string } }> };

export type Project_UserSecretsFragment = { __typename?: 'Project', state: string };

export type GetAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProjectsQuery = { __typename?: 'query_root', offchain?: { __typename?: 'offchain_query', Project: Array<{ __typename?: 'Project', id: string, title: string, description?: string | null, tokenId?: string | null, releaseAt?: any | null, blockchain?: any | null, storage?: any | null, pricing?: any | null, curator?: { __typename?: 'Account', id: string, status: any, username: string, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> } | null, author: { __typename?: 'Account', id: string, username: string, profile: Array<{ __typename?: 'Profile', picture?: string | null, description?: string | null }>, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> }, collaborators: Array<{ __typename?: 'ProjectCollaborator', account: { __typename?: 'Account', id: string, username: string, profile: Array<{ __typename?: 'Profile', picture?: string | null, description?: string | null }>, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> } }>, projectMedias: Array<{ __typename?: 'ProjectMedia', index: any, media: { __typename?: 'Media', id: string, url: string } }> }> } | null };

export type GetAllProjectsAfterDateQueryVariables = Exact<{
  afterDate: Scalars['timestamptz']['input'];
}>;


export type GetAllProjectsAfterDateQuery = { __typename?: 'query_root', offchain?: { __typename?: 'offchain_query', Project: Array<{ __typename?: 'Project', id: string, title: string, description?: string | null, tokenId?: string | null, releaseAt?: any | null, blockchain?: any | null, storage?: any | null, pricing?: any | null, curator?: { __typename?: 'Account', id: string, status: any, username: string, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> } | null, author: { __typename?: 'Account', id: string, username: string, profile: Array<{ __typename?: 'Profile', picture?: string | null, description?: string | null }>, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> }, collaborators: Array<{ __typename?: 'ProjectCollaborator', account: { __typename?: 'Account', id: string, username: string, profile: Array<{ __typename?: 'Profile', picture?: string | null, description?: string | null }>, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> } }>, projectMedias: Array<{ __typename?: 'ProjectMedia', index: any, media: { __typename?: 'Media', id: string, url: string } }> }> } | null };

export type GetUserSubmissionsQueryVariables = Exact<{
  authorId: Scalars['uuid']['input'];
}>;


export type GetUserSubmissionsQuery = { __typename?: 'query_root', offchain?: { __typename?: 'offchain_query', Project: Array<{ __typename?: 'Project', id: string, title: string, description?: string | null, tokenId?: string | null, releaseAt?: any | null, blockchain?: any | null, storage?: any | null, pricing?: any | null, state: string, curator?: { __typename?: 'Account', id: string, status: any, username: string, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> } | null, author: { __typename?: 'Account', id: string, username: string, profile: Array<{ __typename?: 'Profile', picture?: string | null, description?: string | null }>, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> }, collaborators: Array<{ __typename?: 'ProjectCollaborator', account: { __typename?: 'Account', id: string, username: string, profile: Array<{ __typename?: 'Profile', picture?: string | null, description?: string | null }>, wallets: Array<{ __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> }> } }>, projectMedias: Array<{ __typename?: 'ProjectMedia', index: any, media: { __typename?: 'Media', id: string, url: string } }> }> } | null };

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

export type Wallet_BaseDetailsFragment = { __typename?: 'Wallet', address: string, network: any, accountId: string, walletUser: Array<{ __typename?: 'user', flag: any }> };

export type WhitelistEntriesFragment = { __typename?: 'Whitelist', entries: Array<{ __typename?: 'WhitelistEntries', walletAddress: string, whitelistIndex: number }> };

export type GetWhitelistsQueryVariables = Exact<{
  where?: InputMaybe<Whitelist_Bool_Exp>;
}>;


export type GetWhitelistsQuery = { __typename?: 'query_root', offchain?: { __typename?: 'offchain_query', Whitelist: Array<{ __typename?: 'Whitelist', merkleRoot: string, entries: Array<{ __typename?: 'WhitelistEntries', walletAddress: string, whitelistIndex: number }> }> } | null };

export type GetWhitelistQueryVariables = Exact<{
  merkleRoot?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetWhitelistQuery = { __typename?: 'query_root', offchain?: { __typename?: 'offchain_query', Whitelist_by_pk?: { __typename?: 'Whitelist', merkleRoot: string, entries: Array<{ __typename?: 'WhitelistEntries', walletAddress: string, whitelistIndex: number }> } | null } | null };

export type GetEthPrimarySplitsQueryVariables = Exact<{
  where?: InputMaybe<Eth_Primary_Splits_Bool_Exp>;
}>;


export type GetEthPrimarySplitsQuery = { __typename?: 'query_root', onchain?: { __typename: 'onchain_query', eth_primary_splits: Array<{ __typename?: 'eth_primary_splits', id: string, receiver: string, receivers: Array<string>, allocations: Array<number> }> } | null };

export type GenerativeToken_PricingFragment = { __typename?: 'generative_token', pricing_fixeds: Array<{ __typename?: 'pricing_fixed', price: any, opens_at?: any | null }>, pricing_dutch_auctions: Array<{ __typename?: 'pricing_dutch_auction', levels: Array<any>, resting_price: string, final_price?: any | null, decrement_duration: any, opens_at?: any | null }> };

export type GetEthMinterProceedsQueryVariables = Exact<{
  where?: InputMaybe<Eth_Minter_Proceeds_Bool_Exp>;
}>;


export type GetEthMinterProceedsQuery = { __typename?: 'query_root', onchain?: { __typename?: 'onchain_query', eth_minter_proceeds: Array<{ __typename?: 'eth_minter_proceeds', id: string, minter_address: string, primary_receiver: string, reserve_id?: any | null, token_address: string, user_address: string, amount: any }> } | null };

export type GetReservesQueryVariables = Exact<{
  where?: InputMaybe<Reserve_Bool_Exp>;
}>;


export type GetReservesQuery = { __typename?: 'query_root', onchain?: { __typename?: 'onchain_query', reserve: Array<{ __typename?: 'reserve', data?: any | null, id: number, method: number, token_id?: string | null, amount: any }> } | null };

export type GetActionSalesBotQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetActionSalesBotQuery = { __typename?: 'query_root', onchain?: { __typename?: 'onchain_query', action_by_pk?: { __typename?: 'action', id: string, type: any, numeric_value?: any | null, created_at: any, issuer_id?: string | null, target_id?: string | null, issuer?: { __typename?: 'user', wallet?: { __typename?: 'Wallet', account: { __typename?: 'Account', username: string } } | null } | null, user?: { __typename?: 'user', wallet?: { __typename?: 'Wallet', account: { __typename?: 'Account', username: string } } | null } | null, objkt?: { __typename?: 'objkt', id: string, name?: string | null, metadata?: any | null } | null, generative_token?: { __typename?: 'generative_token', id: string, thumbnail_uri?: string | null, author_id?: string | null, author?: { __typename?: 'user', wallet?: { __typename?: 'Wallet', account: { __typename?: 'Account', username: string } } | null } | null } | null } | null } | null };

export type GetTokenPricingsAndReservesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetTokenPricingsAndReservesQuery = { __typename?: 'query_root', onchain?: { __typename?: 'onchain_query', generative_token_by_pk?: { __typename?: 'generative_token', reserves: Array<{ __typename?: 'reserve', id: number, method: number, amount: any, data?: any | null }>, pricing_fixeds: Array<{ __typename?: 'pricing_fixed', id: string, opens_at?: any | null, price: any }>, pricing_dutch_auctions: Array<{ __typename?: 'pricing_dutch_auction', id: string, opens_at?: any | null, levels: Array<any>, decrement_duration: any }> } | null } | null };

export type GetEthUserProceedsQueryVariables = Exact<{
  where?: InputMaybe<Eth_User_Proceeds_Bool_Exp>;
}>;


export type GetEthUserProceedsQuery = { __typename?: 'query_root', onchain?: { __typename?: 'onchain_query', eth_user_proceeds: Array<{ __typename?: 'eth_user_proceeds', id: string, total_proceeds: any }> } | null };

export const Wallet_BaseDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}}]} as unknown as DocumentNode<Wallet_BaseDetailsFragment, unknown>;
export const Account_WalletsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_Wallets"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainWallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}}]} as unknown as DocumentNode<Account_WalletsFragment, unknown>;
export const Account_BaseDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}}]} as unknown as DocumentNode<Account_BaseDetailsFragment, unknown>;
export const Project_BaseDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Project_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"releaseAt"}},{"kind":"Field","name":{"kind":"Name","value":"blockchain"}},{"kind":"Field","name":{"kind":"Name","value":"storage"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"}},{"kind":"Field","name":{"kind":"Name","value":"curator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"projectMedias"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}}]} as unknown as DocumentNode<Project_BaseDetailsFragment, unknown>;
export const Project_UserSecretsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Project_UserSecrets"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]} as unknown as DocumentNode<Project_UserSecretsFragment, unknown>;
export const WhitelistEntriesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WhitelistEntries"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Whitelist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"whitelistIndex"}}]}}]}}]} as unknown as DocumentNode<WhitelistEntriesFragment, unknown>;
export const GenerativeToken_PricingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GenerativeToken_Pricing"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"generative_token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pricing_fixeds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"opens_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricing_dutch_auctions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"levels"}},{"kind":"Field","name":{"kind":"Name","value":"resting_price"}},{"kind":"Field","name":{"kind":"Name","value":"final_price"}},{"kind":"Field","name":{"kind":"Name","value":"decrement_duration"}},{"kind":"Field","name":{"kind":"Name","value":"opens_at"}}]}}]}}]} as unknown as DocumentNode<GenerativeToken_PricingFragment, unknown>;
export const CreateWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWhitelist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"whitelist"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"jsonb"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"set_whitelist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"whitelist"},"value":{"kind":"Variable","name":{"kind":"Name","value":"whitelist"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"merkleRoot"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<CreateWhitelistMutation, CreateWhitelistMutationVariables>;
export const GetAccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Account_bool_exp"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}}]} as unknown as DocumentNode<GetAccountsQuery, GetAccountsQueryVariables>;
export const GetAccountWalletsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountWallets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Account_bool_exp"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_Wallets"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_Wallets"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainWallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}}]} as unknown as DocumentNode<GetAccountWalletsQuery, GetAccountWalletsQueryVariables>;
export const GetAllProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Project_BaseDetails"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Project_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"releaseAt"}},{"kind":"Field","name":{"kind":"Name","value":"blockchain"}},{"kind":"Field","name":{"kind":"Name","value":"storage"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"}},{"kind":"Field","name":{"kind":"Name","value":"curator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"projectMedias"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllProjectsQuery, GetAllProjectsQueryVariables>;
export const GetAllProjectsAfterDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllProjectsAfterDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"afterDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"timestamptz"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"releaseAt"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"afterDate"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Project_BaseDetails"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Project_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"releaseAt"}},{"kind":"Field","name":{"kind":"Name","value":"blockchain"}},{"kind":"Field","name":{"kind":"Name","value":"storage"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"}},{"kind":"Field","name":{"kind":"Name","value":"curator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"projectMedias"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllProjectsAfterDateQuery, GetAllProjectsAfterDateQueryVariables>;
export const GetUserSubmissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserSubmissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"authorId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Project_BaseDetails"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Project_UserSecrets"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Wallet_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Wallet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"network"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"walletUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Project_BaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"releaseAt"}},{"kind":"Field","name":{"kind":"Name","value":"blockchain"}},{"kind":"Field","name":{"kind":"Name","value":"storage"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"}},{"kind":"Field","name":{"kind":"Name","value":"curator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Wallet_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account_BaseDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"projectMedias"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Project_UserSecrets"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]} as unknown as DocumentNode<GetUserSubmissionsQuery, GetUserSubmissionsQueryVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"object"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Project_insert_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_Project_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"Variable","name":{"kind":"Name","value":"object"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectMedias"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"releaseAt"}}]}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const Update_ProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Update_Project"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectData"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Project_set_input"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectMedias"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectMedia_insert_input"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectCollaborators"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectCollaborator_insert_input"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_ProjectMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}},{"kind":"Field","name":{"kind":"Name","value":"delete_ProjectCollaborator"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}},{"kind":"Field","name":{"kind":"Name","value":"update_Project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}},{"kind":"Field","name":{"kind":"Name","value":"insert_ProjectMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectMedias"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}},{"kind":"Field","name":{"kind":"Name","value":"insert_ProjectCollaborator"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectCollaborators"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}}]}}]}}]} as unknown as DocumentNode<Update_ProjectMutation, Update_ProjectMutationVariables>;
export const GetWhitelistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWhitelists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Whitelist_bool_exp"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Whitelist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"merkleRoot"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WhitelistEntries"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WhitelistEntries"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Whitelist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"whitelistIndex"}}]}}]}}]} as unknown as DocumentNode<GetWhitelistsQuery, GetWhitelistsQueryVariables>;
export const GetWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWhitelist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"merkleRoot"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Whitelist_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"merkleRoot"},"value":{"kind":"Variable","name":{"kind":"Name","value":"merkleRoot"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"merkleRoot"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WhitelistEntries"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WhitelistEntries"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Whitelist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"whitelistIndex"}}]}}]}}]} as unknown as DocumentNode<GetWhitelistQuery, GetWhitelistQueryVariables>;
export const GetEthPrimarySplitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEthPrimarySplits"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"eth_primary_splits_bool_exp"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"eth_primary_splits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"receiver"}},{"kind":"Field","name":{"kind":"Name","value":"receivers"}},{"kind":"Field","name":{"kind":"Name","value":"allocations"}}]}}]}}]}}]} as unknown as DocumentNode<GetEthPrimarySplitsQuery, GetEthPrimarySplitsQueryVariables>;
export const GetEthMinterProceedsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEthMinterProceeds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"eth_minter_proceeds_bool_exp"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eth_minter_proceeds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minter_address"}},{"kind":"Field","name":{"kind":"Name","value":"primary_receiver"}},{"kind":"Field","name":{"kind":"Name","value":"reserve_id"}},{"kind":"Field","name":{"kind":"Name","value":"token_address"}},{"kind":"Field","name":{"kind":"Name","value":"user_address"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]} as unknown as DocumentNode<GetEthMinterProceedsQuery, GetEthMinterProceedsQueryVariables>;
export const GetReservesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReserves"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"reserve_bool_exp"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reserve"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"token_id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]} as unknown as DocumentNode<GetReservesQuery, GetReservesQueryVariables>;
export const GetActionSalesBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetActionSalesBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"numeric_value"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"issuer_id"}},{"kind":"Field","name":{"kind":"Name","value":"issuer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"target_id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"objkt"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"generative_token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_uri"}},{"kind":"Field","name":{"kind":"Name","value":"author_id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetActionSalesBotQuery, GetActionSalesBotQueryVariables>;
export const GetTokenPricingsAndReservesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTokenPricingsAndReserves"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generative_token_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reserves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricing_fixeds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"opens_at"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricing_dutch_auctions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"opens_at"}},{"kind":"Field","name":{"kind":"Name","value":"levels"}},{"kind":"Field","name":{"kind":"Name","value":"decrement_duration"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetTokenPricingsAndReservesQuery, GetTokenPricingsAndReservesQueryVariables>;
export const GetEthUserProceedsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEthUserProceeds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"eth_user_proceeds_bool_exp"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eth_user_proceeds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_proceeds"}}]}}]}}]}}]} as unknown as DocumentNode<GetEthUserProceedsQuery, GetEthUserProceedsQueryVariables>;