class CozmoController {
  constructor(dependencies) {
    this.dependencies = dependencies
    this.speedOnCount = 0
    this.slowOnCount = 0
  }

  keyDown(keyCode) {
    const {
      socket,
      store,
    } = this.dependencies
    socket.emit('keydown', {
      keyCode,
      hasShift: store.state.isShiftDown,
      hasCtrl: store.state.isCtrlDown,
      hasAlt: store.state.isAltDown
    });
  }

  keyUp(keyCode) {
    const {
      socket,
      store,
    } = this.dependencies
    socket.emit('keyup', {
      keyCode,
      hasShift: store.state.isShiftDown,
      hasCtrl: store.state.isCtrlDown,
      hasAlt: store.state.isAltDown
    });
  }

  speedOn() {
    const {
      socket,
      store,
    } = this.dependencies
    this.speedOnCount += 1
    if (this.speedOnCount === 1) {
      store.setState({ isShiftDown: 1 })
      socket.emit('keydown', {
        keyCode: 16,
        hasShift: 1,
        hasCtrl: 0,
        hasAlt: 0
      });
    }
  }

  speedOff() {
    const {
      socket,
      store,
    } = this.dependencies
    this.speedOnCount -= 1;
    if (this.speedOnCount < 0) {
      this.speedOnCount = 0;
    } else if (this.speedOnCount === 0) {
      store.setState({ isShiftDown: 0 })
      socket.emit('keyup', {
        keyCode: 16,
        hasShift: 0,
        hasCtrl: 0,
        hasAlt: 0
      });
    }
  }

  slowOn() {
    const {
      socket,
      store,
    } = this.dependencies
    this.slowOnCount += 1
    if (this.slowOnCount === 1) {
      store.setState({ isAltDown: 1 })
      socket.emit('keydown', {
        keyCode: 18,
        hasShift: 0,
        hasCtrl: 0,
        hasAlt: 1
      });
    }
  }

  slowOff() {
    const {
      socket,
      store,
    } = this.dependencies
    this.slowOnCount -= 1;
    if (this.slowOnCount < 0) {
      this.slowOnCount = 0;
    } else if (this.slowOnCount === 0) {
      store.setState({ isAltDown: 0 })
      socket.emit('keyup', {
        keyCode: 18,
        hasShift: 0,
        hasCtrl: 0,
        hasAlt: 0
      });
    }
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
}

export default CozmoController
