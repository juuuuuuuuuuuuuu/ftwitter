import { authService, dbService, storageService } from 'fbase';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Tweet from 'components/Tweet';
import { v4 as uuidv4 } from 'uuid';

function Home({ user }) {
  const history = useHistory();
  const [tweets, setTweets] = useState([]);

  const onSingOut = () => {
    authService.signOut();
    history.push('/');
  };

  const onAdd = async () => {
    try {
      await dbService.collection('nweets').add({
        nweet: 'aa',
        createdAt: Date.now(),
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    (async () => {
      let data = [];
      await (
        await dbService.collection('nweets').get()
      ).forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTweets(data);
    })();
  }, []);

  const onFile = (e) => {
    const { files } = e.currentTarget;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const attachmentRef = storageService
        .ref()
        .child(`${user.uid}/${uuidv4()}`);
      try {
        await attachmentRef
          .putString(e.target.result, 'DATA_URL')
          .then((snapshot) => {
            console.log(snapshot);
          });
      } catch (e) {
        console.log(e);
      }

      // response.then(snapshot => {
      //   console.log(snapshot)
      // })
    };

    reader.readAsText(files[0]);
  };

  return (
    <>
      <button name="github" onClick={onSingOut}>
        로그아웃
      </button>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} data={tweet} />
      ))}
      <button onClick={onAdd}>add</button>
      <input type="file" onChange={onFile} />
    </>
  );
}
export default Home;
