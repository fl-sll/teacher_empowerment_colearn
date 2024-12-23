import "../styles/Chip.css";

function Label({ text }) {
  return <div className={`label_chip ${text.toLowerCase()}`}>{text.toLowerCase()}</div>;
}

export default Label;
