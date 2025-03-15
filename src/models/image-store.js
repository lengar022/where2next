import * as cloudinary from "cloudinary";
import { writeFileSync, unlinkSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret
};
cloudinary.config(credentials);

export const imageStore = {

  getAllImages: async function() {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  uploadImage: async function(imagefile) {
    const imagePath = "./public/temp.img"
    writeFileSync(imagePath, imagefile);
    const response = await cloudinary.v2.uploader.upload(imagePath);
    unlinkSync(imagePath);
    return response.url;
  },

  deleteImage: async function(img) {
    await cloudinary.v2.uploader.destroy(img, {});
  }
};
