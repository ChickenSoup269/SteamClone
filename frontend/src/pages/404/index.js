import classNames from 'classnames/bind'
import styles from './404.module.scss'

const cx = classNames.bind(styles)

function PageError() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('page-error')}>
                <h1>Test</h1>
            </div>
        </div>
    )
}

export default PageError
