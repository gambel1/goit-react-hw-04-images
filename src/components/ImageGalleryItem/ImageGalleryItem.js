import Modal from '../Modal/Modal';
import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <ImageGalleryItemLi>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
      />
      {isModalOpen && (
        <Modal
          closeModal={toggleModal}
          largeModalImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </ImageGalleryItemLi>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
