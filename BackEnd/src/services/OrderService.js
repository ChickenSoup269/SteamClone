const Order = require("../models/OrderGameModel")

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, user } = newOrder
        try {
            const createdOrder = await Order.create({
                orderItems, 
                paymentMethod,
                user,
            })
            if(createdOrder) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdOrder
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
}