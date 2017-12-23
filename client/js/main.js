import Store from './store.js';
import createCameraView from './views/camera-view.js';
import createBatteryLowView from './views/battery-low-view.js';
import createBatteryChargingView from './views/battery-charging-view.js';
import CozmoController from './controllers/cozmo-controller.js';
import createMouseController from './controllers/mouse-controller.js';
import createKeyboardController from './controllers/keyboard-controller.js';
import createTouchController from './controllers/touch-controller.js';
import createGyroscopeController from './controllers/gyroscope-controller.js';
import createFullscreenController from './controllers/fullscreen-controller.js';
import createVisibilityChangeController from './controllers/visibilitychange-controller.js';
import createSocket from './socket.js';

window.addEventListener('load', () => {
  const dependencies = {
    env: {
      SERVER: process.env.SERVER || 'localhost',
      HTTP: process.env.SSL === 'yes' ? 'https' : 'http',
      WS: process.env.SSL === 'yes' ? 'wss' : 'ws',
    },
    store: new Store({
      connected: false,
      isFreeplayEnabled: false,
      isHeadlightEnabled: false,
      isShiftDown: 0,
      isAltDown: 0,
      isCtrlDown: 0,
      batteryVoltage: 4.5,
      isCharging: false,
      isFalling: false,
      isPickedUp: false,
    }),
  }

  dependencies.cozmoController = new CozmoController(dependencies)

  createCameraView(dependencies);
  createBatteryLowView(dependencies);
  createBatteryChargingView(dependencies);
  createMouseController(dependencies);
  createKeyboardController(dependencies);
  createTouchController(dependencies);
  createGyroscopeController(dependencies);
  createFullscreenController(dependencies);
  createVisibilityChangeController(dependencies);

  dependencies.socket = createSocket(dependencies);

  // On mobile, clicking and holding opens the context menu,
  // Since our controls require holding we should disable the context menu.
  document.addEventListener('contextmenu', event => {
    event.preventDefault();
    return false
  })

  // Disable IOS Safari's bouncing and overflow
  document.addEventListener('touchmove', event => event.preventDefault())
});
