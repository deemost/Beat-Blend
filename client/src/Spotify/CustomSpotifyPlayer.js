import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri, playNextInTheQueue }) {
  const [play, setPlay] = useState(true);
  const [prevIsPlaying, setPrevIsPlaying] = useState(true);

  useEffect(() => setPlay(true), [trackUri]);
  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      token={accessToken}
      callback={(state) => {
        console.log(
          "prevIsPlaying: " +
            prevIsPlaying +
            " state.isPlaying: " +
            state.isPlaying +
            "    -------- player state: " +
            JSON.stringify(state)
        );

        if (
          state.position == 0 &&
          prevIsPlaying == true &&
          state.isPlaying == false
        ) {
          setTimeout(() => {
            playNextInTheQueue();
          }, 500);

          setPrevIsPlaying(false);
        } else if (
          state.position == 0 &&
          prevIsPlaying == false &&
          state.isPlaying == true
        ) {
          setPrevIsPlaying(true);
        } else if (state.previousTracks.length > 0) {
          setTimeout(() => {
            playNextInTheQueue();
          }, 500);

          setPrevIsPlaying(true);
        }

        console.log("Current Pos " + state.position);
      }}
      play={true}
      autoPlay={true}
      uris={trackUri ? [trackUri] : []}
      // queue={queue}

      styles={{
        activeColor: "#fff",
        bgColor: "#333",
        color: "#fff",
        loaderColor: "#fff",
        sliderColor: "#1cb954",
        trackArtistColor: "#ccc",
        trackNameColor: "#fff",
      }}
    />
  );
}
