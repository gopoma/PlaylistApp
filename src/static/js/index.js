document.querySelectorAll(".message__closer").forEach(messageCloser => {
  messageCloser.onclick = function() {
    messageCloser.parentNode.parentNode.removeChild(messageCloser.parentNode);
  }
});

const addBtns = document.querySelectorAll(".addBtn")
addBtns.forEach(btn => {
  btn.onclick = async evt => {
    const idSong = evt.target.dataset.idSong;
    const playlistElement = document.querySelector(`#playlistElement${idSong}`);
    const response = await fetch(`/playlists/relatedPlaylists/${idSong}`);
    const relatedPlaylists = await response.json();
    relatedPlaylists.forEach(relatedPlaylist => {
      playlistElement.innerHTML += `
        <a class="p-2 inline-flex gap-2 items-center hover:bg-emerald-900" href="/playlists/${!relatedPlaylist.containsSong?"addSong":"removeSong"}?idPlaylist=${relatedPlaylist.id}&idSong=${idSong}">
          <input ${relatedPlaylist.containsSong?"checked":""} type="checkbox" class="form-checkbox h-6 w-6">
          <span class="ml-3 text-lg">${relatedPlaylist.name}</span>
        </a>
      `;
    });
    evt.target.nextElementSibling.classList.toggle("hidden");
  }
});