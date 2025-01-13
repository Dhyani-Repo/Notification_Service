import { PrismaClient } from "@prisma/client"
const prisma  = new PrismaClient()

export const getTemplateById = async(id:number) => {
    const data  = await prisma.app_emailTemplates.findUnique({
        where:{
          id:id
        },
        include:{
          app_type:true
        }
      })
    return data
}

export const getSelectedTemplates = async(data:any,selected:boolean = false) => {
    const allTemplates = await prisma.app_emailTemplates.findMany({
        where:{
          template_type:Number(data),
          selected:selected
        }
      })
    return allTemplates
}

export const updateTemplates = async(id:number,selected:boolean) => {
    const allTemplates = await prisma.app_emailTemplates.update({
        where: {
          id: id
        },
        data:{
          selected:selected
        }
    })
    return allTemplates
}