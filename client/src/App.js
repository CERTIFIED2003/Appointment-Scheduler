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

const App = () => {
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/`);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api`);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <HomePage loginUser={loginUser} setLoginUser={setLoginUser} />
        } />
        <Route path="/info/:userId" element={<InfoPage loginUser={loginUser} />} />
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