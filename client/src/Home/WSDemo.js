import React, {useCallback, useEffect, useState} from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';

export const WSDemo = () => {
    const [socketUrl, setSocketUrl] = useState('ws://localhost:3001/ws/events');

    const {
        sendJsonMessage,
        lastJsonMessage,
        readyState
    } = useWebSocket(socketUrl);

    // useEffect(() => {
    //     if (lastJsonMessage !== null) {
    //         console.log("lastJsonMessage=" + JSON.stringify(lastJsonMessage))
    //     }
    // }, [lastJsonMessage]);

    const handleClickSendMessage = useCallback(() => {
            const event = {
                event_type: "test-type",
                timestamp: Date.now(),
                room_id: "todo-room-id",
                user_name: "todo-user-name"
            }
            sendJsonMessage(event);
        }, []
    );

    // const connectionStatus = {
    //     [ReadyState.CONNECTING]: 'Connecting',
    //     [ReadyState.OPEN]: 'Open',
    //     [ReadyState.CLOSING]: 'Closing',
    //     [ReadyState.CLOSED]: 'Closed',
    //     [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    // }[readyState];

    return (
        <div>
            {/*<div>The WebSocket is currently {connectionStatus}</div>*/}
            <button onClick={handleClickSendMessage} disabled={readyState !== ReadyState.OPEN}>
                Click Me to send 'Hello'
            </button>
            <div>{lastJsonMessage && JSON.stringify(lastJsonMessage)}</div>
        </div>
    );
};
