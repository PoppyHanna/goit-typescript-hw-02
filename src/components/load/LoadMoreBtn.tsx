import styles from './LoadMoreBtn.module.css'

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={styles.button}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
