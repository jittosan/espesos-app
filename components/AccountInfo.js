import React from 'react'
import styles from './AccountInfo.module.scss'

const AccountInfo = ({ accountInfo }) => {
  return (
    <div className={styles.container}>
        <h1 className={styles.accountName}>{accountInfo.name}</h1>
        <span className={styles.token}>{accountInfo.token}</span>

        <h1 className={styles.accountBalance}>$ {accountInfo.balance}</h1>
    </div>
  )
}

export default AccountInfo