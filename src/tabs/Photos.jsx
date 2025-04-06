import Text from '../components/Text/Text';
import FormComponent from '../components/FormComponent/FormComponent';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import { getPhotos } from '../apiService/photos';
import Button from '../components/Button/Button';
import { PhotoModal } from '../components/PhotoModal/PhotoModal';

const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    if (!query) return;

    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const { photos, per_page, total_results } = await getPhotos(
          query,
          page
        );

        if (!photos.length) {
          return setIsEmpty(true);
        }

        // prevPhotos === photos
        setPhotos(prevPhotos => [...prevPhotos, ...photos]);

        setIsVisible(page < Math.ceil(total_results / per_page));
        // page < total_pages це в домашці. перевірка така сама
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [page, query]);

  const onHandleSubmit = value => {
    setQuery(value);
    setPhotos([]);
    setPage(1);
    setIsEmpty(false);
    setError(null);
    setIsVisible(false);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalSrc('');
    setModalAlt('');
  };

  const openModal = (src, alt) => {
    setModalIsOpen(true);
    setModalSrc(src);
    setModalAlt(alt);
  };
  return (
    <>
      <FormComponent onPhotoSubmit={onHandleSubmit} />
      {!error && !isEmpty && !photos.length && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {isLoading && <Loader />}
      {error && <Text textAlign="center">Oops! Something went wrong...</Text>}
      {photos.length > 0 && (
        <PhotosGallery photos={photos} openModal={openModal} />
      )}
      {isVisible && photos.length > 0 && !isLoading && (
        <Button onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </Button>
      )}
      {isEmpty && (
        <Text textAlign="center">Sorry, but we don`t found images</Text>
      )}
      <PhotoModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
      />
    </>
  );
};

export default Photos;
