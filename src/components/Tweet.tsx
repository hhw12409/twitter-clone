import { deleteDoc, doc, DocumentData, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState, memo } from "react";
import { dbService, stroageService } from "../fbInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

interface ITweet {
  tweetObj: DocumentData;
  isOwner: boolean;
}

const Tweet = ({ tweetObj, isOwner }: ITweet) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const TweetRef = doc(dbService, "tweet", `${tweetObj.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      // delete 기능
      await deleteDoc(TweetRef);
      await deleteObject(ref(stroageService, tweetObj.attachmentUrl));
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateDoc(TweetRef, {
      text: newTweet,
    });
    setEditing(false);
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setNewTweet(value);
  };
  return (
    <div className="tweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container tweetEdit">
                <input
                  onChange={onChange}
                  type="text"
                  placeholder="Edit your tweet"
                  value={newTweet}
                  required
                  autoFocus
                  className="formInput"
                />
                <input type="submit" value="Update Tweet" className="formBtn" />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="tweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default memo(Tweet);
