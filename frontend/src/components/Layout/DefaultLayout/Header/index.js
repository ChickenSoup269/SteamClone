import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSpinner,
    faSearch,
    faXmark,
    faCaretDown,
    faLanguage,
    faCircleHalfStroke,
    faBasketShopping,
} from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'

import Button from '~/components/Button'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
import GameItem from '~/components/GameItem'
import Menu from '~/components/Popper/Menu'

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage} />,
        title: 'Tiếng Việt',
    },
    {
        icon: <FontAwesomeIcon icon={faCircleHalfStroke} />,
        title: 'Giao diện: {Tối}',
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
    const [searchResult, setSearchResult] = useState([])
    const [isScrolled, setIsScrolled] = useState(false)

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
        setTimeout(() => {
            setSearchResult([])
        }, 0)
    }, [])

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
                                Game giảm giá
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={navLinkStyles} to="/admin">
                                Hỗ trợ
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <Tippy
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <GameItem />
                                <GameItem />
                                <GameItem />
                                <GameItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm" spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </Tippy>
                <div className={cx('actions')}>
                    <NavLink to="/cart">
                        <button className={cx('cart-btn')}>
                            <FontAwesomeIcon icon={faBasketShopping} />
                        </button>
                    </NavLink>

                    <NavLink to="/login">
                        <Button outline className={cx('change-btn-color')}>
                            Đăng Nhập
                        </Button>
                    </NavLink>
                    <NavLink to="/register">
                        <Button primary>Đăng Ký</Button>
                    </NavLink>

                    <Menu items={MENU_ITEMS}>
                        {({ isAnimating }) => (
                            <button className={cx('more-btn', { 'is-animating': isAnimating })}>
                                <FontAwesomeIcon icon={faCaretDown} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    )
}

export default Header
