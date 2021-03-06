import ActionTypes from "./actionTypes"
import C from "../../constants"
import { numberOfBears } from "./helpers/settingsActionHelpers"

const {
	RESET_SETTINGS,
  INCREASE_NUMBER_OF_SEATS,
  DECREASE_NUMBER_OF_SEATS,
	INCREASE_NUMBER_OF_BEARS,
	DECREASE_NUMBER_OF_BEARS,
	UPDATE_BEAR,
	DELETE_BEAR,
  START_GAME,
	BACK_TO_GAME,
	SAVE_LAST_SETTINGS
} = ActionTypes

const SettingsActions = {
  resetSettings: () => {
    return ( dispatch ) => {
      dispatch({
        type: RESET_SETTINGS
      })
    }
  },
  increaseNumberOfSeats: () => {
    return ( dispatch ) => {
      dispatch({
        type: INCREASE_NUMBER_OF_SEATS
      })
    }
  },
  decreaseNumberOfSeats: () => {
    return ( dispatch ) => {
      dispatch({
        type: DECREASE_NUMBER_OF_SEATS
      })
    }
  },
  increaseNumberOfBears: () => {
    return ( dispatch ) => {
      dispatch({
        type: INCREASE_NUMBER_OF_BEARS
      })
    }
  },
  decreaseNumberOfBears: () => {
    return ( dispatch ) => {
      dispatch({
        type: DECREASE_NUMBER_OF_BEARS
      })
    }
  },
  updateBear: ( bear ) => {
    return ( dispatch ) => {
      dispatch({
        type: UPDATE_BEAR,
        bear: bear
      })
    }
  },
  deleteBear: ( bearId ) => {
    return ( dispatch ) => {
      dispatch({
        type: DELETE_BEAR,
        bearId: bearId
      })
    }
  },
  startGame: () => {
    return ( dispatch, getState ) => {
      if ( numberOfBears( getState().settings.bears ) >= 2 ) {
        dispatch({
          type: START_GAME,
          meta: {
            transition: () => ({
              path: C.ROUTES.GAME
            })
          }
        })
      }
    }
  },
  backToGame: () => {
    return ( dispatch ) => {
      dispatch({
        type: BACK_TO_GAME,
        meta: {
          transition: () => ({
            path: C.ROUTES.GAME
          })
        }
      })
    }
  },
  saveLastSettings: () => {
    return ( dispatch ) => {
      dispatch({
        type: SAVE_LAST_SETTINGS
      })
    }
  }
}

export default SettingsActions
