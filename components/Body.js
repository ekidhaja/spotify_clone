import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Poster from "./Poster";
import Search from "./Search";
import Track from "./Track";

const Body = ({ chooseTrack, spotifyApi }) => {
  const { data: session } = useSession();
  const { accessToken } = session;
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  //check if accessToken is valid and set it
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Searching spotidfyApi for tracks based on search keyword
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  // Search spotifyApi for new releases
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getNewReleases().then((res) => {
      setNewReleases(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);

  return (
    <section className="pb-32 bg-black pr-4 py-4 space-y-8 overflow-y-scroll
    scrollbar-hide h-screen md:max-w-6xl flex-grow">
      <Search search={search} setSearch={setSearch} />
      <div className="scrollbar-hide h-[auto] pr-4 py-4 overflow-x-scroll w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:w-[600px] gap-x-4 
        gap-y-8 p-4 md:grid-cols-4 pr-4 py-4
        md:w-[1200px]">
        {searchResults.length === 0
          ? newReleases
              .slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))
          : searchResults
              .slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))}
            </div>
      </div>

      <div className="md:flex md:gap-x-8 min-w-full">
        {/* Display Genres */}
        <div className="mb-14 md:max-w-[30%] xl:min-w-[25%]">
          <h2 className="text-white font-bold mb-3">Genres</h2>
          <div className="flex gap-x-2 gap-y-2.5 flex-wrap mb-3">
            <div className="genre">Classic</div>
            <div className="genre">House</div>
            <div className="genre">Minimal</div>
            <div className="genre">Hip-hop</div>
            <div className="genre">Electronic</div>
            <div className="genre">Chillout</div>
            <div className="genre">Blues</div>
            <div className="genre">Country</div>
            <div className="genre">Techno</div>
          </div>
          <button className="text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
            All Genres
          </button>
        </div>

        {/* Display Tracks */}
        <div className="md:max-w-[70%] xl:min-w-[72%]">
          <h2 className="text-white font-bold mb-3">
            {searchResults.length === 0 ? "New Releases" : "Tracks"}
          </h2>
          <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 
          bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin 
          scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500">
            {searchResults.length === 0
              ? newReleases
                  .slice(4, newReleases.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))
              : searchResults
                  .slice(4, searchResults.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Body;