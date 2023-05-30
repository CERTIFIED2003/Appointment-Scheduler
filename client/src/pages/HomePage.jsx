import userHooks from "../hooks/user";
import Form from "../components/Form/Form";
import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";

const HomePage = () => {
    const { loginUser, setLoginUser } = userHooks();

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
            <Navbar />
            <section className="content">
                <Form
                    loginUser={loginUser}
                />
            </section>
        </>
    );
};

export default HomePage;