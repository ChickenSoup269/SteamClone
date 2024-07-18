import classNames from 'classnames/bind'
import styles from './404.module.scss'

const cx = classNames.bind(styles)

function PageError() {
    return (
        <div className={cx('wrapper_404')}>
            <div className={cx('page-error')}>
                <div className={cx('background_404')}></div>
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        </div>
    )
}

export default PageError
