import classNames from 'classnames/bind'
import styles from './Notification.module.scss'

const cx = classNames.bind(styles)

function Notification() {
    return (
        <div className={cx('wrapper_notification')}>
            <div className={cx('notification')}>
                <h1 className={cx('notification__title')}>Thông Báo Quan Trọng</h1>
                <p className={cx('notification__message')}>
                    Chúng tôi vui mừng thông báo rằng phiên bản mới của trò chơi <strong>Adventure Quest</strong> đã
                    chính thức ra mắt! Cập nhật ngay bây giờ để trải nghiệm những tính năng mới hấp dẫn và sửa lỗi quan
                    trọng. Hãy kiểm tra thông tin chi tiết và cập nhật trò chơi để không bỏ lỡ bất kỳ điều gì thú vị.
                </p>
                <div className={cx('notification__actions')}>
                    <a href="/update" className={cx('notification__button', 'update-button')}>
                        Cập Nhật Ngay
                    </a>
                    <a href="/details" className={cx('notification__button', 'details-button')}>
                        Xem Chi Tiết
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Notification
