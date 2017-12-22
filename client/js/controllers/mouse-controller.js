const controlButtons = [
  // Forward
  "ctrl_btn_W",
  // Back
  "ctrl_btn_S",
  // Left
  "ctrl_btn_A",
  // Right
  "ctrl_btn_D",
  // Head up
  "ctrl_btn_Q",
  // Head down
  "ctrl_btn_E",
  // Arm up
  "ctrl_btn_R",
  // Arm down
  "ctrl_btn_F"
].map((id) => document.getElementById(id));
// Speed up
const stateShiftButton = document.getElementById("ctrl_state_SHIFT");
// Slow down
const stateAltButton = document.getElementById("ctrl_state_ALT");
// Toggle IR headlight
const toggleIButton = document.getElementById("ctrl_toggle_I");
// Toggle free play mode
const togglePButton = document.getElementById("ctrl_toggle_P");

function createMouseController({ env, store, cozmoController }) {
  controlButtons.forEach(button => {
    const keyCode = buttonIdToKeyCode(button.id)
    button.addEventListener('mousedown', () => cozmoController.keyDown(keyCode));
    button.addEventListener('mouseup', () => cozmoController.keyUp(keyCode));
  });

  stateShiftButton.addEventListener('mousedown', () => cozmoController.speedOn());
  stateShiftButton.addEventListener('mouseup', () => cozmoController.speedOff());

  stateAltButton.addEventListener('mousedown', () => cozmoController.slowOn());
  stateAltButton.addEventListener('mouseup', () => cozmoController.slowOff());

  toggleIButton.addEventListener('click', () => cozmoController.toggleIRLight());

  togglePButton.addEventListener('click', () => cozmoController.toggleFreePlay());
}

function buttonIdToKeyCode(buttonId) {
  return {
    // Forward
    "ctrl_btn_W": 87,
    // Back
    "ctrl_btn_S": 83,
    // Left
    "ctrl_btn_A": 65,
    // Right
    "ctrl_btn_D": 68,
    // Head up
    "ctrl_btn_Q": 81,
    // Head down
    "ctrl_btn_E": 69,
    // Arm up
    "ctrl_btn_R": 82,
    // Arm down
    "ctrl_btn_F": 70,
    // Speed up
    "ctrl_state_SHIFT": 16,
    // Slow down
    "ctrl_state_ALT": 18,
    // IR light toggle
    "ctrl_toggle_I": 73,
    // Free Play toggle
    "ctrl_toggle_P": 80
  }[buttonId]
}

export default createMouseController
