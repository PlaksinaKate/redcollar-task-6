import styles from './button.module.scss'

export function Button ({children})  {
  return (
    <button className={styles.button}>{children}</button>
  )
}