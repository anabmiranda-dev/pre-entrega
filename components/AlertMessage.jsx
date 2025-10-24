function AlertMessage({ message }) {
  if (!message) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "100px",
      right: "20px",
      background: "#d9534f",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      zIndex: 10000,
    }}>
      {message}
    </div>
  );
}

export default AlertMessage;