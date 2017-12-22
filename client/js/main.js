import Store from './store.js';
import createCameraView from './views/camera-view.js';
import CozmoController from './controllers/cozmo-controller.js';
import createMouseController from './controllers/mouse-controller.js';
import createKeyboardController from './controllers/keyboard-controller.js';
import createVisibilityChangeController from './controllers/visibilitychange-controller.js';
import createSocket from './socket.js';

window.addEventListener('load', () => {
  const dependencies = {
    env: {
      SERVER: process.env.SERVER || 'localhost:5000',
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
    }),
  }

  dependencies.cozmoController = new CozmoController(dependencies)

  createCameraView(dependencies);
  createMouseController(dependencies);
  createKeyboardController(dependencies);
  createVisibilityChangeController(dependencies);

  dependencies.socket = createSocket(dependencies);
});
