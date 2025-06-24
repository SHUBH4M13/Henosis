const express = require("express");
const passport = require("passport");
const { handleOAuthCallback } = require("../controller/oauthcontroller");

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    handleOAuthCallback
);

module.exports = router;
