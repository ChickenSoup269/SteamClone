import axios from 'axios'

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data)
        if (res.data.status === 'ERR') {
            throw new Error(res.data.message) // Ném lỗi nếu phản hồi có trạng thái ERR
        }
        return res.data
    } catch (error) {
        throw error.response ? error.response.data : error // Ném lỗi nếu có lỗi từ API hoặc từ axios
    }
}

export const signupUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)
        if (res.data.status === 'ERR') {
            throw new Error(res.data.message) // Ném lỗi nếu phản hồi có trạng thái ERR
        }
        return res.data
    } catch (error) {
        throw error.response ? error.response.data : error // Ném lỗi nếu có lỗi từ API hoặc từ axios
    }
}

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
        headers: {
            token: `Beare ${access_token}`,
        },
    })
    return res.data
}

export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
        withCredentials: true,
    })
    return res.data
}

export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`)
    return res.data
}

export const updateUser = async (id, access_token, data) => {
    try {
        const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        })
        if (res.data.status === 'ERR') {
            throw new Error(res.data.message); // Ném lỗi nếu phản hồi có trạng thái ERR
        }
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : error; // Ném lỗi nếu có lỗi từ API hoặc từ axios
    }
};
