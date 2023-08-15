import multer from "multer"; 
import fs from "fs"; 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file); 
    cb(null, '/Users/hoanggiapvu/Documents/codecuphsgs/codecuphsgs/backend/uploads/'); 
  },
  filename: function (req, file, cb) { 
    cb(null, 'userId-' + req.session.userId.toString() + '_' + file.originalname); 
  }
}); 

const multerSingleFileUpload = multer({ storage }).single('sourceCode'); 

export default multerSingleFileUpload; 