const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const tokenCheck = {
    tokenCheck: function(req, res, next) {
        var token = req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, jwtSecret, function(err, decoded) {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: req.path,
                            title: "Failed authentication",
                            detail: err.message
                        }
                    });
                }

                next();
            });
        } else {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: req.path,
                    title: "No token",
                    detail: "No token provided in request headers"
                }
            });
        }
    },
};

module.exports = tokenCheck;
