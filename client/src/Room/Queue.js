const Queue = ({queue}) => {
    // console.log("before queue useEffect, queue=" + JSON.stringify(queue));
    return (
        <>
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
