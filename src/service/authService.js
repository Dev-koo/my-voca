export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  // 회원가입
  async signup(username, password) {
    const data = await this.http.fetch(`/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    this.tokenStorage.saveToken(data.token);
    return data;
  }

  // 로그인
  async login(username, password) {
    const data = await this.http.fetch(`/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async me() {
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  // 로그아웃
  async logout() {
    this.tokenStorage.clearToken();
  }
}
