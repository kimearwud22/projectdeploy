import { prisma } from "../../../libs/prisma.libs";
import path from "path";
import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
  limits: {
    fileSize: 10000000, // 1 MB
  },
});

export default async (req, res) => {
  if (req.method === "POST") {
    upload.single("image")(req, res, async (err) => {
      const { title, content, date, authorId } = req.body;
      const image = `/uploads/${req.file.filename}`;
      const posts = await prisma.post.create({
        data: {
          title,
          content,
          date,
          image,
          authorId: parseInt(authorId),
        },
      });
      res.status(201).json({
        message: "Post created successfully!",
        data: posts,
      });
    }
    );
  } else {
    res.status(200).json({
      message: "Method not allowed",
    });
  }
}

