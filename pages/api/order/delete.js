import { prisma } from "../../../libs/prisma.libs";

export default async function handler(req, res) {
    //delete cart item
    try {
        const { id } = req.query;
    
        if (req.method === "DELETE") {
          const delete_cart = await prisma.order.delete({
            where: {
              id: parseInt(id)
            }
          });
    
          if (!delete_cart) {
            res.status(404).json({ message: "Record not found" });
          } else {
            res.status(200).json(delete_cart);
          }
        } else {
          res.status(405).json({ message: "Only DELETE method is allowed" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while deleting the order" });
      }
    }