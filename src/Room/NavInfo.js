import React from "react"
import {Container, Navbar} from "react-bootstrap";

const NavInfo = ({user}) => {

    if (user !== null) {
        return (
            <Navbar className="fixed-top header">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="../../bb.png"
                            width="150"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <h5>Room: {user.room_id}</h5>
                            <div>{user.name} ({user.role})</div>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
};

export default NavInfo;
