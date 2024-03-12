import { prisma } from "../../../libs/prisma.libs";

export default async function handler(req, res) {
  const { name, addres, phone, state, date } = req.body;
  const newData = {};

  // Check if each field has a value and add it to the newData object
  if (name) newData.name = name;
  if (addres) newData.addres = addres;
  if (phone) newData.phone = phone;
  if (state) newData.state = state;
  if (date) newData.date = date; 

  if (Object.keys(newData).length > 0) {
    if (req.method === "PUT") {
      const order = await prisma.order.updateMany({
        where: {
          state: "unconfirmed",
        },
        data: newData,
      });
      res.status(200).json(order);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}