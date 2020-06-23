export interface ApiResponse <T> {
  status: string;
  message: string;
  result: T;
}

export interface ExchangeResponse {
  ethusd: number;
}
