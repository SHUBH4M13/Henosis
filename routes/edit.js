const express = require("express");
const router = express.Router();
const authenticateJWT = require("../Middleware/auth");
const multer = require("multer");
const { HandleEdit } = require("../controller/Edit");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.
put(
  "/user/:user_id/edit",
  authenticateJWT,
  upload.single("profile"), // handle profile image upload
  HandleEdit
);

module.exports = router;
