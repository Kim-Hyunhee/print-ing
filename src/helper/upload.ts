import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";

const bucket = "printing-images";
const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

const createConfig = (destination: string) => {
  return multerS3({
    s3,
    bucket,
    acl: "public-read",
    metadata: (req: any, file: any, cb: any) => {
      cb(null, { fieldName: file.fieldname });
    },
    key(req: any, file: any, cb: any) {
      const fileName = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      cb(null, `${destination}/${Date.now().toString()}/${fileName}`);
    },
  });
};

export const uploadProduct = multer({
  storage: createConfig("products"),
});
export const uploadHomepage = multer({
  storage: createConfig("homepage"),
});
export const uploadCurierLogo = multer({
  storage: createConfig("curierLogo"),
});
export const uploadOrders = multer({
  storage: createConfig("orders"),
});
export const uploadBanner = multer({
  storage: createConfig("banners"),
});
