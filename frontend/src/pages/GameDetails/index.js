import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faShoppingBasket, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { Helmet } from 'react-helmet'
import Tippy from '@tippyjs/react'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/thumbs'

import classNames from 'classnames/bind'
import styles from './GameDetails.scss'
import formatCurrency from '~/components/utilityFunction/formatCurrency'

// BE
import * as GameService from '../../services/GameService'

const cx = classNames.bind(styles)

function GameDetails() {
    const [stateGames, setStateGames] = useState({})
    const { game_id, game_slug } = useParams()
    const [currentPrice, setCurrentPrice] = useState('')
    const [RentalPrice, setRentalPrice] = useState('')
    const [currentSalePrice, setCurrentSalePrice] = useState('')
    const [currentMediaUrl, setCurrentMediaUrl] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [largeImageUrl, setLargeImageUrl] = useState('')

    const mainVideoRef = useRef(null)
    const canvasVideoRef = useRef(null)

    const fetchGetDetailsGame = async () => {
        try {
            const res = await GameService.getDetailsGame(game_id, game_slug)
            console.log('API Response:', res?.data)
            setStateGames(res?.data)

            // Set default values
            if (res?.data?.movies && res?.data?.movies?.length > 0) {
                setCurrentMediaUrl(res?.data.movies[0])
            } else if (res?.data?.screenshots && res?.data?.screenshots?.length > 0) {
                setCurrentMediaUrl(res?.data?.screenshots[0]?.path_full)
            }

            if (res?.data?.option && res?.option?.length > 0) {
                setCurrentPrice(res?.option[0]?.priceDiscounted)
                setRentalPrice(res?.option[0]?.rentalPrice)
                setCurrentSalePrice(res?.option[0]?.percentSavings)
            }
        } catch (error) {
            console.error('Error fetching game details:', error)
        }
    }

    useEffect(() => {
        fetchGetDetailsGame()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game_id, game_slug])

    const addSuccess = (e) => {
        const { value } = e.target
        if (value === 'cart') {
            toast.success('Đã thêm vào giỏ hàng!', {
                className: 'toast-notifications',
            })
        } else if (value === 'wishList') {
            toast.success('Đã thêm vào danh sách ước!', {
                className: 'toast-notifications',
            })
        } else {
            toast.error('Có lỗi xảy ra', {
                className: 'toast-notifications',
            })
        }
    }
    const handleThumbnailClick = (url, index) => {
        setCurrentMediaUrl(url)
        setCurrentIndex(index) // Update ảnh chính khi click từ thumbnail
    }

    const handleOptionChange = (e) => {
        const selectedIndex = e.target.value
        console.log('Selected Index:', selectedIndex) // Kiểm tra index được chọn
        const selectedOption = stateGames.option[selectedIndex]
        console.log('Selected Option:', selectedOption) // Kiểm tra đối tượng option được chọn
        if (selectedOption) {
            setCurrentPrice(selectedOption.priceDiscounted)
            setRentalPrice(selectedOption.rentalPrice)
            setCurrentSalePrice(selectedOption.percentSavings)
        }
    }

    const openModal = (url) => {
        setLargeImageUrl(url)
        setShowModal(true)
    }

    const closeModal = () => {
        setIsClosing(true)
        setTimeout(() => {
            setShowModal(false)
            setIsClosing(false)
            setLargeImageUrl('')
        }, 200)
    }

    useEffect(() => {
        if (stateGames.length > 0) {
        }
    }, [stateGames])

    useEffect(() => {
        const mainVideo = mainVideoRef.current
        const canvasVideo = canvasVideoRef.current

        if (mainVideo && canvasVideo) {
            const syncVideo = (event) => {
                const { currentTime, paused } = event.target
                canvasVideo.currentTime = currentTime
                if (paused) {
                    canvasVideo.pause()
                }
            }

            mainVideo.addEventListener('play', syncVideo)
            mainVideo.addEventListener('pause', syncVideo)
            mainVideo.addEventListener('timeupdate', syncVideo)

            return () => {
                mainVideo.removeEventListener('play', syncVideo)
                mainVideo.removeEventListener('pause', syncVideo)
                mainVideo.removeEventListener('timeupdate', syncVideo)
            }
        }
    }, [currentMediaUrl])

    if (!stateGames || Object.keys(stateGames).length === 0) {
        return <p>No game details available.</p>
    }

    return (
        <div className={cx('game_detail')}>
            <Helmet>
                <title>Chi tiết game - SteamClone</title>
            </Helmet>
            <div className={cx('card-wrapper')}>
                <div className={cx('card')}>
                    {/* <!-- Slide column left --> */}
                    <div className={cx('product-imgs')}>
                        <div className={cx('img-display')}>
                            <Swiper spaceBetween={10} slidesPerView={1} className={cx('img-showcase')}>
                                <SwiperSlide key="media">
                                    {currentMediaUrl.match('.webm') ? (
                                        <video controls src={currentMediaUrl} ref={mainVideoRef} alt="Main Video">
                                            Your browser does not support HTML video.
                                        </video>
                                    ) : (
                                        <SwiperSlide key="image">
                                            <img
                                                src={currentMediaUrl}
                                                alt="Main Media"
                                                onClick={() => openModal(currentMediaUrl)}
                                            />
                                        </SwiperSlide>
                                    )}
                                </SwiperSlide>
                            </Swiper>
                        </div>

                        {/* Phần loan màu */}
                        <div className={cx('img-display-glow')}>
                            <Swiper spaceBetween={10} slidesPerView={1} className={cx('img-showcase')}>
                                {currentMediaUrl.match('.webm') ? (
                                    <SwiperSlide key="video">
                                        <video src={currentMediaUrl} ref={canvasVideoRef} alt="background Video">
                                            Your browser does not support HTML video.
                                        </video>
                                    </SwiperSlide>
                                ) : (
                                    <SwiperSlide key="image">
                                        <img src={currentMediaUrl} alt="" />
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </div>

                        {/* Phần thumbnail */}
                        <div className={cx('img-select')}>
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={2}
                                slidesPerView={5}
                                navigation
                                pagination={{ el: '.swiper-custom-pagination', clickable: true }}
                                freeMode
                                watchSlidesProgress
                            >
                                {stateGames.movies_thumnail?.map((movie, index) => (
                                    <SwiperSlide key={`movie-${index}`}>
                                        <div
                                            className={`thumbnail-container ${index === currentIndex ? 'active' : ''}`}
                                        >
                                            <img
                                                src={movie.thumbnail} // lấy ảnh thumbnail
                                                alt={`Movie Thumbnail ${index}`}
                                                onClick={() => handleThumbnailClick(movie.webm_max, index)} // sử dụng webm_max cho video
                                            />
                                            <div
                                                className={cx('overlay')}
                                                onClick={() => handleThumbnailClick(movie.webm_max, index)} // sử dụng webm_max cho video
                                            >
                                                <FontAwesomeIcon icon={faPlay} className={cx('play-icon')} />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                                {stateGames.screenshots?.map((screenshot, index) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            className={`thumbnail-container ${index === currentIndex ? 'active' : ''}`}
                                        >
                                            <img
                                                src={screenshot.path_full}
                                                alt={`Thumbnail ${index}`}
                                                onClick={() => handleThumbnailClick(screenshot.path_full, index)}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="swiper-custom-pagination" />

                            {/* ẩn hiện hình ảnh phóng to */}
                            {showModal && (
                                <div className={cx('modal')} onClick={closeModal}>
                                    <div
                                        className={cx('modal-content', { 'zoom-out': isClosing })}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <span className={cx('close-modal')} onClick={closeModal}>
                                            &times;
                                        </span>
                                        <img src={largeImageUrl} alt="Large Media" className={cx('modal-media')} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <!-- game detail column right --> */}
                    <div className={cx('product-content')}>
                        <div className={cx('header_image_game')}>
                            <img src={stateGames.header_image} alt="image_header" />
                            <img className={cx('glow')} src={stateGames.header_image} alt="" />
                        </div>

                        <div className={cx('product-rating')}>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalfAlt} />
                            <span>4.6 (21)</span>
                        </div>

                        <div className={cx('img-age')}>
                            <img
                                src="https://store.akamai.steamstatic.com/public/shared/images/game_ratings/PEGI/12.png?v=3"
                                alt=""
                            />
                        </div>

                        <div className={cx('product-price')}>
                            {/* <p className={cx('last-price')}>
                                Giá gốc: <strike>{formatCurrency(currentPrice)}</strike>
                            </p> */}
                            {currentSalePrice !== null && (
                                <p className={cx('last-price')}>
                                    Giá gốc:{' '}
                                    <strike>
                                        {formatCurrency(
                                            parseFloat(
                                                (currentPrice / (1 - Math.abs(currentSalePrice) / 100)).toFixed(2),
                                            ),
                                        )}
                                    </strike>
                                </p>
                            )}{' '}
                            <p className={cx('last-price')}>
                                Giá thuê: <span></span>
                                {formatCurrency(RentalPrice)}
                            </p>{' '}
                            <p className={cx('new-price')}>
                                Giá hiện tại: <span> {formatCurrency(currentPrice)}</span>{' '}
                                {currentSalePrice !== null && (
                                    <span className={cx('sale_price_percent')}>{currentSalePrice + '%'}</span>
                                )}
                            </p>
                        </div>

                        <div className={cx('product-detail')}>
                            <p className={cx('short_description')}>{stateGames.description}</p>
                            {/* <p className={cx('game_author_date')}>
                                <p>
                                    Ngày phát hành: <span>{stateGames.release_Date}</span>
                                </p>
                                <p>
                                    Nhà phát triển: <span>{stateGames.developers.join(', ')}</span>
                                </p>
                                <p>
                                    Nhà phát hành: <span>{stateGames.publishers.join(', ')}</span>
                                </p>
                            </p> */}
                        </div>

                        <div className={cx('purchase-info')}>
                            <button type="button" value="cart" className={cx('btn')} onClick={addSuccess}>
                                Thêm vào giỏ <FontAwesomeIcon icon={faShoppingBasket} />
                            </button>
                            <button type="button" value="wishList" className={cx('btn')} onClick={addSuccess}>
                                Thêm vào danh sách ước
                            </button>
                            <Tippy content="Chọn bản game" placement="bottom">
                                <select className={cx('select_game_edition')} onChange={handleOptionChange}>
                                    {stateGames.option?.map((opt, index) => (
                                        <option key={index} value={index}>
                                            {opt.optionText}
                                        </option>
                                    ))}
                                </select>
                            </Tippy>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('about_game')}>
                <div className={cx('tab-wrap')}>
                    {/* active tab on page load gets checked attribute */}
                    <input type="radio" id="tab1" name="tabGroup1" className={cx('tab')} defaultChecked />
                    <label htmlFor="tab1">Đánh giá</label>

                    <input type="radio" id="tab2" name="tabGroup1" className={cx('tab')} />
                    <label htmlFor="tab2">Cấu hình </label>

                    <input type="radio" id="tab3" name="tabGroup1" className={cx('tab')} />
                    <label htmlFor="tab3">Ngôn ngữ hỗ trợ</label>
                    <input type="radio" id="tab4" name="tabGroup1" className={cx('tab')} />
                    <label htmlFor="tab4">Thành tựu game</label>

                    <div className={cx('tab__content')}>
                        <h3>Đánh giá game</h3>
                        <p>
                            Praesent nonummy mi in odio. Nullam accumsan lorem in dui. Vestibulum turpis sem, aliquet
                            eget, lobortis pellentesque, rutrum eu, nisl. Nullam accumsan lorem in dui. Donec pede
                            justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                        </p>

                        <div className={cx('review-section')}>
                            <h4>Gửi đánh giá của bạn</h4>

                            <div className={cx('rating')}>
                                <label>
                                    <input type="radio" name="rating" value="5" />
                                    <span>&#9733;</span>
                                </label>
                                <label>
                                    <input type="radio" name="rating" value="4" />
                                    <span>&#9733;</span>
                                </label>
                                <label>
                                    <input type="radio" name="rating" value="3" />
                                    <span>&#9733;</span>
                                </label>
                                <label>
                                    <input type="radio" name="rating" value="2" />
                                    <span>&#9733;</span>
                                </label>
                                <label>
                                    <input type="radio" name="rating" value="1" />
                                    <span>&#9733;</span>
                                </label>
                            </div>

                            <div className={cx('comment-box')}>
                                <textarea rows="4" placeholder="Viết bình luận của bạn ở đây..."></textarea>
                            </div>

                            <button className={cx('btn-review-game')} type="button">
                                Gửi đánh giá
                            </button>
                        </div>
                    </div>

                    <div className={cx('tab__content')}>
                        <h3>Medium Section</h3>
                        <p>{stateGames.description}</p>
                        <div class="system-requirements">
                            <div class="requirement minimum">
                                <h2>Tối thiểu</h2>
                                <ul>
                                    <li>
                                        <strong>HĐH:</strong> Windows 10 64-bit Operating System
                                    </li>
                                    <li>
                                        <strong>Bộ xử lý:</strong> Intel Core i5-4460
                                    </li>
                                    <li>
                                        <strong>Bộ nhớ:</strong> 8 GB RAM
                                    </li>
                                    <li>
                                        <strong>Đồ họa:</strong> Nvidia GTX 750ti 4G / AMD Radeon RX550
                                    </li>
                                    <li>
                                        <strong>DirectX:</strong> Phiên bản 11
                                    </li>
                                    <li>
                                        <strong>Kết nối:</strong> Cáp mạng Internet
                                    </li>
                                    <li>
                                        <strong>Lưu trữ:</strong> 55 GB chỗ trống khả dụng
                                    </li>
                                    <li>
                                        <strong>Ghi chú thêm:</strong> SSD is highly recommended
                                    </li>
                                </ul>
                            </div>
                            <div class="requirement recommended">
                                <h2>Khuyến nghị</h2>
                                <ul>
                                    <li>
                                        <strong>HĐH:</strong> Windows 10 64-bit Operating System
                                    </li>
                                    <li>
                                        <strong>Bộ xử lý:</strong> Intel Core i7-7700
                                    </li>
                                    <li>
                                        <strong>Bộ nhớ:</strong> 16 GB RAM
                                    </li>
                                    <li>
                                        <strong>Đồ họa:</strong> Nvidia GTX 1060 6G / AMD Radeon RX 580 2304SP / Intel
                                        ARC A380
                                    </li>
                                    <li>
                                        <strong>DirectX:</strong> Phiên bản 11
                                    </li>
                                    <li>
                                        <strong>Kết nối:</strong> Cáp mạng Internet
                                    </li>
                                    <li>
                                        <strong>Lưu trữ:</strong> 55 GB chỗ trống khả dụng
                                    </li>
                                    <li>
                                        <strong>Ghi chú thêm:</strong> SSD is highly recommended
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={cx('tab__content')}>
                        <h4>Ngôn ngữ hỗ trợ</h4>
                        <table className={cx('support-languages')}>
                            <thead>
                                <tr>
                                    <th>Ngôn ngữ</th>
                                    <th>Giao diện</th>
                                    <th>Lồng tiếng</th>
                                    <th>Phụ đề</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tiếng Việt</td>
                                    <td>✔</td>
                                    <td></td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Tiếng Anh</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Tiếng Trung giản thể</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Tiếng Trung phồn thể</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                                <tr>
                                    <td>Tiếng Nhật</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                    <td>✔</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={cx('tab__content')}>
                        <h4>Thành tựu</h4>
                        <div className={cx('achievements')}>
                            <div className={cx('achievement')}>
                                <img
                                    src="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1203220/881d22672f329a7e3f80ddaf7d5275a35c7a6a26.jpg"
                                    alt="Achievement 1"
                                />
                                <p>67.3% Bộc lộ tài năng</p>
                            </div>
                            <div className={cx('achievement')}>
                                <img
                                    src="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1203220/af68b54afe0a90f3ae4a24bb4c6633fe105f64e5.jpg"
                                    alt="Achievement 2"
                                />
                                <p>Uy danh vang dội</p>
                            </div>
                            <div className={cx('achievement')}>
                                <img
                                    src="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1203220/473f40d452c7fb1247b41569f294e75e249a0892.jpg"
                                    alt="Achievement 3"
                                />
                                <p>Mặt Nạ Bất Hủ</p>
                            </div>
                            <div className={cx('achievement')}>
                                <img
                                    src="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1203220/60b43dd8ab34f19a1060576ac204142c9baa5571.jpg"
                                    alt="Achievement 3"
                                />
                                <p>Ngọc thô chưa mài</p>
                            </div>
                            <div className={cx('achievement')}>
                                <img
                                    src="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1203220/866f1822f81e5876ed58cc030a68268c46375060.jpg"
                                    alt="Achievement 3"
                                />
                                <p>54.7% Phong thái cao thủ</p>
                            </div>
                            {/* <!-- Thêm các thành tựu khác ở đây --> */}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default GameDetails
