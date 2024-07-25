import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faHeart, faTrash, faX } from '@fortawesome/free-solid-svg-icons'
import { Helmet } from 'react-helmet'
import { faApple, faLinux, faWindows } from '@fortawesome/free-brands-svg-icons'
import Tippy from '@tippyjs/react'
import Modal from 'react-modal'

import QRCode from 'qrcode.react'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import classNames from 'classnames/bind'
import styles from './Cart.module.scss'
import { useSelector } from 'react-redux'
import { useMutationHooks } from '~/hooks/useMutationHook'
import * as OrderService from "../../services/OrderService";
import { message } from 'antd'

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
    const [paymentMethod, setPaymentMethod] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [cardHolderName, setCardHolderName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [cvv, setCvv] = useState('')
    const [walletId, setWalletId] = useState('')
    const [pin, setPin] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [validFields, setValidFields] = useState({})

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

    //  kiểm tra đang chọn loại thanh toán nào || sau này ch điều kiện xử lý thẻ ngan hàng và liên kết thanh toán
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method)
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

    const openModal = () => {
        if (selectedGames.length > 0) {
            setIsModalOpen(true)
        } else {
            toast.error('Vui lòng chọn ít nhất một game để tiếp tục thanh toán.', {
                className: 'toast-notifications',
            })
        }
    }
    const closeModal = () => setIsModalOpen(false)

    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);
    console.log('order', order)

    const mutationAddOrder = useMutationHooks((data) => {
        const { token, ...rests } = data;
        const res = OrderService.createOrder(token, { ...rests });
        return res;
      });

    const handlePayMent = () => {
        let isValid = true
        let errorMsg = ''

        if (paymentMethod === 'visa') {
            if (!cardHolderName || !cardNumber || !expiryDate || !cvv) {
                isValid = false
                errorMsg = 'Vui lòng điền đầy đủ thông tin thẻ.'
            }
        } else if (paymentMethod === 'wallet') {
            if (!walletId || !pin) {
                isValid = false
                errorMsg = 'Vui lòng điền đầy đủ thông tin ví.'
            }
        } else if (paymentMethod === 'paypal') {
            isValid = false
            errorMsg = 'Hệ thống chưa tích hợp thanh toán qua PayPal.'
        }

        if (isValid) {
            setIsSubmitting(true)
            // Thực hiện thanh toán
            mutationAddOrder.mutate(
                {
                  token: user?.access_token,
                  orderItems: order?.orderItems,
                  paymentMethod: paymentMethod,
                  user: user?.id,
                },
                {
                  onSuccess: () => {
                    message.success("Đặt hàng thành công");
                    // setIsLoadingAddOrder(false);
                  },
                  onError: () => {
                    message.error("Đặt hàng không thành công");
                    // setIsLoadingAddOrder(false);
                  },
                }
              );
        } else {
            setErrorMessage(errorMsg)
        }
    }

    const validateField = (field, value) => {
        let isValid = false
        switch (field) {
            case 'cardHolderName':
                isValid = value.trim().length > 0
                break
            case 'cardNumber':
                isValid = /^[0-9]{16}$/.test(value)
                break
            case 'expiryDate':
                isValid = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value)
                break
            case 'cvv':
                isValid = /^[0-9]{3,4}$/.test(value)
                break
            case 'walletId':
                isValid = value.trim().length > 0
                break
            case 'pin':
                isValid = /^[0-9]{4,6}$/.test(value)
                break
            default:
                break
        }
        setValidFields({ ...validFields, [field]: isValid })
    }

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
                    ariaHideApp={false}
                    contentLabel="Chọn phương thức thanh toán"
                >
                    <button onClick={closeModal} className={cx('close-modal')}>
                        Đóng <FontAwesomeIcon icon={faX} />
                    </button>
                    <div className={cx('modal')}>
                        <div className={cx('form')}>
                            <div className={cx('paymentother')}>
                                <button
                                    name="wallet-pay"
                                    type="button"
                                    onClick={() => handlePaymentMethodChange('wallet')}
                                >
                                    <img
                                        src="https://cdn3.iconfinder.com/data/icons/leto-finance-money-2/64/wallet_cash_coin_money_payment-512.png"
                                        alt="Ví của tôi"
                                    />
                                    Ví của tôi
                                </button>
                                <button name="momo-pay" type="button" onClick={() => handlePaymentMethodChange('momo')}>
                                    <img src="https://developers.momo.vn/v3/img/logo2.svg" alt="Ví momo" />
                                    Ví momo
                                </button>
                                <button
                                    name="paypal-pay"
                                    type="button"
                                    onClick={() => handlePaymentMethodChange('paypal')}
                                >
                                    <img
                                        src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/250_Paypal_logo-512.png"
                                        alt="Paypal"
                                    />
                                    Paypal
                                </button>
                                <button name="visa-pay" type="button" onClick={() => handlePaymentMethodChange('visa')}>
                                    <img
                                        src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-1024.png"
                                        alt="Thẻ visa"
                                    />
                                    Thẻ visa
                                </button>
                            </div>
                            <div className={cx('separator')}>
                                <hr className={cx('line')} />
                                <p>OR</p>
                                <hr className={cx('line')} />
                            </div>
                            <div className={cx('card-info')}>
                                {paymentMethod === 'visa' && (
                                    <>
                                        <div className={cx('input_container')}>
                                            <label className={cx('input_label')}>Card holder name</label>
                                            <input
                                                className={cx(
                                                    'input_field',
                                                    validFields.cardHolderName ? 'valid' : 'invalid',
                                                )}
                                                type="text"
                                                placeholder="Nhập đầy đủ họ và tên"
                                                value={cardHolderName}
                                                onChange={(e) => {
                                                    setCardHolderName(e.target.value)
                                                    validateField('cardHolderName', e.target.value)
                                                }}
                                            />
                                            {validFields.cardHolderName && (
                                                <span className={cx('valid-message')}></span>
                                            )}
                                        </div>
                                        <div className={cx('input_container')}>
                                            <label className={cx('input_label')}>Card Number</label>
                                            <input
                                                className={cx(
                                                    'input_field',
                                                    validFields.cardNumber ? 'valid' : 'invalid',
                                                )}
                                                type="text"
                                                placeholder="0000 0000 0000 0000"
                                                value={cardNumber}
                                                onChange={(e) => {
                                                    setCardNumber(e.target.value)
                                                    validateField('cardNumber', e.target.value)
                                                }}
                                            />
                                            {validFields.cardNumber && <span className={cx('valid-message')}></span>}
                                        </div>
                                        <div className={cx('input_container')}>
                                            <label className={cx('input_label')}>Expiry Date / CVV</label>
                                            <div className={cx('split')}>
                                                <input
                                                    className={cx(
                                                        'input_field',
                                                        validFields.expiryDate ? 'valid' : 'invalid',
                                                    )}
                                                    style={{ width: '250px' }}
                                                    type="text"
                                                    placeholder="01/23"
                                                    value={expiryDate}
                                                    onChange={(e) => {
                                                        setExpiryDate(e.target.value)
                                                        validateField('expiryDate', e.target.value)
                                                    }}
                                                />
                                                {validFields.expiryDate && (
                                                    <span className={cx('valid-message')}></span>
                                                )}
                                                <input
                                                    className={cx('input_field', validFields.cvv ? 'valid' : 'invalid')}
                                                    style={{ width: '110px' }}
                                                    type="text"
                                                    placeholder="CVV"
                                                    value={cvv}
                                                    onChange={(e) => {
                                                        setCvv(e.target.value)
                                                        validateField('cvv', e.target.value)
                                                    }}
                                                />
                                                {validFields.cvv && <span className={cx('valid-message')}></span>}
                                            </div>
                                        </div>
                                    </>
                                )}
                                {paymentMethod === 'wallet' && (
                                    <>
                                        <div className={cx('input_container')}>
                                            <label className={cx('input_label')}>Wallet ID</label>
                                            <input
                                                className={cx(
                                                    'input_field',
                                                    validFields.walletId ? 'valid' : 'invalid',
                                                )}
                                                type="text"
                                                placeholder="Nhập ID ví của bạn"
                                                value={walletId}
                                                onChange={(e) => {
                                                    setWalletId(e.target.value)
                                                    validateField('walletId', e.target.value)
                                                }}
                                            />
                                            {validFields.walletId && <span className={cx('valid-message')}></span>}
                                        </div>
                                        <div className={cx('input_container')}>
                                            <label className={cx('input_label')}>PIN</label>
                                            <input
                                                className={cx('input_field', validFields.pin ? 'valid' : 'invalid')}
                                                type="password"
                                                placeholder="Nhập PIN ví"
                                                value={pin}
                                                onChange={(e) => {
                                                    setPin(e.target.value)
                                                    validateField('pin', e.target.value)
                                                }}
                                            />
                                            {validFields.pin && <span className={cx('valid-message')}></span>}
                                        </div>
                                    </>
                                )}
                                {paymentMethod === 'momo' && (
                                    <>
                                        <div className={cx('input_container')}>
                                            <QRCode
                                                value="https://www.vietcombank.com.vn/"
                                                size={128}
                                                className={cx('qr-code')}
                                            />
                                        </div>
                                    </>
                                )}
                                {paymentMethod === 'paypal' && (
                                    <>
                                        <div className={cx('input_container')}>
                                            {errorMessage && (
                                                <div className={cx('error_message_pay')}>{errorMessage}</div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                            <button className={cx('checkout')} style={{ cursor: 'pointer' }} onClick={handlePayMent}>
                                <span>
                                    {isSubmitting ? 'Đang xử lý...' : 'Thanh toán'} {calculateTotalPrice()}
                                </span>
                            </button>
                        </div>
                    </div>
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
