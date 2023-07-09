import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [name, setName] = useState();
    const [message, setMessage] = useState("");
    const [ws, setWs] = useState();
    const [chat, setChat] = useState("");
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (!ws) return;
        ws.onopen = () => {
            alert("Connected");
        };

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            let newChat = "";
            data.forEach((element) => {
                newChat += element + "\n";
            });
            setChat(newChat);
        };
    }, [ws]);

    const handleSend = () => {
        if (!ws || !message) return;
        ws.send(`${name}: ${message}`);
        setMessage("");
    };

    const connect = () => {
        if (ws) return;
        setWs(new WebSocket("ws://localhost:5005"));
        setDisabled((prev) => !prev);
    };

    return (
        <div className="container">
            <div>
                <textarea value={chat} readOnly style={{ height: "400px", width: "400px" }}></textarea>
            </div>
            <p hidden={disabled}>Connect to write a message</p>
            <p hidden={!disabled}>Write a message</p>
            <div className="cta">
                <input placeholder="Name" onChange={(e) => setName(e.target.value)} disabled={disabled}></input>
                <input
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    hidden={!disabled}
                ></input>
                <button onClick={handleSend} disabled={!message} hidden={!disabled}>
                    Send
                </button>
                <button hidden={disabled} onClick={connect} disabled={disabled || !name}>
                    Connect
                </button>
            </div>
        </div>
    );
}

export default App;
