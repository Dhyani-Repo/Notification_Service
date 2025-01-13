import { createTransport, Transporter } from "nodemailer"
import { logger } from "../utils/logger.utils"
import { IBasicEmailData } from "../services/email/email.interface"

/**
 * EmailSender class provides functionality to send emails using Nodemailer.
 * It sets up the email transporter with the provided SMTP configuration and
 * handles sending emails with dynamic content.
 */
class EmailSender {
  transporter: Transporter

  /**
   * Initializes an instance of the EmailSender class.
   * Sets up the Nodemailer transporter with SMTP configuration retrieved from environment variables.
   */
  constructor() {
    this.transporter = createTransport({
      host: process.env.SMTP_SERVER,
      port: Number(process.env.SMTP_PORT_TLS),
      secure: true,
      tls: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      logger: true,
      debug: true,
      connectionTimeout: 60000, // 60 seconds
      socketTimeout: 60000, // 60 seconds
    })
  }

  /**
   * Sends an email using the configured transporter.
   *
   * This function constructs the email options, including sender, recipient, subject,
   * plain text body, and HTML content. It logs any errors encountered during the process.
   *
   * @param {any} data - The email data, including recipient address, subject, and body.
   *                     Expected structure:
   *                     {
   *                       email: string;      // Recipient email address
   *                       subject: string;    // Email subject
   *                       body: string;       // Plain text email body
   *                     }
   * @param {string} htmlTemplate - The HTML template for the email body.
   *
   * @returns {Promise<void>} Resolves when the email is sent successfully, or logs an error if it fails.
   */
  sendEmail = async (data: IBasicEmailData, htmlTemplate: string) => {
    try {
      const options = {
        from: process.env.EMAIL_SENDER,
        to: [data.email],
        subject: data.subject,
        text: data.body,
        html: htmlTemplate,
      }

      return this.transporter.sendMail(options, (err: any) => {
        if (err)
          logger.error(
            `Error while sending order email, error obj: ${JSON.stringify(err)} error stack: ${JSON.stringify(
              err.stack,
            )}`,
          )
      })
    } catch (error: any) {
      logger.error(`Error while sending email: ${error}`)
    }
  }
}

// Exporting a singleton instance of EmailSender
export const EmailClient = new EmailSender()
