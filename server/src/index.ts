import { WebSocketServer, WebSocket } from 'ws'

interface user {
    roomId: string,
    socket: WebSocket
}

let allSocket: user[] = []

const wss = new WebSocketServer({ port: 8080 })

wss.on("connection", (socket) => {
    //after connection control reach here
    console.log("userConnected");
    // allSocket.push(socket)


    socket.on("message", (message) => {

        //@ts-ignore
        const data = JSON.parse(message as unknown as string)
        console.log(data);
        

        if (data.type === 'join') {

            allSocket.push(
                {
                    socket,
                    roomId: data.roomid
                }
            )

            console.log(allSocket);

        } else if (data.type === "message") {
            let currentRoom = null;
            for (let i = 0; i < allSocket.length; i++) {
                if (allSocket[i]?.socket == socket) {
                    currentRoom = allSocket[i]?.roomId;
                }
            }

            for(let i=0; i<allSocket.length; i++){
                allSocket[i]?.roomId == currentRoom && allSocket[i]?.socket !== socket ? allSocket[i]?.socket.send(data.message) : ""
            }
        }


    })

    socket.on("disconnect",()=>{
        //@ts-ignore
        allSocket = allSocket.filter(x => x != socket);
    })
})