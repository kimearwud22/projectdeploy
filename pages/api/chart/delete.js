import { prisma } from "../../../libs/prisma.libs";

export default async function handler(req, res) {
    //delete cart item
    const { id } = req.query;

    if (req.method === "DELETE") {
      try {
        const cartItem = await prisma.cart.findUnique({
          where: {
            id: parseInt(id),
          },
        });
  
        if (!cartItem) {
          return res.status(404).json({
            message: "Record to delete does not exist.",
            data: null,
          });
        }
  
        await prisma.cart.delete({
          where: {
            id: parseInt(id),
          },
        });
  
        return res.status(200).json({
          message: "Delete cart item success",
          data: cartItem,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Failed to delete cart item",
          data: null,
        });
      }
    } else {
      return res.status(400).json({
        message: "Method not allowed",
        data: null,
      });
    }
};