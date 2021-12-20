import IAll from './IAll';
import { IService } from './IService';

export interface ICombo extends IAll {
  id: string;
  service_code: string;
  name: string;
  total_duration: number;
  total_price: string;
  description?: string;
  barcode?: string;
  sms_description?: string;
  blocked: boolean;
  services?: IService[];
  service_ids?: string[]; // for updating a combo services
}

export interface IComboDto {
  service_code: string;
  name: string;
  total_duration: number;
  total_price: string;
  service_ids: string[];
}
