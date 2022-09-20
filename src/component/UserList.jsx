import React from "react";

function UserList({ user, hideNav, selectUser }) {
  // const src = null;
  // const status = false;
  const { name, isOnline, profile } = user;
  return (
    <div onClick={() => selectUser(user)}>
      <div
        className="rounded-lg hover:dark:bg-gray-700 p-3 flex items-center justify-between cursor-pointer hover:bg-slate-300 transition-all"
        onClick={() => hideNav(false)}
      >
        <div className="flex items-center">
          {profile ? (
            <img
              src={profile}
              alt={name}
              className="w-[36px] h-[36px] rounded-[100%]"
            />
          ) : (
            <i className="fa-regular fa-circle-user text-2xl cursor-pointer select-none"></i>
          )}
          <h2 className="ml-2 capitalize">{name}</h2>
        </div>
        <span
          className={`w-[10px] h-[10px] rounded-[100%] ${
            isOnline ? "bg-green-500" : "bg-red-600"
          } `}
        ></span>
      </div>
    </div>
  );
}

export default UserList;
