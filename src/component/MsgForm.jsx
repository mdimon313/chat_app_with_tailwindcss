import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useChat } from "../context/ChatContext";
import { auth, db, storage } from "../firebase";

function MsgForm() {
  const [inputMsg, setInputMsg] = useState("");
  const [selectedImage, setSelectedImage] = useState();

  const { chat } = useChat();
  const logedInUser = auth.currentUser.uid;

  // function onSelectFile(e) {
  // const selectFiles = e.target.files;
  // const selectFilesArray = Array.from(selectFiles);

  // const imageArray = selectFilesArray.map((file) => {
  //   return URL.createObjectURL(file);
  // });
  // console.log(selectFiles);
  // setSelectedImage(e.target.files[0].name);
  // }
  async function handleSubmit(e) {
    e.preventDefault();

    const user2 = chat.uid;
    const id =
      logedInUser > user2 ? `${logedInUser + user2}` : `${user2 + logedInUser}`;

    // upload image
    let url;
    if (selectedImage) {
      const imgRef = ref(
        storage,
        `images/${Math.floor(Math.random() * 111111)}-${selectedImage.name}`
      );
      const snap = await uploadBytes(imgRef, selectedImage);
      const downUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = downUrl;
    }

    setInputMsg("");
    await addDoc(collection(db, "massegs", id, "chat"), {
      text: inputMsg,
      from: logedInUser,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || null,
    });
    setSelectedImage();
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="flex relative">
        {/* privew image */}
        {/* {selectedImage ? (
          <div className="h-[100px] w-full overflow-x-scroll absolute left-0 z-10 -top-[100px] p-2 bg-slate-50 dark:bg-slate-900 flex">
            {selectedImage && (
              <div className="relative w-[70px] h-full dark:bg-slate-500 border border-gray-300 p-1 mx-1">
                <span className="absolute -right-3 -top-3 w-[15px] h-[15px] rounded-[100%] p-3 bg-[#00000050] flex items-center justify-center ">
                  <i className="fa-solid fa-xmark cursor-pointer"></i>
                </span>
                <img
                  src={selectedImage}
                  alt="prev"
                  className="w-full h-full block"
                />
              </div>
            )}
          </div>
        ) : (
          ""
        )} */}

        <label
          htmlFor="image"
          className="flex items-center justify-center px-4 hover:bg-slate-400 transition-all"
        >
          <i className="fa-solid fa-paperclip text-xl"></i>
          <input
            type="file"
            name="image"
            id="image"
            className="hidden"
            multiple
            onChange={(e) => setSelectedImage(e.target.files[0])}
            accept="image/png, image/jpeg, image/jpg, image/webp"
          />
        </label>
        <input
          type="text"
          placeholder="Aaa..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          className="w-full bg-gray-300 outline-none border-none focus:border-none focus:outline-none text-gray-700 px-2 overflow-hidden text-ellipsis"
        />
        <button
          type="submit"
          disabled={inputMsg === "" ? true : false}
          className={`w-[70px] outline-none border-none ${
            inputMsg !== ""
              ? "cursor-pointer bg-green-400 "
              : "cursor-none bg-gray-400"
          }`}
        >
          <i className="fa-solid fa-paper-plane text-white"></i>
        </button>
      </form>
    </>
  );
}

export default MsgForm;
