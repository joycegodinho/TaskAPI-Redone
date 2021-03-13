const mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/TaskAPI2';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
};

const db = mongoose.connect(url, options)
    .then(() => console.log('Connect to Database'))
    .catch(err => console.log('Error connecting to Database: ' + err))

module.exports = db;