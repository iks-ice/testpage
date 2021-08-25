
document.querySelector("button").addEventListener("click", initConvertVideoProcess);

function initConvertVideoProcess() {
  const extensionId = "picpenoodfjockgobmppganpfnpfooio";
  const port = chrome.runtime.connect(extensionId, {name: "Подтвердите отправку видео для конвертации"});
  port.postMessage({message: "Подтвердите отправку видео для конвертации"});
}
