import { prisma } from "../../../libs/prisma.libs"
import { getImage } from "../../../libs/formidable"
import { uploadImage } from "../../../libs/cloudinary"

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { fields, files } = await getImage(req);

      // Memeriksa apakah file 'image' ada dalam 'files'
      if (!files || !files.image || !files.image.path) {
        throw new Error("No image file found");
      }

      const image = files.image.path;
      const result = await uploadImage(image);
      const product = await prisma.product.create({
        data: {
          name: fields.name,
          description: fields.description,
          price: fields.price,
          image: result.secure_url
        }
      });
      res.status(201).json({ message: "Product created successfully!", data: product });
    } catch (error) {
      res.status(500).json({ message: error.message || "Error occurred! Please contact the admin for more information." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}
