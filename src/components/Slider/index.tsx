
import { MouseEvent, useEffect, useState } from 'react';
import Card from '../Card';
import { 
  cardsDataList, 
  cardWidth, 
  largeCardGap, 
  media2CardsWidth, 
  media3CardsWidth, 
  media4CardsWidth, 
  mediumCardGap, 
  mobileCardGap, 
  slidesTime
} from '../../constants';
import { useWindowSize } from '../../hooks/useWindowSize';
import { createLongClassName } from '../../utils/createLongClassName';
import { interval, ITimerInterval } from '../../utils/interval';
import { getRandomKey } from '../../utils/getRandomKey';
import styles from './style.module.scss';

const Slider = () => {
  const [progressValue, setProgressValue] = useState(0);
  const [width] = useWindowSize();
  const [offset, setOffset] = useState(0);
  const [cardsOnPage, setCardsOnPage] = useState(0);
  const [cardsPageGap, setCardsPageGap] = useState(0);
  const [cardsCountDisplayed, setCardsCountDisplayed] = useState(0);
  const [intervalObj, setIntervalObj] = useState<ITimerInterval | undefined>(undefined);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timer | undefined>(undefined);

  const [swipeStart, setSwipeStart] = useState(0);
  const [swipeEnd, setSwipeEnd] = useState(0);

  useEffect(() => {
    const difference = Math.ceil(swipeEnd - swipeStart);
    if (Math.abs(difference) > 20 && swipeStart !== 0 && swipeEnd !== 0) {
      if (difference < 0 && progressValue < 100) {
        handleToClick();
      } else if (difference > 0 && cardsCountDisplayed !== cardsOnPage) {
        handleBackClick();
      }
      setSwipeStart(0);
      setSwipeEnd(0)
    }

  }, [swipeStart, swipeEnd, cardsCountDisplayed, cardsOnPage, progressValue]);


  useEffect(() => {
    intervalObj?.clear();
    clearTimeout(timeoutId);
    setSwipeStart(0);
    setSwipeEnd(0);
    let cardsCount = 0;
    if (width >= 0 && width < media2CardsWidth) {
      cardsCount = 1;
      setCardsPageGap(mobileCardGap);
    } else if (width >= media2CardsWidth && width < media3CardsWidth) {
      cardsCount = 2;
      setCardsPageGap(mediumCardGap);
    } else if (width >= media3CardsWidth && width < media4CardsWidth) {
      cardsCount = 3;
      setCardsPageGap(mediumCardGap);
    } else {
      cardsCount = 4;
      setCardsPageGap(largeCardGap);
    }
    if (width > 0) {
      setOffset(0);
      setCardsCountDisplayed(cardsCount);
      cardsCount < cardsDataList.length && slideTimerUp();
    }

    setCardsOnPage(cardsCount);

  }, [width]);

  useEffect(() => {
    if (cardsCountDisplayed > 0) {
      let percent = Math.floor(cardsCountDisplayed * 100 / cardsDataList.length);
      percent = percent > 100 ? 100 : percent;
      percent = percent < 0 ? 0 : percent;
      setProgressValue(percent);
    }
    if (cardsCountDisplayed >= cardsDataList.length)  {
      intervalObj?.clear();
      clearTimeout(timeoutId);
    }
  }, [cardsCountDisplayed]);

  const getOffset = () => {
    return cardWidth * cardsOnPage + cardsPageGap * cardsOnPage;
  }

  const handleBackClick = () => {
    intervalObj?.clear();
    setCardsCountDisplayed(prevCount => prevCount - cardsOnPage);
    setOffset(currentOffset => {
      const newOffset = currentOffset + getOffset();
      return newOffset;
    });
    slideTimerUp();
  }
  const handleToClick = () => {
    intervalObj?.clear();
    slideUp();
    slideTimerUp();
  }
  
  const slideUp = () => {
    setCardsCountDisplayed(prevCount => prevCount + cardsOnPage);
    setOffset(currentOffset => {
      const newOffset = currentOffset - getOffset();
      return newOffset;
    });
  }

  const slideTimerUp = () => {
    intervalObj?.clear();
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => {
      const id = interval(slideUp, slidesTime);
      setIntervalObj(id);
    }, slidesTime);
    setTimeoutId(timeout);
  }

  useEffect(() => {
    cardsCountDisplayed >= cardsDataList.length && intervalObj?.clear();
    if (cardsCountDisplayed > 0 && cardsCountDisplayed < cardsDataList.length && !intervalObj) {
      slideTimerUp();
    }
  }, [cardsCountDisplayed, intervalObj]);

  return ( 
    <div className={styles.wrap}>
      <h1 className={styles.title}>Актуальное</h1>
      <div className={styles.controls}>
        <button disabled={cardsCountDisplayed === cardsOnPage ? true : undefined} className={createLongClassName([styles.animatedBtn, styles.btn, styles.btn_back])} onClick={handleBackClick}>
        </button>
        <progress className={styles.progress} value={progressValue} max='100'>70 %</progress>
        <button disabled={progressValue === 100 ? true : undefined} className={createLongClassName([styles.animatedBtn, styles.btn, styles.btn_to])} onClick={handleToClick}>
        </button>
      </div>
      <div className={styles.content}>
        <ul 
          className={styles.list} 
          onMouseDown={e => setSwipeStart(e.clientX ? e.clientX : 0)}
          onMouseUp={e => setSwipeEnd(e.clientX ? e.clientX : 0)}
          onTouchStart={e => setSwipeStart(e.touches[0] && e.touches[0].clientX ? e.touches[0].clientX : 0)}
          onTouchMove={e => setSwipeEnd(e.touches[0] && e.touches[0].clientX ? e.touches[0].clientX : 0)}
          style={{
            transform: `translateX(${offset}px)`,
          }}
        >
          {
            cardsDataList.map(obj => 
            // eslint-disable-next-line jsx-a11y/role-supports-aria-props
            <li key={getRandomKey()} className={styles.item} aria-selected={true}>
              <Card {...obj} />
            </li>)
          }
        </ul>
      </div>

    </div>
   );
}
 
export default Slider;