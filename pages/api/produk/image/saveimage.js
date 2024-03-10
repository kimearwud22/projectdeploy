import fs from 'fs';

export const config = {
    api: {
        bodyParser :{
            sizeLimit: '4mb',
        }
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { image } = req.body;
        const base64Data = image.replace(/^data:image\/png;base64,/, "");
        const imgName = new Date().getTime() + '.png';
        fs.writeFileSync('./public/upload/' + imgName, base64Data, 'base64', function (err) {
            console.log(err);
        });
        res.status(200).json({ message: 'success', imgName: imgName });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}