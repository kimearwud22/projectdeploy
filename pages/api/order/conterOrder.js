import { prisma } from "../../../libs/prisma.libs";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            let dataCountOrder = {
                orders: await prisma.order.count({
                    where: {
                        productid : req.query.productid,
                    },
                }),
            };
            if (dataCountOrder) {
                res.status(200).json({
                    message: "Data Count Order",
                    data: dataCountOrder,
                });
            } else {
                res.status(200).json({
                    message: "Data Count Order Not Found",
                    data: [],
                });
            }
        } catch (error) {
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