import React, { useState } from 'react'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'

import { Wrapper as PopperWrapper } from '~/components/Popper'
import MenuItem from './MenuItem'
import Header from './Header'
import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

const defaultF = () => {}

function Menu({ children, items = [], onChange = defaultF }) {
    const [history, setHistory] = useState([{ data: items, title: 'Menu' }])
    const current = history[history.length - 1]

    const [isAnimating, setIsAnimating] = useState(false)

    const handleShow = () => {
        setIsAnimating(true)
    }

    const handleHide = () => {
        setIsAnimating(false)
    }

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClink={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children])
                        } else {
                            onChange(item)
                        }
                    }}
                />
            )
        })
    }
    return (
        <Tippy
            interactive
            trigger="click"
            placement="bottom-end"
            onShow={handleShow}
            onHide={() => {
                handleHide()
                setHistory((prev) => prev.slice(0, 1))
            }}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-more-popper')}>
                        {history.length > 1 && (
                            <Header
                                title={current.title}
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1))
                                }}
                            />
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children({ isAnimating })}
        </Tippy>
    )
}

export default Menu
