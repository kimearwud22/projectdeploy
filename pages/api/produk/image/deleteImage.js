import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    let folder = req.body.folder;
    let filesToDelete = req.body.imagenames;

    for (let i = 0; i < filesToDelete.length; i++) {
        let filePath = path.join(folder, filesToDelete[i]);
        fs.unlinkSync(filePath);
    }

    res.status(200).json({message: 'success'});
}
