import  { useRef, useState } from 'react'
import styles from './Payment.module.scss'
import {MdOutlineConnectedTv} from 'react-icons/md'

let demoPayment = {
    'token': '8fng-d7r3-mxo3-v4u3',
    'name' : 'Davin Chua'
}

const Payment = ({ close }) => {
    let paymentAmountref = useRef(null)
    // state to hold recipient token information
    const [token, setToken] = useState(null)
    const tokenLoggedIn = () => {return token !== null}
    const connectToken = () => {console.log('click');if (tokenLoggedIn()) {setToken(null)} else {setToken('token')}}
    
    return (
        <div className={styles.container}>
            <strong>Pay:</strong>
            <div className={styles.paymentConfirmation}>
                {tokenLoggedIn() ?  
                    <>
                        <h1 className={styles.paymentAccountName}>{demoPayment.name}</h1>
                        <span className={styles.paymentAccountToken}>{demoPayment.token}</span>
                    </> 
                    : 
                    <>
                        <MdOutlineConnectedTv />
                        <p className={styles.token} onClick={() => {connectToken()}}>Scan the card you are trying to pay</p> 
                    </>
                }

                
                {/* <h1>{accountInfo.name}</h1>
                <span>{accountInfo.token}</span> */}
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

// const PaymentConfirmation = ({accountInfo}) => {
//     return (
//         <div className={styles.paymentConfirmation}>
//             <p className={styles.token} >Tap the card you are trying to pay</p>
//             {/* <h1>{accountInfo.name}</h1>
//             <span>{accountInfo.token}</span> */}
//         </div>
//     )
// }