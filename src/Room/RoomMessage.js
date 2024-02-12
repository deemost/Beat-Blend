import React from "react"

const RoomMessage = ({user, lastJsonMessage}) => {

    if (user !== null && lastJsonMessage !== null && lastJsonMessage.room_id === user.room_id) {
        if (lastJsonMessage.event_type === 'left_room' && lastJsonMessage.user_name !== null) {
            return (
                <>
                    <span>{lastJsonMessage.user_name} left the room</span>
                </>
            );
        }
        if (lastJsonMessage.event_type === 'track_added' && lastJsonMessage.user_name !== null) {
            return (
                <>
                    <span>{lastJsonMessage.user_name} added "{lastJsonMessage.track_name}"</span>
                </>
            );
        }
    }
};

export default RoomMessage;
