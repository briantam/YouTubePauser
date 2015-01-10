var videoElem = [];
var video;

$(document).ready(function() {
	window.setTimeout(checkForVideo, 2000);		//set delay so video can fully load
});

//Gets reference to video once fully loaded
function checkForVideo () {
	videoElem = document.getElementsByTagName('video');
    video = videoElem[0];
    if( $(video).attr("data-youtube-id") == "undefined" ) {
    	window.setTimeout(checkForVideo, 1000);
    }
    else {
    	console.log($(video).attr("data-youtube-id") );
    }
};

//Listen for the pause/play message sent during browser action
chrome.runtime.onMessage.addListener(function(message, sender, response) {
    if(message.text == "pause/play") {
       response(video.paused);
    }
});