/**
 * Interface representing the data required for sending an email.
 */
export interface IBasicEmailData {
  email: string // Recipient email address
  subject: string // Subject of the email
  body: string // Plain text content of the email
}


export interface EmailData {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}