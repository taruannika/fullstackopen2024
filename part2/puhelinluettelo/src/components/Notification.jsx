const Notification = ({ notification }) => {
  if (notification.message === null) return null;

  return (
    <div className={`notification ${notification.hasError ? "error" : ""}`}>
      {notification.message}
    </div>
  );
};
export default Notification;
