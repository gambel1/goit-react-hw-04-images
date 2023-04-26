import { ModalOverlayBoxDiv, ModalDiv } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModal, largeModalImageURL, tags }) {
  useEffect(() => {
    const closeOnEsc = e => {
      if (e.code !== 'Escape') {
        return;
      }
      closeModal();
    };

    window.addEventListener('keydown', closeOnEsc);

    return () => {
      window.removeEventListener('keydown', closeOnEsc);
    };
  }, [closeModal]);

  return createPortal(
    <ModalOverlayBoxDiv onClick={closeModal}>
      <ModalDiv>
        <img src={largeModalImageURL} alt={tags} />
      </ModalDiv>
    </ModalOverlayBoxDiv>,
    modalRoot
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeModalImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
