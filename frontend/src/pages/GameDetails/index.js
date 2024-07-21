import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faShoppingBasket, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { Helmet } from 'react-helmet'
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
import Tippy from '@tippyjs/react'
import * as GameService from '../../services/GameService'
import { useQuery } from '@tanstack/react-query'

const cx = classNames.bind(styles)

function GameDetails(idGame) {
    const fetchGetDetailsGame = async (context) => {
        // const id = context?.queryKey && context?.queryKey[1]
        // if (id) {
        const res = await GameService.getDetailsGame('3027490', 'LivingForest')
        console.log('res', res)
        return res.data
        // }
    }

    useEffect(() => {
        fetchGetDetailsGame()
    }, [])

    useQuery({
        queryKey: ['game-details', idGame],
        queryFn: fetchGetDetailsGame,
        enabled: !!idGame,
    })

    const location = useLocation()
    const { imageInfo } = location.state || { imageInfo: [] }

    const [, setGameInfo] = useState({
        gameEdition: imageInfo?.gameEdition?.[0] || '',
    })

    const [currentPrice, setCurrentPrice] = useState(imageInfo.price?.[0] || '')
    const [currentOldPrice, setCurrentOldPrice] = useState(imageInfo.oldPrice?.[0] || '')
    const [currentSalePrice, setCurrentSalePrice] = useState(imageInfo.sale?.[0] || '')
    const [currentMediaUrl, setCurrentMediaUrl] = useState(imageInfo.media?.[0]?.vid || '')
    const [currentIndex, setCurrentIndex] = useState(0)

    const [showModal, setShowModal] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    const [largeImageUrl, setLargeImageUrl] = useState('')

    const mainVideoRef = useRef(null)
    const canvasVideoRef = useRef(null)

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
            toast.error(`Có lỗi xảy ra`, {
                className: 'toast-notifications',
            })
        }
    }

    const handleThumbnailClick = (url, index) => {
        setCurrentMediaUrl(url)
        setCurrentIndex(index) // Update the current index when a thumbnail is clicked
    }

    const handleEditionChange = (e) => {
        const selectedEditionIndex = e.target.value

        setGameInfo((prevInfo) => ({
            ...prevInfo,
            gameEdition: imageInfo.gameEdition[selectedEditionIndex] || {},
        }))

        setCurrentPrice(imageInfo.price?.[selectedEditionIndex] || '')
        setCurrentOldPrice(imageInfo.oldPrice?.[selectedEditionIndex] || '')
        setCurrentSalePrice(imageInfo.sale?.[selectedEditionIndex] || '')
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
        if (imageInfo.length > 0) {
        }
    }, [imageInfo])

    // Cho video nằm trên nếu chạy thì video nằm dưới chạy theo
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

    if (!imageInfo) {
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
                                        <img
                                            src={currentMediaUrl}
                                            alt="Main Media"
                                            onClick={() => openModal(currentMediaUrl)}
                                        />
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
                                {imageInfo.media.map((media, index) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            className={`thumbnail-container ${index === currentIndex ? 'active' : ''}`}
                                        >
                                            <img
                                                src={media.url}
                                                alt={`Thumbnail ${index}`}
                                                onClick={() =>
                                                    handleThumbnailClick(
                                                        media.type === 'video' ? media.vid : media.url,
                                                        index,
                                                    )
                                                }
                                            />
                                            {media.type === 'video' && (
                                                <div
                                                    className={cx('overlay')}
                                                    onClick={() =>
                                                        handleThumbnailClick(
                                                            media.type === 'video' ? media.vid : media.url,
                                                            index,
                                                        )
                                                    }
                                                >
                                                    <FontAwesomeIcon icon={faPlay} className={cx('play-icon')} />
                                                </div>
                                            )}
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
                            <img src={imageInfo.headerImg} alt="image_header" />
                            <img className={cx('glow')} src={imageInfo.headerImg} alt="" />
                        </div>

                        <div className={cx('product-rating')}>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalfAlt} />
                            <span>4.6 (21)</span>
                        </div>

                        <div className={cx('product-price')}>
                            <p className={cx('last-price')}>
                                Giá gốc: <strike>{currentPrice}</strike>
                            </p>
                            <p className={cx('new-price')}>
                                Giá giảm còn: <span>{currentOldPrice}</span>{' '}
                                <span className={cx('sale_price_percent')}>{currentSalePrice}</span>
                            </p>
                        </div>

                        <div className={cx('product-detail')}>
                            <p className={cx('short_description')}>{imageInfo.shortDescription}</p>
                            <p className={cx('game_author_date')}>
                                <p>
                                    Ngày phát hành: <span>{imageInfo.date}</span>
                                </p>
                                <p>
                                    Nhà phát triển: <span>{imageInfo.developers}</span>
                                </p>
                                <p>
                                    Nhà phát hành: <span>{imageInfo.publisher}</span>
                                </p>
                            </p>
                        </div>

                        <div className={cx('purchase-info')}>
                            <button type="button" value="cart" className={cx('btn')} onClick={addSuccess}>
                                Thêm vào giỏ <FontAwesomeIcon icon={faShoppingBasket} />
                            </button>
                            <button type="button" value="wishList" className={cx('btn')} onClick={addSuccess}>
                                Thêm vào danh sách ước
                            </button>
                            <Tippy content="Chọn bản game" placement="bottom">
                                <select className="select_game_edition" onChange={handleEditionChange}>
                                    {Object.entries(imageInfo?.gameEdition || {}).map(([key, edition]) => (
                                        <option key={key} value={key}>
                                            {edition}
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
                    <label htmlFor="tab2">Nội dung game</label>

                    <input type="radio" id="tab3" name="tabGroup1" className={cx('tab')} />
                    <label htmlFor="tab3">Ngôn ngữ hỗ trợ</label>
                    <input type="radio" id="tab4" name="tabGroup1" className={cx('tab')} />
                    <label htmlFor="tab4">Hehe</label>

                    <div className={cx('tab__content')}>
                        <h3>Đánh giá game</h3>
                        <p>
                            Praesent nonummy mi in odio. Nullam accumsan lorem in dui. Vestibulum turpis sem, aliquet
                            eget, lobortis pellentesque, rutrum eu, nisl. Nullam accumsan lorem in dui. Donec pede
                            justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                        </p>
                    </div>

                    <div className={cx('tab__content')}>
                        <h3>Medium Section</h3>
                        <p>
                            Praesent nonummy mi in odio. Nullam accumsan lorem in dui. Vestibulum turpis sem, aliquet
                            eget, lobortis pellentesque, rutrum eu, nisl. Nullam accumsan lorem in dui. Donec pede
                            justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                        </p>
                        <p>
                            In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Morbi mattis ullamcorper
                            velit. Pellentesque posuere. Etiam ut purus mattis mauris sodales aliquam. Praesent nec nisl
                            a purus blandit viverra.
                        </p>
                    </div>

                    <div className={cx('tab__content')}>
                        <h3>Long Section</h3>
                        <p>
                            Praesent nonummy mi in odio. Nullam accumsan lorem in dui. Vestibulum turpis sem, aliquet
                            eget, lobortis pellentesque, rutrum eu, nisl. Nullam accumsan lorem in dui. Donec pede
                            justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                        </p>
                        <p>
                            In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Morbi mattis ullamcorper
                            velit. Pellentesque posuere. Etiam ut purus mattis mauris sodales aliquam. Praesent nec nisl
                            a purus blandit viverra.
                        </p>
                    </div>
                    <div className={cx('tab__content')}>
                        <h3>Hehe Section</h3>
                        <p>
                            Praesent nonummy mi in odio. Nullam accumsan lorem in dui. Vestibulum turpis sem, aliquet
                            eget, lobortis pellentesque, rutrum eu, nisl. Nullam accumsan lorem in dui. Donec pede
                            justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                        </p>
                        <p>
                            In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Morbi mattis ullamcorper
                            velit. Pellentesque posuere. Etiam ut purus mattis mauris sodales aliquam. Praesent nec nisl
                            a purus blandit viverra.
                        </p>
                        <p>
                            Praesent nonummy mi in odio. Nullam accumsan lorem in dui. Vestibulum turpis sem, aliquet
                            eget, lobortis pellentesque, rutrum eu, nisl. Nullam accumsan lorem in dui. Donec pede
                            justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                        </p>
                        <p>
                            In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Morbi mattis ullamcorper
                            velit. Pellentesque posuere. Etiam ut purus mattis mauris sodales aliquam. Praesent nec nisl
                            a purus blandit viverra.
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default GameDetails
