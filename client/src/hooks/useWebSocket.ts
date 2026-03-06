import { useEffect, useState } from "react"
import { closeSocket, createSocket, sendSocket } from "./Socket"

//@ts-ignore
export const useWebsocket = ({roomid,name}) => {

  console.log("-------->>>>",roomid);
  

  const [message, setMessage] = useState([])

  useEffect(() => {
    const ws = createSocket("ws://localhost:8080")

    ws.onopen = () => {
      console.log("WS CONNECTED");
      sendSocket(
        {
          type: "join",
          name: name,
          roomid: roomid
        }
      )
      alert(roomid)
    }

    ws.onerror = (e) => {
      console.log("WS ERROR", e);
    }


    ws.onmessage = (ev) => {
      const data = JSON.parse(ev.data)
      setMessage(prev => [...prev, { sender: "other", text: data.message, name: data.name}])

    }

    return () => closeSocket()

  }, [roomid,name])



  const sender = (text: string) => {
    // console.log("websocket",data);
    sendSocket(
      {
        type: "message",
        name: name,
        roomid: roomid,
        message: text
      }
    )
    setMessage(prev => [...prev, { sender: "me", text: text }])
  }
  return { message, sender }
}