import { WebSocketServer, WebSocket } from 'ws'

interface user {
    socket: WebSocket,
    name: string,
    roomId: string,
}

let allSocket: user[] = []

const wss = new WebSocketServer({ port: 8080 })

wss.on("connection", (socket) => {
    //after connection control reach here
    console.log("userConnected");
    // allSocket.push(socket)


    socket.on("message", (message) => {
        console.log(allSocket.length);
        

        //@ts-ignore
        const data = JSON.parse(message as unknown as string)
        console.log(data);


        if (data.type === 'join') {

            allSocket.push(
                {
                    socket,
                    name: data.name,
                    roomId: data.roomid
                }
            )

            console.log(data);

        } else if (data.type === "message") {
            let currentRoom = null;
            for (let i = 0; i < allSocket.length; i++) {
                if (allSocket[i]?.socket == socket) {
                    currentRoom = allSocket[i]?.roomId;
                }
            }

                allSocket.forEach(u => {
                    if (u.roomId === currentRoom && u.socket !== socket) {
                        u.socket.send(JSON.stringify(data)); // send full object
                    }
                });
            // }
        } else if (data.type === "make") {
            allSocket.push(
                {
                    socket,
                    name: data.name,
                    roomId: data.roomid
                }
            )
        }


    })

    socket.on("close", () => {
        //@ts-ignore
        allSocket = allSocket.filter(x => x.socket != socket);
        console.log(allSocket.length);
        
    })
})