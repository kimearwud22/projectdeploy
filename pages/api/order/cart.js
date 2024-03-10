import { prisma } from "../../../libs/prisma.libs";

//create hangle product to cart 
export default async function handler(req, res) {
  const { type } = req.query;

  if (req.method === "POST") {
    const { user_google, product_id, product_price, product_name, quantity, total } = req.body;
    prisma.cart.findFirst({
      where: {
        AND: {
          user_google: user_google,
          product_id: parseInt(product_id),
        },
      },
    })
      .then((data) => {
        if (data) {
          prisma.cart.update({
            where: {
              id: data.id,
            },
            data: {
              quantity: parseInt(quantity) + parseInt(data.quantity),
              total: parseInt(total) + parseInt(data.total),
            },
          })
            .then((cart) => {
              res.status(200).json(cart);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ message: "Internal server error" });
            });
        } else {
          prisma.cart.create({
            data: {
              user_google: user_google,
              product: {
                connect: {
                  id: parseInt(product_id),
                },
              },
              product_name: product_name,
              product_price: parseInt(product_price),
              quantity: parseInt(quantity),
              total: parseInt(total),
            },
          })
            .then((cart) => {
              res.status(200).json(cart);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ message: "Internal server error" });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  } else if (type === "bulk" && req.method === "PUT") {
    try {
      const { insert } = req.body;
      console.log({ update: insert });
      insert.forEach(async (item) => {
        const { id, quantity, total } = item;
        await prisma.cart.update({
          where: {
            id: parseInt(id),
          },
          data: {
            quantity: parseInt(quantity),
            total: parseInt(total),
          },
        });
      });
      res.status(200).json({
        message: "Cart updated successfully",
        data: insert,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
  } else {
    res.status(400).json({
      message: "Bad request",
    });
  }
}
