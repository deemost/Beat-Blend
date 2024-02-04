const RoomMessage = ({user, lastMessage}) => {

    if (user !== null && lastMessage !== null && lastMessage.room_id === user.room_id) {
        if (lastMessage.event_type === 'left_room' && lastMessage.user_name !== null) {
            return (
                <>
                    <span>{lastMessage.user_name} left the room</span>
                </>
            );
        }
    }
};

export default RoomMessage;
