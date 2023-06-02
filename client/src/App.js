import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./assets/Loader.jsx";

const App = () => {
  const [loginUser, setLoginUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api`)
      .then(res => {
        setIsLoading(false);
      })
      .catch(err => {
        toast.warn("Looks like something went wrong! Try again later...");
      })
  }, []);

  const RedirectHome = () => {
    useEffect(() => {
      const timeout = setTimeout(() => {
        window.location.replace("/");
      }, 1000);
      return () => clearTimeout(timeout);
    }, []);
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          isLoading
            ? <Loader />
            : <HomePage loginUser={loginUser} setLoginUser={setLoginUser} />
        } />
        <Route path="/info/:userId" element={
          loginUser
            ? <InfoPage loginUser={loginUser} />
            : <RedirectHome />
        } />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;