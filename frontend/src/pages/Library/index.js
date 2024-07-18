import classNames from 'classnames/bind'
import styles from './Library.module.scss'

const cx = classNames.bind(styles)

function Library() {
    return <div className={cx('wrapper_Library')}></div>
}

export default Library
