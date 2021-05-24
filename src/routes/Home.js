import { authService, dbService, storageService } from 'fbase';
import { useEffect, useState, useMemo } from 'react';
import Logo from 'components/Logo';
import Popup from 'components/Popup';
import { v4 as uuidv4 } from 'uuid';
import { differenceInSeconds, differenceInMinutes } from 'date-fns';

import 'css/Home.css';

function Home({ user }) {
  const [list, setList] = useState([]);

  const [attachment, setAttachment] = useState('');

  const [isOpen, setOpen] = useState(false);

  const photoUrl = useMemo(() => authService.currentUser.photoURL);

  const onSingOut = () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm('로그아웃 하시겠습니까?');

    if (!result) {
      return;
    }

    authService.signOut();
    window.location.reload();
  };

  const onAddStorage = async ({ text, buffer }) => {
    // 이미지 서버에 올리기
    const imgUrl = buffer ? await getImageUrl(buffer) : '';

    try {
      await dbService.collection('instagram').add({
        text,
        imgUrl,
        id: 'juu0124',
        userImgUrl: photoUrl,
        createdAt: Date.now(),
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    dbService.collection('instagram').onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setList(nweetArray);
    });
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
          <img className="profile" src={photoUrl} onClick={onSingOut} />
        </div>
      </header>
      <form onSubmit={onSubmit} value="보내기">
        <input type="file" id="avatar" name="avatar" onChange={onFile}></input>
      </form>

      {/* 레이어팝업 - 게시물 팝업 */}
      {<Popup onClose={onClickPopup} onAdd={onAddStorage} isOpen={isOpen} />}

      <section className="card_list">
        {(list.length && (
          <ul>
            {list.map((item, idx) => (
              <li className="card_item" key={idx}>
                <div className="top">
                  <img className="profile" src={item.userImgUrl} />
                  <span className="id">{item.id}</span>
                </div>
                <div className="center">
                  <img src={item.imgUrl} />
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
                    <span className="id">{item.id}</span>
                    <span className="comment">{item.text}</span>
                  </li>
                </ul>
                <div className="date">{getTime(item.createdAt)}</div>
              </li>
            ))}
          </ul>
        )) || <div>비어있습니다.</div>}
      </section>
    </>
  );
}
export default Home;

function getTime(date) {
  const sec = differenceInSeconds(new Date(), new Date(date));

  // 1분이 지나지 않았다면 "n초 전"
  if (sec < 60) {
    return `${sec}초 전`;
  }

  const min = differenceInMinutes(new Date(), new Date(date));
  //1시간이 지나지 않았다면 "n분 전"
  if (min < 60) {
    return `${min}분 전`;
  }

  return date;
}