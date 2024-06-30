import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

function MenuItem({ data, onClink }) {
    const classes = cx('menu-item', {
        line: data.line,
    })

    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClink}>
            {data.title}
        </Button>
    )
}

export default MenuItem
