import Head from 'next/head'
import { useEffect, useState } from 'react'
import AccountInfo from '../components/AccountInfo'
import ScanCard from '../components/ScanCard'
import Header from '../components/Header'
import styles from './../styles/Home.module.scss'
import Payment from '../components/Payment'
import { fetchAccountData, readPaymentToken, readUserToken } from '../scripts/reader'

export default function Home() {
    // state to store currently logged in token
    const [userData, setUserData] = useState(null)
    const tokenLoggedIn = () => {return userData !== null}
    const connectToken = () => {console.log('click');if (tokenLoggedIn()) {setUserData(null)} else {setUserData('token')}}
    // state to open payment menu
    const [openPayment, setOpenPayment] = useState(false)
    const openPaymentMenu = () => {setOpenPayment(true)}
    const closePaymentMenu = () => {setOpenPayment(false)}

    // scan for NFC cards on load
    useEffect(() => {
        const loadUser = async () => {
            const token = await readUserToken()
            const response = await fetchAccountData(token)
            setUserData(response)
        }
        loadUser()
    }, [])

    return (
        <div>
        <Head>
            <title>ESPesos Exchange</title>
            <meta name="description" content="ESPesos Exchange Application" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            <Header />
            {tokenLoggedIn() ? <AccountInfo accountInfo={userData} openPayment={openPaymentMenu}/> : <ScanCard toggle={connectToken} />}
            {openPayment ? <Payment close={closePaymentMenu} /> : ''}
        </main>

        <footer className={styles.footer}>
            
        </footer>
        </div>
    )
}


