import styles from './slider.module.scss'
import { useRef, useState } from 'react'
import Button from '../ui/button/button';
import Arrow from '../ui/arrow/arrow';
import { useStore } from 'effector-react';
import { dataModel } from '../../effector';


export function Slider({ children }) {
  const catsData = useStore(dataModel.$catsData)
  const catsDataLenght = catsData.length

  const [slideActive, setSlideActive] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [transformMove, setTransformMove] = useState(0)
  const idInterval = useRef(0)
  const clientXStart = useRef(0)
  const slideWidth = useRef(null)
  const transform = useRef(0)

  transform.current = slideActive * slideWidth.current?.offsetWidth

  const prevSlide = () => {
    setSlideActive((slideActive - 1 + catsDataLenght) % catsDataLenght)
  }

  const nextSlide = () => {
    setSlideActive((slideActive + 1) % catsDataLenght)
  }


  const onAutoPlayClick = () => {
    if (isAutoPlay) {
      setIsAutoPlay(false)
      clearInterval(idInterval.current)
    } else {
      idInterval.current = setInterval(() => {
        setSlideActive((slideActive) => (slideActive + 1) % catsDataLenght)
      }, 2000)
      setIsAutoPlay(true)
    }
  }

  const onTouchStartSlide = (e) => {
    clientXStart.current = e.touches[0].clientX
  }

  const onTouchMoveSlide = (e) => {
    const clientXMove = e.touches[0].clientX - clientXStart.current
    setTransformMove(transform.current + clientXMove / 100)
  }

  const onTouchEndSlide = (e) => {
    const clientXEnd = e.changedTouches[0].clientX
    setTransformMove(0)
    if ((clientXEnd - clientXStart.current) >= 0) {
      prevSlide()
    } else {
      nextSlide()
    }
  }


  return (
    <div className={styles.wr}>
      <div className={styles.slider}>
        <div
          ref={slideWidth}
          className={styles.slider__wr}
          onTouchStart={onTouchStartSlide}
          onTouchEnd={onTouchEndSlide}
          onTouchMove={onTouchMoveSlide}
        >
          <div
            className={styles.slider__track}
            style={{ transform: `translate3d(-${transformMove !== 0 ? transformMove : transform.current}px, 0px, 0px)` }}
          >
            {children}
          </div>
        </div>
        <div className={styles.navigations}>
          <div className={`${styles.navigation} ${styles.navigation_prev}`} onClick={prevSlide}>
            <Arrow />
          </div>
          <div className={`${styles.navigation} ${styles.navigation_next}`} onClick={nextSlide}>
            <Arrow />
          </div>
        </div>
      </div>

      <div className={styles.slider__btnWr} onClick={onAutoPlayClick}>
        <Button>{isAutoPlay ? 'stop auto slide' : 'start auto slide'}</Button>
      </div>
    </div>
  )
}