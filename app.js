
chrome.runtime.sendMessage("@@extension_id", {message: "I am message from web page"},
  function(response) {
   console.log(`response is ${response}`);
  });