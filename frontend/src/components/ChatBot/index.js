import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'
import styles from './ChatBot.modules.scss' // Ensure the filename matches
import { useChat } from '../../contexts/ChatContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCamera, faClose, faLaughBeam, faMicrophone } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

const Chatbox = () => {
    const { isChatboxVisible, toggleChatbox } = useChat()

    if (!isChatboxVisible) return null

    return ReactDOM.createPortal(
        <div className={cx('chatbox')}>
            <div className={cx('contacts')}>
                <FontAwesomeIcon icon={faBars} className={cx('fas', 'fa-bars', 'fa-2x')} />
                <h2>Mọi người</h2>
                <div className={cx('contact')}>
                    <div className={cx('pic', 'rogers')}>
                        {' '}
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu8L-U4J52M78FwsXjH2rwpicIpG4BrZB0p9sx9-6NtmcCv6HsUrA72cx5Z47sJ1BYBPI&usqp=CAU"
                            alt=""
                        />
                    </div>
                    <div className={cx('badge')}>14</div>
                    <div className={cx('name')}>Bot Zero</div>
                    <div className={cx('message')}>Game của bạn đã tìm kiếm là</div>
                </div>
                <div className={cx('contact')}>
                    <div className={cx('pic', 'stark')}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu8L-U4J52M78FwsXjH2rwpicIpG4BrZB0p9sx9-6NtmcCv6HsUrA72cx5Z47sJ1BYBPI&usqp=CAU"
                            alt=""
                        />
                    </div>
                    <div className={cx('badge')}>1</div>

                    <div className={cx('name')}>Trần Phước Thiện</div>
                    <div className={cx('message')}>Thiện deptrai đã gửi lời mời kết bạn!</div>
                </div>
                <div className={cx('contact')}>
                    <div className={cx('pic', 'banner')}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu8L-U4J52M78FwsXjH2rwpicIpG4BrZB0p9sx9-6NtmcCv6HsUrA72cx5Z47sJ1BYBPI&usqp=CAU"
                            alt=""
                        />
                    </div>
                    <div className={cx('badge')}>1</div>
                    <div className={cx('name')}>Trần Tuấn Thọ</div>
                    <div className={cx('message')}>Đi ăn new nướng Nha Trang chỉ với 59k</div>
                </div>
                <div className={cx('contact')}>
                    <div className={cx('pic', 'thor')}>
                        {' '}
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEUNfoD///8Ae30AeHoAdXcAdnl6q6z2+/vo8vLx+Ph1sbIAdHfu9PQHfH8AgYPl8vI7kJKRvr+hx8jO4+PJ3d4eioxppqja6eni7OxdoqRSnqC42dqXxsaw09Ntra8ph4l/uLmGtrdapqeozc02lZdMmZuuzM3A2NnU4+SRvL2fy8xSmZpEkZO+1NV1qaqNxlfBAAAEIElEQVR4nO3bXXeiOhQGYNgJg6AiiIiggtbP0U7//8+beJzjoCYtSAQ7630uetVmvZuEEOnWMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvjNi3Ii8rkWtpuiLGCyKxA/dOchIZ3FPmGc5tVckGf4iPMUIA9/QGYNoEZr/c4Y+0zh2FSydX2KY00RfDDJ2ZlEnbadEa+EUYziBrlkkPzav2W4rJc5vYphzTQPTbYGixBZmkc/uYphDPTG29yObHb/p7YYSSQxzqSEGJbZs6FX9kavJQ1mMQV6/RDaVjWzaDU8i/ZDGMBf116knH1nH0FUoLrQ5qR2D3hQVhl0dwUvjihh2VHctsZVqaC3By6K1IoaZ1a2Qj5QXr68leznKpWQu6y5Tfv8wbKXC7HkV7hQjN1xh+rQKmeQkca6w0acFRaoKa9+HyosXci3Ry7Kk5w4de6lhKCps+nl4d+w+q/88VD0uHA3HpSpoLJ/ErH6FdHRkIw+b3GdOPOljK841DE2yvWaiYflXjLGWTKLtaolB9w8Me938uxq+uC8x0LMZUHRboqNh9T+QY3lb4ErXrUL92dXli6N23tPwt04xRsfV+MCi5O+Hl8Gy4W20EMMvXOrhRut1Jsrd+WQy2c82Wt9TVo7hpatY5FhlhvbXtsQsLmh/11w9x0vEAAAAAAAAAAAAAAAAgH8KMc/4l/8HRXyz3e2GLf07uqD/nO+fkLHZ2eeWgnZnkVi0ifSvJOLJpUXKTtoskfxdp9fZb7TWSETprtA50XCD3RWW/Qky19dUQCx3b7r2PV1jV+dd+sU6M88iDc0v1I2Cu5bextuzLqyrdrGgdhOHmL6xrGM/0hP3EfurIM42YY/fkMRYOpR2ZDvt3Yfe/iaLPVn4j7TBiL0l9xexooe24UbXIkvWL7n7uSGryh1JjEfjofQrQefV/7T8X2OuNFIvnq3FmisxlyR+zYoWo4Fi9oRB1kAhapbyytvT4OM9OpUpr1PUZhnR8SOYqosT4sxq99AmHvifxBuEo2G2iXiXc1bEeddYp8vtaN/55K9P9bntH0qJZV+kFHrh9HAI3P8sDodVqL7nCuzwrc0Wwr9YFEjbxGuy5+MWv1F+jcgPPr2XHtAL3l9j/v4Qny+CUguvHGfnvt7n3r44LSu+IFnVIDgarW8vUsSjmepQUnr24iB65dZZYt54NXi8vtEw9V64vDOx/fmHuPre6vSmWa6/r/s5xDls7W7D8lU64fZn6vFvUt4ZMcrfk2D69VnAmQbj95xefm3KiHMn73prN/g1CuO441zm1HacQRyHo19Btva6vMz5/JWd6jQ83z8mx48fZ8kx2fi5R9++tiKiPl1rOxEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALy43/ipMgzSotaqAAAAAElFTkSuQmCC"
                            alt=""
                        />
                    </div>
                    <div className={cx('name')}>Nguyễn Kim Tín</div>
                    <div className={cx('badge')}>3</div>
                    <div className={cx('message')}>I like this one</div>
                </div>
            </div>
            <div className={cx('chat')}>
                <div className={cx('contact', 'bar')}>
                    <div className={cx('pic', 'stark')}>
                        {' '}
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu8L-U4J52M78FwsXjH2rwpicIpG4BrZB0p9sx9-6NtmcCv6HsUrA72cx5Z47sJ1BYBPI&usqp=CAU"
                            alt=""
                        />
                    </div>
                    <div className={cx('name')}>Phương Nghi</div>
                    <div className={cx('seen')}>Hôm nay lúc 12:56PM</div>
                    <div className={cx('close-chat-box')} onClick={toggleChatbox}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                </div>
                <div className={cx('messages')} id="chat">
                    <div className={cx('time')}>Today at 11:41</div>
                    <div className={cx('message', 'parker')}>Chào bạn, bạn code xong chưa?</div>
                    <div className={cx('message', 'stark')}>Nah bro code tôi bug quá nhiều 💀</div>

                    <div className={cx('message', 'stark')}>
                        <div className={cx('typing', 'typing-1')}></div>
                        <div className={cx('typing', 'typing-2')}></div>
                        <div className={cx('typing', 'typing-3')}></div>
                    </div>
                </div>
                <div className={cx('input')}>
                    <FontAwesomeIcon icon={faCamera} className={cx('i')} />
                    <FontAwesomeIcon icon={faLaughBeam} className={cx('i')} />
                    <input className={cx('input-field')} placeholder="Type your message here!" type="text" />
                    <FontAwesomeIcon icon={faMicrophone} className={cx('i')} />
                </div>
            </div>
        </div>,
        document.body,
    )
}

export default Chatbox
