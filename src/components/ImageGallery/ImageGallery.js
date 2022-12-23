import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components';

export const ImageGallery = ({ images }) => (
  <ul className={css.ImageGallery}>
    {images.map(image => {
      return <ImageGalleryItem key={image.id} {...image} />;
    })}
  </ul>
);
