const Queue = ({queue}) => {
    return (
        <>
            <h3>Playlist</h3>
            <ul>
                {queue && queue.tracks.map((queueTrack) => (
                    <li key={queueTrack.track.uri}>
                        {queueTrack.track.title} ({queueTrack.track.artist})
                        <img src={queueTrack.track.albumUrl} height="40" alt={queueTrack.track.title}/>
                        added by {queueTrack.user.name}
                    </li>
                ))}
            </ul>
        </>
    );
};
export default Queue;
