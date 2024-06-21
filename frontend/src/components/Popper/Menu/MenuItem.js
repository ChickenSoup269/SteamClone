import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

function MenuItem({ data, onClink }) {
    return (
        <Button className={cx('menu-item')} leftIcon={data.icon} to={data.to} onClick={onClink}>
            {data.title}
        </Button>
    )
}

export default MenuItem
