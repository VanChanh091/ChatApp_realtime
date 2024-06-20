export const funEmoji = [
  "🤏",
  "💅",
  "🎉",
  "🎃",
  "🎄",
  "🎭",
  "⚽",
  "🥋",
  "🎲",
  "♥",
  "🏓",
  "🤿",
  "💎",
  "💍",
  "👑",
  "🥼",
  "🖼",
  "🎨",
  "🎻",
  "💀",
  "👻",
  "🐱‍👤",
];
export const getRandomEmoji = () => {
  return funEmoji[Math.floor(Math.random() * funEmoji.length)];
};
