import { prisma } from "../../../libs/prisma.libs";

export default async (req, res) => {
    //get all cart
    if (req.method === "GET") {
        try {
            const cart = await prisma.cart.findMany({
                include: {
                    product: true,
                },
            });
            res.status(200).json(cart);
        } catch (error) {
            res.status(400).json({
                message: "Get all cart failed",
                data: [],
            });
        }
    } else {
        res.status(400).json({
            message: "Method not allowed",
            data: [],
        });
    }
};