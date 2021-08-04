const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.crxfz.mongodb.net/myNewsLetter?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log(`DB CONNECTED ${conn.connection.host}`);
  } catch (error) {
    console.log(`error ${error}`);
  }
};

module.exports = connectDB;
