import Body from "./Body";
import Sidebar from "./Sidebar";
import Right from "./Right";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
});

const Dashboard = () => {
    return (
        <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
            <Sidebar />
            <Body />
            <Right />
        </main>
    );
}
 
export default Dashboard;