//delete all chart by user_google 

import { prisma } from "../../../libs/prisma.libs";

export default async function handler(req, res) {
  const { user_google } = req.query;
  if (req.method === "DELETE") {
    const cart = await prisma.cart.deleteMany({
      where: {
        user_google: user_google,
      },
    });
    return res.status(200).json(cart);
  } else {
    return res.status(400).json({
      message: "Method not allowed",
      data: [],
    });
  }
}