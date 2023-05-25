import session from "express-session";
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
    uri: "mongodb://localhost:27017/codecup",
    collection: "sessions"
}); 

const sessionMiddleware = session({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
})

export { 
    sessionMiddleware
}