document.querySelectorAll(".message__closer").forEach(messageCloser => {
  messageCloser.onclick = function() {
    messageCloser.parentNode.parentNode.removeChild(messageCloser.parentNode);
  }
});