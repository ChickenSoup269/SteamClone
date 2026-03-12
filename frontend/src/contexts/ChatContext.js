// src/contexts/ChatContext.js
import React, { createContext, useState, useContext } from 'react'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [isChatboxVisible, setChatboxVisible] = useState(false)

    const toggleChatbox = () => {
        setChatboxVisible((prev) => !prev)
    }

    return <ChatContext.Provider value={{ isChatboxVisible, toggleChatbox }}>{children}</ChatContext.Provider>
}

export const useChat = () => useContext(ChatContext)
