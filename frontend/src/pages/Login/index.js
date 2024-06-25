import { useState } from 'react'
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

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    const toggleQrVisibility = () => {
        setQrVisible(!qrVisible)
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('full-background')}>
                <div className={cx('container-login')}>
                    <div className={cx('login-box')}>
                        <div className={cx('header-text')}>
                            <p>Đăng nhập</p>
                        </div>
                        <div className={cx('input-group')}>
                            <input type="text" className={cx('input-field')} id="username" required />
                            <label htmlFor="username">Đăng nhập bằng tên tài khoản</label>
                        </div>
                        <div className={cx('input-group', 'password-group')}>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                className={cx('input-field')}
                                id="password"
                                required
                            />
                            <label htmlFor="password">Mật khẩu</label>
                            <FontAwesomeIcon
                                className={cx('show-hide-btn')}
                                icon={passwordVisible ? faEyeSlash : faEye}
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        <div className={cx('check-remember-forgot')}>
                            <div className={cx('check-remember')}>
                                <input
                                    type="checkbox"
                                    className={cx('input-check-remeber')}
                                    id="remeber-account"
                                    value="check"
                                />
                                <label htmlFor="remeber-account"> Ghi nhớ tôi</label>
                            </div>
                            <div className={cx('forgot-pass')}>
                                <NavLink to="#">Quên mật khẩu?</NavLink>
                            </div>
                        </div>
                        <div className={cx('input-group')}>
                            <button className={cx('input-submit')}>Đăng nhập </button>
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
