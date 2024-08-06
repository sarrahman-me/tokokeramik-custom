export interface IMetadata {
  page: number;
  limit: number;
  total_data: number;
  total_pages: number;
}

interface IErrorResponse {
  code: number;
  message: string;
  detail?: string;
  field?: Record<string, string>;
  help?: string;
}

export interface IResponseApi {
  data: any;
  metadata: IMetadata;
  error?: IErrorResponse;
}
