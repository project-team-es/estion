export const copyToClipboard = (text) => {
  return navigator.clipboard
    .writeText(text)
    .then(() => {})
    .catch((err) => {
      console.error('コピーに失敗しました:', err);
    });
};
