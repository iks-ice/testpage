const id = "sfsfsfsfergerkmgmg";
chrome.runtime.sendMessage(id, "I am message from web page",
  function(response) {
   console.log(`response is ${response}`);
  });