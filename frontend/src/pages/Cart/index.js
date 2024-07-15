import classNames from 'classnames/bind'
import styles from './Cart.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function Cart() {
    return (
        <div className={cx('wrapper_cart')}>
            <div className={cx('container_cart')}>
                {/* colunm left - chứa ảnh thông tin game */}
                <div classNames={cx('content_game_cart')}>
                    <div className={cx('check_select')}></div>
                    <div className={cx('image_game')}>
                        <img src="" alt="" />
                    </div>
                    <div className={cx('title_game_cart')}>Game hay mua liền tay</div>
                    <div className={cx('price')}>880.000.00vndd</div>
                    <div className={cx('button_add_delete_cart')}>
                        <button>
                            Thêm
                            <FontAwesomeIcon icon={faAdd} />
                        </button>
                        <button>
                            Gỡ bỏ
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>

                {/* column right - chứa tổng số tiền và số game */}
                <div className={cx('content_money_pay')}>
                    <div className={cx('')}></div>
                </div>
            </div>
        </div>
    )
}

export default Cart
