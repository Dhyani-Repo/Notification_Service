import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../src/utils/response.utils";
import { IApiCreds, IUser } from "./app.interface";
import { createCreds, createTemplates, createUser, getApiData, getApiTemplate, getTemplateData, getTemplates, UpdateCreds, userLogin, userSignIn } from "./app.api";
import { AuthRequest } from "middleware/interface";

export const create_creds = async (req: Request, res: Response) => {
  const payload: IApiCreds = req?.body
  const data = await createCreds(payload)
  SuccessResponse(req, res, data)
}
export const update_creds = async (req: Request, res: Response) => {
  console.log("==>>>>req body ",req?.body)
  const payload: IApiCreds = req?.body
  const data = await UpdateCreds(payload)
  SuccessResponse(req, res, data)
}

export const create_user = async (req: Request, res: Response) => {
  try {
    const payload: IUser = req?.body
    const data = await createUser(payload)
    SuccessResponse(req, res, data)
  } catch (err) {
    ErrorResponse(req, res, err)
  }
}

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const data = await userLogin(req?.body)
    console.log("🚀 ~ login ~ req?.body:", req?.body)
    SuccessResponse(req, res, data)
  } catch (err) {
    ErrorResponse(req, res, err)
  }
}
export const signup = async (req: AuthRequest, res: Response) => {
  try {
    const data = await userSignIn(req?.body)
    console.log("🚀 ~ signup ~ req?.body:", req?.body)
    SuccessResponse(req, res, data)
  } catch (err) {
    ErrorResponse(req, res, err)
  }
}
export const getData = async (req: AuthRequest, res: Response) => {
  try {
    console.log(req?.query?.service)
    const data = await getApiData((req?.query?.service as string).toLowerCase())
    SuccessResponse(req, res, data)
  } catch (err) {
    ErrorResponse(req, res, err)
  }
}


export const getTemplate = async (req: Request, res: Response) => {
  const service = req.query?.service;
  console.log("==>>", service)
  try {
    // Replace this with your database logic
    const notificationContent = await getTemplates(service as string); 

    if (!notificationContent) {
      return res.status(404).send('Content not found');
    }
    console.log(notificationContent.template)
    return SuccessResponse(req, res, {data:notificationContent}) 
  } catch (error) {
    console.error('Error fetching notification content:', error);
    return ErrorResponse(req, res, error)
  }
}

export const createTemplate = async (req: Request, res: Response) => {
  const paylaod = req?.body
  console.log("🚀 ~ createTemplate ~ paylaod:", paylaod)
  try {
    const notificationContent = await createTemplates(paylaod); 

    if (!notificationContent) {
      return res.status(404).send('Content not found');
    }

    return res.json(notificationContent); 
  } catch (error) {
    console.error('Error fetching notification content:', error);
    return res.status(500).send('An error occurred while fetching the content');
  }
}
export const test = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const data = await getTemplateData(Number(id)); 
    return res.json({data}); 
  } catch (error) {
    console.error('Error fetching notification content:', error);
    return res.status(500).send('An error occurred while fetching the content');
  }
}
export const getApiTemplates = async (req: Request, res: Response) => {
  const reqBody = req.body;
  console.log("reqBody: ",reqBody)
  try {
    const data = await getApiTemplate(); 
    return res.json({data}); 
  } catch (error) {
    console.error('Error fetching notification content:', error);
    return res.status(500).send('An error occurred while fetching the content');
  }
}
