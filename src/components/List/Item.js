 /** @jsxImportSource @emotion/react */
 import { css, jsx } from '@emotion/react';
import { styles } from './style';
import { differenceInSeconds, differenceInMinutes, format } from "date-fns";
import { useState } from 'react';
import { dbService } from 'fbase';
import { useHistory } from 'react-router-dom';

function Item({ idx, item, userEmail}) {
  const [toggle, setToggle] = useState(item.likeList && isSame(userEmail, item.likeList));

  const history = useHistory();

  const onClickLike = () => {
    let likeList = [];

    setToggle(toggle => {
      if (toggle) {
        likeList = item.likeList.filter(email => email !== userEmail);
      } else {
        likeList = item.likeList.concat(userEmail);
      }
      return !toggle;
    });

    // 좋아요 필드 업데이트
    dbService.collection('instagram').doc(item.docId).update({
      ...item,
      likeList,
    });
  }

  const onClickComment = () => {
    // 댓글 전용 페이지로 이동
    history.push(`/comment?docId=${item.docId}`)
  }

  return (
    <li key={idx}>
      <div css={styles.top}>
        <img css={styles.profile} src={item.userImgUrl} alt="" />
        <span css={styles.id}>{item.id}</span>
      </div>
      <div css={styles.listCenter}>
        <img css={styles.centerImg} src={item.imgUrl} alt="" />
        <div>
          <span css={styles.actionIcon} onClick={onClickLike}>
            {toggle? <i css={styles.like} className="fas fa-heart" /> : <i className="far fa-heart" />}
          </span>
          <span css={styles.actionIcon} onClick={onClickComment}>
            <i className="far fa-comment"></i>
          </span>
        </div>
        {!!item.likeList.length > 0 && <div css={styles.likecnt}>좋아요 {item.likeList.length}개</div>}
      </div>
      <ul css={styles.text}>
        <li>
          <span css={styles.id}>{item.id}</span>
          <span css={styles.comment}>{item.text}</span>
        </li>
      </ul>
      <div css={styles.date}>{getTime(item.createdAt)}</div>
    </li>
  );
}
export default Item;

function isSame(userEmail, list) {
  return list.some(email => email === userEmail);
}

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

  return format(new Date(date), 'yyyy-MM-dd');
}