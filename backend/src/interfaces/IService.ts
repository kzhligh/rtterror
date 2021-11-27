import IAll from "./IAll";

export interface IService extends IAll{
  id: string;
  service_code: string;
  name: string;
  description?: string;
  treatment_type?: string;
  duration: number;
  price: string;
  barcode?: string;
  sms_description?: string;
  blocked: boolean;
  hidden: boolean;
}

export interface IServiceDto {
  service_code: string;
  name: string;
  description?: string;
  treatment_type?: string;
  duration: number;
  price: string;
  barcode?: string;
  sms_description?: string;
  blocked?: boolean;
  hidden?: boolean;
}
