import { Request,Response } from "express";
import ejs from "ejs"
import { ErrorResponse, } from "../src/utils/response.utils";

export const homePage = async(req:Request,res:Response) => {
    try{
        const { domain } = req.query;
        const isValidDomain = /^[a-zA-Z0-9.-]+$/.test(domain as string);
        if (!isValidDomain) {
          return res.status(400).send("Invalid domain");
        }
        res.set("Content-Security-Policy", `frame-ancestors 'self' https://buyer-saleor-frontend-dashboard-dev.thewitslab.com`); 
        res.set("Content-Security-Policy", `frame-ancestors 'self' ${process.env.CLIENT_URI}`)
        const base_url = process.env.NOTIFICATION_BACKEND_URL as string
        const htmlFile = await ejs.renderFile(`${process.cwd()}/views/index.ejs`,{
          baseUrl: base_url 
        })
        return res.status(200).send(htmlFile); 
    }catch(err){
        return ErrorResponse(req,res,err)
    }
}

export const update_api_key = async (req: Request, res: Response): Promise<any> => {
    try{
      const type = req.query.type
      console.log("🚀 ~ constupdate_api_key= ~ type:", type)
      console.log(`${process.cwd()}/views/update_api_key.ejs`)
      const htmlFile = await ejs.renderFile(`${process.cwd()}/views/update_api_key.ejs`,{type:type})
      console.log("🚀 ~ constupdate_api_key= ~ htmlFile:", htmlFile)
      return res.status(200).send(htmlFile);
      // return res.render(`${process.cwd()}/views/update_api_key.ejs`); 
    }catch(err){
      console.log(err)
      ErrorResponse(req,res,err)
    }
  }


export const indexPage = async(req: Request, res: Response) => {
    const data = req?.body
    return res.sendFile(`${process.cwd()}/public/signup.html`,{data}); 
}
