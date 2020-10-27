const mongoose = require('mongoose');
require('dotenv').config({ path: '.env'});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB Connected.');
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;