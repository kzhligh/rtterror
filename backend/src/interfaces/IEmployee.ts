import IAll from './IAll';

export interface IEmployee extends IAll {
    id: string;
    first_name: string;
    last_name: string;
    gender?: string;
    dob: string;
    sin: string;
    address: string;
    postal_code: string;
    phone: string;
    email: string;
    title: string;      // therapist or doctor
    start_date: Date;
    end_date?: Date;
    hidden: boolean;
    service_ids?: string[];
}

export interface IEmployeeDto {
    id: string;
    first_name: string;
    last_name: string;
    dob: string;
    sin: string;
    address: string;
    postal_code: string;
    phone: string;
    email: string;
    title: string;
    start_date: Date;
    end_date?: Date;
    hidden: boolean;
    service_ids?: string[];
}