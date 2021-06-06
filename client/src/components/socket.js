import openSocket from "socket.io-client";
const socket = openSocket('http://localhost:5000',{autoConnect:false});
export default socket;
