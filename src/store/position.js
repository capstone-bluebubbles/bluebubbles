import store from ".";
import { placesRef } from "../components/Firebase/firebase"

export const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION'
export const SET_CURRENT_PLACES = 'SET_CURRENT_PLACES'

const defaultState = {
  currentPosition: {
    lat: 41.875792,
    lng: -87.618944,
    timestamp: 0
  },
  currentPlaces: []
}

export const setCurrentPosition = (currentPosition) => {
  return {
    type: SET_CURRENT_POSITION,
    currentPosition
  }
}

export const setCurrentPlaces = (currentPlaces) => {
  return {
    type: SET_CURRENT_PLACES,
    currentPlaces
  }
}

export const getCurrentPosition = () => async dispatch => {
  try {

    var getCurrentPositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      pos => {
        console.log(
          "REDUX -> fetchPosition -> getCurrentPosition -> pos ->",
          pos
        );
        dispatch(setCurrentPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timestamp: pos.timestamp
        }))
        dispatch(getCurrentPlaces())
      },
      err => {
        console.log(
          "REDUX -> fetchPosition ->  getCurrentPosition -> err ->",
          err
        );
      },
      getCurrentPositionOptions
    );
  } catch (err) {
    console.error(err)
  }
}

export const getCurrentPlaces = () => async dispatch => {
  try {
    placesRef.on('value', snapshot => {
      const places = snapshot.val()
      dispatch(setCurrentPlaces(places))
    })
  } catch (err) {
    console.error(err)
  }
}


export const positionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_POSITION:
      {
        const newState = { ...state, currentPosition: action.currentPosition }
        return newState;
      }
    case SET_CURRENT_PLACES:
      {
        const newState = { ...state, currentPlaces: action.currentPlaces }
        return newState;
      }
    default:
      return state
  }
}