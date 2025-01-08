 const Loading: React.FC<{message?: string}> =({message}) => {
  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default Loading
