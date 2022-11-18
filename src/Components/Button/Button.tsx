import React from 'react';
import styles from './button.module.scss'

type Props = {
  text: string,
}

const Button: React.FC<Props> = ({text}) => {
  return (
    <button className={styles.btn} >{text}</button>
  )
}

export default Button
