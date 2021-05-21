import { authService, dbService, storageService } from 'fbase'
import { useEffect, useState } from 'react';
import Logo from 'components/Logo';
import Popup from 'components/Popup';
import { v4 as uuidv4 } from 'uuid';
import 'css/Home.css';

function Home({ user }) {
  const [tweets, setTweets] = useState([]);

  const [attachment, setAttachment] = useState('');

  const [isOpen, setOpen] = useState(false);

  const onSingOut = () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm('로그인하시겠습니까?');

    if (!result) {
      return;
    }

    authService.signOut();
    window.location.reload();
  };

  const onAddStorage = async ({ text, buffer }) => {
    // 이미지 서버에 올리기
    const imgUrl = await getImageUrl(buffer);

    try {
      await dbService.collection('instagram').add({
        text,
        imgUrl,
        id: 'juu0124',
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
        await dbService.collection('instagram').get()
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
      const {
        currentTarget: { result },
      } = e;

      setAttachment(result);
      onSubmit(result);
    };

    reader.readAsArrayBuffer(files[0]);
  };

  const onSubmit = async (result) => {
    const attachmentRef = storageService.ref().child(`${user.uid}/${uuidv4()}`);
    const response = await attachmentRef.put(result);
    const d = await response.ref.getDownloadURL();
    console.log(d);
  };

  const getImageUrl = async (result) => {
    const attachmentRef = storageService.ref().child(`${user.uid}/${uuidv4()}`);
    const response = await attachmentRef.put(result);
    const imgUrl = await response.ref.getDownloadURL();
    return imgUrl;
  };

  const onClickPopup = () => {
    // 레이어팝업 띄우기
    setOpen((open) => !open);
  };

  return (
    <>
      <header>
        <Logo width={150} height={30} />
        <div className="right_icon">
          <i className="fas fa-plus" onClick={onClickPopup}></i>
          <img
            className="profile"
            src="https://avatars.githubusercontent.com/u/30399546?v=4"
            onClick={onSingOut}
          />
        </div>
      </header>
      <form onSubmit={onSubmit} value="보내기">
        <input type="file" id="avatar" name="avatar" onChange={onFile}></input>
      </form>

      {/* 레이어팝업 - 게시물 팝업 */}
      {
        <Popup
          onClose={onClickPopup}
          onAdd={onAddStorage}
          isOpen={isOpen}
        />
      }

      <section className="card_list">
        <ul>
          <li className="card_item">
            <div className="top">
              <img
                className="profile"
                src="https://avatars.githubusercontent.com/u/30399546?v=4"
              />
              <span className="id">id</span>
            </div>
            <div className="center">
              <img src="https://avatars.githubusercontent.com/u/30399546?v=4" />
              <div className="action_icon">
                <span>
                  <i className="far fa-heart"></i>
                </span>
                <span>
                  <i className="far fa-comment"></i>
                </span>
              </div>
            </div>
            <ul className="text">
              <li>
                <span className="id">ididi</span>
                <span className="comment">idiasdfasdfasdfdi</span>
              </li>
            </ul>
            <div className="date">1시간전</div>
          </li>
          <li className="card_item">
            <div className="top">
              <img
                className="profile"
                src="https://avatars.githubusercontent.com/u/30399546?v=4"
              />
              <span className="id">id</span>
            </div>
            <div className="center">
              <img src="https://avatars.githubusercontent.com/u/30399546?v=4" />
              <div className="action_icon">
                <span>
                  <i className="far fa-heart"></i>
                </span>
                <span>
                  <i className="far fa-comment"></i>
                </span>
              </div>
            </div>
            <ul className="text">
              <li>
                <span className="id">ididi</span>
                <span className="comment">idiasdfasdfasdfdi</span>
              </li>
            </ul>
            <div className="date">1시간전</div>
          </li>
          <li className="card_item">
            <div className="top">
              <img
                className="profile"
                src="https://avatars.githubusercontent.com/u/30399546?v=4"
              />
              <span className="id">id</span>
            </div>
            <div className="center">
              <img src="https://avatars.githubusercontent.com/u/30399546?v=4" />
              <div className="action_icon">
                <span>
                  <i className="far fa-heart"></i>
                </span>
                <span>
                  <i className="far fa-comment"></i>
                </span>
              </div>
            </div>
            <ul className="text">
              <li>
                <span className="id">ididi</span>
                <span className="comment">idiasdfasdfasdfdi</span>
              </li>
            </ul>
            <div className="date">1시간전</div>
          </li>
        </ul>
      </section>
    </>
  );
}
export default Home;
