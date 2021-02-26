//env
require('./env')


const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/index");
const app = express();
const http = require("http").Server(app);
const port = process.env.PORT || 3000;

require('./config/express')(app);

const io = require('socket.io')(http);

io.on("connection", function (socket) {
    socket.on('news', function (data) { //lắng nghe event 'all client'
        io.sockets.emit('news', socket.id + ' send all client: ' + data); // gửi cho tất cả client
    });

})


require(config.PATH_MODELS)
    .map(modelName => `${config.PATH_MODELS}/${modelName}`)
    .forEach(require);


const listen = () => {
    new Promise((rs, rj) => {
        http.listen(port, () => {
            // console.log("Server running at port: " + port);
        });
    })
}

const connect = () =>
    new Promise((resolve, reject) => {
        mongoose.set("useCreateIndex", true);
        mongoose.set('useFindAndModify', false);
        mongoose.connect(config.DATABASE.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        const db = mongoose.connection;
        db.on("error", () => reject("Please install and start your mongodb"));
        db.once("open", resolve);
    });

connect()
    .then(() => {
        return true;
    })
    .then(listen)
    .catch(err => {
        console.log('connect server.js ERROR', er);
        process.exit(0);
    })


process.on("uncaughtException", err => {
    console.log("uncaughtException server.js ERROR: ", err);
});

process.on("unhandledRejection", err => {
    console.log(err.message);
});

module.exports = app