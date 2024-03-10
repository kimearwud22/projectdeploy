import { prisma } from "../../../libs/prisma.libs";

export default async function handler(req, res) {
  const { user_google , status} = req.query;
  if (req.method === "GET") {
    const cart = await prisma.cart.findMany({
      where: {
        user_google: user_google,
        status: "Belum Checkout",
      },
      select: {
        id: true,
        user_google: true,
        product: {
          select: {
            id: true,
            product_name: true,
            product_price: true,
          }
        },
        quantity: true,
        total: true,
        status: true,
      }
    });
    return res.status(200).json(cart);
  } else {
    return res.status(400).json({
      message: "Method not allowed",
      data: [],
    });
  }
};
