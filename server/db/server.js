const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb://localhost:27017/Pomegranate';
db.models = require('./models/models.js');

module.exports = db;