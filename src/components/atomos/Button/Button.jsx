import "./Button.css";

export default function Button({
  children,
  classStyle,
  ...props
}) {
  return (
    <button
      className={`button ${classStyle}`}
      {...props}
    >
      {children}
    </button>
  );
}
