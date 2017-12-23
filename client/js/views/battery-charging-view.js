function createBatteryChargingView({ env, store }) {
  const batteryChargingView = document.getElementById('battery-charging')
  store.on('change', (prevState, newState) => {
    // If connectivity to server changed
    if (newState.isCharging !== prevState.isCharging) {
      renderChargingView(batteryChargingView, {
        isCharging: newState.isCharging
      })
    }
  })
  renderChargingView(batteryChargingView, {
    isCharging: store.state.isCharging,
  })
}

function renderChargingView(batteryChargingView, { isCharging }) {
  if (isCharging) {
    batteryChargingView.style.display = ''
  } else {
    batteryChargingView.style.display = 'none'
  }
}

export default createBatteryChargingView
