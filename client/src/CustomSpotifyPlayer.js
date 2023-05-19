import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ accessToken, trackUri, playNextInTheQueue }) {
  const [play, setPlay] = useState(false)
  const [accum, setAccum] = useState(0)
  const [prevTrack, setPrevTrack] = useState("")

  useEffect(() => setPlay(true), [trackUri])
  if (!accessToken) return null



  return (
    <SpotifyPlayer
      token={accessToken}

      callback={state => {
        if (!state.isPlaying) setPlay(false);
        console.log('-------- player state: ' + JSON.stringify(state));

        if(prevTrack != state.name){
          setPrevTrack(state.name);
        }


        else if(state.position == 0 && accum == 0){
          setAccum(accum + 1);
        }
        else if(state.position == 0 && accum != 0){
          playNextInTheQueue();
          setAccum(0);
        }
  

        console.log("WWWWWWWcur" + state.position );
        console.log("Thing " + accum);

      }}

      
      play={play}
      uris={trackUri ? [trackUri] : []}

      // queue={queue}

      styles={{
        activeColor: '#fff',
        bgColor: '#333',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }}
    />
  )
}
