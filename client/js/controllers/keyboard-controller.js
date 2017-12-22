// Keep track of which keys are being held so we don't have to emit more than once.
const keysDown = {};

function createKeyboardController({ env, cozmoController }) {
  document.addEventListener("keydown", function (event) {
    const keyCode = event.keyCode || event.which;
    if (event.ctrlKey) {
      return;
    }

    if (keysDown[keyCode] === true) {
      return
    }
    keysDown[keyCode] = true;

    switch (keyCode) {
      // SHIFT
      case 16:
        cozmoController.speedOn();
        break;

      // ALT
      case 18:
        cozmoController.slowOn();
        break;

      // I
      case 73:
        cozmoController.toggleIRLight();
        break;

      // P
      case 80:
        cozmoController.toggleFreePlay();
        break;

      default:
        cozmoController.keyDown(keyCode);
    }
  });

  document.addEventListener("keyup", function (event) {
    const keyCode = event.keyCode || event.which;
    delete keysDown[keyCode];
    if (event.ctrlKey) {
      return
    }

    switch (keyCode) {
      // SHIFT
      case 16:
        cozmoController.speedOff();
        break;

      // ALT
      case 18:
        cozmoController.slowOff();
        break;

      default:
        cozmoController.keyUp(keyCode);
    }
  });
}

export default createKeyboardController
