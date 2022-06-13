document.querySelectorAll(".message__closer").forEach(messageCloser => {
  messageCloser.onclick = function() {
    messageCloser.parentNode.parentNode.removeChild(messageCloser.parentNode);
  }
});

const addBtns = document.querySelectorAll(".addBtn")
addBtns.forEach(btn => {
  btn.onclick = evt =>{
    evt.target.nextElementSibling.classList.toggle("hidden");
  }
});