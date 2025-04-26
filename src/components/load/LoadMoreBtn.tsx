import styles from './LoadMoreBtn.module.css'



// const LoadMoreBtn = () => {
//   const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     console.log('Button clicked', event.currentTarget);
//   }
//   return (
//     <button onClick={onClick} className={styles.button}>
//       Load more
//     </button>
//   );
// };

// export default LoadMoreBtn;

// LoadMoreBtn.tsx
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
