const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className={error ? `red notification` : `notification`}>{message}</div>
  );
};

export default Notification;
