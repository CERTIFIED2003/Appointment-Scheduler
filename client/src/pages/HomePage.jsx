import userHooks from "../hooks/user";
import Form from "../components/Form/Form";
import { useEffect } from "react";

const HomePage = () => {
    const { loginUser, setLoginUser, handleLoginEvent } = userHooks();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const encodedUser = urlParams.get('user');
        if (encodedUser) {
            setLoginUser(true);

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
                {!loginUser && (
                    <div className="auth-buttons">
                        <button onClick={handleLoginEvent} className="google-btn">
                            <span className="google-icon"></span>
                            <span className="google-text">Login</span>
                        </button>
                    </div>
                )}
            </nav>
            <section className="content">
                <Form
                    loginUser={loginUser}
                />
            </section>
        </>
    );
};

export default HomePage;