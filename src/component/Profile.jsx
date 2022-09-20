import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth, db } from "../firebase";

function Profile() {
  const src =
    "https://image.shutterstock.com/image-photo/stock-photo-head-shot-young-attractive-businessman-in-glasses-standing-in-modern-office-pose-for-camera-250nw-1854697390.jpg";
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

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
        {src ? (
          <img
            src={src}
            alt={"profile"}
            className="w-[40px] h-[40px] rounded-[100%]"
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
