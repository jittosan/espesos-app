import Head from 'next/head'
import { useEffect, useState } from 'react'
import AccountInfo from '../components/AccountInfo'
import ScanCard from '../components/ScanCard'
import Header from '../components/Header'
import styles from './../styles/Home.module.scss'
import Payment from '../components/Payment'
import { fetchAccountData, readUserToken } from '../scripts/reader'

export default function Home() {
    // state to store scanned token
    const [userToken, setUserToken] = useState('')
    const userLoggedIn = () => {return userToken !== ''}
    const loginUser = (token) => {setUserToken(token)}
    // state to store user data from scanned token (store token separately to enable data refresh while retaining login/token, after paymetn processed)
    const [userData, setUserData] = useState({})
    const userDataLoaded = () => {return userData !== {}}
    const loadUserData = (data) => {setUserData(data)}
    const connectToken = () => {console.log('click');if (userDataLoaded()) {setUserData(null)} else {setUserData('token')}}
    // state to open payment menu
    const [openPayment, setOpenPayment] = useState(false)
    const openPaymentMenu = () => {setOpenPayment(true)}
    const closePaymentMenu = () => {setOpenPayment(false)}

    // load in token from "NFC"
    useEffect(() => {
        const loadUserToken = async () => {
            const token = await readUserToken()
            loginUser(token)
        }
        if (!userLoggedIn()) {loadUserToken()}
    }, [])

    // load in user data whenever token updates
    useEffect(() => {
        const getTokenData = async () => {
            console.log('LOADING TOKEN', userToken)
            const response = await fetchAccountData(userToken)
            loadUserData(response)
        }
        if (userLoggedIn()) {getTokenData()}
    }, [userToken])


    // scan for NFC cards on load
    // useEffect(() => {
    //     const loadUser = async () => {
    //         const token = await readUserToken()
    //         const response = await fetchAccountData(token)
    //         console.log('DATA', response)
    //         setUserData(response)
    //     }
    //     loadUser()
    // }, [])

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
                    loadToken={loginUser} 
                    toggle={connectToken}
                    displayTextSwitch={'user'}
                />}
            {openPayment ? <Payment close={closePaymentMenu} senderInfo={userData} /> : ''}
        </main>
        </div>
    )
}


