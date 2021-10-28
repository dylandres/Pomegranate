const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

var corsOptions = {
    origin: 'http://localhost:4000/'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require('./server/db/server.js');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database!");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
})

app.use('/api', require('./server/routes/api'));
app.use(express.static(path.join(__dirname, "client", "build")));
app.use('*', express.static(path.join(__dirname, "client", "build")));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})