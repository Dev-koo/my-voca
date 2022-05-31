let commonInedex = 6;

let groups = [
  {
    id: 1,
    group_name: "모든 그룹",
    user_id: 1,
    create_at: Date.now(),
    count: 100,
  },
  {
    id: 2,
    group_name: "그룹 미지정",
    user_id: 1,
    create_at: Date.now(),
    count: 100,
  },
  { id: 3, group_name: "그룹1", user_id: 1, create_at: Date.now(), count: 100 },
  { id: 4, group_name: "그룹2", user_id: 1, create_at: Date.now(), count: 100 },
  { id: 5, group_name: "그룹3", user_id: 1, create_at: Date.now(), count: 100 },
  //   { id: 6, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 7, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 8, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 9, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 10, group_name: "그룹2", user_id: 1, create_at: Date.now() },
  //   { id: 11, group_name: "그룹3", user_id: 1, create_at: Date.now() },
  //   { id: 12, group_name: "그룹4", user_id: 1, create_at: Date.now() },
  //   { id: 13, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 14, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 15, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 16, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 17, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 18, group_name: "그룹2", user_id: 1, create_at: Date.now() },
  //   { id: 19, group_name: "그룹3", user_id: 1, create_at: Date.now() },
  //   { id: 20, group_name: "그룹4", user_id: 1, create_at: Date.now() },
  //   { id: 21, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 22, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 23, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 24, group_name: "그룹1", user_id: 1, create_at: Date.now() },
];

let groupsHidden = [
  {
    id: 2,
    group_name: "그룹 미지정",
    user_id: 1,
    create_at: Date.now(),
    count: 100,
  },
  { id: 3, group_name: "그룹1", user_id: 1, create_at: Date.now(), count: 100 },
  { id: 4, group_name: "그룹2", user_id: 1, create_at: Date.now(), count: 100 },
  { id: 5, group_name: "그룹3", user_id: 1, create_at: Date.now(), count: 100 },
  //   { id: 6, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 7, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 8, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 9, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 10, group_name: "그룹2", user_id: 1, create_at: Date.now() },
  //   { id: 11, group_name: "그룹3", user_id: 1, create_at: Date.now() },
  //   { id: 12, group_name: "그룹4", user_id: 1, create_at: Date.now() },
  //   { id: 13, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 14, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 15, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 16, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 17, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 18, group_name: "그룹2", user_id: 1, create_at: Date.now() },
  //   { id: 19, group_name: "그룹3", user_id: 1, create_at: Date.now() },
  //   { id: 20, group_name: "그룹4", user_id: 1, create_at: Date.now() },
  //   { id: 21, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 22, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 23, group_name: "그룹1", user_id: 1, create_at: Date.now() },
  //   { id: 24, group_name: "그룹1", user_id: 1, create_at: Date.now() },
];

export async function getGroups() {
  return { groups, groupsHidden };
}
export async function getGroupsHidden() {
  return groupsHidden;
}

export async function create(group) {
  const groupWithIdx = { id: commonInedex, ...group };
  groups = [...groups, groupWithIdx];
  groupsHidden = [...groupsHidden, groupWithIdx];
  commonInedex += 1;
  return groupWithIdx;
}

export async function remove(id) {
  groups = groups.filter((group) => group.id !== id);
  return id;
}
