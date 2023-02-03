// const fs = require("fs");
import employeeJson from "../config/employee.json";
import { SendgridMail } from "./sendgridMail";
export class CalculateEmployeeRecords {
  public async calculateEmployeeData(): Promise<any> {
    try {
      const sendgridMail = new SendgridMail();
      const data = employeeJson as any;
      const employeesWithOneOrNoAttendance = data.employees.filter(
        (employee: any) => employee.attendance.length <= 1
      );
      const employeeEmails = employeesWithOneOrNoAttendance.map(
        (employee: any) => employee.email
      );

      sendgridMail.sendEmail(
        employeeEmails.join(","),
        {},
        "d-babef0e5f86c42d2a1159e37810bc04a"
      );

      console.log(employeeEmails);
    } catch (error) {
      console.log(error);
    }
  }
}
