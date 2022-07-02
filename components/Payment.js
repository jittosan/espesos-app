import React, { useRef } from 'react'

const Payment = () => {
    let paymentAmountref = useRef(null)
    const [token, setToken] = useState(null)

    return (
        <div>
            <input type={'number'} ref={el => {paymentAmountref = el}} />
            <p>Tap the card you are trying to pay</p>
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