import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb+srv://abegundestephen7:Stepheng01@cluster0.qmc0x8p.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose.connection;