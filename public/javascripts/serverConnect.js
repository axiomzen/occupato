var socket = io();

socket.on('update', function (data) {
  console.log(data);
  $("#mens").text(data.mens);
  if (data.mens === "occupied") {
    $(".occupato-mens").addClass("occupato-occupied");
  } else {
    $(".occupato-mens").removeClass("occupato-occupied");
  }
  $("#womens").text(data.womens);
  if (data.womens === "occupied") {
    $(".occupato-womens").addClass("occupato-occupied");
  } else {
    $(".occupato-womens").removeClass("occupato-occupied");
  }
  $("#shower").text(data.shower);
  if (data.shower === "occupied") {
    $(".occupato-shower").addClass("occupato-occupied");
  } else {
    $(".occupato-shower").removeClass("occupato-occupied");
  }
});
