import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as session } from './session'

export default (history: any) => combineReducers({
  router: connectRouter(history),
  session: session,
})
