import multer from 'multer'

export default (path, nameImage) => {
    let fileName
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, path);
        },
        filename: function(req, file, cb) {
            fileName = nameImage + file.originalname
            cb(null, fileName);
        }
    })


    const upload = multer({
        storage: storage
    });

    return { upload }
}