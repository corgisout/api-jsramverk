const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

const reports = {
    addReport: function(res, body) {
        const kmom = body.kmom;
        const content = body.content;

        let sql = "INSERT INTO kmoms (kmom, content) VALUES (?, ?)";

        db.run(
            sql,
            kmom,
            content, (err) => {
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
                        message: "Report successfully created."
                    }
                });
            });
    },

    editReport: function(res, body) {
        const kmom = body.kmom;
        const content = body.content;

        let sql = "UPDATE kmoms SET content = ? WHERE kmom = ?;";

        db.run(
            sql,
            content,
            kmom, (err) => {
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
                        message: "Report successfully created."
                    }
                });
            });
    },


    getReport: async function(res, kmom) {
        let sql = "SELECT * FROM kmoms WHERE kmom = ?";


        db.get(
            sql,
            kmom,
            (err, rows) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                if (rows === undefined) {
                    return res.status(401).json({
                        errors: {
                            status: 401,
                            detail: "cant find any reports",
                        }
                    });
                }

                return res.status(200).json({
                    data: rows
                });
            });
    },

};

module.exports = reports;
