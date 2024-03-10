import { prisma } from "../../../libs/prisma.libs";

export default function handler(req, res) {
    const { id } = req.query;
    if (req.method === 'GET') {
        prisma.order.findMany({
            where: {
                id: parseInt(id)
            },
            include: {
                cart: {
                    include: {
                        product: true
                    }
                }
            }
        }).then((data) => {
            res.status(200).json({ data })
        }).catch((error) => {
            res.status(400).json({ error })
        })
    } 
}