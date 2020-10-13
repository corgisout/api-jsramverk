const express = require("express");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cors = require('cors');

const register = require('./routes/register');
const presentation = require('./routes/presentation');
const login = require('./routes/login');
const reports = require('./routes/reports');

const app = express();
const port = 1337;


app.use(cors());


if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', presentation);
app.use('/', register);
app.use('/', login);
app.use('/', reports);

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
