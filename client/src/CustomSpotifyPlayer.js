import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri, playNextInTheQueue }) {
  const [play, setPlay] = useState(true);
  const [accum, setAccum] = useState(-3);
  const [prevTrack, setPrevTrack] = useState("");

  useEffect(() => setPlay(true), [trackUri]);
  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      token={accessToken}
      callback={(state) => {
        // if (!state.isPlaying) setPlay(false);
        console.log("-------- player state: " + JSON.stringify(state));

        if (prevTrack != state.name) {
          setPrevTrack(state.name);
          setAccum(-2);
        }

        

        else if (state.position == 0 && accum >= 1) {
          playNextInTheQueue();
          setAccum(-1);
        } else if (state.position == 0) {
          setAccum(accum + 1);
        }

        console.log("WWWWWWWcur" + state.position);
        console.log("Thing " + accum);
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