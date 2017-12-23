function createBatteryLowView({ env, store }) {
  const batteryLowView = document.getElementById('battery-low')
  store.on('change', (prevState, newState) => {
    // If connectivity to server changed
    if (newState.batteryVoltage !== prevState.batteryVoltage) {
      renderLowView(batteryLowView, {
        batteryVoltage: newState.batteryVoltage
      })
    }
  })
  renderLowView(batteryLowView, {
    batteryVoltage: store.state.batteryVoltage,
  })
}

function renderLowView(batteryLowView, { batteryVoltage }) {
  if (batteryVoltage < 3.5) {
    batteryLowView.style.display = ''
  } else {
    batteryLowView.style.display = 'none'
  }
}

export default createBatteryLowView
