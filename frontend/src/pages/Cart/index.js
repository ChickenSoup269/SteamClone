import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Helmet } from 'react-helmet'

import classNames from 'classnames/bind'
import styles from './Cart.module.scss'
import Tippy from '@tippyjs/react'
import { faApple, faLinux, faWindows } from '@fortawesome/free-brands-svg-icons'

const cx = classNames.bind(styles)

function Cart() {
    const dataChose = [
        {
            selectBuy: {
                0: 'Cho tài khoản của tôi',
                1: 'Đây là một món quà',
            },
        },
    ]
    const games = [
        {
            id: 1,
            image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/header.jpg?t=1717592174',
            title: 'Dying light 2',
            price: '880.000.00đ',
            platforms: [faWindows, faApple, faLinux],
        },
        {
            id: 2,
            image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg?t=1685562483',
            title: 'Cyberpunk 2077',
            price: '900.000đ',
            platforms: [faWindows],
            // discount: '-50%',
        },
    ]

    const [gameSelections, setGameSelections] = useState({})

    const handleEditionChange = (gameId, e) => {
        const selectedEditionIndex = e.target.value
        setGameSelections({
            ...gameSelections,
            [gameId]: selectedEditionIndex,
        })
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

                <div className={cx('container_cart_game_pay')}>
                    {/* Column left - Game information */}
                    <div className={cx('content_games')}>
                        {games.map((game) => (
                            <div className={cx('content_game_cart')} key={game.id}>
                                <div className={cx('check_select')}>
                                    <label>
                                        <input type="checkbox" className={cx('checkbox_game')} />
                                    </label>
                                </div>
                                <div className={cx('image_game')}>
                                    <img src={game.image} alt="" />
                                </div>

                                <div className={cx('title_game_cart')}>
                                    {game.title}
                                    <div className={cx('icon_for_system')}>
                                        {game.platforms.map((platform, index) => (
                                            <FontAwesomeIcon key={index} icon={platform} />
                                        ))}
                                    </div>
                                </div>

                                <div className={cx('price')}>{game.price}</div>
                                <div className={cx('content_button_select')}>
                                    <Tippy content="Tặng/Mua game" placement="bottom">
                                        <select
                                            name=""
                                            id=""
                                            onChange={(e) => handleEditionChange(game.id, e)}
                                            value={gameSelections[game.id] || '0'}
                                        >
                                            {Object.keys(dataChose[0].selectBuy).map((index) => (
                                                <option key={index} value={index}>
                                                    {dataChose[0].selectBuy[index]}
                                                </option>
                                            ))}
                                        </select>
                                    </Tippy>
                                    <div className={cx('number_game')}>
                                        <span className={cx('input-number-decrement')}>–</span>
                                        <Tippy content="Số lượng">
                                            <input
                                                className={cx('input-number')}
                                                type="number"
                                                value="1"
                                                min="0"
                                                max="10"
                                            />
                                        </Tippy>
                                        <span className={cx('input-number-increment')}>+</span>
                                    </div>
                                    <div className={cx('button_add_delete')}>
                                        <Tippy content="Thêm vào danh sách ước">
                                            <button>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </button>
                                        </Tippy>
                                        <Tippy content="Gỡ bỏ">
                                            <button>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </Tippy>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Column right - chứa tổng số tiền và số game */}
                    <div className={cx('content_money_pay')}>
                        <div className={cx('total_pay')}>
                            <h4 className={cx('title_money')}>Tổng ước tính: </h4>
                            <p className={cx('total_money_pay')}>880.000.00vnđ</p>
                        </div>
                        <p>Thuế tiêu thụ sẽ được tính trong quá trình thanh toán nếu có</p>
                        <div className={cx('button_pay_game')}>
                            <button>Tiếp tục đến bước thanh toán</button>
                        </div>
                    </div>
                </div>

                <div className={cx('button_bottom_cart_pay')}>
                    <NavLink to={'/'}>
                        <button>Tiếp tục mua sắm</button>
                    </NavLink>
                    <p>Gỡ bỏ tất cả sản phẩm</p>
                </div>
            </div>
        </div>
    )
}

export default Cart
