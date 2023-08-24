import React from "react"
import {Await, defer, useLoaderData} from "react-router-dom";
import axios from "axios";
import "./Guest-Background.css";
import GuestView from "./GuestView";

require('dotenv').config();

export async function loader({params}) {
    console.log('params: ' + JSON.stringify(params))
    let room = params.id
    const response = await axios
        .post(process.env.REACT_APP_URL_PREFIX + "/room/check", {
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
                                <div className="header2">
                                <GuestView></GuestView>
                                </div>
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
