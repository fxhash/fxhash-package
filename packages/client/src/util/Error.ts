export class GraphQLError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "GraphQLError"
  }
}
