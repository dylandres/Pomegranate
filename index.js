const express = require("express");
const path = require("path");
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const User = require('./server/db/models/user.model.js')
const app = express();

// var corsOptions = {
//     origin: 'http://localhost:4000/'
// };

const db = require("./server/db/server.js");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "sadlkfjasldfjsmarmasdl;fkjasdlkfjasdklfa",
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_URL
      }),
  })
);

app.use(async (req, res, next) => {
    const user = await User.findOne({_id: req.session.userId})
    req.user = user
    next()
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./server/routes/api"));
app.use(express.static(path.join(__dirname, "client", "build")));
app.use("*", express.static(path.join(__dirname, "client", "build")));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
