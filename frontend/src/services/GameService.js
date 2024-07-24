import axios from 'axios'

export const getAllGame = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/getAllGames`)
    return res.data
}

export const getDetailsGame = async (game_id, game_slug) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/detail/${game_id}/${game_slug}`)
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
