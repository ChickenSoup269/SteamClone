import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
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
        shortDescription:
            'The cataclysmic conclusion to the Total War: WARHAMMER trilogy is here. Rally your forces and step into the Realm of Chaos, a dimension of mind-bending horror where the very fate of the world will be decided. Will you conquer your Daemons… or command them?',

        media: [
            {
                type: 'video',
                vid: 'https://cdn.akamai.steamstatic.com/steam/apps/256930877/movie_max_vp9.webm?t=1676554676',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256930877/movie.293x165.jpg?t=1676554676',
            },
            {
                type: 'video',
                vid: 'https://cdn.akamai.steamstatic.com/steam/apps/256874322/movie_max_vp9.webm?t=1645093986',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256874322/movie.293x165.jpg?t=1645093986',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/ss_6149b0570c42cda0e40b4de71e6f48bbe5c4c577.1920x1080.jpg?t=1719611574',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/ss_320f5373c16e33f50c0ee2ccc822344c0e0d5f8d.1920x1080.jpg?t=1719611574',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/ss_4afac709f1bfe992122e315852cf6ea2f58b28ba.1920x1080.jpg?t=1719611574',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/ss_086d9d777d14d64c9e8bc1713b088381033dfeeb.1920x1080.jpg?t=1719611574',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/ss_77d1f2d9a162b8ddf6f84a210ee39c3b74ee576a.1920x1080.jpg?t=1719611574',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/ss_a55fad2780446067c6eb8079c92a5bd218e1b542.1920x1080.jpg?t=1719611574',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/ss_b92530cc6fc9c4cb0f066eb42983bf7ca17b478b.1920x1080.jpg?t=1719611574',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/ss_f2876f3cb6f313d8f1271596b259fc47a69d4c15.1920x1080.jpg?t=1719611574',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/ss_8c43a21dcb0af8114168c97159361dee76b39c32.1920x1080.jpg?t=1719611574',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/ss_096cc26ed1c7a96e8e4fb7c2df71472c1b8b951a.1920x1080.jpg?t=1719611574',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/ss_2217d0c20782e838586373036c6abb60dcdc7059.1920x1080.jpg?t=1719611574',
            },
        ],

        price: {
            0: '120.000vnđ',
            1: '500.000vnđ',
            2: '990.000vnđ',
            3: '1.200.000vnđ',
            4: '3.500.000vnđ',
        },
        oldPrice: {
            0: '600.000vnđ',
            1: '1.000.000vnđ',
            2: '3.990.000vnđ',
            3: '4.200.000vnđ',
            4: '15.500.000vnđ',
        },
        sale: { 0: '80%', 1: '20%', 2: '30%', 3: '40%', 4: '50%' },

        gameEdition: {
            0: 'Total War THREE KINGDOM cccS',
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
    {
        id: '534380',
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/ss_df6aeb006060f7b26439f4bc7bee8b9e96c80e02.1920x1080.jpg?t=1717592174',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/header.jpg?t=1717592174',
        poster: 'https://steamcdn-a.akamaihd.net/steam/apps/534380/library_600x900_2x.jpg',
        title: 'Dying Light 2: Reloaded Edition',
        shortDescription:
            'Humanity is fighting a losing battle against the virus. Experience a post-apocalyptic open world overrun by hordes of zombies, where your parkour and combat skills are key to survival. Traverse the City freely during the day, but watch the monsters take over during the night.',

        media: [
            {
                type: 'video',
                vid: 'https://cdn.akamai.steamstatic.com/steam/apps/257002864/movie_max_vp9.webm?t=1715946611',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257002864/movie.293x165.jpg?t=1715946611',
            },
            {
                type: 'video',
                vid: 'https://cdn.akamai.steamstatic.com/steam/apps/257034263/movie_max_vp9.webm?t=1719497639',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257034263/movie.293x165.jpg?t=1719497639',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/ss_df6aeb006060f7b26439f4bc7bee8b9e96c80e02.1920x1080.jpg?t=1719579337',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/ss_9ba79964c3878648a1469d263df7fb17fc3d521c.1920x1080.jpg?t=1719579337',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/ss_d7906b3946d4857d28c159e7a1555a003a4426f8.1920x1080.jpg?t=1719579337',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/ss_6b8d4cc1f7d657745cfd7aab941d3be0067dec00.1920x1080.jpg?t=1719579337',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/ss_84ca00f3d3b48e0a1fa6b96b17f02a65f1447950.1920x1080.jpg?t=1719579337',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/ss_28860dda506d28aea744a08744bad8afb1b506c5.1920x1080.jpg?t=1719579337',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/ss_64ba1a8bd42d3d0a34bc894d6faa0e57a1328aef.1920x1080.jpg?t=1719579337',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/ss_38ca559ee79b64ef65f6d5c5c722778f6447425e.1920x1080.jpg?t=1719579337',
            },
            {
                type: 'image',
                url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/534380/ss_1c3c5764cc6d6a9a86122a0de643973c0c8dca1b.1920x1080.jpg?t=1719579337',
            },
        ],

        price: {
            0: '130.000vnđ',
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
            0: 'Total War THREE KINGDOM c231323232323232ccS',
            1: 'Total War THREE KINGDOMS Deluxe Edition',
            2: 'Total War THREE KINGDOMS Silver Edition',
            3: 'Total War THREE KINGDOMS Gold Edition',
            4: 'Total War THREE KINGDOMS God Edition',
        },

        date: '29/04/2023',
        developers: 'Techland',
        publisher: 'Techland',
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
    {
        id: '1203220',
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1203220/ss_473cb2a81ade2d62fd9f9a019c7af8cc77905cec.1920x1080.jpg?t=1718945821',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1203220/header.jpg?t=1718945821',
        poster: 'https://steamcdn-a.akamaihd.net/steam/apps/1203220/library_600x900_2x.jpg',
        title: 'NARAKA: BLADEPOINT',
        shortDescription:
            'Dive into the legends of the Far East in NARAKA: BLADEPOINT; team up with friends in fast-paced melee fights for a Battle Royale experience unlike any other. Find your playstyle with a varied cast of heroes with unique skills. More than 20 million players have already joined the fray, play free now!',

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
            0: 'Total War THREE KINGDOM cccS',
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
    {
        id: '457140',
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/457140/ss_78d1c92edeecc7b17cafa9248867fe7d4390a0a0.1920x1080.jpg?t=1701909927',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/457140/header.jpg?t=1701909927',
        poster: 'https://steamcdn-a.akamaihd.net/steam/apps/457140/library_600x900_2x.jpg',
        title: 'Oxygen Not Included',
        shortDescription:
            'Oxygen Not Included is a space-colony simulation game. Deep inside an alien space rock your industrious crew will need to master science, overcome strange new lifeforms, and harness incredible space tech to survive, and possibly, thrive.',
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
            0: 'Total War THREE KINGDOM cccS',
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
    {
        id: '322330',
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322330/ss_d053a7220a03ab689da9312c6d15fe8211401f55.1920x1080.jpg?t=1718840328',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322330/header.jpg?t=1718840328',
        poster: 'https://steamcdn-a.akamaihd.net/steam/apps/322330/library_600x900_2x.jpg',
        title: "Don't Starve Together",

        shortDescription:
            "Fight, Farm, Build and Explore Together in the standalone multiplayer expansion to the uncompromising wilderness survival game, Don't Starve.",
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
            0: 'Total War THREE KINGDOM cccS',
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
    {
        id: '2420110',
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2420110/ss_7c1ead4b3d952fd0fb92735397945bd8732bba53.1920x1080.jpg?t=1717622622',
        headerImg: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2420110/header.jpg?t=1717622622',
        poster: 'https://steamcdn-a.akamaihd.net/steam/apps/2420110/library_600x900_2x.jpg',
        title: 'Horizon Forbidden West™ Complete Edition',

        shortDescription:
            'Experience the epic Horizon Forbidden West™ in its entirety with bonus content and the Burning Shores expansion included. The Burning Shores add-on contains additional content for Aloy’s adventure, including new storylines, characters, and experiences in a stunning yet hazardous new area.',
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
            0: 'Total War THREE KINGDOM cccS',
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
    {
        id: '2303350',
        img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2303350/ss_115a3c751129367b9c3c95394e8a5e5bc4268017.1920x1080.jpg?t=1719248291',
        headerImg:
            'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2303350/header_alt_assets_3.jpg?t=1719248291',
        poster: 'https://steamcdn-a.akamaihd.net/steam/apps/2303350/library_600x900_2x.jpg',
        title: 'Sticky Business',
        shortDescription:
            'Experience the joy of running your own cozy small business: Create stickers, pack orders and hear your customers’ stories. Time to build the cutest shop on the internet!',
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
            0: 'Total War THREE KINGDOM cccS',
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
    const [mainImage, setMainImage] = useState(slides[0].img)
    const [imageInfo, setImageInfo] = useState({
        id: slides[0].id,
        headerImg: slides[0].headerImg,
        title: slides[0].title,
        oldPrice: slides[0].oldPrice,
        price: slides[0].price,
        sale: slides[0].sale,
        poster: slides[0].poster,
        date: slides[0].date,
        gameEdition: slides[0].gameEdition,
        developers: slides[0].developers,
        publisher: slides[0].publisher,
        shortDescription: slides[0].shortDescription,
        media: slides[0].media, // Lưu trữ toàn bộ media từ slides

        description: slides[0].description,
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
            headerImg: slide.headerImg,
            title: slide.title,
            oldPrice: slide.oldPrice,
            price: slide.price,
            sale: slide.sale,
            poster: slide.poster,
            date: slide.date,
            gameEdition: slide.gameEdition,
            developers: slide.developers,
            publisher: slide.publisher,
            shortDescription: slide.shortDescription,
            media: slide.media,
            description: slide.description,
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

    const navigate = useNavigate()

    const handleDetailClick = () => {
        navigate(`/gamedetails/${imageInfo.id}`, { state: { imageInfo } })
        // console.log(`/gamedetails/${imageInfo.id}`, { state: { imageInfo } })
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
                                <img src={imageInfo.poster} alt="Game Poster" />
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
                                    <p className={cx('last-price')}>
                                        Giá gốc: <strike>{imageInfo.oldPrice[0]}</strike>
                                    </p>
                                    <p className={cx('new-price')}>
                                        Giá giảm còn: <span>{imageInfo.price[0]}</span>{' '}
                                        <span className={cx('sale_price_percent')}>{imageInfo.sale[0]}</span>
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
                            <div className={cx('discount-badge')}>{slide.sale[0]}</div>
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

                {/* featured games */}
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
