import {IncomingForm} from 'formidable';

export async function getImage(formData){
    const data = await new Promise(function(resolve, reject){
        const form = new IncomingForm({ keepExtensions: true});
        form.parse(formData, function (err, fields, files) {
            if (err) {
                reject(err);
            }
            resolve({fields, files});
        });
    }
    );
    return data;
}