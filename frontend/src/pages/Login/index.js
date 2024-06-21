import classNames from 'classnames/bind'
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

function Login() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('full-background')}></div>
        </header>
    )
}

export default Login
