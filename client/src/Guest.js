import React from "react"
import {Await, defer, useLoaderData} from "react-router-dom";
import axios from "axios";

export async function loader({params}) {
    console.log('params: ' + JSON.stringify(params))
    let room = params.id
    const response = await axios
        .post("http://localhost:3001/room/check", {
            room
        });

    // console.log('response: ' + JSON.stringify(response))

    return defer({
        roomCheck: response.data
    });
}

export default function Guest() {
    const {roomCheck} = useLoaderData();

    return (
        <React.Suspense fallback={<p>Loading data...</p>}>
            <Await resolve={roomCheck} errorElement={<p>Error loading data</p>}>
                {(roomCheck) => {
                    return (
                        <div>
                            {roomCheck.exists &&
                                <div>welcome to the room</div>
                            }
                            {!roomCheck.exists &&
                                <div>Room does not exist</div>
                            }
                        </div>
                    );
                }}
            </Await>
        </React.Suspense>
    )
}
