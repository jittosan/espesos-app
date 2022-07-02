const readUserToken = async () => {
    return '73fb-gd68-sfn9-s7d4'
}

const readPaymentToken = async () => {
    return '8fng-d7r3-mxo3-v4u3'
}

const fetchAccountData = async (token) => {
    const response = await fetch('/api/account', {
        method:'POST',
        body: JSON.stringify({token: token}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    return data
}

export {readUserToken, readPaymentToken, fetchAccountData}