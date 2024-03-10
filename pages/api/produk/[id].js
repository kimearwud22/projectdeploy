import { prisma } from "../../../libs/prisma.libs";

export default function handler(req, res) {
    const { id } = req.query;
    if (req.method === 'GET') {
        prisma.product.findFirst({
            where: {
                id: parseInt(id)
            }
        }).then((data) => {
            res.status(200).json({ data })
        }).catch((error) => {
            res.status(400).json({ error })
        })
    } else if (req.method === 'PUT') {
        const { name, price, image } = req.body
        prisma.product.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name,
                price,
                image
            }
        }).then((data) => {
            res.status(200).json({ data })
        }).catch((error) => {
            res.status(400).json({ error })
        })
    }
}