export default function handler(req, res) {
    if (req.method === 'GET') {
        // don't allow get requests
        res.status(403)
    } else if (req.method === 'POST') {
        //check parameters are passed in
        if (req.body.senderToken === undefined | req.body.recipientToken === undefined | req.body.amount === undefined) {
            res.status(400)
        } else {
            console.log(req.body)
            res.status(200).json({'status': 'complete'})
        }
    }
}