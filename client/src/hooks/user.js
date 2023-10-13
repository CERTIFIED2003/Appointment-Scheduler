function userHooks(backendURL) {
  const handleLoginEvent = () => {
    window.location.href = `${backendURL}/api/auth`;
  };

  return {
    handleLoginEvent,
  };
}

export default userHooks;