// upload image in cloudinary
import { prisma } from "../../../libs/prisma.libs"

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, price, desc, image, kode_product } = req.body;
      const result = await prisma.product.create({
        data: {
          name,
          price,
          desc,
          image,
          kode_product,
        },
      });
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
