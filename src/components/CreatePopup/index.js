import { useRef, useState } from 'react';
import { useTransition, animated } from 'react-spring';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { styles } from './style';

function CreatePopup(props) {
  const { isOpen, onClose, onAdd } = props;

  const textRef = useRef(null);
  const imgRef = useRef(null);
  const [buffer, setBuffer] = useState(null);

  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: 'translateY(40px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(40px)' },
  });

  const onClickButton = (type) => {
    type === 'post' &&
      onAdd({
        text: textRef.current.value,
        buffer,
      });

    setBuffer(null);
    onClose();
  };

  const onClickGallery = () => {
    const upload = document.createElement('input');
    upload.type = 'file';
    upload.onchange = (e) => {
      const { files } = e.currentTarget;
      const reader = new FileReader();
      const readerBase64 = new FileReader();

      reader.onload = async (e) => {
        const {
          currentTarget: { result },
        } = e;

        imgRef.current.src = result;
        setBuffer(result);
      };
      reader.readAsArrayBuffer(files[0]);

      readerBase64.onload = async (e) => {
        const {
          currentTarget: { result },
        } = e;

        imgRef.current.src = result;
      };
      readerBase64.readAsDataURL(files[0]);
    };

    upload.click();
  };

  return transitions((props, item) => {
    return (
      item && (
        <animated.div css={styles.popup} style={props}>
          <div css={styles.title}>
            <span onClick={() => onClickButton('cancel')}>
              <i css={styles.title_icon} className="fas fa-times"></i>
            </span>
            <span css={styles.titleText}>게시물</span>
            <span css={styles.posting} onClick={() => onClickButton('post')}>
              게시
            </span>
          </div>
          <div css={styles.content}>
            <div css={styles.inputForm}>
              <textarea
                css={styles.textarea}
                ref={textRef}
                placeholder="입력해주세요"
              />
              <div css={styles.picture}>
                <img ref={imgRef} css={styles.img} alt="" />
              </div>
            </div>
            <div css={styles.gallery} onClick={onClickGallery}>
              <span>사진</span>
              <span>
                <i className="fas fa-chevron-right"></i>
              </span>
            </div>
          </div>
        </animated.div>
      )
    );
  });
}
export default CreatePopup;
