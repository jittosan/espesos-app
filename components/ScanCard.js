import {MdOutlineConnectedTv} from 'react-icons/md'
import styles from './ScanCard.module.scss'

let displayText = {
    'user': 'Scan your card to login',
    'recipient': 'Scan the card you want to pay',
    undefined: 'Scan card'
}

const ScanCard = ({ toggle, displayTextSwitch }) => {
    return(
        <div className={styles.container}>
            <MdOutlineConnectedTv />
            <p onClick={() => toggle()}>{displayText[displayTextSwitch]}</p>
        </div>
    )
}

export default ScanCard