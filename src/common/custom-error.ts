export class IError {
  message: string[];
  extensions: Record<string, any>;
  constructor(err: any) {
    // class-validator
    // this.code = err?.extensions?.code;
    this.message = err?.message;
    this.extensions = err?.extensions;
    delete this.extensions?.exception?.stacktrace;
  }
}
