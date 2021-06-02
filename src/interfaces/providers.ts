import { AxiosInstance } from 'axios';

export interface IProviderArguments {
  type: string;
  value: string | any;
  provider: AxiosInstance;
}
