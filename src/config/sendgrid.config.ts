import sgMail from '@sendgrid/mail';  // Import SendGrid mail SDK
import { EmailData } from '../../src/services/email/email.interface';
import { logger } from '../../shared/logger';
export class SendGridConfig {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY as string;
    sgMail.setApiKey(this.apiKey);  
  }
  public static createInstance = () => {
    return new SendGridConfig()
  }
  
  public async sendEmail(emailData: any, htmlTemplate:string): Promise<void> {
      try {
        const data:EmailData = {
            to:emailData?.email as string,
            from:process.env.SENDER_EMAIL as string,
            subject: emailData?.subject as string,
            text: emailData?.text as string,
            html: htmlTemplate,
        } 
        await sgMail.send(data);
        logger.info("Email Sent Successfully")
    } catch (error: any) {
      console.error('Error sending email:', error);
      if (error.response) {
        console.error('SendGrid error response:', error.response.body);
      }
    }
  }
}




