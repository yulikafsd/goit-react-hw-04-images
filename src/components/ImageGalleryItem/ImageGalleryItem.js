import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components';

export class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
  };

  render() {
    const { largeImageURL, webformatURL, tags } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        <li className={css.ImageGalleryItem} onClick={this.toggleModal}>
          <img
            src={webformatURL}
            alt={tags}
            className={css.ImageGalleryItemImage}
          />
        </li>
        {isOpen && (
          <Modal onClose={this.toggleModal} src={largeImageURL} alt={tags} />
        )}
      </>
    );
  }
}
