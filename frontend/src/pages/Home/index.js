import React, { useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/thumbs'
import 'swiper/css/autoplay'

import classNames from 'classnames/bind'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)
// dữ liệu backend ở đây xóa hết chừa lại 1
const slides = [
    {
        id: '1142710',
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/ss_6149b0570c42cda0e40b4de71e6f48bbe5c4c577.1920x1080.jpg?t=1716536507',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/header.jpg?t=1716536507',
        poster: 'https://steamcdn-a.akamaihd.net/steam/apps/1142710/library_600x900_2x.jpg',
        title: 'Total War: WARHAMMER III',
        oldPrice: '50.000vnđ',
        price: '100.000vnđ',
        shortDescription:
            'The cataclysmic conclusion to the Total War: WARHAMMER trilogy is here. Rally your forces and step into the Realm of Chaos, a dimension of mind-bending horror where the very fate of the world will be decided. Will you conquer your Daemons… or command them?',
        sale: '70%',
    },
    {
        id: '534380',
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/ss_df6aeb006060f7b26439f4bc7bee8b9e96c80e02.1920x1080.jpg?t=1717592174',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/header.jpg?t=1717592174',
        poster: 'https://steamcdn-a.akamaihd.net/steam/apps/534380/library_600x900_2x.jpg',
        title: 'Dying Light 2: Reloaded Edition',
        oldPrice: '50.000vnđ',
        price: '100.000vnđ',
        shortDescription:
            'Humanity is fighting a losing battle against the virus. Experience a post-apocalyptic open world overrun by hordes of zombies, where your parkour and combat skills are key to survival. Traverse the City freely during the day, but watch the monsters take over during the night.',
        sale: '80%',
    },
    {
        id: '1203220',
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1203220/ss_473cb2a81ade2d62fd9f9a019c7af8cc77905cec.1920x1080.jpg?t=1718945821',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1203220/header.jpg?t=1718945821',
        poster: 'https://steamcdn-a.akamaihd.net/steam/apps/1203220/library_600x900_2x.jpg',
        title: 'NARAKA: BLADEPOINT',
        oldPrice: '50.000vnđ',
        price: '100.000vnđ',
        shortDescription:
            'Dive into the legends of the Far East in NARAKA: BLADEPOINT; team up with friends in fast-paced melee fights for a Battle Royale experience unlike any other. Find your playstyle with a varied cast of heroes with unique skills. More than 20 million players have already joined the fray, play free now!',
        sale: '50%',
    },
    {
        id: '457140',
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/457140/ss_78d1c92edeecc7b17cafa9248867fe7d4390a0a0.1920x1080.jpg?t=1701909927',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/457140/header.jpg?t=1701909927',
        poster: 'https://steamcdn-a.akamaihd.net/steam/apps/457140/library_600x900_2x.jpg',
        title: 'Oxygen Not Included',
        oldPrice: '50.000vnđ',
        price: '100.000vnđ',
        shortDescription:
            'Oxygen Not Included is a space-colony simulation game. Deep inside an alien space rock your industrious crew will need to master science, overcome strange new lifeforms, and harness incredible space tech to survive, and possibly, thrive.',
        sale: '10%',
    },
    {
        id: '322330',
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322330/ss_d053a7220a03ab689da9312c6d15fe8211401f55.1920x1080.jpg?t=1718840328',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322330/header.jpg?t=1718840328',
        poster: 'https://steamcdn-a.akamaihd.net/steam/apps/322330/library_600x900_2x.jpg',
        title: "Don't Starve Together",
        oldPrice: '5.000.000vnđ',
        price: '1.000.000vnđ',
        shortDescription:
            "Fight, Farm, Build and Explore Together in the standalone multiplayer expansion to the uncompromising wilderness survival game, Don't Starve.",
        sale: '90%',
    },
    {
        id: '2420110',
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2420110/ss_7c1ead4b3d952fd0fb92735397945bd8732bba53.1920x1080.jpg?t=1717622622',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2420110/header.jpg?t=1717622622',
        poster: 'https://steamcdn-a.akamaihd.net/steam/apps/2420110/library_600x900_2x.jpg',
        title: 'Horizon Forbidden West™ Complete Edition',
        oldPrice: '52.000vnđ',
        price: '200.000vnđ',
        shortDescription:
            'Experience the epic Horizon Forbidden West™ in its entirety with bonus content and the Burning Shores expansion included. The Burning Shores add-on contains additional content for Aloy’s adventure, including new storylines, characters, and experiences in a stunning yet hazardous new area.',
        sale: '100%',
    },
    {
        id: '2303350',
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2303350/ss_115a3c751129367b9c3c95394e8a5e5bc4268017.1920x1080.jpg?t=1719248291',
        headerImg:
            'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2303350/header_alt_assets_3.jpg?t=1719248291',
        poster: 'https://steamcdn-a.akamaihd.net/steam/apps/2303350/library_600x900_2x.jpg',
        title: 'Sticky Business',
        oldPrice: '10.000vnđ',
        price: '140.000vnđ',
        shortDescription:
            'Experience the joy of running your own cozy small business: Create stickers, pack orders and hear your customers’ stories. Time to build the cutest shop on the internet!',
        sale: '25%',
    },
]

// const categories = [
//     {
//         type: 'giải đố',
//         id: '01',
//         src: 'https://store.steampowered.com/categories/homepageimage/category/rogue_like_rogue_lite?cc=us&l=vietnamese',
//     },
//     {
//         type: 'anime',
//         id: '02',
//         src: 'https://store.steampowered.com/categories/homepageimage/category/anime?cc=us&l=vietnamese',
//     },
//     {
//         type: 'kinh dị',
//         id: '03',
//         src: 'https://store.steampowered.com/categories/homepageimage/category/horror?cc=us&l=vietnamese',
//     },
//     {
//         type: 'chơi miễn phí',
//         id: '04',
//         src: 'https://store.steampowered.com/categories/homepageimage/category/casual?cc=us&l=vietnamese',
//     },
//     {
//         type: 'đơn giản',
//         id: '05',
//         src: 'https://store.steampowered.com/categories/homepageimage/category/fighting_martial_arts?cc=us&l=vietnamese',
//     },
// ]

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
    {
        type: 'Fun',
        games: [
            {
                id: '1',
                src: 'https://steamcdn-a.akamaihd.net/steam/apps/1142710/library_600x900_2x.jpg',
                alt: 'Horror Game 1',
            },
            {
                id: '3',
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
]
function Home() {
    const [mainImage, setMainImage] = useState(slides[0].img)
    const [imageInfo, setImageInfo] = useState({
        id: slides[0].id,
        title: slides[0].title,
        oldPrice: slides[0].oldPrice,
        price: slides[0].price,
        sale: slides[0].sale,
        poster: slides[0].poster,
        shortDescription: slides[0].shortDescription,
    })
    const [currentIndex, setCurrentIndex] = useState(0)
    // eslint-disable-next-line no-unused-vars
    const [slideInClass, setSlideInClass] = useState('')

    const swiperRef = useRef(null)

    const handleThumbnailClick = (index) => {
        const slide = slides[index]
        setMainImage(slide.img)
        setImageInfo({
            id: slide.id,
            title: slide.title,
            oldPrice: slide.oldPrice,
            price: slide.price,
            sale: slide.sale,
            poster: slide.poster,
            shortDescription: slide.shortDescription,
        })
        setCurrentIndex(index)
    }

    const handleSlideChange = () => {
        const swiper = swiperRef.current.swiper
        const slideIndex = swiper.realIndex

        setSlideInClass('')
        setTimeout(() => {
            setSlideInClass('slide-in')
        }, 0)
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
        <div className={cx('wrapper')}>
            <div className={cx('full-screen-slider')}>
                <div className={cx('full-screen-img-container')}>
                    <img className={cx('full-screen-img')} id="mainImage" src={mainImage} alt="BackgroundGameImg" />
                    <div className={cx('full-screen-content')}>
                        <h2 className={cx('title-game')}>{imageInfo.title}</h2>
                        <p className={cx('description-game')}>{imageInfo.shortDescription}</p>

                        <div className={cx('about_game_content')}>
                            <div className={cx('poster_game_full_img')}>
                                <img src={imageInfo.poster} alt="" />
                            </div>
                            <div className={cx('info_button_price_game')}>
                                <div className={cx('button_info_game')}>
                                    <NavLink to={imageInfo.id}>
                                        <button className={cx('button-detail-game')}> Xem chi tiết</button>
                                    </NavLink>
                                    <div className={cx('add-card')} id="card">
                                        <button className={cx('add-btn-card')}>Thêm vào giỏ hàng</button>
                                    </div>
                                </div>

                                <div className={cx('product-price-steam')}>
                                    <p className={cx('last-price')}>
                                        Giá gốc: <strike>{imageInfo.oldPrice}</strike>
                                    </p>
                                    <p className={cx('new-price')}>
                                        Giá giảm còn: <span>{imageInfo.price}</span>{' '}
                                        <span className={cx('sale_price_percent')}>{imageInfo.sale}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                    {slides.map((slide, index) => (
                        <SwiperSlide
                            className={cx('game_swiper_slide')}
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
                            <div className={cx('discount-badge')}>{slide.sale}</div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className={cx('content_game_poster')}>
                {/* Slide thể loại */}
                <div className={cx('swiper_background_genres')}>
                    <h2>Duyện theo thể loại</h2>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        slidesPerView={4}
                        spaceBetween={15}
                        navigation={true}
                        pagination={{ clickable: true }}
                        className={cx('swiper_game_genres')}
                    >
                        <SwiperSlide>
                            <img
                                src="https://store.steampowered.com/categories/homepageimage/category/action?cc=us&l=vietnamese"
                                alt="thể loại game"
                            />
                            <h3>Sinh tồn</h3>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://store.steampowered.com/categories/homepageimage/category/rogue_like_rogue_lite?cc=us&l=vietnamese"
                                alt="thể loại game"
                            />
                            <h3>hành động</h3>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://store.steampowered.com/categories/homepageimage/category/anime?cc=us&l=vietnamese"
                                alt="thể loại game"
                            />
                            <h3> khoa học viễn tưởng</h3>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://store.steampowered.com/categories/homepageimage/category/horror?cc=us&l=vietnamese"
                                alt="thể loại game"
                            />
                            <h3>Đua tốc độ</h3>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://store.steampowered.com/categories/homepageimage/category/casual?cc=us&l=vietnamese"
                                alt="thể loại game"
                            />
                            <h3>Nhập vai</h3>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://store.steampowered.com/categories/homepageimage/category/fighting_martial_arts?cc=us&l=vietnamese"
                                alt="thể loại game"
                            />
                            <h3>Đối kháng</h3>
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/* Slide thể loại đại diện game */}
                {categoriesPoster.map((category, index) => (
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
