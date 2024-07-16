import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Helmet } from 'react-helmet'

import classNames from 'classnames/bind'
import styles from './Cart.module.scss'

const cx = classNames.bind(styles)

function Cart() {
    const dataChose = [
        {
            selectBuy: {
                0: 'Cho tài khoản của tôi',
                1: 'Đây là một món quà',
            },
            buttonBuyFrom: {
                0: 'Tiếp tục đến bước thanh toán',
                1: 'Tiếp tục với tùy chọn quà tặng',
            },
        },
    ]

    const [currentSelectIndex, setCurrentSelectIndex] = useState(0)

    const handleEditionChange = (e) => {
        const selectedEditionIndex = e.target.value
        setCurrentSelectIndex(selectedEditionIndex)
    }

    return (
        <div className={cx('wrapper_cart')}>
            <Helmet>
                <title>Giỏ hàng - SteamClone</title>
            </Helmet>
            <div className={cx('container_cart')}>
                {/* Top  */}
                <div className={cx('content_cart_link_title')}>
                    <p>
                        <NavLink to="/">Trang chủ </NavLink> <FontAwesomeIcon icon={faArrowRight} /> Giỏ hàng của bạn
                    </p>
                    <h2>Giỏ hàng của bạn</h2>
                </div>

                {/* colunm left - chứa ảnh thông tin game */}
                <div className={cx('content_game_cart')}>
                    <div className={cx('check_select')}>
                        <label class="container">
                            <input type="checkbox" />
                        </label>
                    </div>
                    <div className={cx('image_game')}>
                        <img
                            src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/header.jpg?t=1717592174"
                            alt=""
                        />
                    </div>

                    <div className={cx('title_game_cart')}>Game hay mua liền tay</div>
                    <div className={cx('price')}>880.000.00vnd</div>
                    <div className={cx('content_button_select')}>
                        <select name="" id="" onChange={handleEditionChange} value={currentSelectIndex}>
                            {Object.keys(dataChose[0].selectBuy).map((index) => (
                                <option key={index} value={index}>
                                    {dataChose[0].selectBuy[index]}
                                </option>
                            ))}
                        </select>
                        <div className={cx('number_game')}>
                            <span class="input-number-decrement">–</span>
                            <input class="input-number" type="number" />
                            <span class="input-number-increment">+</span>
                        </div>
                        <div className={cx('button_add_delete')}>
                            <button>
                                Thêm vào danh sách ước
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <button>
                                Gỡ bỏ
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* column right - chứa tổng số tiền và số game */}
                <div className={cx('content_money_pay')}>
                    <div className={cx('total_pay')}>
                        <h4 className={cx('title_money')}>Tổng ước tính: </h4>
                        <p className={cx('total_money_pay')}>880.000.00vnđ</p>
                    </div>
                    <p>Thuế tiêu thụ sẽ được tính trong quá trình thanh toán nếu có</p>
                    <div className={cx('button_pay_game')}>
                        <button>{dataChose[0].buttonBuyFrom[currentSelectIndex]}</button>
                    </div>
                </div>
                <div className={cx('button_bottom_cart_pay')}>
                    <button>Tiếp tục mua sắm</button>
                    <p>Gỡ bỏ tất cả sản phẩm</p>
                </div>
            </div>
        </div>
    )
}

export default Cart
