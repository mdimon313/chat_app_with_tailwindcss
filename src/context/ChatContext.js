import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

const chatContext = React.createContext();

export function useChat() {
  return useContext(chatContext);
}

export function ChatInfoProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [msgs, setMsgs] = useState("");
  const logedInUser = auth.currentUser.uid;

  // load users
  useEffect(() => {
    // create user refference
    const userRef = collection(db, "users");

    // create query Object
    const q = query(userRef, where("uid", "not-in", [logedInUser]));

    // execute query
    const unsubcribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });

    return unsubcribe;
  }, [logedInUser]);

  //   select user
  function selectUser(user) {
    setChat(user);
    const user2 = user.uid;
    const id =
      logedInUser > user2 ? `${logedInUser + user2}` : `${user2 + logedInUser}`;
    const msgRef = collection(db, "massegs", id, "chat");
    const q = query(msgRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (qSnapshot) => {
      const msgs = [];
      qSnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
  }

  const providerValue = {
    users,
    chat,
    msgs,
    selectUser,
  };
  return (
    <chatContext.Provider value={providerValue}>
      {children}
    </chatContext.Provider>
  );
}
