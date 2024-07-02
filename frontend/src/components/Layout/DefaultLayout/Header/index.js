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
} from '@fortawesome/free-solid-svg-icons'

import Tippy from '@tippyjs/react/'
import 'tippy.js/dist/tippy.css'

import Button from '~/components/Button'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
import Menu from '~/components/Popper/Menu'
import Image from '~/components/Image'
import Search from '../../Search'

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

const usserMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Thông tin cá nhân',
        to: '/profile',
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

const navLinkStyles = ({ isActive }) => {
    return {
        fontWeight: isActive ? '700' : '500',
        background: isActive ? 'var(--steamColorWhite)' : 'none',
        color: isActive ? 'var(--primary)' : 'var(--steamColorWhite)',
        transform: isActive ? ' scale(0.9)' : 'none',
    }
}

function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    // khi đăng nhập
    const currentUser = false

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

    // Handel logic
    const handleMenuChange = (menuItem) => {
        console.log(menuItem)
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
                            <NavLink style={navLinkStyles} to="/gameDetails">
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
                    {currentUser ? (
                        <>
                            <NavLink to="/cart">
                                <Tippy content="Thông báo" placement="bottom">
                                    <button className={cx('notification-btn')}>
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
                            <button className={cx('cart-btn')}>
                                <FontAwesomeIcon icon={faBasketShopping} />
                                <span className={cx('badge')}>3</span>
                            </button>
                        </Tippy>
                    </NavLink>
                    <Tippy content="Màu giao diện">
                        <input className={cx('switch')} type="checkbox" data-theme-toggle />
                    </Tippy>
                    <Menu items={currentUser ? usserMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {({ isAnimating }) =>
                            currentUser ? (
                                <Tippy content="Tài khoản" placement="bottom">
                                    <Image src="" className={cx('user-avatar')} alt="Tran Phuoc Thien" />
                                </Tippy>
                            ) : (
                                <button className={cx('more-btn', { 'is-animating': isAnimating })}>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </button>
                            )
                        }
                    </Menu>
                </div>
            </div>
        </header>
    )
}

export default Header
