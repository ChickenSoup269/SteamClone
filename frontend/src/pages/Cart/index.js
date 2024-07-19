import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Helmet } from 'react-helmet'
import { faApple, faLinux, faWindows } from '@fortawesome/free-brands-svg-icons'
import Tippy from '@tippyjs/react'
import Modal from 'react-modal'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
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
        },
    ]
    const games = [
        {
            id: 1,
            image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/header.jpg?t=1717592174',
            title: 'Dying light 2',
            price: '880.000₫',
            platforms: [faWindows, faApple, faLinux],
        },
        {
            id: 2,
            image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg?t=1685562483',
            title: 'Cyberpunk 2077',
            price: '900.000₫',
            platforms: [faWindows],
        },
        {
            id: 3,
            image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg?t=1685562483',
            title: 'Cyberpunk 2077',
            price: '900.000₫',
            platforms: [faWindows],
        },
    ]

    const [gameSelections, setGameSelections] = useState({})
    const [selectedGames, setSelectedGames] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [quantities, setQuantities] = useState(
        games.reduce((acc, game) => {
            acc[game.id] = 1
            return acc
        }, {}),
    )

    const handleEditionChange = (gameId, e) => {
        const selectedEditionIndex = e.target.value
        setGameSelections({
            ...gameSelections,
            [gameId]: selectedEditionIndex,
        })
    }

    const handleSelectAll = () => {
        if (selectedGames.length === games.length) {
            setSelectedGames([])
        } else {
            setSelectedGames(games.map((game) => game.id))
        }
    }

    const handleCheckboxChange = (gameId) => {
        if (selectedGames.includes(gameId)) {
            setSelectedGames(selectedGames.filter((id) => id !== gameId))
        } else {
            setSelectedGames([...selectedGames, gameId])
        }
    }

    // Tính tổng và lấy đơn vị vnđ
    const calculateTotalPrice = () => {
        const selectedGameObjects = games.filter((game) => selectedGames.includes(game.id))
        const totalPrice = selectedGameObjects.reduce((sum, game) => {
            const price = parseFloat(game.price.replace('₫', '').replace(/\./g, ''))
            return sum + price * quantities[game.id]
        }, 0)
        return totalPrice.toLocaleString('vi-VN') + '₫'
    }

    const handleQuantityChange = (gameId, newQuantity) => {
        setQuantities({
            ...quantities,
            [gameId]: newQuantity,
        })
    }

    const decrement = (gameId) => {
        if (quantities[gameId] > 1) {
            handleQuantityChange(gameId, quantities[gameId] - 1)
        }
    }

    const increment = (gameId) => {
        if (quantities[gameId] < 10) {
            handleQuantityChange(gameId, quantities[gameId] + 1)
        } else {
            toast.error(`Đây là số lượng tói đa bạn có thể mua!`, {
                className: 'toast-notifications',
            })
        }
    }

    // Kiểm tra đanng thêm game nào
    const addSuccess = (gameId, action) => {
        if (action === '1') {
            toast.success(`Đã thêm vào danh sách ước game ID: ${gameId}!`, {
                className: 'toast-notifications',
            })
        } else if (action === '2') {
            toast.success(`Đã xóa sản phẩm game ID: ${gameId}!`, {
                className: 'toast-notifications',
            })
        } else {
            toast.error(`Có lỗi xảy ra`, {
                className: 'toast-notifications',
            })
        }
        console.log(`Game ID: ${gameId}, Action: ${action === '1' ? 'Added to Wishlist' : 'Removed'}`)
    }

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    return (
        <div className={cx('wrapper_cart')}>
            <Helmet>
                <title>Giỏ hàng - SteamClone</title>
            </Helmet>
            <ToastContainer />
            <div className={cx('container_cart')}>
                {/* Top  */}
                <div className={cx('content_cart_link_title')}>
                    <p>
                        <NavLink to="/">Trang chủ </NavLink> <FontAwesomeIcon icon={faArrowRight} /> Giỏ hàng của bạn
                    </p>
                    <h2>Giỏ hàng của bạn</h2>
                    <div className={cx('select_all')}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedGames.length === games.length}
                                onChange={handleSelectAll}
                            />{' '}
                            Chọn tất cả
                        </label>
                    </div>
                </div>

                <div className={cx('container_cart_game_pay')}>
                    {/* Column left - Game information */}
                    <div className={cx('content_games')}>
                        {games.map((game) => (
                            <div className={cx('content_game_cart')} key={game.id}>
                                <div className={cx('check_select')}>
                                    <label className={cx('checkbox_for_game')}>
                                        <input
                                            type="checkbox"
                                            className={cx('checkbox_game')}
                                            checked={selectedGames.includes(game.id)}
                                            onChange={() => handleCheckboxChange(game.id)}
                                        />
                                        <div className={cx('checkbox__checkmark')}></div>
                                    </label>
                                </div>

                                <div className={cx('image_game')}>
                                    <img src={game.image} alt="" />
                                </div>

                                <div className={cx('title_game_cart')}>
                                    {game.title}
                                    <div className={cx('icon_for_system')}>
                                        {game.platforms.map((platform, index) => (
                                            <FontAwesomeIcon
                                                key={index}
                                                icon={platform}
                                                className={cx('icon_system')}
                                            />
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
                                        <span
                                            onClick={() => decrement(game.id)}
                                            className={cx('input-number-decrement')}
                                        >
                                            –
                                        </span>
                                        <Tippy content="Số lượng">
                                            <input
                                                className={cx('input-number')}
                                                type="number"
                                                value={quantities[game.id]}
                                                onChange={(e) => handleQuantityChange(game.id, Number(e.target.value))}
                                                min={1}
                                                max={10}
                                            />
                                        </Tippy>
                                        <span
                                            onClick={() => increment(game.id)}
                                            className={cx('input-number-increment')}
                                        >
                                            +
                                        </span>
                                    </div>
                                    <div className={cx('button_add_delete')}>
                                        <Tippy content="Thêm vào danh sách ước">
                                            <button value="1" onClick={() => addSuccess(game.id, '1')}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </button>
                                        </Tippy>
                                        <Tippy content="Gỡ bỏ">
                                            <button value="2" onClick={() => addSuccess(game.id, '2')}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </Tippy>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Column right - contains total amount and number of games */}
                    <div className={cx('content_money_pay')}>
                        <div className={cx('total_pay')}>
                            <h4 className={cx('title_money')}>Tổng ước tính: </h4>
                            <p className={cx('total_money_pay')}>{calculateTotalPrice()}</p>
                        </div>
                        <p className={cx('tax_text_cart')}>
                            Thuế tiêu thụ sẽ được tính trong quá trình thanh toán nếu có
                        </p>
                        <div className={cx('button_pay_game')}>
                            <button onClick={openModal}>Tiếp tục đến bước thanh toán</button>
                        </div>
                    </div>
                </div>

                {/* Modal for Payment Options */}
                <Modal
                    isOpen={isModalOpen}
                    className={cx('popup_payment')}
                    overlayClassName={cx('overlay')}
                    onRequestClose={closeModal}
                    contentLabel="Chọn phương thức thanh toán"
                >
                    <h2>Chọn phương thức thanh toán</h2>
                    <div className={cx('payment-options')}>
                        <button className={cx('payment-option')}>Ví tiền của tôi</button>
                        <button className={cx('payment-option')}>Thẻ Visa</button>
                        <button className={cx('payment-option')}>Mã QR</button>
                    </div>
                    <button onClick={closeModal} className={cx('close-modal')}>
                        Đóng
                    </button>
                </Modal>
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
