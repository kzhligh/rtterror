import IAll from "src/interfaces/IAll";

export interface IAppointmentJson extends IAll {
    id: string;
    rmq_id: string;
    employee_id: string;
    client_id: string;
    pro_rmq_id: string;
    service_id: string;
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

interface transaction {
    amount: string;
    method: string;
    at: Date;
}

export interface IAppointmentObj extends IAll {
    id: string;
    rmq_id: string;
    employee_id: string;
    client_id: string;
    pro_rmq_id: string;
    service_id: string;
    datetime: Date;
    repeat: boolean;
    cycle_start?: Date;
    cycle_end?: Date;
    status: [status];
    feedback?: string;
    notes?: string;
    payments?: [transaction];
    refunds?: [transaction];
}

export interface IAppointmentDto {
    rmq_id: string;
    employee_id: string;
    client_id: string;
    pro_rmq_id: string;
    service_id: string;
    datetime: Date;
    repeat: boolean;
    cycle_start?: Date;
    cycle_end?: Date;
    status: [status];
    feedback?: string;
    notes?: string;
    payments?: [transaction];
    refunds?: [transaction];
}