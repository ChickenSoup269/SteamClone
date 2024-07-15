// import { faBars, faSheetPlastic } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './GameItem.modules.scss'
import formatCurrency from '../utilityFunction/formatCurrency'

const cx = classNames.bind(styles)

function GameItem({ data }) {
    // const isOwned = false
    // const isInCart = false
    const newPrice = data.option?.[0]?.priceDiscounted || 0

    const PriceVND = formatCurrency(newPrice)

    return (
        <div className={cx('wrapper_search_box')}>
            <div className={cx('search_box_game')}>
                <img className={cx('gameimages')} src={data.header_image} alt="Têngame" />
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
                    <h4 className={cx('game-name')}>{data.game_name}</h4>
                    <p className={cx('price_search')}>Giá: {PriceVND}</p>
                    <p className={cx('sale_search')}> 50%</p>
                </div>
                {/* <div className={cx('user-defined-tags')}>
                    <img className={cx('')} src="" alt="" />
                    <p className={cx('name')}></p>
                </div> */}
            </div>
        </div>
    )
}

export default GameItem
