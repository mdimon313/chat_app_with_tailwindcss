import React from "react";

function Layout({ children }) {
  return (
    <section className="py-9 bg-[#e0e0e0] dark:bg-gray-900 h-screen w-full">
      <div className="container mx-auto px-2 md:p-0">
        <div className="wrapper">{children}</div>
      </div>
    </section>
  );
}

export default Layout;
