import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth, db } from "../firebase";

function Profile() {
  const [logedInUser, setlogedInUser] = useState(null);
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap) {
        setlogedInUser(docSnap.data());
      }
    });
  }, []);

  async function logOut() {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await logout();
    navigate("/login");
  }

  return (
    <div className="border-b-[1px] border-gray-400 dark:bg-gray-700 shadow-sm p-3 flex items-center justify-between">
      <Link to="/profile" className="flex items-center" title="Profile">
        {logedInUser ? (
          <img
            src={logedInUser.profile}
            alt={"profile"}
            className="w-[40px] h-[40px] rounded-[100%] object-cover"
          />
        ) : (
          <i className="fa-regular fa-circle-user text-2xl cursor-pointer select-none"></i>
        )}
        <h2 className="ml-2 capitalize">{currentUser.displayName}</h2>
      </Link>
      <i
        className="fa-solid fa-arrow-right-from-bracket select-none cursor-pointer"
        onClick={logOut}
      ></i>
    </div>
  );
}

export default Profile;
