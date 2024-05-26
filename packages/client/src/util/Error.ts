export class GraphQLError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "GraphQLError"
  }
}

export class UnexpectedError extends Error {
  constructor() {
    super("Unexpected error")
    this.name = "UnexpectedError"
  }
}
