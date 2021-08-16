const mongoose = require('mongoose');

async function connect(url, callback) {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("connect successfully");
    } catch (err) {
        console.log(err);
    }

}

module.exports = { connect };