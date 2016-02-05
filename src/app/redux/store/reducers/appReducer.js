import InitialState from '../initialState'
import { ActionTypesApp } from '../../actions/actionTypes'

const {
  RESET,
  SET_USER
  // Write down the actions you want to use here
} = ActionTypesApp

const AppReducer = (state, action) => {
  switch (action.type) {
    case RESET:
      return InitialState().app
    case SET_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state || InitialState().app
  }
}

export default AppReducer
