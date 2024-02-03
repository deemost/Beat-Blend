import RoomInfo from "./RoomInfo";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import TrackSearch from "./TrackSearch";
import Queue from "./Queue";
import useWebSocket, {ReadyState} from "react-use-websocket"

const Room = () => {
    const WS_URL = "ws://localhost:3001/ws/events"
    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(
        WS_URL,
        {
            // share=true lets other components use the same ws (if same url)
            share: true,
            shouldReconnect: () => true,
        },
    )
    const [user, setUser] = useState("")
    const [queue, setQueue] = useState(null)

    // Run when the connection state (readyState) changes
    useEffect(() => {
        console.log("------ Connection state changed")
        if (readyState === ReadyState.OPEN) {
            sendJsonMessage({
                event: "subscribe",
                data: {
                    room: "todo: room-id",
                },
            })
        }
    }, [readyState])

    // Run when a new WebSocket message is received (lastJsonMessage)
    useEffect(() => {
        console.log("~~~~~~~ received: " + JSON.stringify(lastJsonMessage))
    }, [lastJsonMessage])

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
            const room_id = pieces[0];
            const user_id = pieces[1];
            axios.get("http://localhost:3001/users/" + user_id)
                .then((res) => {
                    // console.log("inside room, got user: " + JSON.stringify(res.data));
                    setUser(res.data)
                    axios.get("http://localhost:3001/rooms/" + res.data.room_id + "/queue")
                        .then((res) => {
                            // console.log("inside room, got queue=" + JSON.stringify(res.data));
                            setQueue(res.data)
                        });
                });
        }
    }, []);

    return (
        <>
            <div>MESSAGE: {lastJsonMessage && JSON.stringify(lastJsonMessage)}</div>
            <table>
                <tbody>
                <tr>
                    <td style={{width: '50%'}}>
                        <RoomInfo user={user}/>
                        <TrackSearch user={user} sendMessage={sendJsonMessage}/>
                    </td>
                    <td style={{width: '50%'}}>
                        <Queue queue={queue}/>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    );
};
export default Room;
