import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons'

import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
import { deprecations } from 'sass'

const cx = classNames.bind(styles)

const navLinkStyles = ({ isActive }) => {
    return {
        fontWeight: isActive ? 'blod' : 'normal',
        color: isActive ? 'var(--primary)' : 'var(--steamBackground)',
    }
}

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div classNames={cx('navbar')}>
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
                <div className={cx('search')}>
                    <input placeholder="Nhập tên game" spellCheck={false} />
                    <button classNames={cx('clear')}>
                        <FontAwesomeIcon icon={faX} />
                    </button>
                    <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <div className={cx('actions')}></div>
            </div>
        </header>
    )
}

export default Header
