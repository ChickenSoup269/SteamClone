import classNames from 'classnames/bind'
import styles from './GameDetails.scss'

const cx = classNames.bind(styles)

function GameDetails() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('game_background_img')}></div>
        </header>
    )
}

export default GameDetails
