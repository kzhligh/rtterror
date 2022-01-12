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
    service_ids?: string[];
}

export interface IEmployeeDto {
    first_name: string;
    last_name: string;
    dob: string;
    sin: string;
    address: string;
    postal_code: string;
    phone: string;
    email: string;
    title: string;
    service_ids?: string[];
}