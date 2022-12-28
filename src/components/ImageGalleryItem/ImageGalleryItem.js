import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { Modal } from 'components';

export function ImageGalleryItem({ largeImageURL, webformatURL, tags }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(isOpen => !isOpen);
  };

  return (
    <>
      <li className={css.ImageGalleryItem} onClick={toggleModal}>
        <img
          src={webformatURL}
          alt={tags}
          className={css.ImageGalleryItemImage}
        />
      </li>
      {isOpen && <Modal onClose={toggleModal} src={largeImageURL} alt={tags} />}
    </>
  );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
