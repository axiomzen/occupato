$(document).ready(function() {

  $('.mens').click(function(ev) {
    broadcastChangeFavorite('mens');
  });

  $('.womens').click(function(ev) {
    broadcastChangeFavorite('womens');
  });

  $('.shower').click(function(ev) {
    broadcastChangeFavorite('shower');
  });


  function broadcastChangeFavorite(newFavoriteBathroom) {
    chrome.runtime.sendMessage({
      action: 'changeFavoriteBathroom',
      bathroom: newFavoriteBathroom
    });
  }

});
