import classNames from 'classnames/bind'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('full-gameImg')}>
                <div className={cx('game-text')}>
                    <h1>Tên game</h1>
                    <p>Mô tả ngắn gọn về gamme</p>
                    <button className={cx('btn-details-game')}>Xem chi tiết game</button>
                </div>
            </div>
        </header>
    )
}

export default Home
