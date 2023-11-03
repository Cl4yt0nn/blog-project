const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user.routes');
const blogRoute = require('./routes/blog.routes');

mongoose
    .connect('mongodb+srv://choag691:49Gyroscope!444@cluster0.votuvny.mongodb.net/BlogData')
    .then((x) => {
        console.log(
            `Connected to Mongo! Database name: ${x.connections[0].name}`
        )
    })
    .catch((err) => {
        console.error("Error connecting to mongo", err.reason);

    });

const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),

);
app.use(cors());
app.use("/users", userRoute);
app.use("/posts", blogRoute);

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Connected to port", port);
});

// 404 Error
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
   });
   
app.use(function (err, req, res, next) {
     console.error(err.message, err);
     if (!err.status) err.status = 500;
     res.status(err.status).send(err.message);
})

