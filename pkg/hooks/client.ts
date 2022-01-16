import { getSdk, Sdk } from "pkg/graphql/sdk";
import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";

export class GraphqlError extends Error {
  public readonly errors: string[];
  constructor(errors: string[]) {
    super(`Errors during graphql: ${JSON.stringify(errors, null, 2)}`);
    this.name = "GraphqlError";
    this.errors = errors;
  }
}

/**
 * Create a graphql client
 */
export function client(token?: string): Sdk {
  async function requester<R, V>(doc: DocumentNode, vars?: V): Promise<R> {
    const graphqlEndpoint = process.env["NEXT_PUBLIC_GRAPHQL_ENDPOINT"];
    if (!graphqlEndpoint) {
      throw new Error(`NEXT_PUBLIC_GRAPHLQ_ENDPOINT is not defined`);
    }
    const graphqlClient = new GraphQLClient(graphqlEndpoint);
    if (token) {
      graphqlClient.setHeader("Authorization", `Bearer ${token}`);
    }
    const res = await graphqlClient.request(doc, vars);

    if (res.errors) {
      throw new GraphqlError(
        res.errors.map((e: { message: string }) => e.message)
      );
    }

    return res;
  }

  return getSdk(requester);
}
