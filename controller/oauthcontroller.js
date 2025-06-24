const jwt = require("jsonwebtoken");

const handleOAuthCallback = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Authentication failed" });
    }

    const payload = {
        id: req.user.id,
        name: req.user.displayName,
        email: req.user.emails[0].value,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
        msg: "OAuth successful",
        token,
    });
};

module.exports = {
    handleOAuthCallback,
};
