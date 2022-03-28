import { atom } from "recoil";

//create play state
export const playState = atom({
  key: "playState",
  default: false,
});

//create play track state
export const playingTrackState = atom({
  key: "playingTrackState",
  default: "",
});