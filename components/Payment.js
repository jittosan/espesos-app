import  { useRef, useState } from 'react'
import styles from './Payment.module.scss'
import { fetchAccountData, readPaymentToken } from '../scripts/reader'
import ScanCard from './ScanCard'

const Payment = ({ close }) => {
    let paymentAmountref = useRef(null)
    // state to hold recipient token information
    const [recipientData, setRecipientData] = useState(null)
    const tokenLoggedIn = () => {return recipientData !== null}
    const connectToken = () => {console.log('click');if (tokenLoggedIn()) {setRecipientData(null)} else {processPayment()}}
    
    //process payment
    const processPayment = async () => {
        const token = await readPaymentToken()
        const response = await fetchAccountData(token)
        setRecipientData(response)
    }

    return (
        <div className={styles.container}>
            <strong>Pay:</strong>
            <div className={styles.paymentConfirmation}>
                {tokenLoggedIn() ?  
                    <>
                        <h1 className={styles.paymentAccountName}>{recipientData.name}</h1>
                        <span className={styles.paymentAccountToken}>{recipientData.token}</span>
                    </> 
                    : 
                    <>
                        <ScanCard toggle={() => {connectToken()}} displayTextSwitch={'recipient'} />
                    </>
                }
            </div>
            <input 
                className={styles.amountInput} 
                type={'number'} 
                ref={el => {paymentAmountref = el}}
                placeholder={'0.00'}
            />
            <button className={styles.cancelButton} onClick={() => {close()}}>Cancel</button>
            <button className={styles.paymentButton} onClick={() => {close()}}>Pay</button>
        </div>
    )
}

export default Payment
