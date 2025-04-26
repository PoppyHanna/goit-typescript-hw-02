import { Hourglass } from "react-loader-spinner";
import styles from './Loader.module.css'; 

interface LoaderProps {
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ size = 80 }) => {
  return (
    <div className={styles.loaderContainer}>
      <Hourglass
        visible={true}
        height={size}
        width={size}
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass={styles.loader}
        colors={['#306cce', '#72a1ed']}
      />
    </div>
  );
};

export default Loader;
