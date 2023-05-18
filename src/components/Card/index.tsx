import { ICardDataObj } from '../../constants';
import { formatDate } from '../../utils/formatDate';
import styles from './style.module.scss';
import imgDefault from './default.png';

const Card = ({id, date, title, desc}: ICardDataObj) => {
  return ( 
    <div className={styles.wrap}>
      <img src={imgDefault} alt='img' />
      <div className={styles.date}>{formatDate(date)}</div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.desc}>{desc}</p>
      <span>{id}</span>
    </div>
   );
}
 
export default Card;