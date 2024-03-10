import { prisma } from "../../../libs/prisma.libs";

export default async function handler(req, res) {
  //mengubah status cart dari Belum Checkout ke Sudah Checkout dengan methon PATCH
    const {status} = req.query;
    if (req.method === "PATCH") {
        const cart = await prisma.cart.updateMany({
            where: {
                status: status,
            },
            data: {
                status: "Sudah Checkout",
            }
        });
        return res.status(200).json({
            message: "Update cart status success",
            data: cart,
        });
    } else {
        return res.status(400).json({
            message: "Method not allowed",
            data: [],
        });
    }
};
