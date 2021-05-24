import { useRef, useState } from 'react';
import { useTransition, animated } from 'react-spring';

function Popup(props) {
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
        <animated.div className="popup" style={props}>
          <div className="popup_title">
            <span onClick={() => onClickButton('cancel')}>
              <i className="fas fa-times"></i>
            </span>
            <span className="title">게시물</span>
            <span className="posting" onClick={() => onClickButton('post')}>
              게시
            </span>
          </div>
          <div className="popup_content">
            <div className="inputForm">
              <textarea ref={textRef} placeholder="입력해주세요" />

              <div className="picture">
                <img ref={imgRef} />
              </div>
            </div>

            <div className="gallery" onClick={onClickGallery}>
              <span>사진</span>
              <span><i className="fas fa-chevron-right"></i></span>
            </div>
          </div>
        </animated.div>
      )
    );
  });
}
export default Popup;