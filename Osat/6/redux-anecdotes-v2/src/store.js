import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'

const reducer = combineReducers({
    notifications: notificationReducer,
    anecdotes: anecdoteReducer
  })

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store