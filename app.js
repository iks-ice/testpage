
document.querySelector("button").addEventListener("click", initConvertVideoProcess);

function initConvertVideoProcess() {
  const extensionId = "picpenoodfjockgobmppganpfnpfooio";
  chrome.runtime.sendMessage(extensionId, "Подтвердите отправку видео для конвертации", (res) => {
    if (res === "ok") {
      chrome.runtime.sendMessage(extensionId, "video sent");
    }
  })
}
