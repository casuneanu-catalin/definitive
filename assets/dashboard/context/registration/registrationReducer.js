import { REGISTRATION_ERROR, REGISTRATION_SUCCESS, SET_ACTIVE_STEP, SET_FORM_DATA } from "./registrationActionTypes"

const registrationReducer = (state = { formData: {}, activeStepIndex: 1 }, action) => {
    switch(action.type) {
      case SET_ACTIVE_STEP: {
        return {
          ...state,
          activeStepIndex: action.payload
        }
      }
      break
      case SET_FORM_DATA: {
        return {
          ...state,
          formData: action.payload
        }
      }
      break
      case REGISTRATION_SUCCESS: {
        return {
            ...state,
            loading: false
        }
      }
      break
      case REGISTRATION_ERROR: {
        return {
            ...state,
            loading: false,
            error: action.payload
        }
      }
      default:
        return state
    }
  }
  
  export default registrationReducer