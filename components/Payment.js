import  { useRef, useState } from 'react'
import styles from './Payment.module.scss'
import { fetchAccountData } from '../scripts/reader'
import ScanCard from './ScanCard'

const Payment = ({ close }) => {
    let paymentAmountref = useRef(null)
    // state to hold recipient token information
    const [recipientData, setRecipientData] = useState(null)
    const recipientTokenLogged = () => {return recipientData !== null}
    const loadRecipientData = (token) => {processPayment(token)}
    
    //process payment
    const processPayment = async (token) => {
        const response = await fetchAccountData(token)
        setRecipientData(response)
    }

    return (
        <div className={styles.container}>
            <strong>Pay:</strong>
            <div className={styles.paymentConfirmation}>
                {recipientTokenLogged() ?  
                    <>
                        <h1 className={styles.paymentAccountName}>{recipientData.name}</h1>
                        <span className={styles.paymentAccountToken}>{recipientData.token}</span>
                    </> 
                    : 
                    <>
                        <ScanCard 
                            displayTextSwitch={'recipient'} 
                            onScan={loadRecipientData}
                        />
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
