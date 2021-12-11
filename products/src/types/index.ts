export interface ErrorResult {
  message: string;
  field?: string;
}

export interface ErrorResponse {
  errors: ErrorResult[];
}
