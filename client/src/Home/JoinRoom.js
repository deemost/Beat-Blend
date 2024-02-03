import { useState } from "react"
import { useNavigate } from "react-router-dom";

import axios from "axios";
const JoinRoom = () => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleRoomChange = (e) => {
        setRoom(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("before join room: name: " + name + ", room: " + room);
        axios.post("http://localhost:3001/rooms/" + room + "/join", {"name": name},
            {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            // todo: catch error - room not found
            .then((res) => {
                navigate("/room/" + room)
            });
    };

    return (
        <>
            <h3>Join Room</h3>
            <div>todo: explain what happens</div>
            <form onSubmit={handleSubmit}>
                <label>
                    Guest Name: <input type="text" value={name} onChange={handleNameChange}/>
                    Room: <input type="text" value={room} onChange={handleRoomChange}/>
                </label>
                <button>Submit</button>
            </form>
        </>
    );
};

export default JoinRoom;
