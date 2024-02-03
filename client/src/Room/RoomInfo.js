const RoomInfo = ({user}) => {
    // console.log("in roominfo, user=" + JSON.stringify(user));

    return (
        <div>
            <div>Room URL: http://localhost:3000/room/{user.room_id} (add copy button)</div>
            <div>User: {user.name}</div>
            <div>Role: {user.role}</div>
            {/*<div>Token: {user.access_token}</div>*/}
        </div>
    );
};

export default RoomInfo;
