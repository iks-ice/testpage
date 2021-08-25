chrome.runtime.sendMessage("I am message from web page",
  function(response) {
   console.log(`response is ${response}`);
  });