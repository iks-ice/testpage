
var video = document.querySelector('video');
var constraints = window.constraints = {
  audio: false,
  video: true
};
var errorElement = document.querySelector('#errorMsg');

const getMedia = async (constraints) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    video.play();
    initMediaRecorder(stream);
  } catch (error) {
    console.log(error)
  }
}
getMedia(constraints);


function initMediaRecorder(stream) {
  let recordedChunks = [];

  const options = { mimeType: "video/webm; codecs=vp9" };
  const mediaRecorder = new MediaRecorder(stream, options);

  mediaRecorder.ondataavailable = handleDataAvailable;
 
  function handleDataAvailable(event) {
    console.log("data-available");
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    } 
  }


  document.querySelector("#convert").addEventListener("click", () => initConvertVideoProcess(recordedChunks));
  document.querySelector("#start").addEventListener("click", startRecord);
  document.querySelector("#stop").addEventListener("click", stopRecord);

  function startRecord() {
    recordedChunks = [];
    if (mediaRecorder.state === "recording") {
      return;
    }
    console.log("recording started");
    mediaRecorder.start();
  }

  function stopRecord() {
    if (mediaRecorder.state === "inactive") {
      return;
    }
    mediaRecorder.stop();
  }

  async function initConvertVideoProcess(recordedChunks, options={}) {

    const extensionId = "picpenoodfjockgobmppganpfnpfooio";
    const videoBlob = new Blob(recordedChunks, {
      type: "video/webm"
    });
    chrome.runtime.sendMessage(extensionId, {
      video: videoBlob,
    });
  }
  // function download() {
  //   var blob = new Blob(recordedChunks, {
  //     type: "video/webm"
  //   });
  //   var url = URL.createObjectURL(blob);
  //   var a = document.createElement("a");
  //   document.body.appendChild(a);
  //   a.style = "display: none";
  //   a.href = url;
  //   a.download = "test.webm";
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // }
}
