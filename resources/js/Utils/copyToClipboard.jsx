export default function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert("コピーしました");
    }).catch((err) => {
      console.error("コピーに失敗しました", err);
    });
  }