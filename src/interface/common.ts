import { IPagination } from './pagination';

export interface ICommonResponse<T, K> {
  object: K;
  data: T | null;
  message?: string;
  pagination?: IPagination;
}
