import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSpinner,
    faSearch,
    faXmark,
    faCaretDown,
    faShoppingCart,
    faLanguage,
    faCircleHalfStroke,
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
        color: isActive ? 'var(--primary)' : 'var(--steamBackground)',
    }
}

function Header() {
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([])
        }, 0)
    }, [])

    return (
        <header className={cx('wrapper')}>
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
                                Trợ giúp
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
                        <input placeholder="Nhập tên game" spellCheck={false} />
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
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </button>
                    </NavLink>

                    <NavLink to="/l">
                        <Button outline>Đăng Nhập</Button>
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
