/* eslint-disable import/no-anonymous-default-export */
//how to create a new product product_img from api/upload
import { prisma } from "../../../libs/prisma.libs";
import path from "path";
import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
  limits: {
    fileSize: 10000000, // 1 MB
  },
});

export default async (req, res) => {
  if (req.method === "POST") {
    upload.single("image")(req, res, async (err) => {
      const { kode_product, name, price, desc } = req.body;
      const image = `/uploads/${req.file.filename}`;
      const product = await prisma.product.create({
        data: {
          kode_product,
          name,
          price,
          desc,
          image,
        },
      });
      res.status(200).json({ message: "success", data: product });
    }
    );
  } else {
    res.status(405).json({ message: "method not allowed" });
  }
}
