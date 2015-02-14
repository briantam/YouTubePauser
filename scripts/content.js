var videoElem = [];
var video;

$(document).ready(function() {
    window.setTimeout(checkForVideo, 2000);		//set delay so video can fully load
    if(document.getElementById("speed-buttons") == null) {
        createButtons();                        //create the speed buttons
    }
});

//Gets reference to video once fully loaded
function checkForVideo () {
	videoElem = document.getElementsByTagName('video');
    video = videoElem[0];
    
    if( video == "undefined" || video == null) {
    	window.setTimeout(checkForVideo, 1000);
    }
};

//Create the div for the speed buttons and the actual buttons themselves
function createButtons() {
    //Speeds to use
    var speeds = [1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 4.0, 5.0, 6.0];
    //Will append our div to this object
    var playerRef = document.getElementById("player");

    //Create the buttonsDiv to hold the buttons
    var buttonsDiv = document.createElement("div");
    buttonsDiv.id = "speed-buttons";
    buttonsDiv.style.height = "25px";
    buttonsDiv.className = "player-width";
    buttonsDiv.style.textAlign = "center";

    //Create the speedButtons
    var buttons = [];
    for(var i = 0; i < speeds.length; i++) {
        var button = document.createElement("button");

        //Create the speed attribute
        var attr = document.createAttribute("speed");
        attr.value = speeds[i];
        button.setAttributeNode(attr);

        //Set the other attributes
        button.type = "button";
        button.style.width = "75px";
        button.style.padding = "0px 5px";
        button.style.margin = "5px 2px 0px 2px";
        button.style.border = "1px gray solid";
        button.style.fontSize = "12px";
        button.innerHTML = speeds[i].toString() + "x";
        button.className = "yt-uix-button yt-uix-button-size-default yt-uix-button-default yt-uix-button-content";

        //Assign our event handler to onclick event
        button.onclick = function() {
            video.playbackRate = parseFloat(this.getAttribute("speed"));
        };

        //Add to buttons array to store references
        buttons.push(button);
    }

    //Append to speedButtons to the buttonsDiv
    for (var i = 0; i < buttons.length; i++) {
        buttonsDiv.appendChild(buttons[i]);
    }

    //Append buttonDiv to the playerRef object
    playerRef.appendChild(buttonsDiv);
};

//Listen for the pause/play message sent during browser action
chrome.runtime.onMessage.addListener(function(message, sender, response) {
    if(message.text == "pause/play") {
       response(video.paused);
    }
});