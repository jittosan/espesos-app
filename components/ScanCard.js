import { useEffect, useRef } from 'react'
import {MdOutlineConnectedTv} from 'react-icons/md'
import { readPaymentToken, readUserToken } from '../scripts/reader'
import styles from './ScanCard.module.scss'

let displayText = {
    'user': 'Scan your card to login',
    'recipient': 'Scan the card you want to pay',
    undefined: 'Scan card'
}

const ScanCard = ({ toggle, displayTextSwitch, onScan }) => {
    // ref to get inut token
    const tokenRef = useRef()
    const loadToken = () => {
        onScan(tokenRef.value)
    }
    // begin scanning "NFC" on load
    // useEffect(() => {
    //     const scanForCard = async () => {
    //         let token = ''
    //         // scan for NFC but for testing just read in tokens
    //         if (displayTextSwitch === 'user') {token = await readUserToken()}
    //         else if (displayTextSwitch === 'recipient') {token = await readPaymentToken()}
    //         console.log('TOKEN', token)
    //         onScan(token)
    //     }
    //     scanForCard()

    // }, [])


    return(
        <div className={styles.container}>
            <MdOutlineConnectedTv />
            <p>{displayText[displayTextSwitch]}</p>
            <input type={'text'} ref={el => {tokenRef=el}} />
            <button onClick={() => {loadToken()}}>Enter</button>
        </div>
    )
}

export default ScanCard