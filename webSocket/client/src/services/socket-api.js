import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:8000',{ transports: ['websocket', 'polling', 'flashsocket'] });

export default socket;

export function socket_init(){
  console.log('connected to socket');
}
