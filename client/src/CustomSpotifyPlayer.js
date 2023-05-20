import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri, playNextInTheQueue }) {
  const [play, setPlay] = useState(true);
  const [accum, setAccum] = useState(-3);
  const [prevTrack, setPrevTrack] = useState("");
  const [prevIsPlaying, setPrevIsPlaying] = useState(true);

  useEffect(() => setPlay(true), [trackUri]);
  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      token={accessToken}
      callback={(state) => {
        // if (!state.isPlaying) setPlay(false);
        console.log("prevIsPlaying: " + prevIsPlaying + " state.isPlaying: " + state.isPlaying +    "    -------- player state: " + JSON.stringify(state));

        if(state.previousTracks.length > 0){
          // setTimeout(playNextInTheQueue(), 10000); 
          // setPrevIsPlaying(state.isPlaying);

          setTimeout(() => {
            playNextInTheQueue();
          }, 500);
        }


        // if (prevTrack != state.name) {
        //   setPrevTrack(state.name);
        //   setAccum(-2);
        // } else if (state.position == 0 && accum >= 1) {
        //   playNextInTheQueue();
        //   setAccum(-1);
        // } else if (state.position == 0) {
        //   console.log("THIS SHOULD BE POS 0");
        //   setAccum(accum + 1);
        // }

        console.log("Current Pos " + state.position);
        // console.log("Accumulator " + accum);
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
