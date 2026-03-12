import classNames from 'classnames/bind'
import styles from './404.module.scss'
import { Wrapper } from '~/components/Popper'

const cx = classNames.bind(styles)

function PageError() {
    return (
        <div className={cx('wrapper_404')}>
            <div className={cx('page-error')}>
                <div className={cx('img-glow-test')}>
                    <img
                        src="https://i.pinimg.com/originals/89/bb/06/89bb06251fb7401e094b1f6d71f3d3f4.gif"
                        className={cx('background_404')}
                        alt=""
                    />
                </div>
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        </div>
    )
}

export default PageError
