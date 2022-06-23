// let groups = [
//   {
//     id: 1,
//     group_name: "모든 그룹",
//     user_id: 1,
//     create_at: Date.now(),
//     count: 10,
//   },
//   {
//     id: 2,
//     group_name: "그룹 미지정",
//     user_id: 1,
//     create_at: Date.now(),
//     count: 55,
//   },
//   { id: 3, group_name: "그룹1", user_id: 1, create_at: Date.now(), count: 12 },
//   { id: 4, group_name: "그룹2", user_id: 1, create_at: Date.now(), count: 15 },
//   { id: 5, group_name: "그룹3", user_id: 1, create_at: Date.now(), count: 14 },
//   //   { id: 6, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 7, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 8, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 9, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 10, group_name: "그룹2", user_id: 1, create_at: Date.now() },
//   //   { id: 11, group_name: "그룹3", user_id: 1, create_at: Date.now() },
//   //   { id: 12, group_name: "그룹4", user_id: 1, create_at: Date.now() },
//   //   { id: 13, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 14, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 15, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 16, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 17, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 18, group_name: "그룹2", user_id: 1, create_at: Date.now() },
//   //   { id: 19, group_name: "그룹3", user_id: 1, create_at: Date.now() },
//   //   { id: 20, group_name: "그룹4", user_id: 1, create_at: Date.now() },
//   //   { id: 21, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 22, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 23, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 24, group_name: "그룹1", user_id: 1, create_at: Date.now() },
// ];

// let groupsHidden = [
//   {
//     id: 2,
//     group_name: "그룹 미지정",
//     user_id: 1,
//     create_at: Date.now(),
//     count: 10,
//   },
//   { id: 3, group_name: "그룹1", user_id: 1, create_at: Date.now(), count: 12 },
//   { id: 4, group_name: "그룹2", user_id: 1, create_at: Date.now(), count: 15 },
//   { id: 5, group_name: "그룹3", user_id: 1, create_at: Date.now(), count: 14 },
//   //   { id: 6, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 7, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 8, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 9, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 10, group_name: "그룹2", user_id: 1, create_at: Date.now() },
//   //   { id: 11, group_name: "그룹3", user_id: 1, create_at: Date.now() },
//   //   { id: 12, group_name: "그룹4", user_id: 1, create_at: Date.now() },
//   //   { id: 13, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 14, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 15, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 16, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 17, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 18, group_name: "그룹2", user_id: 1, create_at: Date.now() },
//   //   { id: 19, group_name: "그룹3", user_id: 1, create_at: Date.now() },
//   //   { id: 20, group_name: "그룹4", user_id: 1, create_at: Date.now() },
//   //   { id: 21, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 22, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 23, group_name: "그룹1", user_id: 1, create_at: Date.now() },
//   //   { id: 24, group_name: "그룹1", user_id: 1, create_at: Date.now() },
// ];

export default class GroupService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async getGroups(groupName) {
    const query = groupName ? `?groupname=${groupName}` : "";
    return await this.http.fetch(`/groups${query}`, {
      method: "GET",
      headers: this.getHeader(),
    });
  }

  async create(group_name) {
    return await this.http.fetch(`/groups`, {
      method: "POST",
      headers: this.getHeader(),
      body: JSON.stringify(group_name),
    });
  }

  async remove(id) {
    return await this.http.fetch(`/groups/${id}`, {
      method: "DELETE",
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
