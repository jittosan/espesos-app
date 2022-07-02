import  { useRef, useState } from 'react'
import styles from './Payment.module.scss'

const Payment = ({ closePayment }) => {
    let paymentAmountref = useRef(null)
    const [token, setToken] = useState(null)
    console.log(styles)
    return (
        <div className={styles.container}>
            <input type={'number'} ref={el => {paymentAmountref = el}} />
            <p className={styles.token} onClick={() => closePayment()}>Tap the card you are trying to pay</p>
        </div>
    )
}

export default Payment

const PaymentConfirmation = ({accountInfo}) => {
    return (
        <div>
            <p>You are paying</p>
            <h1>{accountInfo.name}</h1>
            <span>{accountInfo.token}</span>
            <button>Confirm?</button>
        </div>
    )
}