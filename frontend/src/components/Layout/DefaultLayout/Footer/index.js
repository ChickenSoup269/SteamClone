import classNames from 'classnames/bind'
import styles from './Footer.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSteam } from '@fortawesome/free-brands-svg-icons'

const cx = classNames.bind(styles)

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('footer-bottom')}>
                <p>
                    copyright &copy; | <a href="https://github.com/ChickenSoup269/SteamClone">SteamClone</a>{' '}
                </p>
                <h1>
                    SteamClone <FontAwesomeIcon icon={faSteam} />
                </h1>
                <p className={cx('footer-to-header')}>
                    Hết trang rồi | <span onClick={scrollToTop}>đến đầu trang</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer
