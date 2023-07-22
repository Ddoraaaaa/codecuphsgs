const dotenv = require("dotenv"); 
dotenv.config({path: `.env.${process.env.NODE_ENV}`});
console.log(process.env); 

const request = require("supertest"); 

const mongoose = require("mongoose");

const newApp = require("../app.js")
let app = require("../src/app")(); 
let httpServer; 

beforeEach(async () => { 
    await mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGODB_URI)
    httpServer = await app.listen(5000, () => {
        console.log("Server started");
    }); 
}); 

afterEach(async () => { 
    await httpServer.close(); 
    for(const collectionName in mongoose.connection.db.listCollections) { 
        mongoose.connection.db.dropCollection(collectionName); 
    }
    await mongoose.connection.close(); 
})

describe("TEST SUPERTEST", () => {
    it("testing super test", async () => {
      const res = await request(app).get("/");
    //   expect(res.statusCode).toBe(200);
    //   expect(res.body.length).toBeGreaterThan(0);
    });
  });