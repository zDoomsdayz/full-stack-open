const Notification = ({ message, errorColor }) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = {
    color: errorColor,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
