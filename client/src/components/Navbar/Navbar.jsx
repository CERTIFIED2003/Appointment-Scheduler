import { Link } from "react-router-dom";
import { backend } from "../../hooks/backend";
import "./style.css";

const Navbar = ({ loginUser }) => {
    const { backendURL } = backend();

    const handleLoginEvent = () => {
        window.location.href = `${backendURL}/api/auth`;
    };

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