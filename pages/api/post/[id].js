import { prisma } from "../../../libs/prisma.libs";

export default function handler(req, res) {
    const { id } = req.query;
    if (req.method === 'GET') {
        prisma.product.findFirst({
            where: {
                id: parseInt(id),
            },
            select: {
                id: true,
                product_name: true,
                product_price: true,
                product_desc: true,
                product_img: true,
            }
        })
            .then((produk) => {
                if (produk != null && produk != undefined) {
                    res.status(200).json({
                        message: "Produk found!",
                        data: produk,
                    });
                }
                else {
                    res.status(404).json({
                        message: "Produk not found!",
                    });
                }

            })
            .catch((err) => {
                res.status(500).json({
                    message: err || "Error occured! Please contact the admin for more information.",
                });
            });
        // res.status(200).json({id: id})
    }
}