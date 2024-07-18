import classNames from 'classnames/bind'
import styles from './ForgotPassword.module.scss'

const cx = classNames.bind(styles)

function ForgotPassword() {
    return <div className={cx('wrapper_forgot_pass')}></div>
}

export default ForgotPassword
