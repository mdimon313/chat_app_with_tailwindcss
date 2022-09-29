import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";

function Profile() {
  const history = useNavigate();
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    if (file) {
      async function uploadProfileImage() {
        const imageRef = ref(
          storage,
          `profile/${new Date().getTime()}-${file.name}`
        );
        try {
          // delete old image
          if (user.profilePath) {
            await deleteObject(ref(storage, user.profilePath));
          }

          setLoading(true);
          // upload imag
          const snap = await uploadBytes(imageRef, file);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            profile: url,
            profilePath: snap.ref.fullPath,
          });

          setLoading(false);
          setFile("");
        } catch (err) {
          console.log(err.message);
        }
      }
      uploadProfileImage();
    }
  }, [file]);

  return (
    <div className="h-screen w-full bg-[#f6f6f6] dark:bg-gray-900 flex items-center justify-center">
      <div className="container mx-auto">
        <div className="mx-2 md:w-1/2 md:mx-auto border border-[#aaaaaa] bg-slate-200 dark:bg-gray-700 rounded-md p-4 transition-all">
          <button
            type="button"
            onClick={() => history(-1)}
            className="w-[40px] h-[40px] dark:text-white hover:bg-gray-300 dark:hover:text-black grid place-items-center rounded-[50%] transition-all select-none"
          >
            <i className="fa-solid fa-arrow-left select-none"></i>
          </button>
          <div className="relative w-[120px] h-[120px] mx-auto rounded-[50%] shadow-lg mb-3">
            {user ? (
              loading ? (
                <h6 className="grid place-items-center text-center h-[100%] dark:text-[#aaa]">
                  loading...
                </h6>
              ) : (
                <img
                  src={user?.profile}
                  alt={user?.name}
                  className="select-none object-fill w-[120px] h-[120px] rounded-[50%]"
                />
              )
            ) : (
              <span className="w-full h-[100%] flex items-center justify-center">
                <i className="fa-solid fa-circle-user w-full text-[6rem] text-center"></i>
              </span>
            )}

            <label
              htmlFor="profile"
              className="absolute right-4 bottom-0 w-[25px] h-[25px] bg-white rounded-[50%] flex items-center justify-center cursor-pointer select-none"
            >
              <i className="fa-solid fa-camera text-xs z-10"></i>
            </label>
            <input
              type="file"
              name="prfile"
              id="profile"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <h1 className="text-2xl text-center font-bold text-gray-800 dark:text-gray-50">
            <i className="fa-solid fa-user mr-2 select-none"></i>
            {auth.currentUser.displayName}
          </h1>
          <p className="mt-2 text-center text-[#aaaaaa]">
            <i className="fa-solid fa-envelope mr-2 select-none"></i>
            {auth.currentUser.email}
          </p>
          <p className="mt-2 text-center text-[#aaaaaa] text-xs">
            <i className="fa-solid fa-calendar-days mr-2 select-none"></i>
            {auth.currentUser.metadata.creationTime}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
