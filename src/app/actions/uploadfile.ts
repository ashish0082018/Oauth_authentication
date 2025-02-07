"use server"

import { Uploadimage } from "@/lib/uploadimage";



export const uploadFile = async (file: File):Promise<string> => {
  // console.log(file);
  const uploadresult:any=await Uploadimage(file,"NODEE") ;
  
  return String(uploadresult.secure_url)
  
   
};
