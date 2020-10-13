const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const db = new sqlite3.Database('./db/texts.sqlite');
const bcrypt = require('bcryptjs');


const login = {
    login: function(res, body) {
        const email = body.email;
        const password = body.password;

        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    title: "Email or password missing",
                }
            });
        }

        db.get("SELECT * FROM users WHERE email = ?",
            email,
            (err, rows) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/login",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                if (rows === undefined) {
                    return res.status(401).json({
                        errors: {
                            status: 401,
                            title: "User not found",
                            detail: "Email not in db"
                        }
                    });
                }

                const user = rows;

                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            errors: {
                                status: 500,
                                title: "bcrypt error",
                            }
                        });
                    }

                    if (result) {
                        let payload = { email: user.email };
                        const secret = process.env.JWT_SECRET;
                        let jwtToken = jwt.sign(payload, secret, { expiresIn: '1hr' });
                        return res.json({
                            data: {
                                type: "success",
                                message: "User logged in",
                                user: payload,
                                token: jwtToken
                            }
                        });
                    }

                    return res.status(401).json({
                        errors: {
                            status: 401,
                            title: "Wrong password",
                        }
                    });
                });
            });
    },
}

module.exports = login;
