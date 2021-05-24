import { differenceInSeconds, differenceInMinutes, format } from "date-fns";
 /** @jsxImportSource @emotion/react */
 import { css, jsx } from '@emotion/react';
import { styles } from './style';

function List({ list }) {
  return (
    <ul>
      {list.map((item, idx) => (
        <li key={idx}>
          <div css={styles.top}>
            <img css={styles.profile} src={item.userImgUrl} alt="" />
            <span css={styles.id}>{item.id}</span>
          </div>
          <div css={styles.listCenter}>
            <img css={styles.centerImg} src={item.imgUrl} alt="" />
            <div>
              <span css={styles.actionIcon}>
                <i className="far fa-heart"></i>
              </span>
              <span css={styles.actionIcon}>
                <i className="far fa-comment"></i>
              </span>
            </div>
          </div>
          <ul css={styles.text}>
            <li>
              <span css={styles.id}>{item.id}</span>
              <span css={styles.comment}>{item.text}</span>
            </li>
          </ul>
          <div css={styles.date}>{getTime(item.createdAt)}</div>
        </li>
      ))}
    </ul>
  );
}
export default List;

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