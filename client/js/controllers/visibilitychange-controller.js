const keyCodes = [
  // Forward
  87,
  // Back
  83,
  // Left
  65,
  // Right
  68,
  // Head up
  81,
  // Head down
  69,
  // Arm up
  82,
  // Arm down
  70
]

function createVisibilityChangeController({ store, cozmoController }) {
  var hidden = "hidden";

  // Standards:
  if (hidden in document) {
    document.addEventListener("visibilitychange", onVisibilityChange);
  } else if ((hidden = "mozHidden") in document) {
    document.addEventListener("mozvisibilitychange", onVisibilityChange);
  } else if ((hidden = "webkitHidden") in document) {
    document.addEventListener("webkitvisibilitychange", onVisibilityChange);
  } else if ((hidden = "msHidden") in document) {
    document.addEventListener("msvisibilitychange", onVisibilityChange);
  }
  // IE 9 and lower:
  else if ("onfocusin" in document) {
    document.onfocusin = document.onfocusout = onVisibilityChange;
  }
  // All others:
  else {
    window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onVisibilityChange;
  }

  function onVisibilityChange (event) {
    if (event.type === 'hidden') {
      keyCodes.forEach(keyCode => cozmoController.keyUp(keyCode));
      cozmoController.speedOff();
      cozmoController.slowOff();
    }
  }
}

export default createVisibilityChangeController;
