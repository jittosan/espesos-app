
const readUserToken = async () => {
    return '8fng-d7r3-mxo3-v4u3'
}

const readPaymentToken = async () => {
    return 'rh83-4h89-fnuu-49gf'
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