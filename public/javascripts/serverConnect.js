var socket = io();

socket.on('update', function (data) {
  console.log(data);
  $("#mens").text(data.mens);
  $("#womens").text(data.womens);
  $("#shower").text(data.shower);
});
