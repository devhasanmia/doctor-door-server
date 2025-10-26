import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import config from "../../config";

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET,
});

interface CloudinaryUploadResult {
  secure_url: string;
}

export const sendImage = (
  path: string,
  imageName: string
): Promise<CloudinaryUploadResult> => {
  console.log(path, imageName);
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(path, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result as CloudinaryUploadResult);
    });
  });
};

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });