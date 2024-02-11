import React, {useEffect, useState} from "react"
import Cookies from "js-cookie";
import axios from "axios";
import TrackSearch from "./TrackSearch";
import Queue from "./Queue";
import useWebSocket from "react-use-websocket"
import RoomMessage from "./RoomMessage";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import NavInfo from "./NavInfo";

const Room = () => {
    const [socketUrl] = useState('ws://localhost:3001/ws/events');
    const {
        sendJsonMessage,
        lastJsonMessage,
        // readyState
    } = useWebSocket(socketUrl, {
        // share=true lets other components use the same ws (if same url)
        share: true,
        shouldReconnect: () => true,
    });

    const [user, setUser] = useState(null)
    const [queue, setQueue] = useState(null)

    // Run when a new WebSocket message is received (lastJsonMessage)
    useEffect(() => {
        if (user !== null && lastJsonMessage !== null && lastJsonMessage.room_id === user.room_id) {
            console.log("~~~~~~~ room: " + user.room_id +
                        " received event_type: " + lastJsonMessage.event_type +
                        ", intended for room: " + lastJsonMessage.room_id +
                        ", event: " + JSON.stringify(lastJsonMessage))
            axios.get("http://localhost:3001/rooms/" + user.room_id + "/queue")
                .then((res) => {
                    // console.log("inside room, got queue=" + JSON.stringify(res.data));
                    setQueue(res.data);
                });
        } else {
            console.log("~~~~~~~ ignoring event: " + JSON.stringify(lastJsonMessage))
        }
    }, [user, lastJsonMessage])

    useEffect(() => {
        const host_cookie = Cookies.get("bb-host");
        const guest_cookie = Cookies.get("bb-guest");
        // console.log("host_cookie=" + host_cookie + ", guest_cookie=" + guest_cookie);
        let user_cookie;
        if (host_cookie != null) {
            user_cookie = host_cookie;
        } else {
            if (guest_cookie != null) {
                user_cookie = guest_cookie;
            } else {
                console.warn("NO COOKIES");
            }
        }
        if (user_cookie != null) {
            const pieces = user_cookie.split(":");
            // const room_id = pieces[0];
            const user_id = pieces[1];
            axios.get("http://localhost:3001/users/" + user_id)
                .then((res) => {
                    console.log("inside room, got user: " + JSON.stringify(res.data));
                    setUser(res.data)
                    axios.get("http://localhost:3001/rooms/" + res.data.room_id + "/queue")
                        .then((res) => {
                            console.log("inside room, got queue=" + JSON.stringify(res.data));
                            setQueue(res.data)
                        });
                });
        }
    }, []);

    function clearQueue() {
        console.log("clearQueue");
        axios.delete("http://localhost:3001/rooms/" + queue.room_id + "/queue")
            .then((res) => {
                // console.log("inside room, got queue=" + JSON.stringify(res.data));
                setQueue(res.data);
                sendJsonMessage({
                                    event_type: "queue_cleared",
                                    timestamp: Date.now(),
                                    room_id: user.room_id,
                                    user_name: user.name,
                                })
            });
    }

    function deleteFromQueue(queueTrack) {
        console.log("========== " + JSON.stringify(queueTrack));
        console.log("========== " + queueTrack.uuid);
        axios.delete("http://localhost:3001/rooms/" + user.room_id + "/queue/delete/" + queueTrack.uuid)
            .then((res) => {
                console.log("track removed!");
                sendJsonMessage({
                                    event_type: "track_removed",
                                    timestamp: Date.now(),
                                    room_id: user.room_id,
                                    user_name: user.name,
                                    track_name: queueTrack.title
                                })
            });
    }

    return (
        <Container fluid>
            <NavInfo user={user}/>
            <Row>
                <Col>
                    Messages: <RoomMessage user={user} lastMessage={lastJsonMessage}/>
                </Col>
            </Row>
            <Row>
                <Col sm={7}>
                    <Queue queue={queue} clearQueue={clearQueue} deleteFromQueue={deleteFromQueue}/>
                </Col>
                <Col sm={5}>
                    <TrackSearch user={user} sendMessage={sendJsonMessage}/>
                </Col>
            </Row>
        </Container>
    );
};
export default Room;
