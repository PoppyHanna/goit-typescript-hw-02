
// import styles from './ImageGallery.module.css'
import ImageCard from '../card/ImageCard';
import ErrorMessage from '../error/ErrorMessage';
import LoadMoreBtn from '../load/LoadMoreBtn';
import Loader from '../loader/Loader';


const ImageGallery = ({ images, loading, error, onLoadMore }) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <ul >
        {images.map((image) => (
          <li key={image.id} >
            <ImageCard imageUrl={image.urls.small} altText={image.alt_description} />
          </li>
        ))}
      </ul>
      <LoadMoreBtn onClick={onLoadMore} />
    </>
  );
};

export default ImageGallery;
