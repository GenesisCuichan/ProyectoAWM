import express from 'express'; //Librería para Express
import multer from 'multer'; //Librería que hace que sea fácil manipular este multipart/form-data cuando los usuarios suben archivos
import { v2 as cloudinary } from 'cloudinary'; //Librería para cargar imágenes únicas
import streamifier from 'streamifier'; //Librería que convierte un buffer a un stream legible
import { isAdmin, isAuth } from '../utils.js'; //Librería de Utils

//Carga de la librería multer
const upload = multer();
//Llamada de Express
const uploadRouter = express.Router();

//Respuesta a la Actualización
uploadRouter.post(
  '/',
  isAuth,
  isAdmin,
  upload.single('file'),
  async (req, res) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    const result = await streamUpload(req);
    res.send(result);
  }
);
export default uploadRouter;
