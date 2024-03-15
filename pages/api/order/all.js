
import { prisma } from "../../../libs/prisma.libs";

export default async function handler(req, res) {
  const {state} = req.query;
  if(state === "confirmed"){
    const data = await prisma.order.findMany({
        where:{
            state: "confirmed"
        },
        include:{
            product: true
        }
    })
    res.status(200).json({data: data})
} else if(state === "unconfirmed"){
    const data = await prisma.order.findMany({
        where:{
            state: "unconfirmed"
        },
        include:{
            product: true
        }
    })
    res.status(200).json({data: data})
} else {
    const allData = await prisma.order.findMany({
        include:{
            product: true
        }
    })
    res.status(200).json({data: allData})
}
}

