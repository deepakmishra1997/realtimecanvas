var isstickydown = false;
var initialx = null;
var initialy = null;
function createSticky() {
    const body = document.querySelector("body");
    // create
    const stickyPad = document.createElement("div")
    const NavBar = document.createElement("div")
    const cgreen = document.createElement("div");
    const cred = document.createElement("div");
    cgreen.setAttribute("class", "cGreen");
    cred.setAttribute("class", "cRed");


    const writingPad = document.createElement("div");
    const textArea = document.createElement("textArea");
    // styling set
    stickyPad.setAttribute("class", "sticky");
    NavBar.setAttribute("class", "nav-bar");
    writingPad.setAttribute("class", "writingPad");
    textArea.setAttribute("class", "text-area");
    // added to html
    NavBar.appendChild(cred);
    NavBar.appendChild(cgreen);
    stickyPad.appendChild(NavBar);
    stickyPad.appendChild(writingPad);
    writingPad.appendChild(textArea);
    body.appendChild(stickyPad);

    stickyPad.addEventListener("mousedown", function (e) {
        isstickydown = true;
        initialx = e.clientX;
        initialy = e.clientY;
        var p = {
            x: initialx,
            y: initialy
        }
        socket.emit("md", p);


    })
    stickyPad.addEventListener("mousemove", function (e) {
        if (isstickydown == false) {
            return;
        }


        var finalx = e.clientX;
        var finaly = e.clientY;
        var diffx = finalx - initialx;
        var diffy = finaly - initialy;
        var { left, top } = stickyPad.getBoundingClientRect();
        stickyPad.style.top = top + diffy + "px";
        stickyPad.style.left = left + diffx + "px";
        initialy = finaly;
        initialx = finalx;
        var p = {
            x: finaly,
            y: finalx,
        }
        socket.emit("mv", p);

    })
    stickyPad.addEventListener("mouseleave", function () {
        isstickydown = false;
        socket.emit("ml", false);

    })
    let isminimized = false;
    cgreen.addEventListener("click", function () {
        if (isminimized == false) {
            writingPad.style.display = "none";
        }
        else {
            writingPad.style.display = "block";
        }

        isminimized = !isminimized;

    }

    )

    cred.addEventListener("click", function () {
        stickyPad.remove();
    })

}
socket.on("press", function (p) {

    initialx = p.x;
    initialy = p.y;
    isstickydown = true;

})
socket.on("move", function (p) {

    var diffx = p.x - initialx;
    var diffy = p.y - initialy;
    var { left, top } = stickyPad.getBoundingClientRect();
    stickyPad.style.top = top + diffy + "px";
    stickyPad.style.left = left + diffx + "px";
    initialy = p.y;
    initialx = p.x;

})
socket.on("leave", function (p) {
    isstickydown = p;
})