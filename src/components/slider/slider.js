import styles from './index.module.scss'
import { useRef, useState } from 'react'
import { Button } from '../button/button';
import { Arrow } from '../arrow/arrow';
import { useUnit } from 'effector-react';
import { dataModel } from '../../effector';
import { Slide } from './slide';


export function Slider(slides) {
  const [catsData] = useUnit([
    dataModel.$catsData
  ])
  const catsDataLenght = catsData.length

  const [slideActive, setSlideActive] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [transformMove, setTransformMove] = useState(0)
  const idInterval = useRef(0)
  const clientXStart = useRef(0)
  const slideWidth = useRef(null)
  let transform = 0

  transform = slideActive * slideWidth.current?.offsetWidth

  const prevSlide = () => {
    setSlideActive((slideActive) => (slideActive - 1 + catsDataLenght) % catsDataLenght)
  }

  const nextSlide = () => {
    setSlideActive((slideActive) => (slideActive + 1) % catsDataLenght)
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
    setTransformMove(transform + clientXMove / 100)
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

  const slidesInfo = slides.slides.map((item, index) => <Slide key={item.id} img={item.url} index={index} />)

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
            style={{ transform: `translate3d(-${transformMove !== 0 ? transformMove : transform}px, 0px, 0px)` }}
          >
            {slidesInfo}
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