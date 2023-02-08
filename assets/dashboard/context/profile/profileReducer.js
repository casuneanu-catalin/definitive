const profileReducer = (state = { profile: null }, action) => {
    switch(action.type) {
      case 'SET_PROFILE': {
        return {
          ...state,
          profile: action.payload
        }
      }
      default:
        return state
    }
  }
  
  export default profileReducer