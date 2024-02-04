import React from "react"

const UserInfo = ({user}) => {

    if (user !== null) {
        return (
            <>
                <div>User: {user.name} ({user.role})</div>
                {/*<div>Token: {user.access_token}</div>*/}
            </>
        );
    }
};

export default UserInfo;
