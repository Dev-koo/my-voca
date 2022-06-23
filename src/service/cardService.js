export default class CardsService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  // 모든 그룹 카드
  async getCard(groupName) {
    const query = groupName ? `?groupname=${groupName}` : "";
    return await this.http.fetch(`/cards${query}`, {
      method: "GET",
      headers: this.getHeader(),
    });
  }

  // 랜덤정렬 모든 그룹 카드
  async getRandomCard() {
    return await this.http.fetch(`/cards/random`, {
      method: "GET",
      headers: this.getHeader(),
    });
  }

  // 랜덤 정렬, 모든 그룹 카드, 개수 지정
  //  async getSlicedRandomCard(slice) {
  //   if (!slice) {
  //     return await getRandomCard();
  //   }
  //   return cards.sort(() => Math.random() - 0.5).slice(0, slice);
  // }

  // 카드 생성
  async createCard(card) {
    const { word, mean, memo, group_id } = card;
    return await this.http.fetch(`/cards`, {
      method: "POST",
      headers: this.getHeader(),
      body: JSON.stringify({ word, mean, memo, group_id }),
    });
  }

  // 카드 수정
  async updateCard(card) {
    const { id, word, mean, memo, group_name, group_id, level } = card;
    return await this.http.fetch(`/cards/${id}`, {
      method: "PUT",
      headers: this.getHeader(),
      body: JSON.stringify({ word, mean, memo, group_name, group_id, level }),
    });
  }

  // 카드 삭제
  async removeCard(id) {
    return await this.http.fetch(`/cards/${id}`, {
      method: "DELETE",
      headers: this.getHeader(),
    });
  }

  async getCardByGroupName(groupName) {
    return await this.http.fetch(`/groups/${groupName}`, {
      method: "GET",
      headers: this.getHeader(),
    });
  }

  getHeader() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
