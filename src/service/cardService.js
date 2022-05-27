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
];

export async function getCard() {
  return cards;
}

export async function createCard(card) {
  cards = [card, ...cards];
  return cards;
}

export async function changeLevel(id) {
  const card = cards.find((card) => card.id === id);
  const currentLevel = card.level;
  const changedLevel = getLevel(currentLevel);
  card.level = changedLevel;
  return card ? card : null;
}

export async function updateCard(card) {
  cards = cards.map((item) => {
    if (item.id === card.id) {
      return card;
    }
    return item;
  });
  return card;
}

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
