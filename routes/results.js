var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("video", {
    height: '390',
    width: '640',
    videoId: '6CGyASDjE-U',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });

  
} 

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
   //event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    //setTimeout(stopVideo, 6000);
    //done = true;
  }
}


function autoPlay() {
  
  var rect = document.getElementById('video').getBoundingClientRect();
  if (rect.top >=0 && rect.bottom <= (window.innerHeight)){
    player.playVideo();
    console.log("Inside viewport");
  }
  else {
    player.pauseVideo();
    console.log ("outside viewport");
  }
}

window.addEventListener('scroll', autoPlay);

