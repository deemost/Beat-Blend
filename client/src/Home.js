import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

export default function Home() {

    let history = useNavigate();

    const [room, setRoom] = useState("")
    const [username, setUsername] = useState("")

    const handleSubmitRoom = () => {
        // e.preventDefault();
        // e.stopPropagation();
        history("/room/" + room);
    };

    const handleChangeRoom = e => {
        setRoom(e.target.value)
    };

    const handleSubmitUsername = () => {
        setUsername(username)
    };

    const handleChangeUsername = e => {
        setUsername(e.target.value)
    };


    return (
        <div className="d-flex align-items-center justify-content-center">
            <Container>
                <Row className="text-center">
                    <Col>
                        <h1>Beat Blend</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-lg-5">
                    <Col className="justify-content-center" xs={12} md={6} lg={4}>
                        <Form>
                            <Form.Group as={Row}>
                                <Col xs={8} md={8} lg={8}>
                                    <Form.Control type="text" placeholder="Username" onChange={handleChangeUsername} />
                                </Col>
                                <Col>
                                    <Button onClick={handleSubmitUsername}>Go</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                        <Link to={`host`} className="btn btn-outline-success btn-lg">Enter as a Host</Link>
                        <Form>
                            <Form.Group as={Row}>
                                <Col xs={8} md={8} lg={8}>
                                    <Form.Control type="text" placeholder="Room #" onChange={handleChangeRoom} />
                                </Col>
                                <Col>
                                    <Button onClick={handleSubmitRoom}>Go</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}
