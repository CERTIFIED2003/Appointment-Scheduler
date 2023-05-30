import { useEffect } from "react";
import { useLocalStorage } from "./helpers/useLocalStorage";

const App = () => {
  const [loginUser, setLoginUser] = useLocalStorage("user", null);

  const handleLoginSuccess = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/auth`;
  };

  const handleLogout = () => {
    setLoginUser(null);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedUser = urlParams.get('user');
    if (encodedUser) {
      const userJson = decodeURIComponent(encodedUser);
      const user = JSON.parse(userJson);
      setLoginUser(user);

      // Remove the "user" query parameter from the URL
      if (urlParams.has('user')) {
        urlParams.delete('user');
        window.history.replaceState({}, document.title, `?${urlParams.toString()}`);
      }
    }
  }, []);

  return (
    <>
      <nav className="navbar">
        <div>
          <h1>Events Scheduler</h1>
        </div>
        {!loginUser ? (
          <div className="auth-buttons">
            <button onClick={handleLoginSuccess} className="google-btn">
              <span className="google-icon"></span>
              <span className="google-text">Login</span>
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <button onClick={handleLogout} className="google-btn">
              <span className="google-icon"></span>
              <span className="google-text">Logout</span>
            </button>
          </div>
        )}
      </nav>
      <section className="content">

      </section>
    </>
  );
};

export default App;