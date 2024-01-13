import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb+srv://abegundestephen7:Stepheng01@cluster0.qmc0x8p.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose.connection;

const connectDB = async () => {
  try {
   await mongoose.connect('mongodb+srv://abegundestephen7:Stepheng01@cluster0.qmc0x8p.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   })
   console.log("Connected to MongoDB")
  }catch(err) {
    console.error(`Error connecting to MongoDB: ${err.message}`)
    process.exit(1)
  }
}

export {connectDB}