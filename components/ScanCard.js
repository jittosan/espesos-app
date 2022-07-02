import {MdOutlineConnectedTv} from 'react-icons/md'
import styles from './ScanCard.module.scss'

const ScanCard = ({ toggle }) => {
    return(
        <div className={styles.container}>
            <MdOutlineConnectedTv />
            <p onClick={() => toggle()}>Scan your card to login.</p>
        </div>
    )
}

export default ScanCard