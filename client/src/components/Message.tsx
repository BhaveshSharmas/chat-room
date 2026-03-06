import { useRef } from "react";

//@ts-ignore
export const Message = ({ onSend }) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const handleSend = () => {
        const text = inputRef.current.value;

        if (!text) return;

        onSend(text)
        inputRef.current.value = "";
    }


    return <div className='bg-blue-500 w-full h-[20vh] fixed flex items-center'>
        <input ref={inputRef} className='bg-black text-white rounded-md mx-5 px-2 py-2 text-xl' type="text" placeholder='text' />
        <button className='bg-black px-10 py-2 rounded-md text-white text-xl' onClick={handleSend}>send</button>
    </div>
}