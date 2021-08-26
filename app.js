
var video = document.querySelector('video');
var constraints = window.constraints = {
  audio: false,
  video: true
};
var errorElement = document.querySelector('#errorMsg');

navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  var videoTracks = stream.getVideoTracks();
  stream.onremovetrack = function() {
    console.log('Stream ended');
  };
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
  video.play();
  initMediaRecorder(stream);
})
.catch((error) => console.log(error));


function initMediaRecorder(stream) {
  console.log("inited");
  const recordedChunks = [];

  const options = { mimeType: "video/webm; codecs=vp9" };
  const mediaRecorder = new MediaRecorder(stream, options);

  mediaRecorder.ondataavailable = handleDataAvailable;
 

  function handleDataAvailable(event) {
    console.log("data-available");
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
      console.log(recordedChunks);
      //download();
    } else {
      // ...
    }
  }


  document.querySelector("#convert").addEventListener("click", () => initConvertVideoProcess(recordedChunks));
  document.querySelector("#start").addEventListener("click", startRecord);
  document.querySelector("#stop").addEventListener("click", stopRecord);

  function startRecord() {
    console.log("recording started");
    mediaRecorder.start();
  }

  function stopRecord() {
    console.log("recording stoped");
    mediaRecorder.stop();
  }

  function initConvertVideoProcess(recordedChunks, options={}) {
    console.log(recordedChunks);
    console.log(new Blob(recordedChunks, {
      type: "video/webm"
    }));
    const extensionId = "picpenoodfjockgobmppganpfnpfooio";
    const blob = new Blob(recordedChunks, {
      type: "video/webm"
    });
    chrome.runtime.sendMessage(extensionId, {
      message: "Вы отправляете видео на конвертацию",
      video: blob,
      options
    });
  }
  function download() {
    var blob = new Blob(recordedChunks, {
      type: "video/webm"
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "test.webm";
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
