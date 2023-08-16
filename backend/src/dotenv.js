if(process.env.NODE_ENV === 'dev') { 
    process.env.MONGODB_URI='mongodb+srv://codecuphsgs:ec7BsleaV4AnrEnQ@cluster0.vxmdbjv.mongodb.net/codecuphsgs_dev'; 
    process.env.JUDGE_URL='http:/localhost:8080'; 
    process.env.HTTP_PORT=5000; 
}