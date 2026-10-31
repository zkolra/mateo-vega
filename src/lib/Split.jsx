/* Разбивает текст на строки (по \n) и, по желанию, на буквы или слова,
   чтобы их можно было анимировать по отдельности. */

export function Lines({ text, className = "" }) {
  return text.split("\n").map((line, i) => (
    <span className={`split-line ${className}`} key={i}>
      <span>{line}</span>
    </span>
  ));
}

export function Chars({ text, className = "split-char" }) {
  return [...text].map((ch, i) => (
    <span className={className} key={i} aria-hidden="true">
      {ch === " " ? " " : ch}
    </span>
  ));
}

export function Words({ text, className = "split-word" }) {
  return text.split(" ").map((word, i) => (
    <span className={className} key={i}>
      {word}{" "}
    </span>
  ));
}
