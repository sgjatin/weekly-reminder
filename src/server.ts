import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes";
import { CalculateEmployeeRecords } from "./util/employee";

class App {
  public app: express.Application = express();
  private router: Routes = new Routes();
  private calculateEmployeeRecords = new CalculateEmployeeRecords();

  constructor() {
    this.app = express(); // init the application
    this.configuration();
    this.routes();
    this.router.routes(this.app);
  }
  public async configuration(): Promise<void> {
    this.app.set("port", process.env.PORT || 8080);
    this.app.use(express.json());
  }

  /**
   * Method to configure the routes
   */
  public async routes(): Promise<void> {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello world!");
    });

    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }
  /**
   * Used to start the server
   */
  public async start(): Promise<void> {
    this.app.listen(this.app.get("port"), () => {
      this.calculateEmployeeRecords.calculateEmployeeData();

      // console.log(`Server is listening ${this.app.get("port")} port.`);
    });
  }
}

const server = new App(); // Create server instance
server.start(); // Execute the server
export default new App().app;
