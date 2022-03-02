import IAll from "src/interfaces/IAll";

export interface IAppointmentJson extends IAll {
  id: string;
  rmq_id?: string;
  client_id: string;
  pro_rmq_id: string;
  datetime: Date;
  repeat: boolean;
  cycle_start?: Date;
  cycle_end?: Date;
  status: string;
  feedback?: string;
  notes?: string;
  payments: string;
  refunds: string;
}

interface status {
  name: string;
  by: string;
  at: Date;
}

export interface IAppointmentObj extends IAll {
  id: string;
  rmq_id: string;
  client_id: string;
  pro_rmq_id: string;
  datetime: Date;
  repeat: boolean;
  cycle_start?: Date;
  cycle_end?: Date;
  status: [status];
  feedback?: string;
  notes?: string;
}

export interface IAppointmentDto {
  rmq_id: string;
  client_id: string;
  pro_rmq_id: string;
  datetime: Date;
  repeat: boolean;
  cycle_start?: Date;
  cycle_end?: Date;
  status: [status];
  feedback?: string;
  notes?: string;
}