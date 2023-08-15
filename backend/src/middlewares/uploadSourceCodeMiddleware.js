import multerSingleFileUpload from "./multerSingleFileUpload";

export default function uploadSourceCodeMiddleware(req, res, next) { 
    multerSingleFileUpload(req, res, function (error) { 
        if(error) { 
            console.error("Error at uploading file: " + error); 
            res.status(401).send({msg: "Upload failed"});
        }
        else { 
            if(!req.file) { 
                console.error("Upload did not encouter error but no file found"); 
                res.status(500).send({msg: "Internal server error"}); 
            }
            console.log("Saving file successful. ")
            console.log("File info: "); 
            console.log(req.file); 
            next(); 
        }
    }); 
}