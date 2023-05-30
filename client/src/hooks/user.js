import { useState } from "react";

function userHooks() {
  const [loginUser, setLoginUser] = useState(null);

  const handleLoginEvent = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/auth`;
  };

  return { 
    loginUser, 
    setLoginUser,
    handleLoginEvent, 
  };
}

export default userHooks;