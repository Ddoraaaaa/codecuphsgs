import session from "express-session";
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: "sessions"
}); 
var sessionMiddleware = session({
    secret: "This is a secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: true,
    saveUninitialized: true
})
export default sessionMiddleware 