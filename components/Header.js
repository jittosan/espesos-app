import React from 'react'
import {RiCurrencyLine} from 'react-icons/ri'
import styles from './Header.module.scss'

const Header = ({ props }) => {
  return (
    <div className={styles.container} >
      <RiCurrencyLine />
      <h2>ESPex</h2>
      <p>The ESPesos Exchange</p>
    </div>
  )
}

export default Header