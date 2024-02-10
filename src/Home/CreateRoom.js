import React, {useState} from "react"
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
        // <small>
        <Card style={{width: '24rem'}}>
            {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
            <Card.Body>
                <Card.Title>Create a Room</Card.Title>
                <Card.Text>
                    <small>
                        Enter your name to create a room as a host. You will need to have a Spotify account.
                    </small>
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="joinRoomGuestName">
                        {/*<Form.Label>Host name</Form.Label>*/}
                        <Form.Control type="text"
                                      placeholder="Host name"
                                      value={name}
                                      onChange={handleChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create Room
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        // </small>
    );
};

export default CreateRoom;
