export class DiagnosticError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'DiagnosticError';
    this.code = code;
  }
}

export const fail = (code, message) => {
  throw new DiagnosticError(code, message);
};
