import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInputGrup from "../component/FormInputGrup";
import { useAuth } from "../context/AuthContext";
import { auth, db } from "../firebase";

const LOGIN_FORM_VALUES = {
  email: "",
  password: "",
};

function Login() {
  const [inputValue, setInputValue] = useState({ ...LOGIN_FORM_VALUES });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  }
  const { email, password } = inputValue;

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);

      // update doc
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        isOnline: true,
      });
      navigate("/chat");
    } catch (error) {
      setLoading(false);
      setError("Invalid email or password");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
    setInputValue({ ...LOGIN_FORM_VALUES });
  }
  return (
    <div className="dark:bg-gray-900 h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <h2 className="dark:text-white text-3xl mb-4">Login your account</h2>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img
              src="./images/login.svg"
              alt="welcome"
              className="w-full select-none p-7"
            />
          </div>
          <form onSubmit={handleFormSubmit} className="md:px-5">
            {error && (
              <div className="bg-red-300 py-2 text-center rounded-md mt-4 md:mt-0">
                <p>{error}</p>
              </div>
            )}
            <FormInputGrup
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={email}
              autoCorrect="off"
              required
              autoComplete="off"
              onChange={handleChange}
            />
            <FormInputGrup
              type="password"
              name="password"
              placeholder="******"
              value={password}
              autoCorrect="off"
              required
              autoComplete="off"
              onChange={handleChange}
            />

            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={loading}
                className="block w-full md:w-1/3 rounded-md bg-green-300 hover:bg-green-400 text-lg py-1 mt-2 transition-all select-none"
              >
                {loading ? "Loging..." : "Log in"}
              </button>
            </div>
            <div className="dark:text-gray-400 pt-3 text-center text-sm">
              <p>
                Don't have an account? <Link to="/signup">signup here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
