import { prisma } from "../../../libs/prisma.libs";
//update jumlah dan total yang ada pada cart
export default async function handler(req, res) {
  const { id } = req.query;
  if (id && req.method === "PUT") {
    try {
      const cart = await prisma.cart.update({
        where: {
          id: parseInt(id),
        },
        data: {
          quantity: parseInt(req.body.quantity),
          total: parseInt(req.body.quantity) * parseInt(req.body.product_price),
        },
      });
      res.status(201).json({
        message: "cart updated successfully",
        data: cart,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
  } else {
    res.status(400).json({
      message: "please fill all the fields",
    });
  }
}
