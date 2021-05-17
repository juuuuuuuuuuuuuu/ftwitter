
import { dbService } from 'fbase';

function Tweet({ data }) {
  const onClickButton = (e) => {
    const { name } = e.target;
    if (name === 'modify') {
      dbService.doc(`nweets/${data.id}`).update({
        ntweet: '메롱',
        createdAt: Date.now(),
      })
    } else {
      dbService.doc(`nweets/${data.id}`).delete();
    }
  }
  return (
    <div>
      {data.nweet}
      <button onClick={onClickButton} name="modify">수정</button>
      <button onClick={onClickButton} name="remove">삭제</button>
    </div>
  );
}
export default Tweet;
