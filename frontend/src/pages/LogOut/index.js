import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './LogOut.module.scss'
import { logoutUser } from '../../services/UserService' // Ensure the path is correct

const cx = classNames.bind(styles)

function LogOut() {
    const navigate = useNavigate()

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await logoutUser()
            } catch (error) {
                console.error('Failed to log out:', error)
                // Handle the error appropriately here, e.g., display a message to the user
            }
        }

        handleLogout()
    }, [navigate])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('log-out-form')}>
                <div className={cx('loading')}>
                    <div className={cx('arc')}></div>
                    <h1>
                        <span>ĐANG XỬ LÝ</span>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default LogOut
