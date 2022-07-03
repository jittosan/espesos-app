// takes in token and obtains Account data from server
const SERVER_ADDRESS = process.env.SERER_ADDRESS

export default async function handler(req, res) {
    if (req.method === 'GET') {
        res.status(403)
    } else if (req.method === 'POST') {
        //check token has been passed in
        if (req.body.token === undefined) {
            res.status(400)
        } else {
            //
            const response = await fetch(SERVER_ADDRESS + '/account/', {
                method:'POST',
                body: JSON.stringify({'token': req.body.token}),
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