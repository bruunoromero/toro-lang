declare module "aggregate-error" {
  export default class AggregateError extends Error {
    constructor(errors: any[]);
  }
}
