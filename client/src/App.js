const App = () => {
  const handleLoginSuccess = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/auth`;
  };

  return (
    <>
      <div>
        <h1>Events Scheduler</h1>
      </div>
      <div>
        <button onClick={handleLoginSuccess}>Login</button>
      </div>
    </>
  );
};

export default App;
