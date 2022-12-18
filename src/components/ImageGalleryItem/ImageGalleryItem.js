import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, alt }) => {
  <li className={css.ImageGalleryItem}>
    <img src={src} alt={alt} className={css.ImageGalleryItemImage} />
  </li>;
};
