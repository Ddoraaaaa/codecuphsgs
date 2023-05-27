var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    console.log(req.session.userId.toString()); // may cause the server to fail, 
    // // temporary solution: I dont know how to handle error in here, but the guard condition will be placed outside for the time being 

    cb(null, 'userId-' + req.session.userId.toString() + '_' + file.originalname)
  }
})

var upload = multer({ storage: storage })
var sourceCodeUpload = upload.single('sourceCode')

export default sourceCodeUpload; 