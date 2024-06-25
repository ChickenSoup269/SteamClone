import classNames from 'classnames/bind'
import styles from './LogOut.module.scss'

const cx = classNames.bind(styles)

function LogOut() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('log-out-form')}></div>
        </div>
    )
}

export default LogOut
