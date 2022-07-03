import  { useRef, useState } from 'react'
import styles from './Payment.module.scss'
import { fetchAccountData } from '../scripts/reader'
import ScanCard from './ScanCard'

const Payment = ({ close, senderInfo }) => {
    // ref pointing to amount input
    let paymentAmountRef = useRef(null)
    // state to hold recipient token information
    const [recipientData, setRecipientData] = useState(null)
    const recipientTokenLogged = () => {return recipientData !== null}
    const loadRecipientData = async (token) => {
        const response = await fetchAccountData(token)
        setRecipientData(response)
    }
    
    // validate inputs
    const validatePaymentInputs = () => {
        // check payment amount has been input
        if (paymentAmountRef.value === '') {
            console.log('Payment amount not entered.')
            return false
        }
        const paymentAmount = parseFloat(paymentAmountRef.value)
        console.log(paymentAmount)
        //to get to this page, userToken must already be loaded in; so assume userToken loaded
        // check recipient token logged
        if (!recipientTokenLogged()) {
            console.log('INVALID INPUTS: recipient token not loaded in.')
            return false
        }
        // check recipient token different from user token
        else if (senderInfo.token === recipientData.token) {
            console.log('INVALID INPUTS: recipient and sender are identical.')
            return false
        }
        // check amount is positive
        else if (paymentAmount <= 0) {
            console.log('INVALID INPUTS: payment amount is not positive.')
            return false
        }
        // check sufficient funds
        else if (paymentAmount > senderInfo.balance) {
            console.log('INVALID INPUTS: Sender has insufficient funds.')
            return false
        }
        else {
            console.log('Input Validation Passed.')
            return true
        }
    }

    //process payment
    const processPayment = () => {
        if (validatePaymentInputs()) {
            console.log('Process Payment.')
            close()
        } else {
            console.log('Payment Rejected.')
        }
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
                ref={el => {paymentAmountRef = el}}
                placeholder={'0.00'}
            />
            <button className={styles.cancelButton} onClick={() => {close()}}>Cancel</button>
            <button className={styles.paymentButton} onClick={() => {processPayment()}}>Pay</button>
        </div>
    )
}

export default Payment
