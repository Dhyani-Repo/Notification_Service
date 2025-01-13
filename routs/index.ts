import {Router} from "express";
import {indexPage, homePage, update_api_key} from "../controller"
// import { verifyAccessToken } from "shared/jwt";
import { accessTokenVerify } from "../middleware";

const rout = Router()

rout.get("/",indexPage);

rout.get("/home", accessTokenVerify,homePage)

rout.get("/update_api_key", update_api_key)


export default rout