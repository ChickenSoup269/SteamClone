import axios from "axios"
import { axiosJWT } from "./UserService";

// export const createProduct = async (data) => {
//     try {
//         const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data);
//         if (res.data.status === 'ERR') {
//             throw new Error(res.data.message); // Ném lỗi nếu phản hồi có trạng thái ERR
//         }
//         return res.data;
//     } catch (error) {
//         throw error.response ? error.response.data : error; // Ném lỗi nếu có lỗi từ API hoặc từ axios
//     }
// };

export const createOrder = async (access_token, data) => {
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create`, data, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        });
        if (res.data.status === 'ERR') {
            throw new Error(res.data.message); // Ném lỗi nếu phản hồi có trạng thái ERR
        }
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : error; // Ném lỗi nếu có lỗi từ API hoặc từ axios
    }
};