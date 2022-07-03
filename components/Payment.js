import  { useEffect, useRef, useState } from 'react'
import styles from './Payment.module.scss'
import { fetchAccountData, submitTransaction } from '../scripts/reader'
import ScanCard from './ScanCard'
import { MdErrorOutline } from 'react-icons/md'

// utilty functions
const parsePaymentAmount = (ref) => {
    if (ref.value === '') {
        return null
    } else {
        return parseFloat(ref.value)
    }
}

// error messages
let errorMessages = {
    1: 'No recipient token detected',
    2: 'Recipient and Sender tokens are identical',
    3: 'Payment amount not entered',
    4: 'Payment amount not positive',
    5: 'Sender has insufficient funds'
}

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
    // state to hold error states
    const [errorCode, setErrorCode] = useState(0)
    const paymentError = () => {return errorCode !== 0}
    const flagError = (flag) => {setErrorCode(flag)}
    const clearError = () => {setErrorCode(0)}
    // effect to clear error after 5s
    useEffect(()=>{
        if (paymentError()) {
            setTimeout(()=>{
                clearError()
            }, 3000)
        }
    }, [errorCode])


    // validate inputs
    const validatePaymentInputs = (paymentAmount) => {
        //to get to this page, userToken must already be loaded in; so assume userToken loaded
        // check recipient token logged
        if (!recipientTokenLogged()) {
            console.log('INVALID INPUTS: recipient token not loaded in.')
            flagError(1)
            return false
        }
        // check recipient token different from user token
        else if (senderInfo.token === recipientData.token) {
            console.log('INVALID INPUTS: recipient and sender are identical.')
            flagError(2)
            return false
        }
        // check paymetn amount entered
        else if (paymentAmount === null) {
            console.log('Payment amount not entered.')
            flagError(3)
            return false
        }
        // check amount is positive
        else if (paymentAmount <= 0) {
            console.log('INVALID INPUTS: payment amount is not positive.')
            flagError(4)
            return false
        }
        // check sufficient funds
        else if (paymentAmount > senderInfo.balance) {
            console.log('INVALID INPUTS: Sender has insufficient funds.')
            flagError(5)
            return false
        }
        else {
            console.log('Input Validation Passed.')
            return true
        }
    }

    //process payment
    const processPayment = () => {
        const paymentAmount = parsePaymentAmount(paymentAmountRef)
        if (validatePaymentInputs(paymentAmount)) {
            console.log('Process Payment.')
            submitTransaction(senderInfo.token, recipientData.token, paymentAmount)
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
            {paymentError() ? <PaymentErrorMessage errorCode={errorCode} /> : ''}
            <button className={styles.cancelButton} onClick={() => {close()}}>Cancel</button>
            <button className={styles.paymentButton} onClick={() => {processPayment()}}>Pay</button>
        </div>
    )
}

export default Payment

const PaymentErrorMessage = ({ errorCode }) => {
    return (
        <div className={styles.paymentError}>
            <MdErrorOutline />
            <p>{errorMessages[errorCode]}</p>
        </div>
    )
}