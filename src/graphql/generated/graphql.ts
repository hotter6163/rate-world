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
  data: Maybe<AuthenticateUserData>;
  status: Scalars['Int']['output'];
};

export type AuthorizeChannelData = {
  __typename?: 'AuthorizeChannelData';
  auth: Scalars['String']['output'];
  channelData: Maybe<Scalars['String']['output']>;
  sharedSecret: Maybe<Scalars['String']['output']>;
};

export type AuthorizeChannelInput = {
  channelName: Scalars['String']['input'];
  socketId: Scalars['String']['input'];
};

export type AuthorizeChannelPayload = {
  __typename?: 'AuthorizeChannelPayload';
  data: Maybe<AuthorizeChannelData>;
  status: Scalars['Int']['output'];
};

export type CallEventData = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CallEventInput = {
  channel: Scalars['String']['input'];
  data: InputMaybe<Array<CallEventData>>;
  event: Scalars['String']['input'];
  socketId: InputMaybe<Scalars['String']['input']>;
};

export type CallEventPayload = {
  __typename?: 'CallEventPayload';
  message: Maybe<Scalars['String']['output']>;
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
  user: Maybe<User>;
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

export type TestQueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TestQueryQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string } | null };

export type AuthenticateUserMutationVariables = Exact<{
  input: AuthenticateUserInput;
}>;


export type AuthenticateUserMutation = { __typename?: 'Mutation', authenticateUser: { __typename?: 'AuthenticateUserPayload', data: { __typename?: 'AuthenticateUserData', auth: string, userData: string } | null } };

export type AuthorizeChannelMutationVariables = Exact<{
  input: AuthorizeChannelInput;
}>;


export type AuthorizeChannelMutation = { __typename?: 'Mutation', authorizeChannel: { __typename?: 'AuthorizeChannelPayload', data: { __typename?: 'AuthorizeChannelData', auth: string, channelData: string | null, sharedSecret: string | null } | null } };

export type CallEventMutationVariables = Exact<{
  input: CallEventInput;
}>;


export type CallEventMutation = { __typename?: 'Mutation', callEvent: { __typename?: 'CallEventPayload', success: boolean, message: string | null } };


export const TestQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<TestQueryQuery, TestQueryQueryVariables>;
export const AuthenticateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthenticateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthenticateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"}},{"kind":"Field","name":{"kind":"Name","value":"userData"}}]}}]}}]}}]} as unknown as DocumentNode<AuthenticateUserMutation, AuthenticateUserMutationVariables>;
export const AuthorizeChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthorizeChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorizeChannelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorizeChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"}},{"kind":"Field","name":{"kind":"Name","value":"channelData"}},{"kind":"Field","name":{"kind":"Name","value":"sharedSecret"}}]}}]}}]}}]} as unknown as DocumentNode<AuthorizeChannelMutation, AuthorizeChannelMutationVariables>;
export const CallEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CallEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CallEventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"callEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CallEventMutation, CallEventMutationVariables>;