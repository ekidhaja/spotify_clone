import Body from "./Body";
import Sidebar from "./Sidebar";
import Right from "./Right";
import SpotifyWebApi from "spotify-web-api-node";
import { playingTrackState } from "../atoms/playerAtom";
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
});

const Dashboard = () => {
    const { data: session } = useSession();
    const { accessToken } = session;
    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

    const chooseTrack = (track) => {
        setPlayingTrack(track);
    };

    return (
        <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
            <Sidebar />
            <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
            <Right spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
        </main>
    );
}
 
export default Dashboard;