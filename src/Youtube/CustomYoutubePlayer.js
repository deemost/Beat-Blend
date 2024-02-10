import YoutubePlayer from 'react-youtube'

export default function CustomYoutubePlayer({ videoId, playNextInTheQueue }) {

  const opts = {
    height: '100',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <YoutubePlayer videoId={videoId} opts={opts} onEnd={playNextInTheQueue}></YoutubePlayer>
  );
}
