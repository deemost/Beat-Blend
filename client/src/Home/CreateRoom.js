import React, {useState} from "react"
import axios from "axios";

const CreateRoom = () => {
    const [name, setName] = useState("")

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("before create new room, name = " + name);
        axios.post("http://localhost:3001/rooms", {"name": name},
            {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            .then((res) => {
                console.log("room created: " + JSON.stringify(res.data));
                window.location.replace("http://localhost:3001/login/spotify");
            });
    };

    return (
        <>
            <h3>Create Room</h3>
            <div>todo: explain what happens</div>
            <form onSubmit={handleSubmit}>
                <label>
                    Host Name: <input type="text" value={name} onChange={handleChange}/>
                </label>
                <button>Submit</button>
            </form>
        </>
    );
};

export default CreateRoom;
