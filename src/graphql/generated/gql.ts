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
    "\n  query TestQuery($id: ID!) {\n    user(id: $id) {\n      id\n    }\n  }\n": types.TestQueryDocument,
    "\n  mutation AuthenticateUser($input: AuthenticateUserInput!) {\n    authenticateUser(input: $input) {\n      data {\n        auth\n        userData\n      }\n    }\n  }\n": types.AuthenticateUserDocument,
    "\n  mutation AuthorizeChannel($input: AuthorizeChannelInput!) {\n    authorizeChannel(input: $input) {\n      data {\n        auth\n        channelData\n        sharedSecret\n      }\n    }\n  }\n": types.AuthorizeChannelDocument,
    "\n  mutation CallEvent($input: CallEventInput!) {\n    callEvent(input: $input) {\n      success\n      message\n    }\n  }\n": types.CallEventDocument,
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
export function graphql(source: "\n  query TestQuery($id: ID!) {\n    user(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  query TestQuery($id: ID!) {\n    user(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AuthenticateUser($input: AuthenticateUserInput!) {\n    authenticateUser(input: $input) {\n      data {\n        auth\n        userData\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AuthenticateUser($input: AuthenticateUserInput!) {\n    authenticateUser(input: $input) {\n      data {\n        auth\n        userData\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AuthorizeChannel($input: AuthorizeChannelInput!) {\n    authorizeChannel(input: $input) {\n      data {\n        auth\n        channelData\n        sharedSecret\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AuthorizeChannel($input: AuthorizeChannelInput!) {\n    authorizeChannel(input: $input) {\n      data {\n        auth\n        channelData\n        sharedSecret\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CallEvent($input: CallEventInput!) {\n    callEvent(input: $input) {\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation CallEvent($input: CallEventInput!) {\n    callEvent(input: $input) {\n      success\n      message\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;