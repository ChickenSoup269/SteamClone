import classNames from 'classnames/bind'
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

function Login() {
    return (
        <header className={cx('wrapper')}>
            <h2>login</h2>
        </header>
    )
}

export default Login
