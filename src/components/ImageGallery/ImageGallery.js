import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  <ul className={css.ImageGallery}>
    {images.map(img => {
      return <ImageGalleryItem alt={images.alt} src={images.src} />;
    })}
  </ul>;
};
