import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

export default function Home() {

    let history = useNavigate();

    const [room, setRoom] = useState("")
    const [hostName, setHostName] = useState("")
    const [guestName, setGuestName] = useState("")

    const handleStartRoom = () => {
        console.log("inside handleStartRoom")
    }

    const handleJoinRoom = () => {
        console.log("inside handleJoinRoom")
    }
    // const handleSubmit = () => {
    //     // e.preventDefault();
    //     // e.stopPropagation();
    //     history("/room/" + room);
    // };
    //
    // const handleChange = e => {
    //     setRoom(e.target.value)
    // };


    return (
        <div>
            <Container>
                <Row>
                    <Col><h1>Beat Blend</h1></Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" id="startRoom">
                                <Form.Control type="text" placeholder="Host Name" id="hostName"/>
                                <Button className='btn-primary btn-sm' onClick={handleStartRoom}>Start Room</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <div>OR</div>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" id="joinRoom">
                                <Form.Control type="text" placeholder="Guest Name" id="guestName"/>
                                <Form.Control type="text" placeholder="Room #" id="roomNumber"/>
                                <Button className='btn-success btn-sm' onClick={handleJoinRoom}>Join Room</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
