import { useState, useEffect } from "react"
// import SpotifyPlayer from "react-spotify-web-playback"
import { spotifyApi } from 'react-spotify-web-playback';
// import getQueue from "react-spotify-web-playback"

export default function Que({accessToken, playNextInTheQueue}) {
    // console.log(accessToken)
    const [queueResults, setQueueResults] = useState([])

    // useEffect(() => {
    //     spotifyApi.getQueue(accessToken).then(res => {
    //         console.log(JSON.stringify(res))
    //         setQueueResults(res)
    //       })
    //   }, [queueResults])


      function playNextInQueue(){

        playNextInTheQueue();

      }

  return (
      <div>
          <h1>QUEUE:</h1>
          <button onClick={playNextInQueue}>Play Next</button>
          <h1> </h1>
      </div>
  )
}