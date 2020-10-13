const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const db = new sqlite3.Database('./db/texts.sqlite');

const register = {
    register: function (res, body) {
        const email = body.email;
        const password = body.password;
        const saltRounds = 10;


        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    title: "Email or password missing",
                }
            });
        }

        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/register",
                        title: "bcrypt error",
                        detail: err.message
                    }
                });
            }

        db.run("INSERT INTO users (email, password) VALUES (?, ?)",
            email,
            hash, (err) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                return res.status(201).json({
                    data: {
                        message: "user registered"
                    }
                });
            });
    })
    },
}


module.exports = register;
