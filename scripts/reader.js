
const readUserToken = async () => {
    return 'rh83-4h89-fnuu-49gf'
}

const readPaymentToken = async () => {
    return '8fng-d7r3-mxo3-v4u3'
}

// NFC FUNCTIONS
const isNFCenabled = () => {
    return ('NDEFReader' in window)
}

const startNFCscan = () => {
    // check browser is NFC compatible
    if (!isNFCenabled()){return null}
    const ndef = new NDEFReader();
    ndef.scan().then(() => {
        console.log('NFC scan started')
        // NFC error handling
        ndef.onreadingerror = () => {
            console.log('FAILED: Unable to read data from NFC tag.')
        }
        // NFC reading event
        ndef.onreading = (event) => {
            console.log('Reading NFC tag...')
            // return token
        }
    }).catch((error) => {
        console.log(`FAILED: Scan failed to start: ${error}`)
    })
}


// NEXT API FUNCTIONS

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

const submitTransaction = async (senderToken, recipientToken, amount) => {
    const response = await fetch('/api/transaction', {
        method:'POST',
        body: JSON.stringify({'senderToken': senderToken, 'recipientToken' : recipientToken, 'amount': amount}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    return data
}

export {
    readUserToken, 
    readPaymentToken, 
    fetchAccountData, 
    submitTransaction,
    isNFCenabled,
    startNFCscan
}