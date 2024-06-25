import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import classNames from 'classnames/bind'
import styles from './Register.module.scss'

const cx = classNames.bind(styles)

function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('full-background')}>
                <div className={cx('container-register')}>
                    <div className={cx('register-box')}>
                        <div className={cx('header-text')}>
                            <p>Đăng ký</p>
                        </div>
                        <div className={cx('input-group')}>
                            <input type="text" className={cx('input-field')} id="username" required />
                            <label htmlFor="username">Nhập email</label>
                        </div>
                        <div className={cx('input-group')}>
                            <input type="text" className={cx('input-field')} id="username" required />
                            <label htmlFor="username">Xác nhận lại email</label>
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
                        <div className={cx('input-group')}>
                            <button className={cx('input-submit')}>Đăng Ký </button>
                        </div>
                    </div>
                </div>
                ,
            </div>
        </header>
    )
}

export default Register
