var socket = io();

socket.on('update', function (data) {
    console.log(data);
});
