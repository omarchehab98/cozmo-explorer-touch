import defer from 'lodash/defer';

const camera = document.getElementById('camera')
let cameraSrc
let cameraPlaceholderSrc

function createCamera({ env, store }) {
  cameraSrc = `${env.HTTP}://${env.SERVER}/cozmoImage`

  store.on('change', (prevState, newState) => {
    // If connectivity to server changed
    if (newState.connected !== prevState.connected) {
      if (newState.connected === true) {
        defer(startCamera)
      } else if (newState.connected === false) {
        defer(stopCamera)
      }
    }
  })
}

function startCamera() {
  cameraPlaceholderSrc = camera.src
  camera.src = cameraSrc
}

function stopCamera() {
  camera.src = cameraPlaceholderSrc
  cameraPlaceholderSrc = undefined
}

export default createCamera
