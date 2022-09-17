import React, { useEffect, useState } from "react";
import { dbService } from "../fbInstance";
import { collection, DocumentData, onSnapshot, query, orderBy, addDoc, getDocs } from "firebase/firestore";
import { User } from "firebase/auth";
import Tweet from "../components/Tweet";
import TweetForm from "../components/TweetForm";

interface IProps {
  userObj: User;
}

const Home = ({ userObj }: IProps) => {
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

  // snapshot를 이용해 실시간 데이터 가져오기 (실시간으로 데이터 확인)
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

  return (
    <div>
      <div className="container">
        <TweetForm userObj={userObj} />
        <div style={{ marginTop: 30 }}>
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj?.uid} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
