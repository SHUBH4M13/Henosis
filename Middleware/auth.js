const jwt = require("jsonwebtoken");
require("dotenv").config(); // Ensure environment variables are loaded

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization; // Format: "Bearer <token>"

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ msg: "Invalid or expired token" });
            }

            req.user = decoded; // example: { id: "...", iat: ..., exp: ... }
            next();
        });
    } else {
        return res.status(401).json({ msg: "Authorization header missing or malformed" });
    }
}

module.exports = authenticateJWT;
