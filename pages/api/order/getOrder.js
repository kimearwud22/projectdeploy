import { prisma } from "../../../libs/prisma.libs";

export default async function handler(req, res) {
    const {state} = req.query;
    if (req.method === "GET") {
        const orders = await prisma.order.findMany({
            where: {
            state: "unconfirmed",
            },
            select: {
                id: true,
                name: true,
                total: true,
                date: true,
                addres: true,
                phone: true,
                product: {
                    select: {
                        name: true,
                        kode_product: true,
                        price: true,
                        desc: true,
                        image: true,
                    }
                }
            },
        });
        res.status(200).json({ data: orders });
    }

    if (req.method === "DELETE") {
        const {id} = req.query;
        const order = await prisma.order.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json({ data: order });
    } 
}