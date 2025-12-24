import React, { useState } from 'react'

import classNames from 'classnames/bind'
import styles from './ChatTogether.module.scss'
import Picker from 'emoji-picker-react'
import { NavLink } from 'react-router-dom'

const cx = classNames.bind(styles)

function ChatTogether() {
    const [activeChat, setActiveChat] = useState('person2')
    const [activePerson, setActivePerson] = useState('person2')
    const [message, setMessage] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const handlePersonClick = (chatId, personName) => {
        if (activePerson === chatId) {
            return
        } else {
            setActiveChat(chatId)
            setActivePerson(chatId)
        }
    }

    const handleEmojiClick = (event, emojiObject) => {
        setMessage(message + emojiObject.emoji)
    }

    return (
        <div className={cx('wrapper-chat-together')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <div className={cx('top')}>
                        <input type="text" />
                        <NavLink href="#" className={cx('search')}></NavLink>
                    </div>
                    <ul className={cx('people')}>
                        {['Trần Phước Thiện', 'Trần Tuấn Thọ', 'Nguyễn Kim Tín'].map((person) => (
                            <li
                                key={person}
                                className={cx('person', { active: activePerson === person })}
                                data-chat={person}
                                onClick={() => handlePersonClick(person, person)}
                            >
                                <img
                                    src={`https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png`}
                                    alt=""
                                />
                                <span className={cx('name')}>{person.replace('person', 'Person ')}</span>
                                <span className={cx('time')}>3:09 AM</span>
                                <span className={cx('preview')}>Code tới đâu rồi</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={cx('right')}>
                    <div className={cx('top')}>
                        <span>
                            To: <span className={cx('name')}>{activePerson.replace('person', 'Person ')}</span>
                        </span>
                    </div>
                    {['Trần Phước Thiện', 'Trần Tuấn Thọ', 'Nguyễn Kim Tín'].map((chat) => (
                        <div key={chat} className={cx('chat', { 'active-chat': activeChat === chat })} data-chat={chat}>
                            <div className={cx('conversation-start')}>
                                <span>Today, 6:48 AM</span>
                            </div>
                            <div className={cx('bubble', 'you')}>Chào em</div>
                            <div className={cx('bubble', 'you')}>Code tới đâu rồi em</div>
                            <div className={cx('bubble', 'you')}>Trả lời đi quơi</div>
                        </div>
                    ))}
                    <div className={cx('write')}>
                        <NavLink href="#" className={cx('write-link', 'attach')}></NavLink>
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                        <NavLink
                            href="#"
                            className={cx('write-link', 'smiley')}
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        ></NavLink>
                        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                        <NavLink href="#" className={cx('write-link', 'send')}></NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatTogether
