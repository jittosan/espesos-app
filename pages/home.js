import Head from 'next/head'
import { useEffect, useState } from 'react'
import AccountInfo from '../components/AccountInfo'
import ScanCard from '../components/ScanCard'
import Header from '../components/Header'
import styles from './../styles/Home.module.scss'

let testAccount = {
    'name':'Ratnajit Sarkar',
    'token':'73fb-gd68-sfn9-s7d4',
    'balance': '187.90'
}


export default function Home() {
    // state to store currently logged in token
    const [token, setToken] = useState(null)
    const tokenLoggedIn = () => {return token !== null}
    const connectToken = () => {console.log('click');if (tokenLoggedIn()) {setToken(null)} else {setToken('token')}}

    useEffect(() => {
        console.log(token)
    }, [token])
    

    return (
        <div>
        <Head>
            <title>ESPesos Exchange</title>
            <meta name="description" content="ESPesos Exchange Application" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            <Header onClick={connectToken} />
            {/* <AccountInfo accountInfo={testAccount}/> */}
            {tokenLoggedIn() ? <AccountInfo accountInfo={testAccount}/> : <ScanCard toggle={connectToken} />}
        </main>

        <footer className={styles.footer}>
            
        </footer>
        </div>
    )
}


