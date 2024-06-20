import React, { useState } from 'react'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import MenuItem from './MenuItem'
import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

function Menu({ children, items = [] }) {
    const [isAnimating, setIsAnimating] = useState(false)

    const handleShow = () => {
        setIsAnimating(true)
    }

    const handleHide = () => {
        setIsAnimating(false)
    }

    const renderItems = () => {
        return items.map((item, index) => <MenuItem key={index} data={item} />)
    }
    return (
        <Tippy
            interactive
            trigger="click"
            placement="bottom-end"
            onShow={handleShow}
            onHide={handleHide}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-more-popper')}>{renderItems()}</PopperWrapper>
                </div>
            )}
        >
            {children({ isAnimating })}
        </Tippy>
    )
}

export default Menu
