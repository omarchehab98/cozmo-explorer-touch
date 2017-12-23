class CozmoController {
  constructor(dependencies) {
    this.dependencies = dependencies
    this.keysDown = {}
    this.isSpeedOn = false
    this.isSlowOn = false
  }

  forwardOn() {
    return this.keyDown(87);
  }

  forwardOff() {
    return this.keyUp(87);
  }

  backwardOn() {
    return this.keyDown(83);
  }

  backwardOff() {
    return this.keyUp(83);
  }

  rightOn() {
    return this.keyDown(68);
  }

  rightOff() {
    return this.keyUp(68);
  }

  leftOn() {
    return this.keyDown(65);
  }

  leftOff() {
    return this.keyUp(65);
  }

  liftRaiseOn() {
    return this.keyDown(82);
  }

  liftRaiseOff() {
    return this.keyUp(82);
  }

  liftLowerOn() {
    return this.keyDown(70);
  }

  liftLowerOff() {
    return this.keyUp(70);
  }

  headRaiseOn() {
    return this.keyDown(81);
  }

  headRaiseOff() {
    return this.keyUp(81);
  }

  headLowerOn() {
    return this.keyDown(69);
  }

  headLowerOff() {
    return this.keyUp(69);
  }

  speedOn() {
    if (this.isSpeedOn) {
      return
    }
    const {
      socket,
      store,
    } = this.dependencies
    this.isSpeedOn = true
    store.setState({ isShiftDown: 1 })
    socket.emit('keydown', {
      keyCode: 16,
      hasShift: 1,
      hasCtrl: 0,
      hasAlt: 0
    });
  }

  speedOff() {
    if (!this.isSpeedOn) {
      return
    }
    const {
      socket,
      store,
    } = this.dependencies
    this.isSpeedOn = false;
    store.setState({ isShiftDown: 0 })
    socket.emit('keyup', {
      keyCode: 16,
      hasShift: 0,
      hasCtrl: 0,
      hasAlt: 0
    });
  }

  slowOn() {
    if (this.isSlowOn) {
      return
    }
    const {
      socket,
      store,
    } = this.dependencies
    this.isSlowOn = true
    store.setState({ isAltDown: 1 })
    socket.emit('keydown', {
      keyCode: 18,
      hasShift: 0,
      hasCtrl: 0,
      hasAlt: 1
    });
  }

  slowOff() {
    if (!this.isSlowOn) {
      return
    }
    const {
      socket,
      store,
    } = this.dependencies
    this.isSlowOn = false
    store.setState({ isAltDown: 0 })
    socket.emit('keyup', {
      keyCode: 18,
      hasShift: 0,
      hasCtrl: 0,
      hasAlt: 0
    });
  }

  toggleIRLight() {
    const {
      socket,
      store,
    } = this.dependencies
    const isHeadlightEnabled = !store.state.isHeadlightEnabled
    store.setState({ isHeadlightEnabled })
    socket.emit('setHeadlightEnabled', { isHeadlightEnabled });
  }
  
  toggleFreePlay() {
    const {
      socket,
      store,
    } = this.dependencies
    const isFreeplayEnabled = !store.state.isFreeplayEnabled
    store.setState({ isFreeplayEnabled })
    socket.emit('setFreeplayEnabled', { isFreeplayEnabled });
  }

  keyDown(keyCode) {
    if (this.keysDown[keyCode]) {
      return
    }
    const {
      socket,
      store,
    } = this.dependencies
    this.keysDown[keyCode] = true
    socket.emit('keydown', {
      keyCode,
      hasShift: store.state.isShiftDown,
      hasCtrl: store.state.isCtrlDown,
      hasAlt: store.state.isAltDown
    });
  }

  keyUp(keyCode) {
    if (!this.keysDown[keyCode]) {
      return;
    }
    const {
      socket,
      store,
    } = this.dependencies
    this.keysDown[keyCode] = false
    socket.emit('keyup', {
      keyCode,
      hasShift: store.state.isShiftDown,
      hasCtrl: store.state.isCtrlDown,
      hasAlt: store.state.isAltDown
    });
  }
}

export default CozmoController
