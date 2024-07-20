import { prisma } from "../../../libs/prisma.libs";

export default async function handler(req, res) {
    if (req.method === "PUT") {
      const { title, content, date, authorId, image } = req.body;
    const updateProject = await prisma.post.update({
        where:{
            id: parseInt(req.query.id),
        },
        data: {
            title: title,
            content: content,
            date: date,
            image: image,
            authorId: authorId,
        },
    });
    res.json(updateProject);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}