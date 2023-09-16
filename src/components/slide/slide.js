import styles from './slide.module.scss'

export function Slide({ img, index, slideActive }) {
  return (
    <div className={styles.slide}>
      <div className={styles.slide__wr}>
        <div className={styles.slide__img}>
          <img src={img} alt={index} />
        </div>
        <div className={styles.slide__title}>Slide {index}</div>
      </div>
    </div>
  )
}