import PropTypes from "prop-types";
import { useState, useCallback, useRef, useEffect } from "react";
import Icon from "../../components/Icon";
import "./style.scss";

const Modal = ({ opened, Content, children }) => {
  const [isOpened, setIsOpened] = useState(opened);
  const modalRef = useRef(null);

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  }, [handleClose]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === "Escape") {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    if (isOpened) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpened, handleClickOutside, handleKeyDown]);

  return (
    <>
      {children({ isOpened, setIsOpened })}
      {isOpened && (
        <div className="modal">
          <div className="content" ref={modalRef}>
            {Content}
            <button
              type="button"
              data-testid="close-modal"
              onClick={handleClose}
            >
              <Icon name="close" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = {
  opened: false,
};

Modal.propTypes = {
  opened: PropTypes.bool,
  Content: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
};

export default Modal;