import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faShoppingBasket, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
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

const cx = classNames.bind(styles)

function GameDetails() {
    const gameDetails = [
        {
            headerImg:
                'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/header.jpg?t=1699976365',

            media: [
                {
                    type: 'video',
                    vid: 'https://cdn.akamai.steamstatic.com/steam/apps/256751447/movie_max.webm?t=1558620943',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256751447/movie.293x165.jpg?t=1558620943s',
                },
                {
                    type: 'video',
                    vid: 'https://cdn.akamai.steamstatic.com/steam/apps/256742849/movie_max.webm?t=1549970399',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256750788/movie.293x165.jpg?t=1558620997',
                },
                {
                    type: 'image',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_b367c99f566ecfc3def17673e9015c80e7e3a8d3.1920x1080.jpg?t=1699976365',
                },
                {
                    type: 'image',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_fe3108d8affd7a9f7e72959602e49cb5fa105910.1920x1080.jpg?t=1699976365',
                },
                {
                    type: 'image',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_16346541350f29271399420bffda0da34c8d5ea1.1920x1080.jpg?t=1699976365',
                },
                {
                    type: 'image',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_82b431d0e99eff54583fb4abe17bf805d1fa1a03.1920x1080.jpg?t=1699976365',
                },
                {
                    type: 'image',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_15164c8bb033b1c570865ab264ccaaab8131f564.1920x1080.jpg?t=1699976365',
                },
                {
                    type: 'image',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_28c87c4d21ad066b22c823484d8d4a4b1ad4baef.1920x1080.jpg?t=1699976365',
                },
                {
                    type: 'image',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_87965bbf0f820468817d690a77d623da491aa1f1.1920x1080.jpg?t=1699976365',
                },
                {
                    type: 'image',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_1704c59def00896435add8c140e6e6980ae534d4.1920x1080.jpg?t=1699976365',
                },
                {
                    type: 'image',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_b6f8b370506ba4fdfa8f0cdb012b27675a4174d2.1920x1080.jpg?t=1699976365',
                },
                {
                    type: 'image',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_37f12b05302c5d75bd2b0b0aaed635472662a757.1920x1080.jpg?t=1699976365',
                },
                {
                    type: 'image',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_2c75b7b68ec1b908fbdeabf97fc505e1833abf17.1920x1080.jpg?t=1699976365',
                },
            ],

            shortDescription:
                'Total War: THREE KINGDOMS is the first in the award-winning series to recreate epic conflict across ancient China. Combining a gripping turn-based campaign of empire-building & conquest with stunning real-time battles, THREE KINGDOMS redefines the series in an age of heroes & legends.',
            price: {
                0: '100.000vnđ',
                1: '500.000vnđ',
                2: '990.000vnđ',
                3: '1.200.000vnđ',
                4: '3.500.000vnđ',
            },
            oldPrice: {
                0: '500.000vnđ',
                1: '1.000.000vnđ',
                2: '3.990.000vnđ',
                3: '4.200.000vnđ',
                4: '15.500.000vnđ',
            },
            sale: { 0: '10%', 1: '20%', 2: '30%', 3: '40%', 4: '50%' },

            gameEdition: {
                0: 'Total War THREE KINGDOMS',
                1: 'Total War THREE KINGDOMS Deluxe Edition',
                2: 'Total War THREE KINGDOMS Silver Edition',
                3: 'Total War THREE KINGDOMS Gold Edition',
                4: 'Total War THREE KINGDOMS God Edition',
            },

            date: '29/04/2023',
            developers: 'Nhà phát triển',
            publisher: 'Nhà phát hành',
            start: '4.6',
            description: 'Đây là phần mô tả game ',

            alt: [
                {
                    thumbnailAlt: 'thumbnail',
                    imgAlt: 'imageAlt',
                    thumbnailVideoAlt: 'thumbnail_Video',
                },
            ],
        },
    ]
    // refest trang nội dung đầu tiên load trong mainImg
    const initialMediaUrl = gameDetails[0].media[0].vid

    const [gameInfo, setGameInfo] = useState({
        headerImg: gameDetails[0].headerImg,
        shortDescription: gameDetails[0].shortDescription,
        gameEdition: gameDetails[0].gameEdition[0],
        date: gameDetails[0].date,
        developers: gameDetails[0].developers,
        publisher: gameDetails[0].publisher,
    })

    const [currentPrice, setCurrentPrice] = useState(gameDetails[0].price[0])
    const [currentOldPrice, setCurrentOldPrice] = useState(gameDetails[0].oldPrice[0])
    const [currentSalePrice, setCurrentSalePrice] = useState(gameDetails[0].sale[0])
    const [currentIndex] = useState(0)
    const [currentMediaUrl, setCurrentMediaUrl] = useState(initialMediaUrl)
    const [showModal, setShowModal] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [largeImageUrl, setLargeImageUrl] = useState('')

    const mainVideoRef = useRef(null)
    const canvasVideoRef = useRef(null)

    const addCartSuccess = () => {
        toast.success('Thêm vào giỏ hàng thành công!', {
            className: 'toast-notifications',
        })
    }

    const addWishListSuccess = () => {
        toast.success('Thêm vào danh sách ước thành công!', {
            className: 'toast-notifications',
        })
    }

    const handleThumbnailClick = (url) => {
        setCurrentMediaUrl(url)
    }

    const handleEditionChange = (event) => {
        const selectedEditionIndex = event.target.value
        setGameInfo((prevInfo) => ({
            ...prevInfo,
            gameEdition: gameDetails[currentIndex].gameEdition[selectedEditionIndex],
        }))
        setCurrentPrice(gameDetails[currentIndex].price[selectedEditionIndex])
        setCurrentOldPrice(gameDetails[currentIndex].oldPrice[selectedEditionIndex])
        setCurrentSalePrice(gameDetails[currentIndex].sale[selectedEditionIndex])
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

    return (
        <div className={cx('game_detail')}>
            <div className={cx('card-wrapper')}>
                <div className={cx('card')}>
                    {/* <!-- Slide column left --> */}
                    <div className={cx('product-imgs')}>
                        <div className={cx('img-display')}>
                            <Swiper spaceBetween={10} slidesPerView={1} className={cx('img-showcase')}>
                                <SwiperSlide key="media">
                                    {currentMediaUrl.match('.movie_max.webm') ? (
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

                        <div className={cx('img-select')}>
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={2}
                                slidesPerView={5}
                                navigation
                                pagination={{ el: '.swiper-custom-pagination', clickable: true }}
                                freeMode
                                watchSlidesProgress
                                thumbs={true}
                            >
                                {gameDetails[0].media.map((media, index) => (
                                    <SwiperSlide key={index}>
                                        <div className={cx('thumbnail-container')}>
                                            <img
                                                src={media.url}
                                                alt={`Thumbnail ${index}`}
                                                onClick={() =>
                                                    handleThumbnailClick(media.type === 'video' ? media.vid : media.url)
                                                }
                                            />
                                            {media.type === 'video' && (
                                                <div
                                                    className={cx('overlay')}
                                                    onClick={() => handleThumbnailClick(media.vid)}
                                                >
                                                    <FontAwesomeIcon icon={faPlay} className={cx('play-icon')} />
                                                </div>
                                            )}
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="swiper-custom-pagination" />
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
                            <img src={gameInfo.headerImg} alt="image_header" />
                            <img className={cx('glow')} src={gameInfo.headerImg} alt="" />
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
                                Giá gốc: <strike>{currentOldPrice}</strike>
                            </p>
                            <p className={cx('new-price')}>
                                Giá giảm còn: <span>{currentPrice}</span>{' '}
                                <span className={cx('sale_price_percent')}>{currentSalePrice}</span>
                            </p>
                        </div>

                        <div className={cx('product-detail')}>
                            <p className={cx('short_description')}>{gameInfo.shortDescription}</p>
                            <p className={cx('game_author_date')}>
                                <p>
                                    Ngày phát hành: <span>{gameInfo.date}</span>
                                </p>
                                <p>
                                    Nhà phát triển: <span>{gameInfo.developers}</span>
                                </p>
                                <p>
                                    Nhà phát hành: <span>{gameInfo.publisher}</span>
                                </p>
                            </p>
                        </div>

                        <div className={cx('purchase-info')}>
                            <button type="button" className="btn" onClick={addCartSuccess}>
                                Thêm vào giỏ <FontAwesomeIcon icon={faShoppingBasket} />
                            </button>
                            <button type="button" className="btn" onClick={addWishListSuccess}>
                                Thêm vào danh sách ước
                            </button>

                            <select className="select_game_edition" onChange={handleEditionChange}>
                                {Object.entries(gameDetails[currentIndex].gameEdition).map(([key, edition]) => (
                                    <option className={cx('options')} key={key} value={key}>
                                        {edition}
                                    </option>
                                ))}
                            </select>
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
