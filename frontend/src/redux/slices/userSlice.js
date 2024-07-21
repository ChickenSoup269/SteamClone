import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: '',
    username: '',
    phone: '',
    avatar: '',
    access_token: '',
    id: '',
    isAdmin: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
        const { email = '', username = '', phone = '', avatar = '', access_token = '', _id = '', isAdmin } = action.payload
        state.email = email; 
        state.username = username;
        state.phone = phone;
        state.avatar = avatar;
        state.id = _id;
        state.access_token = access_token;
        state.isAdmin = isAdmin;
    },
    resetUser: (state) => {
      state.email = '';
      state.username = '';
      state.phone = '';
      state.avatar = '';
      state.id = '';
      state.access_token = '';
      state.isAdmin = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer