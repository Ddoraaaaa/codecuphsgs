import mongoose from 'mongoose';
import userSeed from './user.seed.js';
const URI = 'mongodb://localhost:27017/codecup';

mongoose.set('strictQuery', true);
mongoose.connect(URI);

const seeds = [
    [userSeed, "Users"] 
];

for(let [seed, name] of seeds) {
    // console.log(seed.data);
    await seed.model.deleteMany({}).then((res) => {
        console.log("Deleted", res.deletedCount, name);
    }).catch((error) => {
        console.log(error);
    })
    await seed.model.insertMany(seed.data).then((res) => {
        console.log("Seeded", res.length, name);
    }).catch((error) => {
        console.log(error);
    })
}

process.exit();