import io from 'socket.io-client';

function createSocket({ env, store }) {
  const socket = io(`${env.WS}://${env.SERVER}`);

  socket.on('event', console.log);

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

  return socket
}

export default createSocket;
