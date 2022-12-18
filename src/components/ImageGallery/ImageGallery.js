import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => (
  <ul className={css.ImageGallery}>
    {images.map(({ tags, webformatURL, id }) => {
      return <ImageGalleryItem alt={tags} src={webformatURL} key={id} />;
    })}
  </ul>
);
