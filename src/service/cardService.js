let cards = [
  {
    id: 1,
    user_id: 100,
    word: "apple",
    mean: "사과",
    memo: null,
    group_name: "",
    level: "어려워요",
    create_at: Date.now(),
  },
  {
    id: 2,
    user_id: 100,
    word: "banana",
    mean: "바나나",
    memo: null,
    group_name: "그룹1",
    level: "애매해요",
    create_at: Date.now(),
  },
  {
    id: 3,
    user_id: 100,
    word: "tomato",
    mean: "토마토",
    memo: "토뭬이러",
    group_name: "",
    level: "외웠어요",
    create_at: Date.now(),
  },
  {
    id: 4,
    user_id: 100,
    word: "paper",
    mean: "종이",
    memo: "",
    group_name: "",
    level: "어려워요",
    create_at: Date.now(),
  },
  {
    id: 5,
    user_id: 100,
    word: "labtop",
    mean: "노트북",
    memo: "",
    group_name: "",
    level: "어려워요",
    create_at: Date.now(),
  },
  {
    id: 6,
    user_id: 100,
    word: "test",
    mean: "테스트",
    memo: "",
    group_name: "",
    level: "어려워요",
    create_at: Date.now(),
  },
  {
    id: 7,
    user_id: 100,
    word: "soccor",
    mean: "축구",
    memo: "",
    group_name: "",
    level: "어려워요",
    create_at: Date.now(),
  },
  {
    id: 8,
    user_id: 100,
    word: "falut",
    mean: "과일",
    memo: "",
    group_name: "",
    level: "어려워요",
    create_at: Date.now(),
  },
  {
    id: 9,
    user_id: 100,
    word: "boat",
    mean: "보트",
    memo: "",
    group_name: "",
    level: "어려워요",
    create_at: Date.now(),
  },
  {
    id: 10,
    user_id: 100,
    word: "cirle",
    mean: "원형",
    memo: "",
    group_name: "",
    level: "어려워요",
    create_at: Date.now(),
  },
];

// 모든 그룹 카드
export async function getCard() {
  return cards;
}

// 랜덤정렬 모든 그룹 카드
export async function getRandomCard() {
  return cards.sort(() => Math.random() - 0.5);
}

// 랜덤 정렬, 모든 그룹 카드, 개수 지정
export async function getSlicedRandomCard(slice) {
  if (!slice) {
    return await getRandomCard();
  }
  return cards.sort(() => Math.random() - 0.5).slice(0, slice);
}

// 카드 생성
export async function createCard(card) {
  cards = [card, ...cards];
  return cards;
}

// 카드 레벨 변경
export async function changeLevel(id) {
  const card = cards.find((card) => card.id === id);
  const currentLevel = card.level;
  const changedLevel = getLevel(currentLevel);
  card.level = changedLevel;
  return card ? card : null;
}

// 카드 수정
export async function updateCard(card) {
  cards = cards.map((item) => {
    if (item.id === card.id) {
      return card;
    }
    return item;
  });
  return card;
}

// 카드 삭제
export async function removeCard(id) {
  const card = cards.find((card) => card.id === id);
  cards = cards.filter((current) => current.id !== card.id);
  return cards;
}

const getLevel = (level) => {
  switch (level) {
    case "어려워요":
      return "애매해요";
    case "애매해요":
      return "외웠어요";
    case "외웠어요":
      return "어려워요";
    default:
      break;
  }
};
