import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ alt, src, onClick, largeImageURL }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={src}
        alt={alt}
        className={css.ImageGalleryItemImage}
        onClick={() => onClick({ largeImageURL, alt })}
      />
    </li>
  );
};
