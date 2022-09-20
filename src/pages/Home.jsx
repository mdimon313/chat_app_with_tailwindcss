import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <header className="p-5">
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </header>
    </div>
  );
}

export default Home;
