import styles from './ImageCard.module.css'

interface CardData{
  imageUrl: string;
  altText: string;
}

const ImageCard:React.FC<CardData> = ({imageUrl, altText })=> {
  return (
    <div>
      <img src={imageUrl} alt={altText} className={styles.img}/>
    </div>
  );
};

export default (ImageCard);