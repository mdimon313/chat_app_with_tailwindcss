import React from "react";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 2000);
  return (
    <div className="h-screen w-full overflow-hidden grid place-items-center bg-gray-50 dark:bg-gray-900">
      <div>
        <h1 className="text-[120px] leading-[120px] font-extrabold text-gray-300 m-0">
          404
        </h1>
        <p className="text-xl text-center font-extrabold text-gray-600 line-through">
          Page not Found..
        </p>
      </div>
    </div>
  );
}

export default Error;
