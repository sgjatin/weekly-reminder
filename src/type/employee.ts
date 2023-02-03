export interface Employee {
  employees: {
    id: number;
    name: string;
    email: string;
    designation: string;
    department: string;
    employee_code: string;
    date_of_joining: string;
    attendance: {
      id: number;
      employee_id: string;
      clock_in_time: string;
      clock_out_time: string;
    }[];
  }[];
}
