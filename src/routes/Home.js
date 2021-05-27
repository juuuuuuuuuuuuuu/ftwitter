import { authService, dbService, storageService } from 'fbase';
import { useEffect, useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import CreatePopup from 'components/CreatePopup';
import List from 'components/List';
import Header from 'components/Header';
import Logo from 'components/Logo';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const cardStyle = css`
  margin-top: 60px;
`;

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
        likeList: [],
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    dbService.collection('instagram').onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        docId: doc.id,
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

  const onSingOut = () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm('로그아웃 하시겠습니까?');

    if (!result) {
      return;
    }

    authService.signOut();
    window.location.reload();
  };

  return (
    <>
      {/* 헤더 */}
      <Header
        leftIcon={
          <Logo width={150} height={30} style={{ marginTop: '14px' }} />
        }
        rightIcon={
          <>
            <i
              className="fas fa-plus"
              css={styles.rightPlus}
              onClick={onClickPopup}
            ></i>
            <img
              css={styles.profile}
              src={photoUrl}
              onClick={onSingOut}
              alt=""
            />
          </>
        }
      />

      {/* 레이어팝업 - 게시물 팝업 */}
      {
        <CreatePopup
          onClose={onClickPopup}
          onAdd={onAddStorage}
          isOpen={isOpen}
        />
      }

      {/* 인스타그램 피드 */}
      <section css={cardStyle}>
        {(list.length && <List list={list} />) || <div>비어있습니다.</div>}
      </section>
    </>
  );
}
export default Home;

const styles = {
  rightPlus: css`
    font-size: 35px;
  `,
  profile: css`
    width: 35px;
    height: 35px;
    border-radius: 100%;
    margin: 10px 10px;
  `,
};
