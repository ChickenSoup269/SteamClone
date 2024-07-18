import classNames from 'classnames/bind'
import styles from './GameType.module.scss'

const cx = classNames.bind(styles)

// gameType/name?
function GameType() {
    return (
        <div className={cx('wrapper_gametype_search')}>
            <h1>Đây là trang gametype</h1>
        </div>
    )
}

export default GameType
