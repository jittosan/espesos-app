const SERVER_ADDRESS = "http://127.0.0.1:8000"

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // don't allow get requests
        res.status(403)
    } else if (req.method === 'POST') {
        //check parameters are passed in
        if (req.body.senderToken === undefined | req.body.recipientToken === undefined | req.body.amount === undefined) {
            res.status(400)
        } else {
            console.log(req.body)
            //
            const response = await fetch(SERVER_ADDRESS + '/transaction/', {
                method:'POST',
                body: JSON.stringify({
                    'sender_token': req.body.senderToken,
                    'recipient_token': req.body.recipientToken,
                    'amount': req.body.amount
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            console.log("SERVER DATA: ", data)
            res.status(200).json(data)
        }
    }
}