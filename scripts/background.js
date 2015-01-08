var URL_IDENTIFIER = "youtube.com/watch";

var paused = false;
var youtubeOn = false;
var youtubeTab = null;

//Browser Action Logic
chrome.browserAction.onClicked.addListener(function() {
	if(youtubeOn) {
		//get video state first (paused?)
		if(paused) {
			chrome.tabs.executeScript(youtubeTab, {code: 'document.getElementsByTagName("video")[0].play()'});
			paused = false;
		}
		else {
			chrome.tabs.executeScript(youtubeTab, {code: 'document.getElementsByTagName("video")[0].pause()'});
			paused = true;
		}
	}
	else {
		alert("No YouTube video is currently playing");
	}
});

//Logic when opening/changing url of youtube video tab
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if((changeInfo.url != undefined) && (changeInfo.url.indexOf(URL_IDENTIFIER) > -1)) {
		youtubeTab = tabId;
		youtubeOn = true;

	// chrome.tabs.executeScript({file: "scripts/jquery-1.11.2.min.js"});
 	// chrome.tabs.executeScript({file: "scripts/content.js"});

	}
	else if((changeInfo.url != undefined) && (tabId === youtubeTab)) {
		youtubeOn = false;
		paused = false;
	}
});

//Logic when closing youtube video tab
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
	if(youtubeTab != null && youtubeTab == tabId) {
		youtubeOn = false;
		youtubeTab = null;
	}
});