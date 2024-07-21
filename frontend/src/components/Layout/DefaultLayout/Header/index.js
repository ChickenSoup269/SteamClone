import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCaretDown,
    faLanguage,
    faBasketShopping,
    faBell,
    faUser,
    faSignOut,
    faWallet,
    faDollarSign,
    faBoxArchive,
    faAngleRight,
    faKeyboard,
    faUserTie,
} from '@fortawesome/free-solid-svg-icons'

import Tippy from '@tippyjs/react/'
import 'tippy.js/dist/tippy.css'

import Button from '~/components/Button'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
import Menu from '~/components/Popper/Menu'
import Image from '~/components/Image/image'
import Search from '../../Search'
import { useSelector } from 'react-redux'

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage} />,
        title: (
            <>
                Tiếng Việt [BETA] &nbsp;&nbsp;
                <FontAwesomeIcon icon={faAngleRight} />
            </>
        ),
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Phím tắt',
    },
]

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Thông tin cá nhân',
        to: '/profile',
    },
    {
        icon: <FontAwesomeIcon icon={faUserTie} />,
        title: 'Quản lý cá nhân',
        to: '/admin',
    },
    {
        icon: <FontAwesomeIcon icon={faDollarSign} />,
        title: 'Nạp tiền',
        to: '/#',
    },
    {
        icon: <FontAwesomeIcon icon={faWallet} />,
        title: (
            <span>
                Ví: <span style={{ color: 'var(--steamPrice)' }}>1.000.000vnđ</span>
            </span>
        ),
        to: '/#',
    },
    {
        icon: <FontAwesomeIcon icon={faBoxArchive} />,
        title: 'Kho game',
        to: '/#',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Đăng xuất',
        to: '/#',
        line: true,
    },
]

function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    const user = useSelector((state) => state.user)

    const [userAvatar, setUserAvatar] = useState()

    // khi đăng nhập | set hình ảnh user
    useEffect(() => {
        if (user?.access_token) {
            setUserAvatar(user?.avatar)
        }
    }, [user?.access_token, user?.avatar])

    // điều chỉnh header theme
    const navLinkStyles = ({ isActive }) => {
        const textColorLight = isActive ? 'var(--activePrimary)' : isScrolled ? '#000000' : '#ffffff'
        const textColorDark = isActive ? 'var(--activePrimary)' : '#ffffff'
        const textColor = theme === 'light' ? textColorLight : textColorDark

        return {
            fontWeight: isActive ? '700' : '500',
            background: isActive ? 'var(--activeNavLink)' : 'none',
            color: textColor,
            transform: isActive ? ' scale(0.9)' : 'none',
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    // Handel logic
    const handleMenuChange = (menuItem) => {
        console.log(menuItem)
    }

    // theme light/dark
    const handleThemeChange = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
    }

    // cho color Icon đổi màu khi scroll
    const getIconColor = () => {
        if (theme === 'light') {
            return isScrolled ? '#000000' : '#ffffff'
        }
        return '#ffffff'
    }

    return (
        <header className={cx('wrapper', { scrolled: isScrolled })}>
            <div className={cx('inner')}>
                <div className={cx('navbar')}>
                    <ul>
                        <li>
                            <NavLink style={navLinkStyles} to="/">
                                Trang chủ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={navLinkStyles} to="/profile">
                                Trò chuyện
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={navLinkStyles} to="/search">
                                Thể loại
                            </NavLink>
                        </li>

                        <li>
                            <NavLink style={navLinkStyles} to="/admin">
                                Hỗ trợ
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <Search />

                <div className={cx('actions')}>
                    {user?.access_token ? (
                        <>
                            <NavLink to="/notification">
                                <Tippy content="Thông báo" placement="bottom">
                                    <button className={cx('notification-btn')} style={{ color: getIconColor() }}>
                                        <FontAwesomeIcon icon={faBell} />
                                        <span className={cx('badge')}>3</span>
                                    </button>
                                </Tippy>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">
                                <Button outline className={cx('change-btn-color')}>
                                    Đăng Nhập
                                </Button>
                            </NavLink>
                            <NavLink to="/register">
                                <Button primary>Đăng Ký</Button>
                            </NavLink>
                        </>
                    )}
                    <NavLink to="/cart">
                        <Tippy content="Giỏ hàng" placement="bottom">
                            <button className={cx('cart-btn')} style={{ color: getIconColor() }}>
                                <FontAwesomeIcon icon={faBasketShopping} />
                                <span className={cx('badge')}>3</span>
                            </button>
                        </Tippy>
                    </NavLink>
                    <Tippy content="Màu giao diện">
                        <input
                            className={cx('switch')}
                            type="checkbox"
                            checked={theme === 'light'}
                            onChange={handleThemeChange}
                        />
                    </Tippy>
                    <Menu items={user?.access_token ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {({ isAnimating }) =>
                            user?.access_token ? (
                                <Tippy content="Tài khoản" placement="bottom">
                                    <div>
                                        <Image src={userAvatar} className={cx('user-avatar')} alt="Tran Phuoc Thien" />
                                    </div>
                                </Tippy>
                            ) : (
                                <Tippy content="Tiện ích">
                                    <button
                                        className={cx('more-btn', { 'is-animating': isAnimating })}
                                        style={{ color: getIconColor() }}
                                    >
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </button>
                                </Tippy>
                            )
                        }
                    </Menu>
                </div>
            </div>
        </header>
    )
}

export default Header
