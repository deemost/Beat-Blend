const RoomInfo = ({user}) => {
    // console.log("in roominfo, user=" + JSON.stringify(user));

    if (user !== null) {
        return (
            <div>
                <h3>Room: {user.room_id}</h3>
                <div>Address: http://localhost:3000/room/{user.room_id} (add copy button)</div>
            </div>
        );
    }
};

export default RoomInfo;
