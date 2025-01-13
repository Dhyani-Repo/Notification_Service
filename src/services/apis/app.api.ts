import { PrismaClient } from "@prisma/client"
import { IApiCreds, IUser } from "./app.interface"
import { generateToken } from "../../../shared/jwt"
import {   getTemplateById,  } from "./app.service"

const prisma = new PrismaClient()

export const createCreds = (payload: IApiCreds) => {
  const data = prisma.app_api.create({
    data: {
      Api_Key: payload?.Api_Key,
      Api_Secret: payload?.Api_Secret,
      Api_Type: payload?.Api_Type
    }
  })
  return data
}

export const UpdateCreds = async(payload: IApiCreds) => {
  let data2 = await prisma.app_api.findFirst({
    where:{
      Api_Type:(payload?.Api_Type).toLowerCase()
    }
  })
  if(!data2){
    data2 = await prisma.app_api.create({
      data:{
        Api_Type:(payload?.Api_Type).toLowerCase(),
        Api_Key:payload?.Api_Key,
        Api_Secret:payload?.Api_Secret
      }
    })
  }
  const data = await prisma.app_api.update({
    where: {
      id: data2?.id
    },
    data: {
      Api_Key: payload?.Api_Key,
      Api_Secret: payload?.Api_Secret,
      Api_Type: payload?.Api_Type
    }
  })
  return data
}

export const createUser = (payload: IUser) => {
  const data = prisma.app_user.create({
    data: {
      Name: payload?.name,
      Password: payload?.password,
      Email: payload?.email
    }
  })
  return data
}

export const userLogin = async (payload: any): Promise<any> => {
  const data = await prisma.app_user.findFirst({
    where: {
      Email: payload?.username
    }
  })
  console.log("🚀 ~ userLogin ~ data:", data)
  if (!data) {
    throw new Error("User Not found")
  }
  if (!(data?.Password === payload?.password)) {
    console.log("🚀 ~ userLogin ~ payload?.password:", payload?.password)
    console.log("🚀 ~ userLogin ~ data?.Password:", data?.Password)
    throw new Error("Wrong password")
  }
  const data2 = generateToken(data)
  return data2
}
export const userSignIn = async (payload: any): Promise<any> => {
  const data = await prisma.app_user.findFirst({
    where: {
      Email: payload?.email,
    }
  })
  if (data) {
    return {
      userExist: true,
      description: "cannot create user"
    }
  }
  const user = await prisma.app_user.create({
    data: {
      Name: payload?.username,
      Email: payload?.email,
      Password: payload?.password
    }
  })
  console.log("🚀 ~ userSignIn ~ user:", user)

  return {
    userExist: true,
    description: "User has been created successfully",
    user
  }
}

export const getApiData = async (type: String): Promise<any> => {
  const data = await prisma.app_api.findFirst({
    where: {
      Api_Type: type as string
    }
  })
  if (!data) {
    throw new Error(`Apis are not availabel for type ${type}`)
  }
  return data
}
export const getApiTemplate = async (): Promise<any> => {
  const data = await prisma.app_api.findMany()
  if (!data) {
    throw new Error(`There is no data regarding the apis`)
  }
  return data
}

export const getTemplates = async (type: string): Promise<any> => { 
  console.log("🚀 ~ getTemplates ~ type:", type)
  const data1 = await prisma.app_api.findFirst({
    where: {
      Api_Type: type.toLowerCase()
    }
  })
  console.log(data1)
  // if(data)
  const data = await prisma.app_emailTemplates.findMany({
    where: {
      template_type: data1?.id
    },
    include: {
      app_type: true
    }
  })
  console.log("🚀 ~ getTemplates ~ data:", data)

  if (!data) {
    throw new Error("User Not found")
  }
  return data
}
export const createTemplates = async (payload:any): Promise<any> => {
  console.log("🚀 ~ createTemplates ~ type:", payload)
  const data1 = await prisma.app_api.findFirst({
    where:{
      Api_Type: payload?.templateType
    }
  })
  if (!data1) {
    throw new Error("template_type is not available")
  }
  const data = await prisma.app_emailTemplates.create({
    data: {
      template: (payload?.description) as string,
      template_type: Number(data1?.id),
    }
  })
 
  return data
}

export const getTemplateData = async (id: number): Promise<any> => {
  console.log("🚀 ~ getTemplateData ~ id:", id)
  const data = await getTemplateById(id)
  console.log("🚀 ~ getTemplateData ~ data:", data)
  if (!data) {
    throw new Error("This Template is Unavailable")
  }
  if(data?.selected){
      await prisma.app_emailTemplates.update({
        where:{
          id:id
        },
        data:{
          selected:false
        }
      })
      return {
        status:"unselected"
      }
  }else{
      await prisma.app_emailTemplates.updateMany({
        data:{
          selected:false
        }
      })
      await prisma.app_emailTemplates.update({
        where:{
          id:id
        },
        data:{
          selected:true  
        }
      })
      return {
        status:"selected"
      }
  }
  }
  

