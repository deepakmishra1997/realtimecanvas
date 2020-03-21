let isMouseDown = false;
function getLocation(clientX, clientY) {
    const rect = board.getBoundingClientRect();
    const top = rect.top;
    return {
        y: clientY - top,
        x: clientX
    }
}
const undo = document.getElementById("undo");
const redo = document.getElementById("redo");

var arr = [];
var rearr = [];
board.addEventListener("mousedown", function (e) {
    ctx.beginPath();
    const { x, y } = getLocation(e.clientX, e.clientY);
    var point = {
        x: x,
        y: y,
        color: ctx.strokeStyle,
        width: ctx.lineWidth,
        type: "start"
    }

    isMouseDown = true;
    arr.push(point);
    ctx.moveTo(x, y);
    socket.emit("start", point);
})
board.addEventListener("mousemove", function (e) {
    // console.log(e);
    if (!isMouseDown)
        return;
    const { x, y } = getLocation(e.clientX, e.clientY);
    var point = {
        x: x,
        y: y,
        color: ctx.strokeStyle,
        width: ctx.lineWidth,
        type: "end"


    }

    ctx.lineTo(x, y);
    arr.push(point);
    ctx.stroke();
    socket.emit("end", point);
    // lineTo
})
board.addEventListener("mouseup", function (e) {
    // console.log("I was called");
    ctx.closePath();
    isMouseDown = false;

    // ctx.closePath();
    // closepath
})
var interval = null;
var rinterval = null;
undo.addEventListener("mousedown", function () {
    interval = setInterval(function () {

        if (arr.length > 0) {
            rearr.push(arr.pop());
        }
        remove();
    }, 50);
    socket.emit("undoevent", "press");
})
redo.addEventListener("mouseup", function () {
    clearInterval(rinterval);
    socket.emit("redoevent", "release");
})

redo.addEventListener("mousedown", function () {
    rinterval = setInterval(function () {

        if (rearr.length > 0) {
            arr.push(rearr.pop());
        }
        remove();
    }, 50);
    socket.emit("redoevent", "press");
})
undo.addEventListener("mouseup", function () {
    clearInterval(interval);
    socket.emit("undoevent", "release");
})


function remove() {

    ctx.clearRect(0, 0, board.width, board.height);
    for (var i = 0; i < arr.length; i++) {
        let p = arr[i];
        if (p.type == "start") {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
        }
        else {
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
        }
    }

}
socket.on("onstart", function (point) {
    let x = point.x;
    let y = point.y;
    let color = point.color;
    let width = point.width;
    ctx.beginPath();
    ctx.moveTo(x, y);
    arr.push(point);


})
socket.on("onend", function (point) {
    let x = point.x;
    let y = point.y;
    let color = point.color;
    let width = point.width;
    //ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineTo(x, y);
    arr.push(point);
    ctx.stroke();



})
// getLocation()
socket.on("undoep", function (event) {
    
        interval = setInterval(function () {

            if (arr.length > 0) {
                rearr.push(arr.pop());
            }
            remove();
        }, 50);
    }
    
)
socket.on("undoer",function(){
    
        clearInterval(interval);

})
socket.on("redoep", function () {
    
        interval = setInterval(function () {

            if (rearr.length > 0) {
                arr.push(rearr.pop());
            }
            remove();
        }, 50);
    
    
       
    
})
socket.on("redoer",function(){
    clearInterval(rinterval);
})