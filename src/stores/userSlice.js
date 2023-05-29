import {createSlice} from '@reduxjs/toolkit';

const initialState = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem('gosure-user-data', JSON.stringify(action.payload))
      return action.payload
    },
    logoutUser: () => {
      localStorage.removeItem('gosure-user-data')
      return null;
    }
  }
})

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;