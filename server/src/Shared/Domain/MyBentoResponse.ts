export type ResponseMetadata = {
    success: boolean;
    error?: string | null;
    totalCount?: number;
  };
  
  export class MyBentoResponse<T> {
    constructor(
      public readonly data: T | T[],
      public readonly metadata: ResponseMetadata,
    ) {}
  }