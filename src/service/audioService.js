class AudioService {
  constructor() {
    this.audioCtx = new AudioContext();
  }

  async getAudio(text) {
    return await fetch(`http://localhost:8000/audio/${text}`, {
      method: "GET",
    })
      .then((response) => response.arrayBuffer())
      .then((buffer) => this.audioCtx.decodeAudioData(buffer))
      .then((decodedData) => {
        const source = this.audioCtx.createBufferSource();

        source.buffer = decodedData;
        source.connect(this.audioCtx.destination);

        return source;
      });
  }
}

export default AudioService;
