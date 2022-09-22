import React from "react";
import { useChat } from "../context/ChatContext";

function ChatHeader({ hideNav }) {
  const { chat } = useChat();
  return (
    <div className="flex items-center border-b-[1px] border-gray-[#aaaaaa] px-4">
      {
        <>
          <span
            className="cursor-pointer mr-2 block md:hidden"
            onClick={() => hideNav(true)}
          >
            <i className="fa-solid fa-bars"></i>
          </span>
          {chat && (
            <>
              {chat?.profile ? (
                <img
                  src={chat?.profile}
                  alt={"profile"}
                  className="w-[36px] h-[36px] rounded-[100%]"
                />
              ) : (
                <i className="fa-regular fa-circle-user text-2xl select-none"></i>
              )}
              <h2 className="ml-2 capitalize">{chat.name}</h2>{" "}
            </>
          )}
        </>
      }
    </div>
  );
}

export default ChatHeader;
