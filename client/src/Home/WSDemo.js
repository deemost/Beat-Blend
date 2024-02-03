import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const WSDemo = () => {
    const [socketUrl, setSocketUrl] = useState('ws://localhost:3001/ws/events');
    const [messageHistory, setMessageHistory] = useState([]);

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl);

    useEffect(() => {
        if (lastJsonMessage !== null) {
            console.log("lastJsonMessage=" + JSON.stringify(lastJsonMessage))
            // setMessageHistory((prev) => prev.concat(lastJsonMessage));
            setMessageHistory((prev) => prev.concat(lastJsonMessage));
        }
    }, [lastJsonMessage, setMessageHistory]);

    const handleClickSendMessage = useCallback(() => {
        const message = {
            event: "subscribe",
            data: {
                room: "todo: room-id",
            },
        }
        sendJsonMessage(message);
        }, []
    );

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <div>
            <div>The WebSocket is currently {connectionStatus}</div>
            {/*<button onClick={handleClickChangeSocketUrl}>*/}
            {/*    Click Me to change Socket Url*/}
            {/*</button>*/}
            <button onClick={handleClickSendMessage} disabled={readyState !== ReadyState.OPEN}>
                Click Me to send 'Hello'
            </button>
            {/*{lastJsonMessage ? <span>Last message: {lastJsonMessage.data}</span> : null}*/}
            {/*<ul>*/}
            {/*    {messageHistory.map((message, idx) => (*/}
            {/*        <span key={idx}>{message ? message.data : null}</span>*/}
            {/*    ))}*/}
            {/*</ul>*/}
            <div>{lastJsonMessage && JSON.stringify(lastJsonMessage)}</div>
        </div>
    );
};
