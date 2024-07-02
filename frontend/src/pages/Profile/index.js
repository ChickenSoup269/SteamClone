import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import classNames from 'classnames/bind'
import styles from './Profile.module.scss'

const cx = classNames.bind(styles)
function Profile() {
    const showToastMessage = () => {
        toast.success('Success Notification !')
        toast.error('Success Notification !')
    }
    return (
        <header className={cx('wrapper')}>
            <div className={cx('steamClone-profile')}>
                <button onClick={showToastMessage}>Notify!</button>
                <ToastContainer />
            </div>
        </header>
    )
}

export default Profile
