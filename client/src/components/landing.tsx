import { useRef } from "react"
import { Dashboard } from "./Screen";
import { useNavigate } from "react-router-dom";
export function Landing() {

    const navigate = useNavigate();
    const inpurRef = useRef();
    const idref = useRef()
    const nameRef = useRef()

    function createId() {
        const id = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString();
        navigate("/chat",{
            state:{
                roomid: id,
                name: inpurRef.current.value
            }
        })
    }

    function jjin() {
        const id = idref.current.value
        navigate("/chat",{
            state:{
                roomid: id,
                name: nameRef.current.value
            }
        })
    }
    return <div className="w-screen h-screen bg-black flex justify-center items-center">
        <div className="bg-white border-2 w-[40vw] rounded-2xl border-orange-500 overflow-hidden">
            <div className="pt-15 pb-2 bg-black flex justify-around items-center">
                <input ref={inpurRef} type="text" className="w-[25vw]  px-2 py-3 rounded-md mx-2 border-2 text-white focus:border-orange-500 focus:outline-none font-mono" placeholder="enter your name and create Room" />
                <button onClick={() => {
                    createId()
                }} className='border-2 text-sm border-white bg-orange-500 h-15 w-15 mx-2 items-center justify-center rounded-full text-md text-black font-mono'
                >
                    crt
                </button>
            </div>

            <div className="pt-2 pb-15 bg-black flex justify-around items-center">
                {/* <div className="flex justify-between items-center"> */}
                    <div className="flex justify-around bg-black">
                <input ref={nameRef} type="text" className="px-2 py-3 rounded-md mx-2 border-2 text-white focus:border-orange-500 focus:outline-none font-mono" placeholder="enter your name" />
                <input ref={idref} type="text" className="px-2 py-3 rounded-md mx-2 border-2 text-white focus:border-orange-500 focus:outline-none font-mono" placeholder="enter room Id" />
                </div>
                <button className='border-2 border-white bg-orange-500 h-15 w-15 mx-2 items-center justify-center rounded-full text-black text-md font-mono'
                    onClick={() => {
                        jjin()
                    }}
                >
                    join
                </button>
                {/* </div> */}
                
            </div>
        </div>
    </div>
}


function make() {
    const ws = new WebSocket("ws://192.168.1.18:8080");

    ws.onopen = () => {
        ws.send
    }
}