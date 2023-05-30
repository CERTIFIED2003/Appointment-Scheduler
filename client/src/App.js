import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState({});

  const handleLoginSuccess = response => {
    setUser(jwt_decode(response.credential));
  };

  const handleLoginError = error => {
    console.log(error);
  };

  return (
    <>
      <div>
        <h1>Events Scheduler</h1>
      </div>
      <div>
        <GoogleLogin
          text="continue_with"
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
    </>
  );
};

export default App;