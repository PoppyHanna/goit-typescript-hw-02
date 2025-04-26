import Modal from 'react-modal';
import styles from './ImageModal.module.css';
import { MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { ImageData } from '../../App/App.types';



interface ImageModalProps {
  isOpen: boolean;
  image: ImageData | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, image, onClose }) => {
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      ariaHideApp={false}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      {image && (
        <motion.div
          className={styles.cont}
          onClick={handleOverlayClick}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={image.urls.full}
            alt={image.alt_description}
            className={styles.img}
          />
          <div className={styles.info}>
            <InfoRow label="Author:" value={image.user.name} />
            <InfoRow label="Likes:" value={image.likes.toString()} />
            <InfoRow label="Description:" value={image.description || 'No description available'} />
          </div>
        </motion.div>
      )}
    </Modal>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <p className={styles.clause}>
    <span className={styles.text}>{label}</span> {value}
  </p>
);

export default ImageModal;
