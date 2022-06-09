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
  const onPlay = async (text) => {
    const buffer = await audioService.getAudio(text);
    const audioContext = getAudioContext();

    // makeAudio(response)
    const audioBuffer = await audioContext.decodeAudioData(buffer);

    //create audio source
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  };

  const getAudioContext = () => {
    const audioContent = new AudioContext();
    return audioContent;
  };
  return (
    <AudioPlayContext.Provider value={onPlay}>
      <AudioPlayer />
      {children}
    </AudioPlayContext.Provider>
  );
};

export const useAudio = () => useContext(AudioPlayContext);
