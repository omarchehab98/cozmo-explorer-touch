function createFullscreenController({ env, server }) {
  const fullscreenView = document.getElementById('fullscreen');

  fullscreenView.addEventListener('click', () => {
    launchIntoFullscreen(document.documentElement);
  })
}

function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

export default createFullscreenController
