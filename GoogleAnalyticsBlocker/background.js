/*
    GoogleAnalyticsBlocker
    @author David Población Criado
    @version 1.1.0 30/01/2018
*/

var pattern = ["*://www.google-analytics.com/*", "*://ssl.google-analytics.com/*"];
var activate;
window.addEventListener("load",function(){    
   	activate = true;
	browser.webRequest.onBeforeRequest.addListener(
		block,
		{urls: pattern},
		["blocking"]
	);
});
function block(requestDetails) {
	// console.log("Blocking Google Analytics");
	return {cancel: true};
}

browser.browserAction.onClicked.addListener(clicked);
function clicked() {
	if(activate){
		// If the blocker was activated
		browser.browserAction.setIcon({path:"icons/iconoff.svg"});
		// console.log("Not blocking");
		activate = false;
		browser.webRequest.onBeforeRequest.removeListener(
			block,
			{urls: pattern},
			["blocking"]
		);
	} else {
		// If the blocker was not activated
		browser.browserAction.setIcon({path:"icons/icon.svg"});
		// console.log("Blocking");
		activate = true;
		browser.webRequest.onBeforeRequest.addListener(
			block,
			{urls: pattern},
			["blocking"]
		);
	}
}

