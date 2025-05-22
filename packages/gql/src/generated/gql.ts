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
    "\n  mutation CreateWhitelist($whitelist: jsonb!) {\n    set_whitelist(whitelist: $whitelist) {\n      merkleRoot\n      message\n      success\n    }\n  }\n": typeof types.CreateWhitelistDocument,
    "\n  mutation GenerateChallenge($input: ChallengeInput!) {\n    generate_challenge(input: $input) {\n      id\n      text\n    }\n  }\n": typeof types.GenerateChallengeDocument,
    "\n  mutation Authenticate($input: AuthenticationInput!) {\n    authenticate(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": typeof types.AuthenticateDocument,
    "\n  mutation AuthenticateWeb3Auth($input: AuthenticationWeb3AuthInput!) {\n    authenticate_web3auth(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": typeof types.AuthenticateWeb3AuthDocument,
    "\n  mutation Web3AuthOAuth($input: Web3AuthOAuthInput!) {\n    web3auth_oauth(input: $input) {\n      idToken\n    }\n  }\n": typeof types.Web3AuthOAuthDocument,
    "\n  mutation Web3AuthEmailRequestOTP($email: String!) {\n    web3auth_email_request_otp(input: $email) {\n      email\n      expires\n      attemptsLeft\n    }\n  }\n": typeof types.Web3AuthEmailRequestOtpDocument,
    "\n  mutation MyMutation($input: Web3AuthEmailAuthOTPInput!) {\n    web3auth_email_auth_otp(input: $input) {\n      idToken\n    }\n  }\n": typeof types.MyMutationDocument,
    "\n  mutation Refresh($input: RefreshInput!) {\n    refresh(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": typeof types.RefreshDocument,
    "\n  mutation Logout($input: LogoutInput!) {\n    logout(input: $input) {\n      success\n    }\n  }\n": typeof types.LogoutDocument,
    "\n  fragment Account_BaseDetails on Account {\n    id\n    username\n    profile {\n      picture\n      description\n      website\n      location\n    }\n    wallets {\n      ...Wallet_BaseDetails\n    }\n  }\n": typeof types.Account_BaseDetailsFragmentDoc,
    "\n  fragment Account_Wallets on Account {\n    wallets {\n      ...Wallet_BaseDetails\n    }\n    mainWallet {\n      ...Wallet_BaseDetails\n    }\n  }\n": typeof types.Account_WalletsFragmentDoc,
    "\n  query GetAccounts($where: Account_bool_exp = {}) {\n    offchain {\n      Account(where: $where) {\n        ...Account_BaseDetails\n      }\n    }\n  }\n": typeof types.GetAccountsDocument,
    "\n  query GetAccountWallets($where: Account_bool_exp = {}) {\n    offchain {\n      Account(where: $where) {\n        ...Account_BaseDetails\n        ...Account_Wallets\n      }\n    }\n  }\n": typeof types.GetAccountWalletsDocument,
    "\n  query GetMyAccount {\n    offchain {\n      UserAccount {\n        account {\n          ...Account_BaseDetails\n          ...Account_Wallets\n        }\n      }\n    }\n  }\n": typeof types.GetMyAccountDocument,
    "\n  mutation UpdateAccount($input: UpdateAccountInput!) {\n    update_account(input: $input) {\n      id\n      username\n      profile {\n        picture\n        description\n        website\n        location\n      }\n    }\n  }\n": typeof types.UpdateAccountDocument,
    "\n  mutation DeleteAccount {\n    delete_account {\n      id\n      username\n    }\n  }\n": typeof types.DeleteAccountDocument,
    "\n  mutation TransferWallet($input: TransferWalletInput!) {\n    transfer_wallet(input: $input)\n  }\n": typeof types.TransferWalletDocument,
    "\n  mutation SetFarcasterHandle($input: SetFarcasterHandleInput!) {\n    set_farcaster_handle(input: $input) {\n      handle\n    }\n  }\n": typeof types.SetFarcasterHandleDocument,
    "\n  mutation AirdropTezClaim($input: AirdropTezClaimInput!) {\n    airdrop_tez_claim(input: $input) {\n      signature\n    }\n  }\n": typeof types.AirdropTezClaimDocument,
    "\n  query Get_Libraries {\n    offchain {\n      Library {\n        id\n        name\n        license\n        versions {\n          filename\n          id\n          onchfsPointer\n          content\n        }\n        authors\n        createdAt\n        description\n        docUrl\n      }\n    }\n  }\n": typeof types.Get_LibrariesDocument,
    "\n  fragment Project_BaseDetails on Project {\n    id\n    title\n    description\n    tokenId\n    releaseAt\n    blockchain\n    storage\n    pricing\n    curator {\n      id\n      status\n      username\n      wallets {\n        ...Wallet_BaseDetails\n      }\n    }\n    author {\n      ...Account_BaseDetails\n    }\n    collaborators {\n      account {\n        ...Account_BaseDetails\n      }\n    }\n    collaborators {\n      account {\n        ...Account_BaseDetails\n      }\n    }\n    projectMedias {\n      index\n      media {\n        id\n        url\n      }\n    }\n  }\n": typeof types.Project_BaseDetailsFragmentDoc,
    "\n  fragment Project_UserSecrets on Project {\n    state\n  }\n": typeof types.Project_UserSecretsFragmentDoc,
    "\n  query GetAllProjects {\n    offchain {\n      Project {\n        ...Project_BaseDetails\n      }\n    }\n  }\n": typeof types.GetAllProjectsDocument,
    "\n  query GetAllProjectsAfterDate($afterDate: timestamptz!) {\n    offchain {\n      Project(where: { releaseAt: { _gte: $afterDate } }) {\n        ...Project_BaseDetails\n      }\n    }\n  }\n": typeof types.GetAllProjectsAfterDateDocument,
    "\n  query GetUserSubmissions($authorId: uuid!) {\n    offchain {\n      Project(where: { authorId: { _eq: $authorId } }) {\n        ...Project_BaseDetails\n        ...Project_UserSecrets\n      }\n    }\n  }\n": typeof types.GetUserSubmissionsDocument,
    "\n  mutation CreateProject($object: Project_insert_input!) {\n    offchain {\n      insert_Project_one(object: $object) {\n        projectMedias {\n          index\n          media {\n            id\n            name\n          }\n        }\n        id\n        description\n        author {\n          id\n        }\n        title\n        state\n        releaseAt\n      }\n    }\n  }\n": typeof types.CreateProjectDocument,
    "\n  mutation Update_Project(\n    $projectId: uuid!\n    $projectData: Project_set_input\n    $projectMedias: [ProjectMedia_insert_input!]!\n    $projectCollaborators: [ProjectCollaborator_insert_input!]!\n  ) {\n    offchain {\n      delete_ProjectMedia(where: { projectId: { _eq: $projectId } }) {\n        affected_rows\n      }\n      delete_ProjectCollaborator(where: { projectId: { _eq: $projectId } }) {\n        affected_rows\n      }\n      update_Project(where: { id: { _eq: $projectId } }, _set: $projectData) {\n        affected_rows\n      }\n      insert_ProjectMedia(objects: $projectMedias) {\n        affected_rows\n      }\n      insert_ProjectCollaborator(objects: $projectCollaborators) {\n        affected_rows\n      }\n    }\n  }\n": typeof types.Update_ProjectDocument,
    "\n  mutation PrepareRedemption($input: PrepareRedemptionInput!) {\n    prepare_redemption(input: $input) {\n      payload {\n        consumer\n        token_id\n        options\n        salt\n      }\n      signature\n    }\n  }\n": typeof types.PrepareRedemptionDocument,
    "\n  fragment User_BaseDetails on user {\n    id\n    name\n  }\n": typeof types.User_BaseDetailsFragmentDoc,
    "\n  fragment Wallet_BaseDetails on Wallet {\n    address\n    network\n    accountId\n    walletUser {\n      flag\n    }\n  }\n": typeof types.Wallet_BaseDetailsFragmentDoc,
    "\n  mutation LinkWalletToAccount($input: LinkWalletInput!) {\n    link_wallet_to_account(input: $input)\n  }\n": typeof types.LinkWalletToAccountDocument,
    "\n  mutation UnlinkWalletFromAccount($input: UnlinkWalletInput) {\n    unlink_wallet_from_account(input: $input)\n  }\n": typeof types.UnlinkWalletFromAccountDocument,
    "\n  fragment WhitelistEntries on Whitelist {\n    entries {\n      walletAddress\n      whitelistIndex\n    }\n  }\n": typeof types.WhitelistEntriesFragmentDoc,
    "\n  query GetWhitelists($where: Whitelist_bool_exp = {}) {\n    offchain {\n      Whitelist(where: $where) {\n        merkleRoot\n        ...WhitelistEntries\n      }\n    }\n  }\n": typeof types.GetWhitelistsDocument,
    "\n  query GetWhitelist($merkleRoot: String = \"\") {\n    offchain {\n      Whitelist_by_pk(merkleRoot: $merkleRoot) {\n        merkleRoot\n        ...WhitelistEntries\n      }\n    }\n  }\n": typeof types.GetWhitelistDocument,
    "\n  fragment Article_BaseDetails on article {\n    id\n    created_at\n    slug\n    title\n    description\n    user {\n      ...User_BaseDetails\n    }\n    thumbnail_uri\n    thumbnail_caption\n    media_image {\n      id\n      width\n      height\n      placeholder\n    }\n    display_uri\n  }\n": typeof types.Article_BaseDetailsFragmentDoc,
    "\n  fragment Article_FullDetails on article {\n    ...Article_BaseDetails\n    body\n    tags\n    language\n    editions\n    royalties\n    metadata_uri\n    metadata\n    flag\n    moderation_reason {\n      id\n      reason\n    }\n    splits {\n      pct\n      user {\n        ...User_BaseDetails\n      }\n    }\n    article_revisions {\n      iteration\n      metadata_uri\n      created_at\n      op_hash\n    }\n  }\n": typeof types.Article_FullDetailsFragmentDoc,
    "\n  query GetFullArticleById($id: Int!) {\n    onchain {\n      article_by_pk(id: $id) {\n        ...Article_FullDetails\n      }\n    }\n  }\n": typeof types.GetFullArticleByIdDocument,
    "\n  query GetFullArticleBySlug($slug: String!) {\n    onchain {\n      article(where: { slug: { _eq: $slug } }) {\n        ...Article_FullDetails\n      }\n    }\n  }\n": typeof types.GetFullArticleBySlugDocument,
    "\n  query GetEthPrimarySplits($where: eth_primary_splits_bool_exp = {}) {\n    onchain {\n      __typename\n      eth_primary_splits {\n        id\n        receiver\n        receivers\n        allocations\n        chain\n      }\n    }\n  }\n": typeof types.GetEthPrimarySplitsDocument,
    "\n  query GetEthSecondarySplits($id: String!) {\n    onchain {\n      eth_secondary_splits_by_pk(id: $id) {\n        allocations\n        basis_points\n        chain\n        id\n        receiver\n        receivers\n      }\n    }\n  }\n": typeof types.GetEthSecondarySplitsDocument,
    "\n  query GetFrameData($id: String = \"\") {\n    onchain {\n      eth_frame_data_by_pk(id: $id) {\n        id\n        frame_minter_data\n      }\n    }\n  }\n": typeof types.GetFrameDataDocument,
    "\n  fragment GenerativeToken_Pricing on generative_token {\n    pricing_fixeds {\n      price\n      opens_at\n    }\n    pricing_dutch_auctions {\n      levels\n      resting_price\n      final_price\n      decrement_duration\n      opens_at\n    }\n  }\n": typeof types.GenerativeToken_PricingFragmentDoc,
    "\n  query Qu_GenerativeTokenById($id: String!) {\n    onchain {\n      generative_token_by_pk(id: $id) {\n        id\n        actions {\n          id\n          chain\n          generative_token {\n            id\n          }\n          objkt {\n            id\n            iteration\n          }\n          created_at\n          issuer {\n            id\n            wallet {\n              account {\n                id\n                profile {\n                  picture\n                }\n                username\n              }\n            }\n          }\n          target {\n            id\n            wallet {\n              account {\n                id\n                profile {\n                  picture\n                }\n                username\n              }\n            }\n          }\n          metadata\n          numeric_value\n          op_hash\n          type\n        }\n        thumbnail_uri\n      }\n    }\n  }\n": typeof types.Qu_GenerativeTokenByIdDocument,
    "\n  query Qu_GetObjectsOfTokenAndWallets(\n    $_eq: String = \"\"\n    $_iregex: String = \"\"\n  ) {\n    onchain {\n      objkt(\n        where: {\n          generative_token: { id: { _eq: $_eq } }\n          minter_id: { _iregex: $_iregex }\n        }\n        order_by: { created_at: desc }\n      ) {\n        id\n        minter_id\n        slug\n        capture_media_id\n      }\n    }\n  }\n": typeof types.Qu_GetObjectsOfTokenAndWalletsDocument,
    "\n  query GetEthMinterProceeds($where: eth_minter_proceeds_bool_exp = {}) {\n    onchain {\n      eth_minter_proceeds(where: $where) {\n        id\n        minter_address\n        primary_receiver\n        reserve_id\n        token_address\n        user_address\n        amount\n        chain\n      }\n    }\n  }\n": typeof types.GetEthMinterProceedsDocument,
    "\n  query GetReserves($where: reserve_bool_exp = {}) {\n    onchain {\n      reserve(where: $where) {\n        data\n        id\n        method\n        token_id\n        amount\n      }\n    }\n  }\n": typeof types.GetReservesDocument,
    "\n  query GetActionSalesBot($id: uuid!) {\n    onchain {\n      action_by_pk(id: $id) {\n        id\n        chain\n        type\n        numeric_value\n        created_at\n        issuer_id\n        issuer {\n          wallet {\n            account {\n              username\n            }\n          }\n        }\n        target_id\n        user {\n          wallet {\n            account {\n              username\n            }\n          }\n        }\n        objkt {\n          id\n          slug\n          name\n          metadata\n          thumbnail_uri\n        }\n        generative_token {\n          id\n          thumbnail_uri\n          author_id\n          author {\n            wallet {\n              account {\n                username\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetActionSalesBotDocument,
    "\n  query GetTokenPricingsAndReserves($id: String!) {\n    onchain {\n      generative_token_by_pk(id: $id) {\n        is_frame\n        pricing_fixeds {\n          id\n          opens_at\n          price\n        }\n        pricing_dutch_auctions {\n          id\n          opens_at\n          levels\n          decrement_duration\n        }\n      }\n      reserve(where: { token_id: { _eq: $id } }) {\n        id\n        method\n        amount\n        data\n      }\n    }\n  }\n": typeof types.GetTokenPricingsAndReservesDocument,
    "\n  query GetEthUserProceeds($where: eth_user_proceeds_bool_exp = {}) {\n    onchain {\n      eth_user_proceeds(where: $where) {\n        id\n        total_proceeds\n      }\n    }\n  }\n": typeof types.GetEthUserProceedsDocument,
    "\n  query EstimateEvmTransaction($input: EstimateEvmTransactionInput!) {\n    estimate_evm_transaction(input: $input) {\n      error {\n        message\n        revertReason\n      }\n      changes {\n        amount\n        assetType\n        changeType\n        contractAddress\n        decimals\n        from\n        name\n        rawAmount\n        symbol\n        to\n        tokenId\n      }\n      gasUsed\n    }\n  }\n": typeof types.EstimateEvmTransactionDocument,
};
const documents: Documents = {
    "\n  mutation CreateWhitelist($whitelist: jsonb!) {\n    set_whitelist(whitelist: $whitelist) {\n      merkleRoot\n      message\n      success\n    }\n  }\n": types.CreateWhitelistDocument,
    "\n  mutation GenerateChallenge($input: ChallengeInput!) {\n    generate_challenge(input: $input) {\n      id\n      text\n    }\n  }\n": types.GenerateChallengeDocument,
    "\n  mutation Authenticate($input: AuthenticationInput!) {\n    authenticate(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.AuthenticateDocument,
    "\n  mutation AuthenticateWeb3Auth($input: AuthenticationWeb3AuthInput!) {\n    authenticate_web3auth(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.AuthenticateWeb3AuthDocument,
    "\n  mutation Web3AuthOAuth($input: Web3AuthOAuthInput!) {\n    web3auth_oauth(input: $input) {\n      idToken\n    }\n  }\n": types.Web3AuthOAuthDocument,
    "\n  mutation Web3AuthEmailRequestOTP($email: String!) {\n    web3auth_email_request_otp(input: $email) {\n      email\n      expires\n      attemptsLeft\n    }\n  }\n": types.Web3AuthEmailRequestOtpDocument,
    "\n  mutation MyMutation($input: Web3AuthEmailAuthOTPInput!) {\n    web3auth_email_auth_otp(input: $input) {\n      idToken\n    }\n  }\n": types.MyMutationDocument,
    "\n  mutation Refresh($input: RefreshInput!) {\n    refresh(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.RefreshDocument,
    "\n  mutation Logout($input: LogoutInput!) {\n    logout(input: $input) {\n      success\n    }\n  }\n": types.LogoutDocument,
    "\n  fragment Account_BaseDetails on Account {\n    id\n    username\n    profile {\n      picture\n      description\n      website\n      location\n    }\n    wallets {\n      ...Wallet_BaseDetails\n    }\n  }\n": types.Account_BaseDetailsFragmentDoc,
    "\n  fragment Account_Wallets on Account {\n    wallets {\n      ...Wallet_BaseDetails\n    }\n    mainWallet {\n      ...Wallet_BaseDetails\n    }\n  }\n": types.Account_WalletsFragmentDoc,
    "\n  query GetAccounts($where: Account_bool_exp = {}) {\n    offchain {\n      Account(where: $where) {\n        ...Account_BaseDetails\n      }\n    }\n  }\n": types.GetAccountsDocument,
    "\n  query GetAccountWallets($where: Account_bool_exp = {}) {\n    offchain {\n      Account(where: $where) {\n        ...Account_BaseDetails\n        ...Account_Wallets\n      }\n    }\n  }\n": types.GetAccountWalletsDocument,
    "\n  query GetMyAccount {\n    offchain {\n      UserAccount {\n        account {\n          ...Account_BaseDetails\n          ...Account_Wallets\n        }\n      }\n    }\n  }\n": types.GetMyAccountDocument,
    "\n  mutation UpdateAccount($input: UpdateAccountInput!) {\n    update_account(input: $input) {\n      id\n      username\n      profile {\n        picture\n        description\n        website\n        location\n      }\n    }\n  }\n": types.UpdateAccountDocument,
    "\n  mutation DeleteAccount {\n    delete_account {\n      id\n      username\n    }\n  }\n": types.DeleteAccountDocument,
    "\n  mutation TransferWallet($input: TransferWalletInput!) {\n    transfer_wallet(input: $input)\n  }\n": types.TransferWalletDocument,
    "\n  mutation SetFarcasterHandle($input: SetFarcasterHandleInput!) {\n    set_farcaster_handle(input: $input) {\n      handle\n    }\n  }\n": types.SetFarcasterHandleDocument,
    "\n  mutation AirdropTezClaim($input: AirdropTezClaimInput!) {\n    airdrop_tez_claim(input: $input) {\n      signature\n    }\n  }\n": types.AirdropTezClaimDocument,
    "\n  query Get_Libraries {\n    offchain {\n      Library {\n        id\n        name\n        license\n        versions {\n          filename\n          id\n          onchfsPointer\n          content\n        }\n        authors\n        createdAt\n        description\n        docUrl\n      }\n    }\n  }\n": types.Get_LibrariesDocument,
    "\n  fragment Project_BaseDetails on Project {\n    id\n    title\n    description\n    tokenId\n    releaseAt\n    blockchain\n    storage\n    pricing\n    curator {\n      id\n      status\n      username\n      wallets {\n        ...Wallet_BaseDetails\n      }\n    }\n    author {\n      ...Account_BaseDetails\n    }\n    collaborators {\n      account {\n        ...Account_BaseDetails\n      }\n    }\n    collaborators {\n      account {\n        ...Account_BaseDetails\n      }\n    }\n    projectMedias {\n      index\n      media {\n        id\n        url\n      }\n    }\n  }\n": types.Project_BaseDetailsFragmentDoc,
    "\n  fragment Project_UserSecrets on Project {\n    state\n  }\n": types.Project_UserSecretsFragmentDoc,
    "\n  query GetAllProjects {\n    offchain {\n      Project {\n        ...Project_BaseDetails\n      }\n    }\n  }\n": types.GetAllProjectsDocument,
    "\n  query GetAllProjectsAfterDate($afterDate: timestamptz!) {\n    offchain {\n      Project(where: { releaseAt: { _gte: $afterDate } }) {\n        ...Project_BaseDetails\n      }\n    }\n  }\n": types.GetAllProjectsAfterDateDocument,
    "\n  query GetUserSubmissions($authorId: uuid!) {\n    offchain {\n      Project(where: { authorId: { _eq: $authorId } }) {\n        ...Project_BaseDetails\n        ...Project_UserSecrets\n      }\n    }\n  }\n": types.GetUserSubmissionsDocument,
    "\n  mutation CreateProject($object: Project_insert_input!) {\n    offchain {\n      insert_Project_one(object: $object) {\n        projectMedias {\n          index\n          media {\n            id\n            name\n          }\n        }\n        id\n        description\n        author {\n          id\n        }\n        title\n        state\n        releaseAt\n      }\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation Update_Project(\n    $projectId: uuid!\n    $projectData: Project_set_input\n    $projectMedias: [ProjectMedia_insert_input!]!\n    $projectCollaborators: [ProjectCollaborator_insert_input!]!\n  ) {\n    offchain {\n      delete_ProjectMedia(where: { projectId: { _eq: $projectId } }) {\n        affected_rows\n      }\n      delete_ProjectCollaborator(where: { projectId: { _eq: $projectId } }) {\n        affected_rows\n      }\n      update_Project(where: { id: { _eq: $projectId } }, _set: $projectData) {\n        affected_rows\n      }\n      insert_ProjectMedia(objects: $projectMedias) {\n        affected_rows\n      }\n      insert_ProjectCollaborator(objects: $projectCollaborators) {\n        affected_rows\n      }\n    }\n  }\n": types.Update_ProjectDocument,
    "\n  mutation PrepareRedemption($input: PrepareRedemptionInput!) {\n    prepare_redemption(input: $input) {\n      payload {\n        consumer\n        token_id\n        options\n        salt\n      }\n      signature\n    }\n  }\n": types.PrepareRedemptionDocument,
    "\n  fragment User_BaseDetails on user {\n    id\n    name\n  }\n": types.User_BaseDetailsFragmentDoc,
    "\n  fragment Wallet_BaseDetails on Wallet {\n    address\n    network\n    accountId\n    walletUser {\n      flag\n    }\n  }\n": types.Wallet_BaseDetailsFragmentDoc,
    "\n  mutation LinkWalletToAccount($input: LinkWalletInput!) {\n    link_wallet_to_account(input: $input)\n  }\n": types.LinkWalletToAccountDocument,
    "\n  mutation UnlinkWalletFromAccount($input: UnlinkWalletInput) {\n    unlink_wallet_from_account(input: $input)\n  }\n": types.UnlinkWalletFromAccountDocument,
    "\n  fragment WhitelistEntries on Whitelist {\n    entries {\n      walletAddress\n      whitelistIndex\n    }\n  }\n": types.WhitelistEntriesFragmentDoc,
    "\n  query GetWhitelists($where: Whitelist_bool_exp = {}) {\n    offchain {\n      Whitelist(where: $where) {\n        merkleRoot\n        ...WhitelistEntries\n      }\n    }\n  }\n": types.GetWhitelistsDocument,
    "\n  query GetWhitelist($merkleRoot: String = \"\") {\n    offchain {\n      Whitelist_by_pk(merkleRoot: $merkleRoot) {\n        merkleRoot\n        ...WhitelistEntries\n      }\n    }\n  }\n": types.GetWhitelistDocument,
    "\n  fragment Article_BaseDetails on article {\n    id\n    created_at\n    slug\n    title\n    description\n    user {\n      ...User_BaseDetails\n    }\n    thumbnail_uri\n    thumbnail_caption\n    media_image {\n      id\n      width\n      height\n      placeholder\n    }\n    display_uri\n  }\n": types.Article_BaseDetailsFragmentDoc,
    "\n  fragment Article_FullDetails on article {\n    ...Article_BaseDetails\n    body\n    tags\n    language\n    editions\n    royalties\n    metadata_uri\n    metadata\n    flag\n    moderation_reason {\n      id\n      reason\n    }\n    splits {\n      pct\n      user {\n        ...User_BaseDetails\n      }\n    }\n    article_revisions {\n      iteration\n      metadata_uri\n      created_at\n      op_hash\n    }\n  }\n": types.Article_FullDetailsFragmentDoc,
    "\n  query GetFullArticleById($id: Int!) {\n    onchain {\n      article_by_pk(id: $id) {\n        ...Article_FullDetails\n      }\n    }\n  }\n": types.GetFullArticleByIdDocument,
    "\n  query GetFullArticleBySlug($slug: String!) {\n    onchain {\n      article(where: { slug: { _eq: $slug } }) {\n        ...Article_FullDetails\n      }\n    }\n  }\n": types.GetFullArticleBySlugDocument,
    "\n  query GetEthPrimarySplits($where: eth_primary_splits_bool_exp = {}) {\n    onchain {\n      __typename\n      eth_primary_splits {\n        id\n        receiver\n        receivers\n        allocations\n        chain\n      }\n    }\n  }\n": types.GetEthPrimarySplitsDocument,
    "\n  query GetEthSecondarySplits($id: String!) {\n    onchain {\n      eth_secondary_splits_by_pk(id: $id) {\n        allocations\n        basis_points\n        chain\n        id\n        receiver\n        receivers\n      }\n    }\n  }\n": types.GetEthSecondarySplitsDocument,
    "\n  query GetFrameData($id: String = \"\") {\n    onchain {\n      eth_frame_data_by_pk(id: $id) {\n        id\n        frame_minter_data\n      }\n    }\n  }\n": types.GetFrameDataDocument,
    "\n  fragment GenerativeToken_Pricing on generative_token {\n    pricing_fixeds {\n      price\n      opens_at\n    }\n    pricing_dutch_auctions {\n      levels\n      resting_price\n      final_price\n      decrement_duration\n      opens_at\n    }\n  }\n": types.GenerativeToken_PricingFragmentDoc,
    "\n  query Qu_GenerativeTokenById($id: String!) {\n    onchain {\n      generative_token_by_pk(id: $id) {\n        id\n        actions {\n          id\n          chain\n          generative_token {\n            id\n          }\n          objkt {\n            id\n            iteration\n          }\n          created_at\n          issuer {\n            id\n            wallet {\n              account {\n                id\n                profile {\n                  picture\n                }\n                username\n              }\n            }\n          }\n          target {\n            id\n            wallet {\n              account {\n                id\n                profile {\n                  picture\n                }\n                username\n              }\n            }\n          }\n          metadata\n          numeric_value\n          op_hash\n          type\n        }\n        thumbnail_uri\n      }\n    }\n  }\n": types.Qu_GenerativeTokenByIdDocument,
    "\n  query Qu_GetObjectsOfTokenAndWallets(\n    $_eq: String = \"\"\n    $_iregex: String = \"\"\n  ) {\n    onchain {\n      objkt(\n        where: {\n          generative_token: { id: { _eq: $_eq } }\n          minter_id: { _iregex: $_iregex }\n        }\n        order_by: { created_at: desc }\n      ) {\n        id\n        minter_id\n        slug\n        capture_media_id\n      }\n    }\n  }\n": types.Qu_GetObjectsOfTokenAndWalletsDocument,
    "\n  query GetEthMinterProceeds($where: eth_minter_proceeds_bool_exp = {}) {\n    onchain {\n      eth_minter_proceeds(where: $where) {\n        id\n        minter_address\n        primary_receiver\n        reserve_id\n        token_address\n        user_address\n        amount\n        chain\n      }\n    }\n  }\n": types.GetEthMinterProceedsDocument,
    "\n  query GetReserves($where: reserve_bool_exp = {}) {\n    onchain {\n      reserve(where: $where) {\n        data\n        id\n        method\n        token_id\n        amount\n      }\n    }\n  }\n": types.GetReservesDocument,
    "\n  query GetActionSalesBot($id: uuid!) {\n    onchain {\n      action_by_pk(id: $id) {\n        id\n        chain\n        type\n        numeric_value\n        created_at\n        issuer_id\n        issuer {\n          wallet {\n            account {\n              username\n            }\n          }\n        }\n        target_id\n        user {\n          wallet {\n            account {\n              username\n            }\n          }\n        }\n        objkt {\n          id\n          slug\n          name\n          metadata\n          thumbnail_uri\n        }\n        generative_token {\n          id\n          thumbnail_uri\n          author_id\n          author {\n            wallet {\n              account {\n                username\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetActionSalesBotDocument,
    "\n  query GetTokenPricingsAndReserves($id: String!) {\n    onchain {\n      generative_token_by_pk(id: $id) {\n        is_frame\n        pricing_fixeds {\n          id\n          opens_at\n          price\n        }\n        pricing_dutch_auctions {\n          id\n          opens_at\n          levels\n          decrement_duration\n        }\n      }\n      reserve(where: { token_id: { _eq: $id } }) {\n        id\n        method\n        amount\n        data\n      }\n    }\n  }\n": types.GetTokenPricingsAndReservesDocument,
    "\n  query GetEthUserProceeds($where: eth_user_proceeds_bool_exp = {}) {\n    onchain {\n      eth_user_proceeds(where: $where) {\n        id\n        total_proceeds\n      }\n    }\n  }\n": types.GetEthUserProceedsDocument,
    "\n  query EstimateEvmTransaction($input: EstimateEvmTransactionInput!) {\n    estimate_evm_transaction(input: $input) {\n      error {\n        message\n        revertReason\n      }\n      changes {\n        amount\n        assetType\n        changeType\n        contractAddress\n        decimals\n        from\n        name\n        rawAmount\n        symbol\n        to\n        tokenId\n      }\n      gasUsed\n    }\n  }\n": types.EstimateEvmTransactionDocument,
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
export function graphql(source: "\n  mutation GenerateChallenge($input: ChallengeInput!) {\n    generate_challenge(input: $input) {\n      id\n      text\n    }\n  }\n"): (typeof documents)["\n  mutation GenerateChallenge($input: ChallengeInput!) {\n    generate_challenge(input: $input) {\n      id\n      text\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Authenticate($input: AuthenticationInput!) {\n    authenticate(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation Authenticate($input: AuthenticationInput!) {\n    authenticate(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AuthenticateWeb3Auth($input: AuthenticationWeb3AuthInput!) {\n    authenticate_web3auth(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation AuthenticateWeb3Auth($input: AuthenticationWeb3AuthInput!) {\n    authenticate_web3auth(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Web3AuthOAuth($input: Web3AuthOAuthInput!) {\n    web3auth_oauth(input: $input) {\n      idToken\n    }\n  }\n"): (typeof documents)["\n  mutation Web3AuthOAuth($input: Web3AuthOAuthInput!) {\n    web3auth_oauth(input: $input) {\n      idToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Web3AuthEmailRequestOTP($email: String!) {\n    web3auth_email_request_otp(input: $email) {\n      email\n      expires\n      attemptsLeft\n    }\n  }\n"): (typeof documents)["\n  mutation Web3AuthEmailRequestOTP($email: String!) {\n    web3auth_email_request_otp(input: $email) {\n      email\n      expires\n      attemptsLeft\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MyMutation($input: Web3AuthEmailAuthOTPInput!) {\n    web3auth_email_auth_otp(input: $input) {\n      idToken\n    }\n  }\n"): (typeof documents)["\n  mutation MyMutation($input: Web3AuthEmailAuthOTPInput!) {\n    web3auth_email_auth_otp(input: $input) {\n      idToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Refresh($input: RefreshInput!) {\n    refresh(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation Refresh($input: RefreshInput!) {\n    refresh(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout($input: LogoutInput!) {\n    logout(input: $input) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Logout($input: LogoutInput!) {\n    logout(input: $input) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Account_BaseDetails on Account {\n    id\n    username\n    profile {\n      picture\n      description\n      website\n      location\n    }\n    wallets {\n      ...Wallet_BaseDetails\n    }\n  }\n"): (typeof documents)["\n  fragment Account_BaseDetails on Account {\n    id\n    username\n    profile {\n      picture\n      description\n      website\n      location\n    }\n    wallets {\n      ...Wallet_BaseDetails\n    }\n  }\n"];
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
export function graphql(source: "\n  query GetMyAccount {\n    offchain {\n      UserAccount {\n        account {\n          ...Account_BaseDetails\n          ...Account_Wallets\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMyAccount {\n    offchain {\n      UserAccount {\n        account {\n          ...Account_BaseDetails\n          ...Account_Wallets\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateAccount($input: UpdateAccountInput!) {\n    update_account(input: $input) {\n      id\n      username\n      profile {\n        picture\n        description\n        website\n        location\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateAccount($input: UpdateAccountInput!) {\n    update_account(input: $input) {\n      id\n      username\n      profile {\n        picture\n        description\n        website\n        location\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteAccount {\n    delete_account {\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteAccount {\n    delete_account {\n      id\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation TransferWallet($input: TransferWalletInput!) {\n    transfer_wallet(input: $input)\n  }\n"): (typeof documents)["\n  mutation TransferWallet($input: TransferWalletInput!) {\n    transfer_wallet(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SetFarcasterHandle($input: SetFarcasterHandleInput!) {\n    set_farcaster_handle(input: $input) {\n      handle\n    }\n  }\n"): (typeof documents)["\n  mutation SetFarcasterHandle($input: SetFarcasterHandleInput!) {\n    set_farcaster_handle(input: $input) {\n      handle\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AirdropTezClaim($input: AirdropTezClaimInput!) {\n    airdrop_tez_claim(input: $input) {\n      signature\n    }\n  }\n"): (typeof documents)["\n  mutation AirdropTezClaim($input: AirdropTezClaimInput!) {\n    airdrop_tez_claim(input: $input) {\n      signature\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Get_Libraries {\n    offchain {\n      Library {\n        id\n        name\n        license\n        versions {\n          filename\n          id\n          onchfsPointer\n          content\n        }\n        authors\n        createdAt\n        description\n        docUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query Get_Libraries {\n    offchain {\n      Library {\n        id\n        name\n        license\n        versions {\n          filename\n          id\n          onchfsPointer\n          content\n        }\n        authors\n        createdAt\n        description\n        docUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Project_BaseDetails on Project {\n    id\n    title\n    description\n    tokenId\n    releaseAt\n    blockchain\n    storage\n    pricing\n    curator {\n      id\n      status\n      username\n      wallets {\n        ...Wallet_BaseDetails\n      }\n    }\n    author {\n      ...Account_BaseDetails\n    }\n    collaborators {\n      account {\n        ...Account_BaseDetails\n      }\n    }\n    collaborators {\n      account {\n        ...Account_BaseDetails\n      }\n    }\n    projectMedias {\n      index\n      media {\n        id\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment Project_BaseDetails on Project {\n    id\n    title\n    description\n    tokenId\n    releaseAt\n    blockchain\n    storage\n    pricing\n    curator {\n      id\n      status\n      username\n      wallets {\n        ...Wallet_BaseDetails\n      }\n    }\n    author {\n      ...Account_BaseDetails\n    }\n    collaborators {\n      account {\n        ...Account_BaseDetails\n      }\n    }\n    collaborators {\n      account {\n        ...Account_BaseDetails\n      }\n    }\n    projectMedias {\n      index\n      media {\n        id\n        url\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation PrepareRedemption($input: PrepareRedemptionInput!) {\n    prepare_redemption(input: $input) {\n      payload {\n        consumer\n        token_id\n        options\n        salt\n      }\n      signature\n    }\n  }\n"): (typeof documents)["\n  mutation PrepareRedemption($input: PrepareRedemptionInput!) {\n    prepare_redemption(input: $input) {\n      payload {\n        consumer\n        token_id\n        options\n        salt\n      }\n      signature\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment User_BaseDetails on user {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment User_BaseDetails on user {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Wallet_BaseDetails on Wallet {\n    address\n    network\n    accountId\n    walletUser {\n      flag\n    }\n  }\n"): (typeof documents)["\n  fragment Wallet_BaseDetails on Wallet {\n    address\n    network\n    accountId\n    walletUser {\n      flag\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LinkWalletToAccount($input: LinkWalletInput!) {\n    link_wallet_to_account(input: $input)\n  }\n"): (typeof documents)["\n  mutation LinkWalletToAccount($input: LinkWalletInput!) {\n    link_wallet_to_account(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnlinkWalletFromAccount($input: UnlinkWalletInput) {\n    unlink_wallet_from_account(input: $input)\n  }\n"): (typeof documents)["\n  mutation UnlinkWalletFromAccount($input: UnlinkWalletInput) {\n    unlink_wallet_from_account(input: $input)\n  }\n"];
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
export function graphql(source: "\n  fragment Article_BaseDetails on article {\n    id\n    created_at\n    slug\n    title\n    description\n    user {\n      ...User_BaseDetails\n    }\n    thumbnail_uri\n    thumbnail_caption\n    media_image {\n      id\n      width\n      height\n      placeholder\n    }\n    display_uri\n  }\n"): (typeof documents)["\n  fragment Article_BaseDetails on article {\n    id\n    created_at\n    slug\n    title\n    description\n    user {\n      ...User_BaseDetails\n    }\n    thumbnail_uri\n    thumbnail_caption\n    media_image {\n      id\n      width\n      height\n      placeholder\n    }\n    display_uri\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Article_FullDetails on article {\n    ...Article_BaseDetails\n    body\n    tags\n    language\n    editions\n    royalties\n    metadata_uri\n    metadata\n    flag\n    moderation_reason {\n      id\n      reason\n    }\n    splits {\n      pct\n      user {\n        ...User_BaseDetails\n      }\n    }\n    article_revisions {\n      iteration\n      metadata_uri\n      created_at\n      op_hash\n    }\n  }\n"): (typeof documents)["\n  fragment Article_FullDetails on article {\n    ...Article_BaseDetails\n    body\n    tags\n    language\n    editions\n    royalties\n    metadata_uri\n    metadata\n    flag\n    moderation_reason {\n      id\n      reason\n    }\n    splits {\n      pct\n      user {\n        ...User_BaseDetails\n      }\n    }\n    article_revisions {\n      iteration\n      metadata_uri\n      created_at\n      op_hash\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFullArticleById($id: Int!) {\n    onchain {\n      article_by_pk(id: $id) {\n        ...Article_FullDetails\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFullArticleById($id: Int!) {\n    onchain {\n      article_by_pk(id: $id) {\n        ...Article_FullDetails\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFullArticleBySlug($slug: String!) {\n    onchain {\n      article(where: { slug: { _eq: $slug } }) {\n        ...Article_FullDetails\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFullArticleBySlug($slug: String!) {\n    onchain {\n      article(where: { slug: { _eq: $slug } }) {\n        ...Article_FullDetails\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEthPrimarySplits($where: eth_primary_splits_bool_exp = {}) {\n    onchain {\n      __typename\n      eth_primary_splits {\n        id\n        receiver\n        receivers\n        allocations\n        chain\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEthPrimarySplits($where: eth_primary_splits_bool_exp = {}) {\n    onchain {\n      __typename\n      eth_primary_splits {\n        id\n        receiver\n        receivers\n        allocations\n        chain\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEthSecondarySplits($id: String!) {\n    onchain {\n      eth_secondary_splits_by_pk(id: $id) {\n        allocations\n        basis_points\n        chain\n        id\n        receiver\n        receivers\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEthSecondarySplits($id: String!) {\n    onchain {\n      eth_secondary_splits_by_pk(id: $id) {\n        allocations\n        basis_points\n        chain\n        id\n        receiver\n        receivers\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFrameData($id: String = \"\") {\n    onchain {\n      eth_frame_data_by_pk(id: $id) {\n        id\n        frame_minter_data\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFrameData($id: String = \"\") {\n    onchain {\n      eth_frame_data_by_pk(id: $id) {\n        id\n        frame_minter_data\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GenerativeToken_Pricing on generative_token {\n    pricing_fixeds {\n      price\n      opens_at\n    }\n    pricing_dutch_auctions {\n      levels\n      resting_price\n      final_price\n      decrement_duration\n      opens_at\n    }\n  }\n"): (typeof documents)["\n  fragment GenerativeToken_Pricing on generative_token {\n    pricing_fixeds {\n      price\n      opens_at\n    }\n    pricing_dutch_auctions {\n      levels\n      resting_price\n      final_price\n      decrement_duration\n      opens_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Qu_GenerativeTokenById($id: String!) {\n    onchain {\n      generative_token_by_pk(id: $id) {\n        id\n        actions {\n          id\n          chain\n          generative_token {\n            id\n          }\n          objkt {\n            id\n            iteration\n          }\n          created_at\n          issuer {\n            id\n            wallet {\n              account {\n                id\n                profile {\n                  picture\n                }\n                username\n              }\n            }\n          }\n          target {\n            id\n            wallet {\n              account {\n                id\n                profile {\n                  picture\n                }\n                username\n              }\n            }\n          }\n          metadata\n          numeric_value\n          op_hash\n          type\n        }\n        thumbnail_uri\n      }\n    }\n  }\n"): (typeof documents)["\n  query Qu_GenerativeTokenById($id: String!) {\n    onchain {\n      generative_token_by_pk(id: $id) {\n        id\n        actions {\n          id\n          chain\n          generative_token {\n            id\n          }\n          objkt {\n            id\n            iteration\n          }\n          created_at\n          issuer {\n            id\n            wallet {\n              account {\n                id\n                profile {\n                  picture\n                }\n                username\n              }\n            }\n          }\n          target {\n            id\n            wallet {\n              account {\n                id\n                profile {\n                  picture\n                }\n                username\n              }\n            }\n          }\n          metadata\n          numeric_value\n          op_hash\n          type\n        }\n        thumbnail_uri\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Qu_GetObjectsOfTokenAndWallets(\n    $_eq: String = \"\"\n    $_iregex: String = \"\"\n  ) {\n    onchain {\n      objkt(\n        where: {\n          generative_token: { id: { _eq: $_eq } }\n          minter_id: { _iregex: $_iregex }\n        }\n        order_by: { created_at: desc }\n      ) {\n        id\n        minter_id\n        slug\n        capture_media_id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Qu_GetObjectsOfTokenAndWallets(\n    $_eq: String = \"\"\n    $_iregex: String = \"\"\n  ) {\n    onchain {\n      objkt(\n        where: {\n          generative_token: { id: { _eq: $_eq } }\n          minter_id: { _iregex: $_iregex }\n        }\n        order_by: { created_at: desc }\n      ) {\n        id\n        minter_id\n        slug\n        capture_media_id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEthMinterProceeds($where: eth_minter_proceeds_bool_exp = {}) {\n    onchain {\n      eth_minter_proceeds(where: $where) {\n        id\n        minter_address\n        primary_receiver\n        reserve_id\n        token_address\n        user_address\n        amount\n        chain\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEthMinterProceeds($where: eth_minter_proceeds_bool_exp = {}) {\n    onchain {\n      eth_minter_proceeds(where: $where) {\n        id\n        minter_address\n        primary_receiver\n        reserve_id\n        token_address\n        user_address\n        amount\n        chain\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetReserves($where: reserve_bool_exp = {}) {\n    onchain {\n      reserve(where: $where) {\n        data\n        id\n        method\n        token_id\n        amount\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetReserves($where: reserve_bool_exp = {}) {\n    onchain {\n      reserve(where: $where) {\n        data\n        id\n        method\n        token_id\n        amount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetActionSalesBot($id: uuid!) {\n    onchain {\n      action_by_pk(id: $id) {\n        id\n        chain\n        type\n        numeric_value\n        created_at\n        issuer_id\n        issuer {\n          wallet {\n            account {\n              username\n            }\n          }\n        }\n        target_id\n        user {\n          wallet {\n            account {\n              username\n            }\n          }\n        }\n        objkt {\n          id\n          slug\n          name\n          metadata\n          thumbnail_uri\n        }\n        generative_token {\n          id\n          thumbnail_uri\n          author_id\n          author {\n            wallet {\n              account {\n                username\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetActionSalesBot($id: uuid!) {\n    onchain {\n      action_by_pk(id: $id) {\n        id\n        chain\n        type\n        numeric_value\n        created_at\n        issuer_id\n        issuer {\n          wallet {\n            account {\n              username\n            }\n          }\n        }\n        target_id\n        user {\n          wallet {\n            account {\n              username\n            }\n          }\n        }\n        objkt {\n          id\n          slug\n          name\n          metadata\n          thumbnail_uri\n        }\n        generative_token {\n          id\n          thumbnail_uri\n          author_id\n          author {\n            wallet {\n              account {\n                username\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTokenPricingsAndReserves($id: String!) {\n    onchain {\n      generative_token_by_pk(id: $id) {\n        is_frame\n        pricing_fixeds {\n          id\n          opens_at\n          price\n        }\n        pricing_dutch_auctions {\n          id\n          opens_at\n          levels\n          decrement_duration\n        }\n      }\n      reserve(where: { token_id: { _eq: $id } }) {\n        id\n        method\n        amount\n        data\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTokenPricingsAndReserves($id: String!) {\n    onchain {\n      generative_token_by_pk(id: $id) {\n        is_frame\n        pricing_fixeds {\n          id\n          opens_at\n          price\n        }\n        pricing_dutch_auctions {\n          id\n          opens_at\n          levels\n          decrement_duration\n        }\n      }\n      reserve(where: { token_id: { _eq: $id } }) {\n        id\n        method\n        amount\n        data\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEthUserProceeds($where: eth_user_proceeds_bool_exp = {}) {\n    onchain {\n      eth_user_proceeds(where: $where) {\n        id\n        total_proceeds\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEthUserProceeds($where: eth_user_proceeds_bool_exp = {}) {\n    onchain {\n      eth_user_proceeds(where: $where) {\n        id\n        total_proceeds\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EstimateEvmTransaction($input: EstimateEvmTransactionInput!) {\n    estimate_evm_transaction(input: $input) {\n      error {\n        message\n        revertReason\n      }\n      changes {\n        amount\n        assetType\n        changeType\n        contractAddress\n        decimals\n        from\n        name\n        rawAmount\n        symbol\n        to\n        tokenId\n      }\n      gasUsed\n    }\n  }\n"): (typeof documents)["\n  query EstimateEvmTransaction($input: EstimateEvmTransactionInput!) {\n    estimate_evm_transaction(input: $input) {\n      error {\n        message\n        revertReason\n      }\n      changes {\n        amount\n        assetType\n        changeType\n        contractAddress\n        decimals\n        from\n        name\n        rawAmount\n        symbol\n        to\n        tokenId\n      }\n      gasUsed\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;