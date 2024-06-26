import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons'
import ReCAPTCHA from 'react-google-recaptcha'

import classNames from 'classnames/bind'
import styles from './Register.module.scss'

// 6LeF5AEqAAAAAJ6SwrkROCsXMWDxpn1Tt3HoGxHr [key recaptcha]

const cx = classNames.bind(styles)

function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [infoUserVisible, setinfoUserVisible] = useState(false)
    const [qrVisible, setQrVisible] = useState(false)
    const inputRefs = useRef([])

    const toggleinfoUserVisibility = () => {
        setinfoUserVisible(!infoUserVisible)
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    const toggleQrVisibility = () => {
        setQrVisible(!qrVisible)
    }

    const handleInput = (e, index) => {
        const target = e.target
        const val = target.value

        if (isNaN(val)) {
            target.value = ''
            return
        }

        if (val !== '') {
            const next = inputRefs.current[index + 1]
            if (next) {
                next.focus()
            }
        }
    }

    const handleKeyUp = (e, index) => {
        const target = e.target
        const key = e.key.toLowerCase()

        if (key === 'backspace' || key === 'delete') {
            target.value = ''
            const prev = inputRefs.current[index - 1]
            if (prev) {
                prev.focus()
            }
            return
        }
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('full-background')}>
                <form className={cx('container-register')}>
                    <div className={cx('register-box')}>
                        <div className={cx('header-text')}>
                            <p>Đăng ký</p>
                        </div>
                        <div className={cx('input-group')}>
                            <input type="text" className={cx('input-field')} id="email" required />
                            <label htmlFor="email">Nhập email</label>
                        </div>
                        <div className={cx('input-group')}>
                            <input type="text" className={cx('input-field')} id="confirm-email" required />
                            <label htmlFor="confirm-email">Xác nhận lại email</label>
                        </div>

                        <ReCAPTCHA
                            sitekey="6LeF5AEqAAAAAJ6SwrkROCsXMWDxpn1Tt3HoGxHr"
                            // onChange={}
                        />

                        <div className={cx('input-group')} onClick={toggleQrVisibility}>
                            <button className={cx('input-submit')}>Xác nhận email </button>
                        </div>
                    </div>
                    <div className={cx('qr-section', { visible: qrVisible })}>
                        {/* Get code from mail 6 num */}
                        <div id="code-email" className={cx('inputs')}>
                            {/* Icon X */}
                            <FontAwesomeIcon className={cx('close-btn')} icon={faTimes} onClick={toggleQrVisibility} />
                            <h4 className={cx('title-code')}>Nhập code email</h4>
                            {[...Array(6)].map((_, index) => (
                                <input
                                    key={index}
                                    className={cx('input-code')}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    onInput={(e) => handleInput(e, index)}
                                    onKeyUp={(e) => handleKeyUp(e, index)}
                                />
                            ))}
                        </div>
                        <div className={cx('input-group')}>
                            <button className={cx('input-submit')} onClick={toggleinfoUserVisibility}>
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </form>

                {/* Popup info user form */}
                {infoUserVisible && (
                    <div className={cx('popup-overlay')}>
                        <form className={cx('form-info-user')}>
                            {/* Icon X */}
                            <FontAwesomeIcon
                                className={cx('close-btn')}
                                icon={faTimes}
                                onClick={toggleinfoUserVisibility}
                            />
                            {/* username */}
                            <div className={cx('input-group')}>
                                <input type="text" className={cx('input-field')} id="username" required />
                                <label htmlFor="username">Tên tài khoản</label>
                            </div>

                            {/* password */}
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
                            <div className={cx('input-group', 'password-group')}>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    className={cx('input-field')}
                                    id="confirm-password"
                                    required
                                />
                                <label htmlFor="confirm-password">Xác nhận mật khẩu</label>
                                <FontAwesomeIcon
                                    className={cx('show-hide-btn')}
                                    icon={passwordVisible ? faEyeSlash : faEye}
                                    onClick={togglePasswordVisibility}
                                />
                            </div>

                            <div className={cx('input-group')}>
                                <button className={cx('input-submit')}>Đăng ký</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Register
