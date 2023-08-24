import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

export default function Home() {

    let history = useNavigate();

    const [room, setRoom] = useState("")

    const handleSubmit = e => {
        // e.preventDefault();
        // e.stopPropagation();
        history("/room/" + room);
    };

    const handleChange = e => {
        setRoom(e.target.value)
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col><h1>Beat Blend</h1></Col>
                </Row>
                <Row>
                    <Col>
                        <Link to={`host`} className="btn btn-outline-success btn-lg">Enter as a Host</Link>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" placeholder="Room #" onChange={handleChange}/>
                                <Button onClick={handleSubmit}>Go</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
