import { createContext, useContext, useState } from "react";
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
  const [audioSorce, setAudioSource] = useState("");

  const onPlay = async (text) => {
    console.log("호출!");
    const buffer = await audioService.getAudio(text);
    const audioContext = getAudioContext();

    // makeAudio(response)
    const audioBuffer = await audioContext.decodeAudioData(buffer);

    //create audio source
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();

    setAudioSource(source);
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
