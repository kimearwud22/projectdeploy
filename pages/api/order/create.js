import { prisma } from "../../../libs/prisma.libs";

export default async function handler(req, res) {
  if(req.method === "POST"){
    try {
      const {name, date, total, email, addres, phone, productId } = req.body;

    const order = await prisma.order.create({
      data:{
        name: name,
        date: date,
        total: total,
        email: email,
        addres: addres,
        phone: phone,
        product:{
          connect:{
            id: parseInt(productId)
          }
        }
      }
    })
    res.status(200).json({data: order})
    } catch (error) {
      res.status(400).json({error: error})
    }
  } else {
    res.status(405).json({message: "Method not allowed"})
  }
}