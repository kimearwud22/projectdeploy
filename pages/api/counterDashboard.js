import { prisma } from "../../libs/prisma.libs";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
            let dataCount = {
                orders: await prisma.order.count(),
                products: await prisma.product.count(),
                post: await prisma.post.count(),
                users : await prisma.user.count(),
            };
            if (dataCount) {
                res.status(200).json({
                    message: "Data Count",
                    data: dataCount,
                });
            } else {
                res.status(200).json({
                    message: "Data Count Not Found",
                    data: [],
                });
            }
        }
        catch (error) {
            res.status(200).json({
                message: error || "Error occured! Please contact the admin for more information.",
            });
        }
    } else {
        res.status(200).json({
            message: "Method not allowed",
        });
    }
}