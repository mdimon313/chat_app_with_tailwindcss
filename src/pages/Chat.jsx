import React, { useState } from "react";
import Layout from "../component/Layout";
import SectionCenter from "../component/SectionCenter";
import SectionLeft from "../component/SectionLeft";
import { ChatInfoProvider } from "../context/ChatContext";

function Chat({ theme, switchTheme }) {
  const [hide, setHideNav] = useState(false);
  const hideNav = (val) => {
    setHideNav(val);
  };
  return (
    <>
      <ChatInfoProvider>
        <Layout theme={theme}>
          <div className="relative grid grid-cols-1 md:grid-cols-3 rounded-lg h-[90vh] overflow-hidden shadow bg-slate-100  dark:bg-gray-800">
            <SectionLeft hideNav={hideNav} hide={hide} />
            <SectionCenter hideNav={hideNav} />
          </div>
        </Layout>
      </ChatInfoProvider>
    </>
  );
}

export default Chat;
