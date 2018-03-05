let emojidexCache;

export const fetchEmojis = async () => {
  if (!emojidexCache) {
    const response = await fetch(
      "https://cdn.emojidex.com/static/utf_emoji.json"
    );
    emojidexCache = await response.json();
  }
  return emojidexCache;
};

const isTheRightEmoji = (emoji, name) => emoji.code === name;

export const getTheMoji = emoji => emoji.moji;

export async function getEmoji(name) {
  const emojis = await fetchEmojis();
  const emoji = emojis.find(item => isTheRightEmoji(item, name));
  if (emoji) {
    return getTheMoji(emoji);
  }
  return "";
}

export const allYourBase = async base => {
  const emojis = await fetchEmojis();

  return emojis
    .filter(item => item.base === base)
    .reduce((previous, current) => previous + getTheMoji(current), "");
};

export const insertEmoji = emoji => {
  const h1 = document.getElementById("heading");
  h1.innerHTML = emoji;
};
