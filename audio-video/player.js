let player;

const audio = document.getElementById("mp3player");

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

function onYouTubeIframeAPIReady () {
  player = new YT.Player('player', {
    height: '360',
    with: '640',
    videoId: 'Ox-PJ4WWBAE',
    event: {
      onReady: onPlayerReady
    }
  })
}

function onPlayerReady(event) {
  console.log('Player está pronto', event)
} 

function tocarVideo () {  
  player?.playVideo();
}

function pausarVideo () {
  player?.pauseVideo();
}

function mudarParaSegundo (segundo) {
  player?.seekTo(segundo, true);
}

function tocarMp3 () {      
  audio?.play();
}

function pausarMp3 () {
  audio?.pause();
}