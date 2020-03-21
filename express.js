const express = require("express")
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
io.on("connection", function (socket) {
    console.log(socket.id);
    socket.on("send", function (message) {
        console.log(message);
        socket.broadcast.emit("recievedmessage", message);
    })
    socket.on("changescolor", function (color) {
        socket.broadcast.emit("change-color", color);
    })
    socket.on("start", function (point) {
        socket.broadcast.emit("onstart", point)
    })
    socket.on("end", function (point) {
        socket.broadcast.emit("onend", point)
    })

    socket.on("createsticky", function (tool) {
        socket.broadcast.emit("sticky", tool);
    })
    socket.on("tools", function (p) {
        socket.broadcast.emit("pe", p);
    })
    socket.on("md", function (p) {
        socket.broadcast.emit("press", p);
    })
    socket.on("mv", function (p) {
        socket.broadcast.emit("move", p);
    })
    socket.on("ml", function (p) {
        socket.broadcast.emit("leave", p);
    })
    socket.on("zoominout", function (p) {
        socket.broadcast.emit("zoominout2", p);
    })
    socket.on("undoevent", function (x) {
        if (x == "press") {
            socket.broadcast.emit("undoep");
        }
        else {
            socket.broadcast.emit("undoer");
        }
    })
    socket.on("redoevent", function (x) {
        if (x == "press") {
            socket.broadcast.emit("redoep");
        }
        else {
            socket.broadcast.emit("redoer");
        }
    })
    socket.on("d", function () {
        socket.broadcast.emit("down");
    })
})
app.use(express.static("client"));
server.listen(3000, function () {
    console.log("server is listening at 3000");
})
