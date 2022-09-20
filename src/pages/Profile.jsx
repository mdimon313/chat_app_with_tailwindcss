import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Profile() {
  const history = useNavigate();
  const user = {
    profile:
      "https://scontent.fdac24-1.fna.fbcdn.net/v/t39.30808-6/306537605_873682096932212_3887625685607784328_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeH_pKjsK9mcWF2HU-sG6SXiVmLarxXo2IxWYtqvFejYjAkBwBfXg5O2O3DqDxoYsTzmYrDPBuFtMb4OaPN97l8w&_nc_ohc=aiX7vUrKqO8AX8k86jv&_nc_ht=scontent.fdac24-1.fna&oh=00_AT8lNxAYP2eFWS1l1__2_BZfNeE6Nt0OtYh630K3hxWzpw&oe=6326ABFD",
  };
  return (
    <div className="h-screen w-full bg-[#f6f6f6] dark:bg-gray-900 flex items-center justify-center">
      <div className="container mx-auto">
        <div className="mx-2 md:w-1/2 md:mx-auto border border-[#aaaaaa] bg-slate-200 dark:bg-gray-700 rounded-md p-4 transition-all">
          <button
            type="button"
            onClick={() => history(-1)}
            className="w-[40px] h-[40px] dark:text-white hover:bg-gray-300 dark:hover:text-black grid place-items-center rounded-[50%] transition-all select-none"
          >
            <i className="fa-solid fa-arrow-left select-none"></i>
          </button>
          <div className="relative w-[120px] h-[120px] mx-auto rounded-[50%] shadow-lg mb-3">
            {user ? (
              <img
                src={user.profile}
                alt={user.name}
                className="select-none object-fill w-[120px] h-[120px] rounded-[50%]"
              />
            ) : (
              <i className="fa-solid fa-circle-user w-full text-3xl"></i>
            )}

            <label
              htmlFor="profile"
              className="absolute right-4 bottom-0 w-[25px] h-[25px] bg-white rounded-[50%] flex items-center justify-center cursor-pointer select-none"
            >
              <i className="fa-solid fa-camera text-xs z-10"></i>
            </label>
            <input type="file" name="prfile" id="profile" className="hidden" />
          </div>
          <h1 className="text-2xl text-center font-bold text-gray-800 dark:text-gray-50">
            <i className="fa-solid fa-user mr-2 select-none"></i>
            {auth.currentUser.displayName}
          </h1>
          <p className="mt-2 text-center text-[#aaaaaa]">
            <i className="fa-solid fa-envelope mr-2 select-none"></i>
            {auth.currentUser.email}
          </p>
          <p className="mt-2 text-center text-[#aaaaaa] text-xs">
            <i className="fa-solid fa-calendar-days mr-2 select-none"></i>
            {auth.currentUser.metadata.creationTime}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
