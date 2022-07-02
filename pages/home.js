import Head from 'next/head'
import { useEffect, useState } from 'react'
import AccountInfo from '../components/AccountInfo'
import ScanCard from '../components/ScanCard'
import Header from '../components/Header'
import styles from './../styles/Home.module.scss'
import Payment from '../components/Payment'

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
    // state to open payment menu
    const [openPayment, setOpenPayment] = useState(false)
    const openPaymentMenu = () => {setOpenPayment(true)}
    const closePaymentMenu = () => {setOpenPayment(false)}


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
            <Header />
            {/* <AccountInfo accountInfo={testAccount}/> */}
            {/* {tokenLoggedIn() ? <AccountInfo accountInfo={testAccount}/> : <ScanCard toggle={connectToken} />} */}
            {tokenLoggedIn() ? <AccountInfo accountInfo={testAccount} openPayment={openPaymentMenu}/> : <ScanCard toggle={connectToken} />}
            {openPayment ? <Payment closePayment={closePaymentMenu} /> : ''}
        </main>

        <footer className={styles.footer}>
            
        </footer>
        </div>
    )
}


