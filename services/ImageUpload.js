const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const dotenv = require('dotenv');
dotenv.config();

aws.config.update({
    secretAccessKey: process.env.S3_ACCESS_SECRET,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: "us-east-1",
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    console.log(file.mimetype);
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/webp") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
};

const upload = multer({
    fileFilter,
    storage: multerS3({
      acl: "public-read",
      s3: s3,
      bucket: 'pomegranate-io',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: "TESTING_METADATA" });
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '.' + file.originalname);
      },
    }),
  });


module.exports = upload;