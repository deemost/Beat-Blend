import React from "react";
import SpotifyDashBoard from "./Spotify/SpotifyDashBoard";

export default function MusicDashBoard({accessToken}) {
    return (
        <SpotifyDashBoard accessToken={accessToken} ></SpotifyDashBoard>
    )
}