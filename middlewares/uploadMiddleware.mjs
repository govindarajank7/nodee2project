import multer from 'multer';
import path from 'node:path';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/");
},
filename: function(req, file, cb) {
    const uniqueName = Date.now()+ path.extname(file.originalname);
    cb(null, uniqueName);
}
});

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});