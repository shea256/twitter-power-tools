import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// INITIAL STATE
const initialState = {
  database: {
    string: '',
    user: '',
    host: '',
    db: '',
    password: '',
  },
  twitterUsername: '',
  twitterClient: {
    consumerKey: '',
    consumerSecret: '',
    accessToken: '',
    accessTokenSecret: '',
  },
  querySettings: {
    limit: 100,
    offset: 0,
    cursor: -1,
  }
}

// ACTION TYPES
export const actionTypes = {
  SET_DATABASE: 'SET_DATABASE',
  SET_USERNAME: 'SET_TWITTER_USERNAME',
  SET_TWITTER_CLIENT: 'SET_TWITTER_CLIENT',
  SET_QUERY_SETTINGS: 'SET_QUERY_SETTINGS',
}

// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATABASE':
      return {
        ...state,
        database: action.database
      }
    case 'SET_TWITTER_CLIENT':
      return {
        ...state,
        twitterClient: action.twitterClient // initialState.twitterClient
      }
    case 'SET_TWITTER_USERNAME':
      return {
        ...state,
        twitterUsername: action.twitterUsername
      }
    case 'SET_QUERY_SETTINGS':
      return {
        ...state,
        querySettings: action.querySettings
      }
    default:
      return state
  }
}

// INITIALIZE STORE
const persistedReducer = persistReducer({
  key: 'primary',
  storage,
  whitelist: ['database', 'twitterUsername', 'twitterClient', 'querySettings']
}, reducer)

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware()
    )
  )
}