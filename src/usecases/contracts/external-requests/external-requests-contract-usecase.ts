export type ExternalResponseType = Promise<any>;
export type ExternalRequest = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: any;
  body?: any;
};

export interface ExtenalRequestContractUsecase {
  execute(data: any): ExternalResponseType;
}

export interface ApiExternalRequestContractUsecase {
  request(data: ExternalRequest): ExternalResponseType;
}
