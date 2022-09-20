import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import PublicRoute from "./component/PublicRoute";
import { Provider } from "./context/AuthContext";
import Chat from "./pages/Chat";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

function App() {
  const [theme, setTheme] = useState(localStorage.theme);
  useEffect(() => {
    const body = document.querySelector("body");

    if (theme === "dark") {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }, [theme]);
  function switchTheme() {
    if (localStorage.getItem("theme") === "light") {
      setTheme(localStorage.setItem("theme", "dark"));
      const currentTheme = localStorage.getItem("theme");
      setTheme(currentTheme);
    } else {
      localStorage.setItem("theme", "light");
      const currentTheme = localStorage.getItem("theme");
      setTheme(currentTheme);
    }
  }

  return (
    <>
      <div className="absolute left-0 top-1/2 py-1 px-3 rounded-md bg-blue-500 opacity-75 text-center cursor-pointer -translate-x-[80%] hover:-translate-x-[0] transition-all z-[11]">
        <button
          type="button"
          className="m-0 text-slate-50 w-full h-full"
          onClick={switchTheme}
        >
          <i
            className={
              theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun"
            }
          ></i>
        </button>
      </div>
      <Provider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Error />} />
          <Route path="/*" element={<PublicRoute />}>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/*" element={<PrivateRoute />}>
            <Route
              path="chat"
              element={<Chat theme={theme} switchTheme={switchTheme} />}
            />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
