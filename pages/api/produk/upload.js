import { prisma } from "../../../libs/prisma.libs";
import { cloudinary } from "../../../libs/cloudinary";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { kode_product, name, price, desc, image } = req.body;

        // Check if image data is provided
        if (!image) {
            return res.status(400).json({ message: "No image provided" });
        }

        let uploadedResponse;
        try {
            // Upload the image to Cloudinary
            uploadedResponse = await cloudinary.uploader.upload(image, {
                upload_preset: "dev_setups", // Make sure this preset exists in your Cloudinary account
            });
        } catch (error) {
            return res.status(500).json({ message: "Failed to upload image", error });
        }

        let result;
        try {
            // Save the product details in the database
            result = await prisma.product.create({
                data: {
                    kode_product,
                    name,
                    price,
                    desc,
                    image: uploadedResponse.url,
                },
            });
        } catch (error) {
            return res.status(500).json({ message: "Failed to save product", error });
        }

        res.json(result);
    }
}