const mongoose = require('mongoose');

const connectMongo = async () => {
  try {
    await mongoose.connect(
      'mongodb://localhost:27017/studentDB'
    );

    console.log('MongoDB Connected ');
  } catch (error) {
    console.error('DB Connection Error :', error);
  }
};

module.exports = connectMongo;