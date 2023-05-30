function userHooks() {
  const handleLoginEvent = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/auth`;
  };

  return {
    handleLoginEvent,
  };
}

export default userHooks;