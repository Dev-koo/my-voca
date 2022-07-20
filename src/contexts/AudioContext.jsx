import { createContext, useContext } from "react";
import AudioService from "../service/audioService";

const AudioPlayContext = createContext();

const audioService = new AudioService();

const AudioPlayer = () => {
  return (
    <audio autoPlay>
      <source type="audio/mpeg" />
    </audio>
  );
};

export const AudioProvider = ({ children }) => {
  const onPlay = (text) => {
    audioService
      .getAudio(text) //
      .then((source) => source.start());
  };

  return (
    <AudioPlayContext.Provider value={onPlay}>
      <AudioPlayer />
      {children}
    </AudioPlayContext.Provider>
  );
};

export const useAudio = () => useContext(AudioPlayContext);
