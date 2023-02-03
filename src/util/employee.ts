// const fs = require("fs");
import employeeJson from "../config/employee.json";

export class CalculateEmployeeRecords {
  public async calculateEmployeeData(): Promise<any> {
    try {
      const data = employeeJson;

      data.data.forEach((emp) => {
        // let hasKey = emp.attributes..hasOwnProperty("name");
      });

      console.log("daataa", data);
    } catch (error) {
      console.log(error);
    }
  }
}
