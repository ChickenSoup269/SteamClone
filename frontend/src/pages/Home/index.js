import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { Autoplay } from 'swiper/modules'
import { Helmet } from 'react-helmet'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

import * as GameService from '../../services/GameService'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/thumbs'
import 'swiper/css/autoplay'

import {} from '@tanstack/react-query'
import formatCurrency from '~/components/utilityFunction/formatCurrency'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'
import posterGame from '~/assets/images/404 poster.jpg'

const cx = classNames.bind(styles)

const slidesData = [
    { id: 1, title: 'Sinh tồn', backgroundClass: 'background-url-img-type-1' },
    { id: 2, title: 'Đua xe', backgroundClass: 'background-url-img-type-2' },
    { id: 3, title: 'Thế giới mở', backgroundClass: 'background-url-img-type-3' },
    { id: 4, title: 'Anime', backgroundClass: 'background-url-img-type-4' },
    { id: 5, title: 'Kinh dị', backgroundClass: 'background-url-img-type-5' },
    { id: 6, title: 'Chơi đơn', backgroundClass: 'background-url-img-type-6' },
    { id: 7, title: 'Nhiều người chơi', backgroundClass: 'background-url-img-type-7' },
    { id: 8, title: 'Chơi miễn phí', backgroundClass: 'background-url-img-type-8' },
]

const categoriesPoster = [
    {
        type: 'Horror',
        games: [
            {
                id: '1',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/1142710/library_600x900_2x.jpg',
                alt: 'Horror Game 1',
            },
            {
                id: '2',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/534380/library_600x900_2x.jpg',
                alt: 'Horror Game 2',
            },
            {
                id: '3',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/2420110/library_600x900_2x.jpg',
                alt: 'Horror Game 3',
            },
            {
                id: '4',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/322330/library_600x900_2x.jpg',
                alt: 'Horror Game 4',
            },
            {
                id: '5',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/457140/library_600x900_2x.jpg',
                alt: 'Horror Game 5',
            },
            {
                id: '6',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/1203220/library_600x900_2x.jpg',
                alt: 'Horror Game 6',
            },
            {
                id: '6',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/2303350/library_600x900_2x.jpg',
                alt: 'Horror Game 6',
            },
        ],
    },
    {
        type: 'FunBruh',
        games: [
            {
                id: '1',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/1142710/library_600x900_2x.jpg',
                alt: 'Horror Game 1',
            },
            {
                id: '1',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/1142710/library_600x900_2x.jpg',
                alt: 'Horror Game 1',
            },
            {
                id: '1',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/1142710/library_600x900_2x.jpg',
                alt: 'Horror Game 1',
            },
            {
                id: '1',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/1142710/library_600x900_2x.jpg',
                alt: 'Horror Game 1',
            },
            {
                id: '1',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/1142710/library_600x900_2x.jpg',
                alt: 'Horror Game 1',
            },
            {
                id: '1',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/1142710/library_600x900_2x.jpg',
                alt: 'Horror Game 1',
            },
            {
                id: '2',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/534380/library_600x900_2x.jpg',
                alt: 'Horror Game 2',
            },
            {
                id: '3',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/2420110/library_600x900_2x.jpg',
                alt: 'Horror Game 3',
            },
            {
                id: '4',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/322330/library_600x900_2x.jpg',
                alt: 'Horror Game 4',
            },
            {
                id: '6',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/2303350/library_600x900_2x.jpg',
                alt: 'Horror Game 6',
            },
            {
                id: '5',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/457140/library_600x900_2x.jpg',
                alt: 'Horror Game 5',
            },
            {
                id: '6',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/1203220/library_600x900_2x.jpg',
                alt: 'Horror Game 6',
            },
        ],
    },
    {
        type: 'Anime',
        games: [
            {
                id: '2',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/1142710/library_600x900_2x.jpg',
                alt: 'Horror Game 1',
            },
            {
                id: '2',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/534380/library_600x900_2x.jpg',
                alt: 'Horror Game 2',
            },
            {
                id: '3',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/2420110/library_600x900_2x.jpg',
                alt: 'Horror Game 3',
            },
            {
                id: '4',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/322330/library_600x900_2x.jpg',
                alt: 'Horror Game 4',
            },
            {
                id: '5',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/457140/library_600x900_2x.jpg',
                alt: 'Horror Game 5',
            },
            {
                id: '6',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/1203220/library_600x900_2x.jpg',
                alt: 'Horror Game 6',
            },
            {
                id: '6',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/2303350/library_600x900_2x.jpg',
                alt: 'Horror Game 6',
            },
        ],
    },
]

function Home() {
    const [stateGames, setStateGames] = useState([])
    const [imageInfo, setImageInfo] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const swiperRef = useRef(null)

    const fetchAllGames = async () => {
        const res = await GameService.getAllGame()
        const games = res?.games?.data || []
        setStateGames(games)
    }

    useEffect(() => {
        fetchAllGames()
    }, [])

    const handleThumbnailClick = (index) => {
        const selectedGame = stateGames[index]
        setCurrentIndex(index)
        setImageInfo(selectedGame)
    }

    const handleSlideChange = () => {
        const swiper = swiperRef.current.swiper
        const slideIndex = swiper.realIndex

        handleThumbnailClick(slideIndex)
    }

    // Hover tạm dừng silde loop
    const handleMouseEnter = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.stop()
        }
    }

    // Khi không hover thì trở lại bình thường
    const handleMouseLeave = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.start()
        }
    }

    const navigate = useNavigate()

    const handleDetailClick = () => {
        navigate(`/detail/${imageInfo.game_id}/${imageInfo.game_name}`)
    }

    const handleImageError = (e) => {
        e.target.src = posterGame // nếu không có poster lấy poster mặc định là 404
    }
    const getPosterUrl = (game) => {
        if (game.game_name.includes('Soundtrack')) {
            return game.header_image
        } else if (game.description.includes('DLC')) {
            return game.header_image
        }
        return game.poster_url
    }
    // chuyển giá

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>SteamClone </title>
            </Helmet>
            <div className={cx('full-screen-slider')}>
                <div className={cx('full-screen-img-container')}>
                    {imageInfo && (
                        <>
                            <img
                                className={cx('full-screen-img')}
                                id="mainImage"
                                src={imageInfo?.screenshots?.[0]?.path_full}
                                alt="BackgroundGameImg"
                            />
                            <div className={cx('full-screen-content')}>
                                <h2 className={cx('title-game')}>{imageInfo.game_name}</h2>
                                <p className={cx('description-game')}>{imageInfo.description}</p>
                                <div className={cx('about_game_content')}>
                                    <div className={cx('poster_game_full_img')}>
                                        <img
                                            src={getPosterUrl(imageInfo)}
                                            alt="Game Poster"
                                            onError={handleImageError}
                                        />
                                    </div>
                                    <div className={cx('info_button_price_game')}>
                                        <div className={cx('button_info_game')}>
                                            <button onClick={handleDetailClick} className={cx('button-detail-game')}>
                                                Xem chi tiết
                                            </button>
                                            <div className={cx('add-card')} id="card">
                                                <button className={cx('add-btn-card')}>Thêm vào giỏ hàng</button>
                                            </div>
                                        </div>
                                        <div className={cx('product-price-steam')}>
                                            {/* !Chưa có dữ liệu oldPRice */}
                                            {imageInfo?.option?.[0].percentSavings !== null && (
                                                <p className={cx('last-price')}>
                                                    Giá gốc:{' '}
                                                    <strike>
                                                        {formatCurrency(imageInfo?.option?.[0].priceDiscounted)}
                                                    </strike>
                                                </p>
                                            )}
                                            {imageInfo?.option?.[0].percentSavings == null && (
                                                <p className={cx('last-price')}>
                                                    Giá Thuê:
                                                    <span> {formatCurrency(imageInfo?.option?.[0].rentalPrice)}</span>
                                                </p>
                                            )}
                                            <p className={cx('new-price')}>
                                                {/* chuyển giá vnđ  formatCurrency*/}
                                                Giá hiện tại:
                                                <span> {formatCurrency(imageInfo?.option?.[0].priceDiscounted)}</span>
                                                {/* có sale thì mới hiện */}
                                                {imageInfo?.option?.[0].percentSavings !== null && (
                                                    <span className={cx('sale_price_percent')}>
                                                        {imageInfo?.option?.[0].percentSavings + '%' || 'None'}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Slide đầu dưới header full image */}
                <Swiper
                    className={cx('game_swiper_container')}
                    slidesPerView={6}
                    speed={400}
                    slidesPerGroup={1}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 10000,
                        paginationClickable: true,
                    }}
                    loop={true}
                    onSlideChange={handleSlideChange}
                    ref={swiperRef}
                >
                    {stateGames.map((game, index) => (
                        <SwiperSlide
                            className={cx('game_swiper_slide')}
                            key={game._id}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                className={cx('img-header-games', {
                                    'img-header-games-active': index === currentIndex,
                                })}
                                src={game.header_image}
                                alt="GamePicture"
                                onClick={() => handleThumbnailClick(index)}
                            />
                            <img className={cx('glow')} src={game.header_image} alt="" />
                            {/* <div className={cx('discount-badge')}>{game.sale[0]}</div> */}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className={cx('content_game_poster')}>
                {/* Slide thể loại */}
                <div className={cx('swiper_background_genres')}>
                    <h2>Duyệt theo thể loại</h2>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        slidesPerView={4}
                        spaceBetween={8}
                        navigation={true}
                        pagination={{ clickable: true }}
                        className={cx('swiper_game_genres')}
                    >
                        {slidesData.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <div className={cx(slide.backgroundClass)}>
                                    <h3>{slide.title}</h3>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Slide thể loại đại diện game */}
                {categoriesPoster.slice(0, 2).map((category, index) => (
                    <div key={index} className={cx('swiper_background_poster_game')}>
                        <h2 className={cx('title_poster_game')}>{`Thể loại - ${category.type}`}</h2>
                        <Swiper
                            modules={[Navigation, Pagination]}
                            slidesPerView={7}
                            spaceBetween={15}
                            navigation={true}
                            pagination={{ clickable: true }}
                            className={cx('swiper_poster_game')}
                        >
                            {category.games.map((game, idx) => (
                                <SwiperSlide key={idx} className={cx('swiper_slide_poster')}>
                                    <img src={game.src} alt={game.alt} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ))}

                {/* featured games [BETA] */}
                <div className={cx('carousel')}>
                    <div className={cx('carousel-left')}>
                        <h2>Featured free games</h2>
                        <p>Explore free fun to play games and find a new favorite</p>
                        <button>See all</button>
                    </div>
                    <div className={cx('carousel-right')}>
                        <div className={cx('carousel-track')}>
                            <div className={cx('carousel-item')}>
                                <img
                                    src="https://steamcdn-a.akamaihd.net/steam/apps/1142710/library_600x900_2x.jpg"
                                    alt="War and Magic"
                                />

                                <h3>Tota warhammer</h3>
                                <div className={cx('')}>
                                    <p>4.5 ★</p>
                                    <span>Free</span>
                                </div>
                            </div>
                            <div className={cx('carousel-item')}>
                                <img
                                    src="https://steamcdn-a.akamaihd.net/steam/apps/1142710/library_600x900_2x.jpg"
                                    alt="DesignVille"
                                />
                                <h3>DesignVille: Merge & Design</h3>
                                <div>
                                    <p>4.5 ★</p>
                                    <span>Free</span>
                                </div>
                            </div>
                            <div className={cx('carousel-item')}>
                                <img
                                    src="https://steamcdn-a.akamaihd.net/steam/apps/1142710/library_600x900_2x.jpg"
                                    alt="DesignVille"
                                />
                                <h3>DesignVille: Merge & Design</h3>
                                <div>
                                    <p>4.5 ★</p>
                                    <span>Free</span>
                                </div>
                            </div>
                            <div className={cx('carousel-item')}>
                                <img
                                    src="https://steamcdn-a.akamaihd.net/steam/apps/1142710/library_600x900_2x.jpg"
                                    alt="DesignVille"
                                />
                                <h3>DesignVille: Merge & Design</h3>
                                <div>
                                    <p>4.5 ★</p>
                                    <span>Free</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide ưa đãi card */}
                {/* <div className={cx('swiper_card_sale')}>
                    <Swiper
                        slidesPerView={4}
                        pagination={{
                            clickable: true,
                        }}
                        className={cx('swiper_card_game_sale')}
                    >
                        <SwiperSlide>
                            <img src="" alt="thể loại game" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="" alt="thể loại game" />
                        </SwiperSlide>{' '}
                        <SwiperSlide>
                            <img src="" alt="thể loại game" />
                        </SwiperSlide>{' '}
                        <SwiperSlide>
                            <img src="" alt="thể loại game" />
                        </SwiperSlide>{' '}
                        <SwiperSlide>
                            <img src="" alt="thể loại game" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <p>ưu đãi cuối tuần</p>
                            <img src="" alt="thể loại game" />
                        </SwiperSlide>
                    </Swiper>
                </div> */}
            </div>
        </div>
    )
}

export default Home
