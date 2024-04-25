import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dfrspeg05', 
  api_key: '525717441792125', 
  api_secret: '6JHdy4LzPEyoSFD1YJcdTL215MY' 
});

export default cloudinary;


import { Response } from 'express';
// import dotenv from "dotenv";

// dotenv.config();
cloudinary.config({ 
    cloud_name: 'dfrspeg05', 
    api_key: '525717441792125', 
    api_secret: '6JHdy4LzPEyoSFD1YJcdTL215MY' 
  });

export const uploadToCloud = async (file:any, res:Response)=> {
  try {
    const profilePicture = await cloudinary.uploader.upload(file.path, {
      folder: "Blogs",
      use_filename: true,
    });
    return profilePicture;    
  } catch (error:any) {
    return res.status(500).json({
      status:500,
      message:"Fail to upload image",
      error:error.message
    });
  }
};