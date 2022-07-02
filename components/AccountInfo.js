import React from 'react'
import styles from './AccountInfo.module.scss'

const AccountInfo = ({ accountInfo, openPayment }) => {
  return (
    <div className={styles.container}>
        <div>
            <h1 className={styles.accountName}>{accountInfo.name}</h1>
            <span className={styles.token}>{accountInfo.token}</span>
            <h1 className={styles.accountBalance}>$ {accountInfo.balance}</h1>
        </div>
        <button className={styles.paymentButton} onClick={() => openPayment()}>Make Payment</button>
    </div>
  )
}

export default AccountInfo