import { Router } from "express"
import emailRoutes from "./src/services/email/email.router"
import { create_creds, create_user, getData, getTemplate, login, update_creds,test, signup, createTemplate } from "./src/services/apis/app.controller"

const router = Router()

router.use("/notification", emailRoutes)
router.post("/login",login)
router.post("/signup",signup)
router.post("/create",create_creds)
router.post("/updateCreds",update_creds)
router.post("/signup",create_user)
router.get("/getCreds",getData)
router.get("/getTemplate",getTemplate)
router.post("/createTemplate",createTemplate)
router.get("/test/:id",test)
export default router
