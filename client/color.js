
function changecolor(color)
{
    ctx.strokeStyle=color;
    socket.emit("changescolor",color);
}
socket.on("change-color", function (color){
    ctx.strokeStyle = color;
})
