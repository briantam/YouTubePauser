var videoElem = [];

$(document).ready(function() {
	window.setTimeout(checkForVideo, 2000);		//allow time for video to fully load
});

function checkForVideo () {
	videoElem = document.getElementsByTagName('video');
    var video = videoElem[0];
    if( $(video).attr("data-youtube-id") == "undefined" ) {
    	window.setTimeout(checkForVideo, 1000);
    }
    else {
    	console.log($(video).attr("data-youtube-id") );
    }
};

//http://stackoverflow.com/questions/19758028/chrome-extension-get-dom-content
//chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse))