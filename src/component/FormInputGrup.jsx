import React from "react";

function FormInputGrup({ type, placeholder, ...res }) {
  return (
    <div className="my-4">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-[#aaaaaa] bg-transparent outline-none px-3 py-3 text-sm dark:text-white rounded-[5px] focus:border-green-400 transition-all"
        {...res}
      />
    </div>
  );
}

export default FormInputGrup;
