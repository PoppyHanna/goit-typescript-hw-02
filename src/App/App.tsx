import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/search/SearchBar';
import Loader from '../components/loader/Loader';
import ImageCard from '../components/card/ImageCard';
import ImageModal from '../components/modal/ImageModal';
import LoadMoreBtn from '../components/load/LoadMoreBtn';
import Modal from 'react-modal';
import { ImageData } from './App.types';
import './App.css';


Modal.setAppElement('#root');

const API_KEY = 'DbWHxSigq1c_dvzotJhjcSYPRMx6hz8wPZYRoQgApMQ';


// Типізація пропсів для компоненту SearchBar
interface SearchBarProps {
  onSubmit: (query: string) => void;
}

// Типізація пропсів для компоненту ImageModal
interface ImageModalProps {
  isOpen: boolean;
  image: ImageData | null;
  onClose: () => void;
}

// Типізація пропсів для компоненту LoadMoreBtn
interface LoadMoreBtnProps {
  onClick: () => void;
}

export default function App() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [showBtn, setShowBtn] = useState<boolean>(false); // Для кнопки "Load more"

  useEffect(() => {
    if (!query) return; // Перевірка, чи є значення в query

    const fetchImages = async (query: string): Promise<void> => {
      setLoading(true); // Показуємо loader під час завантаження зображень
      try {
        const response = await axios.get<{ results: ImageData[], total_pages: number }>(
          `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${query}&page=${page}`
        );

        const { results, total_pages } = response.data;
        setImages((prevImages) => [...prevImages, ...results]);
        setShowBtn(!!(total_pages && total_pages !== page));  // перетворює результат в булеве значення

        setLoading(false); // Після завершення завантаження ховаємо loader
      } catch (error) {
        setError('Error fetching images. Please try again later.');
        setLoading(false); // При помилці також ховаємо loader
      }
    };

    fetchImages(query);
  }, [query, page]);

  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSubmit = (query: string): void => {
    setQuery(query);
    setPage(1); // Скидаємо сторінку до першої при новому пошуковому запиті
    setImages([]); // Очищаємо список зображень
    setLoading(true); // Показуємо loader після натискання на кнопку пошуку
  };

  const handleImageClick = (image: ImageData): void => {
    setSelectedImage(image);
  };

  const handleCloseModal = (): void => {
    setSelectedImage(null);
  };

  return (
    <>
      <h1 className="title">Welcome to image Search App</h1>
      <SearchBar onSubmit={handleSubmit} />
      <ul className="list">
        {images.map((image) => (
          <li key={image.id} onClick={() => handleImageClick(image)} className="pic">
            <ImageCard imageUrl={image.urls.small} altText={image.alt_description} />
          </li>
        ))}
      </ul>
      {loading && <Loader />}
      {showBtn && <LoadMoreBtn onClick={handleLoadMore} />}
      <ImageModal isOpen={selectedImage !== null} image={selectedImage} onClose={handleCloseModal} />
      {error && <p className="error-message">{error}</p>}
    </>
  );
}
