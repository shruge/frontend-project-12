import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import postData from '../../api/postData'
import routes from '../../api/routes'

const setLocalAuthData = ({ token, username }) => {
  localStorage.setItem('user', JSON.stringify({ token, username }))
}

export const getToken = createAsyncThunk(
  'authData/getToken',
  async (reqBody, { rejectWithValue }) => {
    try {
      const data = await postData(routes.logInLink(), reqBody)

      setLocalAuthData(data)

      return data
    }
    catch ({ response = { statusText: 'networkError' } }) {
      return rejectWithValue(response.statusText)
    }
  },
)

export const createUser = createAsyncThunk(
  'authData/createUser',
  async (reqBody, { rejectWithValue }) => {
    try {
      const data = await postData(routes.signUpLink(), reqBody)

      setLocalAuthData(data)

      return data
    }
    catch ({ response = { statusText: 'networkError' } }) {
      console.log(response.statusText)
      return rejectWithValue(response.statusText)
    }
  },
)

const defaultState = {
  token: '',
  error: null,
  username: '',
}
const initialState = Object.assign(
  defaultState,
  JSON.parse(localStorage.getItem('user')),
)

const authSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    setAuthData(state, { payload }) {
      state.error = null
      state.token = payload.token
      state.username = payload.username
    },
    authReset(state) {
      state.token = ''
      state.error = null
      state.username = ''

      localStorage.clear()
    },
    setAuthError(state, { payload }) {
      state.error = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.fulfilled, (state, { payload }) => {
        state.error = null
        state.token = payload.token
        state.username = payload.username
      })
      .addCase(getToken.rejected, (state, { payload }) => {
        state.error = payload
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.error = payload
      })
  },
})

export const { authReset, setAuthData, setAuthError } = authSlice.actions
export default authSlice.reducer
