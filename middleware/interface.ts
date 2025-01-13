import { Request } from "express";
export interface AuthRequest extends Request{
    user ?:{
        user_id?:Number;
        email?:String
    }
}