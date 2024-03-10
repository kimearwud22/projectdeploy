import { prisma } from "../../../libs/prisma.libs";

export default function handler(req, res){
  prisma.user.findMany().then((user) => {
    res.status(200).json({
      message: "All user",
      data : user
    });
  }
  ).catch((error) => {
    res.status(500).json({ error: error.message })
  }
  )
}