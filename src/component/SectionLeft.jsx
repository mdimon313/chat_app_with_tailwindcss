import { useChat } from "../context/ChatContext";
import Profile from "./Profile";
import UserList from "./UserList";

function SectionLeft({ hideNav, hide }) {
  const { users, selectUser } = useChat();
  return (
    <div
      className={`${
        hide ? "block" : "hidden"
      } md:block absolute left-0 w-full md:static md:w-full md:border-r-[1px] text-black bg-slate-50 md:border-[#aaaaaa] dark:text-white dark:bg-gray-800 overflow-hidden transition-all z-10`}
    >
      <span
        className="block md:hidden absolute top-0 right-1 cursor-pointer"
        onClick={() => hideNav(false)}
      >
        <i className="fa-solid fa-circle-xmark"></i>
      </span>
      <Profile />
      {/* lists */}
      <div className="flex flex-col h-[calc(90vh-65px)] overflow-y-scroll scrollbar-hide">
        {users.map((user, i) => (
          <UserList
            key={i}
            user={user}
            selectUser={selectUser}
            hideNav={hideNav}
          />
        ))}
      </div>
    </div>
  );
}

export default SectionLeft;
