import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import HeadlessTippy from '@tippyjs/react/headless'

import { Wrapper as PopperWrapper } from '~/components/Popper'
import GameItem from '~/components/GameItem'
import classNames from 'classnames/bind'
import styles from './Search.module.scss'

const apiUrl = process.env.REACT_APP_API_URL

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([])
            return
        }

        setLoading(true)

        fetch(`${apiUrl}/search?query=${encodeURIComponent(searchValue)}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok')
                }
                return res.json()
            })
            .then((res) => {
                setSearchResult(res)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching search results:', error)
                setLoading(false)
            })
    }, [searchValue])

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(false)
    }

    return (
        <HeadlessTippy
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {searchResult.map((game) => (
                            <GameItem key={game.id} data={game} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Tìm kiếm"
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </HeadlessTippy>
    )
}

export default Search
