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
    removeOrderGame: (state, action) => {
        const {gameId} = action.payload
        const itemOrder = state?.orderItems?.filter((item) => item?.game_id !== gameId)
        const itemOrderSelected = state?.orderItemsSelected?.filter((item) => item?.game_id !== gameId)
        state.orderItems = itemOrder;
        state.orderItemsSelected = itemOrderSelected;
    },
    removeAllOrderGame: (state, action) => {
        const {selectedGames} = action.payload
        const itemOrders = state?.orderItems?.filter((item) => !selectedGames.includes(item.game_id))
        const itemOrderSelected = state?.orderItemsSelected?.filter((item) => !selectedGames.includes(item.game_id))
        state.orderItems = itemOrders;
        state.orderItemsSelected = itemOrderSelected;
    },
    selectedOrder: (state, action) => {
        const {selectedGames} = action.payload
        const orderSelected = []
        state.orderItems.forEach((game) => {
            if (selectedGames.includes(game?.game_id)) {
                orderSelected.push(game)
            }
        })
        state.orderItemsSelected = orderSelected
    },
  },
})

// Action creators are generated for each case reducer function
export const { addOrderGame, removeOrderGame, removeAllOrderGame, selectedOrder } = orderSlice.actions

export default orderSlice.reducer