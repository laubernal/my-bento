export enum OPERATORS {
  equal = 'equals',
  gt = 'gt',
  lt = 'lt',
  gte = 'gte',
  lte = 'lte',
  ne = 'notIn',
  and = 'AND',
  or = 'OR',
  like = 'contains',
  order = 'orderBy',
  in = 'in',
}

export const ADMIN_ROLE = 'admin';

export enum Roles {
  ADMIN = 'admin',
}

export interface HttpMethod {
  POST: 'POST';
  GET: 'GET';
}

export enum ErrorCode {
  DATA_FORMAT = 0,
  NOT_FOUND = 1,
  EXTERNAL_PROVIDER_ERROR = 2,
  APPLICATION_ERROR = 3,
  AUTHORIZATION_ERROR = 4,
}

export type ErrorSerialization = {
  errorType: string;
  errorCode: number;
  occurredOn: Date;
  message: string;
  stack?: string[];
};
