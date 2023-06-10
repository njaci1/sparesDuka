/* eslint-disable no-undef */
import multer from 'multer';
import path from 'path';
export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), 'public/images'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default async function handler(req, res) {
  try {
    await new Promise((resolve, reject) => {
      upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.log(err);
          reject(err);
        } else if (err) {
          // An unknown error occurred when uploading.
          console.log(err);
          reject(err);
        }
        resolve();
      });
    });

    // Assuming the file is uploaded successfully
    console.log('file uploaded');
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error uploading file' });
  }
}
