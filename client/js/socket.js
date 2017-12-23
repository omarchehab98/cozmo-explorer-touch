import io from 'socket.io-client';

function createSocket({ env, store }) {
  const socket = io(`${env.WS}://${env.SERVER}`);

  socket.on('connect', () => {
    store.setState({
      connected: true,
    })
  })

  socket.on('disconnect', () => {
    store.setState({
      connected: false,
    })
  })

  socket.on('initialization', ({
    is_on_charger,
    is_pickup_up,
    is_falling,
    battery_voltage,
  }) => {
    store.setState({
      isCharging: is_on_charger,
      isPickedUp: is_pickup_up,
      isFalling: is_falling,
      batteryVoltage: battery_voltage,
    })
  })

  socket.on('event', ({ data, type }) => {
    if (type === 'event') {
      const [ key, value ] = data.split(': ')
      switch (key) {
        case 'cozmo.robot.Robot.is_on_charger':
          store.setState({
            isCharging: value === 'True'
          })
          break;

        case 'cozmo.robot.Robot.is_pickup_up':
          store.setState({
            isPickedUp: value === 'True'
          })
          break;

        case 'cozmo.robot.Robot.is_falling':
          store.setState({
            isFalling: value === 'True'
          })
          break;
        
        case 'cozmo.robot.Robot.battery_voltage':
          store.setState({
            batteryVoltage: Number(value)
          })
          break;
      }
    }
  });

  return socket
}

export default createSocket;
