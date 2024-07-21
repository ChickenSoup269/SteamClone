import axios from 'axios'

export const getAllGame = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/getAllGames`)
    return res.data
}

export const getDetailsGame = async (game_id, game_slug) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/detail/${game_id}/${game_slug}`)
    return res.data
}
