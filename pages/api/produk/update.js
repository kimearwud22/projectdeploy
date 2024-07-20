import { prisma } from "../../../libs/prisma.libs";
export default async function handler(req, res) {
    if (req.method === "PUT") {
      const { name, price, image, kode_product } = req.body;
    const updateProduct = await prisma.product.update({
        where:{
            id: parseInt(req.query.id),
        },
        data: {
            name: name,
            price: price,
            image: image,
            kode_product: kode_product,
        },
    });
    res.json(updateProduct);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}