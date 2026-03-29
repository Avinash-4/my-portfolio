export default function Divider() {
  return (
    <div
      className="outline"
      style={{
        width: "100%",
        height: "1px",
        background: "linear-gradient(90deg, var(--primary-color), var(--ternery-color), transparent)",
        boxShadow: "0 0 6px var(--glow)",
        opacity: 0.5,
      }}
    />
  );
}
