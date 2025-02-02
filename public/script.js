const socket = io()
const messages = document.querySelector('section ul')
const input = document.querySelector('input')
const video = document.querySelector('video')
const canvas = document.querySelector('canvas')
let emotion = 'neutral'



/// face api
window.addEventListener('load', () => {
  loadFacialRecognition()
})

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
  if (input.value) {
    socket.emit('message', { value: input.value, emotion,  })
    input.value = ''
  }
})


socket.on('message', function(message) {
  const element = document.createElement('li')
  const p = document.createElement('p')
  p.textContent = message.value
  element.style.setProperty('--background', `var(--${message.emotion})`)
  element.appendChild(p)
  messages.appendChild(element)
  messages.scrollTop = messages.scrollHeight

  
  function take_snapshot(){
    Webcam.snap(function(data_uri){
      const result = document.querySelector('#result')
      result.innerHTML = 
      '<img src="'+data_uri+'"/>';
      element.appendChild(result)
    })
  } 

  take_snapshot()
})

async function loadFacialRecognition() {

  await Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('./models'), faceapi.nets.faceLandmark68Net.loadFromUri('./models'), faceapi.nets.faceRecognitionNet.loadFromUri('./models'), faceapi.nets.faceExpressionNet.loadFromUri('./models')])
  /** @type MediaStream */
  let stream
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: {min: 1024, ideal: 1280, max: 1920},
        height: {min: 576, ideal: 1280, max: 1920},
        facingMode: 'user',
      },
    })
  } catch (err) {
    console.error(err)
  }

  video.srcObject = stream
  video.onloadedmetadata = function(e) {
    video.play()
  };
}

video.addEventListener('play', detectEmotion)

function detectEmotion() {
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

    if (detections.length > 0) {
      //For each face detection
      detections.forEach((element) => {
        let status = ''
        let valueStatus = 0.0
        for (const [key, value] of Object.entries(element.expressions)) {
          if (value > valueStatus) {
            status = key
            valueStatus = value
          }
        }
        emotion = status

      })
    } else {
      emotion = 'neutral'
    }
    input.style.setProperty('--border', `var(--${emotion})`)
  }, 1000)

  Webcam.set({
    width:350,
    height:200,
    image_format:"jpeg",
    jpeg_quality:90
  })
  
  Webcam.attach('#camera')
}
