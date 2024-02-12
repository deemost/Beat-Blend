import React from "react"
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

import CreateRoom from "./CreateRoom"
import JoinRoom from "./JoinRoom"

const Home = () => {
    return (
        <Container fluid>
            <Stack direction="vertical" gap={1} className="justify-content-center align-items-center vh-10">
                <Image src="bb.png" fluid width={'150px'} className={'p-2'}/>
                <CreateRoom/>
                <div className="p-2">
                    <small>OR</small>
                </div>
                <JoinRoom/>
            </Stack>
        </Container>
    );
};
export default Home;
