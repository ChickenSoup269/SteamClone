import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [
        
    ],
    orderItemsSelected: [

    ],
    paymentMethod: '',
    itemPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderGame: (state, action) => {
        const {orderItem} = action.payload
        const itemOrder = state?.orderItems?.find((item) => item?.game === orderItem.game)
        if (itemOrder) {
            itemOrder.amount += orderItem?.amount
        } else {
            state.orderItems.push(orderItem)
        }
    },
    increaseAmount: (state, action) => {
        const {idProduct} = action.payload
        const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
        const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct)
        itemOrder.amount++;
        if (itemOrderSelected) {
            itemOrderSelected.amount++;
        }
    },
    decreaseAmount: (state, action) => {
        const {idProduct} = action.payload
        const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
        const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct)
        itemOrder.amount--;
        if (itemOrderSelected) {
            itemOrderSelected.amount--;
        }
    },
    removeGameCart: (state, action) => {
        const {idProduct} = action.payload
        const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
        const itemOrderSelected = state?.orderItemsSelected?.filter((item) => item?.product !== idProduct)
        state.orderItems = itemOrder;
        state.orderItemsSelected = itemOrderSelected;
    },
    removeAllGameCart: (state, action) => {
        const {listChecked} = action.payload
        const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
        const itemOrderSelected = state?.orderItemsSelected?.filter((item) => !listChecked.includes(item.product))
        state.orderItems = itemOrders;
        state.orderItemsSelected = itemOrderSelected;
    },
    selectedCart: (state, action) => {
        const {listChecked} = action.payload
        const orderSelected = []
        state.orderItems.forEach((order) => {
            if (listChecked.includes(order.product)) {
                orderSelected.push(order)
            }
        })
        state.orderItemsSelected = orderSelected
    },
  },
})

// Action creators are generated for each case reducer function
export const { addOrderGame, increaseAmount, decreaseAmount, removeGameCart, removeAllGameCart, selectedCart } = orderSlice.actions

export default orderSlice.reducer