import IAll from "src/interfaces/IAll";

export interface IAppointmentJson extends IAll {
  id: string;
  rmq_id?: string;
  pro_rmq_id?: string;
  client_id: number;
  datetime: Date;
  duration: number;
  repeat: boolean;
  cycle_start?: Date;
  cycle_end?: Date;
  status: string;
  feedback?: string;
  notes?: string;
  employee_ids?: string[];     // for updating
  service_ids?: string[];      //for updating
}

interface status {
  name: string;
  by: string;
  at: Date;
}

export interface IAppointmentObj extends IAll {
  id: string;
  rmq_id: string;
  pro_rmq_id?: string;
  client_id: number;
  datetime: Date;
  duration: number;
  repeat: boolean;
  cycle_start?: Date;
  cycle_end?: Date;
  status: [status];
  feedback?: string;
  notes?: string;
}

export interface IAppointmentDto {
  rmq_id: string;
  client_id: number;
  employee_ids: string[];
  service_ids: string[];
  pro_rmq_id?: string;
  datetime: Date;
  duration: number;
  repeat: boolean;
  cycle_start?: Date;
  cycle_end?: Date;
  status: [status];
  feedback?: string;
  notes?: string;
}