const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb+srv://johntho:janetho@pomegranate.pment.mongodb.net/Pomegranate?retryWrites=true&w=majority';
db.models = require('./models/models.js');

module.exports = db;