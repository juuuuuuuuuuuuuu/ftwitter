import { authService, dbService, storageService } from 'fbase';
import { useEffect, useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import CreatePopup from 'components/CreatePopup';
import List from 'components/List';
import Header from 'components/Header';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const cardStyle = css`margin-top: 60px`;

function Home({ user }) {
  const [list, setList] = useState([]);

  const [isOpen, setOpen] = useState(false);

  const photoUrl = useMemo(() => authService.currentUser.photoURL, []);

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
      {/* 헤더 */}
      <Header onOpen={onClickPopup} />

      {/* 레이어팝업 - 게시물 팝업 */}
      {<CreatePopup onClose={onClickPopup} onAdd={onAddStorage} isOpen={isOpen} />}

      {/* 인스타그램 피드 */}
      <section css={cardStyle}>
        {(list.length && <List list={list} />) || <div>비어있습니다.</div>}
      </section>
    </>
  );
}
export default Home;
