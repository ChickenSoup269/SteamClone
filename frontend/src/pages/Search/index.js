import React, { useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

function Search() {
    const cardRef = useRef(null)
    const imgRef = useRef(null)

    const map = (val, minA, maxA, minB, maxB) => {
        return minB + ((val - minA) * (maxB - minB)) / (maxA - minA)
    }

    const handleMouseMove = (ev) => {
        const card = cardRef.current
        const img = imgRef.current

        if (card && img) {
            const imgRect = card.getBoundingClientRect()
            const width = imgRect.width
            const height = imgRect.height
            const mouseX = ev.nativeEvent.offsetX
            const mouseY = ev.nativeEvent.offsetY
            const rotateY = map(mouseX, 0, width, -25, 25)
            const rotateX = map(mouseY, 0, height, 25, -25)
            const brightness = map(mouseY, 0, height, 1.5, 0.5)

            img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
            img.style.filter = `brightness(${brightness})`
        }
    }

    const handleMouseLeave = () => {
        const img = imgRef.current
        if (img) {
            img.style.transform = 'rotateX(0deg) rotateY(0deg)'
            img.style.filter = 'brightness(1)'
        }
    }

    return (
        <div className={cx('search_container')}>
            <div className={cx('card3d')} ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <img
                    src="https://steamcdn-a.akamaihd.net/steam/apps/457140/library_600x900_2x.jpg"
                    alt="image_header"
                    ref={imgRef}
                />
            </div>
        </div>
    )
}

export default Search
