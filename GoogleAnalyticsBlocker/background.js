/*
    GoogleAnalyticsBlocker
    @author David Población Criado
    @version 1.2.1 28/03/2018
*/

var pattern = ["*://www.google-analytics.com/*", "*://ssl.google-analytics.com/*", "*://stats.g.doubleclick.net/*", "*/ga-lite.min.js", "*://www.googletagmanager.com/gtag/js*"];
var activate;
window.addEventListener("load",function(){
	browser.runtime.getPlatformInfo().then(function(item){
		// Check if the OS is android
		if(item.os=="android"){
			activateBlocker();
		}
		else{
			// Restore the stored state of the blocker
			browser.storage.local.get("activated").then(function(item){
				console.log(item);
				if (item.activated==undefined){
					browser.storage.local.set({activated: true});
					activate=true
				}else{
					activate=item.activated
				}
				if(activate) activateBlocker();
				else deactivateBlocker();
			},function(e){
			console.log(e);
		})
		}
	})
});
function block(requestDetails) {
	//console.log("Blocking Google Analytics");
	return {cancel: true};
}

browser.browserAction.onClicked.addListener(clicked);

function clicked() {
	if(activate){
		// If the blocker was activated
		deactivateBlocker();
	} else {
		// If the blocker was not activated
		activateBlocker();
	}
}
function activateBlocker(){
	browser.browserAction.setIcon({path:"icons/icon.svg"});
		//console.log("Blocking");
		browser.storage.local.set({activated: true});
		activate = true;
		browser.webRequest.onBeforeRequest.addListener(
			block,
			{urls: pattern},
			["blocking"]
		);
}
function deactivateBlocker(){
	browser.browserAction.setIcon({path:"icons/iconoff.svg"});
		//console.log("Not blocking");
		browser.storage.local.set({activated: false});
		activate = false;
		browser.webRequest.onBeforeRequest.removeListener(
			block,
			{urls: pattern},
			["blocking"]
		);
}
