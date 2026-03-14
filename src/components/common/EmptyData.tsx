export default function EmptyData({
  message = "No data yet.",
}: Readonly<{ message?: string }>) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "48px 16px",
        color: "#6b7280",
        fontSize: 14,
      }}
    >
      {message}
    </div>
  );
}
