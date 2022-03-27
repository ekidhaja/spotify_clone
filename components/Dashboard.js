import Body from "./Body";
import Sidebar from "./Sidebar";
import Right from "./Right";
import SpotifyWebApi from "spotify-web-api-node";
import { playingTrackState } from "../atoms/playerAtom";
import { useRecoilState } from "recoil";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
});

const Dashboard = () => {
    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

    const chooseTrack = (track) => {
        setPlayingTrack(track);
    };

    return (
        <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
            <Sidebar />
            <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
            <Right />
        </main>
    );
}
 
export default Dashboard;