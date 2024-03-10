export default function handler(req, res) {
  const { user_google } = req.query;
  const { prisma } = require("../../../libs/prisma.libs");
  prisma.cart.findMany({
    where: {
      user_google: user_google,
    },
  })
    .then((data) => {
      if (data.length > 0) {
        let quantity = 0;
        data.map((item) => {
          quantity += item.quantity;
        });
        res.status(200).json({ message: "Berhasil mengambil data", data: quantity });
      } else {
        res.status(200).json({ message: "Berhasil mengambil data", data: 0 });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: "Gagal mengambil data", error: error });
    });
}