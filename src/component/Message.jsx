import React, { useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import { auth } from "../firebase";
import moment from "moment";

function Message() {
  const scrollRef = useRef();
  const { msgs } = useChat();
  const logedInUser = auth.currentUser.uid;

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  return (
    <div className="overflow-hidden overflow-y-scroll p-3 h-[calc(90vh-115px)] scrollbar-hide ">
      {msgs?.length > 0 ? (
        msgs.map((msg, i) => {
          return (
            <div
              key={i}
              className={`w-full flex flex-col ${
                msg.from === logedInUser
                  ? "items-end justify-end"
                  : "items-start justify-start"
              }`}
              ref={scrollRef}
            >
              <div
                className={`w-1/2 my-2 flex flex-col ${
                  msg.from === logedInUser ? "items-end" : "items-start"
                }`}
              >
                <span className="text-sm inline-block text-center text-gray-500 dark:text-gray-300">
                  {moment(msg.createdAt.toDate()).format("ddd MMM yyy h:ma")}
                </span>
                {msg.media && (
                  <span className="flex items-center">
                    {" "}
                    <img
                      src={msg.media}
                      alt="img"
                      className="w-full my-1 rounded-md shadow-lg"
                    />
                    {/* <i className="fa-solid fa-trash"></i> */}
                  </span>
                )}
                {msg.text && (
                  <p
                    className={`w-fit text-sm py-3 px-4 mb-1 ${
                      msg.from === logedInUser
                        ? "bg-gray-900 text-gray-100 dark:bg-[#606060] rounded-[10px_10px_0_10px]"
                        : "border border-[#aaaaaa] rounded-[0_10px_10px_10px] dark:text-gray-100"
                    } `}
                  >
                    {msg.text}
                  </p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="h-[100%] flex items-center justify-center text-gray-500 text-3xl font-bold">
          No message available...
        </div>
      )}
    </div>
  );
}

export default Message;

// bg-[#0084ff]
