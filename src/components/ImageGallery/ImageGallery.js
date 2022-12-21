import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

export const ImageGallery = ({ images, onClick }) => (
  <ul className={css.ImageGallery}>
    {images.map(({ tags, webformatURL, largeImageURL, id }) => {
      return (
        <ImageGalleryItem
          alt={tags}
          src={webformatURL}
          key={id}
          largeImageURL={largeImageURL}
          onClick={onClick}
        />
      );
    })}
  </ul>
);
