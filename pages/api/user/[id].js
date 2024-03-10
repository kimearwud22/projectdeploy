import { prisma } from "../../../libs/prisma.libs";

export default function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'GET') {
    prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        name: true,
        username: true,
      }
    })
      .then((user) => {
        if (user != null && user != undefined) {
          res.status(200).json({
            message: "User found!",
            data: user,
          });
        }
        else {
          res.status(404).json({
            message: "User not found!",
          });
        }

      })
      .catch((err) => {
        res.status(500).json({
          message: err || "Error occured! Please contact the admin for more information.",
        });
      });
    // res.status(200).json({id: id})
  }
}