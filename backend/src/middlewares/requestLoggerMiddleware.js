export default function requestLoggerMiddleware(req, res, next) { 
    console.log("Server received request from " + req.url); 
    next(); 
}