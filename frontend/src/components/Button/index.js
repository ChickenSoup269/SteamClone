import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    primary = false,
    outline = false,
    small = false,
    medium = false,
    large = false,
    leftIcon,
    rightIcon,
    children,
    className,
    disabled,
    onClick,
    ...passProps
}) {
    let Comp = 'button'
    const props = {
        onClick,
        ...passProps,
    }

    // Remove event listener when button disable
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key]
            }
        })
    }

    if (to) {
        Comp = Link
        props.to = to
    } else if (href) {
        Comp = 'a'
        props.href = href
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        disabled,
        small,
        medium,
        large,
    })

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    )
}

export default Button
