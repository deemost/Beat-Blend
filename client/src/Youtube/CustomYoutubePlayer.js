import { useState, useEffect } from "react";
import YoutubePlayer from 'react-youtube'

export default function CustomYoutubePlayer({ videoId, playNextInTheQueue }) {
  
  const [prevIsPlaying, setPrevIsPlaying] = useState(true);

  return (
    <YoutubePlayer videoId={videoId}></YoutubePlayer>
  );
}
