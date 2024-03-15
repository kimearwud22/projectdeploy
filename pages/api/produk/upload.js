
import { prisma } from "@/libs/prisma.libs";
import { upload } from "uploadthing";


export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const uploadResponse = await upload(req, {
        secret: process.env.UPLOADTHING_SECRET,
        appId: process.env.UPLOADTHING_APP_ID,
      });
      const { kode_product, name, price, desc } = uploadResponse.fields;
      const image = uploadResponse.files.file[0].url;

      const product = await prisma.product.create({
        data: {
          kode_product,
          name,
          price,
          desc,
          image,
        },
      });

      res.status(200).json({ message: "success", data: product });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
};