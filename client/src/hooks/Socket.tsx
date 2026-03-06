let socket: WebSocket | null = null;

export function createSocket(url: string) {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket(url);
  }
  return socket;
}

export function sendSocket(data: {
    type: string,
    name: string,
    roomid: string,
    message?: string
}) {

    // console.log("sending", data);

    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data))
    } else {
        console.log("WebSocket not connected")
    }
}

export function closeSocket() {
    if (socket) {
        socket.close();
    }
}