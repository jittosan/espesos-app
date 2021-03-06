import Head from 'next/head'
import { useEffect, useState } from 'react'
import AccountInfo from '../components/AccountInfo'
import ScanCard from '../components/ScanCard'
import Header from '../components/Header'
import styles from './../styles/Home.module.scss'
import Payment from '../components/Payment'
import { fetchAccountData, isNFCenabled } from '../scripts/reader'

// IMPLEMENT LOADER FOR WHEN SERVER IS UNRESPONSIVE

export default function Home() {
    // state to store scanned token
    const [userToken, setUserToken] = useState('')
    const userLoggedIn = () => {return userToken !== ''}
    const loginUser = (token) => {setUserToken(token)}
    // state to store user data from scanned token (store token separately to enable data refresh while retaining login/token, after paymetn processed)
    const [userData, setUserData] = useState({})
    const userDataLoaded = () => {return userData !== {}}
    const loadUserData = (data) => {setUserData(data)}
    // state to open payment menu
    const [openPayment, setOpenPayment] = useState(false)
    const openPaymentMenu = () => {setOpenPayment(true)}
    const closePaymentMenu = () => {setOpenPayment(false)}

    //check NFC compatibility on initial load
    useEffect(() => {
        if (isNFCenabled()) {
            console.log("NFC enabled")
        } else{
            console.log("NFC disabled on this device.")
        }
    }, [])

    // load in user data whenever token updates
    useEffect(() => {
        const getTokenData = async () => {
            console.log('LOADING TOKEN', userToken)
            const response = await fetchAccountData(userToken)
            loadUserData(response)
        }
        if (userLoggedIn()) {getTokenData()}
    }, [userToken, openPayment])

    return (
        <div>
        <Head>
            <title>ESPesos Exchange</title>
            <meta name="description" content="ESPesos Exchange Application" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            <Header />
            {userLoggedIn() ? 
                <AccountInfo accountInfo={userData} openPayment={openPaymentMenu}/> 
                : 
                <ScanCard 
                    onScan={loginUser}
                    displayTextSwitch={'user'}
                />}
            {openPayment ? <Payment close={closePaymentMenu} senderInfo={userData} /> : ''}
        </main>
        </div>
    )
}


