import React from 'react'
import { NavLink } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './ForgotPassword.module.scss'

const cx = classNames.bind(styles)

function ForgotPassword() {
    return (
        <div className={cx('wrapper_reset_pass')}>
            <div className={cx('container-reset-pass')}>
                <form id="form" action="" method="post">
                    <h3>Lấy lại mật khẩu</h3>
                    <fieldset>
                        <label htmlFor="email">Địa chỉ email:</label>
                        <input type="email" name="email" id="email" required />
                    </fieldset>
                    <fieldset>
                        <button name="submit" type="submit" id="submit">
                            Xác nhận email
                        </button>
                    </fieldset>
                    <p className={cx('copyright')}>
                        <NavLink to="/login">
                            Đã có tài khoản? <span>đăng nhập ngay!</span>
                        </NavLink>
                        <NavLink to="/register">
                            Chưa có tải khoản? <span>đăng ký ngay!</span>
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
