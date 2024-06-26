import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import QRCode from 'qrcode.react'

import classNames from 'classnames/bind'
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [qrVisible, setQrVisible] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    useEffect(() => {
        const rememberedUsername = localStorage.getItem('username')
        const rememberedPassword = localStorage.getItem('password')
        const rememberMeChecked = localStorage.getItem('rememberMe') === 'true'

        if (rememberedUsername && rememberedPassword && rememberMeChecked) {
            setUsername(rememberedUsername)
            setPassword(rememberedPassword)
            setRememberMe(true)
        }
    }, [])

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    const toggleQrVisibility = () => {
        setQrVisible(!qrVisible)
    }

    const handleLogin = () => {
        if (rememberMe) {
            localStorage.setItem('username', username)
            localStorage.setItem('password', password)
            localStorage.setItem('rememberMe', rememberMe.toString())
        } else {
            localStorage.removeItem('username')
            localStorage.removeItem('password')
            localStorage.removeItem('rememberMe')
        }

        // xử lý logic login
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('full-background')}>
                <div className={cx('container-login')}>
                    <div className={cx('login-box')}>
                        <div className={cx('header-text')}>
                            <p>Đăng nhập</p>
                        </div>

                        {/* username */}
                        <div className={cx('input-group')}>
                            <input
                                type="text"
                                className={cx('input-field')}
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <label htmlFor="username">Đăng nhập bằng tên tài khoản</label>
                        </div>

                        {/* password */}
                        <div className={cx('input-group', 'password-group')}>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                className={cx('input-field')}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="password">Mật khẩu</label>
                            <FontAwesomeIcon
                                className={cx('show-hide-btn')}
                                icon={passwordVisible ? faEyeSlash : faEye}
                                onClick={togglePasswordVisibility}
                            />
                        </div>

                        {/* Check Remember account */}
                        <div className={cx('check-remember-forgot')}>
                            <div className={cx('check-remember')}>
                                <input
                                    type="checkbox"
                                    className={cx('input-check-remember')}
                                    id="remember-account"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                <label htmlFor="remember-account">Ghi nhớ tôi</label>
                            </div>
                            <div className={cx('forgot-pass')}>
                                <NavLink to="#">Quên mật khẩu?</NavLink>
                            </div>
                        </div>

                        {/* Button login */}
                        <div className={cx('input-group')}>
                            <button className={cx('input-submit')} onClick={handleLogin}>
                                Đăng nhập
                            </button>
                        </div>
                        <span className={cx('qr-text')} onClick={toggleQrVisibility}>
                            Hoặc đăng nhập bằng QR
                        </span>
                    </div>
                    <div className={cx('qr-section', { visible: qrVisible })}>
                        <h4 className={cx('title-qr')}>Quét mã bằng app để đăng nhập</h4>
                        <QRCode value="http://localhost:8080/login" size={128} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Login
