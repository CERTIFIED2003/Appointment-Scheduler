import Lottie from "lottie-react";
import loaderAnimation from "./Loader.json";
import "./Loader.css";

const Loader = () => {
    return (
        <div className="container">
            <div className="animation">
                <Lottie
                    loop={true}
                    autoplay={true}
                    animationData={loaderAnimation}
                    rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
                />
            </div>
        </div>
    )
}

export default Loader