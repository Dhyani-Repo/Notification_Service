import { Router } from "express";
import { EmailController } from "./email.controller";
import { refreshTokenVerify, accessTokenVerify, verifyAuthtoken } from "../../../middleware";

const router = Router();

const emailController = EmailController.createInstance()

// nodemailer
router.use('/order-status', accessTokenVerify,emailController.sendOrderStatusUpdate);
router.post('/send-email', accessTokenVerify,emailController.sendEmailNotification);

// sendgrid
router.post("/sendgrid/send",accessTokenVerify,emailController.sendgridNotification)
router.use('/sendgrid/order-status', accessTokenVerify,emailController.sendgridOrderStatusUpdate);

router.get("/manifest",emailController.appMainfest)

// Authentication
router.post("/token-target",emailController.token_target)
router.post("/register",verifyAuthtoken,emailController.register)
router.post("/token",verifyAuthtoken,emailController.otpVerify)

//Get Refresh Token
router.get("refresh-token",refreshTokenVerify,emailController.refreshToken)

export default router;