import multer from 'multer';
import path from 'path';

// storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/pet_photos'); // storage folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // for unique filenames
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // using original file extension
  }
});

// setup for file size limit and file type filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB calc from bytes
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true); // Accept the file
    }
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif)'));
  }
});

export default upload;
