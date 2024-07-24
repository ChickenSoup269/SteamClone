import axios from 'axios'
import { axiosJWT } from './UserService'

export const getAllGame = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/getAllGames`)
    return res.data
}

export const getDetailsGame = async (game_id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/detail/${game_id}`)
    return res.data
}

// search game header
export const getSearchGame = async (searchValue) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/search?query=${encodeURIComponent(searchValue)}`)
        return res.data
    } catch (error) {
        console.error('Error fetching search results:', error)
        throw error
    }
}

// GET  all category
export const getAllCategorylGerne = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getallGenresbyGame/`)
    return res.data
}

// Create game
export const createGame = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/insert`, data)
        if (res.data.status === 'ERR') {
            throw new Error(res.data.message) // Ném lỗi nếu phản hồi có trạng thái ERR
        }
        return res.data
    } catch (error) {
        throw error.response ? error.response.data : error // Ném lỗi nếu có lỗi từ API hoặc từ axios
    }
}

// Update game
export const updateGame = async (id, access_token, data) => {
    try {
        const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/update/${id}`, data, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        })
        if (res.data.status === 'ERR') {
            throw new Error(res.data.message) // Ném lỗi nếu phản hồi có trạng thái ERR
        }
        return res.data
    } catch (error) {
        throw error.response ? error.response.data : error // Ném lỗi nếu có lỗi từ API hoặc từ axios
    }
}

// Delete game
export const deleteGame = async (id, access_token) => {
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/delete/${id}`, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        })
        if (res.data.status === 'ERR') {
            throw new Error(res.data.message) // Ném lỗi nếu phản hồi có trạng thái ERR
        }
        return res.data
    } catch (error) {
        throw error.response ? error.response.data : error // Ném lỗi nếu có lỗi từ API hoặc từ axios
    }
}
