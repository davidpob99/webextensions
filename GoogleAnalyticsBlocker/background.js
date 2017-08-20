
  var pattern = "*://www.google-analytics.com/*";
  function block(requestDetails) {
    console.log("Blocking Google Analytics");
    return {cancel: true};
  }

  browser.webRequest.onBeforeRequest.addListener(
    block,
    {urls:[pattern]},
    ["blocking"]
  );
