var URL_IDENTIFIER = "youtube.com/watch";

var youtubeTabs = [];
var currentYoutubeTab = null;

//Browser Action Logic
chrome.browserAction.onClicked.addListener(function() {
    if(youtubeTabs.length > 0) {
        chrome.tabs.sendMessage(currentYoutubeTab, {text: "pause/play"}, function(paused) {
            if(paused) {
                chrome.tabs.executeScript(currentYoutubeTab, {code: 'document.getElementsByTagName("video")[0].play()'});
            }
            else {
                chrome.tabs.executeScript(currentYoutubeTab, {code: 'document.getElementsByTagName("video")[0].pause()'});
            }
        });
    }
    else {
        alert("No YouTube video is currently playing");
    }
});

//Logic when opening/changing url of youtube video tab
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if((changeInfo.url != undefined) && (changeInfo.url.indexOf(URL_IDENTIFIER) > -1)) {
        
        //Add only if not already in array
        if(youtubeTabs.indexOf(tabId) < 0) {
            youtubeTabs.push(tabId);    
        }
        currentYoutubeTab = tabId;

        //Inject content scripts
        chrome.tabs.executeScript(currentYoutubeTab, {file: "scripts/jquery-1.11.2.min.js"});
        chrome.tabs.executeScript(currentYoutubeTab, {file: "scripts/content.js"});

    }
    else if((changeInfo.url != undefined) && (youtubeTabs.indexOf(tabId) >= 0)) {   //checks for leaving youtube
        remove(tabId);
    }
    else if((changeInfo.url == undefined) && (youtubeTabs.indexOf(tabId) >= 0)) {   //checks for page reload
        chrome.tabs.executeScript({file: "scripts/jquery-1.11.2.min.js"});
        chrome.tabs.executeScript({file: "scripts/content.js"});
    }
});

//Logic when closing youtube video tab
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    if(youtubeTabs.indexOf(tabId) >= 0) {
        remove(tabId);
    }
});

//For removing tabs from the array
function remove(tabId) {
    youtubeTabs.splice(youtubeTabs.indexOf(tabId), 1);

    if(youtubeTabs.length === 0) {
        currentYoutubeTab = null;
    }
    else {
        currentYoutubeTab = youtubeTabs[youtubeTabs.length - 1];
    }
};
