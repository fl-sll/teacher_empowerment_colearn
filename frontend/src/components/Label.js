import "../styles/Chip.css";

function Label({ text }) {
  return <div className={`label_chip ${text.toLowerCase()}`}>{text}</div>;
}

export default Label;
