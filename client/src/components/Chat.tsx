export function Chat({ message }) {
  return (
    <div className='h-[80vh] bg-black text-white p-4 overflow-y-auto'>
      {message.map((msg, i) => (
        <div key={i} className="my-4">
          {/* Sender name */}
          <div className="text-xs text-gray-400 mb-1">
            {msg.sender === "me" ? "You" : msg.name}
          </div>

          {/* Message bubble */}
          <div>
            <span
              className={`rounded px-4 py-1 inline-block text-sm text-white
                ${msg.sender === "me" ? "bg-green-500" : "bg-blue-500"}`}
            >
              {msg.text}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}