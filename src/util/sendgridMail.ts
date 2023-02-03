import { Service } from "typedi";
import {
  SENDGRID_API_ENDPOINT,
  SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL,
} from "../config/secret";
import axios, { AxiosError } from "axios";
@Service()
export class SendgridMail {
  public async sendEmail(
    email: string,
    data: unknown,
    templateID: string
  ): Promise<void> {
    try {
      const templateData = JSON.stringify({
        from: {
          email: SENDGRID_FROM_EMAIL,
        },
        personalizations: [
          {
            to: [
              {
                email,
              },
            ],
            dynamic_template_data: data,
          },
        ],
        template_id: templateID,
      });
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${SENDGRID_API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      await axios
        .post(`${SENDGRID_API_ENDPOINT}`, templateData, axiosConfig)
        .then(
          (response) => {
            if (response.status === 200 || response.status === 202) {
              console.log("email sent successfully!");
            }
          },
          (error) => {
            console.log("errrr", error);
          }
        );
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        // logger.info(err.response.status);
      }
    }
  }
}
