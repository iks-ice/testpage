
document.querySelector("button").addEventListener("click", initConvertVideoProcess);

function initConvertVideoProcess(video) {
  const extensionId = "picpenoodfjockgobmppganpfnpfooio";
  chrome.runtime.sendMessage(extensionId, {
    message: "Подтвердите отправку видео для конвертации",
    video
  });
}
