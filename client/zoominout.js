const zoomin = document.querySelector(".zoomin");
const zoomout = document.querySelector(".zoomout");
zoomin.addEventListener("click", function () {
    ctx.scale(1.1, 1.1);
    ctx.translate(-60, -10);
    remove();
    socket.emit("zoominout",+1);
})
zoomout.addEventListener("click", function () {
    ctx.scale(0.9, 0.9);
    ctx.translate(-60, -10);
    remove();
    socket.emit("zoominout", -1);
})
socket.on("zoominout2",function(p){
    if(p>0)
    {
        ctx.scale(1.1, 1.1);
        ctx.translate(-60, -10);
        remove();
    }
    else
    {
        ctx.scale(0.9, 0.9);
        ctx.translate(-60, -10);
        remove();
    }
})
