import defer from 'lodash/defer';

let cameraSrc
let cameraPlaceholderSrc

function createCamera({ env, store }) {
  const cameraView = document.getElementById('camera')
  cameraSrc = `${env.HTTP}://${env.SERVER}/cozmoImage`

  store.on('change', (prevState, newState) => {
    // If connectivity to server changed
    if (newState.connected !== prevState.connected) {
      if (newState.connected === true) {
        defer(startCamera.bind(null, cameraView))
      } else if (newState.connected === false) {
        defer(stopCamera.bind(null, cameraView))
      }
    }
  })
}

function startCamera(cameraView) {
  cameraPlaceholderSrc = cameraView.src
  cameraView.src = cameraSrc
}

function stopCamera(cameraView) {
  cameraView.src = cameraPlaceholderSrc
  cameraPlaceholderSrc = undefined
}

export default createCamera
