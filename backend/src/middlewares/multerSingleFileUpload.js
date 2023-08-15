import multer from "multer"; 
import fs from "fs"; 

/* 
function CustomStorage(opts) { 
  this.getDestination = opts.destination; 

  this._handleFile = (req, file, cb) => { 
    this.getDestination(req, file, function (err, path) {
      // purely for debugging purepose

      console.log("calling cb(err)")
      console.log(Object.keys(cb)); 
      return cb(err); 
  
      if (err) { 
        return cb(err); 
      }
  
      var outStream = fs.createWriteStream(path); 
  
      file.stream.pipe(outStream); 
      outStream.on('error', cb); 
      outStream.on('finish', function () {
        cb(null, {
          path: path,
          size: outStream.bytesWritten
        })
      })
    })
  }; 

  this._removeFile = (req, file, cb) => {
    fs.unlink(file.path, cb); 
  }
}
*/ 

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