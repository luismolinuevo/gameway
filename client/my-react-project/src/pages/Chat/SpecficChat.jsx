import React, {useState} from 'react'; 
import "./SpecficChat.scss";

export default function SpecficChat() {
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setMessage("")
        }

    }

  return (
    <div className='chatroom'>
        <div className='chatbox-container'>
            <p>Other persons username</p>
            <div className='message-container'>
                <p>message</p>
            </div>
            <div>
                {/* <form onSubmit={handleSubmit}> */}
                    <input type="text" className='input' value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleSubmit}/>
                    {/* <button type="submit">Send</button> */}
                {/* </form> */}
            </div>
        </div>
    </div>
  )
}
