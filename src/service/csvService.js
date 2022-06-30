export default class CsvService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async upload(file) {
    return await this.http.fetch(`/csv/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        ...this.getHeader(),
      },
      body: file,
    });
  }

  async save(cards) {
    return await this.http.fetch(`/csv/save`, {
      method: "POST",
      headers: {
        ...this.getHeader(),
      },
      body: JSON.stringify({ cards }),
    });
  }

  getHeader() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
