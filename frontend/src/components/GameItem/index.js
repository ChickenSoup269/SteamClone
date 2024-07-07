// import { faBars, faSheetPlastic } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './GameItem.modules.scss'

const cx = classNames.bind(styles)

function GameItem() {
    // const isOwned = false
    // const isInCart = false
    return (
        <div className={cx('wrapper')}>
            <div className={cx('search_box_game')}>
                <img
                    className={cx('gameimages')}
                    src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/capsule_231x87.jpg?t=1716536507"
                    alt="Têngame"
                />
                {/* Check xem user đã mua game chưa */}
                {/* {isOwned && (
                <div className={cx('library')}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            )} */}
                {/* Check xem user đã thêm game vào giỏ hàng chưa */}
                {/* {isInCart && (
                <div className={cx('wishlist')}>
                    <FontAwesomeIcon icon={faSheetPlastic} />
                </div>
            )} */}
                <div className={cx('info')}>
                    <h4 className={cx('game-name')}>Total war</h4>
                    <p className={cx('price')}>100.00đ</p>
                </div>
                <div className={cx('user-defined-tags')}>
                    <img className={cx('')} src="" alt="" />
                    <p className={cx('name')}></p>
                </div>
            </div>
        </div>
    )
}

export default GameItem
