import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import * as GameService from '../../services/GameService'

import formatCurrency from '~/components/utilityFunction/formatCurrency'
import classNames from 'classnames/bind'
import styles from './GenreRepresentation.module.scss'

const cx = classNames.bind(styles)

function GenreRepresentation() {
    const [minPrice, setMinPrice] = useState(10000)
    const [maxPrice, setMaxPrice] = useState(5000000000)
    const rangeFill = useRef(null)

    const [stateGames, setStateGames] = useState([])
    const { genre_id } = useParams() // Destructure genre_id from URL parameters
    const navigate = useNavigate()

    const fetchAllGames = async () => {
        try {
            const res = await GameService.getDetailCategorylGerne(genre_id)
            setStateGames(res || []) // Ensure stateGames is always an array
        } catch (error) {
            console.error('Error fetching game details:', error)
        }
    }

    const handleDetailClick = (game_id, game_name) => {
        navigate(`/detail/${game_id}/${encodeURIComponent(game_name)}`)
    }

    useEffect(() => {
        fetchAllGames()
    }, [genre_id])

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
                <div className={cx('card-container')}>
                    {stateGames.length > 0 ? (
                        stateGames.map((game) => (
                            <div
                                key={game.game_id}
                                className={cx('card')}
                                onClick={() => handleDetailClick(game.game_id, game.game_name)}
                            >
                                <img src={game.poster_url} alt={game.game_name} />
                                <h2>{game.game_name}</h2>
                                <h5 className={cx('genre')}>{game.genre_ids.join(', ')}</h5>
                                <p className={cx('price')}>
                                    {formatCurrency(game?.option?.[0].priceDiscounted) || 'Price not available'}
                                </p>
                                {/* <p>{game.description}</p> */}
                            </div>
                        ))
                    ) : (
                        <p>No games available</p>
                    )}
                </div>
            </div>
            <div className={cx('rightcolumn')}>
                <div className={cx('card')}>
                    <h1> </h1>
                    <h4>Tìm game theo giá</h4>
                    <div className={cx('price-content')}>
                        <div>
                            <label>Giá thấp nhất</label>
                            <p id="min-value">{formatCurrency(minPrice)}</p>
                        </div>
                        <div>
                            <label>Giá cao nhất</label>
                            <p id="max-value">{formatCurrency(maxPrice)}</p>
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
