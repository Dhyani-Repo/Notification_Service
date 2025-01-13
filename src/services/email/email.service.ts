import {  IOrderStatusEmailData } from "src/templates/template.interface"
import { EmailClient } from "../../../src/config/nodemailer.config"
import { ORDER_STATUS_EMAIL_MAPPING } from "../../../src/templates/orderStatus.template"
import ejs from "ejs"
import { SendGridConfig } from "../../../src/config/sendgrid.config"
import { PrismaClient } from "@prisma/client"
import {  encryptByCrypto } from "../../../shared/crypto"
import AppError from "../../../src/utils/appError.utils"
import { generateToken } from "../../../shared/jwt"
const TEAM_NAME = process.env.TEAM || "Saleor"

export default class EmailService {
  private emailClient
  private sendgridClient
  readonly prisma
  constructor() {
    this.emailClient = EmailClient
    this.sendgridClient = SendGridConfig.createInstance()
    this.prisma = new PrismaClient()
  }
  
  sendOrderStatusUpdateEmail = async (status: string, data: IOrderStatusEmailData) => {
    if (status in ORDER_STATUS_EMAIL_MAPPING) {
      data.team = TEAM_NAME
      const { body, subject, title } = ORDER_STATUS_EMAIL_MAPPING[status.toLowerCase()](data)
      const templateData = {
        email: data.email,
        subject: subject,
        body: body,
        title: title,
        customerName: data.customerName,
        arrivingDate: data.arrivingDate,
      }

      let templatePath = `${process.cwd()}/src/templates/emailBase.template.ejs`
      const htmlTemplate = await ejs.renderFile(templatePath, { data: templateData })

      const emailData = {
        email: data.email,
        subject: subject,
        body: body,
      }
      await this.emailClient.sendEmail(emailData, htmlTemplate)
    }
  }
  
  sendgridOrderStatusUpdateEmail = async (status: string, data: IOrderStatusEmailData) => {
    if (status in ORDER_STATUS_EMAIL_MAPPING) {
      data.team = TEAM_NAME
      const { body, subject, title } = ORDER_STATUS_EMAIL_MAPPING[status.toLowerCase()](data)
      const templateData = {
        email: data.email,
        subject: subject,
        body: body,
        title: title,
        customerName: data.customerName,
        arrivingDate: data.arrivingDate,
      }
      let templatePath = `${process.cwd()}/src/templates/emailBase.template.ejs`
      const htmlTemplate = await ejs.renderFile(templatePath, { data: templateData })
      const emailData = {
        email: data.email,
        subject: subject,
        body: body,
      }
      await this.sendgridClient.sendEmail(emailData, htmlTemplate)
    }
  }
  sendEmailNotifiaction = async (data: any, htmlTemplate: string) => {
    await this.emailClient.sendEmail(data, htmlTemplate)
  }
  
  sendgridEmailNotifiaction = async (emailData: any) => {
    const emailTemplate:any = await this.prisma.app_emailTemplates.findFirst({
      where:{
        selected:true
      }
    })
    const htmlContent = await ejs.render(emailTemplate.template , { emailData })
    await this.sendgridClient.sendEmail(emailData,htmlContent)
  }
  storeAuthToken = async (data: any) => {
    if (!data?.token || !data?.domain)  {
      throw new Error("Domain, auth token, or token does not exist.");
    }
    const encAuthToken = encryptByCrypto(data?.token as string)
    const clientInfo = await this.prisma?.app_auth?.findFirst({
      where:{
        domain:data?.domain
      }
    })
    let newUser:any
    if(clientInfo){
       newUser = await this.prisma.app_auth.update({
        where:{
          id:clientInfo?.id
        },
        data: {
          token: encAuthToken,
          updated_at:new Date()
        },
      });
    }else{
    newUser = await this.prisma.app_auth.create({
        data: {
          token: encAuthToken,
          domain: data?.domain as string,
          created_at:new Date(),
          updated_at:new Date()
        },
      });
    }
      return newUser
    }
 
  storeOtp = async (client_id: string):Promise<any> => {
    const random6DigitNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const data1 =  await this.prisma.app_otp.create({
      data:{
        otp:random6DigitNumber, 
        client_id:client_id
      }
    })
    return data1
  }
  verifyOtp = async (client_id: string,otp:number):Promise<any> => {
    const newDate = new Date();  
    const data1 =  await this.prisma.app_otp.findMany({
      where:{
        client_id: client_id
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    const otpCreationDate = new Date(data1[0].created_at);  
    const differenceInMilliseconds = newDate.getTime() - otpCreationDate.getTime();
    if (differenceInMilliseconds > 30000) {
      throw new AppError({Status:"OTP has expired"});
    }
    if(data1[0]?.otp == otp){
      const tokens = generateToken({client_id})
      return {
        data :true,
        tokens
      }
    }
    return false
  }
  generateRefreshedTokens = async (client_id: string,otp:number):Promise<any> => { 
    const data1 =  await this.prisma.app_otp.findMany({
      where:{
        client_id: client_id
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    if(data1[0]?.otp == otp){
      const tokens = generateToken({client_id})
      console.log("🚀 ~ EmailController ~ otpVerify= ~ accessToken:", tokens)
      return {
        data :true,
        tokens
      }
    }
    return false
  }
}
