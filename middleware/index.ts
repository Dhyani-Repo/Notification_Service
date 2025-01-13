import { NextFunction,Response,Request } from "express";
import { AuthRequest } from "./interface";
import { decrypt, hashPassword } from "../shared/crypto";
import { PrismaClient } from "@prisma/client";
import { verifyAccessToken,verifyRefreshToken } from "../shared/jwt";
import { ErrorResponse } from "../src/utils/response.utils";
const prisma = new PrismaClient()

//to verify access token or refreshToken
export const accessTokenVerify = (req: Request, res: Response, next: NextFunction):any => {
    try{
      const token =  req?.cookies.token;
      console.log("🚀 ~ accessTokenVerify ~ req?.cookies.token:", req?.cookies.token)
      if (!token) {
        return res.status(401).json({ message: "Authorization token is required" });
      }
      const decoded = verifyAccessToken(token as string);
      if(decoded){
        console.log("🚀 ~ accessTokenVerify ~ decoded:", decoded)
        next()
      }else{
        return res.sendFile(`${process.cwd()}/public/login.html`)
      }
    }catch(err){
      return ErrorResponse(req,res,err)
    }
};
export const refreshTokenVerify = (req: Request, res: Response, next: NextFunction):any => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token is required" });
    }
    const decoded = verifyRefreshToken(token);
    if (decoded) {
      next();
    } else {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
};


//for Oauth2.0 validation
export const verifyAuthtoken = async(req: AuthRequest, res: Response, next: NextFunction):Promise<any> => {
    const H_token = req?.body?.client_secret
    const H_domain = req?.body?.client_id
    if (!H_token || !H_domain) {
      return res.status(401).json({ message: "Authorization token and Domain is required" });
    }
    const data = await prisma.app_auth.findFirst({
      where:{
        domain:H_domain as string
      }
    })
    if (!data) {
      return res.status(401).json({ message: "token is not available in the db" });
    }
    const decrypted_token = decrypt(data?.token as string)
    const salt  =  H_token.split('$')
    const decoded_token =  hashPassword(decrypted_token,salt[2])
    if(H_token == decoded_token){
      next()
    }else{
      throw new Error("Token Varification Failed !")
    }
};