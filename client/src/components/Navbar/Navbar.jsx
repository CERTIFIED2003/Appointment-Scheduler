import userHooks from "../../hooks/user";
import "./style.css";

const Navbar = () => {
    const { loginUser, handleLoginEvent } = userHooks();

    return (
        <nav className="navbar">
            <div>
                <h1>Events Scheduler</h1>
            </div>
            {!loginUser ? (
                <div className="auth-buttons">
                    <button onClick={handleLoginEvent} className="google-btn">
                        <span className="google-icon"></span>
                        <span className="google-text">Login</span>
                    </button>
                </div>
            ) : (
                <div className="auth-buttons">
                    <button className="google-btn">
                        <span className="google-text">Info</span>
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navbar