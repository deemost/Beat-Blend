import React from "react"

const RoomMessage = ({user, lastMessage}) => {

    if (user !== null && lastMessage !== null && lastMessage.room_id === user.room_id) {
        if (lastMessage.event_type === 'left_room' && lastMessage.user_name !== null) {
            return (
                <>
                    <span>{lastMessage.user_name} left the room</span>
                </>
            );
        }
        if (lastMessage.event_type === 'track_added' && lastMessage.user_name !== null) {
            return (
                <>
                    <span>{lastMessage.user_name} added "{lastMessage.track_name}"</span>
                </>
            );
        }
    }
};

export default RoomMessage;
