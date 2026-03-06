import { useLocation } from "react-router";
import { useWebsocket } from "../hooks/useWebSocket";
import { Chat } from "./Chat";
import { Message } from "./Message";

export function Dashboard() {
    const location = useLocation();
    const roomid =location.state?.roomid;
    const name=location.state?.name;
    if (!roomid||!name) {console.warn("Missing roomid or name!");}   

    console.log(roomid);
    console.log(name);
    
    const { message, sender } = useWebsocket({roomid,name})
    return <div>
        <div className='h-screen bg-black'>
            <Chat message={message}></Chat>
            <Message onSend={sender}></Message>
        </div>
    </div>
}