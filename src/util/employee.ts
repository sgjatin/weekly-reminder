import { Employee } from "src/type/employee";
import employeeJson from "../config/employee.json";
import { SendgridMail } from "./sendgridMail";
export class CalculateEmployeeRecords {
  public async calculateEmployeeData(): Promise<void> {
    try {
      const sendgridMail = new SendgridMail();
      const data = employeeJson as Employee;
      const employeesWithOneOrNoAttendance = data.employees.filter(
        (employee: any) => employee.attendance.length <= 1
      );
      const employeeEmails = employeesWithOneOrNoAttendance.map(
        (employee: any) => employee.email
      );

      employeeEmails.forEach((email: string) => {
        sendgridMail.sendEmail(email, {}, "");
      });

      console.log(employeeEmails);
    } catch (error) {
      console.log(error);
    }
  }
}
