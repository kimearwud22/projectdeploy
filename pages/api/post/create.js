// upload image in cloudinary
import { prisma } from "../../../libs/prisma.libs"

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title, content, date, authorId, image } = req.body;
      const result = await prisma.post.create({
        data: {
          title,
          content,
          date,
          image,
          authorId: parseInt(authorId),
        },
      });
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}


