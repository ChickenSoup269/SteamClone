import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye, faTimes } from '@fortawesome/free-solid-svg-icons'
import ReCAPTCHA from 'react-google-recaptcha'
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import classNames from 'classnames/bind'
import styles from './Register.module.scss'

// BE
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '~/hooks/useMutationHook'
import * as messageRegister from '../../components/Message/Message'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [infoUserVisible, setinfoUserVisible] = useState(false)
    const [codeEmailVisible, setCodeEmailVisible] = useState(false)

    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [verificationCodes, setVerificationCodes] = useState({})
    const [generatedCode, setGeneratedCode] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const message = useState()
    const [captchaVerified, setCaptchaVerified] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [userEnteredCode, setUserEnteredCode] = useState('')

    const navigate = useNavigate()
    const inputRefs = useRef([])

    const mutation = useMutationHooks((data) => UserService.signupUser(data))
    // eslint-disable-next-line no-unused-vars
    const { data, isSuccess, isError } = mutation

    const handleNavigateLogin = () => {
        navigate('/login')
    }

    useEffect(() => {
        if (isSuccess) {
            messageRegister.success('Đăng ký thành công!')
            handleNavigateLogin()
        } else if (isError) {
            messageRegister.error('Đăng ký thất bại')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [[isSuccess, isError]])

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }
    const toggleinfoUserVisibility = () => {
        setinfoUserVisible(!infoUserVisible)
    }
    const toggleQrVisibility = () => {
        setCodeEmailVisible(!codeEmailVisible)
    }

    const handleInput = (e, index) => {
        const target = e.target
        let val = target.value

        // Validate input: allow only alphanumeric characters
        if (!/^[A-Za-z0-9]$/.test(val)) {
            target.value = ''
            return
        }

        setUserEnteredCode((prev) => {
            const codeArray = [...prev]
            codeArray[index] = val
            return codeArray.join('')
        })

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
            setUserEnteredCode((prev) => {
                const codeArray = [...prev]
                codeArray[index] = ''
                return codeArray.join('')
            })

            const prev = inputRefs.current[index - 1]
            if (prev) {
                prev.focus()
            }
        }
    }

    const generateCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase()
    }

    const sendEmail = (e) => {
        e.preventDefault()
        if (isSubmitting || emailSent) return

        if (!captchaVerified) {
            toast.warning('Vui lòng xác nhận google CAPTCHA.', {
                className: 'toast-notifications ',
            })
            return
        }
        if (email !== confirmEmail) {
            toast.warning('Email không khớp.', {
                className: 'toast-notifications ',
            })
            return
        }

        setIsSubmitting(true)

        const code = generateCode()
        setGeneratedCode(code)
        const updatedVerificationCodes = { ...verificationCodes, [email]: code }
        setVerificationCodes(updatedVerificationCodes)

        const templateParams = {
            to_email: email,
            code: code,
            message: message,
        }

        emailjs
            .send('service_f6bh43steamClone', 'template_raisw6u', templateParams, 'erYbq0WRLJU4cn7wW')
            .then((response) => {
                console.log('Email sent successfully!', response.status, response.text)
                setEmailSent(true)
                toggleQrVisibility()
            })
            .catch((error) => {
                console.error('Failed to send email:', error)
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    }

    const onCaptchaChange = (value) => {
        setCaptchaVerified(!!value)
    }

    const verifyCode = () => {
        if (userEnteredCode === generatedCode) {
            toast.success('Xác thực email thành công!', {
                className: 'toast-notifications ',
            })
            toggleinfoUserVisibility()
        } else {
            toast.error('Code email không chính xác.', {
                className: 'toast-notifications ',
            })
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Mật khẩu không khớp.', {
                className: 'toast-notifications',
            })
            return
        }
        try {
            await mutation.mutateAsync({
                email,
                username,
                password,
                confirmPassword,
            })
        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    return (
        <header className={cx('wrapper')}>
            <div className={cx('full-background')}>
                <div className={cx('container-register')}>
                    <form className={cx('register-box')} onSubmit={sendEmail}>
                        <div className={cx('header-text')}>
                            <p>Đăng ký</p>
                        </div>
                        <div className={cx('input-group')}>
                            <input
                                type="email"
                                className={cx('input-field')}
                                id="email"
                                required
                                value={email}
                                disabled={emailSent}
                                style={{ cursor: isSubmitting || emailSent ? 'not-allowed' : 'text' }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email">Nhập email</label>
                        </div>
                        <div className={cx('input-group')}>
                            <input
                                type="email"
                                className={cx('input-field')}
                                id="confirm-email"
                                value={confirmEmail}
                                disabled={emailSent}
                                style={{ cursor: isSubmitting || emailSent ? 'not-allowed' : 'text' }}
                                onChange={(e) => setConfirmEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="confirm-email">Xác nhận lại email</label>
                        </div>

                        <ReCAPTCHA sitekey="6LeF5AEqAAAAAJ6SwrkROCsXMWDxpn1Tt3HoGxHr" onChange={onCaptchaChange} />

                        <div className={cx('input-group')}>
                            <button
                                className={cx('input-submit')}
                                type="submit"
                                disabled={isSubmitting || emailSent}
                                style={{ cursor: isSubmitting || emailSent ? 'not-allowed' : 'pointer' }}
                            >
                                {isSubmitting ? 'Đang xử lý...' : 'Xác nhận email'}
                            </button>
                        </div>
                    </form>
                    <ToastContainer />
                    <div className={cx('qr-section', { visible: codeEmailVisible })}>
                        <div id="code-email" className={cx('inputs')}>
                            <FontAwesomeIcon className={cx('close-btn')} icon={faTimes} onClick={toggleQrVisibility} />
                            <h4 className={cx('title-code')}>Nhập code email</h4>
                            {[...Array(6)].map((_, index) => (
                                <input
                                    key={index}
                                    className={cx('input-code')}
                                    type="text"
                                    maxLength="1"
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    onInput={(e) => handleInput(e, index)}
                                    onKeyUp={(e) => handleKeyUp(e, index)}
                                />
                            ))}
                        </div>
                        <div className={cx('input-group')}>
                            <button className={cx('input-submit')} onClick={verifyCode}>
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>

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
                                <input
                                    type="text"
                                    className={cx('input-field')}
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <label htmlFor="username">Tên tài khoản</label>
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
                            <div className={cx('input-group', 'password-group')}>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    className={cx('input-field')}
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                                {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
                                <button className={cx('input-submit')} onClick={handleRegister}>
                                    Đăng ký
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Register
