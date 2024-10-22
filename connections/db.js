// connections/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://172.17.0.2:27017/smashdb');
    console.log('MongoDB connected to smashdb...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
