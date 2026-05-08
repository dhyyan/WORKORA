import { io } from 'socket.io-client';

// Replace this with your actual backend URL if it is different
const BACKEND_URL = import.meta.env.VITE_API_BASEURL

// Initialize the socket connection
// We set autoConnect to false so it doesn't immediately connect when imported.
// It will only connect when we explicitly call socket.connect() inside our MessageContainer useEffect.
const socket = io(BACKEND_URL, {
    autoConnect: false,
    withCredentials: true,
});
socket.connect()
socket.on('connect_error', (err)=>{
    console.log(err)
})
console.log(socket)

export default socket;
