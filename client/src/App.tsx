import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'

function App() {
  const [message, setMessage] = useState([])
  const wsRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    // const ws = new WebSocket("ws://192.168.1.18:8080");
    const ws = new WebSocket("ws://192.168.1.18:8080");

    wsRef.current = ws;

    ws.onmessage = (ev) => {

      setMessage(prev => [...prev, { sender: "other", text: ev.data }])
      console.log(ev.data);

    }

    //after connect this call
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        roomid: "red"
      }))
    }

    return () => {
      ws.close()
    }
  }, [])

  return (
    <>
      <div className='h-screen bg-black'>
        {/* <div className='flex-col h-94 w-94 bg-white flex justify-between'> */}
        <div className='h-[80vh] bg-black text-white p-4'>
          {message.map((msg, i) => (
            <div key={i} className="my-4">
              <span className={`bg-blue-500 rounded px-4 py-1 inline-block
                ${msg.sender == "me" ? "bg-green-500" : "bg-blue-500"}`
              }>
                {msg.text}
              </span>
            </div>
          ))}
          
        </div>
        <div className='bg-blue-500 w-full h-[20vh] fixed flex items-center'>
          <input ref={inputRef} className='bg-black text-white rounded-md mx-5 px-2 py-2 text-xl' type="text" placeholder='text' />
          <button className='bg-black px-10 py-2 rounded-md text-white text-xl' onClick={() => {

            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
              wsRef.current.send(JSON.stringify({
                type: "message",
                roomid: "red",
                message: inputRef.current.value
              }))
              setMessage(prev => [...prev, { sender: "me", text: inputRef.current.value }])
            }


          }}>send</button>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default App
