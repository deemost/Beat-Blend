import {useEffect, useState} from "react";

const RoomWebsocket = ({websocket}) => {

    function sendMessage(event, message) {
        console.log("sending WS message: " + JSON.stringify(message));
        websocket.send(message);
        event.preventDefault();
    }

    function handleMessage() {
        return function (event) {
            console.log("received WS message: " + JSON.stringify(event.data));
        };
    }

    useEffect(() => {
        if (websocket != null) {
            websocket.onmessage = handleMessage();
        }
    }, []);

    return (
        <div>
            setup WS
        </div>
    );
};
export default RoomWebsocket;
