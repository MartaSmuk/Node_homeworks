import multer, { StorageEngine } from 'multer';

// Setup multer to upload files
const storage: StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define the directory to store uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

export const upload = multer({ storage });
