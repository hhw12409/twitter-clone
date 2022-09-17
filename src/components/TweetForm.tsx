import React, { useState } from "react";
import { dbService, stroageService } from "../fbInstance";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { User } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  userObj: User;
}

const TweetForm = ({ userObj }: IProps) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState<ArrayBuffer | string>("");
  // Tweet저장하기
  const onSubmit = async (event: React.FormEvent) => {
    if (tweet === "") {
      return;
    }
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(stroageService, `${userObj.uid}/${uuidv4()}`);
      if (typeof attachment === "string") {
        const response = await uploadString(attachmentRef, attachment, "data_url");
        attachmentUrl = await getDownloadURL(ref(stroageService, String(response.ref)));
      }
    }
    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    try {
      await addDoc(collection(dbService, "tweet"), tweetObj);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setTweet("");
      setAttachment("");
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTweet(value);
  };

  const onFileChange = async (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = event;
    const theFile = files![0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const result = finishedEvent.target?.result;
      setAttachment(result!);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment("");
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factory__input">
        <input
          className="factoryInput__input"
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        <label htmlFor="attach-file" className="factoryInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input style={{ display: "none" }} id="attach-file" type="file" accept="image/*" onChange={onFileChange} />
      </div>
      {attachment && (
        <div className="factoryForm__attachment">
          <img src={String(attachment)} style={{ backgroundImage: String(attachment) }} />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default TweetForm;
