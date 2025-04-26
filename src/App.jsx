

import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/search/SearchBar';
import Loader from './components/loader/Loader';
import ImageCard from './components/card/ImageCard';
import ImageModal from './components/modal/ImageModal';
import LoadMoreBtn from './components/load/LoadMoreBtn';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root');

const API_KEY = 'DbWHxSigq1c_dvzotJhjcSYPRMx6hz8wPZYRoQgApMQ'; 

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // Початкове значення false
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBtn, setShowBtn] = useState(false); // Додали стан для відображення кнопки "Load more"

  useEffect(() => {
    if (!query) return; // Перевірка, чи є значення в query

    const fetchImages = async () => {
      setLoading(true); // Показуємо loader під час завантаження зображень
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${query}&page=${page}`
        );
        const { results, total_pages } = response.data;
        setImages((prevImages) => [...prevImages, ...results]);
        setShowBtn(total_pages && total_pages !== page); // Перевірка для відображення кнопки "Load more"
        setLoading(false); // Після завершення завантаження ховаємо loader
      } catch (error) {
        setError('Error fetching images. Please try again later.');
        setLoading(false); // При помилці також ховаємо loader
      }
    };

    fetchImages();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSubmit = (query) => {
    setQuery(query);
    setPage(1); // Скидаємо сторінку до першої при новому пошуковому запиті
    setImages([]); // Очищаємо список зображень
    setLoading(true); // Показуємо loader після натискання на кнопку пошуку
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <h1 className='title'>Welcome to image Search App</h1>
      <SearchBar onSubmit={handleSubmit} />
      <ul className='list'>
        {images.map((image) => (
          <li key={image.id} onClick={() => handleImageClick(image)} className='pic'>
            <ImageCard imageUrl={image.urls.small} altText={image.alt_description} />
          </li>
        ))}
      </ul>
      {loading && <Loader />} {/* Показуємо loader під галереєю зображень під час завантаження */}
      {showBtn && <LoadMoreBtn onClick={handleLoadMore} />}
      <ImageModal isOpen={selectedImage !== null} image={selectedImage} onClose={handleCloseModal} />
      {error && <p className="error-message">{error}</p>} {/* Відображення текстового повідомлення помилки */}
    </>
  );
}



