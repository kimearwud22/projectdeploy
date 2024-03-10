import { prisma } from "../../../libs/prisma.libs";

export default async function handle(req, res) {
  const { user_google } = req.query;
  if (req.method === "GET") {
    const order = await prisma.order.findMany({
      where: {
        user_google: user_google,
      },
      select: {
        user_google: true,
        name_user: true,
        order_date: true,
        cart: {
          select: {
            product_name: true,
            product_price: true,
            quantity: true,
            total: true,
          }
        },
        expedisi: true,
        subtotal: true,
        address: true,
        shipping: true,
      }
    });
    return res.status(200).json(order);
  } else {
    return res.status(400).json({
      message: "Method not allowed",
      data: [],
    });
  }
};