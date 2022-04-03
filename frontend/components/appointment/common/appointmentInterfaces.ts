export interface ISchedule {
  id: string;
  calendarId: string;
  title: string;
  category: 'time';
  start: Date;
  end: Date;
  attendees: any[];
  raw?:
    | {
        customer: string;
        duration: string | number;
        feedback: string;
        notes: string;
        status: any[];
        services: any[];
        therapists: any[];
      }
    | any;
}

export interface ICalendar {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  dragBgColor: string;
  borderColor: string;
  visible: boolean;
}

export interface IStatus {
  name: string;
  by: string;
  at: string;
}

export interface IAppointmentResponse {
  id: string;
  rmq_id?: string;
  client_id: string;
  pro_rmq_id?: string;
  datetime: Date;
  duration: number;
  repeat: boolean;
  cycle_start?: Date;
  cycle_end?: Date;
  status: IStatus[];
  feedback: string;
  notes: string;
  employees?: any[];
  services?: any[];
  employee_ids?: string[] | number[];
  service_ids?: string[];
}
