const passport = require("passport");
require("dotenv").config()
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK_URL,
// }, async (accessToken, refreshToken, profile, done) => {
//     // You can save the user to your DB here
//     console.log("Google profile:", profile);
//     return done(null, profile);
// }));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
