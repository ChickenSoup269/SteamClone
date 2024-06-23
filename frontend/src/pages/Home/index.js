import classNames from 'classnames/bind'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('tab')}>
                    <img src="" alt="" id="1" name="slider" />
                    <img src="" alt="" id="2" name="slider" />
                    <img src="" alt="" id="3" name="slider" />
                    <div className={cx('button')}>
                        <label htmlFor="1"></label>
                        <label htmlFor="2"></label>
                        <label htmlFor="3"></label>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('box1')}></div>
                        <div className={cx('box2')}></div>
                        <div className={cx('box3')}></div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Home
