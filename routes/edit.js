const express = require("express");
const editrouter = express.Router();
const authenticateJWT = require("../Middleware/auth");
const multer = require("multer");
const { HandleEdit, HandleGetProfile } = require("../controller/Edit");

const storage = multer.memoryStorage();
const upload = multer({ storage });

editrouter.
put(
  "/:user_id",
  authenticateJWT,
  upload.single("profile"),
  HandleEdit
)
.get(
  "/:user_id",
  authenticateJWT,
  HandleGetProfile
);

module.exports = editrouter;
