$(document).ready(function() {
  $('.mens').click(function(ev) {
    broadcastChange('mens');
  });

  $('.womens').click(function(ev) {
    broadcastChange('womens');
  });

  $('.shower').click(function(ev) {
    broadcastChange('shower');
  });

  function broadcastChange(newFavoriteBathroom) {
    chrome.runtime.sendMessage({
      action: 'changeFavoriteBathroom',
      bathroom: newFavoriteBathroom
    });
  }


  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'statusChanged') {
      console.log('RECEIVED NEW STATUS', request.bathroomStatus);
      $('.status').removeClass('occupied');
    }
  });

});
