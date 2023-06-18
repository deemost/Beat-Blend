import SpotifySearch from "./Spotify/SpotifySearch";
import useSpotifyAuth from "./Spotify/useSpotifyAuth";

export default function Dashboard2({code}) {


    console.log("code = " + code);

    // const spotifyAccessToken = useSpotifyAuth(code);

    const spotifyAccessToken = "BQDCmJUztsNel2vsNOsiwFqW9zS6FhskI_w_G7-UjE1Sp6jhAGG7N1kJsxdGz6Bj6gUGTqWBn5a2mC4B1_VTk2naqGoNcCM-c3xATUajdfPR4vqO1gbyxPC7iS8dCooQ16R4e9KonOGC9klF8CSgHsRrcSUeQlvsa8Kd6MHEu0KMQF72SQJJPqtKxxiok_hjWozrU21ug5C38OGbaniQKFOBNeBrsewJ9kUlvk0";


    console.log("access token = " + spotifyAccessToken);
    return (
        <div>
            <SpotifySearch spotifyAccessToken={spotifyAccessToken}></SpotifySearch>
            <div></div>
        </div>
    )
}