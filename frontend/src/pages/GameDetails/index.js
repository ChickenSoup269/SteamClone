import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

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
            video: {
                vidId0: 'https://cdn.akamai.steamstatic.com/steam/apps/256751447/movie_max.webm?t=1558620943',
                vidId1: 'https://cdn.akamai.steamstatic.com/steam/apps/256742849/movie_max.webm?t=1549970399',
            },

            thumbnail: {
                thumbnailVidId0:
                    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256751447/movie.293x165.jpg?t=1558620943s',
                thumbnailVidId1:
                    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256750788/movie.293x165.jpg?t=1558620997',
                imgId0: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_b367c99f566ecfc3def17673e9015c80e7e3a8d3.1920x1080.jpg?t=1699976365',
                imgId1: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_fe3108d8affd7a9f7e72959602e49cb5fa105910.1920x1080.jpg?t=1699976365',
                imgId2: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_16346541350f29271399420bffda0da34c8d5ea1.1920x1080.jpg?t=1699976365',
                imgId3: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_82b431d0e99eff54583fb4abe17bf805d1fa1a03.1920x1080.jpg?t=1699976365',
                imgId4: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_15164c8bb033b1c570865ab264ccaaab8131f564.1920x1080.jpg?t=1699976365',
                imgId5: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_28c87c4d21ad066b22c823484d8d4a4b1ad4baef.1920x1080.jpg?t=1699976365',
                imgId6: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_87965bbf0f820468817d690a77d623da491aa1f1.1920x1080.jpg?t=1699976365',
                imgId7: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_1704c59def00896435add8c140e6e6980ae534d4.1920x1080.jpg?t=1699976365',
                imgId8: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_b6f8b370506ba4fdfa8f0cdb012b27675a4174d2.1920x1080.jpg?t=1699976365',
                imgId9: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_37f12b05302c5d75bd2b0b0aaed635472662a757.1920x1080.jpg?t=1699976365',
                imgId10:
                    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/779340/ss_2c75b7b68ec1b908fbdeabf97fc505e1833abf17.1920x1080.jpg?t=1699976365',
            },

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
            Sale: { 0: '10%', 1: '20%', 2: '30%', 3: '40%', 4: '50%' },

            gameEdition: {
                0: 'Total WarTHREE KINGDOMS',
                1: 'Total WarTHREE KINGDOMS Deluxe Edition',
                2: 'Total WarTHREE KINGDOMS Silver Edition',
                3: 'Total WarTHREE KINGDOMS Gold Edition',
                4: 'Total WarTHREE KINGDOMS God Edition',
            },

            date: '29/04/03',
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

    const [gameInfo, setGameInfo] = useState({
        headerImg: gameDetails[0].headerImg,
        shortDescription: gameDetails[0].shortDescription,
        gameEdition: gameDetails[0].gameEdition[0],
    })
    const [currentPrice, setCurrentPrice] = useState(gameDetails[0].price[0])
    const [currentOldPrice, setCurrentOldPrice] = useState(gameDetails[0].oldPrice[0])

    const [currentIndex, setCurrentIndex] = useState(0)

    const handleThumbnailClick = (index) => {
        const gameDetail = gameDetails[index]

        setGameInfo({
            headerImg: gameDetail.headerImg,
            shortDescription: gameDetail.shortDescription,
            gameEdition: gameDetail.gameEdition[0],
        })
        setCurrentPrice(gameDetail.price[0])
        setCurrentOldPrice(gameDetail.oldPrice[0])
        setCurrentIndex(index)
    }

    const handleEditionChange = (event) => {
        const selectedEditionIndex = event.target.value
        setGameInfo((prevInfo) => ({
            ...prevInfo,
            gameEdition: gameDetails[currentIndex].gameEdition[selectedEditionIndex],
        }))
        setCurrentPrice(gameDetails[currentIndex].price[selectedEditionIndex])
        setCurrentOldPrice(gameDetails[currentIndex].oldPrice[selectedEditionIndex])
    }

    const combinedDetails = {
        ...gameDetails[0].video,
        ...gameDetails[0].thumbnail,
    }

    // const [swiper, updateSwiper] = useState(null)
    // // Swiper thumbsinstance
    // const [swiperThumbs, updateSwiperThumbs] = useState(null)

    // useEffect(() => {
    //     if (swiper && swiperThumbs) {
    //         swiper.controller.control = swiperThumbs
    //         swiperThumbs.controller.control = swiper
    //     }
    // }, [swiper, swiperThumbs])
    return (
        <div className={cx('game_detail')}>
            <div className={cx('card-wrapper')}>
                <div className={cx('card')}>
                    {/* <!-- Slide column left --> */}
                    <div className={cx('product-imgs')}>
                        <div className={cx('img-display')}>
                            <Swiper spaceBetween={10} slidesPerView={1} className={cx('img-showcase')}>
                                {Object.entries(combinedDetails).map(([key, url], index) => {
                                    if (key.startsWith('vidId')) {
                                        return (
                                            <SwiperSlide key={`video-${index}`}>
                                                <video controls src={url} alt={`Video ${index}`}>
                                                    Your browser does not support HTML video.
                                                </video>
                                            </SwiperSlide>
                                        )
                                    } else if (key.startsWith('imgId')) {
                                        return (
                                            <SwiperSlide key={`img-${index}`}>
                                                <img
                                                    src={url}
                                                    alt={`Thumbnail ${index}`}
                                                    onClick={() => handleThumbnailClick(currentIndex, key)}
                                                />
                                            </SwiperSlide>
                                        )
                                    } else if (key.startsWith('thumbnailVidId')) {
                                        return (
                                            <SwiperSlide key={`thumbnail-${index}`}>
                                                <img
                                                    src={url}
                                                    alt={`Thumbnail Video ${index}`}
                                                    onClick={() => handleThumbnailClick(currentIndex, key)}
                                                />
                                            </SwiperSlide>
                                        )
                                    } else {
                                        return null
                                    }
                                })}
                            </Swiper>
                        </div>
                        <div className={cx('img-select')}>
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={5}
                                slidesPerView={5}
                                navigation
                                pagination={{ el: '.swiper-custom-pagination', clickable: true }}
                                freeMode
                                watchSlidesProgress
                                thumbs={true}
                            >
                                {Object.entries(gameDetails[0].thumbnail).map(([key, url], index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={url}
                                            alt={`Thumbnail ${index}`}
                                            onClick={() => handleThumbnailClick(currentIndex, key)}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="swiper-custom-pagination" />
                        </div>
                    </div>

                    {/* <!-- game detail column right --> */}
                    <div className={cx('product-content')}>
                        <div className={cx('header_image_game')}>
                            <img src={gameInfo.headerImg} alt="image_header" />
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
                                Giá giảm còn: <span>{currentPrice}</span>
                            </p>
                        </div>

                        <div className={cx('product-detail')}>
                            <p className={cx('short_description')}>{gameInfo.shortDescription}</p>
                            <p className={cx('game_author_date')}>
                                <p>
                                    Ngày phát hành: <span>23/05/2020</span>
                                </p>
                                <p>
                                    Nhà phát triển: <span>{'Tên nhà phát triển'}</span>
                                </p>
                                <p>
                                    Nhà phát hành: <span>{'Tên nhà phát hành'}</span>
                                </p>
                            </p>
                        </div>

                        <div className={cx('purchase-info')}>
                            <button type="button" className="btn">
                                Thêm vào giỏ hàng <FontAwesomeIcon icon={faShoppingBasket} />
                            </button>
                            <button type="button" className="btn">
                                Thêm vào danh sách ước
                            </button>

                            <select className="select_game_edition" onChange={handleEditionChange}>
                                {Object.entries(gameDetails[currentIndex].gameEdition).map(([key, edition]) => (
                                    <option key={key} value={key}>
                                        {edition}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameDetails
