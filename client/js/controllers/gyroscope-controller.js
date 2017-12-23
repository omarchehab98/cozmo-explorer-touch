function createGyroscopeController({ env, cozmoController }) {
  let prevZone

  window.addEventListener('deviceorientation', event => {
    const inversion = window.orientation / 90
    const normalizedRotation = Math.max(-1, Math.min(1, event.beta * inversion / 30))

    const zone = getZone(3, normalizedRotation)

    switch (zone) {
      case 1:
        if(zone !== prevZone) {
          cozmoController.slowOn();
        }
        cozmoController.leftOff();
        cozmoController.rightOn();
        break;

      case 0:
        if(zone !== prevZone) {
          cozmoController.slowOff();
        }
        cozmoController.leftOff();
        cozmoController.rightOff();
        break;

      case -1:
        if(zone !== prevZone) {
          cozmoController.slowOn();
        }
        cozmoController.rightOff();
        cozmoController.leftOn();
        break;
    }

    prevZone = zone
  })
}

function getZone(zoneCount, magnitude) {
  return Math.max(1, Math.ceil(zoneCount * (magnitude + 1) / 2)) - (zoneCount + 1) / 2
}

export default createGyroscopeController
