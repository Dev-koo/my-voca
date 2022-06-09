class AudioService {
  async getAudio(text) {
    return await fetch(`http://localhost:8000/audio/${text}`, {
      method: "GET",
    }).then((response) => response.arrayBuffer());
  }
}

export default AudioService;
