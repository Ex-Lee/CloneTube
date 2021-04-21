const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recored.mp4";
  document.body.appendChild(link);
  link.click();
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.removeEventListener("click", getVideo);
  recordBtn.addEventListener("click", stopRecording);
};

const stopRecording = () => {
  videoRecorder.stop();
  videoPreview.srcObject = null;
  const tracks = streamObject.getTracks();
  tracks.forEach((element) => {
    element.stop();
  });
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start Recording";
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: { min: 1280 },
        height: { min: 720 },
      },
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    streamObject = stream;
    recordBtn.innerHTML = "Stop Recording";
    videoPreview.play();
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "can't Record";
    recordBtn.removeEventListener("click", getVideo);
  }
};

const init = () => {
  recordBtn.addEventListener("click", getVideo);
};

if (recorderContainer) {
  init();
}
