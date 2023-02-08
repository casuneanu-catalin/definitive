import React, { createContext, useReducer } from 'react'
import authReducer from './authReducer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ENTRYPOINT } from '../../config/endpoints'
import { AUTH_TAG, USER_TAG } from '../../config/localStorage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate()

  const initialState = {
    user: {},
    loading: true,
    error: '',
    emailSuccess: '',
    emailError: '',
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = async (username, password) => {
    try {
      const response = await axios
        .post(LOGIN_ENTRYPOINT, {email: username, password})

      localStorage.removeItem(AUTH_TAG)
      localStorage.setItem(AUTH_TAG, response?.data?.token)

      localStorage.setItem(USER_TAG, JSON.stringify(response?.data?.user))

      dispatch({ type: 'LOGIN_SUCCESS', payload: response?.data?.user })

      navigate('/dashboard')
    } catch (err) {
      console.log({err})
      dispatch({ type: 'LOGIN_ERROR', payload: err.response?.data?.message || err.response?.data?.error })
    }
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    localStorage.removeItem(USER_TAG)
    localStorage.removeItem(AUTH_TAG)
    navigate('/dashboard/login')
  }

  const resetPassword = async (email) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    const body = JSON.stringify({ email })

    try {
      await axios.post('/user/password/reset', body, config)
      dispatch({ type: 'SEND_EMAIL_SUCCESS', payload: 'Check your email to get your new password.' })
      setTimeout(() => {
        dispatch({ type: 'SEND_EMAIL_REMOVE_MESSAGE' })
      }, 5000)
    } catch (err) {
      dispatch({ type: 'SEND_EMAIL_FAIL', payload: 'There was a problem with sending the email, please try again.' })
    }
  }

  return <AuthContext.Provider value={{
    user: state.user,
    loading: state.loading,
    error: state.error,
    emailSuccess: state.emailSuccess,
    emailError: state.emailError,
    login,
    logout,
    resetPassword
  }}>
    {children}
  </AuthContext.Provider>
}

export default AuthContext