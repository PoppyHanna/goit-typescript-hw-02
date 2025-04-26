import styles from './ImageCard.module.css'

const ImageCard = ({ imageUrl, altText }) => {
  return (
    <div>
      <img src={imageUrl} alt={altText} className={styles.img}/>
    </div>
  );
};

export default ImageCard;