import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import HeadlessTippy from '@tippyjs/react/headless'
import { Wrapper as PopperWrapper } from '~/components/Popper'

import { getSearchGame } from '../../../services/GameService'
import GameItem from '~/components/GameItem'
import { NavLink } from 'react-router-dom'
import { useDebounce } from '~/hooks'
import classNames from 'classnames/bind'
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)

    const debounce = useDebounce(searchValue, 500)

    const inputRef = useRef()
    const searchResultRef = useRef()

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([])
            return
        }

        setLoading(true)

        getSearchGame(debounce)
            .then((res) => {
                setSearchResult(res)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching search results:', error)
                setLoading(false)
            })
    }, [debounce])

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(false)
    }

    const handleClickOutside = (event) => {
        if (
            searchResultRef.current &&
            !searchResultRef.current.contains(event.target) &&
            !inputRef.current.contains(event.target)
        ) {
            handleHideResult()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <HeadlessTippy
                visible={showResult && searchResult.length > 0}
                interactive={true}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs} ref={searchResultRef}>
                        <PopperWrapper>
                            {searchResult.map((game) => (
                                <GameItem key={game.id} data={game} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
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
                    <NavLink to={'/search'}>
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </NavLink>
                </div>
            </HeadlessTippy>
        </div>
    )
}

export default Search
