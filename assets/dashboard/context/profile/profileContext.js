import React, { createContext, useReducer } from 'react'
import ProfileReducer from './profileReducer'
import axios from 'axios'
import { USER_TAG } from '../../config/localStorage'
import { USER_ENTRYPOINT } from '../../config/endpoints'
import { patchHeader } from '../../config/axios'
import AuthContext from '../auth/authContext'

const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
  const initialState = {
    profile: null,
  }

  const {user} = React.useContext(AuthContext);

  const [state, dispatch] = useReducer(ProfileReducer, initialState)

  const getUserByEmail = async() => {
    const email = JSON.parse(localStorage.getItem(USER_TAG));
    const users = await axios
      .get(`${USER_ENTRYPOINT}?page=1&email=${email}`)
      .then(response => response.data)
      .catch(e => console.log(`[GET_USER] ${e.message}`))

    if(users['hydra:member'].length)
    dispatch({type: 'SET_PROFILE', payload: users['hydra:member'][0]});
  }

  const updateProfile = async(id, data) => {
    try {
      await axios
        .patch(`${USER_ENTRYPOINT}/${id}`, data, patchHeader)
        .then((data) => data?.data);
    } catch (error) {
      console.log({error})
    }
  }

  React.useEffect(() => {
    getUserByEmail();
  }, [user])

  return <ProfileContext.Provider value={{
    profile: state.profile,
    updateProfile,
    getUserByEmail
  }}>
    {children}
  </ProfileContext.Provider>
}

export default ProfileContext