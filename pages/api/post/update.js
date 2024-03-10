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
        }
    }),
    limits: {
        fileSize: 10000000, // 1 MB
    },
});

//how to update product
export default async (req, res) => {
    if (req.method === "PUT") {
        upload.single("product_img")(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            const {product_name, product_price, product_desc } = req.body;
            const product_img = req.file ? `/upload/${req.file.filename}` : req.body.image;
            const id = req.query.id;
            const updateProduct = await prisma.product.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    product_name: product_name,
                    product_price: parseInt(product_price),
                    product_desc: product_desc,
                    product_img: product_img,
                },
            });
            if (updateProduct) {
                res.status(200).json({ data: updateProduct });
            }
        }); 
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
};