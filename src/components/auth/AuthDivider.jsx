export default function AuthDivider({ text = "or continue with" }) {
  return (
    <div className="divider-or">
      <span>{text}</span>
    </div>
  );
}
