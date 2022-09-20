import { doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInputGrup from "../component/FormInputGrup";
import { useAuth } from "../context/AuthContext";
import { auth, db } from "../firebase";

const SIGNUP_FORM_VALUES = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup() {
  const [inputValue, setInputValue] = useState({ ...SIGNUP_FORM_VALUES });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { signup } = useAuth();
  const currentAuth = auth;

  function handleChange(e) {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  }
  const { name, email, password, confirmPassword } = inputValue;

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("password don't match.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      setLoading(true);
      setError("");
      await signup(email, password, name);

      // set user document
      await setDoc(doc(db, "users", currentAuth.currentUser.uid), {
        uid: currentAuth.currentUser.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      navigate("/chat");
    } catch (error) {
      setLoading(false);
      setError("Faild to create an Account!");
      setTimeout(() => {
        setError("");
      }, 3000);
    }

    setInputValue({ ...SIGNUP_FORM_VALUES });
  }
  return (
    <div className="dark:bg-gray-900 h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <h2 className="dark:text-white text-3xl mb-4">Create your account</h2>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img
              src="./images/signup.svg"
              alt="welcome"
              className="w-full select-none"
            />
          </div>
          <form onSubmit={handleFormSubmit} className="md:px-5">
            {error && (
              <div className="bg-red-300 py-2 text-center rounded-md mt-4 md:mt-0">
                <p>{error}</p>
              </div>
            )}
            <FormInputGrup
              type="text"
              name="name"
              placeholder="your name"
              value={name}
              autoCorrect="off"
              required
              autoComplete="off"
              onChange={handleChange}
            />
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
            <FormInputGrup
              type="password"
              name="confirmPassword"
              placeholder="Re-type password"
              value={confirmPassword}
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
                {loading ? "Creating..." : "Sign up"}
              </button>
            </div>
            <div className="dark:text-gray-400 pt-3 text-center text-sm">
              <p>
                Already have an account? <Link to="/login">login here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
