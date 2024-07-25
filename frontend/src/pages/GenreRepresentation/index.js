import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './GenreRepresentation.module.scss'

const cx = classNames.bind(styles)

function GenreRepresentation() {
    const [minPrice, setMinPrice] = useState(100000)
    const [maxPrice, setMaxPrice] = useState(100000)
    const rangeFill = useRef(null)

    useEffect(() => {
        if (minPrice > maxPrice) {
            const tempValue = minPrice
            setMinPrice(maxPrice)
            setMaxPrice(tempValue)
        }

        const minPercentage = ((minPrice - 10) / 990) * 100
        const maxPercentage = ((maxPrice - 10) / 990) * 100

        if (rangeFill.current) {
            rangeFill.current.style.left = `${minPercentage}%`
            rangeFill.current.style.width = `${maxPercentage - minPercentage}%`
        }
    }, [minPrice, maxPrice])

    return (
        <div className={cx('wrapper-genre-search')}>
            <div className={cx('leftcolumn')}>
                <div className={cx('card')}>
                    <h2>Game name</h2>
                    <h5>Ngày sản xuất game</h5>
                    <div className={cx('fakeimg')} style={{ height: '160px' }}>
                        Image
                    </div>
                    <p>Some text..</p>
                    <p>
                        Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco.
                    </p>
                </div>
            </div>
            <div className={cx('rightcolumn')}>
                <div className={cx('card')}>
                    <h4>Thu hẹp theo giá</h4>

                    <div className={cx('price-content')}>
                        <div>
                            <label>Min</label>
                            <p id="min-value">${minPrice}</p>
                        </div>

                        <div>
                            <label>Max</label>
                            <p id="max-value">${maxPrice}</p>
                        </div>
                    </div>

                    <div className={cx('range-slider')}>
                        <div ref={rangeFill} className={cx('range-fill')}></div>

                        <input
                            type="range"
                            className={cx('min-price')}
                            value={minPrice}
                            min="10"
                            max="1000000"
                            step="10"
                            onChange={(e) => setMinPrice(parseInt(e.target.value))}
                        />
                        <input
                            type="range"
                            className={cx('max-price')}
                            value={maxPrice}
                            min="50"
                            max="1000000"
                            step="10"
                            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        />
                    </div>
                </div>
                <div className={cx('card')}>
                    <h3>Popular Post</h3>
                    <div className={cx('fakeimg')}>
                        <img
                            src="https://shared.akamai.steamstatic.com/store_item_assets/steam/spotlights/9bc109124cf9a508fff2699e/spotlight_image_vietnamese.jpg?t=1721414884"
                            alt=""
                        />
                    </div>
                    <br />
                    <div className={cx('fakeimg')}>
                        <img
                            src="https://shared.akamai.steamstatic.com/store_item_assets/steam/spotlights/c77e092545574465bd382d1e/spotlight_image_vietnamese.jpg?t=1721668892"
                            alt=""
                        />
                    </div>
                    <br />
                </div>
                <div className={cx('card')}>
                    <h3>Follow Me</h3>
                    <p>Some text..</p>
                </div>
            </div>
        </div>
    )
}

export default GenreRepresentation
