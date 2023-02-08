const authReducer = (state = { user: {}, loading: true, error: '', emailSuccess: '', emailError: '' }, action) => {
    switch(action.type) {
      case 'SEND_EMAIL_SUCCESS': {
        return {
          ...state,
          emailSuccess: action.payload
        }
      }
      case 'SEND_EMAIL_FAIL':
        return {
          ...state,
          emailError: action.payload
        }
      case 'SEND_EMAIL_REMOVE_MESSAGE': {
        return {
          ...state,
          emailSuccess: ''
        }
      }
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          loading: false,
          user: action.payload,
          error: ''
        }
      case 'LOGIN_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload
        }
      case 'LOGOUT':
        return {
          ...state,
          loading: false,
          user: {},
          error: ''
        }
      default:
        return state
    }
  }
  
  export default authReducer