import React, { useEffect, useState } from "react";
import { dbService } from "../fbInstance";
import { addDoc, collection, DocumentData, onSnapshot, query, orderBy, getDocs } from "firebase/firestore";
import { User } from "firebase/auth";

interface IProps {
  userObj: User;
}

const Home = ({ userObj }: IProps) => {
  const [tweet, setTweet] = useState<string | number>("");
  const [tweets, setTweets] = useState<DocumentData[]>([]);

  // Tweets들 가져오기
  const getTweetsList = async () => {
    const querySnapshot = await getDocs(collection(dbService, "tweet"));

    querySnapshot.forEach((doc) => {
      const tweetObject = {
        ...doc.data(),
        id: doc.id,
      };
      setTweets((prev) => [tweetObject, ...prev]);
    });
  };

  // snapshot를 이용해 실시간 데이터 가져오기
  const q = query(collection(dbService, "tweet"), orderBy("createdAt", "desc"));
  const getTweets = onSnapshot(q, (querySnapshot) => {
    const tweetArr: DocumentData[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createAt: doc.data().createAt,
    }));
    setTweets(tweetArr);
  });
  useEffect(() => {
    getTweetsList();
    getTweets();
  }, []);

  // Tweet저장하기
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "tweet"), {
        text: tweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setTweet("");
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h4>{tweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
