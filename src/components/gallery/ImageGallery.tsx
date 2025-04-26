import ImageCard from '../card/ImageCard';
import ErrorMessage from '../error/ErrorMessage';
import LoadMoreBtn from '../load/LoadMoreBtn';
import Loader from '../loader/Loader';

interface ImageData {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

interface ImageGalleryProps {
  images: ImageData[];
  loading: boolean;
  error: string | null;
  onLoadMore: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, loading, error, onLoadMore }) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <ImageCard imageUrl={image.urls.small} altText={image.alt_description} />
          </li>
        ))}
      </ul>
      <LoadMoreBtn onClick={onLoadMore as () => void} />
    </>
  );
};

export default ImageGallery;
