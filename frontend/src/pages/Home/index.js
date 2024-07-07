import React, { useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

import classNames from 'classnames/bind'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)
// dữ liệu backend ở đây xóa hết chừa lại 1
const slides = [
    {
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/ss_6149b0570c42cda0e40b4de71e6f48bbe5c4c577.1920x1080.jpg?t=1716536507',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/header.jpg?t=1716536507',
        title: 'Game này hay',
        shortDescription: 'Đây là phần mô tả game cho ảnh 1',
        Sale: '70%',
        buttonUrl: '#11',
    },
    {
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/ss_df6aeb006060f7b26439f4bc7bee8b9e96c80e02.1920x1080.jpg?t=1717592174',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/header.jpg?t=1717592174',
        title: 'Game này cũng hay',
        shortDescription: 'Đây là phần mô tả game cho ảnh 2',
        Sale: '80%',
        buttonUrl: '#22',
    },
    {
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1203220/ss_473cb2a81ade2d62fd9f9a019c7af8cc77905cec.1920x1080.jpg?t=1718945821',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1203220/header.jpg?t=1718945821',
        title: 'Game thì bình thường',
        shortDescription: 'Đây là phần mô tả game cho ảnh 3',
        Sale: '50%',
        buttonUrl: '#33',
    },
    {
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/457140/ss_78d1c92edeecc7b17cafa9248867fe7d4390a0a0.1920x1080.jpg?t=1701909927',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/457140/header.jpg?t=1701909927',
        title: 'Game cũng được',
        shortDescription: 'Đây là phần mô tả game cho ảnh 4',
        Sale: '10%',
        buttonUrl: '#44',
    },
    {
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322330/ss_d053a7220a03ab689da9312c6d15fe8211401f55.1920x1080.jpg?t=1718840328',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322330/header.jpg?t=1718840328',
        title: 'Game rất hay',
        shortDescription: 'Đây là phần mô tả game cho ảnh 5',
        Sale: '90%',
        buttonUrl: '#55',
    },
    {
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2420110/ss_7c1ead4b3d952fd0fb92735397945bd8732bba53.1920x1080.jpg?t=1717622622',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2420110/header.jpg?t=1717622622',
        title: 'Game không tệ',
        shortDescription: 'Đây là phần mô tả game cho ảnh 6',
        Sale: '100%',
        buttonUrl: '#66',
    },
    {
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2303350/ss_115a3c751129367b9c3c95394e8a5e5bc4268017.1920x1080.jpg?t=1719248291',
        headerImg:
            'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2303350/header_alt_assets_3.jpg?t=1719248291',
        title: 'Game cũng ổn',
        shortDescription: 'Đây là phần mô tả game cho ảnh 7',
        Sale: '25%',
        buttonUrl: '#77',
    },
]
function Home() {
    const [mainImage, setMainImage] = useState(slides[0].img)
    const [imageInfo, setImageInfo] = useState({
        title: slides[0].title,
        shortDescription: slides[0].shortDescription,
        buttonUrl: slides[0].buttonUrl,
    })
    const [currentIndex, setCurrentIndex] = useState(0)

    const swiperRef = useRef(null)

    const handleThumbnailClick = (index) => {
        const slide = slides[index]
        setMainImage(slide.img)
        setImageInfo({
            title: slide.title,
            shortDescription: slide.shortDescription,
            buttonUrl: slide.buttonUrl,
        })
        setCurrentIndex(index)
    }

    const handleSlideChange = () => {
        const swiper = swiperRef.current.swiper
        const slideIndex = swiper.realIndex
        handleThumbnailClick(slideIndex)
    }

    const handleMouseEnter = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.stop()
        }
    }

    const handleMouseLeave = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.start()
        }
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('full-screen-slider')}>
                <div className={cx('full-screen-img-container')}>
                    <img className={cx('full-screen-img')} id="mainImage" src={mainImage} alt="BackgroundGameImg" />
                    <div className={cx('full-screen-content')}>
                        <h2 className={cx('title-game')}>{imageInfo.title}</h2>
                        <p className={cx('description-game')}>{imageInfo.shortDescription}</p>

                        <div className={cx('about-game-content')}>
                            <NavLink to={imageInfo.buttonUrl}>
                                <button className={cx('button-detail-game')}> Xem chi tiết</button>
                            </NavLink>
                            <div className={cx('add-card')} id="card">
                                <button className={cx('add-btn-card')}>Thêm vào giỏ hàng</button>
                            </div>
                            <div className={cx('steam-price')}>
                                <p className={cx('steam-price-old')}>990.000.00đ</p>
                                <p className={cx('steam-price-new')}>300.000.00đ</p>
                                <div className={cx('steam-percent-change')}>50%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Swiper
                    className={cx('game-swiper-container')}
                    slidesPerView={6}
                    speed={400}
                    slidesPerGroup={1}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 10000,
                        paginationClickable: true,
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                        },
                        // when window width is >= 480px
                        480: {
                            slidesPerView: 3,
                        },
                        640: {
                            slidesPerView: 4,
                        },
                        900: {
                            slidesPerView: 6,
                        },
                    }}
                    loop={true}
                    onSlideChange={handleSlideChange}
                    ref={swiperRef}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide
                            className={cx('game-swiper-slide')}
                            key={index}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                className={cx('img-header-games', {
                                    'img-header-games-active': index === currentIndex,
                                })}
                                src={slide.headerImg}
                                alt="GamePicture"
                                onClick={() => handleThumbnailClick(index)}
                            />
                            <img className={cx('glow')} src={slide.headerImg} alt="" />
                            <div className={cx('discount-badge')}>{slide.Sale}</div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={cx('games-swiper-category')}>
                <h2>xin chao</h2>
                <h2>xin chao</h2>
                <h2>xin chao</h2>
                <h2>xin chao</h2>
                <h2>xin chao</h2>
            </div>
            <div className={cx('games-swiper-game-category')}>
                <h3>xin chao</h3>
                <h3>xin chao</h3>
                <h3>xin chao</h3>
                <h3>xin chao</h3>
                <h3>xin chao</h3>
            </div>
        </header>
    )
}

export default Home
