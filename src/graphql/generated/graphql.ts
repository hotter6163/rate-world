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
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Data for authenticating a user */
export type AuthenticateUserData = {
  __typename?: 'AuthenticateUserData';
  auth: Scalars['String']['output'];
  userData: Scalars['String']['output'];
};

/** Input for authenticating a user */
export type AuthenticateUserInput = {
  socketId: Scalars['String']['input'];
};

/** Payload for authenticating a user */
export type AuthenticateUserPayload = {
  __typename?: 'AuthenticateUserPayload';
  data: Maybe<AuthenticateUserData>;
  status: Scalars['Int']['output'];
};

/** Data for authorizing a channel */
export type AuthorizeChannelData = {
  __typename?: 'AuthorizeChannelData';
  auth: Scalars['String']['output'];
  channelData: Maybe<Scalars['String']['output']>;
  sharedSecret: Maybe<Scalars['String']['output']>;
};

/** Input for authorizing a channel */
export type AuthorizeChannelInput = {
  channelName: Scalars['String']['input'];
  socketId: Scalars['String']['input'];
};

/** Payload for authorizing a channel */
export type AuthorizeChannelPayload = {
  __typename?: 'AuthorizeChannelPayload';
  data: Maybe<AuthorizeChannelData>;
  status: Scalars['Int']['output'];
};

/** Input for creating a matching */
export type CreateMatchingInput = {
  channelName: Scalars['String']['input'];
};

/** Payload for creating a matching */
export type CreateMatchingPayload = {
  __typename?: 'CreateMatchingPayload';
  result: Maybe<CreateMatchingResult>;
  status: Scalars['Int']['output'];
};

/** Result for creating a matching */
export type CreateMatchingResult = {
  type: CreateMatchingResultType;
};

export enum CreateMatchingResultType {
  Retry = 'RETRY',
  Success = 'SUCCESS',
  Timeout = 'TIMEOUT'
}

/** Result for creating a matching */
export type CreateMatchingRetryResult = CreateMatchingResult & {
  __typename?: 'CreateMatchingRetryResult';
  type: CreateMatchingResultType;
};

/** Result for creating a matching */
export type CreateMatchingSuccessResult = CreateMatchingResult & {
  __typename?: 'CreateMatchingSuccessResult';
  roomId: Scalars['String']['output'];
  type: CreateMatchingResultType;
};

/** Result for creating a matching */
export type CreateMatchingTimeoutResult = CreateMatchingResult & {
  __typename?: 'CreateMatchingTimeoutResult';
  type: CreateMatchingResultType;
};

/** Long necks, cool patterns, taller than you. */
export type Giraffe = {
  __typename?: 'Giraffe';
  age: Scalars['Int']['output'];
  height: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUser: AuthenticateUserPayload;
  authorizeChannel: AuthorizeChannelPayload;
  createMatching: CreateMatchingPayload;
};


export type MutationAuthenticateUserArgs = {
  input: AuthenticateUserInput;
};


export type MutationAuthorizeChannelArgs = {
  input: AuthorizeChannelInput;
};


export type MutationCreateMatchingArgs = {
  input: CreateMatchingInput;
};

export type Query = {
  __typename?: 'Query';
  giraffe: Giraffe;
};

export type AuthenticateUserMutationVariables = Exact<{
  input: AuthenticateUserInput;
}>;


export type AuthenticateUserMutation = { __typename?: 'Mutation', authenticateUser: { __typename?: 'AuthenticateUserPayload', data: { __typename?: 'AuthenticateUserData', auth: string, userData: string } | null } };

export type AuthorizeChannelMutationVariables = Exact<{
  input: AuthorizeChannelInput;
}>;


export type AuthorizeChannelMutation = { __typename?: 'Mutation', authorizeChannel: { __typename?: 'AuthorizeChannelPayload', data: { __typename?: 'AuthorizeChannelData', auth: string, channelData: string | null, sharedSecret: string | null } | null } };

export type CreateMatchingMutationVariables = Exact<{
  input: CreateMatchingInput;
}>;


export type CreateMatchingMutation = { __typename?: 'Mutation', createMatching: { __typename?: 'CreateMatchingPayload', result: { __typename?: 'CreateMatchingRetryResult', type: CreateMatchingResultType } | { __typename?: 'CreateMatchingSuccessResult', roomId: string, type: CreateMatchingResultType } | { __typename?: 'CreateMatchingTimeoutResult', type: CreateMatchingResultType } | null } };


export const AuthenticateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthenticateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthenticateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"}},{"kind":"Field","name":{"kind":"Name","value":"userData"}}]}}]}}]}}]} as unknown as DocumentNode<AuthenticateUserMutation, AuthenticateUserMutationVariables>;
export const AuthorizeChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthorizeChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorizeChannelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorizeChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"}},{"kind":"Field","name":{"kind":"Name","value":"channelData"}},{"kind":"Field","name":{"kind":"Name","value":"sharedSecret"}}]}}]}}]}}]} as unknown as DocumentNode<AuthorizeChannelMutation, AuthorizeChannelMutationVariables>;
export const CreateMatchingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMatching"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMatchingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMatching"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMatchingSuccessResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateMatchingMutation, CreateMatchingMutationVariables>;