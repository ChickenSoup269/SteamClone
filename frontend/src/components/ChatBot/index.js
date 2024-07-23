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
                <h2>Contacts</h2>
                <div className={cx('contact')}>
                    <div className={cx('pic', 'rogers')}>
                        {' '}
                        <img
                            src="https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/73/SMH_Mentor_6.png"
                            alt=""
                        />
                    </div>
                    <div className={cx('badge')}>14</div>
                    <div className={cx('name')}>Steve Rogers</div>
                    <div className={cx('message')}>That is America's ass 🇺🇸🍑</div>
                </div>
                <div className={cx('contact')}>
                    <div className={cx('pic', 'stark')}>
                        <img
                            src="https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/73/SMH_Mentor_6.png"
                            alt=""
                        />
                    </div>
                    <div className={cx('name')}>Tony Stark</div>
                    <div className={cx('message')}>
                        Uh, he's from space, he came here to steal a necklace from a wizard.
                    </div>
                </div>
                <div className={cx('contact')}>
                    <div className={cx('pic', 'banner')}>
                        <img
                            src="https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/73/SMH_Mentor_6.png"
                            alt=""
                        />
                    </div>
                    <div className={cx('badge')}>1</div>
                    <div className={cx('name')}>Bruce Banner</div>
                    <div className={cx('message')}>There's an Ant-Man *and* a Spider-Man?</div>
                </div>
                <div className={cx('contact')}>
                    <div className={cx('pic', 'thor')}>
                        {' '}
                        <img
                            src="https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/73/SMH_Mentor_6.png"
                            alt=""
                        />
                    </div>
                    <div className={cx('name')}>Thor Odinson</div>
                    <div className={cx('badge')}>3</div>
                    <div className={cx('message')}>I like this one</div>
                </div>
                <div className={cx('contact')}>
                    <div className={cx('pic', 'danvers')}>
                        {' '}
                        <img
                            src="https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/73/SMH_Mentor_6.png"
                            alt=""
                        />
                    </div>
                    <div className={cx('badge')}>2</div>
                    <div className={cx('name')}>Carol Danvers</div>
                    <div className={cx('message')}>Hey Peter Parker, you got something for me?</div>
                </div>
            </div>
            <div className={cx('chat')}>
                <div className={cx('contact', 'bar')}>
                    <div className={cx('pic', 'stark')}>
                        {' '}
                        <img
                            src="https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/73/SMH_Mentor_6.png"
                            alt=""
                        />
                    </div>
                    <div className={cx('name')}>Tony Stark</div>
                    <div className={cx('seen')}>Today at 12:56</div>
                    <div className={cx('close-chat-box')} onClick={toggleChatbox}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                </div>
                <div className={cx('messages')} id="chat">
                    <div className={cx('time')}>Today at 11:41</div>
                    <div className={cx('message', 'parker')}>Hey, man! What's up, Mr Stark? 👋</div>
                    <div className={cx('message', 'stark')}>Kid, where'd you come from?</div>
                    <div className={cx('message', 'parker')}>Field trip! 🤣</div>
                    <div className={cx('message', 'parker')}>Uh, what is this guy's problem, Mr. Stark? 🤔</div>
                    <div className={cx('message', 'stark')}>
                        Uh, he's from space, he came here to steal a necklace from a wizard.
                    </div>
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
