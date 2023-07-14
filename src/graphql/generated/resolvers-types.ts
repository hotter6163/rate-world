import { Context } from '@/graphql/context';
import { User as UserModel } from '@prisma/client/index.d';
import { GraphQLResolveInfo } from 'graphql';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AuthenticateUserData = {
  __typename?: 'AuthenticateUserData';
  auth: Scalars['String']['output'];
  userData: Scalars['String']['output'];
};

export type AuthenticateUserInput = {
  socketId: Scalars['String']['input'];
};

export type AuthenticateUserPayload = {
  __typename?: 'AuthenticateUserPayload';
  data?: Maybe<AuthenticateUserData>;
  status: Scalars['Int']['output'];
};

export type AuthorizeChannelData = {
  __typename?: 'AuthorizeChannelData';
  auth: Scalars['String']['output'];
  channelData?: Maybe<Scalars['String']['output']>;
  sharedSecret?: Maybe<Scalars['String']['output']>;
};

export type AuthorizeChannelInput = {
  channelName: Scalars['String']['input'];
  socketId: Scalars['String']['input'];
};

export type AuthorizeChannelPayload = {
  __typename?: 'AuthorizeChannelPayload';
  data?: Maybe<AuthorizeChannelData>;
  status: Scalars['Int']['output'];
};

export type CallEventData = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CallEventInput = {
  channel: Scalars['String']['input'];
  data?: InputMaybe<Array<CallEventData>>;
  event: Scalars['String']['input'];
  socketId?: InputMaybe<Scalars['String']['input']>;
};

export type CallEventPayload = {
  __typename?: 'CallEventPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUser: AuthenticateUserPayload;
  authorizeChannel: AuthorizeChannelPayload;
  callEvent: CallEventPayload;
};

export type MutationAuthenticateUserArgs = {
  input: AuthenticateUserInput;
};

export type MutationAuthorizeChannelArgs = {
  input: AuthorizeChannelInput;
};

export type MutationCallEventArgs = {
  input: CallEventInput;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users: Array<User>;
};

export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  age: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthenticateUserData: ResolverTypeWrapper<AuthenticateUserData>;
  AuthenticateUserInput: AuthenticateUserInput;
  AuthenticateUserPayload: ResolverTypeWrapper<AuthenticateUserPayload>;
  AuthorizeChannelData: ResolverTypeWrapper<AuthorizeChannelData>;
  AuthorizeChannelInput: AuthorizeChannelInput;
  AuthorizeChannelPayload: ResolverTypeWrapper<AuthorizeChannelPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CallEventData: CallEventData;
  CallEventInput: CallEventInput;
  CallEventPayload: ResolverTypeWrapper<CallEventPayload>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<UserModel>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthenticateUserData: AuthenticateUserData;
  AuthenticateUserInput: AuthenticateUserInput;
  AuthenticateUserPayload: AuthenticateUserPayload;
  AuthorizeChannelData: AuthorizeChannelData;
  AuthorizeChannelInput: AuthorizeChannelInput;
  AuthorizeChannelPayload: AuthorizeChannelPayload;
  Boolean: Scalars['Boolean']['output'];
  CallEventData: CallEventData;
  CallEventInput: CallEventInput;
  CallEventPayload: CallEventPayload;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  User: UserModel;
}>;

export type AuthenticateUserDataResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthenticateUserData'] = ResolversParentTypes['AuthenticateUserData'],
> = ResolversObject<{
  auth?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userData?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthenticateUserPayloadResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthenticateUserPayload'] = ResolversParentTypes['AuthenticateUserPayload'],
> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['AuthenticateUserData']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthorizeChannelDataResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthorizeChannelData'] = ResolversParentTypes['AuthorizeChannelData'],
> = ResolversObject<{
  auth?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  channelData?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sharedSecret?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthorizeChannelPayloadResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthorizeChannelPayload'] = ResolversParentTypes['AuthorizeChannelPayload'],
> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['AuthorizeChannelData']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CallEventPayloadResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CallEventPayload'] = ResolversParentTypes['CallEventPayload'],
> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = ResolversObject<{
  authenticateUser?: Resolver<
    ResolversTypes['AuthenticateUserPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationAuthenticateUserArgs, 'input'>
  >;
  authorizeChannel?: Resolver<
    ResolversTypes['AuthorizeChannelPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationAuthorizeChannelArgs, 'input'>
  >;
  callEvent?: Resolver<
    ResolversTypes['CallEventPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationCallEventArgs, 'input'>
  >;
}>;

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = ResolversObject<{
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'id'>
  >;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = ResolversObject<{
  age?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  AuthenticateUserData?: AuthenticateUserDataResolvers<ContextType>;
  AuthenticateUserPayload?: AuthenticateUserPayloadResolvers<ContextType>;
  AuthorizeChannelData?: AuthorizeChannelDataResolvers<ContextType>;
  AuthorizeChannelPayload?: AuthorizeChannelPayloadResolvers<ContextType>;
  CallEventPayload?: CallEventPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;
