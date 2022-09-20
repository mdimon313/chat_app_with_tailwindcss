import React, { useState } from "react";
import { useChat } from "../context/ChatContext";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import MsgForm from "./MsgForm";

function ChatBox({ hideNav }) {
  const [text, setText] = useState([]);
  const { chat } = useChat();

  function getValue(values) {
    return setText([...text, values]);
  }
  return (
    <div className="overflow-hidden grid grid-cols-1 grid-rows-[65px_auto_50px] justify-end h-full">
      <ChatHeader hideNav={hideNav} />
      {chat && chat ? (
        <>
          <Message text={text} />
          <MsgForm getValue={getValue} />
        </>
      ) : (
        <div className="h-[100%] flex items-center justify-center">
          <h2 className="text-gray-500 text-3xl font-bold">Select user</h2>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
