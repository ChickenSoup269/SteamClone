import classNames from 'classnames/bind'
import styles from './Notification.module.scss'

const cx = classNames.bind(styles)

function Notification() {
    return <div className={cx('wrapper_notification')}></div>
}

export default Notification
