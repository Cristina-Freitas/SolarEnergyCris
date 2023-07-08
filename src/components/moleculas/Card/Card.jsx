import "./Card.css";

export default function Card({ title, value, clickable, ...props }) {

  return (
    <div className={`card ${clickable && 'clickable'}`} {...props}>
      <h3>{title}</h3>
      {value && <p>{value}</p>}
    </div>
  );
}
