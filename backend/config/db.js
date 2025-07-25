import mongoose from 'mongoose';


const  connectDb =async ()=>{
try {
    await mongoose.connect(process.env.MONODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}
}

export default connectDb;