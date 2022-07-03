// takes in token and obtains Account data from server
let testAccount = {
    'name':'Ratnajit Sarkar',
    'token':'73fb-gd68-sfn9-s7d4',
    'balance': '28.90'
}

let db = [
    {
        'name':'Ratnajit Sarkar',
        'token':'73fb-gd68-sfn9-s7d4',
        'balance': '28.90'
    },
    {
        'name':'Davin Chua',
        'token':'8fng-d7r3-mxo3-v4u3',
        'balance': '32.00'
    },
    {
        'name':'Rammdarshan s/o Ramesh',
        'token':'rh83-4h89-fnuu-49gf',
        'balance': '6.10'
    }
]

let count = 0
const increment = () => {
    count = (count+1) % 3
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        res.status(403)
    } else if (req.method === 'POST') {
        increment()
        res.status(200).json(db[count])
    }
}