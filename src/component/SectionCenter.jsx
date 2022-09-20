import React from "react";
import ChatBox from "./ChatBox";

function SectionCenter({ hideNav }) {
  return (
    <div className=" dark:text-white sm:col-span-2">
      <ChatBox hideNav={hideNav} />
    </div>
  );
}

export default SectionCenter;
