const Queue = ({queue}) => {
    return (
        <>
            <h3>Playlist</h3>
            <div className={'scroll'}>
                <ul>
                    {queue && queue.tracks.map((queueTrack) => (
                        <li key={queueTrack.track.uri}>
                            <img src={queueTrack.track.albumUrl}
                                 height="40"
                                 alt={queueTrack.track.title}/>
                            {queueTrack.track.title} ({queueTrack.track.artist}) added by {queueTrack.user.name}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
export default Queue;
