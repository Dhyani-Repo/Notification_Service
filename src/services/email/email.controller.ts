import { Request, Response } from "express"
import { ErrorResponse, SuccessResponse } from "../../utils/response.utils"
import EmailService from "./email.service"
import { MANIFEST_DATA } from "./email.constants"

export class EmailController {
  private emailProcessor: EmailService
 
  private constructor() {
    this.emailProcessor = new EmailService()
  }
 
  public static createInstance() {
    return new EmailController()
  }


  sendOrderStatusUpdate = async (req: Request, res: Response) => {
    const { status, data } = req.body
    try {
      await this.emailProcessor.sendOrderStatusUpdateEmail(status, data)
      SuccessResponse(req, res, {
        message: "Email sent successfully",
      })
    } catch (err) {
      ErrorResponse(req, res, err)
    }
  }
  sendgridOrderStatusUpdate = async (req: Request, res: Response) => {
    const { status, data } = req.body
    try {
      await this.emailProcessor.sendgridOrderStatusUpdateEmail(status, data)
      SuccessResponse(req, res, {
        message: "Email sent successfully",
      })
    } catch (err) {
      ErrorResponse(req, res, err)
    }
  }


  sendEmailNotification = async (req: Request, res: Response) => {
    const { htmlTemplate, data } = req.body
    try {
      await this.emailProcessor.sendEmailNotifiaction(data, htmlTemplate)
      SuccessResponse(req, res, {
        message: "Email sent successfully",
      })
    } catch (err) {
      ErrorResponse(req, res, err)
    }
  }
  
  sendgridNotification = async (req: Request, res: Response) => {
    const {data} = req?.body
    try {
      await this.emailProcessor.sendgridEmailNotifiaction(data)
      SuccessResponse(req, res, {
        message: "Email sent successfully",
      })
    } catch (err) {
      ErrorResponse(req, res, err)
    }
  }
  /**
   * Fetches the application manifest data and sends it in the response to admin for registration.
   * @param {Request} req The Express request object.
   * @param {Response} res The Express response object.
   * @returns Sends the manifest data as a response for admin side registration.
   */
  appMainfest = async (req: Request, res: Response) => {
    SuccessResponse(req, res, {
      ...MANIFEST_DATA,
    })
  }
  
  token_target = async (req: Request, res: Response) => {
    try{
      const domain = req.headers["saleor-domain"] || "xyz"
      const token = req?.body?.auth_token
      const payload = {
        domain,
        token
      }
       await this.emailProcessor.storeAuthToken(payload)
      SuccessResponse(req, res, {
      ...MANIFEST_DATA
      })
    }catch(err){
      ErrorResponse(req,res,err)
    }
  }
  register = async (req: Request, res: Response) => {
      try{
        const client_id = req.body?.client_id
        if(!client_id){
          throw new Error("Client Id Not Available")
        }
        const data = await this.emailProcessor.storeOtp(client_id as string)
        console.log(data)
        SuccessResponse(req, res, {
        status: "Verification Success",
        ...data
      })
      }catch(err){
        ErrorResponse(req,res,err)
      }
  }
  otpVerify = async (req: Request, res: Response) => {
    try{
      const client_id = req.body?.client_id as string
      const {data,tokens} = await this.emailProcessor.verifyOtp(client_id,Number(req?.body?.otp))
      if(data){
        SuccessResponse(req, res, {
          status: "Verification Success",
          access_token :tokens?.access_token,
          refresh_token:tokens?.refresh_token
        })
      }else{
        ErrorResponse(req,res,{varification:"Failed"})
      }
    }catch(err){
      ErrorResponse(req,res,err)
    }
  }
  refreshToken = async (req: Request, res: Response) => {
    try{
      const client_id = req.body?.client_id as string
      const {data,tokens} = await this.emailProcessor.generateRefreshedTokens(client_id,Number(req?.body?.otp))
      if(data){
        SuccessResponse(req, res, {
          access_token :tokens?.access_token,
          refresh_token:tokens?.refresh_token
        })
      }else{
        ErrorResponse(req,res,{varification:"Failed"})
      }
    }catch(err){
      ErrorResponse(req,res,err)
    }
  }
}
  