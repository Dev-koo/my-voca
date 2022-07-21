class AudioService {
  // constructor() {
  //   this.audioCtx = new AudioContext();
  // }
  async getAudio(text) {
    const audioCtx = new AudioContext();
    return await fetch(`http://localhost:8000/audio/${text}`, {
      method: "GET",
    })
      .then((response) => response.arrayBuffer())
      .then((buffer) => audioCtx.decodeAudioData(buffer))
      .then((decodedData) => {
        const source = audioCtx.createBufferSource();

        source.buffer = decodedData;
        source.connect(audioCtx.destination);

        return source;
      });
  }
}

export default AudioService;
