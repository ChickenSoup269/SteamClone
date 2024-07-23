import classNames from 'classnames/bind'
import styles from './GenreRepresentation.module.scss'

const cx = classNames.bind(styles)

function GenreRepresentation() {
    return (
        <div className={cx('wrapper-genre-search')}>
            <div className={cx('leftcolumn')}>
                <div className={cx('card')}>
                    <h2>TITLE HEADING</h2>
                    <h5>Title description, Dec 7, 2017</h5>
                    <div className={cx('fakeimg')} style={{ height: '200px' }}>
                        Image
                    </div>
                    <p>Some text..</p>
                    <p>
                        Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco.
                    </p>
                </div>
                <div className={cx('card')}>
                    <h2>TITLE HEADING</h2>
                    <h5>Title description, Sep 2, 2017</h5>
                    <div className={cx('fakeimg')} style={{ height: '200px' }}>
                        Image
                    </div>
                    <p>Some text..</p>
                    <p>
                        Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco.
                    </p>
                </div>
            </div>
            <div className={cx('rightcolumn')}>
                <div className={cx('card')}>
                    <h2>About Me</h2>
                    <div className={cx('fakeimg')} style={{ height: '100px' }}>
                        Image
                    </div>
                    <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
                </div>
                <div className={cx('card')}>
                    <h3>Popular Post</h3>
                    <div className={cx('fakeimg')}>Image</div>
                    <br />
                    <div className={cx('fakeimg')}>Image</div>
                    <br />
                    <div className={cx('fakeimg')}>Image</div>
                </div>
                <div className={cx('card')}>
                    <h3>Follow Me</h3>
                    <p>Some text..</p>
                </div>
            </div>
        </div>
    )
}

export default GenreRepresentation
