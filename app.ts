import "dotenv/config"
import express, { Application, NextFunction } from "express"
import helmet from "helmet"
import HttpException from "./shared/http-exception"
import locals from "./shared/locals.json"
import router from "./routes"
import { Request, Response } from "express"
import { sanitize } from "./shared/http-exception"
import uiRout from "./routs"
import cookieParser from 'cookie-parser';
import { connectToPostgres } from "./prisma"
const createServer = (): express.Application => {
  const app: Application = express()
  app.use(helmet())
  app.use(cookieParser())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static('public'))
  connectToPostgres()
  // app.use((req, res, next) => {
  //   const { domain } = req.query;
  //   res.set("Content-Security-Policy", `frame-ancestors 'self' https://${domain}`);
  //   next();
  // });
  
  
  app.use("/api/v1", router)
  
  app.use("/",uiRout)
  
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    err = sanitize(err)
    return res.status(err.status).json({ err: err.message })
  })
  
  app.use((_req, _res) => {
    throw new HttpException(404, locals.notFound)
  })
  return app
}

export default createServer
