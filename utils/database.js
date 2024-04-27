import mongoose from 'mongoose'

let isConnected = false;

export const connectToDB = async() => {
    mongoose.set('strictQuery', true)
    if(isConnected) {
        console.log('MongoDB is already connected')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            dbName: "new_life_gym",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;

        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
}