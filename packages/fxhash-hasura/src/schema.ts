// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    AccountStatus: any,
    BlockchainNetwork: any,
    Boolean: boolean,
    Float: number,
    Int: number,
    ProjectState: any,
    Storage: any,
    String: string,
    jsonb: any,
    smallint: any,
    timestamp: any,
    timestamptz: any,
    uuid: any,
}


/** columns and relationships of "Account" */
export interface Account {
    /** An array relationship */
    authoredProjects: Project[]
    /** An aggregate relationship */
    authoredProjects_aggregate: Project_aggregate
    /** An array relationship */
    curatedProjects: Project[]
    /** An aggregate relationship */
    curatedProjects_aggregate: Project_aggregate
    id: Scalars['uuid']
    /** An array relationship */
    profile: Profile[]
    /** An aggregate relationship */
    profile_aggregate: Profile_aggregate
    status: Scalars['AccountStatus']
    username: Scalars['String']
    /** An array relationship */
    wallets: Wallet[]
    /** An aggregate relationship */
    wallets_aggregate: Wallet_aggregate
    __typename: 'Account'
}


/** aggregated selection of "Account" */
export interface Account_aggregate {
    aggregate: (Account_aggregate_fields | null)
    nodes: Account[]
    __typename: 'Account_aggregate'
}


/** aggregate fields of "Account" */
export interface Account_aggregate_fields {
    count: Scalars['Int']
    max: (Account_max_fields | null)
    min: (Account_min_fields | null)
    __typename: 'Account_aggregate_fields'
}


/** unique or primary key constraints on table "Account" */
export type Account_constraint = 'Account_pkey' | 'Account_username_key'


/** aggregate max on columns */
export interface Account_max_fields {
    id: (Scalars['uuid'] | null)
    status: (Scalars['AccountStatus'] | null)
    username: (Scalars['String'] | null)
    __typename: 'Account_max_fields'
}


/** aggregate min on columns */
export interface Account_min_fields {
    id: (Scalars['uuid'] | null)
    status: (Scalars['AccountStatus'] | null)
    username: (Scalars['String'] | null)
    __typename: 'Account_min_fields'
}


/** response of any mutation on the table "Account" */
export interface Account_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: Account[]
    __typename: 'Account_mutation_response'
}


/** select columns of table "Account" */
export type Account_select_column = 'id' | 'status' | 'username'


/** update columns of table "Account" */
export type Account_update_column = 'id' | 'status' | 'username'


/** columns and relationships of "Media" */
export interface Media {
    bucketId: Scalars['String']
    createdAt: Scalars['timestamp']
    etag: Scalars['String']
    id: Scalars['uuid']
    name: Scalars['String']
    /** An array relationship */
    project: ProjectMedia[]
    /** An aggregate relationship */
    project_aggregate: ProjectMedia_aggregate
    s3key: Scalars['String']
    size: Scalars['Int']
    updatedAt: Scalars['timestamp']
    /** An object relationship */
    uploader: (Account | null)
    uploaderId: (Scalars['uuid'] | null)
    url: Scalars['String']
    __typename: 'Media'
}


/** aggregated selection of "Media" */
export interface Media_aggregate {
    aggregate: (Media_aggregate_fields | null)
    nodes: Media[]
    __typename: 'Media_aggregate'
}


/** aggregate fields of "Media" */
export interface Media_aggregate_fields {
    avg: (Media_avg_fields | null)
    count: Scalars['Int']
    max: (Media_max_fields | null)
    min: (Media_min_fields | null)
    stddev: (Media_stddev_fields | null)
    stddev_pop: (Media_stddev_pop_fields | null)
    stddev_samp: (Media_stddev_samp_fields | null)
    sum: (Media_sum_fields | null)
    var_pop: (Media_var_pop_fields | null)
    var_samp: (Media_var_samp_fields | null)
    variance: (Media_variance_fields | null)
    __typename: 'Media_aggregate_fields'
}


/** aggregate avg on columns */
export interface Media_avg_fields {
    size: (Scalars['Float'] | null)
    __typename: 'Media_avg_fields'
}


/** unique or primary key constraints on table "Media" */
export type Media_constraint = 'Media_pkey'


/** aggregate max on columns */
export interface Media_max_fields {
    bucketId: (Scalars['String'] | null)
    createdAt: (Scalars['timestamp'] | null)
    etag: (Scalars['String'] | null)
    id: (Scalars['uuid'] | null)
    name: (Scalars['String'] | null)
    s3key: (Scalars['String'] | null)
    size: (Scalars['Int'] | null)
    updatedAt: (Scalars['timestamp'] | null)
    uploaderId: (Scalars['uuid'] | null)
    __typename: 'Media_max_fields'
}


/** aggregate min on columns */
export interface Media_min_fields {
    bucketId: (Scalars['String'] | null)
    createdAt: (Scalars['timestamp'] | null)
    etag: (Scalars['String'] | null)
    id: (Scalars['uuid'] | null)
    name: (Scalars['String'] | null)
    s3key: (Scalars['String'] | null)
    size: (Scalars['Int'] | null)
    updatedAt: (Scalars['timestamp'] | null)
    uploaderId: (Scalars['uuid'] | null)
    __typename: 'Media_min_fields'
}


/** response of any mutation on the table "Media" */
export interface Media_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: Media[]
    __typename: 'Media_mutation_response'
}


/** select columns of table "Media" */
export type Media_select_column = 'bucketId' | 'createdAt' | 'etag' | 'id' | 'name' | 's3key' | 'size' | 'updatedAt' | 'uploaderId'


/** aggregate stddev on columns */
export interface Media_stddev_fields {
    size: (Scalars['Float'] | null)
    __typename: 'Media_stddev_fields'
}


/** aggregate stddev_pop on columns */
export interface Media_stddev_pop_fields {
    size: (Scalars['Float'] | null)
    __typename: 'Media_stddev_pop_fields'
}


/** aggregate stddev_samp on columns */
export interface Media_stddev_samp_fields {
    size: (Scalars['Float'] | null)
    __typename: 'Media_stddev_samp_fields'
}


/** aggregate sum on columns */
export interface Media_sum_fields {
    size: (Scalars['Int'] | null)
    __typename: 'Media_sum_fields'
}


/** update columns of table "Media" */
export type Media_update_column = 'bucketId' | 'createdAt' | 'etag' | 'id' | 'name' | 's3key' | 'size' | 'updatedAt' | 'uploaderId'


/** aggregate var_pop on columns */
export interface Media_var_pop_fields {
    size: (Scalars['Float'] | null)
    __typename: 'Media_var_pop_fields'
}


/** aggregate var_samp on columns */
export interface Media_var_samp_fields {
    size: (Scalars['Float'] | null)
    __typename: 'Media_var_samp_fields'
}


/** aggregate variance on columns */
export interface Media_variance_fields {
    size: (Scalars['Float'] | null)
    __typename: 'Media_variance_fields'
}


/** columns and relationships of "Profile" */
export interface Profile {
    accountId: Scalars['uuid']
    description: (Scalars['String'] | null)
    instagram: (Scalars['String'] | null)
    picture: (Scalars['String'] | null)
    twitter: (Scalars['String'] | null)
    website: (Scalars['String'] | null)
    __typename: 'Profile'
}


/** aggregated selection of "Profile" */
export interface Profile_aggregate {
    aggregate: (Profile_aggregate_fields | null)
    nodes: Profile[]
    __typename: 'Profile_aggregate'
}


/** aggregate fields of "Profile" */
export interface Profile_aggregate_fields {
    count: Scalars['Int']
    max: (Profile_max_fields | null)
    min: (Profile_min_fields | null)
    __typename: 'Profile_aggregate_fields'
}


/** unique or primary key constraints on table "Profile" */
export type Profile_constraint = 'Profile_pkey'


/** aggregate max on columns */
export interface Profile_max_fields {
    accountId: (Scalars['uuid'] | null)
    description: (Scalars['String'] | null)
    instagram: (Scalars['String'] | null)
    picture: (Scalars['String'] | null)
    twitter: (Scalars['String'] | null)
    website: (Scalars['String'] | null)
    __typename: 'Profile_max_fields'
}


/** aggregate min on columns */
export interface Profile_min_fields {
    accountId: (Scalars['uuid'] | null)
    description: (Scalars['String'] | null)
    instagram: (Scalars['String'] | null)
    picture: (Scalars['String'] | null)
    twitter: (Scalars['String'] | null)
    website: (Scalars['String'] | null)
    __typename: 'Profile_min_fields'
}


/** response of any mutation on the table "Profile" */
export interface Profile_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: Profile[]
    __typename: 'Profile_mutation_response'
}


/** select columns of table "Profile" */
export type Profile_select_column = 'accountId' | 'description' | 'instagram' | 'picture' | 'twitter' | 'website'


/** update columns of table "Profile" */
export type Profile_update_column = 'accountId' | 'description' | 'instagram' | 'picture' | 'twitter' | 'website'


/** columns and relationships of "Project" */
export interface Project {
    /** An object relationship */
    author: Account
    authorId: Scalars['uuid']
    blockchain: (Scalars['BlockchainNetwork'] | null)
    createdAt: Scalars['timestamp']
    /** An object relationship */
    curator: (Account | null)
    curatorId: (Scalars['uuid'] | null)
    description: (Scalars['String'] | null)
    id: Scalars['uuid']
    pricing: (Scalars['jsonb'] | null)
    /** An array relationship */
    projectMedias: ProjectMedia[]
    /** An aggregate relationship */
    projectMedias_aggregate: ProjectMedia_aggregate
    releaseAt: (Scalars['timestamp'] | null)
    state: Scalars['ProjectState']
    storage: (Scalars['Storage'] | null)
    title: Scalars['String']
    updatedAt: Scalars['timestamp']
    __typename: 'Project'
}


/** columns and relationships of "ProjectMedia" */
export interface ProjectMedia {
    index: Scalars['smallint']
    /** An object relationship */
    media: Media
    mediaId: Scalars['uuid']
    /** An object relationship */
    project: Project
    projectId: Scalars['uuid']
    __typename: 'ProjectMedia'
}


/** aggregated selection of "ProjectMedia" */
export interface ProjectMedia_aggregate {
    aggregate: (ProjectMedia_aggregate_fields | null)
    nodes: ProjectMedia[]
    __typename: 'ProjectMedia_aggregate'
}


/** aggregate fields of "ProjectMedia" */
export interface ProjectMedia_aggregate_fields {
    avg: (ProjectMedia_avg_fields | null)
    count: Scalars['Int']
    max: (ProjectMedia_max_fields | null)
    min: (ProjectMedia_min_fields | null)
    stddev: (ProjectMedia_stddev_fields | null)
    stddev_pop: (ProjectMedia_stddev_pop_fields | null)
    stddev_samp: (ProjectMedia_stddev_samp_fields | null)
    sum: (ProjectMedia_sum_fields | null)
    var_pop: (ProjectMedia_var_pop_fields | null)
    var_samp: (ProjectMedia_var_samp_fields | null)
    variance: (ProjectMedia_variance_fields | null)
    __typename: 'ProjectMedia_aggregate_fields'
}


/** aggregate avg on columns */
export interface ProjectMedia_avg_fields {
    index: (Scalars['Float'] | null)
    __typename: 'ProjectMedia_avg_fields'
}


/** unique or primary key constraints on table "ProjectMedia" */
export type ProjectMedia_constraint = 'ProjectMedia_index_projectId_mediaId_key'


/** aggregate max on columns */
export interface ProjectMedia_max_fields {
    index: (Scalars['smallint'] | null)
    mediaId: (Scalars['uuid'] | null)
    projectId: (Scalars['uuid'] | null)
    __typename: 'ProjectMedia_max_fields'
}


/** aggregate min on columns */
export interface ProjectMedia_min_fields {
    index: (Scalars['smallint'] | null)
    mediaId: (Scalars['uuid'] | null)
    projectId: (Scalars['uuid'] | null)
    __typename: 'ProjectMedia_min_fields'
}


/** response of any mutation on the table "ProjectMedia" */
export interface ProjectMedia_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: ProjectMedia[]
    __typename: 'ProjectMedia_mutation_response'
}


/** select columns of table "ProjectMedia" */
export type ProjectMedia_select_column = 'index' | 'mediaId' | 'projectId'


/** aggregate stddev on columns */
export interface ProjectMedia_stddev_fields {
    index: (Scalars['Float'] | null)
    __typename: 'ProjectMedia_stddev_fields'
}


/** aggregate stddev_pop on columns */
export interface ProjectMedia_stddev_pop_fields {
    index: (Scalars['Float'] | null)
    __typename: 'ProjectMedia_stddev_pop_fields'
}


/** aggregate stddev_samp on columns */
export interface ProjectMedia_stddev_samp_fields {
    index: (Scalars['Float'] | null)
    __typename: 'ProjectMedia_stddev_samp_fields'
}


/** aggregate sum on columns */
export interface ProjectMedia_sum_fields {
    index: (Scalars['smallint'] | null)
    __typename: 'ProjectMedia_sum_fields'
}


/** update columns of table "ProjectMedia" */
export type ProjectMedia_update_column = 'index' | 'mediaId' | 'projectId'


/** aggregate var_pop on columns */
export interface ProjectMedia_var_pop_fields {
    index: (Scalars['Float'] | null)
    __typename: 'ProjectMedia_var_pop_fields'
}


/** aggregate var_samp on columns */
export interface ProjectMedia_var_samp_fields {
    index: (Scalars['Float'] | null)
    __typename: 'ProjectMedia_var_samp_fields'
}


/** aggregate variance on columns */
export interface ProjectMedia_variance_fields {
    index: (Scalars['Float'] | null)
    __typename: 'ProjectMedia_variance_fields'
}


/** aggregated selection of "Project" */
export interface Project_aggregate {
    aggregate: (Project_aggregate_fields | null)
    nodes: Project[]
    __typename: 'Project_aggregate'
}


/** aggregate fields of "Project" */
export interface Project_aggregate_fields {
    count: Scalars['Int']
    max: (Project_max_fields | null)
    min: (Project_min_fields | null)
    __typename: 'Project_aggregate_fields'
}


/** unique or primary key constraints on table "Project" */
export type Project_constraint = 'Project_pkey'


/** aggregate max on columns */
export interface Project_max_fields {
    authorId: (Scalars['uuid'] | null)
    blockchain: (Scalars['BlockchainNetwork'] | null)
    createdAt: (Scalars['timestamp'] | null)
    curatorId: (Scalars['uuid'] | null)
    description: (Scalars['String'] | null)
    id: (Scalars['uuid'] | null)
    releaseAt: (Scalars['timestamp'] | null)
    state: (Scalars['ProjectState'] | null)
    storage: (Scalars['Storage'] | null)
    title: (Scalars['String'] | null)
    updatedAt: (Scalars['timestamp'] | null)
    __typename: 'Project_max_fields'
}


/** aggregate min on columns */
export interface Project_min_fields {
    authorId: (Scalars['uuid'] | null)
    blockchain: (Scalars['BlockchainNetwork'] | null)
    createdAt: (Scalars['timestamp'] | null)
    curatorId: (Scalars['uuid'] | null)
    description: (Scalars['String'] | null)
    id: (Scalars['uuid'] | null)
    releaseAt: (Scalars['timestamp'] | null)
    state: (Scalars['ProjectState'] | null)
    storage: (Scalars['Storage'] | null)
    title: (Scalars['String'] | null)
    updatedAt: (Scalars['timestamp'] | null)
    __typename: 'Project_min_fields'
}


/** response of any mutation on the table "Project" */
export interface Project_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: Project[]
    __typename: 'Project_mutation_response'
}


/** select columns of table "Project" */
export type Project_select_column = 'authorId' | 'blockchain' | 'createdAt' | 'curatorId' | 'description' | 'id' | 'pricing' | 'releaseAt' | 'state' | 'storage' | 'title' | 'updatedAt'


/** update columns of table "Project" */
export type Project_update_column = 'authorId' | 'blockchain' | 'createdAt' | 'curatorId' | 'description' | 'id' | 'pricing' | 'releaseAt' | 'state' | 'storage' | 'title' | 'updatedAt'


/** columns and relationships of "Wallet" */
export interface Wallet {
    accountId: Scalars['uuid']
    address: Scalars['String']
    network: Scalars['BlockchainNetwork']
    __typename: 'Wallet'
}


/** aggregated selection of "Wallet" */
export interface Wallet_aggregate {
    aggregate: (Wallet_aggregate_fields | null)
    nodes: Wallet[]
    __typename: 'Wallet_aggregate'
}


/** aggregate fields of "Wallet" */
export interface Wallet_aggregate_fields {
    count: Scalars['Int']
    max: (Wallet_max_fields | null)
    min: (Wallet_min_fields | null)
    __typename: 'Wallet_aggregate_fields'
}


/** unique or primary key constraints on table "Wallet" */
export type Wallet_constraint = 'Wallet_pkey'


/** aggregate max on columns */
export interface Wallet_max_fields {
    accountId: (Scalars['uuid'] | null)
    address: (Scalars['String'] | null)
    network: (Scalars['BlockchainNetwork'] | null)
    __typename: 'Wallet_max_fields'
}


/** aggregate min on columns */
export interface Wallet_min_fields {
    accountId: (Scalars['uuid'] | null)
    address: (Scalars['String'] | null)
    network: (Scalars['BlockchainNetwork'] | null)
    __typename: 'Wallet_min_fields'
}


/** response of any mutation on the table "Wallet" */
export interface Wallet_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: Wallet[]
    __typename: 'Wallet_mutation_response'
}


/** select columns of table "Wallet" */
export type Wallet_select_column = 'accountId' | 'address' | 'network'


/** update columns of table "Wallet" */
export type Wallet_update_column = 'accountId' | 'address' | 'network'


/** columns and relationships of "_prisma_migrations" */
export interface _prisma_migrations {
    applied_steps_count: Scalars['Int']
    checksum: Scalars['String']
    finished_at: (Scalars['timestamptz'] | null)
    id: Scalars['String']
    logs: (Scalars['String'] | null)
    migration_name: Scalars['String']
    rolled_back_at: (Scalars['timestamptz'] | null)
    started_at: Scalars['timestamptz']
    __typename: '_prisma_migrations'
}


/** aggregated selection of "_prisma_migrations" */
export interface _prisma_migrations_aggregate {
    aggregate: (_prisma_migrations_aggregate_fields | null)
    nodes: _prisma_migrations[]
    __typename: '_prisma_migrations_aggregate'
}


/** aggregate fields of "_prisma_migrations" */
export interface _prisma_migrations_aggregate_fields {
    avg: (_prisma_migrations_avg_fields | null)
    count: Scalars['Int']
    max: (_prisma_migrations_max_fields | null)
    min: (_prisma_migrations_min_fields | null)
    stddev: (_prisma_migrations_stddev_fields | null)
    stddev_pop: (_prisma_migrations_stddev_pop_fields | null)
    stddev_samp: (_prisma_migrations_stddev_samp_fields | null)
    sum: (_prisma_migrations_sum_fields | null)
    var_pop: (_prisma_migrations_var_pop_fields | null)
    var_samp: (_prisma_migrations_var_samp_fields | null)
    variance: (_prisma_migrations_variance_fields | null)
    __typename: '_prisma_migrations_aggregate_fields'
}


/** aggregate avg on columns */
export interface _prisma_migrations_avg_fields {
    applied_steps_count: (Scalars['Float'] | null)
    __typename: '_prisma_migrations_avg_fields'
}


/** unique or primary key constraints on table "_prisma_migrations" */
export type _prisma_migrations_constraint = '_prisma_migrations_pkey'


/** aggregate max on columns */
export interface _prisma_migrations_max_fields {
    applied_steps_count: (Scalars['Int'] | null)
    checksum: (Scalars['String'] | null)
    finished_at: (Scalars['timestamptz'] | null)
    id: (Scalars['String'] | null)
    logs: (Scalars['String'] | null)
    migration_name: (Scalars['String'] | null)
    rolled_back_at: (Scalars['timestamptz'] | null)
    started_at: (Scalars['timestamptz'] | null)
    __typename: '_prisma_migrations_max_fields'
}


/** aggregate min on columns */
export interface _prisma_migrations_min_fields {
    applied_steps_count: (Scalars['Int'] | null)
    checksum: (Scalars['String'] | null)
    finished_at: (Scalars['timestamptz'] | null)
    id: (Scalars['String'] | null)
    logs: (Scalars['String'] | null)
    migration_name: (Scalars['String'] | null)
    rolled_back_at: (Scalars['timestamptz'] | null)
    started_at: (Scalars['timestamptz'] | null)
    __typename: '_prisma_migrations_min_fields'
}


/** response of any mutation on the table "_prisma_migrations" */
export interface _prisma_migrations_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: _prisma_migrations[]
    __typename: '_prisma_migrations_mutation_response'
}


/** select columns of table "_prisma_migrations" */
export type _prisma_migrations_select_column = 'applied_steps_count' | 'checksum' | 'finished_at' | 'id' | 'logs' | 'migration_name' | 'rolled_back_at' | 'started_at'


/** aggregate stddev on columns */
export interface _prisma_migrations_stddev_fields {
    applied_steps_count: (Scalars['Float'] | null)
    __typename: '_prisma_migrations_stddev_fields'
}


/** aggregate stddev_pop on columns */
export interface _prisma_migrations_stddev_pop_fields {
    applied_steps_count: (Scalars['Float'] | null)
    __typename: '_prisma_migrations_stddev_pop_fields'
}


/** aggregate stddev_samp on columns */
export interface _prisma_migrations_stddev_samp_fields {
    applied_steps_count: (Scalars['Float'] | null)
    __typename: '_prisma_migrations_stddev_samp_fields'
}


/** aggregate sum on columns */
export interface _prisma_migrations_sum_fields {
    applied_steps_count: (Scalars['Int'] | null)
    __typename: '_prisma_migrations_sum_fields'
}


/** update columns of table "_prisma_migrations" */
export type _prisma_migrations_update_column = 'applied_steps_count' | 'checksum' | 'finished_at' | 'id' | 'logs' | 'migration_name' | 'rolled_back_at' | 'started_at'


/** aggregate var_pop on columns */
export interface _prisma_migrations_var_pop_fields {
    applied_steps_count: (Scalars['Float'] | null)
    __typename: '_prisma_migrations_var_pop_fields'
}


/** aggregate var_samp on columns */
export interface _prisma_migrations_var_samp_fields {
    applied_steps_count: (Scalars['Float'] | null)
    __typename: '_prisma_migrations_var_samp_fields'
}


/** aggregate variance on columns */
export interface _prisma_migrations_variance_fields {
    applied_steps_count: (Scalars['Float'] | null)
    __typename: '_prisma_migrations_variance_fields'
}


/** ordering argument of a cursor */
export type cursor_ordering = 'ASC' | 'DESC'


/** mutation root */
export interface mutation_root {
    /** delete data from the table: "Account" */
    delete_Account: (Account_mutation_response | null)
    /** delete single row from the table: "Account" */
    delete_Account_by_pk: (Account | null)
    /** delete data from the table: "Media" */
    delete_Media: (Media_mutation_response | null)
    /** delete single row from the table: "Media" */
    delete_Media_by_pk: (Media | null)
    /** delete data from the table: "Profile" */
    delete_Profile: (Profile_mutation_response | null)
    /** delete single row from the table: "Profile" */
    delete_Profile_by_pk: (Profile | null)
    /** delete data from the table: "Project" */
    delete_Project: (Project_mutation_response | null)
    /** delete data from the table: "ProjectMedia" */
    delete_ProjectMedia: (ProjectMedia_mutation_response | null)
    /** delete single row from the table: "Project" */
    delete_Project_by_pk: (Project | null)
    /** delete data from the table: "Wallet" */
    delete_Wallet: (Wallet_mutation_response | null)
    /** delete single row from the table: "Wallet" */
    delete_Wallet_by_pk: (Wallet | null)
    /** delete data from the table: "_prisma_migrations" */
    delete__prisma_migrations: (_prisma_migrations_mutation_response | null)
    /** delete single row from the table: "_prisma_migrations" */
    delete__prisma_migrations_by_pk: (_prisma_migrations | null)
    /** insert data into the table: "Account" */
    insert_Account: (Account_mutation_response | null)
    /** insert a single row into the table: "Account" */
    insert_Account_one: (Account | null)
    /** insert data into the table: "Media" */
    insert_Media: (Media_mutation_response | null)
    /** insert a single row into the table: "Media" */
    insert_Media_one: (Media | null)
    /** insert data into the table: "Profile" */
    insert_Profile: (Profile_mutation_response | null)
    /** insert a single row into the table: "Profile" */
    insert_Profile_one: (Profile | null)
    /** insert data into the table: "Project" */
    insert_Project: (Project_mutation_response | null)
    /** insert data into the table: "ProjectMedia" */
    insert_ProjectMedia: (ProjectMedia_mutation_response | null)
    /** insert a single row into the table: "ProjectMedia" */
    insert_ProjectMedia_one: (ProjectMedia | null)
    /** insert a single row into the table: "Project" */
    insert_Project_one: (Project | null)
    /** insert data into the table: "Wallet" */
    insert_Wallet: (Wallet_mutation_response | null)
    /** insert a single row into the table: "Wallet" */
    insert_Wallet_one: (Wallet | null)
    /** insert data into the table: "_prisma_migrations" */
    insert__prisma_migrations: (_prisma_migrations_mutation_response | null)
    /** insert a single row into the table: "_prisma_migrations" */
    insert__prisma_migrations_one: (_prisma_migrations | null)
    /** update data of the table: "Account" */
    update_Account: (Account_mutation_response | null)
    /** update single row of the table: "Account" */
    update_Account_by_pk: (Account | null)
    /** update multiples rows of table: "Account" */
    update_Account_many: ((Account_mutation_response | null)[] | null)
    /** update data of the table: "Media" */
    update_Media: (Media_mutation_response | null)
    /** update single row of the table: "Media" */
    update_Media_by_pk: (Media | null)
    /** update multiples rows of table: "Media" */
    update_Media_many: ((Media_mutation_response | null)[] | null)
    /** update data of the table: "Profile" */
    update_Profile: (Profile_mutation_response | null)
    /** update single row of the table: "Profile" */
    update_Profile_by_pk: (Profile | null)
    /** update multiples rows of table: "Profile" */
    update_Profile_many: ((Profile_mutation_response | null)[] | null)
    /** update data of the table: "Project" */
    update_Project: (Project_mutation_response | null)
    /** update data of the table: "ProjectMedia" */
    update_ProjectMedia: (ProjectMedia_mutation_response | null)
    /** update multiples rows of table: "ProjectMedia" */
    update_ProjectMedia_many: ((ProjectMedia_mutation_response | null)[] | null)
    /** update single row of the table: "Project" */
    update_Project_by_pk: (Project | null)
    /** update multiples rows of table: "Project" */
    update_Project_many: ((Project_mutation_response | null)[] | null)
    /** update data of the table: "Wallet" */
    update_Wallet: (Wallet_mutation_response | null)
    /** update single row of the table: "Wallet" */
    update_Wallet_by_pk: (Wallet | null)
    /** update multiples rows of table: "Wallet" */
    update_Wallet_many: ((Wallet_mutation_response | null)[] | null)
    /** update data of the table: "_prisma_migrations" */
    update__prisma_migrations: (_prisma_migrations_mutation_response | null)
    /** update single row of the table: "_prisma_migrations" */
    update__prisma_migrations_by_pk: (_prisma_migrations | null)
    /** update multiples rows of table: "_prisma_migrations" */
    update__prisma_migrations_many: ((_prisma_migrations_mutation_response | null)[] | null)
    __typename: 'mutation_root'
}


/** column ordering options */
export type order_by = 'asc' | 'asc_nulls_first' | 'asc_nulls_last' | 'desc' | 'desc_nulls_first' | 'desc_nulls_last'

export interface query_root {
    /** fetch data from the table: "Account" */
    Account: Account[]
    /** fetch aggregated fields from the table: "Account" */
    Account_aggregate: Account_aggregate
    /** fetch data from the table: "Account" using primary key columns */
    Account_by_pk: (Account | null)
    /** fetch data from the table: "Media" */
    Media: Media[]
    /** fetch aggregated fields from the table: "Media" */
    Media_aggregate: Media_aggregate
    /** fetch data from the table: "Media" using primary key columns */
    Media_by_pk: (Media | null)
    /** fetch data from the table: "Profile" */
    Profile: Profile[]
    /** fetch aggregated fields from the table: "Profile" */
    Profile_aggregate: Profile_aggregate
    /** fetch data from the table: "Profile" using primary key columns */
    Profile_by_pk: (Profile | null)
    /** fetch data from the table: "Project" */
    Project: Project[]
    /** fetch data from the table: "ProjectMedia" */
    ProjectMedia: ProjectMedia[]
    /** fetch aggregated fields from the table: "ProjectMedia" */
    ProjectMedia_aggregate: ProjectMedia_aggregate
    /** fetch aggregated fields from the table: "Project" */
    Project_aggregate: Project_aggregate
    /** fetch data from the table: "Project" using primary key columns */
    Project_by_pk: (Project | null)
    /** fetch data from the table: "Wallet" */
    Wallet: Wallet[]
    /** fetch aggregated fields from the table: "Wallet" */
    Wallet_aggregate: Wallet_aggregate
    /** fetch data from the table: "Wallet" using primary key columns */
    Wallet_by_pk: (Wallet | null)
    /** fetch data from the table: "_prisma_migrations" */
    _prisma_migrations: _prisma_migrations[]
    /** fetch aggregated fields from the table: "_prisma_migrations" */
    _prisma_migrations_aggregate: _prisma_migrations_aggregate
    /** fetch data from the table: "_prisma_migrations" using primary key columns */
    _prisma_migrations_by_pk: (_prisma_migrations | null)
    mediaFullUrl: Scalars['String']
    __typename: 'query_root'
}

export interface subscription_root {
    /** fetch data from the table: "Account" */
    Account: Account[]
    /** fetch aggregated fields from the table: "Account" */
    Account_aggregate: Account_aggregate
    /** fetch data from the table: "Account" using primary key columns */
    Account_by_pk: (Account | null)
    /** fetch data from the table in a streaming manner: "Account" */
    Account_stream: Account[]
    /** fetch data from the table: "Media" */
    Media: Media[]
    /** fetch aggregated fields from the table: "Media" */
    Media_aggregate: Media_aggregate
    /** fetch data from the table: "Media" using primary key columns */
    Media_by_pk: (Media | null)
    /** fetch data from the table in a streaming manner: "Media" */
    Media_stream: Media[]
    /** fetch data from the table: "Profile" */
    Profile: Profile[]
    /** fetch aggregated fields from the table: "Profile" */
    Profile_aggregate: Profile_aggregate
    /** fetch data from the table: "Profile" using primary key columns */
    Profile_by_pk: (Profile | null)
    /** fetch data from the table in a streaming manner: "Profile" */
    Profile_stream: Profile[]
    /** fetch data from the table: "Project" */
    Project: Project[]
    /** fetch data from the table: "ProjectMedia" */
    ProjectMedia: ProjectMedia[]
    /** fetch aggregated fields from the table: "ProjectMedia" */
    ProjectMedia_aggregate: ProjectMedia_aggregate
    /** fetch data from the table in a streaming manner: "ProjectMedia" */
    ProjectMedia_stream: ProjectMedia[]
    /** fetch aggregated fields from the table: "Project" */
    Project_aggregate: Project_aggregate
    /** fetch data from the table: "Project" using primary key columns */
    Project_by_pk: (Project | null)
    /** fetch data from the table in a streaming manner: "Project" */
    Project_stream: Project[]
    /** fetch data from the table: "Wallet" */
    Wallet: Wallet[]
    /** fetch aggregated fields from the table: "Wallet" */
    Wallet_aggregate: Wallet_aggregate
    /** fetch data from the table: "Wallet" using primary key columns */
    Wallet_by_pk: (Wallet | null)
    /** fetch data from the table in a streaming manner: "Wallet" */
    Wallet_stream: Wallet[]
    /** fetch data from the table: "_prisma_migrations" */
    _prisma_migrations: _prisma_migrations[]
    /** fetch aggregated fields from the table: "_prisma_migrations" */
    _prisma_migrations_aggregate: _prisma_migrations_aggregate
    /** fetch data from the table: "_prisma_migrations" using primary key columns */
    _prisma_migrations_by_pk: (_prisma_migrations | null)
    /** fetch data from the table in a streaming manner: "_prisma_migrations" */
    _prisma_migrations_stream: _prisma_migrations[]
    __typename: 'subscription_root'
}

export type Query = query_root
export type Mutation = mutation_root
export type Subscription = subscription_root


/** columns and relationships of "Account" */
export interface AccountGenqlSelection{
    /** An array relationship */
    authoredProjects?: (ProjectGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Project_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Project_order_by[] | null), 
    /** filter the rows returned */
    where?: (Project_bool_exp | null)} })
    /** An aggregate relationship */
    authoredProjects_aggregate?: (Project_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Project_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Project_order_by[] | null), 
    /** filter the rows returned */
    where?: (Project_bool_exp | null)} })
    /** An array relationship */
    curatedProjects?: (ProjectGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Project_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Project_order_by[] | null), 
    /** filter the rows returned */
    where?: (Project_bool_exp | null)} })
    /** An aggregate relationship */
    curatedProjects_aggregate?: (Project_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Project_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Project_order_by[] | null), 
    /** filter the rows returned */
    where?: (Project_bool_exp | null)} })
    id?: boolean | number
    /** An array relationship */
    profile?: (ProfileGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Profile_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Profile_order_by[] | null), 
    /** filter the rows returned */
    where?: (Profile_bool_exp | null)} })
    /** An aggregate relationship */
    profile_aggregate?: (Profile_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Profile_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Profile_order_by[] | null), 
    /** filter the rows returned */
    where?: (Profile_bool_exp | null)} })
    status?: boolean | number
    username?: boolean | number
    /** An array relationship */
    wallets?: (WalletGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Wallet_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Wallet_order_by[] | null), 
    /** filter the rows returned */
    where?: (Wallet_bool_exp | null)} })
    /** An aggregate relationship */
    wallets_aggregate?: (Wallet_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Wallet_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Wallet_order_by[] | null), 
    /** filter the rows returned */
    where?: (Wallet_bool_exp | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to compare columns of type "AccountStatus". All fields are combined with logical 'AND'. */
export interface AccountStatus_comparison_exp {_eq?: (Scalars['AccountStatus'] | null),_gt?: (Scalars['AccountStatus'] | null),_gte?: (Scalars['AccountStatus'] | null),_in?: (Scalars['AccountStatus'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['AccountStatus'] | null),_lte?: (Scalars['AccountStatus'] | null),_neq?: (Scalars['AccountStatus'] | null),_nin?: (Scalars['AccountStatus'][] | null)}


/** aggregated selection of "Account" */
export interface Account_aggregateGenqlSelection{
    aggregate?: Account_aggregate_fieldsGenqlSelection
    nodes?: AccountGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate fields of "Account" */
export interface Account_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (Account_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: Account_max_fieldsGenqlSelection
    min?: Account_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "Account". All fields are combined with a logical 'AND'. */
export interface Account_bool_exp {_and?: (Account_bool_exp[] | null),_not?: (Account_bool_exp | null),_or?: (Account_bool_exp[] | null),authoredProjects?: (Project_bool_exp | null),authoredProjects_aggregate?: (Project_aggregate_bool_exp | null),curatedProjects?: (Project_bool_exp | null),curatedProjects_aggregate?: (Project_aggregate_bool_exp | null),id?: (uuid_comparison_exp | null),profile?: (Profile_bool_exp | null),profile_aggregate?: (Profile_aggregate_bool_exp | null),status?: (AccountStatus_comparison_exp | null),username?: (String_comparison_exp | null),wallets?: (Wallet_bool_exp | null),wallets_aggregate?: (Wallet_aggregate_bool_exp | null)}


/** input type for inserting data into table "Account" */
export interface Account_insert_input {authoredProjects?: (Project_arr_rel_insert_input | null),curatedProjects?: (Project_arr_rel_insert_input | null),id?: (Scalars['uuid'] | null),profile?: (Profile_arr_rel_insert_input | null),status?: (Scalars['AccountStatus'] | null),username?: (Scalars['String'] | null),wallets?: (Wallet_arr_rel_insert_input | null)}


/** aggregate max on columns */
export interface Account_max_fieldsGenqlSelection{
    id?: boolean | number
    status?: boolean | number
    username?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate min on columns */
export interface Account_min_fieldsGenqlSelection{
    id?: boolean | number
    status?: boolean | number
    username?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** response of any mutation on the table "Account" */
export interface Account_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: AccountGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** input type for inserting object relation for remote table "Account" */
export interface Account_obj_rel_insert_input {data: Account_insert_input,
/** upsert condition */
on_conflict?: (Account_on_conflict | null)}


/** on_conflict condition type for table "Account" */
export interface Account_on_conflict {constraint: Account_constraint,update_columns?: Account_update_column[],where?: (Account_bool_exp | null)}


/** Ordering options when selecting data from "Account". */
export interface Account_order_by {authoredProjects_aggregate?: (Project_aggregate_order_by | null),curatedProjects_aggregate?: (Project_aggregate_order_by | null),id?: (order_by | null),profile_aggregate?: (Profile_aggregate_order_by | null),status?: (order_by | null),username?: (order_by | null),wallets_aggregate?: (Wallet_aggregate_order_by | null)}


/** primary key columns input for table: Account */
export interface Account_pk_columns_input {id: Scalars['uuid']}


/** input type for updating data in table "Account" */
export interface Account_set_input {id?: (Scalars['uuid'] | null),status?: (Scalars['AccountStatus'] | null),username?: (Scalars['String'] | null)}


/** Streaming cursor of the table "Account" */
export interface Account_stream_cursor_input {
/** Stream column input with initial value */
initial_value: Account_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface Account_stream_cursor_value_input {id?: (Scalars['uuid'] | null),status?: (Scalars['AccountStatus'] | null),username?: (Scalars['String'] | null)}

export interface Account_updates {
/** sets the columns of the filtered rows to the given values */
_set?: (Account_set_input | null),
/** filter the rows which have to be updated */
where: Account_bool_exp}


/** Boolean expression to compare columns of type "BlockchainNetwork". All fields are combined with logical 'AND'. */
export interface BlockchainNetwork_comparison_exp {_eq?: (Scalars['BlockchainNetwork'] | null),_gt?: (Scalars['BlockchainNetwork'] | null),_gte?: (Scalars['BlockchainNetwork'] | null),_in?: (Scalars['BlockchainNetwork'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['BlockchainNetwork'] | null),_lte?: (Scalars['BlockchainNetwork'] | null),_neq?: (Scalars['BlockchainNetwork'] | null),_nin?: (Scalars['BlockchainNetwork'][] | null)}


/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export interface Int_comparison_exp {_eq?: (Scalars['Int'] | null),_gt?: (Scalars['Int'] | null),_gte?: (Scalars['Int'] | null),_in?: (Scalars['Int'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['Int'] | null),_lte?: (Scalars['Int'] | null),_neq?: (Scalars['Int'] | null),_nin?: (Scalars['Int'][] | null)}


/** columns and relationships of "Media" */
export interface MediaGenqlSelection{
    bucketId?: boolean | number
    createdAt?: boolean | number
    etag?: boolean | number
    id?: boolean | number
    name?: boolean | number
    /** An array relationship */
    project?: (ProjectMediaGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (ProjectMedia_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (ProjectMedia_order_by[] | null), 
    /** filter the rows returned */
    where?: (ProjectMedia_bool_exp | null)} })
    /** An aggregate relationship */
    project_aggregate?: (ProjectMedia_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (ProjectMedia_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (ProjectMedia_order_by[] | null), 
    /** filter the rows returned */
    where?: (ProjectMedia_bool_exp | null)} })
    s3key?: boolean | number
    size?: boolean | number
    updatedAt?: boolean | number
    /** An object relationship */
    uploader?: AccountGenqlSelection
    uploaderId?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "Media" */
export interface Media_aggregateGenqlSelection{
    aggregate?: Media_aggregate_fieldsGenqlSelection
    nodes?: MediaGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate fields of "Media" */
export interface Media_aggregate_fieldsGenqlSelection{
    avg?: Media_avg_fieldsGenqlSelection
    count?: { __args: {columns?: (Media_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: Media_max_fieldsGenqlSelection
    min?: Media_min_fieldsGenqlSelection
    stddev?: Media_stddev_fieldsGenqlSelection
    stddev_pop?: Media_stddev_pop_fieldsGenqlSelection
    stddev_samp?: Media_stddev_samp_fieldsGenqlSelection
    sum?: Media_sum_fieldsGenqlSelection
    var_pop?: Media_var_pop_fieldsGenqlSelection
    var_samp?: Media_var_samp_fieldsGenqlSelection
    variance?: Media_variance_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate avg on columns */
export interface Media_avg_fieldsGenqlSelection{
    size?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "Media". All fields are combined with a logical 'AND'. */
export interface Media_bool_exp {_and?: (Media_bool_exp[] | null),_not?: (Media_bool_exp | null),_or?: (Media_bool_exp[] | null),bucketId?: (String_comparison_exp | null),createdAt?: (timestamp_comparison_exp | null),etag?: (String_comparison_exp | null),id?: (uuid_comparison_exp | null),name?: (String_comparison_exp | null),project?: (ProjectMedia_bool_exp | null),project_aggregate?: (ProjectMedia_aggregate_bool_exp | null),s3key?: (String_comparison_exp | null),size?: (Int_comparison_exp | null),updatedAt?: (timestamp_comparison_exp | null),uploader?: (Account_bool_exp | null),uploaderId?: (uuid_comparison_exp | null)}


/** input type for incrementing numeric columns in table "Media" */
export interface Media_inc_input {size?: (Scalars['Int'] | null)}


/** input type for inserting data into table "Media" */
export interface Media_insert_input {bucketId?: (Scalars['String'] | null),createdAt?: (Scalars['timestamp'] | null),etag?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),name?: (Scalars['String'] | null),project?: (ProjectMedia_arr_rel_insert_input | null),s3key?: (Scalars['String'] | null),size?: (Scalars['Int'] | null),updatedAt?: (Scalars['timestamp'] | null),uploader?: (Account_obj_rel_insert_input | null),uploaderId?: (Scalars['uuid'] | null)}


/** aggregate max on columns */
export interface Media_max_fieldsGenqlSelection{
    bucketId?: boolean | number
    createdAt?: boolean | number
    etag?: boolean | number
    id?: boolean | number
    name?: boolean | number
    s3key?: boolean | number
    size?: boolean | number
    updatedAt?: boolean | number
    uploaderId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate min on columns */
export interface Media_min_fieldsGenqlSelection{
    bucketId?: boolean | number
    createdAt?: boolean | number
    etag?: boolean | number
    id?: boolean | number
    name?: boolean | number
    s3key?: boolean | number
    size?: boolean | number
    updatedAt?: boolean | number
    uploaderId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** response of any mutation on the table "Media" */
export interface Media_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: MediaGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** input type for inserting object relation for remote table "Media" */
export interface Media_obj_rel_insert_input {data: Media_insert_input,
/** upsert condition */
on_conflict?: (Media_on_conflict | null)}


/** on_conflict condition type for table "Media" */
export interface Media_on_conflict {constraint: Media_constraint,update_columns?: Media_update_column[],where?: (Media_bool_exp | null)}


/** Ordering options when selecting data from "Media". */
export interface Media_order_by {bucketId?: (order_by | null),createdAt?: (order_by | null),etag?: (order_by | null),id?: (order_by | null),name?: (order_by | null),project_aggregate?: (ProjectMedia_aggregate_order_by | null),s3key?: (order_by | null),size?: (order_by | null),updatedAt?: (order_by | null),uploader?: (Account_order_by | null),uploaderId?: (order_by | null)}


/** primary key columns input for table: Media */
export interface Media_pk_columns_input {id: Scalars['uuid']}


/** input type for updating data in table "Media" */
export interface Media_set_input {bucketId?: (Scalars['String'] | null),createdAt?: (Scalars['timestamp'] | null),etag?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),name?: (Scalars['String'] | null),s3key?: (Scalars['String'] | null),size?: (Scalars['Int'] | null),updatedAt?: (Scalars['timestamp'] | null),uploaderId?: (Scalars['uuid'] | null)}


/** aggregate stddev on columns */
export interface Media_stddev_fieldsGenqlSelection{
    size?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate stddev_pop on columns */
export interface Media_stddev_pop_fieldsGenqlSelection{
    size?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate stddev_samp on columns */
export interface Media_stddev_samp_fieldsGenqlSelection{
    size?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Streaming cursor of the table "Media" */
export interface Media_stream_cursor_input {
/** Stream column input with initial value */
initial_value: Media_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface Media_stream_cursor_value_input {bucketId?: (Scalars['String'] | null),createdAt?: (Scalars['timestamp'] | null),etag?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),name?: (Scalars['String'] | null),s3key?: (Scalars['String'] | null),size?: (Scalars['Int'] | null),updatedAt?: (Scalars['timestamp'] | null),uploaderId?: (Scalars['uuid'] | null)}


/** aggregate sum on columns */
export interface Media_sum_fieldsGenqlSelection{
    size?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface Media_updates {
/** increments the numeric columns with given value of the filtered values */
_inc?: (Media_inc_input | null),
/** sets the columns of the filtered rows to the given values */
_set?: (Media_set_input | null),
/** filter the rows which have to be updated */
where: Media_bool_exp}


/** aggregate var_pop on columns */
export interface Media_var_pop_fieldsGenqlSelection{
    size?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate var_samp on columns */
export interface Media_var_samp_fieldsGenqlSelection{
    size?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate variance on columns */
export interface Media_variance_fieldsGenqlSelection{
    size?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** columns and relationships of "Profile" */
export interface ProfileGenqlSelection{
    accountId?: boolean | number
    description?: boolean | number
    instagram?: boolean | number
    picture?: boolean | number
    twitter?: boolean | number
    website?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "Profile" */
export interface Profile_aggregateGenqlSelection{
    aggregate?: Profile_aggregate_fieldsGenqlSelection
    nodes?: ProfileGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface Profile_aggregate_bool_exp {count?: (Profile_aggregate_bool_exp_count | null)}

export interface Profile_aggregate_bool_exp_count {arguments?: (Profile_select_column[] | null),distinct?: (Scalars['Boolean'] | null),filter?: (Profile_bool_exp | null),predicate: Int_comparison_exp}


/** aggregate fields of "Profile" */
export interface Profile_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (Profile_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: Profile_max_fieldsGenqlSelection
    min?: Profile_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "Profile" */
export interface Profile_aggregate_order_by {count?: (order_by | null),max?: (Profile_max_order_by | null),min?: (Profile_min_order_by | null)}


/** input type for inserting array relation for remote table "Profile" */
export interface Profile_arr_rel_insert_input {data: Profile_insert_input[],
/** upsert condition */
on_conflict?: (Profile_on_conflict | null)}


/** Boolean expression to filter rows from the table "Profile". All fields are combined with a logical 'AND'. */
export interface Profile_bool_exp {_and?: (Profile_bool_exp[] | null),_not?: (Profile_bool_exp | null),_or?: (Profile_bool_exp[] | null),accountId?: (uuid_comparison_exp | null),description?: (String_comparison_exp | null),instagram?: (String_comparison_exp | null),picture?: (String_comparison_exp | null),twitter?: (String_comparison_exp | null),website?: (String_comparison_exp | null)}


/** input type for inserting data into table "Profile" */
export interface Profile_insert_input {accountId?: (Scalars['uuid'] | null),description?: (Scalars['String'] | null),instagram?: (Scalars['String'] | null),picture?: (Scalars['String'] | null),twitter?: (Scalars['String'] | null),website?: (Scalars['String'] | null)}


/** aggregate max on columns */
export interface Profile_max_fieldsGenqlSelection{
    accountId?: boolean | number
    description?: boolean | number
    instagram?: boolean | number
    picture?: boolean | number
    twitter?: boolean | number
    website?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by max() on columns of table "Profile" */
export interface Profile_max_order_by {accountId?: (order_by | null),description?: (order_by | null),instagram?: (order_by | null),picture?: (order_by | null),twitter?: (order_by | null),website?: (order_by | null)}


/** aggregate min on columns */
export interface Profile_min_fieldsGenqlSelection{
    accountId?: boolean | number
    description?: boolean | number
    instagram?: boolean | number
    picture?: boolean | number
    twitter?: boolean | number
    website?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by min() on columns of table "Profile" */
export interface Profile_min_order_by {accountId?: (order_by | null),description?: (order_by | null),instagram?: (order_by | null),picture?: (order_by | null),twitter?: (order_by | null),website?: (order_by | null)}


/** response of any mutation on the table "Profile" */
export interface Profile_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: ProfileGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** on_conflict condition type for table "Profile" */
export interface Profile_on_conflict {constraint: Profile_constraint,update_columns?: Profile_update_column[],where?: (Profile_bool_exp | null)}


/** Ordering options when selecting data from "Profile". */
export interface Profile_order_by {accountId?: (order_by | null),description?: (order_by | null),instagram?: (order_by | null),picture?: (order_by | null),twitter?: (order_by | null),website?: (order_by | null)}


/** primary key columns input for table: Profile */
export interface Profile_pk_columns_input {accountId: Scalars['uuid']}


/** input type for updating data in table "Profile" */
export interface Profile_set_input {accountId?: (Scalars['uuid'] | null),description?: (Scalars['String'] | null),instagram?: (Scalars['String'] | null),picture?: (Scalars['String'] | null),twitter?: (Scalars['String'] | null),website?: (Scalars['String'] | null)}


/** Streaming cursor of the table "Profile" */
export interface Profile_stream_cursor_input {
/** Stream column input with initial value */
initial_value: Profile_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface Profile_stream_cursor_value_input {accountId?: (Scalars['uuid'] | null),description?: (Scalars['String'] | null),instagram?: (Scalars['String'] | null),picture?: (Scalars['String'] | null),twitter?: (Scalars['String'] | null),website?: (Scalars['String'] | null)}

export interface Profile_updates {
/** sets the columns of the filtered rows to the given values */
_set?: (Profile_set_input | null),
/** filter the rows which have to be updated */
where: Profile_bool_exp}


/** columns and relationships of "Project" */
export interface ProjectGenqlSelection{
    /** An object relationship */
    author?: AccountGenqlSelection
    authorId?: boolean | number
    blockchain?: boolean | number
    createdAt?: boolean | number
    /** An object relationship */
    curator?: AccountGenqlSelection
    curatorId?: boolean | number
    description?: boolean | number
    id?: boolean | number
    pricing?: { __args: {
    /** JSON select path */
    path?: (Scalars['String'] | null)} } | boolean | number
    /** An array relationship */
    projectMedias?: (ProjectMediaGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (ProjectMedia_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (ProjectMedia_order_by[] | null), 
    /** filter the rows returned */
    where?: (ProjectMedia_bool_exp | null)} })
    /** An aggregate relationship */
    projectMedias_aggregate?: (ProjectMedia_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (ProjectMedia_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (ProjectMedia_order_by[] | null), 
    /** filter the rows returned */
    where?: (ProjectMedia_bool_exp | null)} })
    releaseAt?: boolean | number
    state?: boolean | number
    storage?: boolean | number
    title?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** columns and relationships of "ProjectMedia" */
export interface ProjectMediaGenqlSelection{
    index?: boolean | number
    /** An object relationship */
    media?: MediaGenqlSelection
    mediaId?: boolean | number
    /** An object relationship */
    project?: ProjectGenqlSelection
    projectId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "ProjectMedia" */
export interface ProjectMedia_aggregateGenqlSelection{
    aggregate?: ProjectMedia_aggregate_fieldsGenqlSelection
    nodes?: ProjectMediaGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectMedia_aggregate_bool_exp {count?: (ProjectMedia_aggregate_bool_exp_count | null)}

export interface ProjectMedia_aggregate_bool_exp_count {arguments?: (ProjectMedia_select_column[] | null),distinct?: (Scalars['Boolean'] | null),filter?: (ProjectMedia_bool_exp | null),predicate: Int_comparison_exp}


/** aggregate fields of "ProjectMedia" */
export interface ProjectMedia_aggregate_fieldsGenqlSelection{
    avg?: ProjectMedia_avg_fieldsGenqlSelection
    count?: { __args: {columns?: (ProjectMedia_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: ProjectMedia_max_fieldsGenqlSelection
    min?: ProjectMedia_min_fieldsGenqlSelection
    stddev?: ProjectMedia_stddev_fieldsGenqlSelection
    stddev_pop?: ProjectMedia_stddev_pop_fieldsGenqlSelection
    stddev_samp?: ProjectMedia_stddev_samp_fieldsGenqlSelection
    sum?: ProjectMedia_sum_fieldsGenqlSelection
    var_pop?: ProjectMedia_var_pop_fieldsGenqlSelection
    var_samp?: ProjectMedia_var_samp_fieldsGenqlSelection
    variance?: ProjectMedia_variance_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "ProjectMedia" */
export interface ProjectMedia_aggregate_order_by {avg?: (ProjectMedia_avg_order_by | null),count?: (order_by | null),max?: (ProjectMedia_max_order_by | null),min?: (ProjectMedia_min_order_by | null),stddev?: (ProjectMedia_stddev_order_by | null),stddev_pop?: (ProjectMedia_stddev_pop_order_by | null),stddev_samp?: (ProjectMedia_stddev_samp_order_by | null),sum?: (ProjectMedia_sum_order_by | null),var_pop?: (ProjectMedia_var_pop_order_by | null),var_samp?: (ProjectMedia_var_samp_order_by | null),variance?: (ProjectMedia_variance_order_by | null)}


/** input type for inserting array relation for remote table "ProjectMedia" */
export interface ProjectMedia_arr_rel_insert_input {data: ProjectMedia_insert_input[],
/** upsert condition */
on_conflict?: (ProjectMedia_on_conflict | null)}


/** aggregate avg on columns */
export interface ProjectMedia_avg_fieldsGenqlSelection{
    index?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by avg() on columns of table "ProjectMedia" */
export interface ProjectMedia_avg_order_by {index?: (order_by | null)}


/** Boolean expression to filter rows from the table "ProjectMedia". All fields are combined with a logical 'AND'. */
export interface ProjectMedia_bool_exp {_and?: (ProjectMedia_bool_exp[] | null),_not?: (ProjectMedia_bool_exp | null),_or?: (ProjectMedia_bool_exp[] | null),index?: (smallint_comparison_exp | null),media?: (Media_bool_exp | null),mediaId?: (uuid_comparison_exp | null),project?: (Project_bool_exp | null),projectId?: (uuid_comparison_exp | null)}


/** input type for incrementing numeric columns in table "ProjectMedia" */
export interface ProjectMedia_inc_input {index?: (Scalars['smallint'] | null)}


/** input type for inserting data into table "ProjectMedia" */
export interface ProjectMedia_insert_input {index?: (Scalars['smallint'] | null),media?: (Media_obj_rel_insert_input | null),mediaId?: (Scalars['uuid'] | null),project?: (Project_obj_rel_insert_input | null),projectId?: (Scalars['uuid'] | null)}


/** aggregate max on columns */
export interface ProjectMedia_max_fieldsGenqlSelection{
    index?: boolean | number
    mediaId?: boolean | number
    projectId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by max() on columns of table "ProjectMedia" */
export interface ProjectMedia_max_order_by {index?: (order_by | null),mediaId?: (order_by | null),projectId?: (order_by | null)}


/** aggregate min on columns */
export interface ProjectMedia_min_fieldsGenqlSelection{
    index?: boolean | number
    mediaId?: boolean | number
    projectId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by min() on columns of table "ProjectMedia" */
export interface ProjectMedia_min_order_by {index?: (order_by | null),mediaId?: (order_by | null),projectId?: (order_by | null)}


/** response of any mutation on the table "ProjectMedia" */
export interface ProjectMedia_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: ProjectMediaGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** on_conflict condition type for table "ProjectMedia" */
export interface ProjectMedia_on_conflict {constraint: ProjectMedia_constraint,update_columns?: ProjectMedia_update_column[],where?: (ProjectMedia_bool_exp | null)}


/** Ordering options when selecting data from "ProjectMedia". */
export interface ProjectMedia_order_by {index?: (order_by | null),media?: (Media_order_by | null),mediaId?: (order_by | null),project?: (Project_order_by | null),projectId?: (order_by | null)}


/** input type for updating data in table "ProjectMedia" */
export interface ProjectMedia_set_input {index?: (Scalars['smallint'] | null),mediaId?: (Scalars['uuid'] | null),projectId?: (Scalars['uuid'] | null)}


/** aggregate stddev on columns */
export interface ProjectMedia_stddev_fieldsGenqlSelection{
    index?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by stddev() on columns of table "ProjectMedia" */
export interface ProjectMedia_stddev_order_by {index?: (order_by | null)}


/** aggregate stddev_pop on columns */
export interface ProjectMedia_stddev_pop_fieldsGenqlSelection{
    index?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by stddev_pop() on columns of table "ProjectMedia" */
export interface ProjectMedia_stddev_pop_order_by {index?: (order_by | null)}


/** aggregate stddev_samp on columns */
export interface ProjectMedia_stddev_samp_fieldsGenqlSelection{
    index?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by stddev_samp() on columns of table "ProjectMedia" */
export interface ProjectMedia_stddev_samp_order_by {index?: (order_by | null)}


/** Streaming cursor of the table "ProjectMedia" */
export interface ProjectMedia_stream_cursor_input {
/** Stream column input with initial value */
initial_value: ProjectMedia_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface ProjectMedia_stream_cursor_value_input {index?: (Scalars['smallint'] | null),mediaId?: (Scalars['uuid'] | null),projectId?: (Scalars['uuid'] | null)}


/** aggregate sum on columns */
export interface ProjectMedia_sum_fieldsGenqlSelection{
    index?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by sum() on columns of table "ProjectMedia" */
export interface ProjectMedia_sum_order_by {index?: (order_by | null)}

export interface ProjectMedia_updates {
/** increments the numeric columns with given value of the filtered values */
_inc?: (ProjectMedia_inc_input | null),
/** sets the columns of the filtered rows to the given values */
_set?: (ProjectMedia_set_input | null),
/** filter the rows which have to be updated */
where: ProjectMedia_bool_exp}


/** aggregate var_pop on columns */
export interface ProjectMedia_var_pop_fieldsGenqlSelection{
    index?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by var_pop() on columns of table "ProjectMedia" */
export interface ProjectMedia_var_pop_order_by {index?: (order_by | null)}


/** aggregate var_samp on columns */
export interface ProjectMedia_var_samp_fieldsGenqlSelection{
    index?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by var_samp() on columns of table "ProjectMedia" */
export interface ProjectMedia_var_samp_order_by {index?: (order_by | null)}


/** aggregate variance on columns */
export interface ProjectMedia_variance_fieldsGenqlSelection{
    index?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by variance() on columns of table "ProjectMedia" */
export interface ProjectMedia_variance_order_by {index?: (order_by | null)}


/** Boolean expression to compare columns of type "ProjectState". All fields are combined with logical 'AND'. */
export interface ProjectState_comparison_exp {_eq?: (Scalars['ProjectState'] | null),_gt?: (Scalars['ProjectState'] | null),_gte?: (Scalars['ProjectState'] | null),_in?: (Scalars['ProjectState'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['ProjectState'] | null),_lte?: (Scalars['ProjectState'] | null),_neq?: (Scalars['ProjectState'] | null),_nin?: (Scalars['ProjectState'][] | null)}


/** aggregated selection of "Project" */
export interface Project_aggregateGenqlSelection{
    aggregate?: Project_aggregate_fieldsGenqlSelection
    nodes?: ProjectGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface Project_aggregate_bool_exp {count?: (Project_aggregate_bool_exp_count | null)}

export interface Project_aggregate_bool_exp_count {arguments?: (Project_select_column[] | null),distinct?: (Scalars['Boolean'] | null),filter?: (Project_bool_exp | null),predicate: Int_comparison_exp}


/** aggregate fields of "Project" */
export interface Project_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (Project_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: Project_max_fieldsGenqlSelection
    min?: Project_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "Project" */
export interface Project_aggregate_order_by {count?: (order_by | null),max?: (Project_max_order_by | null),min?: (Project_min_order_by | null)}


/** append existing jsonb value of filtered columns with new jsonb value */
export interface Project_append_input {pricing?: (Scalars['jsonb'] | null)}


/** input type for inserting array relation for remote table "Project" */
export interface Project_arr_rel_insert_input {data: Project_insert_input[],
/** upsert condition */
on_conflict?: (Project_on_conflict | null)}


/** Boolean expression to filter rows from the table "Project". All fields are combined with a logical 'AND'. */
export interface Project_bool_exp {_and?: (Project_bool_exp[] | null),_not?: (Project_bool_exp | null),_or?: (Project_bool_exp[] | null),author?: (Account_bool_exp | null),authorId?: (uuid_comparison_exp | null),blockchain?: (BlockchainNetwork_comparison_exp | null),createdAt?: (timestamp_comparison_exp | null),curator?: (Account_bool_exp | null),curatorId?: (uuid_comparison_exp | null),description?: (String_comparison_exp | null),id?: (uuid_comparison_exp | null),pricing?: (jsonb_comparison_exp | null),projectMedias?: (ProjectMedia_bool_exp | null),projectMedias_aggregate?: (ProjectMedia_aggregate_bool_exp | null),releaseAt?: (timestamp_comparison_exp | null),state?: (ProjectState_comparison_exp | null),storage?: (Storage_comparison_exp | null),title?: (String_comparison_exp | null),updatedAt?: (timestamp_comparison_exp | null)}


/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export interface Project_delete_at_path_input {pricing?: (Scalars['String'][] | null)}


/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export interface Project_delete_elem_input {pricing?: (Scalars['Int'] | null)}


/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export interface Project_delete_key_input {pricing?: (Scalars['String'] | null)}


/** input type for inserting data into table "Project" */
export interface Project_insert_input {author?: (Account_obj_rel_insert_input | null),authorId?: (Scalars['uuid'] | null),blockchain?: (Scalars['BlockchainNetwork'] | null),createdAt?: (Scalars['timestamp'] | null),curator?: (Account_obj_rel_insert_input | null),curatorId?: (Scalars['uuid'] | null),description?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),pricing?: (Scalars['jsonb'] | null),projectMedias?: (ProjectMedia_arr_rel_insert_input | null),releaseAt?: (Scalars['timestamp'] | null),state?: (Scalars['ProjectState'] | null),storage?: (Scalars['Storage'] | null),title?: (Scalars['String'] | null),updatedAt?: (Scalars['timestamp'] | null)}


/** aggregate max on columns */
export interface Project_max_fieldsGenqlSelection{
    authorId?: boolean | number
    blockchain?: boolean | number
    createdAt?: boolean | number
    curatorId?: boolean | number
    description?: boolean | number
    id?: boolean | number
    releaseAt?: boolean | number
    state?: boolean | number
    storage?: boolean | number
    title?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by max() on columns of table "Project" */
export interface Project_max_order_by {authorId?: (order_by | null),blockchain?: (order_by | null),createdAt?: (order_by | null),curatorId?: (order_by | null),description?: (order_by | null),id?: (order_by | null),releaseAt?: (order_by | null),state?: (order_by | null),storage?: (order_by | null),title?: (order_by | null),updatedAt?: (order_by | null)}


/** aggregate min on columns */
export interface Project_min_fieldsGenqlSelection{
    authorId?: boolean | number
    blockchain?: boolean | number
    createdAt?: boolean | number
    curatorId?: boolean | number
    description?: boolean | number
    id?: boolean | number
    releaseAt?: boolean | number
    state?: boolean | number
    storage?: boolean | number
    title?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by min() on columns of table "Project" */
export interface Project_min_order_by {authorId?: (order_by | null),blockchain?: (order_by | null),createdAt?: (order_by | null),curatorId?: (order_by | null),description?: (order_by | null),id?: (order_by | null),releaseAt?: (order_by | null),state?: (order_by | null),storage?: (order_by | null),title?: (order_by | null),updatedAt?: (order_by | null)}


/** response of any mutation on the table "Project" */
export interface Project_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: ProjectGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** input type for inserting object relation for remote table "Project" */
export interface Project_obj_rel_insert_input {data: Project_insert_input,
/** upsert condition */
on_conflict?: (Project_on_conflict | null)}


/** on_conflict condition type for table "Project" */
export interface Project_on_conflict {constraint: Project_constraint,update_columns?: Project_update_column[],where?: (Project_bool_exp | null)}


/** Ordering options when selecting data from "Project". */
export interface Project_order_by {author?: (Account_order_by | null),authorId?: (order_by | null),blockchain?: (order_by | null),createdAt?: (order_by | null),curator?: (Account_order_by | null),curatorId?: (order_by | null),description?: (order_by | null),id?: (order_by | null),pricing?: (order_by | null),projectMedias_aggregate?: (ProjectMedia_aggregate_order_by | null),releaseAt?: (order_by | null),state?: (order_by | null),storage?: (order_by | null),title?: (order_by | null),updatedAt?: (order_by | null)}


/** primary key columns input for table: Project */
export interface Project_pk_columns_input {id: Scalars['uuid']}


/** prepend existing jsonb value of filtered columns with new jsonb value */
export interface Project_prepend_input {pricing?: (Scalars['jsonb'] | null)}


/** input type for updating data in table "Project" */
export interface Project_set_input {authorId?: (Scalars['uuid'] | null),blockchain?: (Scalars['BlockchainNetwork'] | null),createdAt?: (Scalars['timestamp'] | null),curatorId?: (Scalars['uuid'] | null),description?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),pricing?: (Scalars['jsonb'] | null),releaseAt?: (Scalars['timestamp'] | null),state?: (Scalars['ProjectState'] | null),storage?: (Scalars['Storage'] | null),title?: (Scalars['String'] | null),updatedAt?: (Scalars['timestamp'] | null)}


/** Streaming cursor of the table "Project" */
export interface Project_stream_cursor_input {
/** Stream column input with initial value */
initial_value: Project_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface Project_stream_cursor_value_input {authorId?: (Scalars['uuid'] | null),blockchain?: (Scalars['BlockchainNetwork'] | null),createdAt?: (Scalars['timestamp'] | null),curatorId?: (Scalars['uuid'] | null),description?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),pricing?: (Scalars['jsonb'] | null),releaseAt?: (Scalars['timestamp'] | null),state?: (Scalars['ProjectState'] | null),storage?: (Scalars['Storage'] | null),title?: (Scalars['String'] | null),updatedAt?: (Scalars['timestamp'] | null)}

export interface Project_updates {
/** append existing jsonb value of filtered columns with new jsonb value */
_append?: (Project_append_input | null),
/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
_delete_at_path?: (Project_delete_at_path_input | null),
/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
_delete_elem?: (Project_delete_elem_input | null),
/** delete key/value pair or string element. key/value pairs are matched based on their key value */
_delete_key?: (Project_delete_key_input | null),
/** prepend existing jsonb value of filtered columns with new jsonb value */
_prepend?: (Project_prepend_input | null),
/** sets the columns of the filtered rows to the given values */
_set?: (Project_set_input | null),
/** filter the rows which have to be updated */
where: Project_bool_exp}


/** Boolean expression to compare columns of type "Storage". All fields are combined with logical 'AND'. */
export interface Storage_comparison_exp {_eq?: (Scalars['Storage'] | null),_gt?: (Scalars['Storage'] | null),_gte?: (Scalars['Storage'] | null),_in?: (Scalars['Storage'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['Storage'] | null),_lte?: (Scalars['Storage'] | null),_neq?: (Scalars['Storage'] | null),_nin?: (Scalars['Storage'][] | null)}


/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export interface String_comparison_exp {_eq?: (Scalars['String'] | null),_gt?: (Scalars['String'] | null),_gte?: (Scalars['String'] | null),
/** does the column match the given case-insensitive pattern */
_ilike?: (Scalars['String'] | null),_in?: (Scalars['String'][] | null),
/** does the column match the given POSIX regular expression, case insensitive */
_iregex?: (Scalars['String'] | null),_is_null?: (Scalars['Boolean'] | null),
/** does the column match the given pattern */
_like?: (Scalars['String'] | null),_lt?: (Scalars['String'] | null),_lte?: (Scalars['String'] | null),_neq?: (Scalars['String'] | null),
/** does the column NOT match the given case-insensitive pattern */
_nilike?: (Scalars['String'] | null),_nin?: (Scalars['String'][] | null),
/** does the column NOT match the given POSIX regular expression, case insensitive */
_niregex?: (Scalars['String'] | null),
/** does the column NOT match the given pattern */
_nlike?: (Scalars['String'] | null),
/** does the column NOT match the given POSIX regular expression, case sensitive */
_nregex?: (Scalars['String'] | null),
/** does the column NOT match the given SQL regular expression */
_nsimilar?: (Scalars['String'] | null),
/** does the column match the given POSIX regular expression, case sensitive */
_regex?: (Scalars['String'] | null),
/** does the column match the given SQL regular expression */
_similar?: (Scalars['String'] | null)}


/** columns and relationships of "Wallet" */
export interface WalletGenqlSelection{
    accountId?: boolean | number
    address?: boolean | number
    network?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "Wallet" */
export interface Wallet_aggregateGenqlSelection{
    aggregate?: Wallet_aggregate_fieldsGenqlSelection
    nodes?: WalletGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface Wallet_aggregate_bool_exp {count?: (Wallet_aggregate_bool_exp_count | null)}

export interface Wallet_aggregate_bool_exp_count {arguments?: (Wallet_select_column[] | null),distinct?: (Scalars['Boolean'] | null),filter?: (Wallet_bool_exp | null),predicate: Int_comparison_exp}


/** aggregate fields of "Wallet" */
export interface Wallet_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (Wallet_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: Wallet_max_fieldsGenqlSelection
    min?: Wallet_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "Wallet" */
export interface Wallet_aggregate_order_by {count?: (order_by | null),max?: (Wallet_max_order_by | null),min?: (Wallet_min_order_by | null)}


/** input type for inserting array relation for remote table "Wallet" */
export interface Wallet_arr_rel_insert_input {data: Wallet_insert_input[],
/** upsert condition */
on_conflict?: (Wallet_on_conflict | null)}


/** Boolean expression to filter rows from the table "Wallet". All fields are combined with a logical 'AND'. */
export interface Wallet_bool_exp {_and?: (Wallet_bool_exp[] | null),_not?: (Wallet_bool_exp | null),_or?: (Wallet_bool_exp[] | null),accountId?: (uuid_comparison_exp | null),address?: (String_comparison_exp | null),network?: (BlockchainNetwork_comparison_exp | null)}


/** input type for inserting data into table "Wallet" */
export interface Wallet_insert_input {accountId?: (Scalars['uuid'] | null),address?: (Scalars['String'] | null),network?: (Scalars['BlockchainNetwork'] | null)}


/** aggregate max on columns */
export interface Wallet_max_fieldsGenqlSelection{
    accountId?: boolean | number
    address?: boolean | number
    network?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by max() on columns of table "Wallet" */
export interface Wallet_max_order_by {accountId?: (order_by | null),address?: (order_by | null),network?: (order_by | null)}


/** aggregate min on columns */
export interface Wallet_min_fieldsGenqlSelection{
    accountId?: boolean | number
    address?: boolean | number
    network?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by min() on columns of table "Wallet" */
export interface Wallet_min_order_by {accountId?: (order_by | null),address?: (order_by | null),network?: (order_by | null)}


/** response of any mutation on the table "Wallet" */
export interface Wallet_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: WalletGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** on_conflict condition type for table "Wallet" */
export interface Wallet_on_conflict {constraint: Wallet_constraint,update_columns?: Wallet_update_column[],where?: (Wallet_bool_exp | null)}


/** Ordering options when selecting data from "Wallet". */
export interface Wallet_order_by {accountId?: (order_by | null),address?: (order_by | null),network?: (order_by | null)}


/** primary key columns input for table: Wallet */
export interface Wallet_pk_columns_input {address: Scalars['String']}


/** input type for updating data in table "Wallet" */
export interface Wallet_set_input {accountId?: (Scalars['uuid'] | null),address?: (Scalars['String'] | null),network?: (Scalars['BlockchainNetwork'] | null)}


/** Streaming cursor of the table "Wallet" */
export interface Wallet_stream_cursor_input {
/** Stream column input with initial value */
initial_value: Wallet_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface Wallet_stream_cursor_value_input {accountId?: (Scalars['uuid'] | null),address?: (Scalars['String'] | null),network?: (Scalars['BlockchainNetwork'] | null)}

export interface Wallet_updates {
/** sets the columns of the filtered rows to the given values */
_set?: (Wallet_set_input | null),
/** filter the rows which have to be updated */
where: Wallet_bool_exp}


/** columns and relationships of "_prisma_migrations" */
export interface _prisma_migrationsGenqlSelection{
    applied_steps_count?: boolean | number
    checksum?: boolean | number
    finished_at?: boolean | number
    id?: boolean | number
    logs?: boolean | number
    migration_name?: boolean | number
    rolled_back_at?: boolean | number
    started_at?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "_prisma_migrations" */
export interface _prisma_migrations_aggregateGenqlSelection{
    aggregate?: _prisma_migrations_aggregate_fieldsGenqlSelection
    nodes?: _prisma_migrationsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate fields of "_prisma_migrations" */
export interface _prisma_migrations_aggregate_fieldsGenqlSelection{
    avg?: _prisma_migrations_avg_fieldsGenqlSelection
    count?: { __args: {columns?: (_prisma_migrations_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: _prisma_migrations_max_fieldsGenqlSelection
    min?: _prisma_migrations_min_fieldsGenqlSelection
    stddev?: _prisma_migrations_stddev_fieldsGenqlSelection
    stddev_pop?: _prisma_migrations_stddev_pop_fieldsGenqlSelection
    stddev_samp?: _prisma_migrations_stddev_samp_fieldsGenqlSelection
    sum?: _prisma_migrations_sum_fieldsGenqlSelection
    var_pop?: _prisma_migrations_var_pop_fieldsGenqlSelection
    var_samp?: _prisma_migrations_var_samp_fieldsGenqlSelection
    variance?: _prisma_migrations_variance_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate avg on columns */
export interface _prisma_migrations_avg_fieldsGenqlSelection{
    applied_steps_count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "_prisma_migrations". All fields are combined with a logical 'AND'. */
export interface _prisma_migrations_bool_exp {_and?: (_prisma_migrations_bool_exp[] | null),_not?: (_prisma_migrations_bool_exp | null),_or?: (_prisma_migrations_bool_exp[] | null),applied_steps_count?: (Int_comparison_exp | null),checksum?: (String_comparison_exp | null),finished_at?: (timestamptz_comparison_exp | null),id?: (String_comparison_exp | null),logs?: (String_comparison_exp | null),migration_name?: (String_comparison_exp | null),rolled_back_at?: (timestamptz_comparison_exp | null),started_at?: (timestamptz_comparison_exp | null)}


/** input type for incrementing numeric columns in table "_prisma_migrations" */
export interface _prisma_migrations_inc_input {applied_steps_count?: (Scalars['Int'] | null)}


/** input type for inserting data into table "_prisma_migrations" */
export interface _prisma_migrations_insert_input {applied_steps_count?: (Scalars['Int'] | null),checksum?: (Scalars['String'] | null),finished_at?: (Scalars['timestamptz'] | null),id?: (Scalars['String'] | null),logs?: (Scalars['String'] | null),migration_name?: (Scalars['String'] | null),rolled_back_at?: (Scalars['timestamptz'] | null),started_at?: (Scalars['timestamptz'] | null)}


/** aggregate max on columns */
export interface _prisma_migrations_max_fieldsGenqlSelection{
    applied_steps_count?: boolean | number
    checksum?: boolean | number
    finished_at?: boolean | number
    id?: boolean | number
    logs?: boolean | number
    migration_name?: boolean | number
    rolled_back_at?: boolean | number
    started_at?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate min on columns */
export interface _prisma_migrations_min_fieldsGenqlSelection{
    applied_steps_count?: boolean | number
    checksum?: boolean | number
    finished_at?: boolean | number
    id?: boolean | number
    logs?: boolean | number
    migration_name?: boolean | number
    rolled_back_at?: boolean | number
    started_at?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** response of any mutation on the table "_prisma_migrations" */
export interface _prisma_migrations_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: _prisma_migrationsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** on_conflict condition type for table "_prisma_migrations" */
export interface _prisma_migrations_on_conflict {constraint: _prisma_migrations_constraint,update_columns?: _prisma_migrations_update_column[],where?: (_prisma_migrations_bool_exp | null)}


/** Ordering options when selecting data from "_prisma_migrations". */
export interface _prisma_migrations_order_by {applied_steps_count?: (order_by | null),checksum?: (order_by | null),finished_at?: (order_by | null),id?: (order_by | null),logs?: (order_by | null),migration_name?: (order_by | null),rolled_back_at?: (order_by | null),started_at?: (order_by | null)}


/** primary key columns input for table: _prisma_migrations */
export interface _prisma_migrations_pk_columns_input {id: Scalars['String']}


/** input type for updating data in table "_prisma_migrations" */
export interface _prisma_migrations_set_input {applied_steps_count?: (Scalars['Int'] | null),checksum?: (Scalars['String'] | null),finished_at?: (Scalars['timestamptz'] | null),id?: (Scalars['String'] | null),logs?: (Scalars['String'] | null),migration_name?: (Scalars['String'] | null),rolled_back_at?: (Scalars['timestamptz'] | null),started_at?: (Scalars['timestamptz'] | null)}


/** aggregate stddev on columns */
export interface _prisma_migrations_stddev_fieldsGenqlSelection{
    applied_steps_count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate stddev_pop on columns */
export interface _prisma_migrations_stddev_pop_fieldsGenqlSelection{
    applied_steps_count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate stddev_samp on columns */
export interface _prisma_migrations_stddev_samp_fieldsGenqlSelection{
    applied_steps_count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Streaming cursor of the table "_prisma_migrations" */
export interface _prisma_migrations_stream_cursor_input {
/** Stream column input with initial value */
initial_value: _prisma_migrations_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface _prisma_migrations_stream_cursor_value_input {applied_steps_count?: (Scalars['Int'] | null),checksum?: (Scalars['String'] | null),finished_at?: (Scalars['timestamptz'] | null),id?: (Scalars['String'] | null),logs?: (Scalars['String'] | null),migration_name?: (Scalars['String'] | null),rolled_back_at?: (Scalars['timestamptz'] | null),started_at?: (Scalars['timestamptz'] | null)}


/** aggregate sum on columns */
export interface _prisma_migrations_sum_fieldsGenqlSelection{
    applied_steps_count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface _prisma_migrations_updates {
/** increments the numeric columns with given value of the filtered values */
_inc?: (_prisma_migrations_inc_input | null),
/** sets the columns of the filtered rows to the given values */
_set?: (_prisma_migrations_set_input | null),
/** filter the rows which have to be updated */
where: _prisma_migrations_bool_exp}


/** aggregate var_pop on columns */
export interface _prisma_migrations_var_pop_fieldsGenqlSelection{
    applied_steps_count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate var_samp on columns */
export interface _prisma_migrations_var_samp_fieldsGenqlSelection{
    applied_steps_count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate variance on columns */
export interface _prisma_migrations_variance_fieldsGenqlSelection{
    applied_steps_count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface jsonb_cast_exp {String?: (String_comparison_exp | null)}


/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export interface jsonb_comparison_exp {_cast?: (jsonb_cast_exp | null),
/** is the column contained in the given json value */
_contained_in?: (Scalars['jsonb'] | null),
/** does the column contain the given json value at the top level */
_contains?: (Scalars['jsonb'] | null),_eq?: (Scalars['jsonb'] | null),_gt?: (Scalars['jsonb'] | null),_gte?: (Scalars['jsonb'] | null),
/** does the string exist as a top-level key in the column */
_has_key?: (Scalars['String'] | null),
/** do all of these strings exist as top-level keys in the column */
_has_keys_all?: (Scalars['String'][] | null),
/** do any of these strings exist as top-level keys in the column */
_has_keys_any?: (Scalars['String'][] | null),_in?: (Scalars['jsonb'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['jsonb'] | null),_lte?: (Scalars['jsonb'] | null),_neq?: (Scalars['jsonb'] | null),_nin?: (Scalars['jsonb'][] | null)}


/** mutation root */
export interface mutation_rootGenqlSelection{
    /** delete data from the table: "Account" */
    delete_Account?: (Account_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: Account_bool_exp} })
    /** delete single row from the table: "Account" */
    delete_Account_by_pk?: (AccountGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** delete data from the table: "Media" */
    delete_Media?: (Media_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: Media_bool_exp} })
    /** delete single row from the table: "Media" */
    delete_Media_by_pk?: (MediaGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** delete data from the table: "Profile" */
    delete_Profile?: (Profile_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: Profile_bool_exp} })
    /** delete single row from the table: "Profile" */
    delete_Profile_by_pk?: (ProfileGenqlSelection & { __args: {accountId: Scalars['uuid']} })
    /** delete data from the table: "Project" */
    delete_Project?: (Project_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: Project_bool_exp} })
    /** delete data from the table: "ProjectMedia" */
    delete_ProjectMedia?: (ProjectMedia_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: ProjectMedia_bool_exp} })
    /** delete single row from the table: "Project" */
    delete_Project_by_pk?: (ProjectGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** delete data from the table: "Wallet" */
    delete_Wallet?: (Wallet_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: Wallet_bool_exp} })
    /** delete single row from the table: "Wallet" */
    delete_Wallet_by_pk?: (WalletGenqlSelection & { __args: {address: Scalars['String']} })
    /** delete data from the table: "_prisma_migrations" */
    delete__prisma_migrations?: (_prisma_migrations_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: _prisma_migrations_bool_exp} })
    /** delete single row from the table: "_prisma_migrations" */
    delete__prisma_migrations_by_pk?: (_prisma_migrationsGenqlSelection & { __args: {id: Scalars['String']} })
    /** insert data into the table: "Account" */
    insert_Account?: (Account_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: Account_insert_input[], 
    /** upsert condition */
    on_conflict?: (Account_on_conflict | null)} })
    /** insert a single row into the table: "Account" */
    insert_Account_one?: (AccountGenqlSelection & { __args: {
    /** the row to be inserted */
    object: Account_insert_input, 
    /** upsert condition */
    on_conflict?: (Account_on_conflict | null)} })
    /** insert data into the table: "Media" */
    insert_Media?: (Media_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: Media_insert_input[], 
    /** upsert condition */
    on_conflict?: (Media_on_conflict | null)} })
    /** insert a single row into the table: "Media" */
    insert_Media_one?: (MediaGenqlSelection & { __args: {
    /** the row to be inserted */
    object: Media_insert_input, 
    /** upsert condition */
    on_conflict?: (Media_on_conflict | null)} })
    /** insert data into the table: "Profile" */
    insert_Profile?: (Profile_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: Profile_insert_input[], 
    /** upsert condition */
    on_conflict?: (Profile_on_conflict | null)} })
    /** insert a single row into the table: "Profile" */
    insert_Profile_one?: (ProfileGenqlSelection & { __args: {
    /** the row to be inserted */
    object: Profile_insert_input, 
    /** upsert condition */
    on_conflict?: (Profile_on_conflict | null)} })
    /** insert data into the table: "Project" */
    insert_Project?: (Project_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: Project_insert_input[], 
    /** upsert condition */
    on_conflict?: (Project_on_conflict | null)} })
    /** insert data into the table: "ProjectMedia" */
    insert_ProjectMedia?: (ProjectMedia_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: ProjectMedia_insert_input[], 
    /** upsert condition */
    on_conflict?: (ProjectMedia_on_conflict | null)} })
    /** insert a single row into the table: "ProjectMedia" */
    insert_ProjectMedia_one?: (ProjectMediaGenqlSelection & { __args: {
    /** the row to be inserted */
    object: ProjectMedia_insert_input, 
    /** upsert condition */
    on_conflict?: (ProjectMedia_on_conflict | null)} })
    /** insert a single row into the table: "Project" */
    insert_Project_one?: (ProjectGenqlSelection & { __args: {
    /** the row to be inserted */
    object: Project_insert_input, 
    /** upsert condition */
    on_conflict?: (Project_on_conflict | null)} })
    /** insert data into the table: "Wallet" */
    insert_Wallet?: (Wallet_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: Wallet_insert_input[], 
    /** upsert condition */
    on_conflict?: (Wallet_on_conflict | null)} })
    /** insert a single row into the table: "Wallet" */
    insert_Wallet_one?: (WalletGenqlSelection & { __args: {
    /** the row to be inserted */
    object: Wallet_insert_input, 
    /** upsert condition */
    on_conflict?: (Wallet_on_conflict | null)} })
    /** insert data into the table: "_prisma_migrations" */
    insert__prisma_migrations?: (_prisma_migrations_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: _prisma_migrations_insert_input[], 
    /** upsert condition */
    on_conflict?: (_prisma_migrations_on_conflict | null)} })
    /** insert a single row into the table: "_prisma_migrations" */
    insert__prisma_migrations_one?: (_prisma_migrationsGenqlSelection & { __args: {
    /** the row to be inserted */
    object: _prisma_migrations_insert_input, 
    /** upsert condition */
    on_conflict?: (_prisma_migrations_on_conflict | null)} })
    /** update data of the table: "Account" */
    update_Account?: (Account_mutation_responseGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (Account_set_input | null), 
    /** filter the rows which have to be updated */
    where: Account_bool_exp} })
    /** update single row of the table: "Account" */
    update_Account_by_pk?: (AccountGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (Account_set_input | null), pk_columns: Account_pk_columns_input} })
    /** update multiples rows of table: "Account" */
    update_Account_many?: (Account_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: Account_updates[]} })
    /** update data of the table: "Media" */
    update_Media?: (Media_mutation_responseGenqlSelection & { __args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: (Media_inc_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (Media_set_input | null), 
    /** filter the rows which have to be updated */
    where: Media_bool_exp} })
    /** update single row of the table: "Media" */
    update_Media_by_pk?: (MediaGenqlSelection & { __args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: (Media_inc_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (Media_set_input | null), pk_columns: Media_pk_columns_input} })
    /** update multiples rows of table: "Media" */
    update_Media_many?: (Media_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: Media_updates[]} })
    /** update data of the table: "Profile" */
    update_Profile?: (Profile_mutation_responseGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (Profile_set_input | null), 
    /** filter the rows which have to be updated */
    where: Profile_bool_exp} })
    /** update single row of the table: "Profile" */
    update_Profile_by_pk?: (ProfileGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (Profile_set_input | null), pk_columns: Profile_pk_columns_input} })
    /** update multiples rows of table: "Profile" */
    update_Profile_many?: (Profile_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: Profile_updates[]} })
    /** update data of the table: "Project" */
    update_Project?: (Project_mutation_responseGenqlSelection & { __args: {
    /** append existing jsonb value of filtered columns with new jsonb value */
    _append?: (Project_append_input | null), 
    /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
    _delete_at_path?: (Project_delete_at_path_input | null), 
    /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
    _delete_elem?: (Project_delete_elem_input | null), 
    /** delete key/value pair or string element. key/value pairs are matched based on their key value */
    _delete_key?: (Project_delete_key_input | null), 
    /** prepend existing jsonb value of filtered columns with new jsonb value */
    _prepend?: (Project_prepend_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (Project_set_input | null), 
    /** filter the rows which have to be updated */
    where: Project_bool_exp} })
    /** update data of the table: "ProjectMedia" */
    update_ProjectMedia?: (ProjectMedia_mutation_responseGenqlSelection & { __args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: (ProjectMedia_inc_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (ProjectMedia_set_input | null), 
    /** filter the rows which have to be updated */
    where: ProjectMedia_bool_exp} })
    /** update multiples rows of table: "ProjectMedia" */
    update_ProjectMedia_many?: (ProjectMedia_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: ProjectMedia_updates[]} })
    /** update single row of the table: "Project" */
    update_Project_by_pk?: (ProjectGenqlSelection & { __args: {
    /** append existing jsonb value of filtered columns with new jsonb value */
    _append?: (Project_append_input | null), 
    /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
    _delete_at_path?: (Project_delete_at_path_input | null), 
    /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
    _delete_elem?: (Project_delete_elem_input | null), 
    /** delete key/value pair or string element. key/value pairs are matched based on their key value */
    _delete_key?: (Project_delete_key_input | null), 
    /** prepend existing jsonb value of filtered columns with new jsonb value */
    _prepend?: (Project_prepend_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (Project_set_input | null), pk_columns: Project_pk_columns_input} })
    /** update multiples rows of table: "Project" */
    update_Project_many?: (Project_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: Project_updates[]} })
    /** update data of the table: "Wallet" */
    update_Wallet?: (Wallet_mutation_responseGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (Wallet_set_input | null), 
    /** filter the rows which have to be updated */
    where: Wallet_bool_exp} })
    /** update single row of the table: "Wallet" */
    update_Wallet_by_pk?: (WalletGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (Wallet_set_input | null), pk_columns: Wallet_pk_columns_input} })
    /** update multiples rows of table: "Wallet" */
    update_Wallet_many?: (Wallet_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: Wallet_updates[]} })
    /** update data of the table: "_prisma_migrations" */
    update__prisma_migrations?: (_prisma_migrations_mutation_responseGenqlSelection & { __args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: (_prisma_migrations_inc_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (_prisma_migrations_set_input | null), 
    /** filter the rows which have to be updated */
    where: _prisma_migrations_bool_exp} })
    /** update single row of the table: "_prisma_migrations" */
    update__prisma_migrations_by_pk?: (_prisma_migrationsGenqlSelection & { __args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: (_prisma_migrations_inc_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (_prisma_migrations_set_input | null), pk_columns: _prisma_migrations_pk_columns_input} })
    /** update multiples rows of table: "_prisma_migrations" */
    update__prisma_migrations_many?: (_prisma_migrations_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: _prisma_migrations_updates[]} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface query_rootGenqlSelection{
    /** fetch data from the table: "Account" */
    Account?: (AccountGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Account_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Account_order_by[] | null), 
    /** filter the rows returned */
    where?: (Account_bool_exp | null)} })
    /** fetch aggregated fields from the table: "Account" */
    Account_aggregate?: (Account_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Account_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Account_order_by[] | null), 
    /** filter the rows returned */
    where?: (Account_bool_exp | null)} })
    /** fetch data from the table: "Account" using primary key columns */
    Account_by_pk?: (AccountGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table: "Media" */
    Media?: (MediaGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Media_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Media_order_by[] | null), 
    /** filter the rows returned */
    where?: (Media_bool_exp | null)} })
    /** fetch aggregated fields from the table: "Media" */
    Media_aggregate?: (Media_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Media_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Media_order_by[] | null), 
    /** filter the rows returned */
    where?: (Media_bool_exp | null)} })
    /** fetch data from the table: "Media" using primary key columns */
    Media_by_pk?: (MediaGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table: "Profile" */
    Profile?: (ProfileGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Profile_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Profile_order_by[] | null), 
    /** filter the rows returned */
    where?: (Profile_bool_exp | null)} })
    /** fetch aggregated fields from the table: "Profile" */
    Profile_aggregate?: (Profile_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Profile_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Profile_order_by[] | null), 
    /** filter the rows returned */
    where?: (Profile_bool_exp | null)} })
    /** fetch data from the table: "Profile" using primary key columns */
    Profile_by_pk?: (ProfileGenqlSelection & { __args: {accountId: Scalars['uuid']} })
    /** fetch data from the table: "Project" */
    Project?: (ProjectGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Project_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Project_order_by[] | null), 
    /** filter the rows returned */
    where?: (Project_bool_exp | null)} })
    /** fetch data from the table: "ProjectMedia" */
    ProjectMedia?: (ProjectMediaGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (ProjectMedia_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (ProjectMedia_order_by[] | null), 
    /** filter the rows returned */
    where?: (ProjectMedia_bool_exp | null)} })
    /** fetch aggregated fields from the table: "ProjectMedia" */
    ProjectMedia_aggregate?: (ProjectMedia_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (ProjectMedia_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (ProjectMedia_order_by[] | null), 
    /** filter the rows returned */
    where?: (ProjectMedia_bool_exp | null)} })
    /** fetch aggregated fields from the table: "Project" */
    Project_aggregate?: (Project_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Project_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Project_order_by[] | null), 
    /** filter the rows returned */
    where?: (Project_bool_exp | null)} })
    /** fetch data from the table: "Project" using primary key columns */
    Project_by_pk?: (ProjectGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table: "Wallet" */
    Wallet?: (WalletGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Wallet_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Wallet_order_by[] | null), 
    /** filter the rows returned */
    where?: (Wallet_bool_exp | null)} })
    /** fetch aggregated fields from the table: "Wallet" */
    Wallet_aggregate?: (Wallet_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Wallet_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Wallet_order_by[] | null), 
    /** filter the rows returned */
    where?: (Wallet_bool_exp | null)} })
    /** fetch data from the table: "Wallet" using primary key columns */
    Wallet_by_pk?: (WalletGenqlSelection & { __args: {address: Scalars['String']} })
    /** fetch data from the table: "_prisma_migrations" */
    _prisma_migrations?: (_prisma_migrationsGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (_prisma_migrations_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (_prisma_migrations_order_by[] | null), 
    /** filter the rows returned */
    where?: (_prisma_migrations_bool_exp | null)} })
    /** fetch aggregated fields from the table: "_prisma_migrations" */
    _prisma_migrations_aggregate?: (_prisma_migrations_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (_prisma_migrations_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (_prisma_migrations_order_by[] | null), 
    /** filter the rows returned */
    where?: (_prisma_migrations_bool_exp | null)} })
    /** fetch data from the table: "_prisma_migrations" using primary key columns */
    _prisma_migrations_by_pk?: (_prisma_migrationsGenqlSelection & { __args: {id: Scalars['String']} })
    mediaFullUrl?: { __args: {s3key: Scalars['String']} }
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
export interface smallint_comparison_exp {_eq?: (Scalars['smallint'] | null),_gt?: (Scalars['smallint'] | null),_gte?: (Scalars['smallint'] | null),_in?: (Scalars['smallint'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['smallint'] | null),_lte?: (Scalars['smallint'] | null),_neq?: (Scalars['smallint'] | null),_nin?: (Scalars['smallint'][] | null)}

export interface subscription_rootGenqlSelection{
    /** fetch data from the table: "Account" */
    Account?: (AccountGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Account_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Account_order_by[] | null), 
    /** filter the rows returned */
    where?: (Account_bool_exp | null)} })
    /** fetch aggregated fields from the table: "Account" */
    Account_aggregate?: (Account_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Account_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Account_order_by[] | null), 
    /** filter the rows returned */
    where?: (Account_bool_exp | null)} })
    /** fetch data from the table: "Account" using primary key columns */
    Account_by_pk?: (AccountGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table in a streaming manner: "Account" */
    Account_stream?: (AccountGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (Account_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (Account_bool_exp | null)} })
    /** fetch data from the table: "Media" */
    Media?: (MediaGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Media_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Media_order_by[] | null), 
    /** filter the rows returned */
    where?: (Media_bool_exp | null)} })
    /** fetch aggregated fields from the table: "Media" */
    Media_aggregate?: (Media_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Media_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Media_order_by[] | null), 
    /** filter the rows returned */
    where?: (Media_bool_exp | null)} })
    /** fetch data from the table: "Media" using primary key columns */
    Media_by_pk?: (MediaGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table in a streaming manner: "Media" */
    Media_stream?: (MediaGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (Media_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (Media_bool_exp | null)} })
    /** fetch data from the table: "Profile" */
    Profile?: (ProfileGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Profile_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Profile_order_by[] | null), 
    /** filter the rows returned */
    where?: (Profile_bool_exp | null)} })
    /** fetch aggregated fields from the table: "Profile" */
    Profile_aggregate?: (Profile_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Profile_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Profile_order_by[] | null), 
    /** filter the rows returned */
    where?: (Profile_bool_exp | null)} })
    /** fetch data from the table: "Profile" using primary key columns */
    Profile_by_pk?: (ProfileGenqlSelection & { __args: {accountId: Scalars['uuid']} })
    /** fetch data from the table in a streaming manner: "Profile" */
    Profile_stream?: (ProfileGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (Profile_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (Profile_bool_exp | null)} })
    /** fetch data from the table: "Project" */
    Project?: (ProjectGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Project_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Project_order_by[] | null), 
    /** filter the rows returned */
    where?: (Project_bool_exp | null)} })
    /** fetch data from the table: "ProjectMedia" */
    ProjectMedia?: (ProjectMediaGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (ProjectMedia_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (ProjectMedia_order_by[] | null), 
    /** filter the rows returned */
    where?: (ProjectMedia_bool_exp | null)} })
    /** fetch aggregated fields from the table: "ProjectMedia" */
    ProjectMedia_aggregate?: (ProjectMedia_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (ProjectMedia_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (ProjectMedia_order_by[] | null), 
    /** filter the rows returned */
    where?: (ProjectMedia_bool_exp | null)} })
    /** fetch data from the table in a streaming manner: "ProjectMedia" */
    ProjectMedia_stream?: (ProjectMediaGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (ProjectMedia_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (ProjectMedia_bool_exp | null)} })
    /** fetch aggregated fields from the table: "Project" */
    Project_aggregate?: (Project_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Project_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Project_order_by[] | null), 
    /** filter the rows returned */
    where?: (Project_bool_exp | null)} })
    /** fetch data from the table: "Project" using primary key columns */
    Project_by_pk?: (ProjectGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table in a streaming manner: "Project" */
    Project_stream?: (ProjectGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (Project_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (Project_bool_exp | null)} })
    /** fetch data from the table: "Wallet" */
    Wallet?: (WalletGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Wallet_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Wallet_order_by[] | null), 
    /** filter the rows returned */
    where?: (Wallet_bool_exp | null)} })
    /** fetch aggregated fields from the table: "Wallet" */
    Wallet_aggregate?: (Wallet_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (Wallet_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (Wallet_order_by[] | null), 
    /** filter the rows returned */
    where?: (Wallet_bool_exp | null)} })
    /** fetch data from the table: "Wallet" using primary key columns */
    Wallet_by_pk?: (WalletGenqlSelection & { __args: {address: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "Wallet" */
    Wallet_stream?: (WalletGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (Wallet_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (Wallet_bool_exp | null)} })
    /** fetch data from the table: "_prisma_migrations" */
    _prisma_migrations?: (_prisma_migrationsGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (_prisma_migrations_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (_prisma_migrations_order_by[] | null), 
    /** filter the rows returned */
    where?: (_prisma_migrations_bool_exp | null)} })
    /** fetch aggregated fields from the table: "_prisma_migrations" */
    _prisma_migrations_aggregate?: (_prisma_migrations_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (_prisma_migrations_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (_prisma_migrations_order_by[] | null), 
    /** filter the rows returned */
    where?: (_prisma_migrations_bool_exp | null)} })
    /** fetch data from the table: "_prisma_migrations" using primary key columns */
    _prisma_migrations_by_pk?: (_prisma_migrationsGenqlSelection & { __args: {id: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "_prisma_migrations" */
    _prisma_migrations_stream?: (_prisma_migrationsGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (_prisma_migrations_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (_prisma_migrations_bool_exp | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export interface timestamp_comparison_exp {_eq?: (Scalars['timestamp'] | null),_gt?: (Scalars['timestamp'] | null),_gte?: (Scalars['timestamp'] | null),_in?: (Scalars['timestamp'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['timestamp'] | null),_lte?: (Scalars['timestamp'] | null),_neq?: (Scalars['timestamp'] | null),_nin?: (Scalars['timestamp'][] | null)}


/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export interface timestamptz_comparison_exp {_eq?: (Scalars['timestamptz'] | null),_gt?: (Scalars['timestamptz'] | null),_gte?: (Scalars['timestamptz'] | null),_in?: (Scalars['timestamptz'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['timestamptz'] | null),_lte?: (Scalars['timestamptz'] | null),_neq?: (Scalars['timestamptz'] | null),_nin?: (Scalars['timestamptz'][] | null)}


/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export interface uuid_comparison_exp {_eq?: (Scalars['uuid'] | null),_gt?: (Scalars['uuid'] | null),_gte?: (Scalars['uuid'] | null),_in?: (Scalars['uuid'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['uuid'] | null),_lte?: (Scalars['uuid'] | null),_neq?: (Scalars['uuid'] | null),_nin?: (Scalars['uuid'][] | null)}

export type QueryGenqlSelection = query_rootGenqlSelection
export type MutationGenqlSelection = mutation_rootGenqlSelection
export type SubscriptionGenqlSelection = subscription_rootGenqlSelection


    const Account_possibleTypes: string[] = ['Account']
    export const isAccount = (obj?: { __typename?: any } | null): obj is Account => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAccount"')
      return Account_possibleTypes.includes(obj.__typename)
    }
    


    const Account_aggregate_possibleTypes: string[] = ['Account_aggregate']
    export const isAccount_aggregate = (obj?: { __typename?: any } | null): obj is Account_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAccount_aggregate"')
      return Account_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const Account_aggregate_fields_possibleTypes: string[] = ['Account_aggregate_fields']
    export const isAccount_aggregate_fields = (obj?: { __typename?: any } | null): obj is Account_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAccount_aggregate_fields"')
      return Account_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Account_max_fields_possibleTypes: string[] = ['Account_max_fields']
    export const isAccount_max_fields = (obj?: { __typename?: any } | null): obj is Account_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAccount_max_fields"')
      return Account_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Account_min_fields_possibleTypes: string[] = ['Account_min_fields']
    export const isAccount_min_fields = (obj?: { __typename?: any } | null): obj is Account_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAccount_min_fields"')
      return Account_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Account_mutation_response_possibleTypes: string[] = ['Account_mutation_response']
    export const isAccount_mutation_response = (obj?: { __typename?: any } | null): obj is Account_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAccount_mutation_response"')
      return Account_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const Media_possibleTypes: string[] = ['Media']
    export const isMedia = (obj?: { __typename?: any } | null): obj is Media => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMedia"')
      return Media_possibleTypes.includes(obj.__typename)
    }
    


    const Media_aggregate_possibleTypes: string[] = ['Media_aggregate']
    export const isMedia_aggregate = (obj?: { __typename?: any } | null): obj is Media_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMedia_aggregate"')
      return Media_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const Media_aggregate_fields_possibleTypes: string[] = ['Media_aggregate_fields']
    export const isMedia_aggregate_fields = (obj?: { __typename?: any } | null): obj is Media_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMedia_aggregate_fields"')
      return Media_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Media_avg_fields_possibleTypes: string[] = ['Media_avg_fields']
    export const isMedia_avg_fields = (obj?: { __typename?: any } | null): obj is Media_avg_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMedia_avg_fields"')
      return Media_avg_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Media_max_fields_possibleTypes: string[] = ['Media_max_fields']
    export const isMedia_max_fields = (obj?: { __typename?: any } | null): obj is Media_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMedia_max_fields"')
      return Media_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Media_min_fields_possibleTypes: string[] = ['Media_min_fields']
    export const isMedia_min_fields = (obj?: { __typename?: any } | null): obj is Media_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMedia_min_fields"')
      return Media_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Media_mutation_response_possibleTypes: string[] = ['Media_mutation_response']
    export const isMedia_mutation_response = (obj?: { __typename?: any } | null): obj is Media_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMedia_mutation_response"')
      return Media_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const Media_stddev_fields_possibleTypes: string[] = ['Media_stddev_fields']
    export const isMedia_stddev_fields = (obj?: { __typename?: any } | null): obj is Media_stddev_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMedia_stddev_fields"')
      return Media_stddev_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Media_stddev_pop_fields_possibleTypes: string[] = ['Media_stddev_pop_fields']
    export const isMedia_stddev_pop_fields = (obj?: { __typename?: any } | null): obj is Media_stddev_pop_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMedia_stddev_pop_fields"')
      return Media_stddev_pop_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Media_stddev_samp_fields_possibleTypes: string[] = ['Media_stddev_samp_fields']
    export const isMedia_stddev_samp_fields = (obj?: { __typename?: any } | null): obj is Media_stddev_samp_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMedia_stddev_samp_fields"')
      return Media_stddev_samp_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Media_sum_fields_possibleTypes: string[] = ['Media_sum_fields']
    export const isMedia_sum_fields = (obj?: { __typename?: any } | null): obj is Media_sum_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMedia_sum_fields"')
      return Media_sum_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Media_var_pop_fields_possibleTypes: string[] = ['Media_var_pop_fields']
    export const isMedia_var_pop_fields = (obj?: { __typename?: any } | null): obj is Media_var_pop_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMedia_var_pop_fields"')
      return Media_var_pop_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Media_var_samp_fields_possibleTypes: string[] = ['Media_var_samp_fields']
    export const isMedia_var_samp_fields = (obj?: { __typename?: any } | null): obj is Media_var_samp_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMedia_var_samp_fields"')
      return Media_var_samp_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Media_variance_fields_possibleTypes: string[] = ['Media_variance_fields']
    export const isMedia_variance_fields = (obj?: { __typename?: any } | null): obj is Media_variance_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMedia_variance_fields"')
      return Media_variance_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Profile_possibleTypes: string[] = ['Profile']
    export const isProfile = (obj?: { __typename?: any } | null): obj is Profile => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProfile"')
      return Profile_possibleTypes.includes(obj.__typename)
    }
    


    const Profile_aggregate_possibleTypes: string[] = ['Profile_aggregate']
    export const isProfile_aggregate = (obj?: { __typename?: any } | null): obj is Profile_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProfile_aggregate"')
      return Profile_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const Profile_aggregate_fields_possibleTypes: string[] = ['Profile_aggregate_fields']
    export const isProfile_aggregate_fields = (obj?: { __typename?: any } | null): obj is Profile_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProfile_aggregate_fields"')
      return Profile_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Profile_max_fields_possibleTypes: string[] = ['Profile_max_fields']
    export const isProfile_max_fields = (obj?: { __typename?: any } | null): obj is Profile_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProfile_max_fields"')
      return Profile_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Profile_min_fields_possibleTypes: string[] = ['Profile_min_fields']
    export const isProfile_min_fields = (obj?: { __typename?: any } | null): obj is Profile_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProfile_min_fields"')
      return Profile_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Profile_mutation_response_possibleTypes: string[] = ['Profile_mutation_response']
    export const isProfile_mutation_response = (obj?: { __typename?: any } | null): obj is Profile_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProfile_mutation_response"')
      return Profile_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const Project_possibleTypes: string[] = ['Project']
    export const isProject = (obj?: { __typename?: any } | null): obj is Project => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProject"')
      return Project_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectMedia_possibleTypes: string[] = ['ProjectMedia']
    export const isProjectMedia = (obj?: { __typename?: any } | null): obj is ProjectMedia => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectMedia"')
      return ProjectMedia_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectMedia_aggregate_possibleTypes: string[] = ['ProjectMedia_aggregate']
    export const isProjectMedia_aggregate = (obj?: { __typename?: any } | null): obj is ProjectMedia_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectMedia_aggregate"')
      return ProjectMedia_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectMedia_aggregate_fields_possibleTypes: string[] = ['ProjectMedia_aggregate_fields']
    export const isProjectMedia_aggregate_fields = (obj?: { __typename?: any } | null): obj is ProjectMedia_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectMedia_aggregate_fields"')
      return ProjectMedia_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectMedia_avg_fields_possibleTypes: string[] = ['ProjectMedia_avg_fields']
    export const isProjectMedia_avg_fields = (obj?: { __typename?: any } | null): obj is ProjectMedia_avg_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectMedia_avg_fields"')
      return ProjectMedia_avg_fields_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectMedia_max_fields_possibleTypes: string[] = ['ProjectMedia_max_fields']
    export const isProjectMedia_max_fields = (obj?: { __typename?: any } | null): obj is ProjectMedia_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectMedia_max_fields"')
      return ProjectMedia_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectMedia_min_fields_possibleTypes: string[] = ['ProjectMedia_min_fields']
    export const isProjectMedia_min_fields = (obj?: { __typename?: any } | null): obj is ProjectMedia_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectMedia_min_fields"')
      return ProjectMedia_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectMedia_mutation_response_possibleTypes: string[] = ['ProjectMedia_mutation_response']
    export const isProjectMedia_mutation_response = (obj?: { __typename?: any } | null): obj is ProjectMedia_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectMedia_mutation_response"')
      return ProjectMedia_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectMedia_stddev_fields_possibleTypes: string[] = ['ProjectMedia_stddev_fields']
    export const isProjectMedia_stddev_fields = (obj?: { __typename?: any } | null): obj is ProjectMedia_stddev_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectMedia_stddev_fields"')
      return ProjectMedia_stddev_fields_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectMedia_stddev_pop_fields_possibleTypes: string[] = ['ProjectMedia_stddev_pop_fields']
    export const isProjectMedia_stddev_pop_fields = (obj?: { __typename?: any } | null): obj is ProjectMedia_stddev_pop_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectMedia_stddev_pop_fields"')
      return ProjectMedia_stddev_pop_fields_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectMedia_stddev_samp_fields_possibleTypes: string[] = ['ProjectMedia_stddev_samp_fields']
    export const isProjectMedia_stddev_samp_fields = (obj?: { __typename?: any } | null): obj is ProjectMedia_stddev_samp_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectMedia_stddev_samp_fields"')
      return ProjectMedia_stddev_samp_fields_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectMedia_sum_fields_possibleTypes: string[] = ['ProjectMedia_sum_fields']
    export const isProjectMedia_sum_fields = (obj?: { __typename?: any } | null): obj is ProjectMedia_sum_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectMedia_sum_fields"')
      return ProjectMedia_sum_fields_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectMedia_var_pop_fields_possibleTypes: string[] = ['ProjectMedia_var_pop_fields']
    export const isProjectMedia_var_pop_fields = (obj?: { __typename?: any } | null): obj is ProjectMedia_var_pop_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectMedia_var_pop_fields"')
      return ProjectMedia_var_pop_fields_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectMedia_var_samp_fields_possibleTypes: string[] = ['ProjectMedia_var_samp_fields']
    export const isProjectMedia_var_samp_fields = (obj?: { __typename?: any } | null): obj is ProjectMedia_var_samp_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectMedia_var_samp_fields"')
      return ProjectMedia_var_samp_fields_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectMedia_variance_fields_possibleTypes: string[] = ['ProjectMedia_variance_fields']
    export const isProjectMedia_variance_fields = (obj?: { __typename?: any } | null): obj is ProjectMedia_variance_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectMedia_variance_fields"')
      return ProjectMedia_variance_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Project_aggregate_possibleTypes: string[] = ['Project_aggregate']
    export const isProject_aggregate = (obj?: { __typename?: any } | null): obj is Project_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProject_aggregate"')
      return Project_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const Project_aggregate_fields_possibleTypes: string[] = ['Project_aggregate_fields']
    export const isProject_aggregate_fields = (obj?: { __typename?: any } | null): obj is Project_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProject_aggregate_fields"')
      return Project_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Project_max_fields_possibleTypes: string[] = ['Project_max_fields']
    export const isProject_max_fields = (obj?: { __typename?: any } | null): obj is Project_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProject_max_fields"')
      return Project_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Project_min_fields_possibleTypes: string[] = ['Project_min_fields']
    export const isProject_min_fields = (obj?: { __typename?: any } | null): obj is Project_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProject_min_fields"')
      return Project_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Project_mutation_response_possibleTypes: string[] = ['Project_mutation_response']
    export const isProject_mutation_response = (obj?: { __typename?: any } | null): obj is Project_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProject_mutation_response"')
      return Project_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const Wallet_possibleTypes: string[] = ['Wallet']
    export const isWallet = (obj?: { __typename?: any } | null): obj is Wallet => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWallet"')
      return Wallet_possibleTypes.includes(obj.__typename)
    }
    


    const Wallet_aggregate_possibleTypes: string[] = ['Wallet_aggregate']
    export const isWallet_aggregate = (obj?: { __typename?: any } | null): obj is Wallet_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWallet_aggregate"')
      return Wallet_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const Wallet_aggregate_fields_possibleTypes: string[] = ['Wallet_aggregate_fields']
    export const isWallet_aggregate_fields = (obj?: { __typename?: any } | null): obj is Wallet_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWallet_aggregate_fields"')
      return Wallet_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Wallet_max_fields_possibleTypes: string[] = ['Wallet_max_fields']
    export const isWallet_max_fields = (obj?: { __typename?: any } | null): obj is Wallet_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWallet_max_fields"')
      return Wallet_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Wallet_min_fields_possibleTypes: string[] = ['Wallet_min_fields']
    export const isWallet_min_fields = (obj?: { __typename?: any } | null): obj is Wallet_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWallet_min_fields"')
      return Wallet_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const Wallet_mutation_response_possibleTypes: string[] = ['Wallet_mutation_response']
    export const isWallet_mutation_response = (obj?: { __typename?: any } | null): obj is Wallet_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isWallet_mutation_response"')
      return Wallet_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const _prisma_migrations_possibleTypes: string[] = ['_prisma_migrations']
    export const is_prisma_migrations = (obj?: { __typename?: any } | null): obj is _prisma_migrations => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_prisma_migrations"')
      return _prisma_migrations_possibleTypes.includes(obj.__typename)
    }
    


    const _prisma_migrations_aggregate_possibleTypes: string[] = ['_prisma_migrations_aggregate']
    export const is_prisma_migrations_aggregate = (obj?: { __typename?: any } | null): obj is _prisma_migrations_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_prisma_migrations_aggregate"')
      return _prisma_migrations_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const _prisma_migrations_aggregate_fields_possibleTypes: string[] = ['_prisma_migrations_aggregate_fields']
    export const is_prisma_migrations_aggregate_fields = (obj?: { __typename?: any } | null): obj is _prisma_migrations_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_prisma_migrations_aggregate_fields"')
      return _prisma_migrations_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const _prisma_migrations_avg_fields_possibleTypes: string[] = ['_prisma_migrations_avg_fields']
    export const is_prisma_migrations_avg_fields = (obj?: { __typename?: any } | null): obj is _prisma_migrations_avg_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_prisma_migrations_avg_fields"')
      return _prisma_migrations_avg_fields_possibleTypes.includes(obj.__typename)
    }
    


    const _prisma_migrations_max_fields_possibleTypes: string[] = ['_prisma_migrations_max_fields']
    export const is_prisma_migrations_max_fields = (obj?: { __typename?: any } | null): obj is _prisma_migrations_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_prisma_migrations_max_fields"')
      return _prisma_migrations_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const _prisma_migrations_min_fields_possibleTypes: string[] = ['_prisma_migrations_min_fields']
    export const is_prisma_migrations_min_fields = (obj?: { __typename?: any } | null): obj is _prisma_migrations_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_prisma_migrations_min_fields"')
      return _prisma_migrations_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const _prisma_migrations_mutation_response_possibleTypes: string[] = ['_prisma_migrations_mutation_response']
    export const is_prisma_migrations_mutation_response = (obj?: { __typename?: any } | null): obj is _prisma_migrations_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_prisma_migrations_mutation_response"')
      return _prisma_migrations_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const _prisma_migrations_stddev_fields_possibleTypes: string[] = ['_prisma_migrations_stddev_fields']
    export const is_prisma_migrations_stddev_fields = (obj?: { __typename?: any } | null): obj is _prisma_migrations_stddev_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_prisma_migrations_stddev_fields"')
      return _prisma_migrations_stddev_fields_possibleTypes.includes(obj.__typename)
    }
    


    const _prisma_migrations_stddev_pop_fields_possibleTypes: string[] = ['_prisma_migrations_stddev_pop_fields']
    export const is_prisma_migrations_stddev_pop_fields = (obj?: { __typename?: any } | null): obj is _prisma_migrations_stddev_pop_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_prisma_migrations_stddev_pop_fields"')
      return _prisma_migrations_stddev_pop_fields_possibleTypes.includes(obj.__typename)
    }
    


    const _prisma_migrations_stddev_samp_fields_possibleTypes: string[] = ['_prisma_migrations_stddev_samp_fields']
    export const is_prisma_migrations_stddev_samp_fields = (obj?: { __typename?: any } | null): obj is _prisma_migrations_stddev_samp_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_prisma_migrations_stddev_samp_fields"')
      return _prisma_migrations_stddev_samp_fields_possibleTypes.includes(obj.__typename)
    }
    


    const _prisma_migrations_sum_fields_possibleTypes: string[] = ['_prisma_migrations_sum_fields']
    export const is_prisma_migrations_sum_fields = (obj?: { __typename?: any } | null): obj is _prisma_migrations_sum_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_prisma_migrations_sum_fields"')
      return _prisma_migrations_sum_fields_possibleTypes.includes(obj.__typename)
    }
    


    const _prisma_migrations_var_pop_fields_possibleTypes: string[] = ['_prisma_migrations_var_pop_fields']
    export const is_prisma_migrations_var_pop_fields = (obj?: { __typename?: any } | null): obj is _prisma_migrations_var_pop_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_prisma_migrations_var_pop_fields"')
      return _prisma_migrations_var_pop_fields_possibleTypes.includes(obj.__typename)
    }
    


    const _prisma_migrations_var_samp_fields_possibleTypes: string[] = ['_prisma_migrations_var_samp_fields']
    export const is_prisma_migrations_var_samp_fields = (obj?: { __typename?: any } | null): obj is _prisma_migrations_var_samp_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_prisma_migrations_var_samp_fields"')
      return _prisma_migrations_var_samp_fields_possibleTypes.includes(obj.__typename)
    }
    


    const _prisma_migrations_variance_fields_possibleTypes: string[] = ['_prisma_migrations_variance_fields']
    export const is_prisma_migrations_variance_fields = (obj?: { __typename?: any } | null): obj is _prisma_migrations_variance_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_prisma_migrations_variance_fields"')
      return _prisma_migrations_variance_fields_possibleTypes.includes(obj.__typename)
    }
    


    const mutation_root_possibleTypes: string[] = ['mutation_root']
    export const ismutation_root = (obj?: { __typename?: any } | null): obj is mutation_root => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ismutation_root"')
      return mutation_root_possibleTypes.includes(obj.__typename)
    }
    


    const query_root_possibleTypes: string[] = ['query_root']
    export const isquery_root = (obj?: { __typename?: any } | null): obj is query_root => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isquery_root"')
      return query_root_possibleTypes.includes(obj.__typename)
    }
    


    const subscription_root_possibleTypes: string[] = ['subscription_root']
    export const issubscription_root = (obj?: { __typename?: any } | null): obj is subscription_root => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issubscription_root"')
      return subscription_root_possibleTypes.includes(obj.__typename)
    }
    

export const enumAccountConstraint = {
   Account_pkey: 'Account_pkey' as const,
   Account_username_key: 'Account_username_key' as const
}

export const enumAccountSelectColumn = {
   id: 'id' as const,
   status: 'status' as const,
   username: 'username' as const
}

export const enumAccountUpdateColumn = {
   id: 'id' as const,
   status: 'status' as const,
   username: 'username' as const
}

export const enumMediaConstraint = {
   Media_pkey: 'Media_pkey' as const
}

export const enumMediaSelectColumn = {
   bucketId: 'bucketId' as const,
   createdAt: 'createdAt' as const,
   etag: 'etag' as const,
   id: 'id' as const,
   name: 'name' as const,
   s3key: 's3key' as const,
   size: 'size' as const,
   updatedAt: 'updatedAt' as const,
   uploaderId: 'uploaderId' as const
}

export const enumMediaUpdateColumn = {
   bucketId: 'bucketId' as const,
   createdAt: 'createdAt' as const,
   etag: 'etag' as const,
   id: 'id' as const,
   name: 'name' as const,
   s3key: 's3key' as const,
   size: 'size' as const,
   updatedAt: 'updatedAt' as const,
   uploaderId: 'uploaderId' as const
}

export const enumProfileConstraint = {
   Profile_pkey: 'Profile_pkey' as const
}

export const enumProfileSelectColumn = {
   accountId: 'accountId' as const,
   description: 'description' as const,
   instagram: 'instagram' as const,
   picture: 'picture' as const,
   twitter: 'twitter' as const,
   website: 'website' as const
}

export const enumProfileUpdateColumn = {
   accountId: 'accountId' as const,
   description: 'description' as const,
   instagram: 'instagram' as const,
   picture: 'picture' as const,
   twitter: 'twitter' as const,
   website: 'website' as const
}

export const enumProjectMediaConstraint = {
   ProjectMedia_index_projectId_mediaId_key: 'ProjectMedia_index_projectId_mediaId_key' as const
}

export const enumProjectMediaSelectColumn = {
   index: 'index' as const,
   mediaId: 'mediaId' as const,
   projectId: 'projectId' as const
}

export const enumProjectMediaUpdateColumn = {
   index: 'index' as const,
   mediaId: 'mediaId' as const,
   projectId: 'projectId' as const
}

export const enumProjectConstraint = {
   Project_pkey: 'Project_pkey' as const
}

export const enumProjectSelectColumn = {
   authorId: 'authorId' as const,
   blockchain: 'blockchain' as const,
   createdAt: 'createdAt' as const,
   curatorId: 'curatorId' as const,
   description: 'description' as const,
   id: 'id' as const,
   pricing: 'pricing' as const,
   releaseAt: 'releaseAt' as const,
   state: 'state' as const,
   storage: 'storage' as const,
   title: 'title' as const,
   updatedAt: 'updatedAt' as const
}

export const enumProjectUpdateColumn = {
   authorId: 'authorId' as const,
   blockchain: 'blockchain' as const,
   createdAt: 'createdAt' as const,
   curatorId: 'curatorId' as const,
   description: 'description' as const,
   id: 'id' as const,
   pricing: 'pricing' as const,
   releaseAt: 'releaseAt' as const,
   state: 'state' as const,
   storage: 'storage' as const,
   title: 'title' as const,
   updatedAt: 'updatedAt' as const
}

export const enumWalletConstraint = {
   Wallet_pkey: 'Wallet_pkey' as const
}

export const enumWalletSelectColumn = {
   accountId: 'accountId' as const,
   address: 'address' as const,
   network: 'network' as const
}

export const enumWalletUpdateColumn = {
   accountId: 'accountId' as const,
   address: 'address' as const,
   network: 'network' as const
}

export const enum_prismaMigrationsConstraint = {
   _prisma_migrations_pkey: '_prisma_migrations_pkey' as const
}

export const enum_prismaMigrationsSelectColumn = {
   applied_steps_count: 'applied_steps_count' as const,
   checksum: 'checksum' as const,
   finished_at: 'finished_at' as const,
   id: 'id' as const,
   logs: 'logs' as const,
   migration_name: 'migration_name' as const,
   rolled_back_at: 'rolled_back_at' as const,
   started_at: 'started_at' as const
}

export const enum_prismaMigrationsUpdateColumn = {
   applied_steps_count: 'applied_steps_count' as const,
   checksum: 'checksum' as const,
   finished_at: 'finished_at' as const,
   id: 'id' as const,
   logs: 'logs' as const,
   migration_name: 'migration_name' as const,
   rolled_back_at: 'rolled_back_at' as const,
   started_at: 'started_at' as const
}

export const enumCursorOrdering = {
   ASC: 'ASC' as const,
   DESC: 'DESC' as const
}

export const enumOrderBy = {
   asc: 'asc' as const,
   asc_nulls_first: 'asc_nulls_first' as const,
   asc_nulls_last: 'asc_nulls_last' as const,
   desc: 'desc' as const,
   desc_nulls_first: 'desc_nulls_first' as const,
   desc_nulls_last: 'desc_nulls_last' as const
}
