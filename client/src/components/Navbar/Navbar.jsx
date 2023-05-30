import { Link } from "react-router-dom";
import "./style.css";
import userHooks from "../../hooks/user";

const Navbar = ({ loginUser }) => {
    const { handleLoginEvent } = userHooks();

    return (
        <nav className="navbar">
            <div>
                <Link to="/"><h1>Events Scheduler</h1></Link>
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
                    <Link to={`/info/${loginUser._id}`}>
                        <button className="google-btn">
                            <span className="google-text">Info</span>
                        </button>
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar