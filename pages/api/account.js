// takes in token and obtains Account data from server
// let db = {
//     '73fb-gd68-sfn9-s7d4': {
//         'name':'Ratnajit Sarkar',
//         'token':'73fb-gd68-sfn9-s7d4',
//         'balance': '28.90'
//     },
//     '8fng-d7r3-mxo3-v4u3': {
//         'name':'Davin Chua',
//         'token':'8fng-d7r3-mxo3-v4u3',
//         'balance': '32.00'
//     },
//     'rh83-4h89-fnuu-49gf': {
//         'name':'Rammdarshan s/o Ramesh',
//         'token':'rh83-4h89-fnuu-49gf',
//         'balance': '6.10'
//     }
// }

export default async function handler(req, res) {
    if (req.method === 'GET') {
        res.status(403)
    } else if (req.method === 'POST') {
        //check token has been passed in
        if (req.body.token === undefined) {
            res.status(400)
        } else {
            //
            const response = await fetch('http://127.0.0.1:8000/account/', {
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