function download() {
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = document.querySelector('.board').toDataURL()
    link.click();
    socket.emit("d");
}
