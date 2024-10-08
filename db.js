const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://root:pass@db:27017/', 
            {useNewUrlParser: true, useUnifiedTopology: true});

        console.log('MongoDB Connected');
    } catch(error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = dbConnect;