import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import QRCode from 'qrcode.react'

// BE
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '~/hooks/useMutationHook'
import * as message from '../../components/Message/Message'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slices/userSlice'

import classNames from 'classnames/bind'
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [qrVisible, setQrVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const mutation = useMutationHooks((data) => UserService.loginUser(data))
    const { data, isSuccess, isError } = mutation

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    const toggleQrVisibility = () => {
        setQrVisible(!qrVisible)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setErrorMessage('')
        setIsSubmitting(true)

        try {
            await mutation.mutateAsync({
                username,
                password,
            })
        } catch (error) {
            setErrorMessage(error.message)
        }

        setIsSubmitting(false)

        if (!username || !password) {
            toast.warning('Vui lòng không bỏ trống.', {
                className: 'toast-notifications',
            })
            return
        }
        if (rememberMe) {
            localStorage.setItem('username', username)
            localStorage.setItem('password', password)
            localStorage.setItem('rememberMe', rememberMe.toString())
        } else {
            localStorage.removeItem('username')
            localStorage.removeItem('password')
            localStorage.removeItem('rememberMe')
        }
    }

    useEffect(() => {
        const rememberedUsername = localStorage.getItem('username')
        const rememberedPassword = localStorage.getItem('password')
        const rememberMeChecked = localStorage.getItem('rememberMe') === 'true'

        if (rememberedUsername && rememberedPassword && rememberMeChecked) {
            setUsername(rememberedUsername)
            setPassword(rememberedPassword)
            setRememberMe(true)
        }

        if (isSuccess) {
            message.success('Đăng nhập thành công!')
            navigate('/')
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token)
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token)
                }
            }
        } else if (isError) {
            message.error('Đăng nhập không thành công!')
        }
        setIsSubmitting(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isError])

    return (
        <header className={cx('wrapper')}>
            <Helmet>
                <title>Đăng nhập </title>
            </Helmet>
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
                            {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
                            <button className={cx('input-submit')} onClick={handleLogin}>
                                {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
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
            <ToastContainer />
        </header>
    )
}

export default Login
