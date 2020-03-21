
console.log("Inside tool");
let isActive = "pencil";
let pencilOptions = document.querySelector(".pencil-options")
let eraserOptions = document.querySelector(".eraser-options")
var t = null;
var act = null;
function handleClick(tool) {
   
    if (tool == "pencil") {
        t ="pencil";
        if (isActive == "pencil") {
            act = "pencil";
            pencilOptions.classList.add("show")
        } else {
            isActive = "pencil";
            act ="eraser"
            ctx.strokeStyle = "black";
            eraserOptions.classList.remove("show")

        }
        var p = {
            t: t,
            act: act,
        }
        socket.emit("tools", p);  
    } else if (tool == "eraser") {
        t = "eraser"
        if (isActive == "eraser") {
            act = "eraser"
            eraserOptions.classList.add("show")
        } else {
            isActive = "eraser";
            act="pencil";
            pencilOptions.classList.remove("show")

            ctx.strokeStyle = "white";
        }
        var p = {
            t: t,
            act: act,
        }
        socket.emit("tools", p); 

    } else if (tool == "sticky") {
        createSticky();
       socket.emit("createsticky","");
    }
}


let inputArr = document.getElementsByTagName("input");
inputArr[0].addEventListener("change", function (e) {
    ctx.lineWidth = inputArr[0].value
})

socket.on("sticky",function(tool){
    createSticky();
})
socket.on("pe", function (p) {
    if (p.t == "pencil") {
        if (p.act == "pencil") {
            pencilOptions.classList.add("show")
        }
        else {
            isActive = "pencil";

            ctx.strokeStyle = "black";
            eraserOptions.classList.remove("show")

        }
    }
    else if (p.t =="eraser") {
        if (p.act =="eraser") {
            eraserOptions.classList.add("show")
        }
        else {
            isActive = "eraser";

            pencilOptions.classList.remove("show")

            ctx.strokeStyle = "white";
        }
    }
})