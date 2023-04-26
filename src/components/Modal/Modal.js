import { ModalOverlayBoxDiv, ModalDiv } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModal, largeModalImageURL, tags }) {
  useEffect(() => {
    window.addEventListener('keydown', closeOnEsc);
    window.removeEventListener('keydown', closeOnEsc);
  });

  const closeOnEsc = e => {
    if (e.code !== 'Escape') {
      return;
    }
    closeModal();
  };

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