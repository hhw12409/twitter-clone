import { signOut, updateProfile, User } from "firebase/auth";
import { auth, dbService } from "../fbInstance";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { loginCheck } from "../atoms/loginCheck";

interface IProps {
  userObj: User | null;
  refreshUser: () => void;
}

const Profile = ({ userObj, refreshUser }: IProps) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj?.displayName ?? "익명의 사용자");
  const [isLogin, setIsLogin] = useRecoilState(loginCheck);

  const navigate = useNavigate();
  const onLogOutClick = async () => {
    await signOut(auth);
    setIsLogin(false);
    navigate("/");
  };

  const getMyTweets = async () => {
    const q = query(
      collection(dbService, "tweet"),
      where("creatorId", "==", userObj?.uid),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  useEffect(() => {
    getMyTweets();
  }, []);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (userObj?.displayName !== newDisplayName) {
      await updateProfile(auth.currentUser!, { displayName: newDisplayName });
    }
    refreshUser();
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          value={newDisplayName}
          type="text"
          placeholder="Display Name"
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
