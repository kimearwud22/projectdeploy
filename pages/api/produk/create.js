/* eslint-disable import/no-anonymous-default-export */
//how to create a new product product_img from api/upload
import { prisma } from "../../../libs/prisma.libs";
import { join } from "path";
import multer from "multer";
import { promises as fs } from "fs";

const storage = multer.diskStorage({
    destination: join(process.cwd(), "public"),
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${file.originalname}`);
    },
});

const upload = multer({ storage }).single("image");

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    if (req.method === "POST") {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            const { kode_product, name, price, desc } = req.body;
            const image = req.file ? `/${req.file.filename}` : req.body.image;
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
        });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}

